alter table orders
add customer_name VARCHAR(255) NULL;

alter table orders
add customer_phone VARCHAR(255) NULL;

alter table orders
add customer_email VARCHAR(255) NULL;

alter table orders
add address_city VARCHAR(255) NULL;

alter table orders
add address_street VARCHAR(255) NULL;

alter table orders
add address_house VARCHAR(255) NULL;

alter table orders
add address_apartment VARCHAR(255) NULL;

alter table orders
add receiver_name VARCHAR(255) NULL;

alter table orders
add receiver_phone VARCHAR(255) NULL;

alter table orders
add date_of_shipment TIMESTAMP NULL;

alter table orders
add customer_id bigint DEFAULT NULL;

alter table orders
add FOREIGN KEY (customer_id) REFERENCES users(id);

alter table orders
add shop_id bigint NOT NULL;

ALTER TABLE orders
ADD FOREIGN KEY (shop_id) REFERENCES shops(id);

