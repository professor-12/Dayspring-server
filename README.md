# 📦 Dayspring API

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Yarn (or npm)
- PostgreSQL (or any database supported by Prisma)
---

### 🛠️ Setup Instructions

1. **Navigate to the server directory**  
   ```bash
   cd server
   ```

2. **Install dependencies**  
   ```bash
   yarn install
   ```

3. **Push Prisma schema to database**  
   ```bash
   npx prisma db push
   ```

4. **Seed the database**  
   ```bash
   npx prisma db seed
   ```

5. **Run the development server**  
   ```bash
   yarn dev
   ```

---

## 📚 API Endpoints

### 🧑‍💼 Auth

#### 🔐 Login  
**POST** `/api/auth/login`  
```json
{
  "username": "",
  "password": ""
}
```

#### 📝 Register  
**POST** `/api/auth/register`  
```json
{
  "email": "",
  "username": "",
  "password": "",
  "role": "USER" | "GUEST" | "ADMIN"
}
```

---

### 🛒 Cart

#### ➕ Add to Cart  
**POST** `/api/addcart`  
```json
{
  "productId": "",
  "quantity": 0
}
```

#### 🛍️ Get User Cart  
**GET** `/api/getcart`  
_Requires authentication_

---

### 📦 Products

#### 🔎 Get All Products  
**GET** `/api/products`  
**Headers:**  
```json
{
  "Authorization": "Bearer <userToken>"
}
```

---

## 📘 Notes

- Swagger documentation available at:  
  **`http://localhost:8000/api-docs`**