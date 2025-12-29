# SpotOn Backend API

Simple, clean REST API for parking management.

## Setup

```bash
cd backend
npm install
npm run dev  # Development with nodemon
npm start    # Production
```

## Environment Variables

Create a `.env` file:
```
MONGODB_URI=mongodb://...
PORT=3030
NODE_ENV=development
```

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get all users |
| GET | `/api/user/:id` | Get user by ID |
| POST | `/api/user` | Create user |
| PUT | `/api/user/:id` | Update user |
| DELETE | `/api/user/:id` | Delete user |

### Rates
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rate` | Get all active rates |
| GET | `/api/rate/:id` | Get rate by ID |
| POST | `/api/rate` | Create rate |
| PUT | `/api/rate/:id` | Update rate |
| DELETE | `/api/rate/:id` | Delete rate |

### Parking Sessions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/session` | Get all sessions |
| GET | `/api/session/:id` | Get session by ID |
| POST | `/api/session` | Create session |
| PUT | `/api/session/:id/end` | End session (calculates charges) |
| PUT | `/api/session/:id/pay` | Mark as paid |
| PUT | `/api/session/:id` | Update session |
| DELETE | `/api/session/:id` | Delete session |

## Request/Response Examples

### Create User
```json
POST /api/user
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0501234567",
  "role": "driver"
}
```

### Create Rate
```json
POST /api/rate
{
  "name": "Standard Rate",
  "price_per_hour": 25,
  "min_charge_minutes": 30
}
```

### Create Parking Session
```json
POST /api/session
{
  "license_plate": "ABC123",
  "spot_number": "A1",
  "rate_id": "507f1f77bcf86cd799439011"
}
```

### End Session (Calculate Charges)
```json
PUT /api/session/507f1f77bcf86cd799439012/end
```

Response includes calculated `total_amount` and `duration_minutes`.

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  phone: String,
  role: "admin" | "driver" (default: "driver"),
  createdAt: Date,
  updatedAt: Date
}
```

### Rate
```javascript
{
  _id: ObjectId,
  name: String (required),
  price_per_hour: Number (required),
  is_active: Boolean (default: true),
  min_charge_minutes: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### ParkingSession
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User, optional),
  license_plate: String (required),
  spot_number: String (required),
  entry_time: Date (default: now),
  exit_time: Date,
  duration_minutes: Number,
  rate_id: ObjectId (ref: Rate, required),
  total_amount: Number,
  is_paid: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
backend/
├── api/
│   ├── user/
│   │   ├── user.controller.js
│   │   └── user.routes.js
│   ├── rate/
│   │   ├── rate.controller.js
│   │   └── rate.routes.js
│   └── session/
│       ├── session.controller.js
│       └── session.routes.js
├── models/
│   ├── User.model.js
│   ├── Rate.model.js
│   └── ParkingSession.model.js
├── server.js
├── package.json
└── .env
```

