USE carribo;

INSERT INTO `countries`
  (`name`      , `code`)
VALUES
  ('Belarus'   , 'BY'),
  ('Russia'    , 'RU'),
  ('Ukraine'   , 'UA'),
  ('Lithuania' , 'LT'),
  ('Latvia'    , 'LV'),
  ('Poland'    , 'PL'),
  ('Estonia'   , 'EE'),
  ('Spain'     , 'ES'),
  ('Italy'     , 'IT'),
  ('Germany'   , 'DE');


INSERT INTO `formula_values`
  (`id` , `value`                              , `description`)
VALUES
  (1    , 'cost'                               , 'Cost')                         ,
  (2    , '235'                                , 'Recycling duty')               ,
  (3    , '352'                                , 'Recycling duty')               ,
  (4    , '35'                                 , 'Car registration')             ,
  (5    , '350'                                , 'Car delivery')                 ,

  (6    , 'cost'                               , 'Cost')                         ,
  (7    , '235'                                , 'Recycling duty')               ,
  (8    , '352'                                , 'Recycling duty')               ,
  (9    , '35'                                 , 'Car registration')             ,
  (10   , '560'                                , 'Car delivery')                 ,
  (11   , '57'                                 , 'Customs duty')                 ,

  (12   , 'cost * 0.54'                        , 'Customs clearance')            ,
  (13   , 'engine_capacity * 1000 * 2.5 * eur' , 'No less than 2,5 € per 1 cm³') ,
  (14   , 'cost * 0.48'                        , 'Customs clearance')            ,
  (15   , 'engine_capacity * 1000 * 3.5 * eur' , 'No less than 3,5 € per 1 cm³') ,
  (16   , 'cost * 0.48'                        , 'Customs clearance')            ,
  (17   , 'engine_capacity * 1000 * 5.5 * eur' , 'No less than 5,5 € per 1 cm³') ,
  (18   , 'cost * 0.48'                        , 'Customs clearance')            ,
  (19   , 'engine_capacity * 1000 * 7.5 * eur' , 'No less than 7,5 € per 1 cm³') ,
  (20   , 'cost * 0.48'                        , 'Customs clearance')            ,
  (21   , 'engine_capacity * 1000 * 15 * eur'  , 'No less than 15 € per 1 cm³')  ,
  (22   , 'cost * 0.48'                        , 'Customs clearance')            ,
  (23   , 'engine_capacity * 1000 * 20 * eur'  , 'No less than 20 € per 1 cm³')  ,

  (24   , 'engine_capacity * 1000 * 1.5 * eur' , '1,5 € per 1 cm³')              ,
  (25   , 'engine_capacity * 1000 * 1.7 * eur' , '1,7 € per 1 cm³')              ,
  (26   , 'engine_capacity * 1000 * 2.5 * eur' , '2,5 € per 1 cm³')              ,
  (27   , 'engine_capacity * 1000 * 2.7 * eur' , '2,7 € per 1 cm³')              ,
  (28   , 'engine_capacity * 1000 * 3 * eur'   , '3 € per 1 cm³')                ,
  (29   , 'engine_capacity * 1000 * 3.6 * eur' , '3,6 € per 1 cm³')              ,

  (30   , 'engine_capacity * 1000 * 3 * eur'   , '3 € per 1 cm³')                ,
  (31   , 'engine_capacity * 1000 * 3.2 * eur' , '3,2 € per 1 cm³')              ,
  (32   , 'engine_capacity * 1000 * 3.5 * eur' , '3,5 € per 1 cm³')              ,
  (33   , 'engine_capacity * 1000 * 4.8 * eur' , '4,8 € per 1 cm³')              ,
  (34   , 'engine_capacity * 1000 * 5 * eur'   , '5 € per 1 cm³')                ,
  (35   , 'engine_capacity * 1000 * 5.7 * eur' , '5,7 € per 1 cm³')              ;


INSERT INTO `formula_mutations`
  (`type` , `first_value_id` , `second_value_id` , `condition`)
