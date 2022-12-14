## Сигнатура .env

### gateway

```env
# Kafka
  BROKER_HOST="192.168.0.1"
  BROKER_PORT="9092"
```

### authentication-service

```env
# JWT
  JWT_SECRET="secret"
  JWT_EXPIRESIN="3600s"

# MySQL
  DATABASE_USERNAME="root"
  DATABASE_PASSWORD=""
  DATABASE_DATABASE="jshop"
  DATABASE_HOST="localhost"
  
 # Kafka
  BROKER_HOST="192.168.0.1"
  BROKER_PORT="9092"
```

### products-service

```env
# MySQL
  DATABASE_USERNAME="root"
  DATABASE_PASSWORD=""
  DATABASE_DATABASE="jshop"
  DATABASE_HOST="localhost"
  
 # Kafka
  BROKER_HOST="192.168.0.1"
  BROKER_PORT="9092"
```

## Структура запросов внутри бэкенда

### authentication-service

```js
"post.auth.signUp" - принимает payload с данными для регистрации
"post.auth.signIn" - принимает payload с данными для авторизации
"get.auth.verify" - принимает jwt для верификации
"get.auth.verify.admin" - принимает jwt для верификации админа
```

### products-service

```js
"get.products.findAll" - не принимает данных, высылает массив товаров
"get.products.findById" - не принимает данных, высылает единичный объекта товара
"post.products.save" - принимает payload с единичным объектом товара
"post.products.saveMany" - принимает payload с массивом товаров
"post.products.removeOne" - принимает число
```








