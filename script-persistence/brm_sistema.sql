-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 28-06-2024 a las 10:18:28
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `brm_sistema`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventory_movements`
--

DROP TABLE IF EXISTS `inventory_movements`;
CREATE TABLE IF NOT EXISTS `inventory_movements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `movementType` enum('In','Out') COLLATE utf8_unicode_ci DEFAULT NULL,
  `units` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `inventory_movements`
--

INSERT INTO `inventory_movements` (`id`, `idUser`, `idProduct`, `movementType`, `units`, `createdAt`) VALUES
(6, 1, 2, 'Out', 2, '2024-06-28 15:01:34'),
(5, 1, 1, 'Out', 2, '2024-06-28 15:01:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persons`
--

DROP TABLE IF EXISTS `persons`;
CREATE TABLE IF NOT EXISTS `persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `document` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `persons`
--

INSERT INTO `persons` (`id`, `name`, `lastname`, `document`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Ever', 'Lazo castillo', '1007398881', 'Av 334 -80 - 65', '2024-06-28 10:18:45', '2024-06-28 13:54:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUserRegister` int(11) NOT NULL,
  `lotNumber` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `idUserRegister`, `lotNumber`, `name`, `price`, `stock`, `createdAt`, `updatedAt`) VALUES
(1, 1, 231, 'Sandalias', 1500, 16, '2024-06-28 05:28:23', '2024-06-28 15:01:34'),
(2, 1, 584, 'Tennis', 1250, 11, '2024-06-28 06:20:01', '2024-06-28 15:01:34'),
(3, 1, 457, 'Guayos', 1700, 10, '2024-06-28 10:22:31', '2024-06-28 13:57:39');

--
-- Disparadores `products`
--
DROP TRIGGER IF EXISTS `after_product_stock_in`;
DELIMITER $$
CREATE TRIGGER `after_product_stock_in` AFTER UPDATE ON `products` FOR EACH ROW BEGIN
    IF NEW.stock > OLD.stock THEN
        INSERT INTO inventory_movements (idUser, idProduct, movementType, units, createdAt)
        VALUES (NEW.idUserRegister, NEW.id, 'In', NEW.stock - OLD.stock, NOW());
    END IF;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `after_product_stock_out`;
DELIMITER $$
CREATE TRIGGER `after_product_stock_out` AFTER UPDATE ON `products` FOR EACH ROW BEGIN
    IF NEW.stock < OLD.stock THEN
        INSERT INTO inventory_movements (idUser, idProduct, movementType, units, createdAt)
        VALUES (NEW.idUserRegister, NEW.id, 'Out', OLD.stock - NEW.stock, NOW());
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

DROP TABLE IF EXISTS `purchases`;
CREATE TABLE IF NOT EXISTS `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `totalPrice` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_purchase_user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`id`, `idUser`, `totalPrice`, `createdAt`, `updatedAt`) VALUES
(1, 1, 5500, '2024-06-28 15:01:34', '2024-06-28 15:01:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase_products`
--

DROP TABLE IF EXISTS `purchase_products`;
CREATE TABLE IF NOT EXISTS `purchase_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPurchase` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `purchase_product_prod` (`idProduct`),
  KEY `purchase_product_pur` (`idPurchase`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `purchase_products`
--

INSERT INTO `purchase_products` (`id`, `idPurchase`, `idProduct`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, 1500, '2024-06-28 15:01:34', '2024-06-28 15:01:34'),
(2, 1, 2, 2, 1250, '2024-06-28 15:01:34', '2024-06-28 15:01:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', 'Encargado de la administracion general del sistema', '2024-06-27 20:33:17', '2024-06-27 20:33:17'),
(2, 'Cliente', 'Utiliza los servicios o productos ofrecidos por el sistema', '2024-06-27 20:33:17', '2024-06-27 20:51:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPerson` int(11) NOT NULL,
  `idRole` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_user_person` (`idPerson`),
  KEY `fk_user_role` (`idRole`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `idPerson`, `idRole`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(4, 1, 1, 'administrador', '$2b$10$tVcCONGmXpRBgvDx57AQXuktwVIOuYE3gNAxLaLaBq3fBQkI/3iQK', '2024-06-28 14:21:57', '2024-06-28 15:15:04');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `purchase_products`
--
ALTER TABLE `purchase_products`
  ADD CONSTRAINT `purchase_product_prod` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `purchase_product_pur` FOREIGN KEY (`idPurchase`) REFERENCES `purchases` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
