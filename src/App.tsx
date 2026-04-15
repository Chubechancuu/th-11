import React, { useState, useEffect } from 'react';
import { Timer, BookOpen } from 'lucide-react';

export default function App() {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState('');
  const [logs, setLogs] = useState<{id: number, text: string, time: string}[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const addLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    setLogs([{ id: Date.now(), text: task, time: new Date().toLocaleTimeString() }, ...logs]);
    setTask('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>EduLedger Pro 🚀</h1>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h2><Timer /> {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</h2>
        <button onClick={() => setIsActive(!isActive)} style={{ padding: '10px 20px', background: isActive ? '#f39c12' : '#27ae60', color: '#fff', border: 'none', borderRadius: '5px' }}>
          {isActive ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
      </div>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2><BookOpen /> Nhật ký học Luật & Kế toán</h2>
        <form onSubmit={addLog}>
          <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Nghiên cứu gì hôm nay?" style={{ padding: '10px', width: '70%' }} />
          <button type="submit" style={{ padding: '10px', background: '#3498db', color: '#fff', border: 'none' }}>Lưu</button>
        </form>
        <div style={{ marginTop: '10px', textAlign: 'left' }}>
          {logs.map(log => <div key={log.id}>• {log.time}: {log.text}</div>)}
        </div>
      </div>
    </div>
  );
}