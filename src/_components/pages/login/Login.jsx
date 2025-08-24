import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const API_BASE = 'https://dragonelmared-production.up.railway.app';

const Login = () => {
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.ok) {
        setMsg({ type: 'success', text: data.msg });
        // تخزين التوكن وبيانات المستخدم
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data)); 
        navigate('/'); // تحويل للصفحة الرئيسية
      } else {
        setMsg({ type: 'error', text: data.msg });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'تعذر الاتصال بالسيرفر.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" dir="rtl">
      <h2 className="title">تسجيل الدخول</h2>
      <div className="logo-register flex">
        <img className="login-logo" src="./E1.png" alt="" />
      </div>
      <form onSubmit={handleSubmit} className="form-step">
        <input
          type="text"
          placeholder="البريد الإلكتروني أو رقم الهاتف"
          value={formData.emailOrPhone}
          onChange={e => handleChange('emailOrPhone', e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={e => handleChange('password', e.target.value)}
          required
        />

        {msg && <p style={{ color: msg.type === 'error' ? 'red' : 'green' }}>{msg.text}</p>}

        <div style={{ textAlign: 'left', marginTop: '-10px', marginBottom: '1rem' }}>
          <a href="https://api.whatsapp.com/send?phone=201159655999" style={{ color: '#e91e63', fontSize: '0.9rem' }}>
            نسيت كلمة السر؟
          </a>
          <span>  |  </span>
          <a href="/register" style={{ color: '#e91e63', fontSize: '0.9rem' }}>
            إنشاء حساب
          </a>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  );
};

export default Login;
