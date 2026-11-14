import React from 'react';
import { RotateCcw, Home, Trophy, CheckCircle2, Star } from 'lucide-react';
import { getPredicateInfo, LeaderboardEntry } from '../data/gameData';
import { BadgeAwardSVG, ChefCharacterSVG, RendangDishSVG } from './GameIllustrations';
import { sound } from '../utils/sound';

interface ResultScreenProps {
  playerName: string;
  chefVariant: 'female' | 'male';
  scores: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
  };
  stats: {
    quizCorrect: number;
    ingredientsCorrect: number;
    stepsCorrect: number;
  };
  highScore: number;
  leaderboard: LeaderboardEntry[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  playerName,
  chefVariant,
  scores,
  stats,
  highScore,
  leaderboard,
  onPlayAgain,
  onBackToMenu
}) => {
  const totalScore = scores.level1 + scores.level2 + scores.level3 + scores.level4;
  const predicate = getPredicateInfo(totalScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="game-panel rounded-3xl p-6 sm:p-8 text-center space-y-6">
        {/* Top Ribbon */}
        <div className="inline-block ribbon-header px-6 py-2.5 rounded-2xl font-display font-bold text-lg sm:text-xl">
          Sertifikat Penghargaan Kuliner
        </div>

        {/* Badge, Chef & Rendang Dish */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
          <ChefCharacterSVG
            variant={chefVariant}
            mood={totalScore >= 75 ? 'excited' : 'happy'}
            className="w-32 h-36"
          />
          <div className="flex flex-col items-center">
            <BadgeAwardSVG tier={predicate.badgeTier} className="w-32 h-32 animate-float-slow" />
            <span className="text-xs font-bold text-[#8B4C24] mt-1">
              LENCANA PENGHARGAAN
            </span>
          </div>
          <RendangDishSVG className="w-40 h-28 hidden sm:block" />
        </div>

        {/* Player Name & Predicate */}
        <div className="space-y-2">
          <div className="text-xs sm:text-sm font-bold text-[#7A421D]">
            DIBERIKAN KEPADA KOKI PETUALANG:
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#4A2511]">
            {playerName || 'Chef Muda'}
          </h2>
          <div
            className="font-display font-bold text-2xl sm:text-3xl pt-1"
            style={{ color: predicate.accentColor }}
          >
            Predikat: {predicate.title}
          </div>
          <p className="text-sm sm:text-base text-[#6E3D1E] max-w-xl mx-auto leading-relaxed">
            {predicate.message}
          </p>
        </div>

        {/* Total Score & Correct Answers Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-[#FDF3DF] border-3 border-[#C68B59] rounded-2xl p-4">
            <div className="text-xs font-bold text-[#7A421D]">TOTAL SKOR AKHIR</div>
            <div className="font-display font-bold text-3xl sm:text-4xl text-[#4A2511] tabular-nums mt-1">
              {totalScore} <span className="text-lg text-[#8B4C24]">/ 100</span>
            </div>
          </div>

          <div className="bg-[#FDF3DF] border-3 border-[#C68B59] rounded-2xl p-4">
            <div className="text-xs font-bold text-[#7A421D]">JAWABAN KUIS BENAR</div>
            <div className="font-display font-bold text-3xl sm:text-4xl text-[#2E7D32] tabular-nums mt-1">
              {stats.quizCorrect} <span className="text-lg text-[#6E3D1E]">/ 5 Soal</span>
            </div>
          </div>

          <div className="bg-[#FDF3DF] border-3 border-[#C68B59] rounded-2xl p-4">
            <div className="text-xs font-bold text-[#7A421D]">SKOR TERTINGGI</div>
            <div className="font-display font-bold text-3xl sm:text-4xl text-[#D97706] tabular-nums mt-1">
              {Math.max(highScore, totalScore)} <span className="text-lg text-[#8B4C24]">Poin</span>
            </div>
          </div>
        </div>

        {/* Breakdown per Level */}
        <div className="bg-[#FFFDF8] border-2 border-[#D5A372] rounded-2xl p-4 sm:p-5 text-left max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#8B4C24] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
            <span>RINCIAN NILAI SETIAP LEVEL:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#FDF4E3] border border-[#E6C79C]">
              <div className="text-xs font-semibold text-[#7A421D]">Level 1 · Materi</div>
              <div className="font-display font-bold text-lg text-[#4A2511] tabular-nums">
                {scores.level1} / 10 Poin
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#FDF4E3] border border-[#E6C79C]">
              <div className="text-xs font-semibold text-[#7A421D]">Level 2 · Bahan</div>
              <div className="font-display font-bold text-lg text-[#4A2511] tabular-nums">
                {scores.level2} / 30 Poin
              </div>
              <div className="text-[11px] text-[#6E3D1E]">
                {stats.ingredientsCorrect}/10 bahan tepat
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#FDF4E3] border border-[#E6C79C]">
              <div className="text-xs font-semibold text-[#7A421D]">Level 3 · Memasak</div>
              <div className="font-display font-bold text-lg text-[#4A2511] tabular-nums">
                {scores.level3} / 30 Poin
              </div>
              <div className="text-[11px] text-[#6E3D1E]">
                {stats.stepsCorrect}/6 urutan tepat
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#FDF4E3] border border-[#E6C79C]">
              <div className="text-xs font-semibold text-[#7A421D]">Level 4 · Kuis</div>
              <div className="font-display font-bold text-lg text-[#4A2511] tabular-nums">
                {scores.level4} / 30 Poin
              </div>
              <div className="text-[11px] text-[#6E3D1E]">
                {stats.quizCorrect}/5 kuis benar
              </div>
            </div>
          </div>

          {/* Award Tier Scale Reference */}
          <div className="pt-2 border-t border-[#EFE0C6] text-xs text-[#7A421D] flex flex-wrap items-center justify-between gap-2">
            <span>Standar Predikat:</span>
            <span>90–100: Chef Rendang Hebat · 75–89: Chef Berbakat · 60–74: Calon Chef · &lt;60: Terus Berlatih</span>
          </div>
        </div>

        {/* Leaderboard Table */}
        {leaderboard.length > 0 && (
          <div className="bg-[#FFFDF8] border-2 border-[#D5A372] rounded-2xl p-4 sm:p-5 text-left max-w-2xl mx-auto space-y-3">
            <div className="flex items-center gap-2 text-sm font-display font-bold text-[#4A2511]">
              <Trophy className="w-5 h-5 text-[#D97706]" />
              <span>Papan Skor Koki Terbaik (Tersimpan di Perangkat)</span>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-[#FDF4E3] border border-[#E6C79C] rounded-xl px-3.5 py-2 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-white font-bold flex items-center justify-center text-xs tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-[#4A2511]">{entry.name}</span>
                    <span className="text-xs text-[#8B4C24]">· {entry.predicate}</span>
                  </div>
                  <div className="font-display font-bold text-[#4A2511] tabular-nums flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>{entry.score} Poin</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons: MAIN LAGI & KEMBALI KE MENU */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="green-btn px-7 py-4 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>MAIN LAGI</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onBackToMenu();
            }}
            className="wood-btn px-7 py-4 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span>KEMBALI KE MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
