## Сигнатура .env 

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

### gateway

```env
# Kafka
  BROKER_HOST="192.168.0.1"
  BROKER_PORT="9092"
```
