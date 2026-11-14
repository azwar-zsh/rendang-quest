/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Play,
  Trophy,
  HelpCircle,
  Home,
  RotateCcw,
  CheckCircle2,
  Star,
  Sparkles,
  User,
  X,
  ArrowRight,
  Award,
  Flame,
  ShoppingBasket
} from 'lucide-react';
import {
  ChefCharacterSVG,
  RendangDishSVG,
  RumahGadangSVG,
  IngredientIllustrationSVG,
  CookingPotStageSVG
} from './components/GameIllustrations';
import { Level1KenaliRendang } from './components/Level1KenaliRendang';
import { Level2SiapkanBahan } from './components/Level2SiapkanBahan';
import { Level3SaatnyaMemasak } from './components/Level3SaatnyaMemasak';
import { Level4KuisKuliner } from './components/Level4KuisKuliner';
import { ResultScreen } from './components/ResultScreen';
import { getPredicateInfo, LeaderboardEntry } from './data/gameData';
import { sound } from './utils/sound';

type ScreenView = 'HOME' | 'LEVEL_SELECT' | 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'RESULT';

interface SavedProgress {
  playerName: string;
  chefVariant: 'female' | 'male';
  completedCardsL1: string[];
  scores: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
  };
  stats: {
    ingredientsCorrect: number;
    stepsCorrect: number;
    quizCorrect: number;
  };
  unlockedLevel: number;
  highScore: number;
}

const DEFAULT_PROGRESS: SavedProgress = {
  playerName: 'Chef Rina',
  chefVariant: 'female',
  completedCardsL1: [],
  scores: {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0
  },
  stats: {
    ingredientsCorrect: 0,
    stepsCorrect: 0,
    quizCorrect: 0
  },
  unlockedLevel: 1,
  highScore: 0
};

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { name: 'Chef Rina', chefCharacter: 'female', score: 95, predicate: 'Chef Rendang Hebat', date: '2026' },
  { name: 'Dinda', chefCharacter: 'female', score: 88, predicate: 'Chef Berbakat', date: '2026' },
  { name: 'Bima', chefCharacter: 'male', score: 80, predicate: 'Chef Berbakat', date: '2026' }
];

