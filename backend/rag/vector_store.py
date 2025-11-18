"""محرك البحث الدلالي (RAG)"""
import chromadb
import requests
from typing import List, Dict, Optional
import logging

from backend.core.config import settings

logger = logging.getLogger(__name__)

class LegalRAGEngine:
    def __init__(self):
        logger.info("🔧 تحميل محرك RAG...")
        
        self.client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
        self.laws_collection = self.client.get_or_create_collection(
            name=settings.CHROMA_COLLECTION_LAWS
        )
        
        logger.info("✅ محرك RAG جاهز!")
    
    def get_embedding(self, text: str) -> Optional[List[float]]:
        """الحصول على embeddings من Ollama"""
        try:
            response = requests.post(
                f"{settings.OLLAMA_BASE_URL}/api/embeddings",
                json={"model": settings.OLLAMA_MODEL, "prompt": text},
                timeout=30
            )
            response.raise_for_status()
            return response.json().get('embedding')
        except Exception as e:
            logger.error(f"❌ خطأ في embeddings: {e}")
            return None
    
    def add_law(self, text: str, metadata: Dict) -> bool:
        """إضافة قانون للمكتبة"""
        try:
            embedding = self.get_embedding(text)
            if not embedding:
                return False
            
            doc_id = metadata.get('id', f"law_{len(self.laws_collection.get()['ids'])}")
            
            self.laws_collection.add(
                ids=[doc_id],
                embeddings=[embedding],
                documents=[text],
                metadatas=[metadata]
            )
            
            logger.info(f"✅ تم إضافة: {metadata.get('title', doc_id)}")
            return True
        except Exception as e:
            logger.error(f"❌ خطأ: {e}")
            return False
    
    def search_laws(self, query: str, n_results: int = 5) -> Dict:
        """البحث في القوانين"""
        try:
            logger.info(f"🔍 البحث عن: {query}")
            
            query_embedding = self.get_embedding(query)
            if not query_embedding:
                return {"documents": [[]], "metadatas": [[]], "distances": [[]]}
            
            results = self.laws_collection.query(
                query_embeddings=[query_embedding],
                n_results=n_results
            )
            
            logger.info(f"✅ عدد النتائج: {len(results['documents'][0])}")
            return results
        except Exception as e:
            logger.error(f"❌ خطأ: {e}")
            return {"documents": [[]], "metadatas": [[]], "distances": [[]]}
    
    def get_stats(self) -> Dict:
        """إحصائيات المكتبة"""
        try:
            count = self.laws_collection.count()
            return {"laws_count": count, "total": count}
        except:
            return {"laws_count": 0, "total": 0}

rag_engine = LegalRAGEngine()
