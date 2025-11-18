import { useState, useRef } from 'react';
import { Upload, FileText, Image, File, CheckCircle, Clock, Trash2, Eye, Download } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'failed';
  extractedText?: string;
  category: string;
}

function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'عقد_إيجار_محل_تجاري.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      status: 'completed',
      extractedText: 'تم استخراج النص بنجاح',
      category: 'عقود'
    },
    {
      id: 2,
      name: 'صورة_هوية_وطنية.jpg',
      type: 'Image',
      size: '1.2 MB',
      uploadDate: '2025-11-14',
      status: 'completed',
      extractedText: 'تم استخراج البيانات من الهوية',
      category: 'هويات'
    },
    {
      id: 3,
      name: 'مستند_قضية_123.pdf',
      type: 'PDF',
      size: '3.8 MB',
      uploadDate: '2025-11-12',
      status: 'processing',
      category: 'قضايا'
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    // محاكاة رفع الملفات
    alert(`✅ تم رفع ${files.length} ملف بنجاح!`);
    
    // إضافة الملفات للقائمة
    const newDocs = Array.from(files).map((file, idx) => ({
      id: documents.length + idx + 1,
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document',
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'processing' as const,
      category: 'عام'
    }));

    setDocuments([...newDocs, ...documents]);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const statusConfig = {
    processing: { label: 'جاري المعالجة', color: '#fef3c7', textColor: '#92400e', icon: <Clock size={16} /> },
    completed: { label: 'مكتمل', color: '#d1fae5', textColor: '#065f46', icon: <CheckCircle size={16} /> },
    failed: { label: 'فشل', color: '#fee2e2', textColor: '#991b1b', icon: <Trash2 size={16} /> }
  };

  const categories = ['الكل', 'عقود', 'هويات', 'قضايا', 'فواتير', 'عام'];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  return (
    <div style={{ padding: '30px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>رفع المستندات</h1>
        <p style={{ color: '#718096', fontSize: '16px' }}>رفع وتحليل المستندات باستخدام تقنية OCR</p>
      </div>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          background: dragActive ? 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)' : 'white',
          padding: '60px',
          borderRadius: '16px',
          border: dragActive ? '3px dashed #667eea' : '3px dashed #e2e8f0',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s',
          marginBottom: '30px'
        }}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleChange}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <Upload size={40} color="white" />
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#2d3748' }}>
          اسحب الملفات هنا أو اضغط للرفع
        </h2>
        <p style={{ color: '#718096', fontSize: '16px', marginBottom: '20px' }}>
          يدعم PDF, DOC, DOCX, JPG, PNG (حجم أقصى 10MB)
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '25px' }}>
          <div style={{
            padding: '15px 20px',
            background: '#f7fafc',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FileText size={20} color="#667eea" />
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>PDF & مستندات</span>
          </div>
          <div style={{
            padding: '15px 20px',
            background: '#f7fafc',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Image size={20} color="#764ba2" />
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>صور</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>إجمالي الملفات</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748' }}>{documents.length}</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>مكتملة</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
            {documents.filter(d => d.status === 'completed').length}
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>قيد المعالجة</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>
            {documents.filter(d => d.status === 'processing').length}
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>الحجم الكلي</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>7.4 MB</div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 20px',
                background: selectedCategory === cat ? '#667eea' : '#f7fafc',
                color: selectedCategory === cat ? 'white' : '#2d3748',
                border: '2px solid',
                borderColor: selectedCategory === cat ? '#667eea' : '#e2e8f0',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {documents.map(doc => (
          <div key={doc.id} style={{
            background: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Icon & Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: doc.type === 'PDF' ? '#f56565' : doc.type === 'Image' ? '#48bb78' : '#667eea',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {doc.type === 'PDF' ? <FileText size={24} color="white" /> :
                 doc.type === 'Image' ? <Image size={24} color="white" /> :
                 <File size={24} color="white" />}
              </div>
              <div style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                background: statusConfig[doc.status].color,
                color: statusConfig[doc.status].textColor,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {statusConfig[doc.status].icon}
                {statusConfig[doc.status].label}
              </div>
            </div>

            {/* File Info */}
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#2d3748', wordBreak: 'break-word' }}>
              {doc.name}
            </h3>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '12px', fontSize: '14px', color: '#718096' }}>
              <span>{doc.size}</span>
              <span>•</span>
              <span>{doc.uploadDate}</span>
            </div>

            {/* Category */}
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: '#f7fafc',
              borderRadius: '20px',
              fontSize: '13px',
              color: '#667eea',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              {doc.category}
            </div>

            {/* Extracted Text */}
            {doc.extractedText && (
              <div style={{
                padding: '12px',
                background: '#f0fdf4',
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <div style={{ fontSize: '12px', color: '#15803d', marginBottom: '5px', fontWeight: 'bold' }}>
                  ✓ النص المستخرج
                </div>
                <div style={{ fontSize: '13px', color: '#166534' }}>{doc.extractedText}</div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                flex: 1,
                padding: '10px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 'bold'
              }}>
                <Eye size={16} />
                عرض
              </button>
              <button style={{
                padding: '10px',
                background: '#f7fafc',
                color: '#2d3748',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <Download size={16} />
              </button>
              <button style={{
                padding: '10px',
                background: '#fee2e2',
                color: '#991b1b',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;
