from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import json

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    query: str

class ChatResponse(BaseModel):
    response: str
    status: str

# محاكاة الـ AI responses
@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # الـ query من المستخدم
        user_query = request.query
        
        # محاكاة الـ response (يمكن تحويلها لـ Ollama لاحقاً)
        if "عقد" in user_query or "계약" in user_query:
            response = "بناءً على استفسارك عن العقود:\n\n✅ يمكنك إضافة العقود من قسم 'العقود'\n✅ تعديل بنود العقد\n✅ حفظ توقيعات رقمية\n\nهل تريد معلومات إضافية؟"
        elif "قضية" in user_query or "حالة" in user_query:
            response = "بخصوص إدارة القضايا:\n\n📋 يمكنك:\n• إنشاء قضية جديدة\n• متابعة حالة القضية\n• إضافة محاضر الجلسات\n• حفظ الأحكام\n\nاختر ما تريد!"
        elif "مالي" in user_query or "اموال" in user_query or "ايراد" in user_query:
            response = "للإدارة المالية:\n\n💰 يمكنك:\n• تسجيل الإيرادات\n• تتبع المصروفات\n• عرض التقارير المالية\n• تصدير البيانات\n\nاضغط على الإدارة المالية!"
        else:
            response = f"تم استقبال سؤالك: {user_query}\n\n🤖 المساعد القانوني هنا لمساعدتك في:\n• الاستشارات القانونية\n• إدارة القضايا\n• العقود والوثائق\n• الإدارة المالية\n\nكيف يمكنني مساعدتك؟"
        
        return ChatResponse(response=response, status="success")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# الحصول على السجل
@router.get("/chat/history")
async def get_history():
    return {
        "messages": [
            {"role": "assistant", "content": "مرحباً! أنا المساعد القانوني. كيف يمكنني مساعدتك اليوم؟"}
        ]
    }
