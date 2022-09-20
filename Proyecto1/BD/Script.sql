USE puchingbag;

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