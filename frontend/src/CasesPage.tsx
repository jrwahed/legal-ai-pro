import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Calendar, User } from 'lucide-react';

interface Case {
  id: number;
  title: string;
  client: string;
  status: 'active' | 'pending' | 'closed';
  priority: 'high' | 'medium' | 'low';
  date: string;
  nextHearing: string;
  description: string;
}

function CasesPage() {
  const [showNewCase, setShowNewCase] = useState(false);
  const [cases] = useState<Case[]>([
    {
      id: 1,
      title: 'قضية عقد إيجار تجاري',
      client: 'أحمد محمد الشمري',
      status: 'active',
      priority: 'high',
      date: '2025-11-15',
      nextHearing: '2025-12-01',
      description: 'نزاع حول شروط تجديد عقد إيجار محل تجاري'
    },
    {
      id: 2,
      title: 'نزاع عمالي - فصل تعسفي',
      client: 'سارة علي القحطاني',
      status: 'pending',
      priority: 'medium',
      date: '2025-11-10',
      nextHearing: '2025-11-25',
      description: 'دعوى تعويض عن فصل تعسفي'
    },
    {
      id: 3,
      title: 'عقد شراكة تجارية',
      client: 'محمد خالد العتيبي',
      status: 'closed',
      priority: 'low',
      date: '2025-10-20',
      nextHearing: '-',
      description: 'تم التوصل لتسوية ودية'
    }
  ]);

  const statusColors = {
    active: { bg: '#fef3c7', text: '#92400e', label: 'نشط' },
    pending: { bg: '#dbeafe', text: '#1e40af', label: 'معلق' },
    closed: { bg: '#d1fae5', text: '#065f46', label: 'مغلق' }
  };

  const priorityColors = {
    high: { bg: '#fee2e2', text: '#991b1b', label: 'عالي' },
    medium: { bg: '#fef3c7', text: '#92400e', label: 'متوسط' },
    low: { bg: '#e0e7ff', text: '#3730a3', label: 'منخفض' }
  };

  return (
    <div style={{ padding: '30px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>إدارة القضايا</h1>
          <p style={{ color: '#718096', fontSize: '16px' }}>إدارة ومتابعة جميع القضايا القانونية</p>
        </div>
        <button
          onClick={() => setShowNewCase(true)}
          style={{
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}
        >
          <Plus size={20} />
          قضية جديدة
        </button>
      </div>

      {/* Search & Filter */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} />
            <input
              type="text"
              placeholder="ابحث عن قضية..."
              style={{
                width: '100%',
                padding: '14px 45px 14px 20px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>
          <button style={{
            padding: '14px 24px',
            background: '#f7fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            <Filter size={20} />
            تصفية
          </button>
        </div>
      </div>

      {/* Cases Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {cases.map(c => (
          <div key={c.id} style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s'
          }}>
            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  background: statusColors[c.status].bg,
                  color: statusColors[c.status].text
                }}>
                  {statusColors[c.status].label}
                </span>
                <span style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  background: priorityColors[c.priority].bg,
                  color: priorityColors[c.priority].text
                }}>
                  {priorityColors[c.priority].label}
                </span>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#2d3748' }}>
              {c.title}
            </h3>

            {/* Description */}
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '15px', lineHeight: '1.6' }}>
              {c.description}
            </p>

            {/* Client Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', padding: '12px', background: '#f7fafc', borderRadius: '10px' }}>
              <User size={18} color="#667eea" />
              <span style={{ fontSize: '15px', color: '#2d3748' }}>{c.client}</span>
            </div>

            {/* Dates */}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '5px' }}>تاريخ الرفع</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>{c.date}</div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '5px' }}>الجلسة القادمة</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={16} />
                  {c.nextHearing}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CasesPage;
