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
-- Table structure for table `tb_fornecedor`
--

DROP TABLE IF EXISTS `tb_fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fornecedor` (
  `For_ID` int NOT NULL AUTO_INCREMENT,
  `For_Nome` varchar(60) NOT NULL,
  `For_Senha` varchar(200) NOT NULL,
  `For_LinkSite` varchar(2083) NOT NULL,
  `End_ID` int NOT NULL,
  `Ema_ID` int NOT NULL,
  `Tel_ID` int NOT NULL,
  `Ins_CNPJ` varchar(50) NOT NULL,
  `logo` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`For_ID`),
  KEY `End_ID` (`End_ID`),
  KEY `Ema_ID` (`Ema_ID`),
  KEY `Tel_ID` (`Tel_ID`),
  KEY `Ins_CNPJ` (`Ins_CNPJ`),
  CONSTRAINT `tb_fornecedor_ibfk_1` FOREIGN KEY (`End_ID`) REFERENCES `tb_endereco` (`End_ID`),
  CONSTRAINT `tb_fornecedor_ibfk_2` FOREIGN KEY (`Ema_ID`) REFERENCES `tb_email` (`Ema_ID`),
  CONSTRAINT `tb_fornecedor_ibfk_3` FOREIGN KEY (`Tel_ID`) REFERENCES `tb_telefone` (`Tel_ID`),
  CONSTRAINT `tb_fornecedor_ibfk_4` FOREIGN KEY (`Ins_CNPJ`) REFERENCES `tb_inscricao` (`Ins_CNPJ`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fornecedor`
--

LOCK TABLES `tb_fornecedor` WRITE;
/*!40000 ALTER TABLE `tb_fornecedor` DISABLE KEYS */;
INSERT INTO `tb_fornecedor` VALUES (1,'LF Auto Peças','12345678','https://lfautopecas.com.br',11,12,11,'15151515000101','img/Fornecedores/LF.png'),(2,'Max Turbo','87654321','https://maxturbo.com.br',12,13,12,'10101014000102','img/Fornecedores/MXTurbo.png'),(3,'Trux Mecânica','abcdef12','https://truxmecanica.com.br',13,14,13,'10101011000103','img/Fornecedores/TruxMecanina.png'),(4,'TruckFix','senhafix','https://truckfix.com.br',14,15,14,'10101012000104','img/Fornecedores/TruckFIX.png'),(5,'Crias do Guincho','guincho1','https://criasdoguincho.com.br',15,16,15,'10101013000105','img/Fornecedores/Laranja.png');
/*!40000 ALTER TABLE `tb_fornecedor` ENABLE KEYS */;
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
