USE `carribo`;

DROP TRIGGER IF EXISTS countries_AFTER_DELETE;     
DROP TRIGGER IF EXISTS profiles_AFTER_DELETE;      
DROP TRIGGER IF EXISTS ad_photos_AFTER_DELETE;     
DROP TRIGGER IF EXISTS comments_BEFORE_INSERT;     
DROP TRIGGER IF EXISTS comment_photos_AFTER_DELETE;
DROP TRIGGER IF EXISTS messages_BEFORE_INSERT;     
DROP TRIGGER IF EXISTS ads_BEFORE_INSERT;          
DROP TRIGGER IF EXISTS ads_BEFORE_UPDATE;          
DROP TRIGGER IF EXISTS ads_AFTER_DELETE;           
DROP TRIGGER IF EXISTS users_AFTER_DELETE;

DELIMITER $$
USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`countries_AFTER_DELETE` AFTER DELETE ON `countries` FOR EACH ROW
BEGIN
	IF NOT EXISTS(SELECT 1 FROM comment_photos WHERE OLD.logo_id = comment_photos.photo_id) AND
       NOT EXISTS(SELECT 1 FROM ad_photos WHERE OLD.logo_id = ad_photos.photo_id) AND
       NOT EXISTS(SELECT 1 FROM profiles WHERE OLD.logo_id = profiles.photo_id) THEN
		DELETE FROM photos WHERE photos.id = OLD.logo_id;
    END IF;
END$$

USE `carribo`$$
CREATE TRIGGER `carribo`.`ads_BEFORE_INSERT` BEFORE INSERT ON `ads` FOR EACH ROW
BEGIN
	SET NEW.created_at = CURRENT_TIMESTAMP, NEW.updated_at = CURRENT_TIMESTAMP;
END$$

USE `carribo`$$
CREATE TRIGGER `carribo`.`ads_BEFORE_UPDATE` BEFORE UPDATE ON `ads` FOR EACH ROW
BEGIN
	SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$

USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`ads_AFTER_DELETE` AFTER DELETE ON `ads` FOR EACH ROW
BEGIN
	IF NOT EXISTS(SELECT 1 FROM profiles WHERE profiles.location_id = OLD.location_id) THEN
		DELETE FROM locations WHERE locations.id = OLD.location_id;
    END IF;
END$$

USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`profiles_AFTER_DELETE` AFTER DELETE ON `profiles` FOR EACH ROW
BEGIN
	IF OLD.photo_id IS NOT NULL AND
       NOT EXISTS(SELECT 1 FROM comment_photos WHERE OLD.photo_id = comment_photos.photo_id) AND
       NOT EXISTS(SELECT 1 FROM ad_photos WHERE OLD.photo_id = ad_photos.photo_id) AND
       NOT EXISTS(SELECT 1 FROM countries WHERE countries.logo_id = OLD.photo_id) THEN
		DELETE FROM photos WHERE photos.id = OLD.photo_id;
    END IF;
END$$

USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`users_AFTER_DELETE` AFTER DELETE ON `users` FOR EACH ROW
BEGIN
	DELETE FROM profiles WHERE profiles.id = OLD.profile_id;
END$$

USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`ad_photos_AFTER_DELETE` AFTER DELETE ON `ad_photos` FOR EACH ROW
BEGIN
	IF NOT EXISTS(SELECT 1 FROM comment_photos WHERE OLD.photo_id = comment_photos.photo_id) AND
       NOT EXISTS(SELECT 1 FROM profiles WHERE profiles.photo_id = OLD.photo_id) AND
       NOT EXISTS(SELECT 1 FROM countries WHERE countries.logo_id = OLD.photo_id) THEN
		DELETE FROM photos WHERE photos.id = OLD.photo_id;
    END IF;
END$$

USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`comments_BEFORE_INSERT` BEFORE INSERT ON `comments` FOR EACH ROW
BEGIN
	SET NEW.created_at = CURRENT_TIMESTAMP;
END$$

USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`comment_photos_AFTER_DELETE` AFTER DELETE ON `comment_photos` FOR EACH ROW
BEGIN
	IF NOT EXISTS(SELECT 1 FROM ad_photos WHERE ad_photos.photo_id = OLD.photo_id) AND
       NOT EXISTS(SELECT 1 FROM profiles WHERE profiles.photo_id = OLD.photo_id) AND
       NOT EXISTS(SELECT 1 FROM countries WHERE countries.logo_id = OLD.photo_id) THEN
		DELETE FROM photos WHERE photos.id = OLD.photo_id;
    END IF;
END$$

USE `carribo`$$
CREATE DEFINER = CURRENT_USER TRIGGER `carribo`.`messages_BEFORE_INSERT` BEFORE INSERT ON `messages` FOR EACH ROW
BEGIN
	SET NEW.created_at = CURRENT_TIMESTAMP;
END$$
