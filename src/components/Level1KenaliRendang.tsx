import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Sparkles, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { LEVEL1_CARDS, InfoCardItem } from '../data/gameData';
import { ChefCharacterSVG, RendangDishSVG, RumahGadangSVG } from './GameIllustrations';
import { sound } from '../utils/sound';

interface Level1Props {
  chefVariant: 'female' | 'male';
  completedCards: string[];
  onUpdateCompletedCards: (cards: string[], score: number) => void;
  onNextLevel: () => void;
}

export const Level1KenaliRendang: React.FC<Level1Props> = ({
  chefVariant,
  completedCards,
  onUpdateCompletedCards,
  onNextLevel
}) => {
  const [activeCardId, setActiveCardId] = useState<string>(LEVEL1_CARDS[0].id);

  const handleSelectCard = (card: InfoCardItem) => {
    sound.playFlip();
    setActiveCardId(card.id);
    if (!completedCards.includes(card.id)) {
      const updated = [...completedCards, card.id];
      const newScore = Math.round((updated.length / LEVEL1_CARDS.length) * 10);
      onUpdateCompletedCards(updated, newScore);
      if (updated.length === LEVEL1_CARDS.length) {
        setTimeout(() => sound.playFanfare(), 250);
      }
    }
  };

  const handleMarkCurrentRead = () => {
    if (!completedCards.includes(activeCardId)) {
      const updated = [...completedCards, activeCardId];
      const newScore = Math.round((updated.length / LEVEL1_CARDS.length) * 10);
      sound.playCorrect();
      onUpdateCompletedCards(updated, newScore);
      if (updated.length === LEVEL1_CARDS.length) {
        setTimeout(() => sound.playFanfare(), 250);
      }
    } else {
      // Advance to next unread card if available
      const nextUnread = LEVEL1_CARDS.find((c) => !completedCards.includes(c.id));
      if (nextUnread) {
        handleSelectCard(nextUnread);
      }
    }
  };

  const activeCard = LEVEL1_CARDS.find((c) => c.id === activeCardId) || LEVEL1_CARDS[0];
  const allRead = completedCards.length === LEVEL1_CARDS.length;
  const currentScore = Math.round((completedCards.length / LEVEL1_CARDS.length) * 10);

  return (
    <div className="space-y-6">
      {/* Level Banner */}
      <div className="game-panel rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block shrink-0">
              <ChefCharacterSVG variant={chefVariant} mood={allRead ? 'excited' : 'happy'} className="w-20 h-22" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#8B4C24] tracking-wide">
                LEVEL 1 DARI 4 · EKSPLORASI MATERI
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] font-display">
                Kenali Rendang
              </h2>
              <p className="text-sm text-[#6E3D1E] mt-1">
                Bukalah keempat kartu informasi di bawah ini untuk mempelajari sejarah, bahan utama, dan ciri khas rendang!
              </p>
            </div>
          </div>

          <div className="game-panel-soft rounded-2xl px-4 py-3 text-center shrink-0 w-full sm:w-auto">
            <div className="text-xs font-semibold text-[#7A421D]">Progres Membaca</div>
            <div className="text-xl font-bold text-[#4A2511] tabular-nums">
              {completedCards.length} / {LEVEL1_CARDS.length} Kartu · {currentScore}/10 Poin
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Flashcard Selectors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {LEVEL1_CARDS.map((card) => {
          const isOpened = completedCards.includes(card.id);
          const isSelected = activeCardId === card.id;
          return (
            <button
              key={card.id}
              onClick={() => handleSelectCard(card)}
              className={`text-left rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between min-h-[128px] border-3 ${
                isSelected
                  ? 'bg-[#FFF5E0] border-[#8B4C24] shadow-[0_6px_0_#6A3615] -translate-y-1'
                  : isOpened
                  ? 'bg-[#F4FBF1] border-[#68A357] shadow-[0_4px_0_#4D803E]'
                  : 'bg-[#FFFDF8] border-[#D5A372] shadow-[0_4px_0_#B37B48] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#8B4C24]">
                  KARTU 0{card.number}
                </span>
                {isOpened ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2E7D32]">
                    <CheckCircle2 className="w-4 h-4" /> Dibaca
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-[#B45309]">Buka Kartu</span>
                )}
              </div>

              <div className="mt-2">
                <h3 className="font-display text-base sm:text-lg font-bold text-[#4A2511] leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-[#7A421D] mt-0.5 line-clamp-2">
                  {card.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Card Reading Area */}
      <div className="game-panel rounded-3xl p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#FDF3DF] border-2 border-[#DFB17B] rounded-2xl p-5 text-center">
            {activeCard.iconType === 'origin' ? (
              <RumahGadangSVG className="w-44 h-32" />
            ) : (
              <RendangDishSVG className="w-44 h-32" />
            )}
            <div className="mt-3 text-xs font-bold text-[#7A421D]">
              ISTILAH KULINER MINANG
            </div>
            <div className="mt-1 text-sm font-bold text-[#4A2511]">
              {activeCard.minangTerm}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6C79C] pb-3">
              <div>
                <span className="text-xs font-bold text-[#B45309]">
                  MATERI {activeCard.number} DARI 4
                </span>
                <h3 className="text-2xl font-bold font-display text-[#4A2511]">
                  {activeCard.title}
                </h3>
              </div>
              <BookOpen className="w-6 h-6 text-[#8B4C24] shrink-0" />
            </div>

            <p className="text-base text-[#4A2511] font-medium leading-relaxed">
              {activeCard.summary}
            </p>

            <div className="space-y-2.5 bg-[#FFFDF8] border-2 border-[#E6C79C] rounded-2xl p-4">
              <div className="text-xs font-bold text-[#8B4C24]">POIN PENTING:</div>
              {activeCard.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-[#5A2E14]">
                  <span className="font-bold text-[#D97706] shrink-0">{idx + 1}.</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl p-3.5 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#78350F]">
                <strong className="font-bold">Tahukah Kamu? </strong>
                {activeCard.funFact}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {!completedCards.includes(activeCard.id) ? (
                <button
                  onClick={handleMarkCurrentRead}
                  className="green-btn px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Tandai Kartu Ini Selesai Dibaca</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 text-sm font-bold text-[#2E7D32]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kartu informasi ini sudah kamu pelajari!</span>
                </div>
              )}

              {completedCards.length < LEVEL1_CARDS.length && (
                <button
                  onClick={() => {
                    const nextUnread =
                      LEVEL1_CARDS.find((c) => !completedCards.includes(c.id) && c.id !== activeCard.id) ||
                      LEVEL1_CARDS[(activeCard.number % LEVEL1_CARDS.length)];
                    handleSelectCard(nextUnread);
                  }}
                  className="orange-btn px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Buka Kartu Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completion Celebration & Next Level CTA */}
      <div className="game-panel rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Award className={`w-10 h-10 shrink-0 ${allRead ? 'text-[#D97706]' : 'text-[#B37B48]'}`} />
          <div>
            <h4 className="font-display font-bold text-lg text-[#4A2511]">
              {allRead
                ? 'Hebat! Semua Kartu Materi Level 1 Selesai Dibaca (+10 Poin)'
                : `Buka ${LEVEL1_CARDS.length - completedCards.length} kartu informasi lagi untuk meraih 10 poin penuh!`}
            </h4>
            <p className="text-xs sm:text-sm text-[#6E3D1E]">
              {allRead
                ? 'Kamu siap memilih bahan-bahan memasak rendang di Level 2.'
                : 'Klik setiap kartu di atas agar pengetahuanmu tentang rendang semakin lengkap.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {completedCards.length > 0 && !allRead && (
            <button
              onClick={() => {
                sound.playCorrect();
                const allIds = LEVEL1_CARDS.map((c) => c.id);
                onUpdateCompletedCards(allIds, 10);
                sound.playFanfare();
              }}
              className="cream-btn px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer whitespace-nowrap"
            >
              Tandai Semua Dibaca
            </button>
          )}

          <button
            onClick={() => {
              if (!allRead) {
                const allIds = LEVEL1_CARDS.map((c) => c.id);
                onUpdateCompletedCards(allIds, 10);
              }
              sound.playClick();
              onNextLevel();
            }}
            className="green-btn px-6 py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto whitespace-nowrap"
          >
            <span>LANJUT KE LEVEL 2</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
