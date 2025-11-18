"""تطبيق FastAPI الرئيسي"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict
import logging

from backend.core.config import settings
from backend.ai.legal_assistant import legal_assistant
from backend.rag.vector_store import rag_engine
from backend.api import upload

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="نظام ذكاء اصطناعي للاستشارات القانونية",
    docs_url="/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# إضافة router رفع الملفات
app.include_router(upload.router)

class LegalQuery(BaseModel):
    question: str = Field(..., min_length=5)
    use_context: bool = True

class LegalResponse(BaseModel):
    question: str
    answer: str
    sources: List[Dict]

@app.get("/")
def root():
    return {
        "message": f"مرحباً في {settings.PROJECT_NAME}",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health")
def health():
    stats = rag_engine.get_stats()
    return {"status": "healthy", "stats": stats}

@app.post(f"{settings.API_PREFIX}/ask", response_model=LegalResponse)
def ask_question(query: LegalQuery):
    try:
        result = legal_assistant.ask(query.question, query.use_context)
        return result
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("startup")
def startup():
    logger.info("="*60)
    logger.info(f"🚀 {settings.PROJECT_NAME} - v{settings.VERSION}")
    logger.info("="*60)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
