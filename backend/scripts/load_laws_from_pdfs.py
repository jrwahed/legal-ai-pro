"""تحميل القوانين من ملفات PDF"""
import sys
from pathlib import Path

# أضف المسار
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.core.rag_engine import rag_engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_all_pdfs():
    """تحميل كل ملفات PDF"""
    laws_dir = Path(__file__).parent.parent.parent / "data" / "laws"
    
    if not laws_dir.exists():
        logger.error(f"المجلد غير موجود: {laws_dir}")
        logger.info("اعمل المجلد: mkdir -p data/laws")
        return
    
    pdf_files = list(laws_dir.glob("*.pdf"))
    
    if not pdf_files:
        logger.warning("لا توجد ملفات PDF!")
        logger.info(f"حط ملفات PDF في: {laws_dir}")
        return
    
    logger.info(f"📄 عدد الملفات: {len(pdf_files)}")
    
    # هنا هتحط الكود لتحليل PDFs
    logger.info("⚠️ محتاج تثبيت PyPDF2 أو pdfplumber")
    logger.info("pip install pypdf2")

if __name__ == "__main__":
    load_all_pdfs()
