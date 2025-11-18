"""معالج المستندات - PDF/Word/Excel"""
import os
from typing import List, Dict
import logging
from pathlib import Path
import re

try:
    import pymupdf
except:
    import fitz as pymupdf

from docx import Document as DocxDocument
import pandas as pd

logger = logging.getLogger(__name__)

class DocumentProcessor:
    def __init__(self, upload_dir: str = "./data/uploads"):
        self.upload_dir = Path(upload_dir)
        self.upload_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"✅ معالج المستندات جاهز")
    
    def process_pdf(self, pdf_path: str) -> List[Dict]:
        try:
            logger.info(f"📄 معالجة PDF: {pdf_path}")
            documents = []
            doc = pymupdf.open(pdf_path)
            
            for page_num, page in enumerate(doc):
                text = page.get_text()
                text = text.strip()
                
                if text:
                    articles = self._extract_articles(text, page_num + 1)
                    documents.extend(articles)
            
            doc.close()
            logger.info(f"✅ تم استخراج {len(documents)} مادة")
            return documents
        except Exception as e:
            logger.error(f"❌ خطأ: {e}")
            return []
    
    def _extract_articles(self, text: str, page_num: int) -> List[Dict]:
        articles = []
        pattern = r'(?:المادة|مادة)\s*(\d+)\s*[:\-]?\s*(.+?)(?=(?:المادة|مادة)\s*\d+|$)'
        matches = re.finditer(pattern, text, re.DOTALL | re.IGNORECASE)
        
        for match in matches:
            article_num = match.group(1)
            article_text = match.group(2).strip()
            
            if article_text:
                articles.append({
                    "article_number": article_num,
                    "text": article_text,
                    "page": page_num,
                    "type": "article"
                })
        
        if not articles and text:
            articles.append({
                "article_number": f"page_{page_num}",
                "text": text,
                "page": page_num,
                "type": "content"
            })
        
        return articles
    
    def process_word(self, docx_path: str) -> List[Dict]:
        try:
            logger.info(f"📄 معالجة Word: {docx_path}")
            doc = DocxDocument(docx_path)
            full_text = ""
            
            for paragraph in doc.paragraphs:
                full_text += paragraph.text + "\n"
            
            articles = self._extract_articles(full_text, 1)
            logger.info(f"✅ تم استخراج {len(articles)} مادة")
            return articles
        except Exception as e:
            logger.error(f"❌ خطأ: {e}")
            return []
    
    def process_excel(self, excel_path: str) -> List[Dict]:
        try:
            logger.info(f"📄 معالجة Excel: {excel_path}")
            df = pd.read_excel(excel_path)
            documents = []
            
            for idx, row in df.iterrows():
                article_data = {
                    "article_number": str(row.get('رقم المادة', idx + 1)),
                    "text": str(row.get('النص', '')),
                    "system": str(row.get('النظام', 'غير محدد')),
                    "type": "article"
                }
                
                if article_data["text"]:
                    documents.append(article_data)
            
            logger.info(f"✅ تم استخراج {len(documents)} مادة")
            return documents
        except Exception as e:
            logger.error(f"❌ خطأ: {e}")
            return []
    
    def process_document(self, file_path: str) -> List[Dict]:
        ext = Path(file_path).suffix.lower()
        
        if ext == '.pdf':
            return self.process_pdf(file_path)
        elif ext in ['.docx', '.doc']:
            return self.process_word(file_path)
        elif ext in ['.xlsx', '.xls']:
            return self.process_excel(file_path)
        else:
            logger.warning(f"⚠️ نوع ملف غير مدعوم: {ext}")
            return []

document_processor = DocumentProcessor()
