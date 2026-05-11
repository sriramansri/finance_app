create database finance_company;

use finance_company ;
create table users(id int auto_increment primary key ,username varchar(50), email varchar(50) ,password varchar(50), role varchar(50)) ;
insert into users values (0,'admin123','admin349@gmail.com','Africa123','admin');

select * from users;
select * from users where id=1;

-- employe

use finance_company;

create table employe(
emp_id int auto_increment primary key ,
emp_name varchar(50),
emp_role varchar(100),
email varchar(100),
emp_password varchar(100),
emp_sallery varchar(10));

select * from employe 

--lornForm

create table  lornForm  (id int auto_increment primary key, loan_Amount varchar(100), interest_Rate varchar(100),Loan_Duration varchar(100),EMI_type varchar(100),start_Date varchar(100),End_Date varchar(100));