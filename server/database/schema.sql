-- SQLBook: Code
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
  type ENUM('moto', 'voiture') NOT NULL,
  status ENUM('vente', 'essai', 'indisponible') NOT NULL,
  energy ENUM('essence', 'diesel', 'electrique') NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  user_id INT unsigned NOT NULL,
  year INT NOT NULL,
  brand VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);


CREATE TABLE favoris (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT unsigned NOT NULL,
  marker_id INT unsigned NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(marker_id) REFERENCES marker(id)
);



insert into user (id, username, email, password, profile_picture, firstname, lastname, birthdate, phone_number, sold, is_admin) values 
(1, 'admin', 'admin@vroom.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'admin', 'admin', '1990-01-01', '+33601020304', 100  , true),
(2, 'Aldup', 'alice@example.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'Alice', 'Dupont', '2001-01-01', '+33601020304', 2, false),
(3, 'The B', 'bob@example.com', '$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y', 'person_15439869.png', 'Bob', 'Martin', '2001-01-01', '+33601020311', 1, false);

insert into event (id, title, type, event_picture, date_start, date_end, location, address, description, link, user_id) values 
(1, "Salon de l'automobile versaille", 'salon', 'https://upload.wikimedia.org/wikipedia/commons/5/54/Tms2007_01.jpg', '2025-10-01', '2025-10-10', POINT(48.83033737457059, 2.2872173892810004), '1 Pl. de la Prte de Versailles, 75015 Paris', 'Le salon de l''auto est un événement incontournable pour les passionnés de voitures.', 'https://www.salon-auto.com/', 3),
(2, 'En route les BG', 'roadtrip', 'https://external-preview.redd.it/3_1tq9x-NJAxcucUwCWVqZHeohhPvtoK5IkrZWm-dmY.jpg?width=640&crop=smart&auto=webp&s=89c421b4989131b9bc6cb4cf58eb3627e5a808e2', '2025-11-01', '2025-11-1', POINT(50.60880719840839, 3.111964658850651), 'Rdpt des Acacias, 59790 Ronchin', 'Le dernier arrivé achète une LADA.', 'https://www.facebook.com/ffveofficiel/?locale=fr_FR"', 2);

insert into vehicle (vehicle_picture, type, status, location, latitude, longitude, energy, user_id, year, brand, model) values 
('https://abcmoteur.fr/wp-content/uploads/2012/07/skyline-c10-gtr-1970.jpg', 'voiture', 'vente', "paris", 48.866667, 2.333333, 'essence', 2, 1970, "Nissan", 'skyline r34 GT-R'),
('https://www.largus.fr/images/images/audi-a4-2020-1.jpg', 'voiture', 'essai', "lille", 50.633333,  3.066667, 'essence', 3, 2020, "Harley-Davidson", '8 - XR750');


