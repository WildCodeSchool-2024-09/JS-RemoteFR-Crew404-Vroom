-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: DB_ROADADDICT
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Audi'),(2,'BMW'),(3,'Mercedes'),(4,'Porsche'),(5,'Ferrari'),(6,'Lamborghini'),(7,'Bugatti'),(8,'Renault'),(9,'Peugeot'),(10,'Citro√´n'),(11,'Toyota'),(12,'Honda'),(13,'Suzuki'),(14,'Yamaha'),(15,'Kawasaki'),(16,'Ducati'),(17,'Triumph'),(18,'Harley-Davidson'),(19,'Indian'),(20,'BMW Motorrad'),(21,'KTM'),(22,'Aprilia'),(23,'Moto Guzzi'),(24,'MV Agusta'),(25,'Husqvarna'),(26,'Royal Enfield'),(27,'Bimota'),(28,'Benelli'),(29,'Norton'),(30,'Zero Motorcycles'),(31,'Victory Motorcycles'),(32,'Buell'),(33,'Gas Gas'),(34,'Sherco'),(35,'Ossa'),(36,'Beta'),(37,'Rieju'),(38,'Derbi'),(39,'AJP'),(40,'Fantic'),(41,'Mondial'),(42,'FB Mondial'),(43,'Brixton'),(44,'Bullit'),(45,'Mash'),(46,'Oral'),(47,'Lancia'),(48,'Lada'),(49,'Nissan');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` enum('salon','course','mus√©e','vente aux ench√®res','roadtrip','rassemblement','autre') NOT NULL,
  `event_picture` varchar(255) DEFAULT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `location` point NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` varchar(225) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  SPATIAL KEY `location` (`location`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Salon de l\'automobile versaille','salon','https://upload.wikimedia.org/wikipedia/commons/5/54/Tms2007_01.jpg','2025-10-01','2025-10-10',_binary '\0\0\0\0\0\0\0Æ6æ~HjH@hon°8L@','1 Pl. de la Prte de Versailles, 75015 Paris','Le salon de l\'auto est un √©v√©nement incontournable pour les passionn√©s de voitures.','https://www.salon-auto.com/',3),(2,'En route les BG','roadtrip','https://external-preview.redd.it/3_1tq9x-NJAxcucUwCWVqZHeohhPvtoK5IkrZWm-dmY.jpg?width=640&crop=smart&auto=webp&s=89c421b4989131b9bc6cb4cf58eb3627e5a808e2','2025-11-01','2025-11-01',_binary '\0\0\0\0\0\0\0\·]\Ôd\ÌMI@í ∫M\Â@','Rdpt des Acacias, 59790 Ronchin','Le dernier arriv√© ach√®te une LADA.','https://www.facebook.com/ffveofficiel/?locale=fr_FR\"',2);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `vehicle_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marker`
--

DROP TABLE IF EXISTS `marker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marker` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `position` point NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `details` json DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  SPATIAL KEY `position` (`position`),
  CONSTRAINT `marker_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marker`
--

LOCK TABLES `marker` WRITE;
/*!40000 ALTER TABLE `marker` DISABLE KEYS */;
/*!40000 ALTER TABLE `marker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `brand_id` int unsigned NOT NULL,
  `motor_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  KEY `motor_id` (`motor_id`),
  CONSTRAINT `model_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `model_ibfk_2` FOREIGN KEY (`motor_id`) REFERENCES `motor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (1,'A3',2022,1,1),(2,'A4',2022,1,2),(3,'A5',2022,1,3),(4,'A6',2022,1,4),(5,'A7',2022,1,5),(6,'A8',2022,1,6),(7,'Q2',2022,1,7),(8,'Q3',2022,1,8),(9,'Q4',2022,1,9),(10,'Q5',2022,1,10),(11,'Q6',2022,1,11),(12,'Q7',2022,1,12),(13,'Q8',2022,1,1),(14,'TT',2022,1,2),(15,'R8',2022,1,3),(16,'Z4',2022,2,4),(17,'X1',2022,2,5),(18,'X2',2022,2,6),(19,'X3',2022,2,7),(20,'X4',2022,2,8),(21,'X5',2022,2,9),(22,'X6',2022,2,10),(23,'X7',2022,2,11),(24,'X8',2022,2,12),(25,'Classe A',2022,3,1),(26,'Classe B',2022,3,2),(27,'Classe C',2022,3,3),(28,'Classe E',2022,3,4),(29,'skyline r34 GT-R',1970,49,13),(30,'8 - XR750',1970,18,14);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motor`
--

DROP TABLE IF EXISTS `motor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motor` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motor`
--

LOCK TABLES `motor` WRITE;
/*!40000 ALTER TABLE `motor` DISABLE KEYS */;
INSERT INTO `motor` VALUES (1,'V8'),(2,'V6'),(3,'V4'),(4,'V2'),(5,'V1'),(6,'V12'),(7,'V10'),(8,'V3'),(9,'V5'),(10,'V7'),(11,'V9'),(12,'V11'),(13,'6 cylindres en ligne'),(14,'bicylindre');
/*!40000 ALTER TABLE `motor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `sold` int DEFAULT '0',
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@vroom.com','$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y','person_15439869.png','admin','admin','1990-01-01','+33601020304',100,1),(2,'Aldup','alice@example.com','$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y','person_15439869.png','Alice','Dupont','2001-01-01','+33601020304',2,0),(3,'The B','bob@example.com','$argon2id$v=19$m=65536,t=3,p=4$DDXkvDxw3PNiSIg8/cn67g$m/GhPrYzwGOUidcSPJ8XnmB0OUHAw9quzdMDyJIT30Y','person_15439869.png','Bob','Martin','2001-01-01','+33601020311',1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `vehicle_picture` varchar(255) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `user_id` int unsigned NOT NULL,
  `model_id` int unsigned NOT NULL,
  `year` int NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `model_id` (`model_id`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'https://abcmoteur.fr/wp-content/uploads/2012/07/skyline-c10-gtr-1970.jpg','Paris',2,29,2025,'Nissan','skyline r34 GT-R'),(2,'https://www.largus.fr/images/images/audi-a4-2020-1.jpg','Lille',3,30,2025,'Harley-Davidson','8 - XR750');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18 13:44:01
