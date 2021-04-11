
DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE IF NOT EXISTS markers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  trailhead VARCHAR( 60 ) NOT NULL ,
  restroom VARCHAR( 80 ) NOT NULL ,
  fees VARCHAR( 80 ) NOT NULL ,
  bikes VARCHAR( 80 ) NOT NULL ,
  dogs VARCHAR( 80 ) NOT NULL ,
  lat FLOAT( 10, 6 ) NOT NULL ,
  lng FLOAT( 10, 6 ) NOT NULL,
  img VARCHAR(1000) NOT NULL
);



INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('1','Bobolink','No','No','Yes','Mixed(VS&Prohibited)','40.000235125376086','-105.21451812328385', 'https://cdn2.apstatic.com/photos/hike/7018028_smallMed_1554830224.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('2','Boulder Falls','No','No','No','Leash','40.00536252781466','-105.40614997299188', 'https://media-cdn.tripadvisor.com/media/photo-s/17/f3/d0/05/photo0jpg.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('3', 'Boulder Valley Ranch','Yes','No', 'Yes', 'Voice and Sight', '40.08000101506319','-105.26279258989399', 'https://cdn2.apstatic.com/photos/hike/7003610_medium_1554234659.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('4', 'Buckingham Park', 'Yes','No','No', 'Leash', '40.11123918476268','-105.30816306035054', 'https://s3-media0.fl.yelpcdn.com/bphoto/JVqzg2TL5Vv84b0J23XYOg/l.jpg
');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('5','Centennial Park','Yes','No','No','Voice and Sight','40.02021082644039',' -105.29791738733917', 'https://boulderrealestatenews.com/wp-content/uploads/2013/09/centennial-trailhead-redrocks-view.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('6','Chapman Drive', 'No','No','Yes','Leash','40.00892966872375','-105.32530989661622', 'https://farm1.static.flickr.com/916/42320128365_f194deae12.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('7','Chatauqua Meadow','Yes','No','No','Voice and Sight','39.996092683577075','-105.28621496035497', 'https://yourboulder.com/wp-content/uploads/2015/03/IMG_4914.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('8','Cherryvale','No','No','Yes','Mixed(V&S and prohibited)','39.982896208535216','-105.21448851617642', 'https://goodacre-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Aerial-6.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('9','Cottonwood','No','No','Yes', 'Mixed(V&S and prohibited)','40.04011567225499','-105.23697976035331', 'https://live.staticflickr.com/4626/40300483071_39f346b43f_b.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img)VALUES('10','Crown Rock','No','Yes','No','Voice and Sight','40.00193869459783',' -105.29696481617573', 'https://www.thomasmangan.com/images/xl/BoulderFlatirons2.2.14.4.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('11','Doudy Draw','Yes','Yes','Yes','Mixed(all 3)','39.938175172561856','-105.25657851802885', 'https://static.rootsrated.com/image/upload/s--GSaqQDXP--/t_rr_large_natural/yfq7nvf34f8juvfokxju.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('12','Dry Creek','Yes','No','Yes','Voice and Sight','39.99984942368107','-105.19103308734', 'https://www.boulderrealestatenews.com/wp-content/uploads/2013/09/IMG_2293-Custom.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('13','Eagle','No','No','Yes','Voice and Sight','40.080432661119104','-105.23590469288878','http://www.gohikecolorado.com/uploads/4/5/8/0/45804541/3794944.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('14','Enchanted Mesa','No','No','No','Mixed(V&S and prohibited)','39.9973533848808','-105.2802256045339','https://dayhikesneardenver.com/wp-content/uploads/2015/05/enchanted-mesa-header.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('15','Flagstaff Summit','Yes','Yes','No','Mixed (all 3)','40.00151660957012','-105.29933651656641', 'https://yourboulder.com/wp-content/uploads/2017/03/IMG_6017-e1490791802617.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('16','Flatirons Vista','Yes','Yes','Yes','Mixed (all 3)','39.92275296002896','-105.2458540180294', 'https://static.rootsrated.com/image/upload/s--fIGtJwq9--/t_rr_large_natural/hhka1t3uoh0tys6xut0o.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('17','Foothills','No','No','Mixed','Mixed(V&S and prohibited)','40.07054703353091','-105.28264288521758', 'http://www.justtrails.com/wp-content/uploads/2013/04/Scenic.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('18','Four-Mile Creek','No','No','Mixed','Leash','40.06480074853652','-105.28776978718837', 'https://d38trduahtodj3.cloudfront.net/images.ashx?t=ig&rid=VisitHenrico&i=fmc_trailhead.jpg&w=330&h=330&cropbox=1&cropboxhpos=center&stf=1');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('19','Greenbelt Plateau','No','Yes','Yes','Mixed(V&S and leash)','39.928889489304744','-105.23309144501434', 'https://cdn2.apstatic.com/photos/mtb/260558_smallMed_1554167843.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('20','Gregory Canyon','Yes','Yes','No','Mixed(all 3)', '39.99776783181083','-105.29276024686237', 'https://yourboulder.com/wp-content/uploads/2016/06/IMG_1956-e1465998736360.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('21','Interim Joder','No','No','Yes','Leash','40.110304139666866','-105.28275206035056', 'https://cdn.5280.com/2016/04/joder-960x720.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('22','Left Hand','No','No','Yes','Leash','40.10534764978167','-105.26581401802234', 'https://www.fredswildflowers.com/uploads/2/5/6/3/25638840/lef-h-t-1-1_orig.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('23','Marshall Mesa','Yes','Yes','Yes','Voice and Sight','39.95317284085238','-105.23134761802824', 'https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/a/72/a727aa3c-c51c-11e9-9290-eb95b3be8fce/5d5efd068cf49.image.jpg?resize=1200%2C900');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('24','Mount Sanitas','Yes','No','No','Voice and Sight','40.02738749605658','-105.30068277384632', 'https://static.rootsrated.com/image/upload/s--8whFYyKx--/t_rr_large_natural/ptspvybekvttfkqgsw3i.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('25','NCAR','Yes','No','No','Mixed(V&S and Leash)','39.97794040800962','-105.27980990083337', 'https://etbtravelphotography.com/wp-content/uploads/2019/03/etbtravelphotography-1015104-2.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('26','Panorama Point','Yes','Yes','No','Voice and Sight','40.00602810273934','-105.2926315709399', 'https://s3.amazonaws.com/ClubExpressClubFiles/49703/graphics/Photo_58536920.JPG');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng,img) VALUES('27','Realization Point','No','Yes','No','Voice and Sight','39.99729796723958','-105.30895702813932', 'https://yourboulder.com/wp-content/uploads/2016/06/IMG_1956-e1465998736360.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('28','Sawhill Ponds','Yes','No','No','Mixed(V&S and Leash)','40.03972125925047','-105.18518548733846', 'https://yourboulder.com/wp-content/uploads/2015/03/IMG_7947-e1425898818718.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('29','Settlers Park','No','No','No','Voice and Sight','40.01491550594419','-105.29607604316037', 'http://www.protrails.com/protrails/trails/Settlers%20Park%20-%20area%20pic%20550.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('30','South Boulder Creek','No','Yes','No','Mixed (all 3)','39.960391364776136','-105.23674440638608', 'https://cdn-assets.alltrails.com/uploads/photo/image/33008455/large_square_ff0b7c5eafce1af4576d1f7605fac3bb.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('31', 'South Mesa','Yes','Yes','No','Mixed (all 3)','39.93945559206923',' -105.25638844501395', 'https://fastly.4sqi.net/img/general/200x200/HAPLLEU3ViUD-ui3ie-2UCNbaXMdClbdlFMWHE-Xr-A.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('32','Teller Farms-South','Yes','No','Mixed','Mixed (V&S and Leash)','40.02170418352434','-105.15861596644396', 'https://cdn-assets.alltrails.com/uploads/photo/image/34093511/large_square_8008d73c59fb5bf24989f3ea79e6f43d.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('33','White Rocks','No','No','Mixed','No','40.0621269374584','-105.13174653151658', 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_1524,q_75,w_1524/https://assets.simpleviewinc.com/simpleview/image/upload/crm/cumberland/80-f78105005056a36_f781061d-5056-a36a-0b0e6fd3b6c6c957.jpg');
INSERT INTO markers (id, trailhead, restroom, fees,bikes, dogs, lat, lng, img) VALUES('34','Wonderland Lake','No','No','Mixed','Leash','40.05093576785052',' -105.2825005008306', 'https://cdn-assets.alltrails.com/uploads/photo/image/33139332/large_square_3960ad5d1456e54526cdd88737eaf9ea.jpg');
