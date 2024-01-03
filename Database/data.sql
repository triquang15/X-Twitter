-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: twitter
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (1,NULL,NULL,'2024-01-03 11:46:58.486439'),(2,NULL,NULL,'2024-01-03 11:47:10.822858'),(3,NULL,NULL,'2024-01-03 11:53:34.743603');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chats_users`
--

LOCK TABLES `chats_users` WRITE;
/*!40000 ALTER TABLE `chats_users` DISABLE KEYS */;
INSERT INTO `chats_users` VALUES (1,2),(1,2),(2,1),(2,2),(3,1),(3,3);
/*!40000 ALTER TABLE `chats_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Good!','2024-01-03 11:45:34.162098',2),(2,'Good!','2024-01-03 11:45:42.575059',2),(3,'Haha','2024-01-03 11:49:07.457817',2),(4,'Hi','2024-01-03 11:52:12.431765',3);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment_liked`
--

LOCK TABLES `comment_liked` WRITE;
/*!40000 ALTER TABLE `comment_liked` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_liked` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Hi Quang','2024-01-03 11:47:38.826473',NULL,2,2),(2,'Haha','2024-01-03 11:53:43.570737',NULL,3,3),(3,'Good','2024-01-03 11:53:55.847060','http://res.cloudinary.com/dz0dg0cxp/image/upload/v1704257629/whatsapp/asflubhd6sz9rvh4rfvd.jpg',3,3);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'My Administration has cancelled student debt for 3.6 million people through various actions, bringing the promise of higher education to more hardworking Americans.\n\nAnd we‚Äôre going to keep going.','2024-01-03 11:41:39.473108','https://cdn.pixabay.com/photo/2023/12/31/12/50/woodland-8479979_1280.jpg','',1),(2,'Today is the first day of the rest of your life','2024-01-03 11:45:22.208293','http://res.cloudinary.com/dz0dg0cxp/image/upload/v1704257120/whatsapp/rdppqooevylkwv8ccmdx.jpg','',2),(3,'Did you know that Tanglin Halt is one of #Singapore\'s oldest neighbourhood? Watch on for more!','2024-01-03 11:48:58.759343','http://res.cloudinary.com/dz0dg0cxp/image/upload/v1704257336/whatsapp/c0rnensfsiahe8cslfjv.jpg','',2),(4,'Idk why but ‚ÄúHow It‚Äôs Made‚Äù is still one of the most refreshing tv shows\n\nMaybe it‚Äôs because feel like once I know how it‚Äôs made I could recreate it later, fascinating to know how things are made at scale.  It‚Äôs often very different then you expect','2024-01-03 11:50:30.949269','http://res.cloudinary.com/dz0dg0cxp/image/upload/v1704257428/whatsapp/xx2k3gjmuctc5xlam4dt.jpg','',2),(5,'There should be an option to reset your \'For You\' algorithm on X.\n\nI want a fresh start.','2024-01-03 11:52:46.939968','http://res.cloudinary.com/dz0dg0cxp/image/upload/v1704257564/whatsapp/xvblnuv6wfofurasfrw7.jpg','',3);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post_comments`
--

LOCK TABLES `post_comments` WRITE;
/*!40000 ALTER TABLE `post_comments` DISABLE KEYS */;
INSERT INTO `post_comments` VALUES (1,2),(1,4),(2,1),(3,3);
/*!40000 ALTER TABLE `post_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post_liked_post`
--

LOCK TABLES `post_liked_post` WRITE;
/*!40000 ALTER TABLE `post_liked_post` DISABLE KEYS */;
INSERT INTO `post_liked_post` VALUES (1,1),(1,2),(1,3),(2,2),(2,3),(3,2),(3,3),(5,3);
/*!40000 ALTER TABLE `post_liked_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post_seq`
--

LOCK TABLES `post_seq` WRITE;
/*!40000 ALTER TABLE `post_seq` DISABLE KEYS */;
INSERT INTO `post_seq` VALUES (101);
/*!40000 ALTER TABLE `post_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reels`
--

LOCK TABLES `reels` WRITE;
/*!40000 ALTER TABLE `reels` DISABLE KEYS */;
/*!40000 ALTER TABLE `reels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'http://res.cloudinary.com/dz0dg0cxp/image/upload/v1704256997/whatsapp/qmn0hat6brkk3fgvd9va.jpg',NULL,'2009 - 11 - 13','triquang@gmail.com',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0x',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0x','http://res.cloudinary.com/dz0dg0cxp/image/upload/v1704257002/whatsapp/pqow8aelurb8cf5dd7b5.jpg',NULL,'Quang Tri Nguyen','$2a$10$3oNvkRRd1..RXvKJ6J5h..kt1/grwrK/tOZldWvbHziCnhnpGyLSa',NULL,'LOCAL',NULL,'USER','triquang.95',NULL),(2,NULL,NULL,'2009 - 11 - 15','admin@gmail.com',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0x',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0x',NULL,NULL,' Elon Musk','$2a$10$hEro6FcGpBQIsQql0ReWSOQ49WA8frO8meoKC5RaQm43NeFEaXcTu',NULL,'LOCAL',NULL,'USER','elonmusk',NULL),(3,NULL,NULL,'undefined - undefined - undefined','triquang12@gmail.com',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0x',_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0\0w\0\0\0\0x',NULL,NULL,'Th·∫ø Gi·ªõi Ng·∫ßm Mafia','$2a$10$RfnI./R/AQ/6SkXO3HFcEelZFEI0VCklPIwEEJ0S4Bzo0YM1EOI9q',NULL,'LOCAL',NULL,'USER','operator1',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users_saved_post`
--

LOCK TABLES `users_saved_post` WRITE;
/*!40000 ALTER TABLE `users_saved_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_saved_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-03 11:58:35
