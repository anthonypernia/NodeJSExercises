---------Products-------
DROP TABLE IF EXISTS shop.products;
CREATE TABLE shop.products (
	`id` INT auto_increment PRIMARY KEY NOT NULL,
	`timestamp` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `code` VARCHAR(30) NOT NULL,
    `photo` VARCHAR(300) NULL,
	`price` BIGINT NOT NULL,
    `stock` INT NOT NULL
);

insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (1, '9/13/2021', 'Pear - Prickly', 'Pie Filling - Cherry', '41520-139', 'http://dummyimage.com/179x100.png/dddddd/000000', 681, 6);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (2, '5/29/2021', 'Water Chestnut - Canned', 'Pepper - Orange', '76151-207', 'http://dummyimage.com/208x100.png/dddddd/000000', 929, 10);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (3, '11/26/2020', 'Parsnip', 'Sprouts - Baby Pea Tendrils', '30142-685', 'http://dummyimage.com/167x100.png/ff4444/ffffff', 770, 3);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (4, '7/11/2021', 'Bread - Multigrain', 'Bulgar', '0268-6508', 'http://dummyimage.com/148x100.png/ff4444/ffffff', 945, 8);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (5, '11/2/2020', 'Pork Ham Prager', 'Cakes Assorted', '63187-173', 'http://dummyimage.com/176x100.png/cc0000/ffffff', 920, 14);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (6, '8/15/2021', 'Peas - Frozen', 'Broom And Broom Rack White', '37000-675', 'http://dummyimage.com/226x100.png/cc0000/ffffff', 666, 20);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (7, '1/30/2021', 'Pork - Belly Fresh', 'Orange - Canned, Mandarin', '53808-0484', 'http://dummyimage.com/159x100.png/dddddd/000000', 648, 13);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (8, '11/4/2021', 'Lettuce - Lolla Rosa', 'Sauce - Cranberry', '0054-3270', 'http://dummyimage.com/202x100.png/dddddd/000000', 801, 11);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (9, '7/29/2021', 'Cheese - Cheddar, Mild', 'Langers - Cranberry Cocktail', '52125-081', 'http://dummyimage.com/209x100.png/ff4444/ffffff', 503, 6);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (10, '3/26/2021', 'Wanton Wrap', 'Pie Filling - Pumpkin', '54868-6097', 'http://dummyimage.com/110x100.png/cc0000/ffffff', 707, 19);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (11, '7/28/2021', 'Canada Dry', 'Cheese Cloth No 60', '0135-0181', 'http://dummyimage.com/202x100.png/dddddd/000000', 656, 4);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (12, '10/11/2021', 'Calypso - Strawberry Lemonade', 'Gatorade - Orange', '49349-973', 'http://dummyimage.com/245x100.png/cc0000/ffffff', 747, 4);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (13, '9/21/2021', 'Table Cloth 62x120 White', 'Beans - Kidney, Red Dry', '49288-0743', 'http://dummyimage.com/111x100.png/cc0000/ffffff', 779, 15);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (14, '8/27/2021', 'Soup - Campbells Chili Veg', 'Juice - Lime', '54868-5368', 'http://dummyimage.com/180x100.png/5fa2dd/ffffff', 961, 10);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (15, '9/28/2021', 'Food Colouring - Green', 'Pork - Smoked Back Bacon', '36987-1552', 'http://dummyimage.com/229x100.png/dddddd/000000', 615, 13);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (16, '8/7/2021', 'Pork - Suckling Pig', 'Sping Loaded Cup Dispenser', '37000-836', 'http://dummyimage.com/114x100.png/ff4444/ffffff', 678, 10);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (17, '2/26/2021', 'Oil - Cooking Spray', 'Rum - White, Gg White', '62175-382', 'http://dummyimage.com/239x100.png/5fa2dd/ffffff', 540, 17);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (18, '3/12/2021', 'Potatoes - Fingerling 4 Oz', 'Roe - Lump Fish, Red', '54868-4798', 'http://dummyimage.com/198x100.png/cc0000/ffffff', 360, 12);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (19, '4/8/2021', 'Plasticforkblack', 'Thyme - Lemon, Fresh', '13537-439', 'http://dummyimage.com/159x100.png/ff4444/ffffff', 916, 6);
insert into shop.products (id, timestamp, name, description, code, photo, price, stock) values (20, '10/26/2021', 'Mushroom - Chantrelle, Fresh', 'Nectarines', '11410-128', 'http://dummyimage.com/241x100.png/cc0000/ffffff', 615, 12);

SELECT * FROM  shop.products;

--------------Cart-----------------
DROP TABLE IF EXISTS shop.carts;
CREATE TABLE shop.carts (
	`id` INT auto_increment PRIMARY KEY NOT NULL,
	`timestamp` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `code` VARCHAR(30) NOT NULL,
    `photo` VARCHAR(300) NULL,
	`price` BIGINT NOT NULL,
    `stock` INT NOT NULL
);
