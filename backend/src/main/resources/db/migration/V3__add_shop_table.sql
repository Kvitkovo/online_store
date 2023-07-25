CREATE TABLE shops (
	id bigint NOT NULL AUTO_INCREMENT,
	alias VARCHAR(250) NOT NULL,
	title VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	CONSTRAINT shops_pkey PRIMARY KEY (id)
);

INSERT INTO shops (alias,title, email, phone, city, address)
VALUES ('Kvitkovo', 'Kvitkovo', 'kvitkovo@email.com','099-000-00-01', 'м. Київ', 'вул. Хрещатик, 36');