"""تحميل القوانين من JSON"""
import sys
import json
from pathlib import Path

# أضف المسار الصحيح
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

# Import بعد إضافة المسار
from backend.rag.vector_store import rag_engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_json_laws():
    """تحميل القوانين من JSON"""
    laws_dir = project_root / "data" / "laws"
    json_file = laws_dir / "نظام_العمل.json"
    
    if not json_file.exists():
        logger.error(f"الملف غير موجود: {json_file}")
        return
    
    # قراءة JSON
    with open(json_file, 'r', encoding='utf-8') as f:
        laws = json.load(f)
    
    logger.info(f"📄 عدد المواد: {len(laws)}")
    
    # إضافة كل مادة للـ RAG
    for law in laws:
        metadata = {
            "id": f"{law['system']}_{law['article']}",
            "system": law['system'],
            "article": law['article'],
            "title": law['title']
        }
        
        rag_engine.add_law(law['text'], metadata)
        logger.info(f"✅ تم إضافة: {law['title']}")
    
    # عرض الإحصائيات
    stats = rag_engine.get_stats()
    logger.info(f"📊 إحصائيات: {stats}")
    logger.info("🎉 تم التحميل بنجاح!")

if __name__ == "__main__":
    load_json_laws()
