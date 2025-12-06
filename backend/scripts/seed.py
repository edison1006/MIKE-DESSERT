"""
Database seed script - Initialize product data
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, engine, Base
from app.models import Product, User
from app.auth import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

# Product data
products_data = [
    {
        "name": "Strawberry Matcha Mont Blanc",
        "description": "Layers of Strawberry, Mascarpone Cream, Vanilla Sponge, Matcha Gelato & Matcha and Chestnut Mont Blanc Topping.",
        "price": "NZ$320",
        "price_numeric": 320.0,
        "tags": ["signature", "seasonal", "best seller"],
        "accent": "#4caf50",
        "category": "Individual",
        "is_available": True,
    },
    {
        "name": "Earl Grey Cloud Cake",
        "description": "Whipped Bergamot Chantilly, Vanilla Chiffon Layers, Lemon Confit Pearls, and Earl Grey Infused Cream.",
        "price": "NZ$980 · 6\"",
        "price_numeric": 980.0,
        "tags": ["best seller", "signature", "light cream", "contains gluten"],
        "accent": "#d7c6b6",
        "category": "Cakes",
        "is_available": True,
    },
    {
        "name": "Matcha Velvet Bar",
        "description": "Ceremonial Uji Matcha Mousse, Almond Biscuit Base, Yuzu Gelée Core, and Matcha Powder Dusting.",
        "price": "NZ$180 / slice",
        "price_numeric": 180.0,
        "tags": ["best seller", "gluten free", "citrus"],
        "accent": "#cfd8c0",
        "category": "Individual",
        "is_available": True,
    },
    {
        "name": "Valrhona Noir Tart",
        "description": "70% Guanaja Dark Chocolate Ganache, Smoked Salt Caramel, Cacao Nib Crunch, and Chocolate Tart Shell.",
        "price": "NZ$220 / slice",
        "price_numeric": 220.0,
        "tags": ["best seller", "rich", "dark chocolate"],
        "accent": "#bda79b",
        "category": "Tarts",
        "is_available": True,
    },
    {
        "name": "Rose Lychee Entremet",
        "description": "Lychee Compote, Raspberry Crémeux, Rose Diplomat Cream, Glossy Mirror Glaze, and Vanilla Sponge Base.",
        "price": "NZ$1,180 · 6\"",
        "price_numeric": 1180.0,
        "tags": ["limited", "floral", "fruit forward"],
        "accent": "#f1d6d0",
        "category": "Cakes",
        "is_available": True,
    },
    {
        "name": "Kinako Honey Financier",
        "description": "Brown Butter Almond Cakes, Mountain Honey Glaze, Kinako Sugar Coating, and Toasted Sesame Seeds.",
        "price": "NZ$360 · box of 6",
        "price_numeric": 360.0,
        "tags": ["best seller", "pastry box", "nutty", "snacking"],
        "accent": "#e6cfae",
        "category": "Pastries",
        "is_available": True,
    },
    {
        "name": "Coconut Mango Verrine",
        "description": "Layers of Coconut Diplomat, Mango Passion Fruit Curd, Crispy Sable Crumbs, and Fresh Mango Cubes.",
        "price": "NZ$200 / cup",
        "price_numeric": 200.0,
        "tags": ["best seller", "tropical", "chilled"],
        "accent": "#f3dda9",
        "category": "Individual",
        "is_available": True,
    },
    {
        "name": "Toasted Sesame Paris-Brest",
        "description": "Sesame Praline Mousseline, Cassis Gelée, Caramelized Pâte à Choux Crown, and Toasted Sesame Seeds.",
        "price": "NZ$320",
        "price_numeric": 320.0,
        "tags": ["seasonal", "textural"],
        "accent": "#d9c2a9",
        "category": "Individual",
        "is_available": True,
    },
    {
        "name": "Black Sugar Basque",
        "description": "Silky Cheesecake, Okinawan Black Sugar Caramelization, Vanilla Bean Infusion, and Graham Cracker Crust.",
        "price": "NZ$1,080 · 6\"",
        "price_numeric": 1080.0,
        "tags": ["comfort", "caramelized"],
        "accent": "#c7a693",
        "category": "Cakes",
        "is_available": True,
    },
]

def seed_products():
    """Initialize product data"""
    db = SessionLocal()
    try:
        # Check if products already exist
        existing = db.query(Product).first()
        if existing:
            print("Products already exist, skipping seed.")
            return
        
        # Add products
        for product_data in products_data:
            product = Product(**product_data)
            db.add(product)
        
        db.commit()
        print(f"Successfully seeded {len(products_data)} products.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding products: {e}")
    finally:
        db.close()

def seed_admin():
    """Create admin account"""
    db = SessionLocal()
    try:
        # Check if admin already exists
        admin = db.query(User).filter(User.email == "admin@mikadessert.com").first()
        if admin:
            print("Admin user already exists.")
            return
        
        admin = User(
            email="admin@mikadessert.com",
            name="Admin",
            hashed_password=get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin)
        db.commit()
        print("Admin user created: admin@mikadessert.com / admin123")
    except Exception as e:
        db.rollback()
        print(f"Error creating admin: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    print("Seeding database...")
    seed_products()
    seed_admin()
    print("Done!")

