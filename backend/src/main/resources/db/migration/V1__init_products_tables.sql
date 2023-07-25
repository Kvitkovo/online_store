CREATE TABLE categories (
	id bigint NOT NULL AUTO_INCREMENT,
	alias VARCHAR(250) NOT NULL,
	parent_id bigint NULL DEFAULT NULL,
	category_name VARCHAR(255) NOT NULL,
	meta_description TEXT NULL,
	meta_keywords TEXT NULL,
	description TEXT NULL,
	category_status varchar(50) NOT NULL DEFAULT 'ACTIVE',
	CONSTRAINT categories_pkey PRIMARY KEY (id),
	CONSTRAINT categories_fk_categories FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE TABLE colors (
	id bigint NOT NULL AUTO_INCREMENT,
	alias VARCHAR(250) NOT NULL,
	color_name VARCHAR(255) NOT NULL,
	CONSTRAINT colors_pkey PRIMARY KEY (id)
);

CREATE TABLE sizes (
	id bigint NOT NULL AUTO_INCREMENT,
	alias VARCHAR(250) NOT NULL,
	size_name VARCHAR(255) NOT NULL,
	size_min int,
	size_max int,
	CONSTRAINT colors_pkey PRIMARY KEY (id)
);

CREATE TABLE products (
	id bigint NOT NULL AUTO_INCREMENT,
	alias VARCHAR(250) NOT NULL,
	product_title varchar(250) NOT NULL,
	category_id bigint NOT NULL,
	meta_description TEXT,
	meta_keywords TEXT,
	description TEXT,
	price DOUBLE NULL DEFAULT 0,
	product_status varchar(50) NOT NULL DEFAULT 'ACTIVE',
	product_type varchar(50) NOT NULL DEFAULT 'ITEM',
	product_color bigint NULL DEFAULT NULL,
	product_height int NULL DEFAULT 0,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT products_pkey PRIMARY KEY (id),
	FULLTEXT INDEX fti_products_product_title (product_title),
	FULLTEXT INDEX fti_products_description (description),
	CONSTRAINT products_fk_categories FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE images (
	id bigint NOT NULL AUTO_INCREMENT,
	product_id bigint NOT NULL,
	image_name VARCHAR(255) NOT NULL,
	main_image BIT(1) NULL DEFAULT 0,
	image_url TEXT NOT NULL,
    image_url_small TEXT NOT NULL,
	CONSTRAINT images_pkey PRIMARY KEY (id),
	CONSTRAINT images_fk_products FOREIGN KEY (product_id) REFERENCES products(id)
);