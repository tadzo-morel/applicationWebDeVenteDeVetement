package cm.boutique.blogsite.controller;

import cm.boutique.blogsite.dto.request.LoginRequest;
import cm.boutique.blogsite.dto.request.RegisterRequest;
import cm.boutique.blogsite.dto.response.JwtResponse;
import cm.boutique.blogsite.dto.response.UserSummary;
import cm.boutique.blogsite.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentification", description = "Inscription et connexion")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Inscription d'un nouvel utilisateur")
    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(req));
    }

    @Operation(summary = "Connexion par email ou telephone")
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @Operation(summary = "Profil de l'utilisateur connecte")
    @GetMapping("/me")
    public ResponseEntity<UserSummary> me(Authentication authentication) {
        return ResponseEntity.ok(authService.getCurrentUser(authentication));
    }
}
