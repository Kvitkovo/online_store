ALTER TABLE `product_types` CHANGE COLUMN `alias` `alias` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;
ALTER TABLE `categories` CHANGE COLUMN `alias` `alias` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;
ALTER TABLE `colors` CHANGE COLUMN `alias` `alias` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;
ALTER TABLE `images` CHANGE COLUMN `image_name` `image_name` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;
ALTER TABLE `products` CHANGE COLUMN `alias` `alias` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;
ALTER TABLE `shops` CHANGE COLUMN `alias` `alias` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;
ALTER TABLE `sizes` CHANGE COLUMN `alias` `alias` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;