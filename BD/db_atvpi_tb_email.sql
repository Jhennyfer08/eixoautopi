-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_atvpi
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_email`
--

DROP TABLE IF EXISTS `tb_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_email` (
  `Ema_ID` int NOT NULL AUTO_INCREMENT,
  `Ema_Email1` varchar(45) DEFAULT NULL,
  `Ema_Email2` varchar(45) DEFAULT NULL,
  `Ema_Email3` varchar(45) DEFAULT NULL,
  `Ema_Outros` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Ema_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_email`
--

LOCK TABLES `tb_email` WRITE;
/*!40000 ALTER TABLE `tb_email` DISABLE KEYS */;
INSERT INTO `tb_email` VALUES (12,'lf@email.com',NULL,NULL,NULL),(13,'maxturbo@email.com',NULL,NULL,NULL),(14,'truxmecanica@email.com',NULL,NULL,NULL),(15,'truckfix@email.com',NULL,NULL,NULL),(16,'criasdoguincho@email.com',NULL,NULL,NULL),(17,'arfreiosnotas@gmail.com',NULL,NULL,NULL),(18,'reipecas@gmail.com',NULL,NULL,NULL),(19,'arfreios123@gmail.com',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tb_email` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-03  0:13:13
