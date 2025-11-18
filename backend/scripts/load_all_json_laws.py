"""تحميل كل ملفات JSON"""
import sys
import json
from pathlib import Path

project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from backend.rag.vector_store import rag_engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_all_json_files():
    """تحميل كل ملفات JSON من مجلد laws"""
    laws_dir = project_root / "data" / "laws"
    json_files = list(laws_dir.glob("*.json"))
    
    if not json_files:
        logger.error("لا توجد ملفات JSON!")
        return
    
    logger.info(f"📄 عدد ملفات JSON: {len(json_files)}")
    
    total_articles = 0
    
    for json_file in json_files:
        logger.info(f"📂 معالجة: {json_file.name}")
        
        with open(json_file, 'r', encoding='utf-8') as f:
            laws = json.load(f)
        
        for law in laws:
            metadata = {
                "id": f"{law['system']}_{law['article']}",
                "system": law['system'],
                "article": law['article'],
                "title": law['title']
            }
            
            rag_engine.add_law(law['text'], metadata)
            total_articles += 1
        
        logger.info(f"✅ تم إضافة {len(laws)} مادة من {json_file.name}")
    
    stats = rag_engine.get_stats()
    logger.info(f"📊 إجمالي المواد: {stats}")
    logger.info("🎉 تم التحميل بنجاح!")

if __name__ == "__main__":
    load_all_json_files()
