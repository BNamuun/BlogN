CREATE DATABASE blogN;


create table category (
    id VARCHAR(40) not null,
    name VARCHAR(70) not null
);

create table articles(
    id VARCHAR(40) not null, 
    categoryid VARCHAR(40) not null, 
    title VARCHAR(100) not null,
    news  LONGTEXT not null
)