-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 01, 2021 at 04:08 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `chat_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(150) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `message`, `time`, `username`) VALUES
(1, 'hjkk', '2021-10-31 14:31:02', 'iqrar'),
(2, 'how', '2021-10-31 14:31:07', 'iqrar'),
(3, 'kyo', '2021-10-31 14:31:13', 'iqrar'),
(4, 'hoo', '2021-10-31 15:47:19', 'iqrar'),
(5, 'okkk', '2021-10-31 15:47:27', 'raju'),
(6, 'htfhgh', '2021-10-31 22:43:12', 'iqrar'),
(7, 'ohhh', '2021-10-31 22:46:57', 'iqrar'),
(8, 'hello raj', '2021-11-01 18:04:24', 'iqrar'),
(9, 'hello', '2021-11-01 18:08:14', 'iqrar');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `time`) VALUES
(3, 'iqrar khan', 'iqrar@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-11-01 21:30:41'),
(4, 'raj', 'raj@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2021-11-01 21:38:09');
