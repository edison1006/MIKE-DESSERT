# Mika Dessert Website

A complete dessert website with frontend (React + Vite) and backend (FastAPI + PostgreSQL).

## Project Structure

```
mikadessert-website/
├── backend/          # FastAPI backend
│   ├── app/         # Application code
│   ├── scripts/     # Database seed scripts
│   └── main.py      # Application entry point
├── src/             # React frontend
│   ├── components/  # React components
│   ├── pages/       # Page routes
│   ├── contexts/    # React Context
│   ├── services/    # API services
│   └── data/        # Static data
└── public/          # Static assets
```

## Frontend Development

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev   # Start Vite dev server at http://localhost:5173
```

### Build for Production

```bash
npm run build   # Build to dist/ directory
npm run preview # Preview production build
```

### Environment Variables

Create a `.env` file (optional):

```env
VITE_API_URL=http://localhost:8000
```

## Backend Development

### Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip

### Installation and Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Create virtual environment**

```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Configure environment variables**

Copy `.env.example` to `.env` and modify the configuration:

```bash
cp .env.example .env
```

Edit the `.env` file and set the database connection:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mikadessert
SECRET_KEY=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:5173
```

5. **Create database**

```sql
CREATE DATABASE mikadessert;
```

6. **Initialize database**

```bash
python scripts/seed.py
```

This will create database tables and initialize product data and admin account:
- Admin email: `admin@mikadessert.com`
- Admin password: `admin123`

7. **Start server**

```bash
# Development mode (auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or using Python
python main.py
```

API documentation will be automatically generated at: http://localhost:8000/docs

### Using Startup Script

```bash
./run.sh
```

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

## Tech Stack

### Frontend
- React 18
- React Router 6
- Vite
- CSS

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy (ORM)
- JWT Authentication
- Pydantic (Data validation)

## Features

- ✅ User registration and login
- ✅ Product display and management
- ✅ Order management
- ✅ AI customer service chatbot
- ✅ Multi-language support (English, Chinese, Te Reo Māori, Korean, Japanese)
- ✅ Responsive design
- ✅ JWT authentication
- ✅ RESTful API

## Development Tips

- Frontend data is now fetched from backend API
- If backend is unavailable, some features (like AI chatbot) will use local fallback logic
- Product data can be managed through backend API
- All API requests require JWT token (except public endpoints)

## Deployment

### Frontend Deployment

After building for production, deploy the `dist/` directory to a static file server.

### Backend Deployment

For production deployment, make sure to:
1. Change `SECRET_KEY` in `.env` to a strong random string
2. Set correct database connection
3. Configure CORS to allow frontend domain
4. Use production-grade WSGI server (e.g., Gunicorn + Uvicorn)

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```
