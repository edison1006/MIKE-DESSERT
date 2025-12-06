from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductUpdate, ProductResponse
from app.auth import get_current_active_user
from app.models import User
import re

router = APIRouter()

def extract_price_numeric(price_str: str) -> Optional[float]:
    """Extract numeric value from price string"""
    # Extract number, e.g., "NZ$320" -> 320
    match = re.search(r'[\d,]+\.?\d*', price_str.replace(',', ''))
    if match:
        return float(match.group().replace(',', ''))
    return None

@router.get("", response_model=List[ProductResponse])
async def get_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    tag: Optional[str] = Query(None, description="Filter by tag"),
    available_only: bool = Query(True, description="Show only available products"),
    db: Session = Depends(get_db)
):
    """Get product list"""
    query = db.query(Product)
    
    if category:
        query = query.filter(Product.category == category)
    
    if available_only:
        query = query.filter(Product.is_available == True)
    
    products = query.all()
    
    if tag:
        products = [p for p in products if tag.lower() in [t.lower() for t in (p.tags or [])]]
    
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get single product details"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product

@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create product (requires admin permission)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # If price_numeric is not provided, extract from price string
    price_numeric = product_data.price_numeric
    if price_numeric is None:
        price_numeric = extract_price_numeric(product_data.price)
    
    new_product = Product(
        name=product_data.name,
        description=product_data.description,
        price=product_data.price,
        price_numeric=price_numeric,
        tags=product_data.tags,
        accent=product_data.accent,
        category=product_data.category,
        image=product_data.image,
        is_available=product_data.is_available,
        stock=product_data.stock
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update product (requires admin permission)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    update_data = product_data.dict(exclude_unset=True)
    
    # If price is updated, recalculate price_numeric
    if "price" in update_data and "price_numeric" not in update_data:
        update_data["price_numeric"] = extract_price_numeric(update_data["price"])
    
    for field, value in update_data.items():
        setattr(product, field, value)
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete product (requires admin permission)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    db.delete(product)
    db.commit()
    return None

