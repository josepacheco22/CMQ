/*
 Navicat Premium Data Transfer

 Source Server         : JAPZ
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : 192.168.1.26:3306
 Source Schema         : cmq

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 05/05/2022 17:48:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for historia_clinica
-- ----------------------------
DROP TABLE IF EXISTS `historia_clinica`;
CREATE TABLE `historia_clinica`  (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `habilitado` bit(1) NULL DEFAULT NULL,
  `id_paciente` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_personal_creado` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_personal_asignado` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_consulta` date NULL DEFAULT NULL,
  `peso` int(11) NULL DEFAULT NULL,
  `talla` int(11) NULL DEFAULT NULL,
  `pulso` int(11) NULL DEFAULT NULL,
  `presion_arterial` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `temperatura` int(11) NULL DEFAULT NULL,
  `frecuencia_respiratoria` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `primera_consulta` date NULL DEFAULT NULL,
  `motivo_consulta` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `enfermedad_actual` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `revisin_sistemas` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `a_p_p` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `a_p_f` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `examen_fisico` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `impresión_diagnostica` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `examenes` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `diagnostico_definitivo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tratamiento` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `archivado` bit(1) NULL DEFAULT NULL,
  `edad` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_paciente`(`id_paciente`) USING BTREE,
  INDEX `id_personal_creado`(`id_personal_creado`) USING BTREE,
  INDEX `id_personal_asignado`(`id_personal_asignado`) USING BTREE,
  CONSTRAINT `historia_clinica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `historia_clinica_ibfk_2` FOREIGN KEY (`id_personal_creado`) REFERENCES `personal` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `historia_clinica_ibfk_3` FOREIGN KEY (`id_personal_asignado`) REFERENCES `personal` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2147483648 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of historia_clinica
-- ----------------------------
INSERT INTO `historia_clinica` VALUES (1, b'1', NULL, '6513b3b6-a244-11ec-8ec8-28924a4663c9', NULL, '1980-05-28', 0, 0, 0, '/', 0, '', '1990-05-05', '', '', '', '', '', '', '', '', '', '', b'0', '');
INSERT INTO `historia_clinica` VALUES (2, b'1', '19961c28-abb1-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '1980-05-28', 0, 0, 0, '/', 0, '', '1990-05-28', '', '', '', '', '', '', '', '', '', '', b'1', '');
INSERT INTO `historia_clinica` VALUES (3, b'1', '294771a1-aef9-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', NULL, '2022-03-31', 0, 0, 0, '/', 0, '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', b'1', '35 Años');
INSERT INTO `historia_clinica` VALUES (4, b'1', '294771a1-aef9-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '0000-00-00', 0, 0, 0, '/', 0, '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', b'0', '');
INSERT INTO `historia_clinica` VALUES (5, b'1', NULL, '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '0000-00-00', 0, 0, 0, '/', 0, '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', b'1', '');
INSERT INTO `historia_clinica` VALUES (6, b'1', NULL, '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-01', 0, 0, 0, '/', 0, '', '1990-05-28', '', '', '', '', '', '', '', '', '', '', b'1', '');
INSERT INTO `historia_clinica` VALUES (7, b'1', 'aa3d7bdc-aef9-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-01', 0, 0, 0, '/', 0, '', '1990-01-28', '', '', '', '', '', '', '', '', '', '', b'0', '22 Años');
INSERT INTO `historia_clinica` VALUES (8, b'1', '30c08492-a7b4-11ec-abd6-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-01', 0, 0, 0, '/', 0, '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', b'1', '27 Años');
INSERT INTO `historia_clinica` VALUES (9, b'1', 'cd470f2c-a86c-11ec-abd6-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-01', 0, 0, 0, '/', 0, '', '0000-00-00', '', '', '', '', '', '', '', '', '', '', b'0', '22 Dias');
INSERT INTO `historia_clinica` VALUES (10, b'1', '19961c28-abb1-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-04', 0, 0, 0, '/', 0, '', '2022-04-04', '', '', '', '', '', '', '', '', '', '', b'0', '');
INSERT INTO `historia_clinica` VALUES (13, b'1', NULL, '6513b3b6-a244-11ec-8ec8-28924a4663c9', NULL, '2022-04-21', 0, 0, 0, '/', 0, '', '2022-04-21', '', '', '', '', '', '', '', '', '', '', b'0', '');
INSERT INTO `historia_clinica` VALUES (15, b'1', NULL, '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-21', 0, 0, 0, '/', 0, '', '2022-04-21', '', '', '', '', '', '', '', '', '', '', b'0', '');
INSERT INTO `historia_clinica` VALUES (16, b'1', '294771a1-aef9-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-21', 0, 0, 0, '/', 0, '', '2022-04-21', '', '', '', '', '', '', '', '', '', '', b'0', '');
INSERT INTO `historia_clinica` VALUES (17, b'1', '294771a1-aef9-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', NULL, '2022-04-22', 0, 0, 0, '/', 0, '', '2022-04-22', '', '', '', '', '', '', '', '', '', '', b'0', '');
INSERT INTO `historia_clinica` VALUES (18, b'1', '2f557e67-a865-11ec-abd6-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-23', 0, 0, 0, '/', 0, '', '2022-04-23', '', '', '', '', '', '', '', '', '', '', b'1', '');
INSERT INTO `historia_clinica` VALUES (19, b'1', '30c08492-a7b4-11ec-abd6-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-23', 0, 0, 0, '/', 0, '', '2022-04-23', '', '', '', '', '', '', '', '', '', 'wdawdawdawdawaaaa', b'1', '');
INSERT INTO `historia_clinica` VALUES (20, b'1', '19961c28-abb1-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '19ca97bd-a610-11ec-abd6-28924a4663c9', '2022-04-29', 0, 0, 0, '/', 0, '', '1980-05-28', '', '', '', '', '', '', '', '', '', '', b'0', '22 Años');
INSERT INTO `historia_clinica` VALUES (21, b'1', '19961c28-abb1-11ec-9c8d-28924a4663c9', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '19ca97bd-a610-11ec-abd6-28924a4663c9', '2022-04-29', 0, 0, 0, '/', 0, '', '1980-05-28', '', '', '', '', '', '', '', '', '', '', b'1', '22 Años');

-- ----------------------------
-- Table structure for multimedia
-- ----------------------------
DROP TABLE IF EXISTS `multimedia`;
CREATE TABLE `multimedia`  (
  `id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `habilitado` bit(1) NULL DEFAULT NULL,
  `id_paciente` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_personal_asignado` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tipo_archivo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `direccion_guardado` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  `formato` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `peso` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_paciente`(`id_paciente`) USING BTREE,
  INDEX `id_personal_asignado`(`id_personal_asignado`) USING BTREE,
  CONSTRAINT `multimedia_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `multimedia_ibfk_2` FOREIGN KEY (`id_personal_asignado`) REFERENCES `personal` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pacientes
-- ----------------------------
DROP TABLE IF EXISTS `pacientes`;
CREATE TABLE `pacientes`  (
  `id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_documento` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `habilitado` bit(1) NULL DEFAULT NULL,
  `id_personal_creado` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_creacion` date NULL DEFAULT NULL,
  `numero_documento` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombre_1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombre_2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `apellido_1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `apellido_2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sexo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `correo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono_1` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono_2` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_nacimiento` date NULL DEFAULT NULL,
  `provincia` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `canton` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `direccion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ocupacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `numero_documento`(`numero_documento`) USING BTREE,
  INDEX `id_personal_creado`(`id_personal_creado`) USING BTREE,
  FULLTEXT INDEX `tipo_documento`(`tipo_documento`, `id_personal_creado`, `numero_documento`, `nombre_1`, `apellido_1`, `canton`),
  FULLTEXT INDEX `tipo_documento_2`(`tipo_documento`, `id_personal_creado`, `numero_documento`, `nombre_1`, `apellido_1`, `canton`),
  FULLTEXT INDEX `tipo_documento_3`(`tipo_documento`, `id_personal_creado`, `numero_documento`, `nombre_1`, `apellido_1`, `canton`),
  CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_personal_creado`) REFERENCES `personal` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pacientes
-- ----------------------------
INSERT INTO `pacientes` VALUES ('0e469533-a7b1-11ec-abd6-28924a4663c9', 'Pasaporte', b'1', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-03-19', '31215', '54654656', '7258', '5454654', '7885', 'Mujer', '1548964', '64846', '65656', '0000-00-00', 'Galápagos', 'Isabela', 'dasdasd', '546546');
INSERT INTO `pacientes` VALUES ('19961c28-abb1-11ec-9c8d-28924a4663c9', 'Cedula', b'1', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-03-24', '9846684648', 'Diego', 'Andrés', 'Ayo', 'Zamora', 'Hombre', 'diegoayo@gmail.com', '092-528-1255 ', '046-292-996', '1999-05-18', 'Esmeraldas', 'Quinindé', '5 esquinas', 'desempleado');
INSERT INTO `pacientes` VALUES ('20e06cd9-c841-11ec-9f45-28924a4663c9', 'Cedula', b'1', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-29', '5252785274', 'trdhrth', 'rtdhdrth', 'drth', 'rthrt', 'Hombre', '', '435-345-4344 ', '', '2022-04-20', '', '', '', '');
INSERT INTO `pacientes` VALUES ('294771a1-aef9-11ec-9c8d-28924a4663c9', 'Pasaporte', b'1', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-03-28', '1912 5152 616', 'jose', 'eduardo', 'pacheco', 'perez', 'Hombre', 'joseedu@gmail.com', '094-265-8869', '056-324-596', '1987-02-28', 'Guayas', 'Guayaquil', 'ikunij ubhbojhb jh j ubwe ed e indvh dfn viuihefov d iu vberfv b voue rfvu ub n uohbgvouie bje oberi er', 'Vendedor');
INSERT INTO `pacientes` VALUES ('2f557e67-a865-11ec-abd6-28924a4663c9', 'Cedula', b'1', 'ddc90196-a60f-11ec-abd6-28924a4663c9', '2022-03-20', '1311206104', 'jose', 'Andres', 'Pacheco', 'Zamora', 'Hombre', 'joseaandrespz@gmail.com', '099-657-5807 ', '052-004-585', '1994-08-22', 'Esmeraldas', 'Quinindé', '5 esquinas, frente TIA', 'programador');
INSERT INTO `pacientes` VALUES ('8b6093a0-c83b-11ec-9f45-28924a4663c9', 'Cedula', b'1', '6513b3b6-a244-11ec-8ec8-28924a4663c9', '2022-04-29', '1311206144', 'josue', 'eustaqio', 'peres', 'pereira', 'Hombre', 'pobrepintor@portuguez.com', '095-214-8852 ', '052-648-815', '2022-04-15', 'Pastaza', 'Mera', 'pinta pequeños paisajes por poca plata para poder pasear por paris', 'pelador');
INSERT INTO `pacientes` VALUES ('cd470f2c-a86c-11ec-abd6-28924a4663c9', 'Cedula', b'1', 'f2319422-a5a8-11ec-a01e-28924a4663c9', '2022-03-20', '1311206189', 'Irina', 'Monserrat', 'Pacheco ', 'Zamora', 'Mujer', 'irina-monse@gmail.com', '098-651-6312', '042-165-165', '1992-01-28', 'Los Rios', 'Quevedo', 'venus del rio quevedo', 'profesora');

-- ----------------------------
-- Table structure for personal
-- ----------------------------
DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal`  (
  `id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `habilitado` bit(1) NULL DEFAULT NULL,
  `tipo_documento` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `numero_documento` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombre_1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombre_2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `apellido_1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `apellido_2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sexo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `correo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono_1` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono_2` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha_nacimiento` date NULL DEFAULT NULL,
  `cargo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `especialidad` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `miniatura` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `foto` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal
-- ----------------------------
INSERT INTO `personal` VALUES ('19ca97bd-a610-11ec-abd6-28924a4663c9', b'1', 'Pasaporte', '7897987', '879879', '345', '7987987', '345', 'hombre', '4564647', '28828585', '822828', '0000-00-00', 'Doctor', 'Psicorehabilitación', '', '8');
INSERT INTO `personal` VALUES ('6513b3b6-a244-11ec-8ec8-28924a4663c9', b'1', 'Cedula', '1311206104', 'jose', 'andres', 'pacheco', 'zamora', 'hombre', 'joseaandrespz@gmail.com', '0996575807', '0996575012', '1994-08-22', 'Doctor', 'Ginecologia', '', '');
INSERT INTO `personal` VALUES ('bcf268f2-a5a8-11ec-a01e-28924a4663c9', b'1', 'Cedula', '1312131234', 'ububvuv', 'ds', 'gvygvtitgv', 'asdsad', 'mujer', '213213', '0996575807', '0996575807', '2022-03-22', 'Doctor', 'Cardiologia', '', 'wqw');
INSERT INTO `personal` VALUES ('ddc90196-a60f-11ec-abd6-28924a4663c9', b'1', 'Cedula', '645456465', '465465', 'dwd', '46546', 'dw', 'mujer', '65465464', '65465', '465446', '0000-00-00', 'Enfermeriar', '', '', '');
INSERT INTO `personal` VALUES ('f2319422-a5a8-11ec-a01e-28924a4663c9', b'1', 'Cedula', 'yhytryt', 'ytryt', 'wwd', 'rtyf', 'wdd', 'hombre', 'ytf', 'ytf', 'ytf', '2022-03-22', 'Doctor', 'Medicina General', '', 'ytf');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `nombre_usuario` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena_usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_personal` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `permisos` int(11) NULL DEFAULT NULL,
  `habilitado` bit(1) NULL DEFAULT NULL,
  PRIMARY KEY (`nombre_usuario`) USING BTREE,
  INDEX `id_personal`(`id_personal`) USING BTREE,
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_personal`) REFERENCES `personal` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES ('54654', '$2y$10$P57paFoU93KJ0pCz98H7muxcjDmj5WWCkevFW3sbOOcLMh2ObxfSa', 'ddc90196-a60f-11ec-abd6-28924a4663c9', 1, b'1');
INSERT INTO `usuarios` VALUES ('987', '$2y$10$aCj0NvvLOEROz4IS8GqPPO.5gmlnuqcOYwdgB5jx1hzkKmMIuZ0H.', '19ca97bd-a610-11ec-abd6-28924a4663c9', 1, b'1');
INSERT INTO `usuarios` VALUES ('admin', '$2y$10$YevM.1.dBfAilrf.n9IByO0w2Mli9HGXviln6s/qVRmCQTYy5iYSW', NULL, 2, b'1');
INSERT INTO `usuarios` VALUES ('itgvitviytvvuv', '$2y$10$0/jzxetWSUfvO0O.DRnqc.cfSu4Gfv99HhZ6tovG6VRMvRGHLP15O', 'bcf268f2-a5a8-11ec-a01e-28924a4663c9', 1, b'1');
INSERT INTO `usuarios` VALUES ('jpacheco', '$2y$10$YevM.1.dBfAilrf.n9IByO0w2Mli9HGXviln6s/qVRmCQTYy5iYSW', '6513b3b6-a244-11ec-8ec8-28924a4663c9', 1, b'1');
INSERT INTO `usuarios` VALUES ('ytf', '$2y$10$vgEBsIYLo43Ql9rbZkFSjeU5EirK2FVg05VxVW2sIpM45k51ZV7Za', 'f2319422-a5a8-11ec-a01e-28924a4663c9', 1, b'1');

SET FOREIGN_KEY_CHECKS = 1;
