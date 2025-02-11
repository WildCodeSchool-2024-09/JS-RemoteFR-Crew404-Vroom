CREATE TABLE user (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  birthdate DATE,
  phone_number VARCHAR(20),
  sold INT DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE motor (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE brand (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE event (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  type ENUM('salon', 'course', 'musée', 'vente aux enchères', 'roadtrip', 'rassemblement', 'autre') NOT NULL,
  event_picture VARCHAR(255),
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  location POINT NOT NULL,
  address VARCHAR(255) NOT NULL,
  description VARCHAR(225),
  link VARCHAR(255),
  user_id INT unsigned NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  SPATIAL INDEX(location)
);

CREATE TABLE model (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  brand_id INT unsigned NOT NULL,
  motor_id INT unsigned NOT NULL,
  FOREIGN KEY(brand_id) REFERENCES brand(id),
  FOREIGN KEY(motor_id) REFERENCES motor(id)
);

CREATE TABLE marker (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  position POINT NOT NULL,
  label VARCHAR(255),
  details JSON,
  user_id INT unsigned NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  SPATIAL INDEX(position)
);

CREATE TABLE vehicle (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  vehicle_picture VARCHAR(255),
  -- type ENUM('moto', 'voiture') NOT NULL,
  -- status ENUM('vente', 'essai', 'indisponible') NOT NULL,
  -- energy ENUM('essence', 'diesel', 'electrique') NOT NULL,
  location VARCHAR(100) NOT NULL,
  user_id INT unsigned NOT NULL,
  model_id INT unsigned NOT NULL,
  
  -- Ajout des informations communes
  year INT NOT NULL,
  
  -- Pour les brands, on a déjà une base de données mais aucun lien n'a été fait ici
  brand VARCHAR(255) NOT NULL,
  
  -- La même chose pour les models
  model VARCHAR(255) NOT NULL,
  
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (model_id) REFERENCES model(id)
);


CREATE TABLE `like` (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT unsigned NOT NULL,
  vehicle_id INT unsigned NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(vehicle_id) REFERENCES vehicle(id)
);

insert into user (id, username, email, password, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin) values 
(1, 'admin', 'admin@vroom.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'admin', 'admin', '1990-01-01', '+33601020304', 100  , true),
(2, 'Aldup', 'alice@example.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'Alice', 'Dupont', '2001-01-01', '+33601020304', 2, false),
(3, 'The B', 'bob@example.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'Bob', 'Martin', '2001-01-01', '+33601020311', 1, false);

insert into motor (id, name) values 
(1, 'V8'),
(2, 'V6'),
(3, 'V4'),
(4, 'V2'),
(5, 'V1'),
(6, 'V12'),
(7, 'V10'),
(8, 'V3'),
(9, 'V5'),
(10, 'V7'),
(11, 'V9'),
(12, 'V11'),
(13, '6 cylindres en ligne'),
(14, 'bicylindre');

insert into brand (id, name) values 
(1, 'Audi'),
(2, 'BMW'),
(3, 'Mercedes'),
(4, 'Porsche'),
(5, 'Ferrari'),
(6, 'Lamborghini'),
(7, 'Bugatti'),
(8, 'Renault'),
(9, 'Peugeot'),
(10, 'Citroën'),
(11, 'Toyota'),
(12, 'Honda'),
(13, 'Suzuki'),
(14, 'Yamaha'),
(15, 'Kawasaki'),
(16, 'Ducati'),
(17, 'Triumph'),
(18, 'Harley-Davidson'),
(19, 'Indian'),
(20, 'BMW Motorrad'),
(21, 'KTM'),
(22, 'Aprilia'),
(23, 'Moto Guzzi'),
(24, 'MV Agusta'),
(25, 'Husqvarna'),
(26, 'Royal Enfield'),
(27, 'Bimota'),
(28, 'Benelli'),
(29, 'Norton'),
(30, 'Zero Motorcycles'),
(31, 'Victory Motorcycles'),
(32, 'Buell'),
(33, 'Gas Gas'),
(34, 'Sherco'),
(35, 'Ossa'),
(36, 'Beta'),
(37, 'Rieju'),
(38, 'Derbi'),
(39, 'AJP'),
(40, 'Fantic'),
(41, 'Mondial'),
(42, 'FB Mondial'),
(43, 'Brixton'),
(44, 'Bullit'),
(45, 'Mash'),
(46, 'Oral'),
(47, 'Lancia'),
(48, 'Lada'),
(49, 'Nissan');

insert into event (id, title, type, event_picture, date_start, date_end, location, address, description, link, user_id) values 
(1, "Salon de l'automobile versaille", 'salon', 'https://upload.wikimedia.org/wikipedia/commons/5/54/Tms2007_01.jpg', '2025-10-01', '2025-10-10', POINT(48.83033737457059, 2.2872173892810004), '1 Pl. de la Prte de Versailles, 75015 Paris', 'Le salon de l''auto est un événement incontournable pour les passionnés de voitures.', 'https://www.salon-auto.com/', 3),
(2, 'En route les BG', 'roadtrip', 'https://external-preview.redd.it/3_1tq9x-NJAxcucUwCWVqZHeohhPvtoK5IkrZWm-dmY.jpg?width=640&crop=smart&auto=webp&s=89c421b4989131b9bc6cb4cf58eb3627e5a808e2', '2025-11-01', '2025-11-1', POINT(50.60880719840839, 3.111964658850651), 'Rdpt des Acacias, 59790 Ronchin', 'Le dernier arrivé achète une LADA.', 'https://www.facebook.com/ffveofficiel/?locale=fr_FR"', 2);

insert into model (id, name, year, brand_id, motor_id) values 
(1, 'A3', 2022, 1, 1),
(2, 'A4', 2022, 1, 2),
(3, 'A5', 2022, 1, 3),
(4, 'A6', 2022, 1, 4),
(5, 'A7', 2022, 1, 5),
(6, 'A8', 2022, 1, 6),
(7, 'Q2', 2022, 1, 7),
(8, 'Q3', 2022, 1, 8),
(9, 'Q4', 2022, 1, 9),
(10, 'Q5', 2022, 1, 10),
(11, 'Q6', 2022, 1, 11),
(12, 'Q7', 2022, 1, 12),
(13, 'Q8', 2022, 1, 1),
(14, 'TT', 2022, 1, 2),
(15, 'R8', 2022, 1, 3),
(16, 'Z4', 2022, 2, 4),
(17, 'X1', 2022, 2, 5),
(18, 'X2', 2022, 2, 6),
(19, 'X3', 2022, 2, 7),
(20, 'X4', 2022, 2, 8),
(21, 'X5', 2022, 2, 9),
(22, 'X6', 2022, 2, 10),
(23, 'X7', 2022, 2, 11),
(24, 'X8', 2022, 2, 12),
(25, 'Classe A', 2022, 3, 1),
(26, 'Classe B', 2022, 3, 2),
(27, 'Classe C', 2022, 3, 3),
(28, 'Classe E', 2022, 3, 4),
(29, 'skyline r34 GT-R', 1970, 49, 13),
(30, '8 - XR750', 1970, 18, 14);

/**
Ici, je vous ai mis un exemple de ce que pourrait être la table vehicle.
Je vous laisse la compléter avec les informations que vous avez déjà.
*/
-- insert into vehicle (id, vehicle_picture, type, status, location, energy, user_id, model_id, year, brand, model) values 
-- (1, 'https://abcmoteur.fr/wp-content/uploads/2012/07/skyline-c10-gtr-1970.jpg"', 'voiture', 'vente', 'Paris', 'essence', 2, 29, 2025, "toyota", 'yaris'),
-- (2, 'https://www.largus.fr/images/images/audi-a4-2020-1.jpg', 'voiture', 'essai', 'Lille', 'essence', 3, 30, 2025, "harley-davidson", '8 - XR750');

/**
Pour les tests du véhicule, je vous ai mis un exemple de ce que pourrait être la table vehicle.
*/
insert into vehicle (id, vehicle_picture, location, user_id, model_id, year, brand, model) values 
(1, 'https://abcmoteur.fr/wp-content/uploads/2012/07/skyline-c10-gtr-1970.jpg', 'Paris', 2, 29, 2025, "Nissan", 'skyline r34 GT-R'),
(2, 'https://www.largus.fr/images/images/audi-a4-2020-1.jpg', 'Lille', 3, 30, 2025, "Harley-Davidson", '8 - XR750');
