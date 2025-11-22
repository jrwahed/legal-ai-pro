import { useState } from 'react';
import { 
  Scale, MessageSquare, FileText, BarChart3, DollarSign, Settings, 
  ArrowRight, Check, Zap, Shield, Clock, Users, TrendingUp, Award,
  Menu, X
} from 'lucide-react';
import './LandingPage.css';

function LandingPage({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <MessageSquare size={40} />,
      title: 'المحادثة الذكية بـ AI',
      description: 'استشارات قانونية فورية 24/7 بواسطة الذكاء الاصطناعي المتقدم',
      color: '#667eea'
    },
    {
      icon: <FileText size={40} />,
      title: 'إدارة العقود الذكية',
      description: 'تحليل واستخراج البيانات من العقود تلقائياً مع حفظ آمن',
      color: '#764ba2'
    },
    {
      icon: <Scale size={40} />,
      title: 'إدارة القضايا المتقدمة',
      description: 'متابعة القضايا والجلسات مع تنبيهات فورية وتقارير مفصلة',
      color: '#f093fb'
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'تقارير وتحليلات شاملة',
      description: 'إحصائيات وتحليلات متقدمة لتحسين الأداء واتخاذ قرارات أفضل',
      color: '#4facfe'
    },
    {
      icon: <DollarSign size={40} />,
      title: 'الإدارة المالية المتكاملة',
      description: 'تتبع الإيرادات والمصروفات مع فواتير تلقائية وتقارير ضريبية',
      color: '#43e97b'
    },
    {
      icon: <Shield size={40} />,
      title: 'أمان وخصوصية عالية',
      description: 'تشفير من الدرجة العسكرية وحماية البيانات الحساسة',
      color: '#fa709a'
    }
  ];

  const benefits = [
    { icon: <Zap size={24} />, title: 'سرعة فائقة', description: 'معالجة سريعة للبيانات' },
    { icon: <Clock size={24} />, title: 'توفير الوقت', description: 'أتمتة المهام الروتينية' },
    { icon: <TrendingUp size={24} />, title: 'زيادة الإنتاجية', description: 'زيادة الكفاءة بنسبة 70%' },
    { icon: <Users size={24} />, title: 'سهولة التعاون', description: 'فريق واحد - نظام واحد' },
  ];

  const testimonials = [
    {
      name: 'أحمد محمود',
      role: 'محامي متخصص',
      company: 'مكتب القانون المتقدم',
      text: 'هذا النظام غير حياتي المهنية تماماً. توفير الوقت المذهل والدقة رائعة.',
      stars: 5
    },
    {
      name: 'فاطمة أحمد',
      role: 'مدير قانوني',
      company: 'شركة عقاري للاستثمارات',
      text: 'أفضل استثمار قمت به. الآن أدير 10 مشاريع في نفس الوقت بكفاءة أعلى.',
      stars: 5
    },
    {
      name: 'محمد علي',
      role: 'رئيس قسم قانوني',
      company: 'مجموعة الشرق الأوسط',
      text: 'المحادثة الذكية تجعل الاستشارات القانونية أسهل وأسرع بكثير.',
      stars: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'مبتدئ',
      price: '199',
      description: 'للمحامين الأفراد',
      features: ['المحادثة الذكية محدودة', 'إدارة 5 قضايا', 'تقارير أساسية', 'دعم عبر البريد'],
      popular: false
    },
    {
      name: 'احترافي',
      price: '499',
      description: 'للمكاتب القانونية',
      features: ['المحادثة الذكية غير محدودة', 'إدارة 50 قضية', 'تقارير متقدمة', 'دعم أولوي', 'تكامل الفواتير'],
      popular: true
    },
    {
      name: 'مؤسسي',
      price: 'حسب الطلب',
      description: 'للشركات الكبرى',
      features: ['ميزات غير محدودة', 'فريق دعم مخصص', 'API وتكامل مخصص', 'استضافة خاصة', 'SLA مضمون'],
      popular: false
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
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button className="login-btn" onClick={onNavigateToLogin}>
            تسجيل الدخول
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">مستشارك القانوني الذكي</h1>
          <p className="hero-subtitle">منصة ثورية تجمع قوة الذكاء الاصطناعي بالخبرة القانونية لإدارة القضايا والعقود والاستشارات</p>
          <div className="hero-buttons">
            <button className="cta-btn primary" onClick={onNavigateToLogin}>
              ابدأ الآن مجاناً
              <ArrowRight size={20} />
            </button>
            <button className="cta-btn secondary">
              تعرف على المزيد
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>مستخدم نشط</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>ميزة قوية</p>
            </div>
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>موثوقية</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-icon">
              <Scale size={48} />
            </div>
            <p className="card-text">AI Powered Legal Assistant</p>
            <div className="card-badge">متاح الآن</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>المميزات الرئيسية</h2>
          <p>كل ما تحتاجه لإدارة ممارسة قانونية حديثة</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="section-header">
          <h2>لماذا اختيار المستشار القانوني؟</h2>
          <p>حل شامل يوفر الوقت والمال</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>كيف يعمل النظام؟</h2>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>التسجيل البسيط</h3>
            <p>أنشئ حسابك في دقائق وابدأ فوراً</p>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>إضافة القضايا</h3>
            <p>أضف قضاياك والعقود بسهولة</p>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>التحليل الذكي</h3>
            <p>الـ AI يحلل ويعطيك نصائح فورية</p>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>النتائج المذهلة</h3>
            <p>تقارير وإحصائيات تساعدك في اتخاذ قرارات أفضل</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2>آراء المستخدمين</h2>
          <p>ماذا يقول المحامون عن الخدمة؟</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
                <small>{testimonial.company}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="section-header">
          <h2>خطط الأسعار</h2>
          <p>اختر الخطة التي تناسب احتياجاتك</p>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">الأشهر</div>}
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              <div className="price">
                <span className="currency">ر.س</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/شهر</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="plan-btn">ابدأ الآن</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="section-header">
          <h2>الأسئلة الشائعة</h2>
        </div>
        <div className="faq-container">
          <div className="faq-item">
            <h4>هل يمكنني تجربة النظام مجاناً؟</h4>
            <p>نعم! لديك 14 يوم تجربة مجانية كاملة بدون الحاجة لبطاقة ائتمان</p>
          </div>
          <div className="faq-item">
            <h4>هل بيانات القضايا آمنة؟</h4>
            <p>تماماً! نستخدم تشفير من الدرجة العسكرية وأحدث معايير الأمان</p>
          </div>
          <div className="faq-item">
            <h4>هل يمكن دمج النظام مع أنظمة أخرى؟</h4>
            <p>نعم! لدينا API قوية وتكامل مع معظم الأنظمة الشهيرة</p>
          </div>
          <div className="faq-item">
            <h4>كم من الوقت ستوفر لي المحادثة الذكية؟</h4>
            <p>عملاؤنا يوفرون في المتوسط 20 ساعة عمل شهرياً</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>جاهز لتطوير ممارستك القانونية؟</h2>
        <p>انضم إلى آلاف المحامين والمكاتب القانونية الذين يستخدمون المستشار القانوني الذكي</p>
        <button className="cta-btn-large" onClick={onNavigateToLogin}>
          ابدأ الآن مجاناً
          <ArrowRight size={24} />
        </button>
        <p className="cta-footer">لا تحتاج لبطاقة ائتمان • إلغاء الاشتراك في أي وقت • 14 يوم تجربة كاملة</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>عن المنصة</h4>
            <p>منصة قانونية ذكية توفر حلولاً متكاملة للمحامين والمكاتب القانونية</p>
          </div>
          <div className="footer-section">
            <h4>الروابط السريعة</h4>
            <ul>
              <li><a href="#features">المميزات</a></li>
              <li><a href="#pricing">الأسعار</a></li>
              <li><a href="#faq">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>التواصل</h4>
            <p>البريد: info@legal-ai.com</p>
            <p>الهاتف: +966 50 123 4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 المستشار القانوني الذكي. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
