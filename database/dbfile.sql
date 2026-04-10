create database finance_company;

use finance_company ;
create table users(id int auto_increment primary key ,username varchar(50), email varchar(50) ,password varchar(50), role varchar(50)) ;
insert into users values (0,'admin123','admin349@gmail.com','Africa123','admin');

select * from users where id=1;