CREATE TABLE users (
	id bigint NOT NULL AUTO_INCREMENT,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	status varchar(50) NOT NULL DEFAULT 'ACTIVE',
	user_name varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	phone varchar(255),
	password varchar(255),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	UNIQUE INDEX user_name_uix (user_name),
	UNIQUE INDEX email_uix (email),
	UNIQUE INDEX phone_uix (phone)
);

CREATE TABLE roles (
	id bigint NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);

INSERT INTO roles (name) VALUES ("ROLE_USER");
INSERT INTO roles (name) VALUES ("ROLE_ADMIN");

CREATE TABLE user_roles(
    user_id bigint,
    role_id bigint,
    CONSTRAINT user_roles_fk_users FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT user_roles_fk_roles FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO users (user_name,email, password, first_name)
VALUES ('admin@email.com', 'admin@email.com', '$2a$10$5qBqaBeWBCgn61.C1A7MtejTofjljRTMsLs5NhG55cQ2sSeGIZA0u', 'admin');

INSERT INTO user_roles(user_id, role_id)
VALUES (1, 2);