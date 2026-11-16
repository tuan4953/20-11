import React, { useState, useRef } from 'react';
import { Code2, Copy, Check, Download, Sparkles, RefreshCw, Eye, Palette, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CODE_WISHES } from '../data/codeWishes';
import { playKeyClick, playSuccessChime } from '../utils/audio';

export default function CodeWishGenerator() {
  const [selectedLangId, setSelectedLangId] = useState('javascript');
  const [copied, setCopied] = useState(false);
  
  // Custom e-card configuration state
  const [recipient, setRecipient] = useState('Thầy Cô & Mentor CodeGym');
  const [sender, setSender] = useState('Học viên Lớp C0824G1');
  const [customNote, setCustomNote] = useState('');
  const [cardTheme, setCardTheme] = useState('blue'); // 'blue' | 'purple' | 'emerald' | 'rose'
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef(null);

  const currentWish = CODE_WISHES.find(w => w.id === selectedLangId) || CODE_WISHES[0];
  const activeMessage = customNote || currentWish.shortMessage;

  const handleCopyCode = () => {
    playKeyClick('enter');
    navigator.clipboard.writeText(currentWish.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate and download High-DPI Canvas Card
  const handleDownloadCard = () => {
    playSuccessChime();
    setIsExporting(true);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 }
    });

    const canvas = document.createElement('canvas');
    const scale = 2; // Retina resolution
    const width = 800;
    const height = 500;

    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // Background themes
    const themes = {
      blue: {
        bg1: '#030712',
        bg2: '#0f172a',
        accent1: '#3b82f6',
        accent2: '#6366f1',
        textMain: '#f8fafc',
        textSub: '#94a3b8'
      },
      purple: {
        bg1: '#090514',
        bg2: '#1e1035',
        accent1: '#a855f7',
        accent2: '#ec4899',
        textMain: '#faf5ff',
        textSub: '#d8b4fe'
      },
      emerald: {
        bg1: '#02120b',
        bg2: '#062d1d',
        accent1: '#10b981',
        accent2: '#14b8a6',
        textMain: '#f0fdf4',
        textSub: '#86efac'
      },
      rose: {
        bg1: '#140508',
        bg2: '#2c0d16',
        accent1: '#f43f5e',
        accent2: '#fb7185',
        textMain: '#fff1f2',
        textSub: '#fecdd3'
      }
    };

    const t = themes[cardTheme] || themes.blue;

    // Draw card background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, t.bg1);
    bgGrad.addColorStop(1, t.bg2);
    ctx.fillStyle = bgGrad;
    ctx.roundRect(0, 0, width, height, 20);
    ctx.fill();

    // Border glow
    ctx.lineWidth = 3;
    const borderGrad = ctx.createLinearGradient(0, 0, width, height);
    borderGrad.addColorStop(0, t.accent1);
    borderGrad.addColorStop(1, t.accent2);
    ctx.strokeStyle = borderGrad;
    ctx.roundRect(0, 0, width, height, 20);
    ctx.stroke();

    // Decorative grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 30; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 30; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Top Header: CodeGym Tag & Event
    ctx.fillStyle = t.accent1;
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillText('CODEGYM VIETNAM // 20/11 TEACHER APPRECIATION', 45, 50);

    // Decorative Emblem
    ctx.fillStyle = t.accent2;
    ctx.beginPath();
    ctx.arc(width - 55, 50, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CG', width - 55, 55);
    ctx.textAlign = 'left';

    // Main Greeting Header
    ctx.fillStyle = t.textMain;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('CHẠM PHÍM TRI ÂN 20/11', 45, 95);

    // "Kính gửi" line
    ctx.font = '14px sans-serif';
    ctx.fillStyle = t.textSub;
    ctx.fillText('Kính gửi:', 45, 135);

    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = t.accent1;
    ctx.fillText(recipient, 120, 135);

    // Message Box Container
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.roundRect(45, 160, width - 90, 210, 12);
    ctx.fill();
    ctx.stroke();

    // Code badge inside message box
    ctx.fillStyle = t.accent2;
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillText(`// Syntax: ${currentWish.name} | file: ${currentWish.filename}`, 65, 190);

    // Wrapped Message Text
    ctx.fillStyle = t.textMain;
    ctx.font = '16px sans-serif';
    const maxWidth = width - 130;
    const words = activeMessage.split(' ');
    let line = '';
    let y = 225;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 65, y);
        line = words[n] + ' ';
        y += 28;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 65, y);

    // Footer Info
    ctx.font = '13px sans-serif';
    ctx.fillStyle = t.textSub;
    ctx.fillText('Người gửi:', 45, 415);

    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = t.textMain;
    ctx.fillText(sender, 125, 415);

    ctx.font = 'italic 12px sans-serif';
    ctx.fillStyle = t.textSub;
    ctx.textAlign = 'right';
    ctx.fillText('Tri ân từ trái tim những người Coder | CodeGym 2026', width - 45, 415);

    // Convert canvas to image and trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `thiep-tri-an-20-11-${recipient.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();

    setTimeout(() => setIsExporting(false), 500);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono mb-3">
          <Code2 className="w-3.5 h-3.5" />
          <span>MULTI-LANGUAGE GRATITUDE SNIPPETS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Trình Tạo Lời Chúc Chuẩn Dev &amp; Xuất Thiệp 20/11
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Mỗi ngôn ngữ mang một vẻ đẹp riêng, nhưng đều chung một thông điệp: Biết ơn Thầy Cô đã soi sáng con đường công nghệ!
        </p>
      </div>

      {/* Language Selector Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CODE_WISHES.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playKeyClick('default');
              setSelectedLangId(item.id);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedLangId === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 glow-blue scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Grid: Left = Code Viewer, Right = E-Card Customizer & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Code Previewer (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Header Bar */}
          <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{currentWish.icon}</span>
              <span className="text-slate-300 font-semibold">{currentWish.filename}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-blue-400 border border-slate-700">
                {currentWish.badge}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sao chép code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 sm:p-6 overflow-x-auto max-h-[500px] leading-relaxed bg-[#0b0f19]">
            <pre className="text-slate-200 whitespace-pre">
              <code>{currentWish.code}</code>
            </pre>
          </div>

          {/* Meaning interpretation */}
          <div className="bg-slate-950/90 p-4 border-t border-slate-800/80 font-sans text-xs sm:text-sm text-slate-300 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Ý nghĩa thông điệp: </strong>
              <span>{currentWish.shortMessage}</span>
            </div>
          </div>
        </div>

        {/* Right Column: E-Card Customizer & High-DPI Downloader (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-6 shadow-xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Thiết Kế &amp; Xuất Thiệp Điện Tử 20/11</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Tùy biến thông tin người nhận, người gửi và tải ảnh thiệp chất lượng cao để gửi tặng Thầy Cô qua Zalo/Facebook/Teams ngay!
            </p>

            {/* Customization Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Kính gửi Thầy/Cô:
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Ví dụ: Cô Lý Diệu Hoa, Thầy Cấn Tuấn Anh & Ban Giảng Viên CodeGym"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Người gửi (Tên bạn hoặc Lớp):
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Ví dụ: Lớp C0824G1 / Nguyễn Văn A"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Thông điệp tri ân (để trống sẽ dùng mặc định theo ngôn ngữ):
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder={currentWish.shortMessage}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-blue-500 outline-none resize-none"
                />
              </div>

              {/* Theme color selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-400" />
                  <span>Chọn tông màu thiệp:</span>
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'blue', label: 'Cyber Blue', bg: 'bg-blue-600' },
                    { id: 'purple', label: 'Midnight Violet', bg: 'bg-purple-600' },
                    { id: 'emerald', label: 'Matrix Emerald', bg: 'bg-emerald-600' },
                    { id: 'rose', label: 'Warm Rose', bg: 'bg-rose-600' }
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setCardTheme(theme.id)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-all ${
                        cardTheme === theme.id
                          ? 'border-white text-white font-bold shadow-md'
                          : 'border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <span className={`w-2.5 h-2.5 rounded-full ${theme.bg}`}></span>
                        <span className="hidden sm:inline">{theme.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Visual Card Mini-Preview */}
            <div className={`p-5 rounded-2xl border transition-all mb-6 relative overflow-hidden ${
              cardTheme === 'blue' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-blue-500/40 glow-blue' :
              cardTheme === 'purple' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 border-purple-500/40' :
              cardTheme === 'emerald' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border-emerald-500/40 glow-emerald' :
              'bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 border-rose-500/40 glow-rose'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-mono text-blue-400 mb-2">
                <span>CODEGYM // 20/11</span>
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
              </div>
              <div className="text-base font-bold text-white mb-1">
                Kính gửi: {recipient}
              </div>
              <p className="text-xs text-slate-300 italic mb-4 line-clamp-3">
                "{activeMessage}"
              </p>
              <div className="text-[11px] text-slate-400 flex justify-between items-center border-t border-white/10 pt-2">
                <span>Từ: <strong>{sender}</strong></span>
                <span className="font-mono text-[10px] text-blue-300">#CodeGym2011</span>
              </div>
            </div>

            {/* Export Card Button */}
            <button
              onClick={handleDownloadCard}
              disabled={isExporting}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:from-blue-500 hover:to-rose-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Đang xuất ảnh...' : 'Tải Thiệp Tri Ân 20/11 (PNG 2X)'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
