import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

interface Case {
  id: number;
  title: string;
  client: string;
  status: string;
  date: string;
  priority: string;
}

function CasesManagement() {
  const [cases] = useState<Case[]>([
    { id: 1, title: 'قضية عقد إيجار', client: 'أحمد محمد', status: 'جاري', date: '2025-11-15', priority: 'عالي' },
    { id: 2, title: 'نزاع عمالي', client: 'سارة علي', status: 'مكتمل', date: '2025-11-10', priority: 'متوسط' },
    { id: 3, title: 'عقد شراكة', client: 'محمد خالد', status: 'مراجعة', date: '2025-11-12', priority: 'منخفض' }
  ]);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>إدارة القضايا</h1>
          <p style={{ color: '#718096' }}>متابعة وإدارة جميع القضايا</p>
        </div>
        <button style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}>
          <Plus size={20} />
          قضية جديدة
        </button>
      </header>

      <div style={{ background: 'white', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} />
          <input
            type="text"
            placeholder="ابحث عن قضية..."
            style={{ width: '100%', padding: '12px 45px 12px 20px', border: '1px solid #e2e8f0', borderRadius: '10px' }}
          />
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f7fafc' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'right' }}>القضية</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>العميل</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>الحالة</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>الأولوية</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px' }}>{c.title}</td>
                <td style={{ padding: '15px' }}>{c.client}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '5px 15px',
                    borderRadius: '20px',
                    background: c.status === 'جاري' ? '#fef3c7' : '#d1fae5',
                    color: c.status === 'جاري' ? '#92400e' : '#065f46'
                  }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>{c.priority}</td>
                <td style={{ padding: '15px' }}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CasesManagement;
