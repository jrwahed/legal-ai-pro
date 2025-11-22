import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Eye, Edit2, Trash2, Plus } from 'lucide-react';
import './FinancePage.css';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income', category: 'استشارات قانونية', amount: 5000, description: 'استشارة قضية إيجار', date: '2025-11-20' },
    { id: '2', type: 'income', category: 'صيغ قانونية', amount: 2500, description: 'صيغة عقد شراكة', date: '2025-11-19' },
    { id: '3', type: 'expense', category: 'رواتب', amount: 3000, description: 'رواتب الموظفين', date: '2025-11-18' },
    { id: '4', type: 'expense', category: 'إيجار', amount: 1500, description: 'إيجار المكتب', date: '2025-11-17' },
    { id: '5', type: 'expense', category: 'تسويق', amount: 800, description: 'إعلانات LinkedIn', date: '2025-11-16' },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: 0,
    description: '',
  });

  const [showForm, setShowForm] = useState(false);

  // حسابات مالية
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const profit = totalIncome - totalExpense;
  const profitMargin = totalIncome > 0 ? ((profit / totalIncome) * 100).toFixed(1) : 0;

  // تصنيفات النفقات
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTransaction.amount > 0 && newTransaction.category) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: newTransaction.type,
        category: newTransaction.category,
        amount: newTransaction.amount,
        description: newTransaction.description,
        date: new Date().toISOString().split('T')[0],
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ type: 'income', category: '', amount: 0, description: '' });
      setShowForm(false);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const incomeCategories = ['استشارات قانونية', 'صيغ قانونية', 'جلسات استشارية', 'أتعاب قضايا'];
  const expenseCategories = ['رواتب', 'إيجار', 'تسويق', 'مكتب ولوازم', 'برامج وأدوات', 'سفريات'];

  return (
    <div style={{ padding: '30px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>الإدارة المالية</h1>
        <p style={{ color: '#718096', fontSize: '18px' }}>متابعة شاملة للإيرادات والنفقات</p>
      </div>

      {/* Main Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {/* Card: الإيرادات */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          borderTop: '4px solid #10b981'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#718096', marginBottom: '10px', fontWeight: '500' }}>
                الإيرادات الكلية
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
                {totalIncome.toLocaleString('ar-EG')} ر.س
              </div>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#d1fae520',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981'
            }}>
              <TrendingUp size={28} />
            </div>
          </div>
        </div>

        {/* Card: النفقات */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          borderTop: '4px solid #ef4444'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#718096', marginBottom: '10px', fontWeight: '500' }}>
                النفقات الكلية
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>
                {totalExpense.toLocaleString('ar-EG')} ر.س
              </div>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#fee2e220',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444'
            }}>
              <TrendingDown size={28} />
            </div>
          </div>
        </div>

        {/* Card: الأرباح */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          borderTop: `4px solid ${profit >= 0 ? '#3b82f6' : '#f59e0b'}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#718096', marginBottom: '10px', fontWeight: '500' }}>
                صافي الربح
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: profit >= 0 ? '#3b82f6' : '#f59e0b', marginBottom: '8px' }}>
                {profit.toLocaleString('ar-EG')} ر.س
              </div>
              <div style={{ fontSize: '13px', color: '#718096' }}>
                {profitMargin}% معدل الربح
              </div>
            </div>
            <div style={{
              width: '60px',
              height: '60px',
              background: `${profit >= 0 ? '#dbeafe' : '#fef3c7'}`,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: profit >= 0 ? '#3b82f6' : '#f59e0b'
            }}>
              <DollarSign size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px', marginBottom: '30px' }}>
        {/* Transactions List */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>المعاملات المالية</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              <Plus size={18} />
              إضافة معاملة
            </button>
          </div>

          {/* Add Transaction Form */}
          {showForm && (
            <form onSubmit={handleAddTransaction} style={{ marginBottom: '25px', padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>النوع</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'income' | 'expense'})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  >
                    <option value="income">إيراد</option>
                    <option value="expense">مصروف</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>التصنيف</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  >
                    <option value="">اختر التصنيف</option>
                    {(newTransaction.type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>المبلغ (ر.س)</label>
                  <input
                    type="number"
                    value={newTransaction.amount || ''}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value) || 0})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>الوصف</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    placeholder="وصف المعاملة"
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                حفظ
              </button>
            </form>
          )}

          {/* Transactions Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', color: '#718096' }}>التاريخ</th>
                  <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', color: '#718096' }}>التصنيف</th>
                  <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', color: '#718096' }}>الوصف</th>
                  <th style={{ textAlign: 'right', padding: '12px', fontWeight: '600', color: '#718096' }}>المبلغ</th>
                  <th style={{ textAlign: 'center', padding: '12px', fontWeight: '600', color: '#718096' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} style={{ borderBottom: '1px solid #e5e7eb', hover: '#f9fafb' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{transaction.date}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: transaction.type === 'income' ? '#d1fae5' : '#fee2e2',
                        color: transaction.type === 'income' ? '#065f46' : '#7f1d1d',
                        borderRadius: '6px',
                        fontSize: '13px'
                      }}>
                        {transaction.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{transaction.description}</td>
                    <td style={{
                      padding: '12px',
                      fontWeight: '600',
                      color: transaction.type === 'income' ? '#10b981' : '#ef4444'
                    }}>
                      {transaction.type === 'income' ? '+' : '-'} {transaction.amount.toLocaleString('ar-EG')}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Expenses by Category */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>توزيع النفقات</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{category}</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{(amount as number).toLocaleString('ar-EG')} ر.س</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
                  background: '#f3f4f6',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${totalExpense > 0 ? ((amount as number / totalExpense) * 100) : 0}%`,
                    height: '100%',
                    background: '#667eea',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancePage;
