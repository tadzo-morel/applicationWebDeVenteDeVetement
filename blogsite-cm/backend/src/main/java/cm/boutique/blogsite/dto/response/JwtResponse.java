package cm.boutique.blogsite.dto.response;

public record JwtResponse(
    String accessToken,
    String refreshToken,
    String tokenType,
    long expiresInMs,
    UserSummary user
) {}
