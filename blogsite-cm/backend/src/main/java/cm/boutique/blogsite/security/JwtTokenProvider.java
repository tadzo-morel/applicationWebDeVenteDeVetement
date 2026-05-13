package cm.boutique.blogsite.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

    private final SecretKey signingKey;
    private final long accessTokenExpirationMs;
    private final long refreshTokenExpirationMs;

    public JwtTokenProvider(
        @Value("${app.jwt.secret}") String secret,
        @Value("${app.jwt.access-token-expiration-ms}") long accessTokenExpirationMs,
        @Value("${app.jwt.refresh-token-expiration-ms}") long refreshTokenExpirationMs
    ) {
        if (secret == null || secret.length() < 64) {
            throw new IllegalStateException(
                "JWT_SECRET doit faire au minimum 64 caracteres pour HMAC-SHA512.");
        }
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpirationMs = accessTokenExpirationMs;
        this.refreshTokenExpirationMs = refreshTokenExpirationMs;
    }

    public String generateAccessToken(Authentication authentication) {
        return buildToken(authentication, accessTokenExpirationMs, "access");
    }

    public String generateRefreshToken(Authentication authentication) {
        return buildToken(authentication, refreshTokenExpirationMs, "refresh");
    }

    private String buildToken(Authentication auth, long expirationMs, String type) {
        UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);
        List<String> roles = principal.getAuthorities().stream()
            .map(a -> a.getAuthority())
            .collect(Collectors.toList());

        return Jwts.builder()
            .subject(principal.getUsername())
            .claim("userId", principal.getId())
            .claim("roles", roles)
            .claim("type", type)
            .issuedAt(now)
            .expiration(expiry)
            .signWith(signingKey, Jwts.SIG.HS512)
            .compact();
    }

    public String getUsernameFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.debug("JWT expire");
        } catch (UnsupportedJwtException e) {
            log.warn("JWT non supporte");
        } catch (MalformedJwtException e) {
            log.warn("JWT malforme");
        } catch (io.jsonwebtoken.security.SecurityException e) {
            log.warn("Signature JWT invalide");
        } catch (IllegalArgumentException e) {
            log.warn("JWT vide ou null");
        }
        return false;
    }

    public long getAccessTokenExpirationMs() {
        return accessTokenExpirationMs;
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
            .verifyWith(signingKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
}
