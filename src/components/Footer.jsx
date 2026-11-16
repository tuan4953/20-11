import React from 'react';
import { Heart, Code2, Terminal, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../utils/audio';

export default function Footer({ onNavClick }) {
  const triggerConfetti = () => {
    playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.9 }
    });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-lg shadow-md shadow-blue-500/20">
                CG
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                CHẠM PHÍM TRI ÂN 20/11
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md mb-4">
              Dự án tham dự cuộc thi 20/11 của toàn thể học viên CodeGym. Nơi những dòng code, thuật toán và sự sáng tạo hòa cùng lòng biết ơn sâu sắc gửi tới các Giảng viên &amp; Mentor.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CodeGym Bootcamp Vietnam - Dedicated to all Mentors</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              Điều Hướng Nhanh
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => onNavClick('terminal')} className="hover:text-blue-400 transition-colors">
                  &gt; Terminal Tri Ân
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('mentors')} className="hover:text-blue-400 transition-colors">
                  &gt; Danh Sách Mentor
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('code-wishes')} className="hover:text-blue-400 transition-colors">
                  &gt; Trình Tạo Code &amp; Thiệp
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('wall')} className="hover:text-blue-400 transition-colors">
                  &gt; Bức Tường Kỷ Niệm
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('game')} className="hover:text-blue-400 transition-colors">
                  &gt; Mini-Game Hứng Hoa
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coder Wish */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              Thông Điệp 20/11
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 italic mb-3">
              "Trong mọi hoàn cảnh, Clean Code bắt đầu từ cái tâm, và sự nghiệp Dev bắt đầu từ sự tận tụy của Thầy Cô!"
            </div>
            <button
              onClick={triggerConfetti}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium border border-rose-500/30 transition-all active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Gửi trọn lòng biết ơn</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1 mb-2 sm:mb-0">
            <span>Viết bằng</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline mx-0.5" />
            <span>và niềm tự hào là học viên CodeGym &bull; 20/11/2026</span>
          </div>

          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span>React 19</span>
            <span>&bull;</span>
            <span>Tailwind CSS</span>
            <span>&bull;</span>
            <span>Web Audio API</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
