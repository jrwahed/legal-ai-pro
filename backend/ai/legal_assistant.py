"""المستشار القانوني الذكي"""
import requests
from typing import Dict
import logging

from backend.core.config import settings
from backend.rag.vector_store import rag_engine

logger = logging.getLogger(__name__)

class LegalAssistant:
    def __init__(self):
        self.ollama_url = f"{settings.OLLAMA_BASE_URL}/api/generate"
        self.model = settings.OLLAMA_MODEL
        logger.info("✅ المستشار القانوني جاهز!")
    
    def _build_context(self, search_results: Dict) -> str:
        """بناء السياق من نتائج البحث"""
        if not search_results['documents'][0]:
            return "لا توجد مواد قانونية ذات صلة."
        
        context_parts = []
        for doc, meta in zip(
            search_results['documents'][0],
            search_results['metadatas'][0]
        ):
            context_parts.append(
                f"[{meta.get('system', 'نظام')} - المادة {meta.get('article', '')}]\n{doc}"
            )
        return "\n\n".join(context_parts)
    
    def _generate_response(self, prompt: str) -> str:
        """توليد الإجابة من Ollama"""
        try:
            response = requests.post(
                self.ollama_url,
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                    "options": {"temperature": 0.3, "top_p": 0.9}
                },
                timeout=60
            )
            response.raise_for_status()
            return response.json().get('response', '')
        except Exception as e:
            logger.error(f"❌ خطأ: {e}")
            return "عذراً، حدث خطأ في معالجة السؤال."
    
    def ask(self, question: str, use_context: bool = True) -> Dict:
        """سؤال قانوني"""
        logger.info(f"❓ سؤال: {question}")
        
        context = ""
        sources = []
        
        if use_context:
            search_results = rag_engine.search_laws(question, n_results=3)
            context = self._build_context(search_results)
            sources = search_results['metadatas'][0] if search_results['metadatas'] else []
        
        prompt = f"""أنت مستشار قانوني سعودي متخصص.

{f"السياق القانوني:\n{context}\n" if context else ""}
السؤال: {question}

التعليمات:
- أجب بوضوح ومباشرة
- استشهد بالمواد إن وجدت
- استخدم لغة قانونية واضحة

الإجابة:"""

        answer = self._generate_response(prompt)
        logger.info("✅ تم توليد الإجابة")
        
        return {
            "question": question,
            "answer": answer,
            "sources": sources
        }

legal_assistant = LegalAssistant()
