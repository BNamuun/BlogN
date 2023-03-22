CREATE DATABASE blogN;


create table category (
    id VARCHAR(40) not null,
    name VARCHAR(70) not null, 
    Primary key (id)
);

create table articles(
    id VARCHAR(40) not null, 
    title VARCHAR(200) not null,
    content  TEXT,
    category_id VARCHAR(40),
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES category(id) 
)

ALTER TABLE articles add image VARCHAR(255);