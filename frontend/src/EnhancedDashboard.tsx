import { TrendingUp, Scale, FileText, MessageSquare, Upload, Clock, DollarSign } from 'lucide-react';

function EnhancedDashboard() {
  const stats = [
    { title: 'القضايا النشطة', value: '12', change: '+12%', icon: <Scale size={24} />, color: '#667eea' },
    { title: 'العقود', value: '45', change: '+8%', icon: <FileText size={24} />, color: '#764ba2' },
    { title: 'الاستشارات', value: '128', change: '+24%', icon: <MessageSquare size={24} />, color: '#f093fb' },
    { title: 'المستندات', value: '234', change: '+15%', icon: <Upload size={24} />, color: '#4facfe' }
  ];

  const recentActivities = [
    { icon: <Scale size={20} />, text: 'قضية جديدة: عقد إيجار تجاري', time: 'منذ ساعة', color: '#667eea' },
    { icon: <FileText size={20} />, text: 'تم توقيع عقد شراكة', time: 'منذ 2 ساعة', color: '#764ba2' },
    { icon: <Upload size={20} />, text: 'رفع 3 مستندات جديدة', time: 'منذ 3 ساعات', color: '#4facfe' },
    { icon: <MessageSquare size={20} />, text: 'استشارة قانونية جديدة', time: 'منذ 5 ساعات', color: '#f093fb' }
  ];

  const upcomingEvents = [
    { title: 'جلسة محكمة - قضية إيجار', date: '2025-11-20', time: '10:00 صباحاً' },
    { title: 'موعد توقيع عقد', date: '2025-11-22', time: '14:00 مساءً' },
    { title: 'استشارة مع عميل', date: '2025-11-25', time: '11:30 صباحاً' }
  ];

  const casesByStatus = [
    { status: 'نشطة', count: 12, color: '#10b981', percentage: 40 },
    { status: 'معلقة', count: 8, color: '#f59e0b', percentage: 27 },
    { status: 'مغلقة', count: 10, color: '#6b7280', percentage: 33 }
  ];

  return (
    <div style={{ padding: '30px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>لوحة التحكم</h1>
        <p style={{ color: '#718096', fontSize: '18px' }}>مرحباً بك، محمد! إليك نظرة عامة على النظام</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            borderTop: `4px solid ${stat.color}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: `${stat.color}10`,
              borderRadius: '50%'
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', position: 'relative' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#718096', marginBottom: '10px', fontWeight: '500' }}>{stat.title}</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}>
                  <TrendingUp size={16} />
                  {stat.change}
                </div>
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                background: `${stat.color}20`,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color
              }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px', marginBottom: '30px' }}>
        {/* Cases by Status */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '25px' }}>القضايا حسب الحالة</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {casesByStatus.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>{item.status}</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: item.color }}>{item.count} قضية</span>
                </div>
                <div style={{ width: '100%', height: '12px', background: '#f3f4f6', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    background: item.color,
                    borderRadius: '6px',
                    transition: 'width 0.8s ease'
                  }} />
                </div>
                <div style={{ fontSize: '13px', color: '#718096', marginTop: '5px' }}>{item.percentage}%</div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px', paddingTop: '25px', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', color: '#15803d', marginBottom: '5px' }}>معدل النجاح</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#15803d' }}>89%</div>
            </div>
            <div style={{ padding: '15px', background: '#fef3c7', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', color: '#92400e', marginBottom: '5px' }}>متوسط المدة</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#92400e' }}>45 يوم</div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
            <Clock size={24} color="#667eea" />
            <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>المواعيد القادمة</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {upcomingEvents.map((event, idx) => (
              <div key={idx} style={{
                padding: '15px',
                background: '#f7fafc',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea'
              }}>
                <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: '#2d3748' }}>
                  {event.title}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  📅 {event.date} • ⏰ {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '25px' }}>النشاطات الأخيرة</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {recentActivities.map((activity, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px',
              background: '#f9fafb',
              borderRadius: '12px',
              transition: 'all 0.2s'
            }}>
              <div style={{
                width: '45px',
                height: '45px',
                background: `${activity.color}20`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activity.color
              }}>
                {activity.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{activity.text}</div>
                <div style={{ fontSize: '13px', color: '#718096' }}>{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnhancedDashboard;
