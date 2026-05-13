package cm.boutique.blogsite.dto.request;

import cm.boutique.blogsite.util.PhoneUtil;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Le prenom est requis")
    @Size(min = 2, max = 50)
    String firstName,

    @NotBlank(message = "Le nom est requis")
    @Size(min = 2, max = 50)
    String lastName,

    @Email(message = "Format email invalide")
    @Size(max = 120)
    String email,

    @NotBlank(message = "Le telephone est requis")
    @Pattern(regexp = PhoneUtil.CM_PHONE_REGEX,
             message = "Numero de telephone camerounais invalide (format : +2376XXXXXXXX)")
    String phone,

    @NotBlank(message = "Le mot de passe est requis")
    @Size(min = 8, max = 100, message = "Au moins 8 caracteres")
    String password,

    String preferredLocale
) {}