VALUES
  ('sum'  , 1                , 2                 , 'age <= 3')                                                                                                            ,
  ('sum'  , 1                , 3                 , 'age > 3')                                                                                                             ,
  ('sum'  , 1                , 4                 , NULL)                                                                                                                  ,
  ('sum'  , 1                , 5                 , NULL)                                                                                                                  ,

  ('sum'  , 6                , 7                 , 'age <= 3')                                                                                                            ,
  ('sum'  , 6                , 8                 , 'age > 3')                                                                                                             ,
  ('sum'  , 6                , 9                 , NULL)                                                                                                                  ,
  ('sum'  , 6                , 11                , NULL)                                                                                                                  ,
  ('sum'  , 6                , 10                , NULL)                                                                                                                  ,
  ('sum'  , 6                , 12                , '(engine_type != \'electric\') and (age <= 3) and (cost <= 8500 * eur)')                                               ,
  ('max'  , 12               , 13                , NULL)                                                                                                                  ,
  ('sum'  , 6                , 14                , '(engine_type != \'electric\') and (age <= 3) and (cost > 8500 * eur) and (cost <= 16700 * eur)')                      ,
  ('max'  , 14               , 15                , NULL)                                                                                                                  ,
  ('sum'  , 6                , 16                , '(engine_type != \'electric\') and (age <= 3) and (cost > 16700 * eur) and (cost <= 42300 * eur)')                     ,
  ('max'  , 16               , 17                , NULL)                                                                                                                  ,
  ('sum'  , 6                , 18                , '(engine_type != \'electric\') and (age <= 3) and (cost > 42300 * eur) and (cost <= 84500 * eur)')                     ,
  ('max'  , 18               , 19                , NULL)                                                                                                                  ,
  ('sum'  , 6                , 20                , '(engine_type != \'electric\') and (age <= 3) and (cost > 84500 * eur) and (cost <= 169000 * eur)')                    ,
  ('max'  , 20               , 21                , NULL)                                                                                                                  ,
  ('sum'  , 6                , 22                , '(engine_type != \'electric\') and (age <= 3) and (cost > 169000 * eur)')                                              ,
  ('max'  , 22               , 23                , NULL)                                                                                                                  ,

  ('sum'  , 6                , 24                , '(engine_type != \'electric\') and (age > 3) and (age <= 5) and (engine_capacity <= 1)')                               ,
  ('sum'  , 6                , 25                , '(engine_type != \'electric\') and (age > 3) and (age <= 5) and (engine_capacity > 1) and (engine_capacity <= 1.5)')   ,
  ('sum'  , 6                , 26                , '(engine_type != \'electric\') and (age > 3) and (age <= 5) and (engine_capacity > 1.5) and (engine_capacity <= 1.8)') ,
  ('sum'  , 6                , 27                , '(engine_type != \'electric\') and (age > 3) and (age <= 5) and (engine_capacity > 1.8) and (engine_capacity <= 2.3)') ,
  ('sum'  , 6                , 28                , '(engine_type != \'electric\') and (age > 3) and (age <= 5) and (engine_capacity > 2.3) and (engine_capacity <= 3)')   ,
  ('sum'  , 6                , 29                , '(engine_type != \'electric\') and (age > 3) and (age <= 5) and (engine_capacity > 3)')                                ,

  ('sum'  , 6                , 30                , '(engine_type != \'electric\') and (age > 5) and (engine_capacity <= 1)')                                              ,
  ('sum'  , 6                , 31                , '(engine_type != \'electric\') and (age > 5) and (engine_capacity > 1) and (engine_capacity <= 1.5)')                  ,
  ('sum'  , 6                , 32                , '(engine_type != \'electric\') and (age > 5) and (engine_capacity > 1.5) and (engine_capacity <= 1.8)')                ,
  ('sum'  , 6                , 33                , '(engine_type != \'electric\') and (age > 5) and (engine_capacity > 1.8) and (engine_capacity <= 2.3)')                ,
  ('sum'  , 6                , 34                , '(engine_type != \'electric\') and (age > 5) and (engine_capacity > 2.3) and (engine_capacity <= 3)')                  ,
  ('sum'  , 6                , 35                , '(engine_type != \'electric\') and (age > 5) and (engine_capacity > 3)');


INSERT INTO `formulas`
  (`id` , `value_id` , `country`)
VALUES
  (1    , 1          , 'Belarus') ,
  (2    , 6          , 'Belarus');


INSERT INTO `formula_sources`
  (`formula_id` , `country`)
VALUES
  (1            , 'Russia')     ,
  (2            , 'Lithuania' ) ,
  (2            , 'Latvia'    ) ,
  (2            , 'Poland'    ) ,
  (2            , 'Estonia'   ) ,
  (2            , 'Spain'     ) ,
  (2            , 'Italy'     ) ,
  (2            , 'Germany'   );


