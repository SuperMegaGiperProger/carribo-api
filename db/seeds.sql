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


INSERT INTO `cost_dependencies`
  (`destination_country_name` , `source_country_name` , `formula`)
VALUES
  ('Belarus'                  , 'Ukraine'             , '{cost}*1.1+52')     ,
  ('Ukraine'                  , 'Belarus'             , '{cost}*1.2+100+87') ,
  ('Russia'                   , 'Belarus'             , '{cost}*1.3+54+8')   ,
  ('Belarus'                  , 'Russia'              , '{cost}+78+89')      ,
  ('Belarus'                  , 'Lithuania'           , '{cost}*1.1+88+45')  ,
  ('Lithuania'                , 'Latvia'              , '{cost}')            ,
  ('Latvia'                   , 'Estonia'             , '{cost}')            ,
  ('Lithuania'                , 'Poland'              , '{cost}')            ,
  ('Ukraine'                  , 'Russia'              , '{cost}*1.4+50')     ,
  ('Russia'                   , 'Ukraine'             , '{cost}+55')         ;


INSERT INTO `locations`
  (`address`                             , `country_name`)
VALUES
  ('Minsk, Lenina 55'                    , 'Belarus')   ,
  ('Gomel, Pobedy 14'                    , 'Belarus')   ,
  ('Mogilev'                             , 'Belarus')   ,
  ('Brest, Internacionalnaj 1'           , 'Belarus')   ,
  ('Ivacevichi, per. 40 let Octiabra, 3' , 'Belarus')   ,
  ('Kiev, Lenina 32'                     , 'Ukraine')   ,
  ('Moscow, Lenina 43-2'                 , 'Russia')    ,
  ('Vilnius, Uzupis 2'                   , 'Lithuania') ,
  ('Barcelona, Placa de Barcelona 4'     , 'Spain')     ,
  ('Smolensk, Pobedy 10'                 , 'Russia')    ;


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
  (`id` , `path`           , `name`)
VALUES
  (NULL , '/asdfdsadf'     , 'adsfsad')      ,
  (NULL , '/qwer'          , 'qwer')         ,
  (NULL , '/werwe/sdfsad'  , 'werjkwlje')    ,
  (NULL , '/werwedd'       , 'mycar.png')    ,
  (NULL , '/pavel'         , 'kia.jpg')      ,
  (NULL , '/ewre'          , 'for_sale.jpg') ,
  (NULL , '/weewew'        , 'asdfsd.bmp')   ,
  (NULL , '/myrandompath'  , '654.jpeg')     ,
  (NULL , '/flags/albania' , 'flag.png')     ,
  (NULL , '/rwerwe'        , 'ioujoi.vsfv')  ;


INSERT INTO `profiles`
  (`id` , `name`  , `location_id` , `photo_id`)
VALUES
  (NULL , 'Pavel' , 1             , 1 ),
  (NULL , 'Julia' , 5             , 2 ),
  (NULL , 'Masha' , 7             , 3 ),
  (NULL , 'Nata'  , 9             , 4 ),
  (NULL , 'Sasha' , 2             , 5 ),
  (NULL , 'Pasha' , 3             , 6 ),
  (NULL , 'Kasha' , 4             , 7 ),
  (NULL , 'Lasha' , 6             , 8 ),
  (NULL , 'Zasha' , 8             , 9 ),
  (NULL , 'Tina'  , 10            , 10);


INSERT INTO `users`
  (`id` , `username`     , `password` , `role`  , `profile_id`)
VALUES
  (NULL , 'pavelp'       , 'sadfasdf' , 'admin' , 1 ),
  (NULL , 'yulka.marhun' , '1111111'  , 'admin' , 2 ),
  (NULL , 'sdfasdfsdaf'  , 'asdfsad'  , 'user'  , 3 ),
  (NULL , 'nata'         , 'sadfsa'   , 'user'  , 4 ),
  (NULL , 'kesha'        , 'safd'     , 'user'  , 5 ),
  (NULL , 'vasy'         , 'sdf'      , 'user'  , 6 ),
  (NULL , 'qwer'         , 'werwe'    , 'user'  , 7 ),
  (NULL , 'dddd'         , 'lkjlkj'   , 'user'  , 8 ),
  (NULL , 'werwe'        , '654654'   , 'user'  , 9 ),
  (NULL , 'ereer'        , 'vxfaerf'  , 'user'  , 10);


INSERT INTO `contacts`
  (`id` , `name`   , `type`         , `value`                          , `profile_id`)
VALUES
  (NULL , 'home'   , 'email'        , 'thrashmetalfan98@gmali.com'     , 1),
  (NULL , 'home'   , 'email'        , 'yuliya.margun@gmail.com'        , 2),
  (NULL , 'work'   , 'email'        , 'pavel.pershko@rubyroidlabs.com' , 1),
  (NULL , 'home'   , 'mobile_phone' , '+346541321654'                  , 1),
  (NULL , 'office' , 'mobile_phone' , '+46545654'                      , 1),
  (NULL , 'office' , 'mobile_phone' , '+9871354564'                    , 2),
  (NULL , 'velcom' , 'mobile_phone' , '+9876544445'                    , 3),
  (NULL , 'mtc'    , 'mobile_phone' , '+786435435'                     , 4),
  (NULL , 'life'   , 'mobile_phone' , '+846434'                        , 4),
  (NULL , 'home'   , 'email'        , 'asdfsd@sadf.dsf'                , 5),
  (NULL , 'work'   , 'email'        , '654654@asdf.sadf'               , 5);


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


INSERT INTO `wish_ads`
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
  (`id` , `text`          , `author_id` , `receiver_id` , `created_at`)
VALUES
  (NULL , 'hi'            , 1           , 2             , NULL),
  (NULL , 'hi!'           , 2           , 1             , NULL),
  (NULL , 'how are you?'  , 1           , 2             , NULL),
  (NULL , 'good, and you' , 2           , 1             , NULL),
  (NULL , 'hello'         , 3           , 4             , NULL),
  (NULL , 'hej'           , 4           , 3             , NULL),
  (NULL , '10000'         , 3           , 4             , NULL),
  (NULL , '12000 min'     , 4           , 3             , NULL),
  (NULL , 'good bye'      , 3           , 4             , NULL),
  (NULL , 'good luck'     , 4           , 3             , NULL);


INSERT INTO `comments`
  (`id` , `ad_id` , `author_id` , `body_text`  , `created_at`)
VALUES
  (NULL , 1       , 3           , 'torg?'      , NULL),
  (NULL , 2       , 4           , '10000?'     , NULL),
  (NULL , 3       , 5           , 'dislake'    , NULL),
  (NULL , 4       , 6           , 'dislilke'   , NULL),
  (NULL , 7       , 8           , 'good car'   , NULL),
  (NULL , 8       , 9           , 'nice car'   , NULL),
  (NULL , 10      , 3           , 'i love it!' , NULL),
  (NULL , 9       , 4           , 'bad choise' , NULL),
  (NULL , 6       , 8           , 'heh'        , NULL),
  (NULL , 5       , 4           , 'lol'        , NULL);


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
