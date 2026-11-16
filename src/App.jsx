import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveTerminal from './components/InteractiveTerminal';
import MentorCards from './components/MentorCards';
import CodeWishGenerator from './components/CodeWishGenerator';
import GratitudeWall from './components/GratitudeWall';
import MiniGame from './components/MiniGame';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('terminal');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white bg-dots-pattern">
      {/* Top Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onStartTerminal={() => setActiveTab('terminal')}
          onExploreCards={() => setActiveTab('mentors')}
        />

        {/* Tab Content Display */}
        <div className="transition-opacity duration-300">
          {activeTab === 'terminal' && (
            <div className="py-6">
              <InteractiveTerminal />
            </div>
          )}

          {activeTab === 'mentors' && (
            <div className="py-4">
              <MentorCards />
            </div>
          )}

          {activeTab === 'code-wishes' && (
            <div className="py-4">
              <CodeWishGenerator />
            </div>
          )}

          {activeTab === 'wall' && (
            <div className="py-4">
              <GratitudeWall />
            </div>
          )}

          {activeTab === 'game' && (
            <div className="py-4">
              <MiniGame />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }} />
    </div>
  );
}
