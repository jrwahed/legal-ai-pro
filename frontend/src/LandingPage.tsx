import { useState } from 'react';
import { Scale, MessageSquare, FileText, BarChart3, DollarSign, Settings, ArrowRight, Check } from 'lucide-react';
import './LandingPage.css';

function LandingPage({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <MessageSquare size={32} />,
      title: 'المحادثة الذكية',
      description: 'استشارات قانونية فورية بواسطة الذكاء الاصطناعي'
    },
    {
      icon: <FileText size={32} />,
      title: 'إدارة العقود',
      description: 'تنظيم وتحليل العقود بكفاءة عالية'
    },
    {
      icon: <Scale size={32} />,
      title: 'إدارة القضايا',
      description: 'متابعة القضايا والجلسات بنظام متكامل'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'التقارير المتقدمة',
      description: 'تحليلات وإحصائيات شاملة'
    },
    {
      icon: <DollarSign size={32} />,
      title: 'الإدارة المالية',
      description: 'تتبع الإيرادات والمصروفات'
    },
    {
      icon: <Settings size={32} />,
      title: 'إعدادات متقدمة',
      description: 'تخصيص كامل النظام حسب احتياجاتك'
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Scale size={32} />
            <span>المستشار القانوني</span>
          </div>
          <button className="login-btn" onClick={onNavigateToLogin}>
            تسجيل الدخول
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>مستشارك القانوني الذكي</h1>
          <p>منصة متكاملة لإدارة القضايا والعقود والاستشارات القانونية بقوة الذكاء الاصطناعي</p>
          <button className="cta-btn" onClick={onNavigateToLogin}>
            ابدأ الآن
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <Scale size={48} />
            <span>AI Powered</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>المميزات الرئيسية</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>عن المشروع</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>منصة شاملة للخدمات القانونية</h3>
            <p>
              المستشار القانوني الذكي هو منصة ثورية تجمع بين قوة الذكاء الاصطناعي والخبرة القانونية.
              تم تصميمها خصيصاً لمساعدة المحامين والشركات القانونية على:
            </p>
            <ul>
              <li><Check size={20} /> إدارة ملفات القضايا بكفاءة</li>
              <li><Check size={20} /> تحليل العقود الذكية</li>
              <li><Check size={20} /> الحصول على استشارات فورية</li>
              <li><Check size={20} /> تتبع المالية والإيرادات</li>
              <li><Check size={20} /> تقارير تحليلية شاملة</li>
            </ul>
          </div>
          <div className="about-stats">
            <div className="stat">
              <h4>100+</h4>
              <p>ميزة قوية</p>
            </div>
            <div className="stat">
              <h4>24/7</h4>
              <p>دعم متاح</p>
            </div>
            <div className="stat">
              <h4>99%</h4>
              <p>دقة</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>جاهز للبدء؟</h2>
        <p>انضم إلى الآلاف من المحامين الذين يستخدمون المستشار القانوني الذكي</p>
        <button className="cta-btn-large" onClick={onNavigateToLogin}>
          سجل الآن مجاناً
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 المستشار القانوني الذكي. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