INSERT INTO `locations`
  (`address`                             , `country_name`)
VALUES
  ('Minsk, Lenina 55'                    , 'Belarus')   ,
  ('Gomel, Pobedy 14'                    , 'Belarus')   ,
  ('Mogilev'                             , 'Belarus')   ,
  ('Brest'                               , 'Belarus')   ,
  ('Ivacevichi'                          , 'Belarus')   ,
  ('Kiev, Lenina 32'                     , 'Ukraine')   ,
  ('Moscow, Lenina 43'                   , 'Russia')    ,
  ('Vilnius, Uzupis 2'                   , 'Lithuania') ,
  ('Barcelona'                           , 'Spain')     ,
  ('Smolensk'                            , 'Russia')    ;


INSERT INTO `profiles`
  (`name`  , `location_id` , `photo_id`)
VALUES
  ('Pavel' , 1             , NULL ),
  ('Julia' , 5             , NULL ),
  ('Masha' , 7             , NULL ),
  ('Nata'  , 9             , NULL ),
  ('Sasha' , 2             , NULL ),
  ('Pasha' , 3             , NULL ),
  ('Kasha' , 4             , NULL ),
  ('Lasha' , 6             , NULL ),
  ('Zasha' , 8             , NULL ),
  ('Tina'  , 10            , NULL );


INSERT INTO `users`
  (`id` , `username`     , `password` , `role`  , `profile_id`)
VALUES
  (1    , 'pavelp'       , 'sadfasdf' , 'admin' , 1 ) ,
  (2    , 'yulka.marhun' , '1111111'  , 'admin' , 2 ) ,
  (3    , 'sdfasdfsdaf'  , 'asdfsad'  , 'user'  , 3 ) ,
  (4    , 'nata'         , 'sadfsa'   , 'user'  , 4 ) ,
  (5    , 'kesha'        , 'safd'     , 'user'  , 5 ) ,
  (6    , 'vasy'         , 'sdf'      , 'user'  , 6 ) ,
  (7    , 'qwer'         , 'werwe'    , 'user'  , 7 ) ,
  (8    , 'dddd'         , 'lkjlkj'   , 'user'  , 8 ) ,
  (9    , 'werwe'        , '654654'   , 'user'  , 9 ) ,
  (10   , 'ereer'        , 'vxfaerf'  , 'user'  , 10);


INSERT INTO `ads`
  (`author_id` , `cost` , `description`                     , `header`                                        , `location_id` , `engine_capacity` , `power` , `engine_type` , `year_of_production` , `brand`      , `model`        , `mileage`)
VALUES
  (1           , 3000   , 'For sale: audi a3!'              , 'Audi A3'                                       , 1             , 2.3               , 120     , 'petrol'      , '1998'               , 'Audi'       , 'a3'           , 120000) ,
  (1           , 5000   , 'New kia rio 2 with low mileage!' , 'Kia Rio 2'                                     , 2             , 1.4               , 97      , 'petrol'      , '2006'               , 'Kia'        , 'Rio 2'        , 190350) ,
  (2           , 6000   , 'For sale: legendary ford focus'  , 'Ford Focus TDI'                                , 3             , 3.0               , 150     , 'diesel'      , '1991'               , 'Ford'       , 'Focus'        , 450000) ,
  (4           , 20000  , 'Hybrid prius! Eco!'              , 'Prius Two'                                     , 4             , 1.8               , null    , 'hybrid'      , '2008'               , 'Toyota'     , 'Prius 2'      , 270000) ,
  (6           , 48000  , 'New luxury volvo XC90'           , 'Newiest volvo xc90'                            , 5             , 2.3               , 320     , 'petrol'      , '2019'               , 'Volvo'      , 'XC90'         , 10000)  ,
  (6           , 41000  , 'New electric tesla S'            , 'Electric tesla'                                , 6             , null              , null    , 'electric'    , '2019'               , 'Tesla'      , 'Model S'      , 2000)   ,
  (7           , 130000 , 'Fast legendary 911'              , 'Porsche 911 Carera S, low cost! new! for sale' , 7             , 3.0               , 450     , 'petrol'      , '2018'               , 'Porsche'    , '911 Carera S' , 3000)   ,
  (8           , 10000  , ''                                , 'VW Polo 2015'                                  , 8             , 2.1               , 130     , 'petrol'      , '2015'               , 'Volkswagen' , 'Polo'         , 80000)  ,
  (9           , 3000   , 'Na hody'                         , 'Opel Astra 1997'                               , 9             , 2.5               , 100     , 'diesel'      , '1997'               , 'Opel'       , 'Astra'        , 700000) ,
  (9           , 7800   , 'new model of toyota camry'       , 'Newiest toyta camry 2019'                      , 10            , 2.6               , 140     , 'petrol'      , '2019'               , 'Toyota'     , 'Camry'        , NULL)   ;


