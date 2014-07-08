-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mar 08 Juillet 2014 à 17:17
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `chti-transport`
--
CREATE DATABASE IF NOT EXISTS `chti-transport` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `chti-transport`;

-- --------------------------------------------------------

--
-- Structure de la table `circuit`
--

CREATE TABLE IF NOT EXISTS `circuit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(64) NOT NULL,
  `depart_adresse` varchar(128) NOT NULL,
  `depart_ville` varchar(64) NOT NULL,
  `depart_cp` varchar(6) NOT NULL,
  `arrivee_adresse` varchar(128) NOT NULL,
  `arrivee_ville` varchar(64) NOT NULL,
  `arrivee_cp` varchar(6) NOT NULL,
  `date_creation` date NOT NULL,
  `data` blob,
  `updated_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(64) NOT NULL,
  `prenom` varchar(64) DEFAULT NULL,
  `telephone` varchar(11) NOT NULL,
  `adresse` varchar(128) NOT NULL,
  `ville` varchar(64) NOT NULL,
  `cp` varchar(6) NOT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `client`
--

INSERT INTO `client` (`id`, `nom`, `prenom`, `telephone`, `adresse`, `ville`, `cp`, `updated_at`, `created_at`) VALUES
(1, 'Péchaud-Rivière', 'Pierre', '05454454455', 'résidence Eurofac, tour 5, app 311', 'Gradignan', '33170', NULL, NULL),
(2, 'Ronald', 'Mac Donald', '00005444545', '5 Avenue de la libération', 'Paris', '75000', NULL, NULL),
(3, 'Dao', 'Etienne', '00005444545', '5 Avenue de la libération', 'Bordeaux', '33000', NULL, NULL),
(5, 'sdfdsfds', 'fdsfsdfsdf', '5456546546', '456546546', '546456456', '456546', '2014-07-08', '2014-07-08'),
(6, 'dsfsdfds', 'fdsfdsfsd', '5654645645', 'fdgdfgdfgdfgdf', 'gfdgfdgfdgfdg', '246546', '2014-07-08', '2014-07-08'),
(7, 'sdfdsfdsfs', 'fdsfsdfsdfsdf', '5654645645', 'gfdgdfgfdgfd', 'fdgdfgdfgdf', '33154', '2014-07-08', '2014-07-08');

-- --------------------------------------------------------

--
-- Structure de la table `client_circuit`
--

CREATE TABLE IF NOT EXISTS `client_circuit` (
  `id_client` int(11) NOT NULL,
  `id_circuit` int(11) NOT NULL,
  PRIMARY KEY (`id_client`,`id_circuit`),
  KEY `id_circuit_exist` (`id_circuit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

CREATE TABLE IF NOT EXISTS `facture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numéro` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `planning`
--

CREATE TABLE IF NOT EXISTS `planning` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mois` int(11) NOT NULL,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `temoignage`
--

CREATE TABLE IF NOT EXISTS `temoignage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(64) NOT NULL,
  `prenom` varchar(64) NOT NULL,
  `message` text NOT NULL,
  `date` date NOT NULL,
  `valide` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `temoignage`
--

INSERT INTO `temoignage` (`id`, `nom`, `prenom`, `message`, `date`, `valide`) VALUES
(1, 'péchaud-rivière', 'pierre', 'c''ets trop cool , ;P $*ù$', '2014-06-12', 0);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `nicename` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_n` (`username`),
  UNIQUE KEY `user_e` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `nicename`, `email`, `password`) VALUES
(2, 'Calarith', 'Pierre Péchaud-Rivière', 'p.pechaudriviere@gmail.com', 'eb399bcaca686f8609137153307eecf1');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `client_circuit`
--
ALTER TABLE `client_circuit`
  ADD CONSTRAINT `id_circuit_exist` FOREIGN KEY (`id_circuit`) REFERENCES `circuit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_client_exist` FOREIGN KEY (`id_client`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
