package cm.boutique.blogsite.service;

import cm.boutique.blogsite.dto.request.LoginRequest;
import cm.boutique.blogsite.dto.request.RegisterRequest;
import cm.boutique.blogsite.dto.response.JwtResponse;
import cm.boutique.blogsite.dto.response.UserSummary;
import cm.boutique.blogsite.entity.Role;
import cm.boutique.blogsite.entity.User;
import cm.boutique.blogsite.exception.BadRequestException;
import cm.boutique.blogsite.exception.ResourceNotFoundException;
import cm.boutique.blogsite.repository.RoleRepository;
import cm.boutique.blogsite.repository.UserRepository;
import cm.boutique.blogsite.security.JwtTokenProvider;
import cm.boutique.blogsite.security.UserPrincipal;
import cm.boutique.blogsite.util.PhoneUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public JwtResponse register(RegisterRequest req) {
        String phone = PhoneUtil.normalize(req.phone());

        if (userRepository.existsByPhone(phone)) {
            throw new BadRequestException("Ce numero de telephone est deja utilise");
        }
        if (req.email() != null && !req.email().isBlank()
                && userRepository.existsByEmail(req.email().trim().toLowerCase())) {
            throw new BadRequestException("Cet email est deja utilise");
        }

        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
            .orElseThrow(() -> new ResourceNotFoundException("Role ROLE_USER introuvable"));

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        User user = new User();
        user.setFirstName(req.firstName().trim());
        user.setLastName(req.lastName().trim());
        if (req.email() != null && !req.email().isBlank()) {
            user.setEmail(req.email().trim().toLowerCase());
        }
        user.setPhone(phone);
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setPreferredLocale(req.preferredLocale() != null ? req.preferredLocale() : "fr-CM");
        user.setRoles(roles);
        user.setEnabled(true);

        userRepository.save(user);

        return login(new LoginRequest(phone, req.password()));
    }

    public JwtResponse login(LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.identifier(), req.password()));

        String accessToken = tokenProvider.generateAccessToken(auth);
        String refreshToken = tokenProvider.generateRefreshToken(auth);

        UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
        User user = userRepository.findById(principal.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User introuvable"));

        return new JwtResponse(
            accessToken,
            refreshToken,
            "Bearer",
            tokenProvider.getAccessTokenExpirationMs(),
            toSummary(user)
        );
    }

    @Transactional(readOnly = true)
    public UserSummary getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BadRequestException("Aucun utilisateur authentifie");
        }
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User introuvable"));
        return toSummary(user);
    }

    private UserSummary toSummary(User user) {
        Set<String> roles = user.getRoles().stream()
            .map(r -> r.getName().name())
            .collect(Collectors.toSet());
        return new UserSummary(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhone(),
            user.getPreferredLocale(),
            roles
        );
    }
}
