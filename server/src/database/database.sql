CREATE DATABASE desafio;

CREATE TABLE client(
    client_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

create table clients(
	id serial primary key,
	name varchar(100) not null,
	phone varchar(30),
	adress varchar(200),
	number integer,
	city varchar(100),
	state varchar(50),
	country varchar(100),
	cep integer
);

create table user(
	id serial primary key,
	name varchar(100) not null,
	email varchar(100) not null,
	passwor VARCHAR(50) notnull, 
);