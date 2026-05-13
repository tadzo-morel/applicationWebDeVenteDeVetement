-- =====================================================
-- V2 : Donnees de reference - roles, regions et villes
-- =====================================================

INSERT INTO roles (name, description, created_at, updated_at) VALUES
('ROLE_USER',  'Utilisateur standard',          NOW(), NOW()),
('ROLE_ADMIN', 'Administrateur du back-office', NOW(), NOW());

INSERT INTO regions (name, name_en, code, created_at, updated_at) VALUES
('Adamaoua',     'Adamawa',     'AD', NOW(), NOW()),
('Centre',       'Centre',      'CE', NOW(), NOW()),
('Est',          'East',        'ES', NOW(), NOW()),
('Extreme-Nord', 'Far North',   'EN', NOW(), NOW()),
('Littoral',     'Littoral',    'LT', NOW(), NOW()),
('Nord',         'North',       'NO', NOW(), NOW()),
('Nord-Ouest',   'North-West',  'NW', NOW(), NOW()),
('Ouest',        'West',        'OU', NOW(), NOW()),
('Sud',          'South',       'SU', NOW(), NOW()),
('Sud-Ouest',    'South-West',  'SW', NOW(), NOW());

INSERT INTO cities (name, region_id, latitude, longitude, is_main_hub, created_at, updated_at)
SELECT 'Ngaoundere', id,  7.3167, 13.5833, FALSE, NOW(), NOW() FROM regions WHERE code = 'AD' UNION ALL
SELECT 'Yaounde',    id,  3.8480, 11.5021, TRUE,  NOW(), NOW() FROM regions WHERE code = 'CE' UNION ALL
SELECT 'Mbalmayo',   id,  3.5167, 11.5000, FALSE, NOW(), NOW() FROM regions WHERE code = 'CE' UNION ALL
SELECT 'Bertoua',    id,  4.5833, 13.6833, FALSE, NOW(), NOW() FROM regions WHERE code = 'ES' UNION ALL
SELECT 'Maroua',     id, 10.5910, 14.3158, FALSE, NOW(), NOW() FROM regions WHERE code = 'EN' UNION ALL
SELECT 'Douala',     id,  4.0511,  9.7679, TRUE,  NOW(), NOW() FROM regions WHERE code = 'LT' UNION ALL
SELECT 'Edea',       id,  3.8000, 10.1333, FALSE, NOW(), NOW() FROM regions WHERE code = 'LT' UNION ALL
SELECT 'Nkongsamba', id,  4.9500,  9.9333, FALSE, NOW(), NOW() FROM regions WHERE code = 'LT' UNION ALL
SELECT 'Garoua',     id,  9.3000, 13.4000, FALSE, NOW(), NOW() FROM regions WHERE code = 'NO' UNION ALL
SELECT 'Bamenda',    id,  5.9631, 10.1591, FALSE, NOW(), NOW() FROM regions WHERE code = 'NW' UNION ALL
SELECT 'Bafoussam',  id,  5.4781, 10.4167, FALSE, NOW(), NOW() FROM regions WHERE code = 'OU' UNION ALL
SELECT 'Dschang',    id,  5.4500, 10.0500, FALSE, NOW(), NOW() FROM regions WHERE code = 'OU' UNION ALL
SELECT 'Foumban',    id,  5.7167, 10.9000, FALSE, NOW(), NOW() FROM regions WHERE code = 'OU' UNION ALL
SELECT 'Ebolowa',    id,  2.9000, 11.1500, FALSE, NOW(), NOW() FROM regions WHERE code = 'SU' UNION ALL
SELECT 'Kribi',      id,  2.9333,  9.9167, FALSE, NOW(), NOW() FROM regions WHERE code = 'SU' UNION ALL
SELECT 'Buea',       id,  4.1500,  9.2333, FALSE, NOW(), NOW() FROM regions WHERE code = 'SW' UNION ALL
SELECT 'Limbe',      id,  4.0167,  9.2167, FALSE, NOW(), NOW() FROM regions WHERE code = 'SW' UNION ALL
SELECT 'Kumba',      id,  4.6333,  9.4333, FALSE, NOW(), NOW() FROM regions WHERE code = 'SW';