INSERT INTO `characteristics`
  (`name`                 , `type`)
VALUES
  ('cylinder_arrangement' , 'string')  ,
  ('transmission'         , 'string')  ,
  ('color'                , 'string')  ,
  ('doors_count'          , 'int')     ,
  ('tank_volume'          , 'decimal') ,
  ('wheel_diameter'       , 'decimal') ,
  ('drive_unit'           , 'string')  ,
  ('length'               , 'decimal') ,
  ('width'                , 'decimal') ,
  ('height'               , 'decimal') ;


INSERT INTO `ad_characteristics`
  (`characteristic_name`  , `ad_id` , `value`)
VALUES
  ('color'                , 1       , 'blue')      ,
  ('color'                , 2       , 'red')       ,
  ('color'                , 3       , 'black')     ,
  ('color'                , 4       , 'silver')    ,
  ('transmission'         , 1       , 'automatic') ,
  ('transmission'         , 2       , 'mechanic')  ,
  ('transmission'         , 5       , 'automatic') ,
  ('transmission'         , 7       , 'automatic') ,
  ('transmission'         , 6       , 'robot')     ,
  ('wheel_diameter'       , 2       , '17')        ,
  ('wheel_diameter'       , 3       , '15')        ,
  ('wheel_diameter'       , 10      , '20')        ,
  ('wheel_diameter'       , 9       , '21')        ,
  ('wheel_diameter'       , 7       , '19')        ,
  ('cylinder_arrangement' , 1       , 'line')      ,
  ('cylinder_arrangement' , 3       , 'V')         ,
  ('cylinder_arrangement' , 5       , 'V')         ,
  ('cylinder_arrangement' , 7       , 'V')         ,
  ('cylinder_arrangement' , 8       , 'V')         ,
  ('cylinder_arrangement' , 9       , 'line')      ;


INSERT INTO `tags`
  (`name`          , `ad_id`)
VALUES
  ('audi'          , 1),
  ('a3'            , 1),
  ('legend'        , 1),
  ('kia'           , 2),
  ('rio'           , 2),
  ('lowmileage'    , 2),
  ('ford'          , 3),
  ('focus'         , 3),
  ('tdi'           , 3),
  ('turbo'         , 3),
  ('diesel'        , 3),
  ('electric'      , 6),
  ('eco'           , 6),
  ('ecologic'      , 6),
  ('selfdriving'   , 6),
  ('modelS'        , 6),
  ('hybrid'        , 4),
  ('eco'           , 4),
  ('ecologic'      , 4),
  ('electromobile' , 4);


INSERT INTO `photos`
  (`path`                  , `name`)
VALUES
  ('audi-a3-1.jpg'         , 'front'),
  ('audi-a3-2.jpg'         , 'left'),
  ('audi-a3-3.jpg'         , 'back'),
  ('ford-focus-1.jpg'      , 'front'),
  ('ford-focus-2.jpg'      , 'left'),
  ('kia-rio-2.jpg'         , 'front'),
  ('porsche-911-1.jpg'     , 'front'),
  ('porsche-911-2.jpg'     , 'left'),
  ('porsche-911-3.jpg'     , 'back'),
  ('tesla-s-1.jpg'         , 'front'),
  ('Toyota-Camry-1.jpg'    , 'left'),
  ('Toyota-Camry-2.jpg'    , 'front'),
  ('volkswagen-polo-1.jpg' , 'left'),
  ('volkswagen-polo-2.jpg' , 'front'),
  ('volkswagen-polo-3.jpg' , 'back'),
  ('Volvo-XC90-3.jpg'      , 'front');


INSERT INTO `contacts`
  (`name`   , `type`         , `value`                          , `profile_id`)
