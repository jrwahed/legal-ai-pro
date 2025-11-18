"""API رفع المستندات"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import shutil
from pathlib import Path
import logging

from backend.services.document_processor import document_processor
from backend.rag.vector_store import rag_engine

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/upload", tags=["Upload"])

@router.post("/document")
async def upload_document(
    file: UploadFile = File(...),
    system_name: str = "نظام محمل"
):
    """رفع مستند قانوني (PDF/Word/Excel)"""
    try:
        upload_dir = Path("./data/uploads")
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        file_path = upload_dir / file.filename
        
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        logger.info(f"📤 تم رفع: {file.filename}")
        
        articles = document_processor.process_document(str(file_path))
        
        if not articles:
            raise HTTPException(status_code=400, detail="فشل استخراج المحتوى")
        
        added_count = 0
        for article in articles:
            metadata = {
                "id": f"{system_name}_{article.get('article_number')}",
                "system": system_name,
                "article": article.get('article_number', ''),
                "title": f"مادة {article.get('article_number', '')}",
                "source_file": file.filename
            }
            
            success = rag_engine.add_law(article['text'], metadata)
            if success:
                added_count += 1
        
        return {
            "message": "تم معالجة الملف بنجاح",
            "filename": file.filename,
            "articles_extracted": len(articles),
            "articles_added": added_count,
            "sample_articles": articles[:3]
        }
    except Exception as e:
        logger.error(f"❌ خطأ: {e}")
        raise HTTPException(status_code=500, detail=str(e))
