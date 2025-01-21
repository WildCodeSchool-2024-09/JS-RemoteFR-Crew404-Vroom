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
  sold INT
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
  type ENUM('salon', 'course', 'musée', 'vente aux enchères', 'roadtrip', 'rassemblement') NOT NULL,
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

CREATE TABLE vehicle (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  vehicle_picture VARCHAR(255) NOT NULL,
  type ENUM('moto', 'voiture') NOT NULL,
  status ENUM('vente', 'essai', 'indisponible') NOT NULL,
  location VARCHAR(100) NOT NULL,
  energy ENUM('essence', 'diesel', 'electrique') NOT NULL,
  user_id INT unsigned NOT NULL,
  model_id INT unsigned NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(model_id) REFERENCES model(id)
);

CREATE TABLE `like` (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT unsigned NOT NULL,
  vehicle_id INT unsigned NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(vehicle_id) REFERENCES vehicle(id)
);

insert into user (username, email, password, profile_picture, firstname, lastname, birthdate, phone_number, sold) values ('admin', 'admin@vroom.com', 'azerty', 'https://www.gravatar.com/avatar/,', 'admin', 'admin', '1990-01-01', '0601020304', 100);