package cm.boutique.blogsite.dto.response;

import java.util.Set;

public record UserSummary(
    Long id,
    String firstName,
    String lastName,
    String email,
    String phone,
    String preferredLocale,
    Set<String> roles
) {}
