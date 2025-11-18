import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

function DocumentUpload() {
  const [files, setFiles] = useState<any[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const formData = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append('files', uploadedFiles[i]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setFiles(prev => [...prev, ...data.files]);
      alert('✅ تم رفع الملفات بنجاح!');
    } catch (error) {
      alert('❌ خطأ في رفع الملفات');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '28px', marginBottom: '30px' }}>رفع المستندات</h1>

      <div style={{
        background: 'white',
        padding: '60px',
        borderRadius: '16px',
        border: '2px dashed #e2e8f0',
        textAlign: 'center',
        cursor: 'pointer'
      }}>
        <input
          type="file"
          multiple
          onChange={handleUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <Upload size={64} style={{ margin: '0 auto 20px', color: '#667eea' }} />
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>اسحب الملفات هنا أو اضغط للرفع</h2>
          <p style={{ color: '#718096' }}>PDF, DOC, DOCX, PNG, JPG</p>
        </label>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>الملفات المرفوعة</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {files.map((file, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <FileText size={24} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{file.name}</div>
                  <div style={{ color: '#718096', fontSize: '14px' }}>{file.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentUpload;
