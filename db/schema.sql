SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema carribo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `carribo` DEFAULT CHARACTER SET utf8 ;
USE `carribo` ;

-- -----------------------------------------------------
-- Table `carribo`.`characteristics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`characteristics` (
  `name` VARCHAR(255) NOT NULL,
  `type` ENUM('int', 'decimal', 'string') NOT NULL DEFAULT 'string',
  PRIMARY KEY (`name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carribo`.`photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`photos` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(100) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carribo`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`countries` (
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(2) NOT NULL,
  `logo_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`name`),
  CONSTRAINT `fk_countries_photos1`
    FOREIGN KEY (`logo_id`)
    REFERENCES `carribo`.`photos` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_countries_photos_idx` ON `carribo`.`countries` (`logo_id` ASC);

CREATE UNIQUE INDEX `code_UNIQUE` ON `carribo`.`countries` (`code` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`locations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(45) NULL DEFAULT '',
  `country_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_locations_countries1`
    FOREIGN KEY (`country_name`)
    REFERENCES `carribo`.`countries` (`name`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_locations_countries_idx` ON `carribo`.`locations` (`country_name` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`ads`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`ads` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cost` DECIMAL(13,2) UNSIGNED NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `header` VARCHAR(45) NOT NULL,
  `location_id` INT UNSIGNED NOT NULL,
  `engine_capacity` DECIMAL(3,2) UNSIGNED NULL DEFAULT NULL,
  `power` SMALLINT UNSIGNED NULL DEFAULT NULL,
  `engine_type` ENUM('diesel', 'petrol', 'electric', 'hybrid') NULL DEFAULT NULL,
  `year_of_production` SMALLINT UNSIGNED NULL DEFAULT NULL,
  `brand` VARCHAR(45) NULL DEFAULT NULL,
  `model` VARCHAR(45) NULL DEFAULT NULL,
  `mileage` INT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ads_locations1`
    FOREIGN KEY (`location_id`)
    REFERENCES `carribo`.`locations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ads_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `carribo`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_ads_locations_idx` ON `carribo`.`ads` (`location_id` ASC);

CREATE INDEX `ad_cost_idx` ON `carribo`.`ads` (`cost` ASC);

CREATE INDEX `ad_engine_capacity_idx` ON `carribo`.`ads` (`engine_capacity` ASC);

CREATE INDEX `ad_power_idx` ON `carribo`.`ads` (`power` ASC);

CREATE INDEX `ad_engine_type_idx` ON `carribo`.`ads` (`engine_type` ASC);

CREATE INDEX `ad_year_of_production_idx` ON `carribo`.`ads` (`year_of_production` ASC);

CREATE INDEX `ad_brand_idx` ON `carribo`.`ads` (`brand` ASC);

CREATE INDEX `ad_model_idx` ON `carribo`.`ads` (`model` ASC);

CREATE INDEX `ad_mileage_idx` ON `carribo`.`ads` (`mileage` ASC);

CREATE INDEX `fk_ads_users1_idx` ON `carribo`.`ads` (`author_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`ad_characteristics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`ad_characteristics` (
  `characteristic_name` VARCHAR(45) NOT NULL,
  `ad_id` BIGINT UNSIGNED NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ad_id`, `characteristic_name`),
  CONSTRAINT `fk_ad_characteristics_characteristics`
    FOREIGN KEY (`characteristic_name`)
    REFERENCES `carribo`.`characteristics` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ad_characteristics_ads`
    FOREIGN KEY (`ad_id`)
    REFERENCES `carribo`.`ads` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_ad_characteristics_ads_idx` ON `carribo`.`ad_characteristics` (`ad_id` ASC);

CREATE INDEX `fk_ad_characteristics_characteristics_idx` ON `carribo`.`ad_characteristics` (`characteristic_name` ASC);

