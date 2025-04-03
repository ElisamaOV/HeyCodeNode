CREATE DATABASE DesignSocial;
USE DesignSocial;

CREATE TABLE designer (
	id_designer INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    city VARCHAR(90) NOT NULL,
	phone VARCHAR(50) NOT NULL UNIQUE,
    img_designer VARCHAR(100),
    designer_is_deleted BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE design (
	id_design INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_designer INT UNSIGNED NOT NULL,
    name VARCHAR(60) NOT NULL,
    orientation VARCHAR(60) NOT NULL,
    fabric VARCHAR(60) NOT NULL,
	color VARCHAR(30) NOT NULL,
	type VARCHAR(60) NOT NULL,
    description VARCHAR(200) NOT NULL,
    img_designer VARCHAR(100),
    design_is_deleted BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_design_designer FOREIGN KEY (id_designer)
    REFERENCES designer(id_designer) ON DELETE CASCADE ON UPDATE CASCADE
);