CREATE TABLE product_types (
	id bigint NOT NULL AUTO_INCREMENT,
	alias VARCHAR(250) NOT NULL,
	product_type_name VARCHAR(255) NOT NULL,
	CONSTRAINT product_types_pkey PRIMARY KEY (id)
);

ALTER TABLE products DROP COLUMN product_type;
ALTER TABLE products ADD product_type BIGINT NULL;

ALTER TABLE products
ADD FOREIGN KEY (product_type) REFERENCES product_types(id);