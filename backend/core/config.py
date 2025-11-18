"""إعدادات المشروع"""
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "نظام المستشار القانوني الذكي"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.2:3b"
    
    CHROMA_PERSIST_DIR: str = "./data/chroma_db"
    CHROMA_COLLECTION_LAWS: str = "saudi_laws"
    
    class Config:
        env_file = ".env"

settings = Settings()
