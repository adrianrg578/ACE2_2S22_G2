USE puchingbag;

SELECT * FROM Usuario WHERE IdUser = "Juanito";
SELECT IdEntreno, Fuerza FROM datos WHERE IdUsuario = "Juanito" AND Fuerza>0 ORDER BY IdEntreno DESC LIMIT 1;
SELECT IdEntreno, velocidad FROM datos WHERE IdUsuario = "Juanito" AND velocidad>0 ORDER BY IdEntreno DESC LIMIT 1;
SELECT IdEntreno, ritmo, tiempo FROM datos WHERE IdUsuario = "Juanito" AND ritmo>0 ORDER BY IdEntreno DESC LIMIT 1;
INSERT INTO datos (IdUsuario, Fuerza, no_golpes, fecha) VALUES ("Juanito", "32","9","9/20/22");
INSERT INTO datos (IdUsuario, velocidad, no_golpes, fecha) VALUES ("Juanito", "56","9","9/20/22");
INSERT INTO datos (IdUsuario, ritmo, tiempo, no_golpes, fecha) VALUES ("Juanito", "1","0.7","9","9/20/22");

Select * from datos;
CREATE TABLE Usuario (
	IdUser VARCHAR(60) PRIMARY KEY,
	Contra VARCHAR(60) NOT NULL,
	Nombre VARCHAR(100) NOT NULL,
	Edad INT NOT NULL,
	peso INT NOT NULL,
	Genero VARCHAR(15) NOT NULL,
	Estatura DECIMAL(3,2) NOT NULL
);

CREATE TABLE datos (
	IdEntreno INT auto_increment PRIMARY KEY,
	IdUsuario VARCHAR(60) NOT NULL,
	velocidad VARCHAR(5) NULL,
	Fuerza VARCHAR(30) NULL,
	ritmo VARCHAR(2) NULL,
	tiempo VARCHAR(20) NULL,
	fecha VARCHAR(30) NULL,
	no_golpes VARCHAR(30) NULL,
	FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUser)
);

	
DROP TABLE datos;

SELECT * FROM datos;
SELECT * FROM Usuario;

-- select con where
SELECT Nombre, Edad, peso, Genero, Estatura  FROM Usuario WHERE IdUser = 'nuevo1' AND Contra = 'root';

-- Ingresar registros a datoss
INSERT INTO datos (velocidad, Fuerza, ritmo) VALUES ("13.53","120","0");

-- Ingresar registros a usuarios
INSERT INTO Usuario (IdUser, Contra, Nombre, Edad, peso, Genero, Estatura) 
VALUES ("nuevo1","root","Nombre Apellido", 19, 140,"Masculino",1.84);

-- Elimar registros
DELETE from Usuario WHERE IdUser = 'Nuevo_J';