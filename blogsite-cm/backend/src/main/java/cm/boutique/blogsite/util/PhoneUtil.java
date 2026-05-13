package cm.boutique.blogsite.util;

import java.util.regex.Pattern;

/**
 * Utilitaires pour les numéros de téléphone camerounais.
 *
 * Format E.164 : +237[26]XXXXXXXX (mobile commence par 6, fixe par 2).
 */
public final class PhoneUtil {

    public static final String CM_PHONE_REGEX = "^\\+237[26][0-9]{8}$";

    private static final Pattern PATTERN = Pattern.compile(CM_PHONE_REGEX);

    private PhoneUtil() {}

    public static boolean isValid(String phone) {
        return phone != null && PATTERN.matcher(phone).matches();
    }

    /**
     * Normalise une saisie utilisateur tolérante en format E.164.
     */
    public static String normalize(String input) {
        if (input == null) {
            return null;
        }
        String digits = input.replaceAll("[\\s\\-.()]", "").trim();
        if (digits.startsWith("00237")) {
            digits = "+" + digits.substring(2);
        }
        if (digits.startsWith("237")) {
            digits = "+" + digits;
        } else if (digits.startsWith("0")) {
            digits = "+237" + digits.substring(1);
        } else if (!digits.startsWith("+")) {
            digits = "+237" + digits;
        }
        return digits;
    }
}