CREATE INDEX `ad_characteristic_value_idx` ON `carribo`.`ad_characteristics` (`value` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`tags` (
  `name` VARCHAR(20) NOT NULL,
  `ad_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`ad_id`, `name`),
  CONSTRAINT `fk_tags_ads1`
    FOREIGN KEY (`ad_id`)
    REFERENCES `carribo`.`ads` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `tag_name_idx` ON `carribo`.`tags` (`name` ASC);

CREATE INDEX `tag_ad_idx` ON `carribo`.`tags` (`ad_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`profiles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `location_id` INT UNSIGNED NOT NULL,
  `photo_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_profiles_locations1`
    FOREIGN KEY (`location_id`)
    REFERENCES `carribo`.`locations` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_profiles_photos1`
    FOREIGN KEY (`photo_id`)
    REFERENCES `carribo`.`photos` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_profiles_locations_idx` ON `carribo`.`profiles` (`location_id` ASC);

CREATE INDEX `fk_profiles_photos_idx` ON `carribo`.`profiles` (`photo_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `profile_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_profiles1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `carribo`.`profiles` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `username_UNIQUE` ON `carribo`.`users` (`username` ASC);

CREATE INDEX `fk_users_profiles_idx` ON `carribo`.`users` (`profile_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`ad_wishes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`ad_wishes` (
  `ad_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`ad_id`, `user_id`),
  CONSTRAINT `fk_wish_ads_ads1`
    FOREIGN KEY (`ad_id`)
    REFERENCES `carribo`.`ads` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_wish_ads_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `carribo`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_wish_ads_users_idx` ON `carribo`.`ad_wishes` (`user_id` ASC);

CREATE INDEX `fk_wisth_ads_ads_idx` ON `carribo`.`ad_wishes` (`ad_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`contacts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `type` ENUM('mobile_phone', 'email') NOT NULL,
  `value` VARCHAR(45) NOT NULL,
  `profile_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_contacts_profiles1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `carribo`.`profiles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_contacts_profiles_idx` ON `carribo`.`contacts` (`profile_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`ad_contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`ad_contacts` (
  `ad_id` BIGINT UNSIGNED NOT NULL,
  `contact_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`ad_id`, `contact_id`),
  CONSTRAINT `fk_ad_contacts_ads1`
    FOREIGN KEY (`ad_id`)
    REFERENCES `carribo`.`ads` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ad_contacts_contacts1`
    FOREIGN KEY (`contact_id`)
    REFERENCES `carribo`.`contacts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_ad_contacts_contacts_idx` ON `carribo`.`ad_contacts` (`contact_id` ASC);

CREATE INDEX `fk_ad_contacts_ads_idx` ON `carribo`.`ad_contacts` (`ad_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`ad_photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`ad_photos` (
  `ad_id` BIGINT UNSIGNED NOT NULL,
  `photo_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`ad_id`, `photo_id`),
  CONSTRAINT `fk_ad_photos_ads1`
    FOREIGN KEY (`ad_id`)
    REFERENCES `carribo`.`ads` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ad_photos_photos1`
    FOREIGN KEY (`photo_id`)
    REFERENCES `carribo`.`photos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_ad_photos_photos_idx` ON `carribo`.`ad_photos` (`photo_id` ASC);

CREATE INDEX `fk_ad_photos_ads_idx` ON `carribo`.`ad_photos` (`ad_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`comments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ad_id` BIGINT UNSIGNED NOT NULL,
  `author_id` BIGINT UNSIGNED NOT NULL,
  `body_text` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comments_ads1`
    FOREIGN KEY (`ad_id`)
    REFERENCES `carribo`.`ads` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `carribo`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_comments_ads_idx` ON `carribo`.`comments` (`ad_id` ASC);

CREATE INDEX `fk_comments_users_idx` ON `carribo`.`comments` (`author_id` ASC);

CREATE INDEX `comment_created_at_idx` ON `carribo`.`comments` (`created_at` DESC);


-- -----------------------------------------------------
-- Table `carribo`.`comment_photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`comment_photos` (
  `comment_id` BIGINT UNSIGNED NOT NULL,
  `photo_id` BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (`comment_id`, `photo_id`),
  CONSTRAINT `fk_comment_photo_comments1`
    FOREIGN KEY (`comment_id`)
    REFERENCES `carribo`.`comments` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_photos_photos1`
    FOREIGN KEY (`photo_id`)
    REFERENCES `carribo`.`photos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_comment_photos_photos_idx` ON `carribo`.`comment_photos` (`photo_id` ASC);

CREATE INDEX `fk_comment_photos_comments_idx` ON `carribo`.`comment_photos` (`comment_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`messages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `author_id` BIGINT UNSIGNED NOT NULL,
  `receiver_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `carribo`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_messages_users2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `carribo`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_messages_author_idx` ON `carribo`.`messages` (`author_id` ASC);

CREATE INDEX `fk_messages_users_idx` ON `carribo`.`messages` (`receiver_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`formula_values`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`formula_values` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carribo`.`formulas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`formulas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(45) NOT NULL,
  `value_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_formulas_countries1`
    FOREIGN KEY (`country`)
    REFERENCES `carribo`.`countries` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_formulas_formula_values1`
    FOREIGN KEY (`value_id`)
    REFERENCES `carribo`.`formula_values` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_formulas_countries1_idx` ON `carribo`.`formulas` (`country` ASC);

CREATE INDEX `fk_formulas_formula_values1_idx` ON `carribo`.`formulas` (`value_id` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`formula_sources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`formula_sources` (
  `formula_id` INT UNSIGNED NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`formula_id`, `country`),
  CONSTRAINT `fk_formula_sources_formulas1`
    FOREIGN KEY (`formula_id`)
    REFERENCES `carribo`.`formulas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_formula_sources_countries1`
    FOREIGN KEY (`country`)
    REFERENCES `carribo`.`countries` (`name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_formula_sources_formulas1_idx` ON `carribo`.`formula_sources` (`formula_id` ASC);

CREATE INDEX `fk_formula_sources_countries1_idx` ON `carribo`.`formula_sources` (`country` ASC);


-- -----------------------------------------------------
-- Table `carribo`.`formula_mutations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carribo`.`formula_mutations` (
  `type` ENUM('sum', 'sub', 'mul', 'div', 'min', 'max') NOT NULL,
  `first_value_id` INT UNSIGNED NOT NULL,
  `second_value_id` INT UNSIGNED NOT NULL,
  `condition` VARCHAR(255) NULL,
  PRIMARY KEY (`second_value_id`, `first_value_id`),
  CONSTRAINT `fk_formula_mutations_formula_values1`
    FOREIGN KEY (`first_value_id`)
    REFERENCES `carribo`.`formula_values` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_formula_mutations_formula_values2`
    FOREIGN KEY (`second_value_id`)
    REFERENCES `carribo`.`formula_values` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_formula_mutations_formula_values1_idx` ON `carribo`.`formula_mutations` (`first_value_id` ASC);

CREATE INDEX `fk_formula_mutations_formula_values2_idx` ON `carribo`.`formula_mutations` (`second_value_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
