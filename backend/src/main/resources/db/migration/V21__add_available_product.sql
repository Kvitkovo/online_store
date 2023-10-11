alter table products
add in_orders int NULL DEFAULT 0;

alter table products
add available int NULL DEFAULT 0;