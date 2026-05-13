-- =====================================================
-- V3 : Compte administrateur initial
-- Mot de passe : Admin@123 (hash BCrypt force 12)
-- A CHANGER apres premiere connexion en production !
-- =====================================================

INSERT INTO users (
    first_name, last_name, email, phone, password,
    preferred_locale, enabled, created_at, updated_at
) VALUES (
    'Admin',
    'BlogSite',
    'admin@blogsite.cm',
    '+237600000000',
    '$2a$12$6qOOvkTiocvk39W.Y7E18uEvrGGRCgJiaMwQaJpC8APnBKBZArDzS',
    'fr-CM',
    TRUE,
    NOW(),
    NOW()
);

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'admin@blogsite.cm' AND r.name IN ('ROLE_USER', 'ROLE_ADMIN');
