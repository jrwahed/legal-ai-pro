import { useState } from 'react';
import { Plus, Search, Download, Eye, Edit, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Contract {
  id: number;
  title: string;
  type: string;
  parties: string[];
  status: 'draft' | 'active' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  value: string;
  description: string;
}

function ContractsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [contracts] = useState<Contract[]>([
    {
      id: 1,
      title: 'عقد إيجار محل تجاري',
      type: 'إيجار',
      parties: ['شركة النور التجارية', 'أحمد محمد الشمري'],
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2026-01-01',
      value: '120,000 ريال',
      description: 'عقد إيجار محل تجاري في حي الملك فهد'
    },
    {
      id: 2,
      title: 'عقد شراكة تجارية',
      type: 'شراكة',
      parties: ['محمد خالد العتيبي', 'سارة علي القحطاني'],
      status: 'draft',
      startDate: '2025-12-01',
      endDate: '2028-12-01',
      value: '500,000 ريال',
      description: 'عقد شراكة في مشروع تجاري'
    },
    {
      id: 3,
      title: 'عقد عمل موظف',
      type: 'عمل',
      parties: ['شركة التقنية الحديثة', 'فهد أحمد السلمي'],
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2026-06-01',
      value: '8,000 ريال/شهر',
      description: 'عقد عمل لمنصب مدير تسويق'
    },
    {
      id: 4,
      title: 'عقد توريد معدات',
      type: 'توريد',
      parties: ['شركة المعدات الصناعية', 'مصنع البلاستيك'],
      status: 'expired',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      value: '350,000 ريال',
      description: 'عقد توريد معدات صناعية'
    }
  ]);

  const statusConfig = {
    draft: { label: 'مسودة', color: '#e0e7ff', textColor: '#3730a3', icon: <Edit size={16} /> },
    active: { label: 'ساري', color: '#d1fae5', textColor: '#065f46', icon: <CheckCircle size={16} /> },
    expired: { label: 'منتهي', color: '#fee2e2', textColor: '#991b1b', icon: <AlertCircle size={16} /> },
    pending: { label: 'معلق', color: '#fef3c7', textColor: '#92400e', icon: <Clock size={16} /> }
  };

  const contractTypes = ['الكل', 'إيجار', 'شراكة', 'عمل', 'توريد', 'خدمات'];
  const [selectedType, setSelectedType] = useState('الكل');

  return (
    <div style={{ padding: '30px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>إدارة العقود</h1>
          <p style={{ color: '#718096', fontSize: '16px' }}>إدارة ومتابعة جميع العقود القانونية</p>
        </div>
        <button style={{
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
        }}>
          <Plus size={20} />
          عقد جديد
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} />
            <input
              type="text"
              placeholder="ابحث عن عقد..."
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
        </div>

        {/* Type Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {contractTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '8px 20px',
                background: selectedType === type ? '#667eea' : '#f7fafc',
                color: selectedType === type ? 'white' : '#2d3748',
                border: '2px solid',
                borderColor: selectedType === type ? '#667eea' : '#e2e8f0',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>إجمالي العقود</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748' }}>45</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>العقود السارية</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>28</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>العقود المنتهية</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>12</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>المسودات</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>5</div>
        </div>
      </div>

      {/* Contracts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {contracts.map(contract => (
          <div key={contract.id} style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={24} color="white" />
                </div>
                <div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: statusConfig[contract.status].color,
                    color: statusConfig[contract.status].textColor,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    {statusConfig[contract.status].icon}
                    {statusConfig[contract.status].label}
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Type */}
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#2d3748' }}>
              {contract.title}
            </h3>
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
              {contract.type}
            </div>

            {/* Description */}
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '15px', lineHeight: '1.6' }}>
              {contract.description}
            </p>

            {/* Parties */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '13px', color: '#718096', marginBottom: '8px' }}>الأطراف:</div>
              {contract.parties.map((party, idx) => (
                <div key={idx} style={{
                  padding: '8px 12px',
                  background: '#f7fafc',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '5px'
                }}>
                  • {party}
                </div>
              ))}
            </div>

            {/* Dates & Value */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '5px' }}>تاريخ البدء</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2d3748' }}>{contract.startDate}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '5px' }}>تاريخ الانتهاء</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea' }}>{contract.endDate}</div>
              </div>
            </div>

            <div style={{ marginTop: '15px', padding: '12px', background: '#f0fdf4', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#15803d', marginBottom: '5px' }}>قيمة العقد</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d' }}>{contract.value}</div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
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
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                <Eye size={16} />
                عرض
              </button>
              <button style={{
                flex: 1,
                padding: '10px',
                background: '#f7fafc',
                color: '#2d3748',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                <Download size={16} />
                تحميل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContractsPage;
