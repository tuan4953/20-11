import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Trophy, RotateCcw, Play, Heart, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCatchSound, playSuccessChime } from '../utils/audio';

const ITEM_TYPES = [
  { type: 'flower', icon: '🌹', points: 20, label: 'Hoa 20/11' },
  { type: 'coffee', icon: '☕', points: 15, label: 'Cà phê Mentor' },
  { type: 'heart', icon: '❤️', points: 25, label: 'Tim Yêu Thương' },
  { type: 'bug', icon: '🐛', points: -15, label: 'Bug phát sinh' }
];

export default function MiniGame() {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(0);
  const [playerX, setPlayerX] = useState(50); // percentage 0-100%

  const gameAreaRef = useRef(null);
  const [items, setItems] = useState([]);
  const requestRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const playerXRef = useRef(50);

  // Sync refs
  useEffect(() => {
    scoreRef.current = score;
    comboRef.current = combo;
    playerXRef.current = playerX;
  }, [score, combo, playerX]);

  // Handle keyboard arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPlayerX(prev => Math.max(8, prev - 7));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPlayerX(prev => Math.min(92, prev + 7));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Handle mouse / touch move
  const handleMouseMove = (e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(8, Math.min(92, x)));
  };

  const handleTouchMove = (e) => {
    if (gameState !== 'playing' || !gameAreaRef.current || !e.touches[0]) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(8, Math.min(92, x)));
  };

  // Start game
  const startGame = () => {
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setItems([]);
    setGameState('playing');
    lastSpawnTime.current = Date.now();
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('gameover');
          playSuccessChime();
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 }
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Main Game Loop for item dropping and collision detection
  useEffect(() => {
    if (gameState !== 'playing') return;

    let animId;

    const updatePhysics = () => {
      const now = Date.now();

      // Spawn item every 650ms
      if (now - lastSpawnTime.current > 650) {
        lastSpawnTime.current = now;
        const randType = Math.random() < 0.25 ? ITEM_TYPES[3] : ITEM_TYPES[Math.floor(Math.random() * 3)];
        const newItem = {
          id: `item-${now}-${Math.random()}`,
          ...randType,
          x: Math.random() * 80 + 10, // 10% to 90%
          y: 0,
          speed: 1.2 + Math.random() * 0.8
        };
        setItems(prev => [...prev, newItem]);
      }

      // Update positions and check collisions
      setItems(prevItems => {
        const nextItems = [];
        const currentP = playerXRef.current;

        for (let item of prevItems) {
          const nextY = item.y + item.speed;

          // Check if item hit catcher at bottom (y between 82% and 92%)
          if (nextY >= 82 && nextY <= 92 && Math.abs(item.x - currentP) < 12) {
            // Collision caught!
            if (item.type === 'bug') {
              playCatchSound(true);
              setCombo(0);
              setScore(s => Math.max(0, s + item.points));
            } else {
              playCatchSound(false);
              const nextCombo = comboRef.current + 1;
              setCombo(nextCombo);
              const bonus = nextCombo >= 3 ? 5 : 0;
              setScore(s => s + item.points + bonus);
            }
            continue; // Item collected, remove from screen
          }

          // Keep items that haven't reached the bottom yet
          if (nextY < 98) {
            nextItems.push({ ...item, y: nextY });
          }
        }
        return nextItems;
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  return (
    <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono mb-3">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>MINI-GAME CODER 20/11</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Hứng Hoa &amp; Quà Tri Ân Thầy Cô
        </h2>
        <p className="mt-1 text-slate-400 text-xs sm:text-sm">
          Điều khiển laptop hứng hoa 🌹, cafe ☕ và tim ❤️ gửi tặng Mentor. Hãy né lũ bọ 🐛 để giữ combo điểm cao nhé!
        </p>
      </div>

      {/* Game Frame */}
      <div className="relative rounded-2xl bg-slate-900 border-2 border-slate-800 shadow-2xl overflow-hidden">
        {/* Scoreboard Bar */}
        <div className="bg-slate-950/90 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs sm:text-sm font-mono">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-slate-500">ĐIỂM:</span>{' '}
              <span className="text-emerald-400 font-bold text-base sm:text-lg">{score}</span>
            </div>
            {combo >= 2 && (
              <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs animate-bounce">
                COMBO x{combo}!
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <span className="text-slate-500">THỜI GIAN:</span>{' '}
              <span className={`font-bold text-base sm:text-lg ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-blue-400'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Playfield Canvas area */}
        <div
          ref={gameAreaRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[400px] sm:h-[460px] bg-slate-950 select-none overflow-hidden cursor-crosshair bg-grid-pattern"
        >
          {/* Falling Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute text-2xl sm:text-3xl transition-transform pointer-events-none drop-shadow-md select-none -translate-x-1/2"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.icon}
            </div>
          ))}

          {/* Player Catcher (Laptop Tray) */}
          <div
            className="absolute bottom-4 -translate-x-1/2 transition-transform duration-75 pointer-events-none"
            style={{ left: `${playerX}%` }}
          >
            <div className="w-20 sm:w-24 h-11 rounded-xl bg-gradient-to-t from-blue-700 via-indigo-600 to-sky-400 border-2 border-white/40 shadow-xl flex items-center justify-center text-white glow-blue">
              <span className="text-xs font-mono font-bold tracking-tight">💻 CODEGYM</span>
            </div>
            <div className="w-12 h-1.5 bg-blue-400/50 rounded-full mx-auto mt-1 blur-xs"></div>
          </div>

          {/* Idle Start Overlay */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-3xl mb-4 animate-float">
                🌹
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thử Thách Tri Ân 20/11</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-6">
                Di chuyển chuột hoặc phím mũi tên [←] [→] để gom hoa và cà phê gửi Thầy Cô trong 30 giây!
              </p>
              <button
                onClick={startGame}
                className="flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Bắt Đầu Chơi Ngay!</span>
              </button>
            </div>
          )}

          {/* Game Over / Certificate Overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl mb-3">
                🏆
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono mb-2">
                CHỨNG NHẬN CODER TRI ÂN 20/11
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Chúc Mừng Bạn!
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mb-4">
                Bạn đã gom được{' '}
                <span className="text-emerald-400 font-bold text-lg font-mono">{score}</span> điểm quà tặng và gửi trọn lòng tri ân tới các Thầy/Cô CodeGym!
              </p>

              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi Lại Lần Nữa</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-3">
            <span>🌹 = +20đ</span>
            <span>☕ = +15đ</span>
            <span>❤️ = +25đ</span>
            <span className="text-rose-400">🐛 = -15đ</span>
          </div>
          <div className="hidden sm:block font-mono text-[11px]">
            Điều khiển: Kéo chuột / Chạm tay / Phím mũi tên [←] [→]
          </div>
        </div>
      </div>
    </section>
  );
}
