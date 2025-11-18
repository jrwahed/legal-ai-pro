import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, use_context: true }),
      });

      const data = await response.json();
      const assistantMsg: Message = { role: 'assistant', content: data.answer };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      alert('خطأ: تأكد من تشغيل Backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>المحادثة الذكية</h1>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#718096' }}>
            <div style={{ fontSize: '60px' }}>⚖️</div>
            <h2 style={{ fontSize: '24px' }}>اسألني أي سؤال قانوني</h2>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-start' : 'flex-end', marginBottom: '20px' }}>
            <div style={{
              maxWidth: '70%',
              padding: '15px 20px',
              borderRadius: '16px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
              color: msg.role === 'user' ? 'white' : '#2d3748',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && <div style={{ textAlign: 'center' }}>🤔 جاري التفكير...</div>}
      </main>

      <footer style={{ padding: '25px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب سؤالك..."
            style={{ flex: 1, padding: '15px', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '16px' }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: '15px 30px',
              background: loading || !input.trim() ? '#cbd5e0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            إرسال
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Chat;
