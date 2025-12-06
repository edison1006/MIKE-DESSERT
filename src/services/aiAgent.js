import { products, shopDetails } from '../data/products';
import { chatbotAPI } from './api';

// AI Agent 知识库
const knowledgeBase = {
  products: products,
  shopInfo: shopDetails,
  faq: [
    {
      question: ['hours', 'open', 'when'],
      answer: (lang) => {
        const hours = shopDetails.hours;
        return `We're open ${hours}. You can visit us during these times or place an order for pickup!`;
      },
    },
    {
      question: ['price', 'cost', 'how much'],
      answer: (lang) => {
        return `Our prices range from NZ$180 for individual slices to NZ$1,180 for whole cakes. Check out our menu for detailed pricing!`;
      },
    },
    {
      question: ['order', 'pickup', 'delivery'],
      answer: (lang) => {
        return `We offer same-day pickup with 2-hour notice for whole cakes. You can order via our website or contact us directly!`;
      },
    },
    {
      question: ['custom', 'bespoke', 'special'],
      answer: (lang) => {
        return `Yes! We offer custom orders for special occasions. Please contact us with at least 7 days notice for bespoke creations.`;
      },
    },
    {
      question: ['best seller', 'popular', 'recommend'],
      answer: (lang) => {
        const bestSellers = products.filter((p) =>
          p.tags.some((tag) => tag.toLowerCase().includes('best seller'))
        );
        const names = bestSellers.map((p) => p.name).join(', ');
        return `Our best sellers are: ${names}. They're all delicious, but I'd especially recommend the Strawberry Matcha Mont Blanc!`;
      },
    },
  ],
};

// 简单的意图识别
const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // 检查是否匹配FAQ
  for (const item of knowledgeBase.faq) {
    if (item.question.some((keyword) => lowerMessage.includes(keyword))) {
      return { type: 'faq', data: item };
    }
  }
  
  // 检查产品查询
  const productKeywords = products.map((p) => p.name.toLowerCase());
  for (const keyword of productKeywords) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      const product = products.find((p) => p.name.toLowerCase() === keyword);
      return { type: 'product', data: product };
    }
  }
  
  // 默认通用回复
  return { type: 'general', data: null };
};

// AI Agent 响应生成
export const generateAIResponse = async (userMessage, language = 'en', sessionId = null) => {
  try {
    // 尝试调用后端 API
    const result = await chatbotAPI.chat(userMessage, language, sessionId);
    return result.response;
  } catch (error) {
    // 如果后端不可用，使用本地逻辑作为后备
    console.warn('Backend API unavailable, using local fallback:', error);
    
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    const intent = detectIntent(userMessage);
    
    let response = '';

    switch (intent.type) {
      case 'faq':
        response = intent.data.answer(language);
        break;
        
      case 'product':
        const product = intent.data;
        response = `Great choice! ${product.name} is ${product.description}. It's priced at ${product.price}. Would you like to know more about this item or place an order?`;
        break;
        
      case 'general':
        if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
          response = `Hello! I'm Mika Dessert's AI assistant. I can help you with product information, pricing, ordering, and more. What would you like to know?`;
        } else if (userMessage.toLowerCase().includes('thank')) {
          response = `You're welcome! Is there anything else I can help you with?`;
        } else {
          response = `I understand you're asking about "${userMessage}". Let me help! You can ask me about our products, prices, opening hours, custom orders, or anything else about Mika Dessert. What would you like to know?`;
        }
        break;
    }

    return response;
  }
};

// 获取欢迎消息
export const getWelcomeMessage = async (language = 'en') => {
  try {
    const result = await chatbotAPI.getWelcomeMessage(language);
    return result.message;
  } catch (error) {
    // 如果后端不可用，使用本地消息
    const messages = {
      en: "Hello! I'm Mika Dessert's AI assistant. How can I help you today? I can answer questions about our products, prices, ordering, and more!",
      zh: '您好！我是 Mika Dessert 的AI助手。今天我能为您做些什么？我可以回答关于产品、价格、订购等问题！',
      mi: 'Kia ora! Ko au te kaiāwhina AI o Mika Dessert. Me pēhea taku āwhina i a koe? Ka taea e au te whakautu pātai mō ā mātou hua, utu, whakatau, me ētahi atu!',
      ko: '안녕하세요! Mika Dessert의 AI 어시스턴트입니다. 오늘 무엇을 도와드릴까요? 제품, 가격, 주문 등에 대해 답변해드릴 수 있습니다!',
      ja: 'こんにちは！Mika DessertのAIアシスタントです。今日はどのようにお手伝いできますか？製品、価格、注文などについてお答えできます！',
    };
    return messages[language] || messages.en;
  }
};

