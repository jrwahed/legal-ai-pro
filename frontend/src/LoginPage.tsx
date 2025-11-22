import { useState } from 'react';
import { Scale, Mail, Lock, ArrowRight } from 'lucide-react';
import './LoginPage.css';

function LoginPage({ onLoginSuccess, onBackToLanding }: { onLoginSuccess: () => void; onBackToLanding: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // محاكاة تسجيل الدخول
    setTimeout(() => {
      if (email && password) {
        onLoginSuccess();
      } else {
        setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-background"></div>

      {/* Login Container */}
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <button className="back-btn" onClick={onBackToLanding}>
              ← العودة
            </button>
            <div className="login-logo">
              <Scale size={40} />
              <h1>المستشار القانوني</h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <h2>تسجيل الدخول</h2>
            <p className="login-subtitle">أدخل بيانات حسابك للمتابعة</p>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Email Input */}
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <div className="input-wrapper">
                <Mail size={20} />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label>كلمة المرور</label>
              <div className="input-wrapper">
                <Lock size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>تذكرني</span>
              </label>
              <a href="#" className="forgot-password">هل نسيت كلمة المرور؟</a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'جاري التحميل...' : 'دخول'}
              <ArrowRight size={20} />
            </button>

            {/* Sign Up Link */}
            <div className="signup-link">
              ليس لديك حساب؟ <a href="#">إنشاء حساب جديد</a>
            </div>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>جميع الحقوق محفوظة © 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
