from fastapi import APIRouter, Depends, HTTPException, status, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import ChatMessage, User
from app.schemas import ChatMessageCreate, ChatResponse
import uuid
import re
from jose import JWTError, jwt
from app.config import settings

router = APIRouter()
security = HTTPBearer(auto_error=False)

# AI Agent knowledge base (can be loaded from database)
KNOWLEDGE_BASE = {
    "faq": [
        {
            "keywords": ["hours", "open", "when"],
            "answer": "We're open Tue – Sun · 10:00 – 20:00. You can visit us during these times or place an order for pickup!",
        },
        {
            "keywords": ["price", "cost", "how much"],
            "answer": "Our prices range from NZ$180 for individual slices to NZ$1,180 for whole cakes. Check out our menu for detailed pricing!",
        },
        {
            "keywords": ["order", "pickup", "delivery"],
            "answer": "We offer same-day pickup with 2-hour notice for whole cakes. You can order via our website or contact us directly!",
        },
        {
            "keywords": ["custom", "bespoke", "special"],
            "answer": "Yes! We offer custom orders for special occasions. Please contact us with at least 7 days notice for bespoke creations.",
        },
    ]
}

WELCOME_MESSAGES = {
    "en": "Hello! I'm Mika Dessert's AI assistant. How can I help you today? I can answer questions about our products, prices, ordering, and more!",
    "zh": "您好！我是 Mika Dessert 的AI助手。今天我能为您做些什么？我可以回答关于产品、价格、订购等问题！",
    "mi": "Kia ora! Ko au te kaiāwhina AI o Mika Dessert. Me pēhea taku āwhina i a koe? Ka taea e au te whakautu pātai mō ā mātou hua, utu, whakatau, me ētahi atu!",
    "ko": "안녕하세요! Mika Dessert의 AI 어시스턴트입니다. 오늘 무엇을 도와드릴까요? 제품, 가격, 주문 등에 대해 답변해드릴 수 있습니다!",
    "ja": "こんにちは！Mika DessertのAIアシスタントです。今日はどのようにお手伝いできますか？製品、価格、注文などについてお答えできます！",
}

def detect_intent(message: str, db: Session) -> str:
    """Simple intent detection"""
    lower_message = message.lower()
    
    # Check FAQ
    for faq in KNOWLEDGE_BASE["faq"]:
        if any(keyword in lower_message for keyword in faq["keywords"]):
            return faq["answer"]
    
    # Check product queries (can query from database)
    # Simplified here, can actually query database
    
    # Default response
    if "hello" in lower_message or "hi" in lower_message:
        return "Hello! I'm Mika Dessert's AI assistant. I can help you with product information, pricing, ordering, and more. What would you like to know?"
    elif "thank" in lower_message:
        return "You're welcome! Is there anything else I can help you with?"
    else:
        return f'I understand you're asking about "{message}". Let me help! You can ask me about our products, prices, opening hours, custom orders, or anything else about Mika Dessert. What would you like to know?'

def generate_ai_response(message: str, language: str, db: Session) -> str:
    """Generate AI response (can integrate OpenAI API)"""
    # Can integrate OpenAI API here
    # Currently using simple rule-based matching
    
    response = detect_intent(message, db)
    
    # If OpenAI API Key is available, can call it
    # import openai
    # openai.api_key = settings.OPENAI_API_KEY
    # response = openai.ChatCompletion.create(...)
    
    return response

async def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Security(security),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """Get optional current user (if token is provided)"""
    if not credentials:
        return None
    try:
        payload = jwt.decode(credentials.credentials, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if user and user.is_active:
                return user
    except:
        pass
    return None

@router.post("/chat", response_model=ChatResponse)
async def chat(
    chat_data: ChatMessageCreate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user)
):
    """AI customer service chat endpoint"""
    # Generate or use existing session_id
    session_id = chat_data.session_id or str(uuid.uuid4())
    
    # Generate response
    response_text = generate_ai_response(chat_data.message, chat_data.language, db)
    
    # Save conversation record
    chat_message = ChatMessage(
        user_id=current_user.id if current_user else None,
        session_id=session_id,
        message=chat_data.message,
        response=response_text,
        language=chat_data.language
    )
    db.add(chat_message)
    db.commit()
    
    return {
        "response": response_text,
        "session_id": session_id
    }

@router.get("/welcome")
async def get_welcome_message(language: str = "en"):
    """Get welcome message"""
    return {
        "message": WELCOME_MESSAGES.get(language, WELCOME_MESSAGES["en"])
    }
