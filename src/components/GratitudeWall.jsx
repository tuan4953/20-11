import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, Sparkles, Filter, Plus, Calendar, Tag, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_WALL_MESSAGES } from '../data/codeWishes';
import { playKeyClick, playSuccessChime } from '../utils/audio';

const STORAGE_KEY = 'codegym_2011_wall_messages';

const STICKERS = ['💙', '☕', '🚀', '💻', '🐛', '🎓', '🌟', '🔥'];
const TAGS = ['Tất cả', 'Lời cảm ơn', 'Kỷ niệm thức khuya', 'Chuyện vui phòng lab', 'Lời hứa vượt môn'];

export default function GratitudeWall() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_WALL_MESSAGES;
  });

  const [activeTag, setActiveTag] = useState('Tất cả');
  const [authorName, setAuthorName] = useState('');
  const [batch, setBatch] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Lời cảm ơn');
  const [selectedSticker, setSelectedSticker] = useState('💙');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  const handleLike = (id) => {
    playKeyClick('default');
    setMessages(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
  };

  const handlePostMessage = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);
    playSuccessChime();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    const newMsg = {
      id: `msg-${Date.now()}`,
      author: authorName.trim(),
      batch: batch.trim() || 'Học viên CodeGym',
      avatar: '👨‍💻',
      tag: selectedTag,
      badgeColor: selectedTag === 'Lời cảm ơn' 
        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
        : selectedTag === 'Kỷ niệm thức khuya'
        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
        : 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      content: content.trim(),
      likes: 1,
      date: dateStr,
      sticker: selectedSticker
    };

    setMessages([newMsg, ...messages]);
    setAuthorName('');
    setBatch('');
    setContent('');
    setIsSubmitting(false);
  };

  const filteredMessages = activeTag === 'Tất cả' 
    ? messages 
    : messages.filter(m => m.tag === activeTag);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono mb-3">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>LƯU GIỮ KỶ NIỆM THẦY TRÒ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Bức Tường Kỷ Niệm &amp; Tri Ân
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Nơi lưu giữ từng câu chuyện debug xuyên đêm, từng lời cảm ơn sâu sắc và lời hứa trở thành một lập trình viên xuất sắc!
        </p>
      </div>

      {/* Grid: Form Post (Top) + Messages List (Bottom) */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800/90 p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Send className="w-4 h-4 text-rose-400" />
            <span>Ghim Lời Nhắn Của Bạn Lên Bức Tường Tri Ân</span>
          </h3>

          <form onSubmit={handlePostMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Họ &amp; Tên bạn: <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Minh Đức..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Lớp / Khóa học tại CodeGym:
                </label>
                <input
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="Ví dụ: Lớp Java C0824G1, Frontend K15..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Chủ đề / Thẻ:
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-rose-500 outline-none"
                >
                  <option value="Lời cảm ơn">❤️ Lời cảm ơn</option>
                  <option value="Kỷ niệm thức khuya">☕ Kỷ niệm thức khuya</option>
                  <option value="Chuyện vui phòng lab">🚀 Chuyện vui phòng lab</option>
                  <option value="Lời hứa vượt môn">🌟 Lời hứa vượt môn</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Chọn biểu tượng cảm xúc:
                </label>
                <div className="flex gap-2">
                  {STICKERS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSelectedSticker(s)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all ${
                        selectedSticker === s
                          ? 'bg-rose-500/20 border-2 border-rose-500 scale-110'
                          : 'bg-slate-950 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nội dung lời nhắn gửi Thầy Cô: <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chia sẻ kỷ niệm đáng nhớ nhất cùng Giảng viên/Mentor, hoặc gửi lời chúc 20/11 ấm áp nhất..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-rose-500 outline-none resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ghim Lên Bức Tường Tri Ân 📌</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTag === tag
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-2xl bg-slate-900/70 border border-slate-800/80 p-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:shadow-xl backdrop-blur-sm relative group"
          >
            {/* Top row */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shadow-inner">
                    {msg.sticker || '💙'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                      {msg.author}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {msg.batch}
                    </p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${msg.badgeColor}`}>
                  {msg.tag}
                </span>
              </div>

              {/* Memory text */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">
                "{msg.content}"
              </p>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-500 font-mono">
              <span className="flex items-center space-x-1 text-[11px]">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>{msg.date}</span>
              </span>

              <button
                onClick={() => handleLike(msg.id)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors active:scale-90"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
                <span className="text-xs font-semibold">{msg.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
