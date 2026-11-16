import React, { useState, useEffect, useRef } from 'react';
import { Heart, Coffee, Award, Sparkles, MessageSquare, Plus, Check, Camera, Upload, Link as LinkIcon, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_MENTORS, MENTOR_AVATAR_PRESETS } from '../data/mentorData';
import { playKeyClick, playSuccessChime } from '../utils/audio';

const STORAGE_KEY = 'codegym_2011_mentors_list';

export default function MentorCards() {
  const [mentors, setMentors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_MENTORS;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMentorForAvatar, setEditingMentorForAvatar] = useState(null);
  const [avatarInputUrl, setAvatarInputUrl] = useState('');
  const [selectedMentorForMessage, setSelectedMentorForMessage] = useState(null);
  const [customWish, setCustomWish] = useState('');
  const [wishSent, setWishSent] = useState(false);

  const fileInputRef = useRef(null);

  // New mentor form state
  const [newMentor, setNewMentor] = useState({
    name: '',
    gender: 'male',
    title: 'Giảng viên & Mentor CodeGym',
    quote: '',
    avatar: MENTOR_AVATAR_PRESETS[0].url
  });

  // Save to localStorage whenever mentors change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mentors));
    } catch (e) {}
  }, [mentors]);

  const handleLike = (id) => {
    playKeyClick('default');
    setMentors(prev => prev.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
  };

  const handleSendCoffee = (id) => {
    playSuccessChime();
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 }
    });
    setMentors(prev => prev.map(m => m.id === id ? { ...m, coffees: m.coffees + 1 } : m));
  };

  // Open Edit Avatar modal for a specific mentor
  const handleOpenEditAvatar = (mentor) => {
    playKeyClick('default');
    setEditingMentorForAvatar(mentor);
    setAvatarInputUrl(mentor.avatar || '');
  };

  // Handle uploading local photo file from computer
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("Vui lòng chọn ảnh có dung lượng dưới 5MB để tải lên mượt mà nhất!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (base64Url && editingMentorForAvatar) {
        playSuccessChime();
        setMentors(prev => prev.map(m => 
          m.id === editingMentorForAvatar.id ? { ...m, avatar: base64Url } : m
        ));
        setEditingMentorForAvatar(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle saving avatar via URL
  const handleSaveAvatarUrl = (e) => {
    e.preventDefault();
    if (!avatarInputUrl.trim() || !editingMentorForAvatar) return;

    playSuccessChime();
    setMentors(prev => prev.map(m => 
      m.id === editingMentorForAvatar.id ? { ...m, avatar: avatarInputUrl.trim() } : m
    ));
    setEditingMentorForAvatar(null);
  };

  // Reset to default initial avatar
  const handleResetDefaultAvatar = (id) => {
    const initial = INITIAL_MENTORS.find(m => m.id === id);
    if (initial) {
      setMentors(prev => prev.map(m => m.id === id ? { ...m, avatar: initial.avatar } : m));
      setEditingMentorForAvatar(null);
    }
  };

  // Add new mentor
  const handleAddMentorSubmit = (e) => {
    e.preventDefault();
    if (!newMentor.name.trim()) return;

    playSuccessChime();
    const created = {
      id: `custom-mentor-${Date.now()}`,
      name: newMentor.name.trim(),
      gender: newMentor.gender,
      title: newMentor.title || 'Giảng viên & Mentor CodeGym',
      quote: newMentor.quote || 'Tự tin gõ phím, vững bước tương lai cùng CodeGym!',
      avatar: newMentor.avatar,
      likes: 1,
      coffees: 1
    };

    setMentors([...mentors, created]);
    setShowAddModal(false);
    setNewMentor({
      name: '',
      gender: 'male',
      title: 'Giảng viên & Mentor CodeGym',
      quote: '',
      avatar: MENTOR_AVATAR_PRESETS[0].url
    });
  };

  // Send personal wish
  const handleSendPersonalMessage = (e) => {
    e.preventDefault();
    if (!customWish.trim()) return;
    playSuccessChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
    setWishSent(true);
    setTimeout(() => {
      setWishSent(false);
      setSelectedMentorForMessage(null);
      setCustomWish('');
    }, 1500);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hidden file input for direct computer uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>CODEGYM HALL OF FAME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vinh Danh Giảng Viên &amp; Mentor
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Kính gửi lời tri ân chân thành tới các Thầy/Cô đã dìu dắt, truyền lửa và kiên nhẫn đồng hành cùng học viên CodeGym!
          </p>
          <div className="mt-3 inline-flex items-center space-x-2 text-xs text-blue-400 bg-blue-950/40 border border-blue-800/50 px-3 py-1.5 rounded-xl">
            <Camera className="w-3.5 h-3.5" />
            <span>Mẹo: Bạn có thể nhấp vào biểu tượng máy ảnh trên ảnh của từng Thầy/Cô để tải ảnh thật từ máy tính lên!</span>
          </div>
        </div>

        {/* Add Mentor button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Thầy / Cô Khác</span>
        </button>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 backdrop-blur-sm"
          >
            <div>
              {/* Avatar + Name row */}
              <div className="flex items-center space-x-4 mb-5">
                {/* Avatar with Camera/Edit Overlay */}
                <div 
                  className="relative group/avatar cursor-pointer"
                  onClick={() => handleOpenEditAvatar(mentor)}
                  title="Nhấp để sửa hoặc tải ảnh từ máy tính lên"
                >
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-18 h-18 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-blue-400 transition-all shadow-md group-hover/avatar:brightness-75"
                    onError={(e) => {
                      e.target.src = mentor.gender === 'female' 
                        ? MENTOR_AVATAR_PRESETS[0].url 
                        : MENTOR_AVATAR_PRESETS[3].url;
                    }}
                  />
                  {/* Hover Camera Overlay Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity bg-black/50 rounded-2xl">
                    <Camera className="w-5 h-5 text-white drop-shadow" />
                    <span className="text-[10px] text-white font-medium mt-0.5">Đổi ảnh</span>
                  </div>
                  {/* Badge Camera icon bottom right */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditAvatar(mentor);
                    }}
                    className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-md border border-slate-900 transition-transform active:scale-90"
                    title="Đổi ảnh đại diện"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>

                {/* Name & Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                    {mentor.name}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium mt-1 truncate">
                    {mentor.title}
                  </p>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    CodeGym Vietnam
                  </span>
                </div>
              </div>

              {/* Heartfelt Quote / Message */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-5 text-xs sm:text-sm italic text-slate-300 leading-relaxed relative">
                <span className="text-blue-400 font-serif text-lg leading-none select-none mr-1">“</span>
                {mentor.quote}
                <span className="text-blue-400 font-serif text-lg leading-none select-none ml-1">”</span>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(mentor.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-all active:scale-90"
                  title="Thả tim tri ân"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>{mentor.likes}</span>
                </button>

                {/* Send Coffee Button */}
                <button
                  onClick={() => handleSendCoffee(mentor.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/20 transition-all active:scale-90"
                  title="Mời Thầy/Cô tách cafe ấm áp"
                >
                  <Coffee className="w-4 h-4" />
                  <span>{mentor.coffees}</span>
                </button>
              </div>

              {/* Write personal message button */}
              <button
                onClick={() => setSelectedMentorForMessage(mentor)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-medium border border-blue-500/30 transition-all hover:scale-105"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Gửi lời chúc</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Edit / Upload Avatar */}
      {editingMentorForAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingMentorForAvatar(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center space-x-2">
              <Camera className="w-5 h-5 text-blue-400" />
              <span>Sửa Ảnh Cho {editingMentorForAvatar.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Bạn có thể tải ảnh chụp thật từ máy tính lên hoặc dán link ảnh trực tiếp.
            </p>

            {/* Current Avatar Preview */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                <img
                  src={avatarInputUrl || editingMentorForAvatar.avatar}
                  alt="Preview"
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-500 shadow-xl"
                />
              </div>
              <span className="text-xs text-slate-400 mt-2 font-medium">
                Ảnh đại diện hiện tại
              </span>
            </div>

            {/* Option 1: Upload from Computer */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-white mb-2 flex items-center space-x-1.5">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Cách 1: Tải ảnh từ máy tính của bạn</span>
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
              >
                <Upload className="w-4 h-4" />
                <span>Chọn tệp ảnh (.png, .jpg, .jpeg, .webp)...</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-900 text-slate-500">HOẶC</span>
              </div>
            </div>

            {/* Option 2: Enter URL */}
            <form onSubmit={handleSaveAvatarUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5 flex items-center space-x-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Cách 2: Dán đường link ảnh (URL)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/anh-thay-co.jpg"
                  value={avatarInputUrl}
                  onChange={(e) => setAvatarInputUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleResetDefaultAvatar(editingMentorForAvatar.id)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Ảnh mặc định</span>
                </button>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingMentorForAvatar(null)}
                    className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
                  >
                    Lưu Ảnh Mới
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Mentor */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Thêm Thầy / Cô Lớp Bạn</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Nhập thông tin Giảng viên hoặc Mentor khác mà bạn muốn vinh danh nhân dịp 20/11!
            </p>

            <form onSubmit={handleAddMentorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tên Thầy / Cô: <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thầy Đỗ Nam, Cô Mai Chi..."
                  value={newMentor.name}
                  onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Giới tính:
                  </label>
                  <select
                    value={newMentor.gender}
                    onChange={(e) => setNewMentor({ ...newMentor, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                  >
                    <option value="male">Nam (Thầy)</option>
                    <option value="female">Nữ (Cô)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Chức danh:
                  </label>
                  <input
                    type="text"
                    placeholder="Giảng viên & Mentor CodeGym"
                    value={newMentor.title}
                    onChange={(e) => setNewMentor({ ...newMentor, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Lời dặn dò / Câu nói tâm huyết:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 'Tự tin gõ phím, vững bước tương lai!'"
                  value={newMentor.quote}
                  onChange={(e) => setNewMentor({ ...newMentor, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Chọn ảnh mẫu:
                </label>
                <div className="flex gap-2">
                  {MENTOR_AVATAR_PRESETS.map((p, idx) => (
                    <img
                      key={idx}
                      src={p.url}
                      alt={p.label}
                      onClick={() => setNewMentor({ ...newMentor, avatar: p.url })}
                      className={`w-10 h-10 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                        newMentor.avatar === p.url ? 'border-blue-500 scale-105' : 'border-slate-700 opacity-60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
                >
                  Lưu &amp; Vinh Danh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Send personal wish */}
      {selectedMentorForMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedMentorForMessage(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span>Gửi Lời Chúc Tới {selectedMentorForMessage.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Lời nhắn gửi tình cảm và lòng biết ơn của bạn nhân ngày 20/11.
            </p>

            {wishSent ? (
              <div className="py-8 text-center text-emerald-400 flex flex-col items-center justify-center space-y-2">
                <Check className="w-12 h-12 rounded-full bg-emerald-500/20 p-2 border border-emerald-500/30" />
                <span className="font-semibold text-base">Đã gửi lời tri ân thành công! 🎉</span>
                <span className="text-xs text-slate-400">Thầy/Cô sẽ rất xúc động khi nhận được lời chúc này!</span>
              </div>
            ) : (
              <form onSubmit={handleSendPersonalMessage} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  placeholder={`Kính gửi ${selectedMentorForMessage.name}, nhân ngày 20/11 em xin gửi lời cảm ơn chân thành nhất tới Thầy/Cô...`}
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 outline-none resize-none"
                />

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMentorForMessage(null)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
                  >
                    Gửi Lời Chúc 💌
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
