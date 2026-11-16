import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Code, Award, Heart, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../utils/audio';

export default function HeroSection({ onStartTerminal, onExploreCards }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Khi lòng biết ơn được viết bằng những dòng code...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const triggerHeroConfetti = () => {
    playSuccessChime();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Badges */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-blue-500/10 animate-soft-pulse">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold">CUỘC THI: CHẠM PHÍM TRI ÂN 20/11</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400 flex items-center space-x-1">
            <span>CodeGym Community</span>
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-5xl mx-auto leading-tight sm:leading-none">
          Chạm Phím Tri Ân
          <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">
            Nơi Code Hoá Lời Tri Ân
          </span>
        </h1>

        {/* Dynamic Typewriter text */}
        <div className="h-8 mb-8 flex items-center justify-center font-mono text-base sm:text-xl text-slate-300">
          <span className="text-blue-400 mr-2">&gt;</span>
          <span>{displayText}</span>
          <span className="w-2.5 h-5 bg-blue-400 ml-1.5 animate-pulse inline-block"></span>
        </div>

        {/* Emotional Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10">
          20/11 này, thay vì những bó hoa sớm tàn hay lời chúc sao chép, học viên CodeGym dùng chính 
          <span className="text-blue-400 font-semibold"> logic, thuật toán, đêm trắng debug</span> và 
          <span className="text-rose-400 font-semibold"> lòng biết ơn chân thành</span> để gửi tới các Giảng viên &amp; Mentor – những người đã thắp sáng ngọn lửa lập trình từ con số 0.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartTerminal}
            className="flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 glow-blue"
          >
            <Terminal className="w-4 h-4" />
            <span>Mở Dev Terminal Tri Ân</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreCards}
            className="flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 border border-slate-700 font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:border-slate-600 backdrop-blur-sm"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Vinh Danh Giảng Viên &amp; Mentor</span>
          </button>

          <button
            onClick={triggerHeroConfetti}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium text-sm transition-all duration-200 hover:scale-105"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />
            <span>Gửi Hoa 20/11</span>
          </button>
        </div>

        {/* Highlight Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">STATUS</span>
              <Cpu className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
              999,999+
            </div>
            <div className="text-xs text-slate-400">
              Bugs &amp; Lỗi cú pháp được gỡ tận tâm
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left group hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">COMMITMENT</span>
              <ShieldCheck className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
              100%
            </div>
            <div className="text-xs text-slate-400">
              Tâm huyết đồng hành mọi bài giảng
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left group hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">CODEGYM SPIRIT</span>
              <Code className="w-4 h-4 text-amber-400 group-hover:-rotate-12 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
              Từ Số 0
            </div>
            <div className="text-xs text-slate-400">
              Đến lập trình viên thực chiến tự tin
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left group hover:border-rose-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">GRATITUDE</span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 group-hover:scale-125 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-rose-400 mb-1">
              &infin; Infinity
            </div>
            <div className="text-xs text-slate-400">
              Lòng biết ơn Thầy Cô không bao giờ out of memory
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
