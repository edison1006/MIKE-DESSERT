# Mika Dessert Backend API

FastAPI backend service providing RESTful API for Mika Dessert website.

## Tech Stack

- **FastAPI** - Modern, fast web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM
- **JWT** - User authentication
- **Pydantic** - Data validation

## Installation and Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and modify the configuration:

```bash
cp .env.example .env
```

Edit the `.env` file and set database connection and other settings.

### 3. Create Database

Make sure PostgreSQL is installed and running, then create the database:

```sql
CREATE DATABASE mikadessert;
```

### 4. Initialize Database

Run the seed script to initialize product data:

```bash
python scripts/seed.py
```

### 5. Start Server

```bash
# Development mode (auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or using Python
python main.py
```

API documentation will be automatically generated at: http://localhost:8000/docs

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user information

### Products
- `GET /api/products` - Get product list (supports category and tag filtering)
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (requires admin permission)
- `PUT /api/products/{id}` - Update product (requires admin permission)
- `DELETE /api/products/{id}` - Delete product (requires admin permission)

### Orders
- `GET /api/orders` - Get order list
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}` - Update order status

### AI Customer Service
- `POST /api/chatbot/chat` - Send message to AI chatbot
- `GET /api/chatbot/welcome` - Get welcome message

## Database Models

- **User** - User table
- **Product** - Product table
- **Order** - Order table
- **OrderItem** - Order item table
- **ChatMessage** - Chat message table

## Default Admin Account

After running the seed script, a default admin account will be created:
- Email: `admin@mikadessert.com`
- Password: `admin123`

## Development

### Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py          # Configuration
│   ├── database.py        # Database connection
│   ├── models.py          # Database models
│   ├── schemas.py         # Pydantic schemas
│   ├── auth.py            # Authentication utilities
│   └── routers/           # API routes
│       ├── auth.py
│       ├── products.py
│       ├── orders.py
│       └── chatbot.py
├── scripts/
│   └── seed.py            # Database seed script
├── main.py                # Application entry point
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables
```

## Deployment

For production deployment, make sure to:
1. Change `SECRET_KEY` in `.env` to a strong random string
2. Set correct database connection
3. Configure CORS to allow frontend domain
4. Use production-grade WSGI server (e.g., Gunicorn + Uvicorn)
