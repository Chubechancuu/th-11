import React, { useState, useEffect } from 'react';
import { Timer, BookOpen, Scale, ClipboardList, CheckCircle } from 'lucide-react';

export default function EduLedgerPro() {
  const [seconds, setSeconds] = useState(1500); // 25 phút
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState('');
  const [logs, setLogs] = useState<{id: number, text: string, time: string}[]>([]);

  // Đếm ngược Pomodoro
  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      alert("Hết giờ học! Nghỉ xả hơi chút nhé.");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setSeconds(1500); setIsActive(false); };
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const addLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    const newLog = { id: Date.now(), text: task, time: new Date().toLocaleTimeString() };
    setLogs([newLog, ...logs]);
    setTask('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
        <h1>EduLedger Pro 🚀</h1>
        <p>Accounting & Law Study Assistant</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Cột 1: Pomodoro & Study */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Timer color="#e74c3c" /> Tập trung cao độ</h2>
          <div style={{ fontSize: '4rem', textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>{formatTime(seconds)}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={toggleTimer} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: isActive ? '#f39c12' : '#27ae60', color: '#fff', cursor: 'pointer' }}>
              {isActive ? 'Tạm dừng' : 'Bắt đầu'}
            </button>
            <button onClick={resetTimer} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#95a5a6', color: '#fff', cursor: 'pointer' }}>Đặt lại</button>
          </div>
        </div>

        {/* Cột 2: Nhật ký học tập */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><BookOpen color="#3498db" /> Nhật ký nghiên cứu</h2>
          <form onSubmit={addLog} style={{ display: 'flex', gap: '5px' }}>
            <input 
              value={
