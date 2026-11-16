import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Check, CornerDownLeft, Play, Copy, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playKeyClick, playSuccessChime } from '../utils/audio';

const COMMANDS_LIST = [
  { cmd: 'help', desc: 'Hiển thị danh sách tất cả câu lệnh tri ân' },
  { cmd: 'git log --gratitude', desc: 'Xem commit history hành trình học viên từ số 0' },
  { cmd: 'compile gratitude', desc: 'Biên dịch gói tri ân 20/11 với 0 lỗi & 100% tình cảm' },
  { cmd: 'sudo thank --all', desc: 'Kích hoạt pháo hoa tri ân toàn bộ Giảng viên & Mentor' },
  { cmd: 'cat letter.txt', desc: 'Đọc bức tâm thư của học viên CodeGym gửi Thầy Cô' },
  { cmd: 'skills --unlocked', desc: 'Xem các kỹ năng vô giá mà Thầy Cô đã trao tặng' },
  { cmd: 'clear', desc: 'Xóa sạch màn hình terminal' }
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `[SYSTEM] CodeGym Gratitude Terminal Kernel v20.11 initialized.\n[SYSTEM] Welcome to "Chạm Phím Tri Ân" - Lòng biết ơn được viết bằng code!\n[TIP] Gõ 'help' hoặc click vào các câu lệnh gợi ý bên dưới để khám phá.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isCompiling, setIsCompiling] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isCompiling]);

  const handleInputChange = (e) => {
    playKeyClick('default');
    setInputVal(e.target.value);
  };

  const executeCommand = (rawCommand) => {
    const cmd = rawCommand.trim().toLowerCase();
    playKeyClick('enter');

    if (!cmd) return;

    // Append user input to history
    const newHistory = [...history, { type: 'user', text: `student@codegym:~$ ${rawCommand}` }];

    // Save to command history for arrow navigation
    setCmdHistory(prev => [...prev, rawCommand]);
    setHistoryIndex(-1);
    setInputVal('');

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'help') {
      newHistory.push({
        type: 'output',
        text: `\nDanh sách các lệnh hỗ trợ trong Terminal Tri Ân:\n\n` +
          COMMANDS_LIST.map(c => `  ${c.cmd.padEnd(24)} : ${c.desc}`).join('\n') +
          `\n\nVí dụ: Gõ 'git log --gratitude' hoặc 'compile gratitude' để bắt đầu!`
      });
      setHistory(newHistory);
      return;
    }

    if (cmd === 'git log --gratitude' || cmd === 'git log') {
      newHistory.push({
        type: 'git',
        text: `\n* commit 8a9f201 (HEAD -> main, tag: v20.11-graduation)
| Author: Học viên CodeGym <future.dev@codegym.vn>
| Date:   20/11/2026 - Tốt nghiệp & Chạm tới ước mơ
|     feat: Tự tin bước vào doanh nghiệp với hành trang kiến thức vững vàng!
|     Biết ơn Thầy/Cô đã dìu dắt từ những dòng 'Hello World' bỡ ngỡ.
|
* commit 4c7b892
| Author: Mentor CodeGym <mentor.lead@codegym.vn>
| Date:   Đêm muộn chạy Capstone Project
|     fix: Debug xuyên đêm cùng team, tối ưu Clean Architecture
|     "Code chạy được chưa đủ, phải clean code và đúng chuẩn SOLID nha em!"
|
* commit 2d1e564
| Author: Học viên CodeGym <future.dev@codegym.vn>
| Date:   Sprint 2 - Khủng hoảng Git Conflict đầu đời
|     fix: Thầy Cấn Tuấn Anh ra tay gỡ 30 merge conflicts trong 15 phút, cứu cả team!
|
* commit 1a0b349
| Author: Học viên CodeGym <future.dev@codegym.vn>
| Date:   Ngày 1 tại CodeGym - Bước khởi đầu
|     init: Gõ print("Hello World!"), đặt niềm tin vào Thầy Cô và bản thân.`
      });
      setHistory(newHistory);
      return;
    }

    if (cmd === 'compile gratitude' || cmd === 'build' || cmd === 'npm run build') {
      setIsCompiling(true);
      newHistory.push({
        type: 'compile',
        text: `>>> Đang biên dịch gói tri ân: gratitude-bundle-20.11.cg ...\n[1/4] Scanning mentor patience... [100% OK]\n[2/4] Resolving late-night debugging commits... [4,280 bugs resolved]\n[3/4] Injecting gratitude into heart binary... [Done]\n[4/4] Running Clean Code static analysis... [0 errors, 0 warnings]`
      });
      setHistory(newHistory);

      setTimeout(() => {
        setIsCompiling(false);
        playSuccessChime();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        setHistory(prev => [
          ...prev,
          {
            type: 'success',
            text: `\n🎉 [BUILD SUCCESS] 100% COMPILED WITH LOVE!\n\n` +
                  `============================================================\n` +
                  `  KẾT QUẢ BIÊN DỊCH TRI ÂN 20/11:\n` +
                  `  - Targets: Toàn thể Giảng viên & Mentor CodeGym\n` +
                  `  - Build Status: 200 OK - PERMANENT IN HEART\n` +
                  `  - Bugs: 0 | Warnings: 0 | Gratitude: INFINITY\n` +
                  `  - Message: "Cảm ơn Thầy Cô đã biến những ước mơ thành hiện thực!"\n` +
                  `============================================================`
          }
        ]);
      }, 1200);
      return;
    }

    if (cmd.startsWith('sudo thank')) {
      playSuccessChime();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#3b82f6', '#ec4899', '#f59e0b', '#10b981']
      });

      newHistory.push({
        type: 'success',
        text: `\n[SUDO GRANTED - SUPERUSER PRIVILEGE] 💙\n` +
              `============================================================\n` +
              `  GỬI LỜI TRI ÂN VÔ ĐIỀU KIỆN TỚI TOÀN THỂ THẦY CÔ & MENTOR!\n` +
              `  Chúc các Thầy/Cô:\n` +
              `  + CPU luôn mát mẻ, sức khỏe tràn đầy\n` +
              `  + Băng thông hạnh phúc luôn đạt max throughput\n` +
              `  + Cuộc sống luôn 0 runtime exception, gia đình an khang thịnh vượng\n` +
              `  + Mãi là ngọn hải đăng soi sáng cho bao thế hệ học viên CodeGym!\n` +
              `============================================================`
      });
      setHistory(newHistory);
      return;
    }

    if (cmd === 'cat letter.txt' || cmd === 'cat letter') {
      newHistory.push({
        type: 'letter',
        text: `\n📜 [BỨC TÂM THƯ: KHI LÒNG BIẾT ƠN ĐƯỢC VIẾT BẰNG CODE]\n\n` +
              `Kính gửi các Thầy Cô và các Anh/Chị Mentor tại CodeGym,\n\n` +
              `Nhiều người nói học lập trình là khô khan, chỉ toàn số 0 và số 1, ` +
              `chỉ toàn cú pháp chặt chẽ và những màn hình đen kịt dòng lệnh.\n` +
              `Nhưng với học viên CodeGym chúng em, lập trình là một hành trình đầy ắp cảm xúc.\n\n` +
              `Đó là sự ân cần của Thầy khi kiên nhẫn giảng đi giảng lại về vòng lặp và mảng;\n` +
              `Đó là chiếc tin nhắn 'Cứ bình tĩnh, anh vào gỡ cùng em' lúc quá nửa đêm;\n` +
              `Đó là nụ cười tự hào của Cô khi thấy sản phẩm Capstone đầu đời của học trò chạy mượt mà.\n\n` +
              `Thầy Cô không chỉ dạy chúng em viết code để kiếm sống,\n` +
              `mà Thầy Cô dạy chúng em tinh thần tự học, lòng kiên trì trước thất bại,\n` +
              `và sự tử tế của một người làm nghề kỹ thuật.\n\n` +
              `Nhân ngày 20/11, từ tận đáy lòng, chúng em xin kính chúc Thầy Cô luôn dồi dào sức khỏe,\n` +
              `luôn giữ vững ngọn lửa nhiệt huyết để tiếp tục chắp cánh cho bao ước mơ lập trình!\n\n` +
              `-- Toàn thể Học viên CodeGym kính tặng --`
      });
      setHistory(newHistory);
      return;
    }

    if (cmd === 'skills --unlocked' || cmd === 'skills') {
      newHistory.push({
        type: 'output',
        text: `\n✨ [SKILLS UNLOCKED FROM CODEGYM MENTORS]\n` +
              `------------------------------------------------------------\n` +
              `[✓] Logical Thinking    : Từ hoang mang -> Tư duy logic rành mạch\n` +
              `[✓] Bug Resilience      : Không sợ bug, coi bug là bài học quý\n` +
              `[✓] Clean Architecture  : Viết code cho người đọc, không chỉ cho máy\n` +
              `[✓] Git & Teamwork      : Phối hợp nhịp nhàng, tôn trọng đồng đội\n` +
              `[✓] Continuous Learning : Kỹ năng tự học suốt đời của một Dev thực thụ\n` +
              `------------------------------------------------------------\n` +
              `Tất cả đều bắt nguồn từ sự tận tâm của Thầy Cô!`
      });
      setHistory(newHistory);
      return;
    }

    // Default unknown command
    newHistory.push({
      type: 'error',
      text: `Lệnh không hợp lệ: '${rawCommand}'. Gõ 'help' để xem danh sách câu lệnh tri ân.`
    });
    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* Outer Glow Wrapper */}
      <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/30 via-slate-800/50 to-slate-900/80 shadow-2xl glow-blue">
        
        {/* Terminal Window Container */}
        <div className="bg-slate-950/95 rounded-[14px] overflow-hidden border border-slate-800/90 font-mono text-sm shadow-inner">
          
          {/* Terminal Title Bar */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer transition-colors"></div>
              <span className="ml-2 text-xs text-slate-400 font-medium flex items-center space-x-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>codegym-bash — 20/11-gratitude</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <span className="hidden sm:inline">UTF-8</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px]">
                LIVE TERMINAL
              </span>
            </div>
          </div>

          {/* Terminal Content Screen */}
          <div 
            className="p-4 sm:p-6 min-h-[360px] max-h-[520px] overflow-y-auto space-y-3 leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, index) => {
              if (item.type === 'system') {
                return (
                  <div key={index} className="text-slate-400 whitespace-pre-wrap border-l-2 border-blue-500/60 pl-3 py-1 bg-blue-500/5 rounded-r">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'user') {
                return (
                  <div key={index} className="text-emerald-400 font-semibold flex items-center space-x-2">
                    <span>{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'git') {
                return (
                  <div key={index} className="text-amber-300/90 whitespace-pre-wrap bg-amber-950/20 p-3 rounded-xl border border-amber-500/20 text-xs sm:text-sm">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'letter') {
                return (
                  <div key={index} className="text-blue-200 whitespace-pre-wrap bg-blue-950/30 p-4 rounded-xl border border-blue-500/30 font-sans italic text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'success') {
                return (
                  <div key={index} className="text-sky-300 whitespace-pre-wrap bg-sky-950/40 p-4 rounded-xl border border-sky-500/40 font-bold glow-blue">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'error') {
                return (
                  <div key={index} className="text-rose-400 whitespace-pre-wrap">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={index} className="text-slate-300 whitespace-pre-wrap">
                  {item.text}
                </div>
              );
            })}

            {isCompiling && (
              <div className="flex items-center space-x-2 text-blue-400 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Biên dịch tình cảm học viên... Xin chờ trong giây lát...</span>
              </div>
            )}

            {/* Live Command Prompt */}
            <div className="flex items-center space-x-2 pt-2">
              <span className="text-blue-400 font-semibold select-none">student@codegym:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Gõ lệnh (hoặc ấn 'help' / click gợi ý bên dưới)..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-slate-600 focus:ring-0 text-sm"
                autoFocus
              />
              <button
                onClick={() => executeCommand(inputVal)}
                className="p-1 text-slate-400 hover:text-white"
                title="Thực thi lệnh"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </div>

            <div ref={terminalEndRef} />
          </div>

          {/* Quick-Click Command Bar for instant gratification */}
          <div className="bg-slate-900/70 p-3 sm:p-4 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 mb-2 flex items-center space-x-1 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gợi ý lệnh nhanh (Bấm để gõ và chạy ngay):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {COMMANDS_LIST.map((c) => (
                <button
                  key={c.cmd}
                  onClick={() => {
                    setInputVal(c.cmd);
                    executeCommand(c.cmd);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 text-xs font-mono border border-slate-700/80 transition-all flex items-center space-x-1.5 active:scale-95"
                >
                  <Play className="w-2.5 h-2.5 text-blue-400 group-hover:text-white" />
                  <span>{c.cmd}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
