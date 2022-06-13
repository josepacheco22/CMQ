-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: cmq
-- Source Schemata: cmq
-- Created: Sun Jun 12 23:10:02 2022
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;;

-- ----------------------------------------------------------------------------
-- Schema cmq
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `cmq` ;
CREATE SCHEMA IF NOT EXISTS `cmq` ;

-- ----------------------------------------------------------------------------
-- Table cmq.historia_archivado
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cmq`.`historia_archivado` (
  `id` INT(10) NOT NULL AUTO_INCREMENT ,
  `fecha_creacion` DATE NULL DEFAULT NULL ,
  `id_creado_usuario` VARCHAR(60) NULL DEFAULT NULL ,
  `creado_usuario` VARCHAR(50) NULL DEFAULT NULL ,
  `id_h` INT(6) NULL DEFAULT NULL ,
  `fecha_consulta_h` DATE NULL DEFAULT NULL ,
  `peso_h` INT(11) NULL DEFAULT NULL ,
  `talla_h` INT(11) NULL DEFAULT NULL ,
  `pulso_h` INT(11) NULL DEFAULT NULL ,
  `presion_arterial_h` VARCHAR(10) NULL DEFAULT NULL ,
  `temperatura_h` INT(11) NULL DEFAULT NULL ,
  `frecuencia_respiratoria_h` VARCHAR(10) NULL DEFAULT NULL ,
  `primera_consulta_h` DATE NULL DEFAULT NULL ,
  `motivo_consulta_h` VARCHAR(200) NULL DEFAULT NULL ,
  `enfermedad_actual_h` VARCHAR(200) NULL DEFAULT NULL ,
  `revisin_sistemas_h` VARCHAR(200) NULL DEFAULT NULL ,
  `a_p_p_h` VARCHAR(200) NULL DEFAULT NULL ,
  `a_p_f_h` VARCHAR(200) NULL DEFAULT NULL ,
  `examen_fisico_h` VARCHAR(200) NULL DEFAULT NULL ,
  `impresión_diagnostica_h` VARCHAR(200) NULL DEFAULT NULL ,
  `examenes_h` VARCHAR(200) NULL DEFAULT NULL ,
  `diagnostico_definitivo_h` VARCHAR(200) NULL DEFAULT NULL ,
  `tratamiento_h` VARCHAR(200) NULL DEFAULT NULL ,
  `archivado_h` BIT(1) NULL DEFAULT NULL ,
  `edad_h` VARCHAR(10) NULL DEFAULT NULL ,
  `id_paci` VARCHAR(60) NULL DEFAULT NULL ,
  `tipo_documento_paci` VARCHAR(15) NULL DEFAULT NULL ,
  `fecha_creacion_paci` DATE NULL DEFAULT NULL ,
  `numero_documento_paci` VARCHAR(15) NULL DEFAULT NULL ,
  `nombre_1_paci` VARCHAR(50) NULL DEFAULT NULL ,
  `nombre_2_paci` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_1_paci` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_2_paci` VARCHAR(50) NULL DEFAULT NULL ,
  `sexo_paci` VARCHAR(10) NULL DEFAULT NULL ,
  `correo_paci` VARCHAR(50) NULL DEFAULT NULL ,
  `telefono_1_paci` VARCHAR(25) NULL DEFAULT NULL ,
  `telefono_2_paci` VARCHAR(25) NULL DEFAULT NULL ,
  `fecha_nacimiento_paci` DATE NULL DEFAULT NULL ,
  `provincia_paci` VARCHAR(25) NULL DEFAULT NULL ,
  `canton_paci` VARCHAR(25) NULL DEFAULT NULL ,
  `direccion_paci` VARCHAR(200) NULL DEFAULT NULL ,
  `ocupacion_paci` VARCHAR(50) NULL DEFAULT NULL ,
  `id_pcpaci` VARCHAR(60) NULL DEFAULT NULL ,
  `tipo_documento_pcpaci` VARCHAR(15) NULL DEFAULT NULL ,
  `numero_documento_pcpaci` VARCHAR(10) NULL DEFAULT NULL ,
  `nombre_1_pcpaci` VARCHAR(50) NULL DEFAULT NULL ,
  `nombre_2_pcpaci` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_1_pcpaci` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_2_pcpaci` VARCHAR(50) NULL DEFAULT NULL ,
  `sexo_pcpaci` VARCHAR(10) NULL DEFAULT NULL ,
  `correo_pcpaci` VARCHAR(50) NULL DEFAULT NULL ,
  `telefono_1_pcpaci` VARCHAR(25) NULL DEFAULT NULL ,
  `telefono_2_pcpaci` VARCHAR(25) NULL DEFAULT NULL ,
  `fecha_nacimiento_pcpaci` DATE NULL DEFAULT NULL ,
  `cargo_pcpaci` VARCHAR(200) NULL DEFAULT NULL ,
  `especialidad_pcpaci` VARCHAR(50) NULL DEFAULT NULL ,
  `miniatura_pcpaci` VARCHAR(200) NULL DEFAULT NULL ,
  `foto_pcpaci` VARCHAR(200) NULL DEFAULT NULL ,
  `nombre_usuario_pcpaci` VARCHAR(60) NULL DEFAULT NULL ,
  `permisos_pcpaci` INT(11) NULL DEFAULT NULL ,
  `id_pc` VARCHAR(60) NULL DEFAULT NULL ,
  `tipo_documento_pc` VARCHAR(15) NULL DEFAULT NULL ,
  `numero_documento_pc` VARCHAR(10) NULL DEFAULT NULL ,
  `nombre_1_pc` VARCHAR(50) NULL DEFAULT NULL ,
  `nombre_2_pc` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_1_pc` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_2_pc` VARCHAR(50) NULL DEFAULT NULL ,
  `sexo_pc` VARCHAR(10) NULL DEFAULT NULL ,
  `correo_pc` VARCHAR(50) NULL DEFAULT NULL ,
  `telefono_1_pc` VARCHAR(25) NULL DEFAULT NULL ,
  `telefono_2_pc` VARCHAR(25) NULL DEFAULT NULL ,
  `fecha_nacimiento_pc` DATE NULL DEFAULT NULL ,
  `cargo_pc` VARCHAR(200) NULL DEFAULT NULL ,
  `especialidad_pc` VARCHAR(50) NULL DEFAULT NULL ,
  `miniatura_pc` VARCHAR(200) NULL DEFAULT NULL ,
  `foto_pc` VARCHAR(200) NULL DEFAULT NULL ,
  `nombre_usuario_upc` VARCHAR(60) NULL DEFAULT NULL ,
  `permisos_upc` INT(11) NULL DEFAULT NULL ,
  `id_pa` VARCHAR(60) NULL DEFAULT NULL ,
  `tipo_documento_pa` VARCHAR(15) NULL DEFAULT NULL ,
  `numero_documento_pa` VARCHAR(10) NULL DEFAULT NULL ,
  `nombre_1_pa` VARCHAR(50) NULL DEFAULT NULL ,
  `nombre_2_pa` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_1_pa` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_2_pa` VARCHAR(50) NULL DEFAULT NULL ,
  `sexo_pa` VARCHAR(10) NULL DEFAULT NULL ,
  `correo_pa` VARCHAR(50) NULL DEFAULT NULL ,
  `telefono_1_pa` VARCHAR(25) NULL DEFAULT NULL ,
  `telefono_2_pa` VARCHAR(25) NULL DEFAULT NULL ,
  `fecha_nacimiento_pa` DATE NULL DEFAULT NULL ,
  `cargo_pa` VARCHAR(200) NULL DEFAULT NULL ,
  `especialidad_pa` VARCHAR(50) NULL DEFAULT NULL ,
  `miniatura_pa` VARCHAR(200) NULL DEFAULT NULL ,
  `foto_pa` VARCHAR(200) NULL DEFAULT NULL ,
  `nombre_usuario_upa` VARCHAR(60) NULL DEFAULT NULL ,
  `permisos_upa` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4;

-- ----------------------------------------------------------------------------
-- Table cmq.historia_clinica
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cmq`.`historia_clinica` (
  `id` INT(6) NOT NULL AUTO_INCREMENT ,
  `habilitado` BIT(1) NULL DEFAULT NULL ,
  `id_paciente` VARCHAR(60) NULL DEFAULT NULL ,
  `id_personal_creado` VARCHAR(60) NULL DEFAULT NULL ,
  `id_personal_asignado` VARCHAR(60) NULL DEFAULT NULL ,
  `fecha_consulta` DATE NULL DEFAULT NULL ,
  `peso` INT(11) NULL DEFAULT NULL ,
  `talla` INT(11) NULL DEFAULT NULL ,
  `pulso` INT(11) NULL DEFAULT NULL ,
  `presion_arterial` VARCHAR(10) NULL DEFAULT NULL ,
  `temperatura` INT(11) NULL DEFAULT NULL ,
  `frecuencia_respiratoria` VARCHAR(10) NULL DEFAULT NULL ,
  `primera_consulta` DATE NULL DEFAULT NULL ,
  `motivo_consulta` VARCHAR(200) NULL DEFAULT NULL ,
  `enfermedad_actual` VARCHAR(200) NULL DEFAULT NULL ,
  `revisin_sistemas` VARCHAR(200) NULL DEFAULT NULL ,
  `a_p_p` VARCHAR(200) NULL DEFAULT NULL ,
  `a_p_f` VARCHAR(200) NULL DEFAULT NULL ,
  `examen_fisico` VARCHAR(200) NULL DEFAULT NULL ,
  `impresión_diagnostica` VARCHAR(200) NULL DEFAULT NULL ,
  `examenes` VARCHAR(200) NULL DEFAULT NULL ,
  `diagnostico_definitivo` VARCHAR(200) NULL DEFAULT NULL ,
  `tratamiento` VARCHAR(200) NULL DEFAULT NULL ,
  `archivado` BIT(1) NULL DEFAULT NULL ,
  `edad` VARCHAR(10) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_paciente` (`id_paciente` ASC) ,
  INDEX `id_personal_creado` (`id_personal_creado` ASC) ,
  INDEX `id_personal_asignado` (`id_personal_asignado` ASC) ,
  CONSTRAINT `historia_clinica_ibfk_1`
    FOREIGN KEY (`id_paciente` )
    REFERENCES `cmq`.`pacientes` (`id` ),
  CONSTRAINT `historia_clinica_ibfk_2`
    FOREIGN KEY (`id_personal_creado` )
    REFERENCES `cmq`.`personal` (`id` ),
  CONSTRAINT `historia_clinica_ibfk_3`
    FOREIGN KEY (`id_personal_asignado` )
    REFERENCES `cmq`.`personal` (`id` ))
ENGINE = InnoDB
AUTO_INCREMENT = 44
DEFAULT CHARACTER SET = utf8mb4;

-- ----------------------------------------------------------------------------
-- Table cmq.pacientes
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cmq`.`pacientes` (
  `id` VARCHAR(60) NOT NULL ,
  `tipo_documento` VARCHAR(15) NULL DEFAULT NULL ,
  `habilitado` BIT(1) NULL DEFAULT NULL ,
  `id_personal_creado` VARCHAR(60) NULL DEFAULT NULL ,
  `fecha_creacion` DATE NULL DEFAULT NULL ,
  `numero_documento` VARCHAR(15) NOT NULL ,
  `nombre_1` VARCHAR(50) NULL DEFAULT NULL ,
  `nombre_2` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_1` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_2` VARCHAR(50) NULL DEFAULT NULL ,
  `sexo` VARCHAR(10) NULL DEFAULT NULL ,
  `correo` VARCHAR(50) NULL DEFAULT NULL ,
  `telefono_1` VARCHAR(25) NULL DEFAULT NULL ,
  `telefono_2` VARCHAR(25) NULL DEFAULT NULL ,
  `fecha_nacimiento` DATE NULL DEFAULT NULL ,
  `provincia` VARCHAR(25) NULL DEFAULT NULL ,
  `canton` VARCHAR(25) NULL DEFAULT NULL ,
  `direccion` VARCHAR(200) NULL DEFAULT NULL ,
  `ocupacion` VARCHAR(50) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `numero_documento` (`numero_documento` ASC) ,
  INDEX `id_personal_creado` (`id_personal_creado` ASC) ,
  FULLTEXT INDEX `tipo_documento` (`tipo_documento` ASC, `id_personal_creado` ASC, `numero_documento` ASC, `nombre_1` ASC, `apellido_1` ASC, `canton` ASC) ,
  FULLTEXT INDEX `tipo_documento_2` (`tipo_documento` ASC, `id_personal_creado` ASC, `numero_documento` ASC, `nombre_1` ASC, `apellido_1` ASC, `canton` ASC) ,
  FULLTEXT INDEX `tipo_documento_3` (`tipo_documento` ASC, `id_personal_creado` ASC, `numero_documento` ASC, `nombre_1` ASC, `apellido_1` ASC, `canton` ASC) ,
  CONSTRAINT `pacientes_ibfk_1`
    FOREIGN KEY (`id_personal_creado` )
    REFERENCES `cmq`.`personal` (`id` ))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- ----------------------------------------------------------------------------
-- Table cmq.personal
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cmq`.`personal` (
  `id` VARCHAR(60) NOT NULL ,
  `habilitado` BIT(1) NULL DEFAULT NULL ,
  `tipo_documento` VARCHAR(15) NULL DEFAULT NULL ,
  `numero_documento` VARCHAR(10) NULL DEFAULT NULL ,
  `nombre_1` VARCHAR(50) NULL DEFAULT NULL ,
  `nombre_2` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_1` VARCHAR(50) NULL DEFAULT NULL ,
  `apellido_2` VARCHAR(50) NULL DEFAULT NULL ,
  `sexo` VARCHAR(10) NULL DEFAULT NULL ,
  `correo` VARCHAR(50) NULL DEFAULT NULL ,
  `telefono_1` VARCHAR(25) NULL DEFAULT NULL ,
  `telefono_2` VARCHAR(25) NULL DEFAULT NULL ,
  `fecha_nacimiento` DATE NULL DEFAULT NULL ,
  `cargo` VARCHAR(200) NULL DEFAULT NULL ,
  `especialidad` VARCHAR(50) NULL DEFAULT NULL ,
  `miniatura` VARCHAR(200) NULL DEFAULT NULL ,
  `foto` VARCHAR(200) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- ----------------------------------------------------------------------------
-- Table cmq.multimedia
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cmq`.`multimedia` (
  `id` VARCHAR(60) NOT NULL ,
  `habilitado` BIT(1) NULL DEFAULT NULL ,
  `id_paciente` VARCHAR(60) NULL DEFAULT NULL ,
  `id_personal_asignado` VARCHAR(60) NULL DEFAULT NULL ,
  `tipo_archivo` VARCHAR(10) NULL DEFAULT NULL ,
  `direccion_guardado` VARCHAR(200) NULL DEFAULT NULL ,
  `fecha` DATE NULL DEFAULT NULL ,
  `formato` VARCHAR(10) NULL DEFAULT NULL ,
  `peso` VARCHAR(10) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `id_paciente` (`id_paciente` ASC) ,
  INDEX `id_personal_asignado` (`id_personal_asignado` ASC) ,
  CONSTRAINT `multimedia_ibfk_1`
    FOREIGN KEY (`id_paciente` )
    REFERENCES `cmq`.`pacientes` (`id` ),
  CONSTRAINT `multimedia_ibfk_2`
    FOREIGN KEY (`id_personal_asignado` )
    REFERENCES `cmq`.`personal` (`id` ))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- ----------------------------------------------------------------------------
-- Table cmq.usuarios
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cmq`.`usuarios` (
  `nombre_usuario` VARCHAR(60) NOT NULL ,
  `contrasena_usuario` VARCHAR(255) NULL DEFAULT NULL ,
  `id_personal` VARCHAR(60) NULL DEFAULT NULL ,
  `permisos` INT(11) NULL DEFAULT NULL ,
  `habilitado` BIT(1) NULL DEFAULT NULL ,
  PRIMARY KEY (`nombre_usuario`) ,
  INDEX `id_personal` (`id_personal` ASC) ,
  CONSTRAINT `usuarios_ibfk_1`
    FOREIGN KEY (`id_personal`)
    REFERENCES `cmq`.`personal` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `cmq`.`usuarios` (`nombre_usuario`, `contrasena_usuario`, `permisos`, `habilitado`)
VALUES ('admin','$2y$10$YevM.1.dBfAilrf.n9IByO0w2Mli9HGXviln6s/qVRmCQTYy5iYSW',2,1);