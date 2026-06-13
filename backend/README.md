# ShopEase Backend

Backend tools included:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing

## Setup

```bash
cd backend
npm install
copy .env.example .env
npm start
```

Update `.env` before running:

```text
PORT=5000
MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

## API

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `POST /api/products`
- `GET /api/cart`
- `POST /api/cart/items`
- `POST /api/orders`
- `GET /api/orders/my`
- `POST /api/contact`

Protected routes require:

```text
Authorization: Bearer <jwt_token>
```

## Seed Women Products

After setting `MONGO_URI` in `.env`, run:

```bash
npm run seed:women
```

This inserts or updates these women category products:

- Green Dress
- Green Kurta Set
- Floral Summer Dress
- Cream Trench Coat
- Pastel Casual Set
- Festive Kurti
