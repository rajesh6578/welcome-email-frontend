import React, { useState } from 'react';

const EmailForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setMessage(await response.text());
      } else {
        setMessage('Failed to send email.');
      }
    } catch (err) {
      setMessage('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="email-card">
        <h2 className="form-title">Send Welcome Email</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="form-input"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            type="email"
            required
            className="form-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="form-button"
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>
        <div className="form-message">
          {message}
        </div>
      </div>
      {/* Inline CSS for demo; move to App.css or EmailForm.css in production */}
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%);
        }
        .email-card {
          background: #fff;
          padding: 2.5rem 2rem 2rem 2rem;
          border-radius: 1.2rem;
          box-shadow: 0 6px 32px rgba(80, 80, 180, 0.12), 0 1.5px 8px rgba(80, 80, 180, 0.08);
          max-width: 420px;
          width: 100%;
          text-align: center;
        }
        .form-title {
          color: #5f27cd;
          margin-bottom: 1.5rem;
          font-weight: 700;
          font-size: 2rem;
          margin-top: 0;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .form-input {
          padding: 0.75rem 1rem;
          border: 1.5px solid #d1d8e0;
          border-radius: 0.7rem;
          font-size: 1rem;
          background: #f5f6fa;
          transition: border 0.2s;
          outline: none;
        }
        .form-input:focus {
          border: 1.5px solid #5f27cd;
          background: #fff;
        }
        .form-button {
          padding: 0.8rem 0;
          background: linear-gradient(90deg, #5f27cd 0%, #54a0ff 100%);
          color: #fff;
          border: none;
          border-radius: 0.7rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(95,39,205,0.08);
          transition: background 0.2s, transform 0.1s;
        }
        .form-button:hover:enabled {
          background: linear-gradient(90deg, #341f97 0%, #00d2d3 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .form-button:disabled {
          background: #b2bec3;
          cursor: not-allowed;
        }
        .form-message {
          margin-top: 1.3rem;
          font-size: 1.03rem;
          min-height: 1.5em;
          color: #10ac84;
          font-weight: 500;
          transition: color 0.2s;
        }
        @media (max-width: 500px) {
          .email-card {
            padding: 1.2rem 0.5rem 1rem 0.5rem;
            max-width: 95vw;
          }
          .form-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EmailForm;
