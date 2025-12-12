from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: str
    price: str
    tags: List[str] = []
    accent: Optional[str] = None
    category: str
    image: Optional[str] = None
    is_available: bool = True
    stock: Optional[int] = None

class ProductCreate(ProductBase):
    price_numeric: Optional[float] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[str] = None
    price_numeric: Optional[float] = None
    tags: Optional[List[str]] = None
    accent: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    is_available: Optional[bool] = None
    stock: Optional[int] = None

class ProductResponse(ProductBase):
    id: int
    price_numeric: Optional[float] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Order Schemas
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    quantity: int
    unit_price: float
    subtotal: float
    
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    shipping_address: Optional[str] = None
    pickup_time: Optional[datetime] = None
    notes: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    user_id: int
    status: str
    total_amount: float
    currency: str
    shipping_address: Optional[str] = None
    pickup_time: Optional[datetime] = None
    notes: Optional[str] = None
    items: List[OrderItemResponse] = []
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

# Chatbot Schemas
class ChatMessageCreate(BaseModel):
    message: str
    language: str = "en"
    session_id: Optional[str] = None

class ChatMessageResponse(BaseModel):
    id: int
    message: str
    response: Optional[str] = None
    language: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChatResponse(BaseModel):
    response: str
    session_id: str








