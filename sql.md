#### SQL Tables

##### Feature 1: Register User

```sql
create table users( 
id serial primary key ,
name varchar(100) not null,
email varchar(100) not null,
password varchar(100) not null,
role varchar(20) not null default 'USER',
active boolean not null default true,
created_date timestamp not null default current_timestamp,
modified_date timestamp not null default current_timestamp ,
unique (email),
check ( role in ('USER','ADMIN'))
);
```

```sql
insert into users ( name,email,password,role) values ('Admin','admin@gmail.com','admin','ADMIN');
insert into users ( name,email,password,role) values ('Renga','r@gmail.com','pass123','USER');
```

#### Feature 2: Login

```sql 
select * from users where email = ? and password = ?;
```

##### Feature 3: List Users ( Admin )
```sql
select * from users;
```