export default function App() {
  const [view, setView] = useState<ScreenView>('HOME');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.enabled);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showSoundModal, setShowSoundModal] = useState<boolean>(false);

  const [progress, setProgress] = useState<SavedProgress>(() => {
    try {
      const saved = localStorage.getItem('rendang_quest_progress_v1');
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROGRESS;
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem('rendang_quest_leaderboard_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_LEADERBOARD;
  });

  useEffect(() => {
    try {
      localStorage.setItem('rendang_quest_progress_v1', JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem('rendang_quest_leaderboard_v1', JSON.stringify(leaderboard));
    } catch {
      // ignore
    }
  }, [leaderboard]);

  const totalScore =
    progress.scores.level1 +
    progress.scores.level2 +
    progress.scores.level3 +
    progress.scores.level4;

  const completedLevelsCount = [
    progress.scores.level1 > 0,
    progress.scores.level2 > 0,
    progress.scores.level3 > 0,
    progress.scores.level4 > 0
  ].filter(Boolean).length;

  const progressPercentage = Math.round((completedLevelsCount / 4) * 100);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  const handleResetGame = () => {
    sound.playClick();
    setProgress((prev) => ({
      ...DEFAULT_PROGRESS,
      playerName: prev.playerName,
      chefVariant: prev.chefVariant,
      highScore: prev.highScore
    }));
    setView('LEVEL_SELECT');
  };

  const handleFinishAllLevels = (level4Score: number, quizCorrect: number) => {
    const finalTotal =
      progress.scores.level1 + progress.scores.level2 + progress.scores.level3 + level4Score;
    const newHigh = Math.max(progress.highScore, finalTotal);
    const pred = getPredicateInfo(finalTotal);

    setProgress((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        level4: level4Score
      },
      stats: {
        ...prev.stats,
        quizCorrect
      },
      highScore: newHigh
    }));

    const newEntry: LeaderboardEntry = {
      name: progress.playerName.trim() || 'Chef Muda',
      chefCharacter: progress.chefVariant,
      score: finalTotal,
      predicate: pred.title,
      date: new Date().toLocaleDateString('id-ID')
    };

    setLeaderboard((prev) => {
      const combined = [newEntry, ...prev.filter((e) => !(e.name === newEntry.name && e.score === newEntry.score))];
      combined.sort((a, b) => b.score - a.score);
      return combined.slice(0, 8);
    });

    setView('RESULT');
  };

  return (
    <div className="min-h-screen bg-gingham-warm flex flex-col justify-between">
      {/* Top Gingham Frame Trim */}
      <div className="h-3 bg-gingham-border border-b-2 border-[#C68B59]" />

      {/* Top Navigation & Progress HUD (Always accessible) */}
      <header className="sticky top-0 z-30 bg-[#FFF9EE]/95 border-b-3 border-[#C68B59] px-3 sm:px-6 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand Title */}
          <button
            onClick={() => {
              sound.playClick();
              setView('HOME');
            }}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#8B4C24] border-2 border-[#4A230B] flex items-center justify-center text-[#FFF8EC] font-display font-bold text-lg shadow-[0_2px_0_#3D1C08]">
              R
            </div>
            <div>
              <div className="font-display font-bold text-base sm:text-lg text-[#4A2511] leading-none group-hover:text-[#8B4C24] transition-colors">
                RENDANG QUEST
              </div>
              <div className="text-[11px] font-semibold text-[#7A421D]">
                Petualangan Memasak Rendang
              </div>
            </div>
          </button>

          {/* Center Level Progress Bar */}
          <div className="hidden md:flex items-center gap-3 bg-[#FDF3DF] border-2 border-[#D5A372] rounded-2xl px-4 py-1.5">
            <div className="text-xs font-bold text-[#6E3D1E]">
              Progres Level ({completedLevelsCount}/4)
            </div>
            <div className="w-32 h-3 bg-[#E6C79C] rounded-full overflow-hidden border border-[#B37B48]">
              <div
                className="h-full bg-[#529447] transition-all duration-300"
                style={{ width: `${Math.max(8, progressPercentage)}%` }}
              />
            </div>
            <div className="text-xs font-display font-bold text-[#4A2511] tabular-nums">
              Skor: {totalScore}/100
            </div>
          </div>

          {/* Right Controls: Menu, Pilih Level, Panduan, Suara */}
          <div className="flex items-center gap-2">
            {view !== 'HOME' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setView('HOME');
                }}
                className="cream-btn px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                title="Kembali ke Halaman Utama"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                setView('LEVEL_SELECT');
              }}
              className="cream-btn px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#8B4C24]" />
              <span>Pilih Level</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setShowGuideModal(true);
              }}
              className="cream-btn px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#D97706]" />
              <span className="hidden sm:inline">Panduan</span>
            </button>

            <button
              onClick={() => {
                toggleSound();
              }}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer border-2 ${
                soundEnabled
                  ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20]'
                  : 'bg-[#FFEBEE] border-[#C62828] text-[#B71C1C]'
              }`}
              title="Pengaturan Suara"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Progress Bar Strip */}
        <div className="md:hidden mt-2 pt-2 border-t border-[#EFE0C6] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1">
            <span className="font-bold text-[#6E3D1E] whitespace-nowrap">
              Progres {completedLevelsCount}/4:
            </span>
            <div className="flex-1 h-2.5 bg-[#E6C79C] rounded-full overflow-hidden border border-[#B37B48]">
              <div
                className="h-full bg-[#529447] transition-all duration-300"
                style={{ width: `${Math.max(8, progressPercentage)}%` }}
              />
            </div>
          </div>
          <span className="font-display font-bold text-[#4A2511] tabular-nums whitespace-nowrap">
            Skor: {totalScore} / 100
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-7">
        {/* ==================== HALAMAN UTAMA (HOME) ==================== */}
        {view === 'HOME' && (
          <div className="space-y-6">
            {/* Top Hero Row: Chef Character + Wooden Signboard Logo + Speech Bubble */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Left: Cute 2D Chef Character & Character Switcher */}
              <div className="lg:col-span-3 flex flex-col items-center">
                <ChefCharacterSVG
                  variant={progress.chefVariant}
                  mood="happy"
                  className="w-44 h-48 animate-float-slow"
                />
                <div className="flex items-center gap-2 mt-1 bg-[#FFF9EE] border-2 border-[#C68B59] rounded-2xl p-1.5 shadow-sm">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setProgress((p) => ({
                        ...p,
                        chefVariant: 'female',
                        playerName: p.playerName === 'Chef Bima' ? 'Chef Rina' : p.playerName
                      }));
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                      progress.chefVariant === 'female'
                        ? 'bg-[#8B4C24] text-white'
                        : 'text-[#6E3D1E] hover:bg-[#FDF3DF]'
                    }`}
                  >
                    Koki Rina
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setProgress((p) => ({
                        ...p,
                        chefVariant: 'male',
                        playerName: p.playerName === 'Chef Rina' ? 'Chef Bima' : p.playerName
                      }));
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                      progress.chefVariant === 'male'
                        ? 'bg-[#8B4C24] text-white'
                        : 'text-[#6E3D1E] hover:bg-[#FDF3DF]'
                    }`}
                  >
                    Koki Bima
                  </button>
                </div>
              </div>

              {/* Center: Iconic Wooden Signboard Banner */}
              <div className="lg:col-span-6 text-center space-y-4">
                <div className="relative mx-auto max-w-xl bg-gradient-to-b from-[#DF9A57] via-[#C67D3B] to-[#9E5B24] border-4 border-[#4A230B] rounded-[32px] px-6 py-6 shadow-[0_8px_0_#3D1C08]">
                  {/* Decorative Wood Grain Lines */}
                  <div className="text-xs font-bold uppercase tracking-widest text-[#FFF5E0]/90">
                    Game Edukasi Kuliner Nusantara
                  </div>
                  <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#3D1C08] drop-shadow-[0_2px_0_#FDE6C4] tracking-tight mt-1">
                    Rendang Quest
                  </h1>
                  <div className="mt-2 inline-block bg-[#FDE6C4] border-2 border-[#5D2E14] rounded-2xl px-4 py-1.5 shadow-sm">
                    <span className="font-display font-bold text-sm sm:text-base text-[#5D2E14]">
                      ♥ Masak · Belajar · Jelajahi ♥
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#FFFDF9] mt-2">
                    Petualangan Memasak Rendang Khas Minangkabau, Sumatera Barat
                  </p>
                </div>

                {/* Primary Opening Action Buttons required by specification */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setView('LEVEL_SELECT');
                    }}
                    className="orange-btn px-7 py-4 rounded-2xl font-display font-bold text-lg sm:text-xl flex items-center gap-2.5 cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    <span>MULAI PERMAINAN</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowGuideModal(true);
                    }}
                    className="wood-btn px-5 py-4 rounded-2xl font-display font-bold text-base flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>PANDUAN</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowSoundModal(true);
                    }}
                    className="cream-btn px-5 py-4 rounded-2xl font-display font-bold text-base flex items-center gap-2 cursor-pointer"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-[#2E7D32]" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-[#C62828]" />
                    )}
                    <span>PENGATURAN SUARA</span>
                  </button>
                </div>
              </div>

              {/* Right: Chef Speech Bubble & Player Name Input */}
              <div className="lg:col-span-3 space-y-3">
                <div className="game-panel rounded-3xl p-4 text-center relative">
                  <p className="font-display font-bold text-base sm:text-lg text-[#4A2511] leading-snug">
                    &ldquo;Ayo, jadi Chef hebat dan pelajari kelezatan Rendang!&rdquo; ♥
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#E6C79C] text-left">
                    <label className="block text-xs font-bold text-[#7A421D] mb-1">
                      NAMA KOKI PEMAIN:
                    </label>
                    <div className="flex items-center gap-2 bg-[#FFFDF8] border-2 border-[#C68B59] rounded-xl px-3 py-1.5">
                      <User className="w-4 h-4 text-[#8B4C24] shrink-0" />
                      <input
                        type="text"
                        value={progress.playerName}
                        onChange={(e) =>
                          setProgress((p) => ({ ...p, playerName: e.target.value }))
                        }
                        placeholder="Masukkan namamu..."
                        maxLength={24}
                        className="w-full text-sm font-bold text-[#4A2511] bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main 3-Column Adventure Board matching the reference image layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Column: Tentang Game, Fitur Game, Bahan Utama (3 cols) */}
              <div className="lg:col-span-3 space-y-5">
                {/* Tentang Game */}
                <div className="game-panel rounded-3xl p-4 space-y-2.5">
                  <div className="ribbon-header px-4 py-2 rounded-xl font-display font-bold text-base text-center">
                    Tentang Game
                  </div>
                  <p className="text-xs sm:text-sm text-[#5A2E14] text-center leading-relaxed">
                    <strong>Rendang Quest</strong> adalah game edukasi memasak yang mengajak kamu mengenal rendang, mulai dari sejarah, bahan, hingga cara memasaknya dengan cara yang seru dan interaktif!
                  </p>
                </div>

                {/* Fitur Game */}
                <div className="game-panel rounded-3xl p-4 space-y-2.5">
                  <div className="ribbon-header px-4 py-2 rounded-xl font-display font-bold text-base text-center flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
                    <span>Fitur Game</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-semibold text-[#4A2511]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B4C24] shrink-0" />
                      <span>Petualangan memasak rendang</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B4C24] shrink-0" />
                      <span>Kuis pengetahuan kuliner</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B4C24] shrink-0" />
                      <span>Simulasi langkah memasak</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B4C24] shrink-0" />
                      <span>Papan skor pemain</span>
                    </li>
                  </ul>
                </div>

                {/* Bahan Utama */}
                <div className="game-panel rounded-3xl p-4 space-y-2.5">
                  <div className="ribbon-header px-4 py-2 rounded-xl font-display font-bold text-base text-center">
                    Bahan Utama
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-[#4A2511]">
                      Daging Sapi, Santan, dan Rempah-rempah pilihan.
                    </p>
                    <div className="flex items-center -space-x-2 shrink-0">
                      <IngredientIllustrationSVG id="daging-sapi" className="w-12 h-12" />
                      <IngredientIllustrationSVG id="santan" className="w-12 h-12" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column: Level Permainan (1–4) + Cara Bermain + Fakta Menarik (6 cols) */}
              <div className="lg:col-span-6 space-y-5">
                {/* Level Permainan Board */}
                <div className="game-panel rounded-3xl p-4 sm:p-5 space-y-4">
                  <div className="ribbon-header max-w-xs mx-auto px-5 py-2 rounded-2xl font-display font-bold text-lg text-center">
                    Level Permainan
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    {/* Level 1 Card */}
                    <div className="bg-[#FDF3DF] border-2 border-[#C68B59] rounded-2xl p-3.5 flex flex-col justify-between text-center">
                      <div>
                        <div className="text-xs font-bold text-[#8B4C24]">Level 1</div>
                        <div className="font-display font-bold text-base text-[#4A2511]">
                          Kenali Rendang
                        </div>
                        <div className="my-2 flex justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#FFFDF8] border border-[#D5A372] flex items-center justify-center">
                            <BookOpen className="w-9 h-9 text-[#8B4C24]" />
                          </div>
                        </div>
                        <p className="text-xs text-[#6E3D1E]">
                          Pelajari sejarah dan ciri khas rendang. (10 Poin)
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setView('LEVEL_1');
                        }}
                        className="wood-btn mt-3 w-full py-2 rounded-xl font-display font-bold text-sm cursor-pointer"
                      >
                        Mulai
                      </button>
                    </div>

                    {/* Level 2 Card */}
                    <div className="bg-[#FDF3DF] border-2 border-[#C68B59] rounded-2xl p-3.5 flex flex-col justify-between text-center">
                      <div>
                        <div className="text-xs font-bold text-[#8B4C24]">Level 2</div>
                        <div className="font-display font-bold text-base text-[#4A2511]">
                          Siapkan Bahan
                        </div>
                        <div className="my-2 flex justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#FFFDF8] border border-[#D5A372] flex items-center justify-center">
                            <IngredientIllustrationSVG id="daging-sapi" className="w-12 h-12" />
                          </div>
                        </div>
                        <p className="text-xs text-[#6E3D1E]">
                          Pilih 10 bahan dan bumbu yang tepat. (30 Poin)
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setView('LEVEL_2');
                        }}
                        className="wood-btn mt-3 w-full py-2 rounded-xl font-display font-bold text-sm cursor-pointer"
                      >
                        Mulai
                      </button>
                    </div>

                    {/* Level 3 Card */}
                    <div className="bg-[#FDF3DF] border-2 border-[#C68B59] rounded-2xl p-3.5 flex flex-col justify-between text-center">
                      <div>
                        <div className="text-xs font-bold text-[#8B4C24]">Level 3</div>
                        <div className="font-display font-bold text-base text-[#4A2511]">
                          Saatnya Memasak
                        </div>
                        <div className="my-2 flex justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#FFFDF8] border border-[#D5A372] flex items-center justify-center">
                            <CookingPotStageSVG stage="simmer-kalio" className="w-14 h-12" />
                          </div>
                        </div>
                        <p className="text-xs text-[#6E3D1E]">
                          Susun 6 urutan memasak rendang. (30 Poin)
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setView('LEVEL_3');
                        }}
                        className="wood-btn mt-3 w-full py-2 rounded-xl font-display font-bold text-sm cursor-pointer"
                      >
                        Mulai
                      </button>
                    </div>

                    {/* Level 4 Card */}
                    <div className="bg-[#FDF3DF] border-2 border-[#C68B59] rounded-2xl p-3.5 flex flex-col justify-between text-center">
                      <div>
                        <div className="text-xs font-bold text-[#8B4C24]">Level 4</div>
                        <div className="font-display font-bold text-base text-[#4A2511]">
                          Kuis Kuliner
                        </div>
                        <div className="my-2 flex justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#FFFDF8] border border-[#D5A372] flex items-center justify-center">
                            <RendangDishSVG className="w-14 h-11" />
                          </div>
                        </div>
                        <p className="text-xs text-[#6E3D1E]">
                          Jawab 5 kuis dan raih skor tertinggi! (30 Poin)
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setView('LEVEL_4');
                        }}
                        className="wood-btn mt-3 w-full py-2 rounded-xl font-display font-bold text-sm cursor-pointer"
                      >
                        Mulai
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Sub-Row: Cara Bermain & Fakta Menarik */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="game-panel rounded-3xl p-4 space-y-2.5">
                    <div className="ribbon-header px-4 py-2 rounded-xl font-display font-bold text-base text-center">
                      Cara Bermain
                    </div>
                    <ol className="space-y-2 text-xs sm:text-sm font-medium text-[#4A2511]">
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8B4C24] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </span>
                        <span>Pelajari materi pada setiap kartu di Level 1.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8B4C24] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </span>
                        <span>Pilih 10 bahan asli rendang ke dalam keranjang di Level 2.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8B4C24] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </span>
                        <span>Susun 6 tahapan memasak rendang dengan tepat di Level 3.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8B4C24] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          4
                        </span>
                        <span>Jawab 5 soal Kuis Kuliner di Level 4 untuk raih 100 poin!</span>
                      </li>
                    </ol>
                  </div>

                  <div className="game-panel rounded-3xl p-4 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="ribbon-header px-4 py-2 rounded-xl font-display font-bold text-base text-center flex items-center justify-center gap-2">
                        <Star className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
                        <span>Fakta Menarik</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A2511] leading-relaxed">
                        Rendang berasal dari <strong>Sumatera Barat</strong> dan telah diakui sebagai salah satu makanan terenak di dunia oleh CNN International.
                      </p>
                    </div>
                    <div className="flex justify-center pt-1">
                      <RumahGadangSVG className="w-36 h-24" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Tujuan Game, Papan Skor, Hidangan Rendang (3 cols) */}
              <div className="lg:col-span-3 space-y-5">
                {/* Tujuan Game */}
                <div className="game-panel rounded-3xl p-4 text-center space-y-2.5">
                  <div className="ribbon-header px-4 py-2 rounded-xl font-display font-bold text-base">
                    Tujuan Game
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A2511]">
                    Selesaikan semua level, pelajari ilmu kuliner rendang, dan raih skor tertinggi hingga <strong>100 Poin</strong>!
                  </p>
                  <Trophy className="w-10 h-10 text-[#D97706] mx-auto" />
                </div>

                {/* Papan Skor */}
                <div className="game-panel rounded-3xl p-4 space-y-3">
                  <div className="ribbon-header px-4 py-2 rounded-xl font-display font-bold text-base text-center">
                    Papan Skor
                  </div>
                  <div className="space-y-1.5">
                    {leaderboard.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs sm:text-sm bg-[#FDF3DF] border border-[#D5A372] rounded-xl px-3 py-1.5"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-[#4A2511] truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-display font-bold text-[#4A2511] tabular-nums">
                          {item.score}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-xl px-3 py-2 text-center font-display font-bold text-sm text-[#78350F] tabular-nums">
                    ★ Skor Kamu : {totalScore} / 100
                  </div>
                </div>

                {/* CTA + Rendang Dish Illustration */}
                <div className="space-y-3 text-center">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setView('LEVEL_1');
                    }}
                    className="wood-btn w-full py-3.5 px-4 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
                    <span>Ayo Mulai Petualanganmu!</span>
                  </button>
                  <div className="flex justify-center">
                    <RendangDishSVG className="w-48 h-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== HALAMAN PEMILIHAN LEVEL (LEVEL_SELECT) ==================== */}
        {view === 'LEVEL_SELECT' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="game-panel rounded-3xl p-5 sm:p-7">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <ChefCharacterSVG
                    variant={progress.chefVariant}
                    mood="happy"
                    className="w-24 h-28 shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#8B4C24]">
                      PETA PETUALANGAN KULINER
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#4A2511]">
                      Halo, {progress.playerName || 'Chef Muda'}! Pilih Level Permainan
                    </h2>
                    <p className="text-sm text-[#6E3D1E] mt-1">
                      Selesaikan keempat level secara berurutan untuk mengumpulkan maksimal 100 poin dan meraih gelar <strong>Chef Rendang Hebat</strong>!
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <div className="game-panel-soft rounded-2xl px-5 py-3 text-center w-full sm:w-auto">
                    <div className="text-xs font-bold text-[#7A421D]">TOTAL SKOR SAAT INI</div>
                    <div className="font-display font-bold text-2xl text-[#4A2511] tabular-nums">
                      {totalScore} / 100 Poin
                    </div>
                    <div className="text-xs font-semibold text-[#2E7D32]">
                      Predikat: {getPredicateInfo(totalScore).title}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Connected Level Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Level 1 */}
              <div className="game-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#8B4C24]">
                      LEVEL 1 · MAKSIMAL 10 POIN
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#4A2511] mt-0.5">
                      Kenali Rendang
                    </h3>
                    <p className="text-sm text-[#6E3D1E] mt-1">
                      Pelajari pengertian rendang, asal-usul Minangkabau, bahan utama, dan ciri khas rendang melalui 4 kartu interaktif.
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#FDF3DF] border-2 border-[#C68B59] flex items-center justify-center shrink-0">
                    <BookOpen className="w-8 h-8 text-[#8B4C24]" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E6C79C]">
                  <span className="text-xs sm:text-sm font-bold text-[#2E7D32] tabular-nums">
                    Skor Level 1: {progress.scores.level1} / 10 Poin
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setView('LEVEL_1');
                    }}
                    className="orange-btn px-5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Mainkan Level 1</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Level 2 */}
              <div className="game-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#8B4C24]">
                      LEVEL 2 · MAKSIMAL 30 POIN
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#4A2511] mt-0.5">
                      Siapkan Bahan
                    </h3>
                    <p className="text-sm text-[#6E3D1E] mt-1">
                      Pilih 10 bahan asli memasak rendang (daging sapi, santan, cabai, bawang, dan rempah) ke dalam keranjang dan hindari bahan pengecoh!
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#FDF3DF] border-2 border-[#C68B59] flex items-center justify-center shrink-0">
                    <ShoppingBasket className="w-8 h-8 text-[#8B4C24]" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E6C79C]">
                  <span className="text-xs sm:text-sm font-bold text-[#2E7D32] tabular-nums">
                    Skor Level 2: {progress.scores.level2} / 30 Poin
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setView('LEVEL_2');
                    }}
                    className="orange-btn px-5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Mainkan Level 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Level 3 */}
              <div className="game-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#8B4C24]">
                      LEVEL 3 · MAKSIMAL 30 POIN
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#4A2511] mt-0.5">
                      Saatnya Memasak
                    </h3>
                    <p className="text-sm text-[#6E3D1E] mt-1">
                      Susun 6 tahapan proses memasak rendang secara berurutan mulai dari memotong daging hingga bumbu mengental dan meresap.
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#FDF3DF] border-2 border-[#C68B59] flex items-center justify-center shrink-0">
                    <Flame className="w-8 h-8 text-[#D97706]" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E6C79C]">
                  <span className="text-xs sm:text-sm font-bold text-[#2E7D32] tabular-nums">
                    Skor Level 3: {progress.scores.level3} / 30 Poin
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setView('LEVEL_3');
                    }}
                    className="orange-btn px-5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Mainkan Level 3</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Level 4 */}
              <div className="game-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#8B4C24]">
                      LEVEL 4 · MAKSIMAL 30 POIN
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#4A2511] mt-0.5">
                      Kuis Kuliner
                    </h3>
                    <p className="text-sm text-[#6E3D1E] mt-1">
                      Jawab 5 pertanyaan pilihan ganda mengenai asal-usul rendang, bahan utama, fungsi santan, rempah-rempah, dan proses memasak.
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#FDF3DF] border-2 border-[#C68B59] flex items-center justify-center shrink-0">
                    <Award className="w-8 h-8 text-[#D97706]" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E6C79C]">
                  <span className="text-xs sm:text-sm font-bold text-[#2E7D32] tabular-nums">
                    Skor Level 4: {progress.scores.level4} / 30 Poin
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setView('LEVEL_4');
                    }}
                    className="orange-btn px-5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>Mainkan Level 4</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Utility Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setView('HOME');
                }}
                className="cream-btn px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Halaman Utama</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetGame}
                  className="cream-btn px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Permainan (Reset Skor)</span>
                </button>

                {totalScore > 0 && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setView('RESULT');
                    }}
                    className="green-btn px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Lihat Halaman Hasil Akhir</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== LEVEL 1: KENALI RENDANG ==================== */}
        {view === 'LEVEL_1' && (
          <Level1KenaliRendang
            chefVariant={progress.chefVariant}
            completedCards={progress.completedCardsL1}
            onUpdateCompletedCards={(cards, score) => {
              setProgress((prev) => ({
                ...prev,
                completedCardsL1: cards,
                scores: { ...prev.scores, level1: Math.max(prev.scores.level1, score) },
                unlockedLevel: Math.max(prev.unlockedLevel, 2)
              }));
            }}
            onNextLevel={() => setView('LEVEL_2')}
          />
        )}

        {/* ==================== LEVEL 2: SIAPKAN BAHAN ==================== */}
        {view === 'LEVEL_2' && (
          <Level2SiapkanBahan
            chefVariant={progress.chefVariant}
            savedScore={progress.scores.level2}
            onSaveScore={(score, correctCount) => {
              setProgress((prev) => ({
                ...prev,
                scores: { ...prev.scores, level2: score },
                stats: { ...prev.stats, ingredientsCorrect: correctCount },
                unlockedLevel: Math.max(prev.unlockedLevel, 3)
              }));
            }}
            onNextLevel={() => setView('LEVEL_3')}
          />
        )}

        {/* ==================== LEVEL 3: SAATNYA MEMASAK ==================== */}
        {view === 'LEVEL_3' && (
          <Level3SaatnyaMemasak
            chefVariant={progress.chefVariant}
            savedScore={progress.scores.level3}
            onSaveScore={(score, correctSteps) => {
              setProgress((prev) => ({
                ...prev,
                scores: { ...prev.scores, level3: score },
                stats: { ...prev.stats, stepsCorrect: correctSteps },
                unlockedLevel: Math.max(prev.unlockedLevel, 4)
              }));
            }}
            onNextLevel={() => setView('LEVEL_4')}
          />
        )}

        {/* ==================== LEVEL 4: KUIS KULINER ==================== */}
        {view === 'LEVEL_4' && (
          <Level4KuisKuliner
            chefVariant={progress.chefVariant}
            onFinishQuiz={(score, correctCount) => {
              handleFinishAllLevels(score, correctCount);
            }}
          />
        )}

        {/* ==================== HALAMAN HASIL AKHIR (RESULT) ==================== */}
        {view === 'RESULT' && (
          <ResultScreen
            playerName={progress.playerName}
            chefVariant={progress.chefVariant}
            scores={progress.scores}
            stats={progress.stats}
            highScore={progress.highScore}
            leaderboard={leaderboard}
            onPlayAgain={() => {
              setProgress((prev) => ({
                ...DEFAULT_PROGRESS,
                playerName: prev.playerName,
                chefVariant: prev.chefVariant,
                highScore: prev.highScore
              }));
              setView('LEVEL_1');
            }}
            onBackToMenu={() => setView('HOME')}
          />
        )}
      </main>

      {/* Bottom Gingham Frame Trim & Quiet Credits */}
      <footer className="mt-8">
        <div className="bg-[#FFF9EE] border-t-2 border-[#C68B59] py-3 px-4 text-center text-xs text-[#7A421D]">
          <strong>Rendang Quest: Petualangan Memasak Rendang</strong> · Media Pembelajaran Interaktif Kuliner Tradisional Minangkabau, Sumatera Barat
        </div>
        <div className="h-3 bg-gingham-border border-t border-[#C68B59]" />
      </footer>

      {/* ==================== MODAL PANDUAN CARA BERMAIN ==================== */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="game-panel rounded-3xl max-w-2xl w-full p-5 sm:p-7 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6C79C] pb-3">
              <h3 className="font-display font-bold text-2xl text-[#4A2511]">
                Panduan Bermain Rendang Quest
              </h3>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowGuideModal(false);
                }}
                className="cream-btn p-2 rounded-xl cursor-pointer"
                aria-label="Tutup panduan"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#4A2511]">
              <div className="p-3.5 rounded-2xl bg-[#FDF3DF] border border-[#D5A372]">
                <div className="font-display font-bold text-base text-[#8B4C24]">
                  Level 1 — Kenali Rendang (10 Poin)
                </div>
                <p className="mt-1">
                  Bukalah keempat kartu materi mengenai pengertian rendang, asal-usulnya dari Sumatera Barat, bahan utama, dan ciri khas rendang. Setelah semua kartu selesai dibaca, tekan tombol <strong>Lanjut ke Level 2</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FDF3DF] border border-[#D5A372]">
                <div className="font-display font-bold text-base text-[#8B4C24]">
                  Level 2 — Siapkan Bahan (30 Poin)
                </div>
                <p className="mt-1">
                  Sentuh 10 gambar bahan asli untuk memasak rendang (Daging sapi, Santan, Cabai merah, Bawang merah, Bawang putih, Jahe, Lengkuas, Serai, Daun jeruk, dan Daun kunyit) agar masuk ke Keranjang Bahan. Jangan memilih bahan pengecoh! Tekan <strong>Periksa Bahan</strong> untuk melihat nilaimu.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FDF3DF] border border-[#D5A372]">
                <div className="font-display font-bold text-base text-[#8B4C24]">
                  Level 3 — Saatnya Memasak (30 Poin)
                </div>
                <p className="mt-1">
                  Susun 6 tahapan memasak rendang dari awal hingga matang. Kamu dapat menyentuh dua kartu tahapan untuk menukar posisinya atau menekan tombol panah Naik/Turun, lalu tekan <strong>Periksa Urutan Memasak</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FDF3DF] border border-[#D5A372]">
                <div className="font-display font-bold text-base text-[#8B4C24]">
                  Level 4 — Kuis Kuliner (30 Poin)
                </div>
                <p className="mt-1">
                  Jawab 5 soal pilihan ganda untuk menguji pemahamanmu. Setiap jawaban benar bernilai 6 poin. Raih total skor 90–100 untuk mendapatkan lencana tertinggi <strong>Chef Rendang Hebat</strong>!
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowGuideModal(false);
                }}
                className="orange-btn px-6 py-3 rounded-2xl font-display font-bold text-base cursor-pointer"
              >
                Mengerti, Ayo Bermain!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL PENGATURAN SUARA ==================== */}
      {showSoundModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="game-panel rounded-3xl max-w-md w-full p-6 space-y-5 text-center">
            <div className="flex items-center justify-between border-b border-[#E6C79C] pb-3">
              <h3 className="font-display font-bold text-2xl text-[#4A2511]">
                Pengaturan Suara
              </h3>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowSoundModal(false);
                }}
                className="cream-btn p-2 rounded-xl cursor-pointer"
                aria-label="Tutup pengaturan suara"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#6E3D1E]">
              Aktifkan efek suara interaktif untuk mendengar bunyi tombol kayu, suara memilih bahan, suara menumis bumbu di kuali, dan musik kemenangan!
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={toggleSound}
                className={`w-full py-4 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-3 cursor-pointer ${
                  soundEnabled ? 'green-btn' : 'wood-btn'
                }`}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-6 h-6" />
                    <span>Efek Suara: AKTIF</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-6 h-6" />
                    <span>Efek Suara: NONAKTIF</span>
                  </>
                )}
              </button>

              {soundEnabled && (
                <button
                  onClick={() => sound.playFanfare()}
                  className="cream-btn w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>Tes Melodi Kemenangan</span>
                </button>
              )}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowSoundModal(false);
              }}
              className="orange-btn w-full py-3 rounded-2xl font-display font-bold text-base cursor-pointer"
            >
              Simpan & Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
