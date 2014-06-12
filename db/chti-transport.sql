-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Jeu 12 Juin 2014 à 12:54
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
  `libelle` varchar(64) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `depart_adresse` varchar(128) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `depart_ville` varchar(64) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `depart_cp` varchar(6) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `arrivee_adresse` varchar(128) NOT NULL,
  `arrivee_ville` varchar(64) NOT NULL,
  `arrivee_cp` varchar(6) NOT NULL,
  `date_creation` date NOT NULL,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(64) COLLATE latin1_general_cs NOT NULL,
  `prénom` varchar(64) COLLATE latin1_general_cs DEFAULT NULL,
  `téléphone` varchar(11) COLLATE latin1_general_cs NOT NULL,
  `adresse` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `client_circuit`
--

CREATE TABLE IF NOT EXISTS `client_circuit` (
  `id_client` int(11) NOT NULL,
  `id_circuit` int(11) NOT NULL,
  PRIMARY KEY (`id_client`,`id_circuit`),
  KEY `id_circuit_exist` (`id_circuit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `planning`
--

CREATE TABLE IF NOT EXISTS `planning` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mois` int(11) NOT NULL,
  `data` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs AUTO_INCREMENT=1 ;

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
  `username` varchar(50) COLLATE latin1_general_cs NOT NULL DEFAULT '',
  `nicename` varchar(255) COLLATE latin1_general_cs NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE latin1_general_cs NOT NULL DEFAULT '',
  `password` varchar(255) COLLATE latin1_general_cs NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_n` (`username`),
  UNIQUE KEY `user_e` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs AUTO_INCREMENT=2 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `nicename`, `email`, `password`) VALUES
(1, 'Calarith', 'Pierre Péchaud-Rivière', '', '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684');

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