VALUES
  ('home'   , 'email'        , 'thrashmetalfan98@gmali.com'     , 1),
  ('home'   , 'email'        , 'yuliya.margun@gmail.com'        , 2),
  ('work'   , 'email'        , 'pavel.pershko@rubyroidlabs.com' , 1),
  ('home'   , 'mobile_phone' , '+346541321654'                  , 1),
  ('office' , 'mobile_phone' , '+46545654'                      , 1),
  ('office' , 'mobile_phone' , '+9871354564'                    , 2),
  ('velcom' , 'mobile_phone' , '+9876544445'                    , 3),
  ('mtc'    , 'mobile_phone' , '+786435435'                     , 4),
  ('life'   , 'mobile_phone' , '+846434'                        , 4),
  ('home'   , 'email'        , 'asdfsd@sadf.dsf'                , 5),
  ('work'   , 'email'        , '654654@asdf.sadf'               , 5);


INSERT INTO `ad_contacts`
  (`ad_id` , `contact_id`)
VALUES
  (2       , 1 ),
  (1       , 2 ),
  (2       , 3 ),
  (2       , 4 ),
  (3       , 3 ),
  (3       , 4 ),
  (4       , 5 ),
  (7       , 7 ),
  (7       , 6 ),
  (3       , 5 ),
  (3       , 6 ),
  (7       , 8 ),
  (8       , 9 ),
  (8       , 10),
  (8       , 11),
  (8       , 6 ),
  (10      , 7 ),
  (9       , 6 ),
  (5       , 8 );


INSERT INTO `ad_wishes`
  (`ad_id` , `user_id`)
VALUES
  (1       , 1),
  (2       , 1),
  (3       , 1),
  (4       , 1),
  (5       , 1),
  (1       , 2),
  (2       , 2),
  (3       , 2),
  (4       , 2),
  (5       , 2),
  (1       , 3),
  (2       , 3),
  (3       , 3),
  (4       , 3),
  (5       , 3),
  (1       , 5),
  (2       , 5),
  (3       , 5),
  (4       , 5),
  (5       , 5);


INSERT INTO `ad_photos`
  (`ad_id` , `photo_id`)
VALUES
  (1       , 1),
  (1       , 2),
  (1       , 3),
  (2       , 1),
  (2       , 2),
  (2       , 3),
  (4       , 1),
  (4       , 2),
  (4       , 3),
  (5       , 1),
  (5       , 2),
  (5       , 3),
  (6       , 1),
  (6       , 2),
  (6       , 3),
  (7       , 1),
  (7       , 2),
  (7       , 3),
  (8       , 1),
  (8       , 2);


INSERT INTO `messages`
  (`text`          , `author_id` , `receiver_id`)
VALUES
  ('hi'            , 1           , 2),
  ('hi!'           , 2           , 1),
  ('how are you?'  , 1           , 2),
  ('good, and you' , 2           , 1),
  ('hello'         , 3           , 4),
  ('hej'           , 4           , 3),
  ('10000'         , 3           , 4),
  ('12000 min'     , 4           , 3),
  ('good bye'      , 3           , 4),
  ('good luck'     , 4           , 3);


INSERT INTO `comments`
  (`ad_id` , `author_id` , `body_text`  , `created_at`)
VALUES
  (1       , 3           , 'torg?'      , NULL),
  (2       , 4           , '10000?'     , NULL),
  (3       , 5           , 'dislake'    , NULL),
  (4       , 6           , 'dislilke'   , NULL),
  (7       , 8           , 'good car'   , NULL),
  (8       , 9           , 'nice car'   , NULL),
  (10      , 3           , 'i love it!' , NULL),
  (9       , 4           , 'bad choise' , NULL),
  (6       , 8           , 'heh'        , NULL),
  (5       , 4           , 'lol'        , NULL);


INSERT INTO `comment_photos`
  (`comment_id` , `photo_id`)
VALUES
  (1            , 1),
  (1            , 2),
  (1            , 3),
  (2            , 1),
  (2            , 2),
  (2            , 3),
  (3            , 1),
  (3            , 2),
  (3            , 3),
  (4            , 1),
  (4            , 2),
  (4            , 3),
  (5            , 1),
  (5            , 2),
  (5            , 3),
  (6            , 1),
  (6            , 2),
  (6            , 3),
  (7            , 1),
  (7            , 2),
  (7            , 3);
