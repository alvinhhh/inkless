import React, { useState, useEffect } from 'react';
import './tailwind.css';

export default function App() {
  const [page, setPage] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [summary, setSummary] = useState('No summary yet.');
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const api = async (path, data) => {
    const res = await fetch(`http://localhost:3001/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg);
    return json;
  };

  const handleSignup = async () => {
    try {
      await api('signup', { email, password });
      setPage('login');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api('login', { email, password });
      setToken(res.token);
      setPage('dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChat = () => {
    const dummyResponse = "That's a great question! Let me explain.";
    setChat([...chat, { role: 'user', text: input }, { role: 'ai', text: dummyResponse }]);
    setInput('');
  };

  if (page === 'signup' || page === 'login') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">{page === 'signup' ? 'Sign Up' : 'Log In'}</h1>
        <input className="border p-2 mb-2 w-64" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 mb-2 w-64" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={page === 'signup' ? handleSignup : handleLogin}>
          {page === 'signup' ? 'Sign Up' : 'Log In'}
        </button>
        <p className="mt-2">
          {page === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => setPage(page === 'signup' ? 'login' : 'signup')}>
            {page === 'signup' ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-16 bg-gray-800 text-white flex flex-col items-center py-4">
        <button className="mb-4" onClick={() => setSummary('Summarizing document...')}>📄</button>
        <button className="mb-4" onClick={() => alert('Edit mode')}>✏️</button>
        <button className="mb-4" onClick={() => alert('Highlight mode')}>🖍️</button>
        <button className="mb-4" onClick={() => alert('Signature added')}>✒️</button>
        <button className="mb-4" onClick={() => alert('Search opened')}>🔍</button>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h2 className="font-bold text-lg">Inkless Dashboard</h2>
          <button className="text-red-500" onClick={() => setPage('login')}>Log Out</button>
        </header>
        <div className="flex flex-1">
          <section className="flex-1 p-4 bg-white">
            <h3 className="font-bold mb-2">Document Viewer</h3>
            <div className="border p-4 mb-4 h-64">[Dummy PDF Document Here]</div>
            <h3 className="font-bold mb-2">AI Summary</h3>
            <p className="border p-4">{summary}</p>
          </section>
          <aside className="w-80 p-4 bg-gray-100">
            <h3 className="font-bold mb-2">AI Chat</h3>
            <div className="h-64 overflow-y-scroll border p-2 mb-2">
              {chat.map((c, i) => (
                <div key={i} className={c.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={c.role === 'user' ? 'text-blue-500' : 'text-green-500'}>{c.text}</span>
                </div>
              ))}
            </div>
            <input className="border p-2 w-full mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something..." />
            <button className="bg-blue-500 text-white px-4 py-2 w-full rounded" onClick={handleChat}>Send</button>
          </aside>
        </div>
      </main>
    </div>
  );
}
