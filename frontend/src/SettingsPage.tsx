import { useState } from 'react';
import { 
  Bell, 
  Shield, 
  User, 
  Lock, 
  Palette, 
  Globe,
  Database,
  Download,
  LogOut,
  Save,
  Moon,
  Sun
} from 'lucide-react';

  id: string;
  label: string;
  icon: React.ReactNode;
}

  const [activeSection, setActiveSection] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    pushNotifications: true,
    caseUpdates: true,
    contractReminders: true,
  });
  const [language, setLanguage] = useState('ar');
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('weekly');

    { id: 'account', label: 'حسابي', icon: <User size={20} /> },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell size={20} /> },
    { id: 'security', label: 'الأمان والخصوصية', icon: <Shield size={20} /> },
    { id: 'appearance', label: 'المظهر', icon: <Palette size={20} /> },
    { id: 'language', label: 'اللغة', icon: <Globe size={20} /> },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: <Database size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        background: 'white',
        borderLeft: '1px solid #e5e7eb',
        padding: '30px 0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ padding: '0 20px', marginBottom: '25px', fontSize: '22px', fontWeight: 'bold' }}>
          الإعدادات
        </h2>
        <nav>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: activeSection === section.id ? '#eef2ff' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'right',
                color: activeSection === section.id ? '#667eea' : '#4b5563',
                fontWeight: activeSection === section.id ? '600' : '500',
                borderRight: activeSection === section.id ? '4px solid #667eea' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s',
                fontSize: '15px'
              }}
            >
              <span style={{
                color: activeSection === section.id ? '#667eea' : '#9ca3af'
              }}>
                {section.icon}
              </span>
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        {activeSection === 'account' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>حسابي</h1>
            <p style={{ color: '#718096', marginBottom: '30px' }}>إدارة معلومات الحساب الشخصية</p>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              maxWidth: '600px'
            }}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  placeholder="محمد وحيد"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  placeholder="+966 55 123 4567"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <button style={{
                background: '#667eea',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Save size={18} />
                حفظ التغييرات
              </button>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeSection === 'notifications' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>الإشعارات</h1>
            <p style={{ color: '#718096', marginBottom: '30px' }}>التحكم في الإشعارات والتنبيهات</p>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              maxWidth: '600px'
            }}>
              {Object.entries(notifications).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '18px',
                    marginBottom: '18px',
                    borderBottom: '1px solid #e5e7eb'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {key === 'email' && 'إشعارات البريد الإلكتروني'}
                      {key === 'sms' && 'رسائل SMS'}
                      {key === 'pushNotifications' && 'الإشعارات الفورية'}
                      {key === 'caseUpdates' && 'تحديثات القضايا'}
                      {key === 'contractReminders' && 'تذكيرات العقود'}
                    </p>
                    <p style={{ fontSize: '14px', color: '#718096' }}>
                      {key === 'email' && 'استقبل إشعارات عبر بريدك الإلكتروني'}
                      {key === 'sms' && 'استقبل رسائل نصية قصيرة'}
                      {key === 'pushNotifications' && 'استقبل إشعارات فورية على جهازك'}
                      {key === 'caseUpdates' && 'تنبيهات حول تحديثات القضايا'}
                      {key === 'contractReminders' && 'تنبيهات قبل انتهاء صلاحيات العقود'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setNotifications({...notifications, [key]: !value})}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security */}
        {activeSection === 'security' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>الأمان والخصوصية</h1>
            <p style={{ color: '#718096', marginBottom: '30px' }}>حماية حسابك والتحكم في خصوصيتك</p>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              maxWidth: '600px'
            }}>
              <div style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>تغيير كلمة المرور</p>
                    <p style={{ fontSize: '14px', color: '#718096' }}>تحديث كلمة مرورك بانتظام</p>
                  </div>
                  <button style={{
                    padding: '8px 16px',
                    background: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Lock size={18} />
                    تحديث
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontWeight: '600', marginBottom: '12px' }}>المصادقة الثنائية</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{
                    padding: '10px 16px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    تفعيل 2FA
                  </button>
                </div>
              </div>

              <div>
                <p style={{ fontWeight: '600', marginBottom: '12px' }}>الأجهزة المتصلة</p>
                <p style={{ fontSize: '14px', color: '#718096' }}>عرض جميع الأجهزة المتصلة بحسابك وإدارتها</p>
              </div>
            </div>
          </div>
        )}

        {/* Appearance */}
        {activeSection === 'appearance' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>المظهر</h1>
            <p style={{ color: '#718096', marginBottom: '30px' }}>تخصيص مظهر التطبيق</p>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              maxWidth: '600px'
            }}>
              <p style={{ fontWeight: '600', marginBottom: '18px' }}>الوضع الليلي</p>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                <button
                  onClick={() => setDarkMode(false)}
                  style={{
                    padding: '12px 24px',
                    background: !darkMode ? '#667eea' : '#f3f4f6',
                    color: !darkMode ? 'white' : '#4b5563',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Sun size={18} />
                  الوضع الفاتح
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  style={{
                    padding: '12px 24px',
                    background: darkMode ? '#667eea' : '#f3f4f6',
                    color: darkMode ? 'white' : '#4b5563',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Moon size={18} />
                  الوضع الليلي
                </button>
              </div>

              <div>
                <p style={{ fontWeight: '600', marginBottom: '12px' }}>الألوان الأساسية</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['#667eea', '#10b981', '#f59e0b', '#ef4444'].map(color => (
                    <button
                      key={color}
                      style={{
                        width: '50px',
                        height: '50px',
                        background: color,
                        border: '2px solid transparent',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Language */}
        {activeSection === 'language' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>اللغة</h1>
            <p style={{ color: '#718096', marginBottom: '30px' }}>اختر لغة التطبيق المفضلة</p>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              maxWidth: '600px'
            }}>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        )}

        {/* Backup */}
        {activeSection === 'backup' && (
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>النسخ الاحتياطي</h1>
            <p style={{ color: '#718096', marginBottom: '30px' }}>إدارة النسخ الاحتياطية من البيانات</p>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              maxWidth: '600px'
            }}>
              <div style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>النسخ الاحتياطي التلقائي</p>
                    <p style={{ fontSize: '14px', color: '#718096' }}>حفظ نسخة احتياطية من بياناتك تلقائياً</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={() => setAutoBackup(!autoBackup)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </div>

                {autoBackup && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                      تكرار النسخ الاحتياطي
                    </label>
                    <select
                      value={backupFrequency}
                      onChange={(e) => setBackupFrequency(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      <option value="daily">يومياً</option>
                      <option value="weekly">أسبوعياً</option>
                      <option value="monthly">شهرياً</option>
                    </select>
                  </div>
                )}
              </div>

              <button style={{
                background: '#667eea',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '15px'
              }}>
                <Download size={18} />
                تنزيل نسخة احتياطية الآن
              </button>

              <p style={{ fontSize: '14px', color: '#718096' }}>
                آخر نسخة احتياطية: 22 نوفمبر 2025 - 4:30 م
              </p>
            </div>
          </div>
        )}

        {/* Logout Button at Bottom */}
        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #e5e7eb' }}>
          <button style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </main>
    </div>
  );
}

