import { TrendingUp, TrendingDown, DollarSign, Scale, FileText, Users, Calendar, Award } from 'lucide-react';

function AnalyticsPage() {
  // بيانات الإحصائيات
  const mainStats = [
    { 
      title: 'إجمالي القضايا', 
      value: '156', 
      change: '+12%', 
      trend: 'up',
      icon: <Scale size={24} />,
      color: '#667eea'
    },
    { 
      title: 'نسبة النجاح', 
      value: '89%', 
      change: '+5%', 
      trend: 'up',
      icon: <Award size={24} />,
      color: '#10b981'
    },
    { 
      title: 'العقود النشطة', 
      value: '45', 
      change: '-3%', 
      trend: 'down',
      icon: <FileText size={24} />,
      color: '#764ba2'
    },
    { 
      title: 'إجمالي الإيرادات', 
      value: '2.4M', 
      change: '+18%', 
      trend: 'up',
      icon: <DollarSign size={24} />,
      color: '#f59e0b'
    }
  ];

  const monthlyData = [
    { month: 'يناير', cases: 12, contracts: 8, revenue: 180000 },
    { month: 'فبراير', cases: 15, contracts: 10, revenue: 220000 },
    { month: 'مارس', cases: 18, contracts: 12, revenue: 280000 },
    { month: 'أبريل', cases: 14, contracts: 9, revenue: 210000 },
    { month: 'مايو', cases: 20, contracts: 15, revenue: 320000 },
    { month: 'يونيو', cases: 22, contracts: 16, revenue: 350000 }
  ];

  const casesByType = [
    { type: 'عقود إيجار', count: 45, percentage: 28.8, color: '#667eea' },
    { type: 'نزاعات عمالية', count: 38, percentage: 24.4, color: '#764ba2' },
    { type: 'شراكات تجارية', count: 32, percentage: 20.5, color: '#f093fb' },
    { type: 'قضايا مدنية', count: 25, percentage: 16.0, color: '#4facfe' },
    { type: 'أخرى', count: 16, percentage: 10.3, color: '#f59e0b' }
  ];

  const topClients = [
    { name: 'شركة النور التجارية', cases: 12, revenue: '450,000 ريال' },
    { name: 'مؤسسة البناء الحديث', cases: 9, revenue: '380,000 ريال' },
    { name: 'شركة التقنية المتقدمة', cases: 8, revenue: '320,000 ريال' },
    { name: 'مصنع البلاستيك الوطني', cases: 7, revenue: '290,000 ريال' },
    { name: 'شركة الخدمات اللوجستية', cases: 6, revenue: '250,000 ريال' }
  ];

  return (
    <div style={{ padding: '30px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>التقارير والإحصائيات</h1>
        <p style={{ color: '#718096', fontSize: '16px' }}>تحليل شامل للأداء والنتائج</p>
      </div>

      {/* Main Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {mainStats.map((stat, idx) => (
          <div key={idx} style={{
            background: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            borderTop: `4px solid ${stat.color}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: `${stat.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color
              }}>
                {stat.icon}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                borderRadius: '20px',
                background: stat.trend === 'up' ? '#d1fae5' : '#fee2e2',
                color: stat.trend === 'up' ? '#065f46' : '#991b1b',
                fontSize: '13px',
                fontWeight: 'bold'
              }}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.change}
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>{stat.title}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Monthly Performance Chart */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>الأداء الشهري</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {monthlyData.map((data, idx) => {
              const maxCases = Math.max(...monthlyData.map(d => d.cases));
              const barWidth = (data.cases / maxCases) * 100;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ fontWeight: 'bold' }}>{data.month}</span>
                    <span style={{ color: '#718096' }}>{data.cases} قضية</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${barWidth}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      transition: 'width 0.5s'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cases by Type */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>القضايا حسب النوع</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {casesByType.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                  <span>{item.type}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.count}</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    background: item.color,
                    transition: 'width 0.5s'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>الإيرادات الشهرية</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', height: '250px' }}>
          {monthlyData.map((data, idx) => {
            const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
            const barHeight = (data.revenue / maxRevenue) * 100;
            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${barHeight}%`,
                      background: `linear-gradient(180deg, #10b981 0%, #059669 100%)`,
                      borderRadius: '8px 8px 0 0',
                      transition: 'height 0.5s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {(data.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold' }}>{data.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Clients */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>أفضل العملاء</h2>
          <Users size={24} color="#667eea" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {topClients.map((client, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              background: '#f7fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{client.name}</div>
                  <div style={{ fontSize: '13px', color: '#718096' }}>{client.cases} قضية</div>
                </div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{client.revenue}</div>
                <div style={{ fontSize: '12px', color: '#718096' }}>إيرادات</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
