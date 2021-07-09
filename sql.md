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


##### Feature 4: Add Product
```sql
create table products
( 
id serial primary key,
name varchar(100) not null,
image_url varchar(250) not null,
price int not null,
active boolean not null default true,
created_by int not null,
modified_by int not null,
created_date timestamp not null default current_timestamp,
modified_date timestamp not null default current_timestamp,
foreign key (created_by) references users(id),
foreign key (modified_by) references users(id),
unique(name)
);
```

```sql

insert into products(name,image_url,price, created_by,modified_by) 
values ('Burger','burger.jpg',100,1,1);
```

##### Feature 5: List Products
```sql
select * from products;
```

##### Feature 6: Add Order  Couch DB

```js
{
   "user": { id: 1, name:'Renga', address:'Chennai'}, 
   "items": [ { itemId: 1, itemName:'Burger', price:100, quantity: 2, status:'ORDERED'}, { itemId: 2, itemName:'Pizza', price:200, quantity: 3, status:'CANCELLED'}],
   "orderedDate":"2021-07-10T10000",
   "status":"PAID",
   "deliveredDate":"2021-07-10T10000",
   "totalBillAmount": 800,
   "paymentMode":"CASH_ON_DELIVERY",
   "reason": ""
}
```






