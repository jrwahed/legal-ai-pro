import { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import './Chat.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'مرحباً! 👋 أنا المساعد القانوني الذكي. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // استدعاء الـ API
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input,
          messages: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'عذراً، حدث خطأ في الاتصال. تأكد من أن الـ Backend يعمل.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          المحادثة الذكية
        </h1>
        <p style={{ color: '#718096', fontSize: '16px' }}>
          اسأل عن أي استفسار قانوني أو تقني
        </p>
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px',
        paddingRight: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {messages.map(message => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '15px'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '15px 20px',
              borderRadius: '12px',
              background: message.role === 'user' ? '#667eea' : '#f3f4f6',
              color: message.role === 'user' ? 'white' : '#1f2937',
              fontSize: '15px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}>
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '15px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px 20px',
              borderRadius: '12px',
              background: '#f3f4f6',
              color: '#718096'
            }}>
              <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
              جاري الكتابة...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} style={{
        display: 'flex',
        gap: '10px',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '20px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: loading ? 0.6 : 1
          }}
        >
          <Send size={18} />
          إرسال
        </button>
      </form>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Chat;
