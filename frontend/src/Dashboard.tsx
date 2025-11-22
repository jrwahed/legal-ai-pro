import { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Scale, 
  Upload,
  BarChart3,
} from 'lucide-react';
import './Dashboard.css';
import Chat from './Chat';
import CasesPage from './CasesPage';
import ContractsPage from './ContractsPage';
import DocumentsPage from './DocumentsPage';
import AnalyticsPage from './AnalyticsPage';
import FinancePage from './FinancePage';
import EnhancedDashboard from './EnhancedDashboard';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <Scale size={32} />
          <h2>المستشار القانوني</h2>
        </div>
        
        <nav className="nav-menu">
          <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            <span>لوحة التحكم</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
            <MessageSquare size={20} />
            <span>المحادثة الذكية</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'cases' ? 'active' : ''}`} onClick={() => setActiveTab('cases')}>
            <Scale size={20} />
            <span>إدارة القضايا</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'contracts' ? 'active' : ''}`} onClick={() => setActiveTab('contracts')}>
            <FileText size={20} />
            <span>العقود</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}>
            <Upload size={20} />
            <span>المستندات</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={20} />
            <span>التقارير</span>
          </button>

          <button className={`nav-item ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
            <span>الإدارة المالية</span>
          </button>
          
          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <span>الإعدادات</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && <EnhancedDashboard />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'cases' && <CasesPage />}
        {activeTab === 'contracts' && <ContractsPage />}
        {activeTab === 'documents' && <DocumentsPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'finance' && <FinancePage />}
      </main>
    </div>
  );
}

export default Dashboard;
