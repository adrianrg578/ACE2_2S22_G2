CREATE TABLE Usuario (     idUsuario int not null auto_increment,     username varchar(8) not null,     nombre varchar(20) not null,     apellido varchar(20) not null,     edad int not null,     peso int not null,     genero char(1) not null,     estatura int not null,     PRIMARY KEY (idUsuario) )


CREATE TABLE Datos (
	idDato int not null auto_increment,
    idUsuario int not null,
    bpm int not null,
    oxigeno int not null,
    distancia int not null,
    repeticion int not null,
    primary key (idDato),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
); 

INSERT into Usuario (username, nombre, apellido, edad, peso, genero, estatura)
VALUES ('juanito', 'Juan', 'Valdez', 59, 180, 'm', 170); 

ALTER TABLE Usuario
ADD COLUMN pass VARCHAR(15) not null AFTER username;

update Usuario
Set 
pass = '1234'
WHERE
idUsuario = 1

ALTER TABLE Datos
ADD COLUMN fecha Date not null AFTER idUsuario;