import React, { useState } from 'react';
import { Terminal, Users, Code2, MessageSquareHeart, Gamepad2, Volume2, VolumeX, Music, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime, toggleBgm, toggleSfx } from '../utils/audio';

export default function Header({ activeTab, setActiveTab }) {
  const [bgmActive, setBgmActive] = useState(false);
  const [sfxActive, setSfxActive] = useState(true);

  const handleToggleBgm = () => {
    const nextState = !bgmActive;
    setBgmActive(nextState);
    toggleBgm(nextState);
  };

  const handleToggleSfx = () => {
    const isEnabled = toggleSfx();
    setSfxActive(isEnabled);
  };

  const handleTriggerCelebrate = () => {
    playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#3b82f6', '#60a5fa', '#f43f5e', '#fbbf24', '#10b981']
    });
  };

  const navItems = [
    { id: 'terminal', label: 'Terminal Tri Ân', icon: Terminal },
    { id: 'mentors', label: 'Mentor & Giảng Viên', icon: Users },
    { id: 'code-wishes', label: 'Trình Tạo Code & Thiệp', icon: Code2 },
    { id: 'wall', label: 'Bức Tường Kỷ Niệm', icon: MessageSquareHeart },
    { id: 'game', label: 'Mini Game Hứng Hoa', icon: Gamepad2 }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('terminal')}>
            <div className="relative group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                <span className="font-mono font-black text-xl text-white tracking-tighter">CG</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-slate-950 animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-slate-950"></div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                  CHẠM PHÍM TRI ÂN
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                  CodeGym 20/11
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block font-mono">
                &lt;Gratitude writtenInCode={'{true}'} /&gt;
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/70">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 glow-blue'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Audio Controls & Action Button */}
          <div className="flex items-center space-x-2.5">
            {/* SFX Toggle */}
            <button
              onClick={handleToggleSfx}
              title={sfxActive ? "Âm thanh phím cơ: Đang bật" : "Âm thanh phím cơ: Đang tắt"}
              className={`p-2 rounded-xl border transition-colors ${
                sfxActive 
                  ? 'bg-slate-900 border-blue-500/40 text-blue-400 hover:bg-slate-800' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
              }`}
            >
              {sfxActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* BGM Toggle */}
            <button
              onClick={handleToggleBgm}
              title={bgmActive ? "Nhạc Lo-fi chill: Đang bật" : "Bật nhạc nền Lo-fi chill"}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                bgmActive
                  ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300 shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${bgmActive ? 'animate-bounce text-indigo-400' : ''}`} />
              <span className="text-xs font-mono hidden sm:inline">Lo-fi</span>
              {bgmActive && (
                <span className="flex space-x-0.5 items-end h-3">
                  <span className="w-0.5 h-3 bg-indigo-400 animate-pulse"></span>
                  <span className="w-0.5 h-1.5 bg-indigo-400 animate-pulse delay-75"></span>
                  <span className="w-0.5 h-2.5 bg-indigo-400 animate-pulse delay-150"></span>
                </span>
              )}
            </button>

            {/* Quick Celebrate Button */}
            <button
              onClick={handleTriggerCelebrate}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium text-xs shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700 hover:scale-105 active:scale-95 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span className="hidden sm:inline">Bắn Pháo Hoa 20/11</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-1.5 scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
