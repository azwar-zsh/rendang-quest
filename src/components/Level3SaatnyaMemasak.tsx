import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Flame,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { LEVEL3_STEPS, CookingStepItem } from '../data/gameData';
import { CookingPotStageSVG, ChefCharacterSVG } from './GameIllustrations';
import { sound } from '../utils/sound';

interface Level3Props {
  chefVariant: 'female' | 'male';
  savedScore: number;
  onSaveScore: (score: number, correctSteps: number) => void;
  onNextLevel: () => void;
}

const INITIAL_SCRAMBLED_ORDER = [
  LEVEL3_STEPS[2], // step 3
  LEVEL3_STEPS[0], // step 1
  LEVEL3_STEPS[4], // step 5
  LEVEL3_STEPS[1], // step 2
  LEVEL3_STEPS[5], // step 6
  LEVEL3_STEPS[3]  // step 4
];

export const Level3SaatnyaMemasak: React.FC<Level3Props> = ({
  chefVariant,
  savedScore,
  onSaveScore,
  onNextLevel
}) => {
  const [steps, setSteps] = useState<CookingStepItem[]>(INITIAL_SCRAMBLED_ORDER);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [activePreviewStep, setActivePreviewStep] = useState<CookingStepItem>(LEVEL3_STEPS[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Move step up or down
  const moveStep = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChecked) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= steps.length) return;

    sound.playPop(direction === 'up');
    const updated = [...steps];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSteps(updated);
    setSelectedIndex(null);
    setActivePreviewStep(temp);
  };

  // Touch / Click to select and swap two positions
  const handleCardTouch = (index: number) => {
    if (hasChecked) {
      setActivePreviewStep(steps[index]);
      return;
    }

    if (selectedIndex === null) {
      sound.playClick();
      setSelectedIndex(index);
      setActivePreviewStep(steps[index]);
    } else if (selectedIndex === index) {
      sound.playClick();
      setSelectedIndex(null);
    } else {
      sound.playPop(true);
      const updated = [...steps];
      const temp = updated[selectedIndex];
      updated[selectedIndex] = updated[index];
      updated[index] = temp;
      setSteps(updated);
      setActivePreviewStep(temp);
      setSelectedIndex(null);
    }
  };

  const correctCount = steps.filter((step, idx) => step.correctOrder === idx + 1).length;
  const isAllCorrect = correctCount === LEVEL3_STEPS.length;
  const calculatedScore = correctCount * 5; // 6 steps * 5 points = 30 points max

  const handleCheckOrder = () => {
    setHasChecked(true);
    setSelectedIndex(null);
    onSaveScore(calculatedScore, correctCount);

    if (isAllCorrect) {
      sound.playCookingSizzle();
      setIsSimulating(true);
      setActivePreviewStep(LEVEL3_STEPS[5]);
      setTimeout(() => {
        sound.playFanfare();
      }, 350);
    } else if (correctCount >= 4) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const handleTryAgain = () => {
    sound.playClick();
    setHasChecked(false);
    setIsSimulating(false);
    setSelectedIndex(null);
  };

  const handleReshuffle = () => {
    sound.playClick();
    setHasChecked(false);
    setIsSimulating(false);
    setSelectedIndex(null);
    setSteps([...INITIAL_SCRAMBLED_ORDER]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="game-panel rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block shrink-0">
              <ChefCharacterSVG
                variant={chefVariant}
                mood={hasChecked && isAllCorrect ? 'excited' : 'happy'}
                className="w-20 h-22"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-[#8B4C24] tracking-wide">
                LEVEL 3 DARI 4 · MENYUSUN PROSES MEMASAK
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] font-display">
                Saatnya Memasak Rendang
              </h2>
              <p className="text-sm text-[#6E3D1E] mt-1">
                Susunlah <strong>6 tahapan memasak rendang</strong> dari urutan pertama (1) hingga keenam (6). Sentuh dua tahapan untuk menukar posisi atau gunakan tombol panah!
              </p>
            </div>
          </div>

          <div className="game-panel-soft rounded-2xl px-4 py-3 text-center shrink-0 w-full sm:w-auto">
            <div className="text-xs font-semibold text-[#7A421D]">Nilai Maksimal</div>
            <div className="text-xl font-bold text-[#4A2511] tabular-nums">
              30 Poin (6 Tahap)
            </div>
            {savedScore > 0 && (
              <div className="text-xs font-bold text-[#2E7D32] mt-0.5">
                Skor Terbaikmu: {savedScore}/30
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Top: Live Kuali Cooking Stage Preview (5 cols) */}
        <div className="lg:col-span-5 game-panel rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6C79C] pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#D97706]" />
              <h3 className="font-display font-bold text-lg text-[#4A2511]">
                Dapur Kuali Minang
              </h3>
            </div>
            <span className="text-xs font-bold text-[#8B4C24]">
              Simulasi Tahapan
            </span>
          </div>

          <div className="bg-[#FDF3DF] border-2 border-[#DFB17B] rounded-2xl p-4 flex flex-col items-center text-center">
            <CookingPotStageSVG
              stage={activePreviewStep.potStage}
              isAnimating={isSimulating || (hasChecked && isAllCorrect)}
              className="w-56 h-44"
            />
            <div className="mt-2 text-xs font-bold text-[#B45309]">
              TAHAP YANG DIPILIH:
            </div>
            <h4 className="font-display font-bold text-base sm:text-lg text-[#4A2511] mt-0.5">
              {activePreviewStep.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#6E3D1E] mt-1.5 leading-relaxed">
              {activePreviewStep.description}
            </p>
          </div>

          <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl p-3.5 text-xs sm:text-sm text-[#78350F]">
            <strong className="font-bold">Tips Koki: </strong>
            {activePreviewStep.culinaryTip}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {!hasChecked ? (
              <>
                <button
                  onClick={handleCheckOrder}
                  className="w-full py-3.5 px-5 rounded-2xl orange-btn font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>PERIKSA URUTAN MEMASAK</span>
                </button>
                <button
                  onClick={handleReshuffle}
                  className="w-full py-2.5 px-4 rounded-xl cream-btn font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Acak Ulang Urutan</span>
                </button>
              </>
            ) : (
              <div className="space-y-2.5">
                {!isAllCorrect && (
                  <button
                    onClick={handleTryAgain}
                    className="w-full py-3.5 px-4 rounded-2xl orange-btn font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>COBA KEMBALI (PERBAIKI POSISI)</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    sound.playClick();
                    onNextLevel();
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl green-btn font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>LANJUT KE LEVEL 4 (KUIS)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: 6 Interactive Sequencing Cards (7 cols) */}
        <div className="lg:col-span-7 game-panel rounded-3xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#4A2511]">
                Urutan Tahapan Memasak (1 sampai 6)
              </h3>
              <p className="text-xs text-[#7A421D]">
                {selectedIndex !== null
                  ? `Tahap ke-${selectedIndex + 1} dipilih! Sentuh tahapan lain untuk menukar posisi.`
                  : 'Sentuh kartu tahapan untuk memilih & menukar posisi, atau tekan panah Naik/Turun.'}
              </p>
            </div>
            <ArrowUpDown className="w-5 h-5 text-[#8B4C24]" />
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => {
              const isSelected = selectedIndex === index;
              const isCorrectSpot = step.correctOrder === index + 1;

              let cardStyle = 'bg-[#FFFDF8] border-[#D5A372]';
              if (hasChecked) {
                cardStyle = isCorrectSpot
                  ? 'bg-[#E8F5E9] border-[#2E7D32]'
                  : 'bg-[#FFEBEE] border-[#C62828]';
              } else if (isSelected) {
                cardStyle = 'bg-[#FDECC8] border-[#8B4C24] -translate-y-0.5 shadow-[0_5px_0_#6A3615]';
              }

              return (
                <div
                  key={step.id}
                  onClick={() => handleCardTouch(index)}
                  className={`rounded-2xl p-3.5 sm:p-4 border-3 transition-all flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Position Number Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl font-display font-bold text-lg flex items-center justify-center shrink-0 border-2 ${
                        hasChecked
                          ? isCorrectSpot
                            ? 'bg-[#2E7D32] text-white border-[#1B5E20]'
                            : 'bg-[#C62828] text-white border-[#7F0000]'
                          : isSelected
                          ? 'bg-[#8B4C24] text-white border-[#4A230B]'
                          : 'bg-[#F4E3C6] text-[#4A2511] border-[#9C6234]'
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="font-display font-bold text-sm sm:text-base text-[#4A2511] leading-snug">
                        {step.title}
                      </div>
                      {hasChecked ? (
                        <div
                          className={`text-xs font-bold mt-0.5 flex items-center gap-1 ${
                            isCorrectSpot ? 'text-[#2E7D32]' : 'text-[#C62828]'
                          }`}
                        >
                          {isCorrectSpot ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Urutan ke-{index + 1} Sudah Tepat (+5 Poin)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Masih salah posisi (Seharusnya urutan ke-{step.correctOrder})</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-[#7A421D] mt-0.5">
                          {isSelected
                            ? 'Klik tahap lain untuk menukar posisi dengan tahap ini'
                            : 'Sentuh untuk memilih / tukar posisi'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Up / Down Controls */}
                  {!hasChecked && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => moveStep(index, 'up', e)}
                        disabled={index === 0}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-colors ${
                          index === 0
                            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'cream-btn cursor-pointer'
                        }`}
                        title="Geser ke atas"
                        aria-label="Geser tahapan ke atas"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => moveStep(index, 'down', e)}
                        disabled={index === steps.length - 1}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-colors ${
                          index === steps.length - 1
                            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'cream-btn cursor-pointer'
                        }`}
                        title="Geser ke bawah"
                        aria-label="Geser tahapan ke bawah"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Result Banner inside Sequencing Panel */}
          {hasChecked && (
            <div
              className={`rounded-2xl p-4 border-2 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isAllCorrect
                  ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20]'
                  : 'bg-[#FFF5F5] border-[#E57373] text-[#B71C1C]'
              }`}
            >
              <div className="flex items-center gap-3">
                {isAllCorrect ? (
                  <Sparkles className="w-8 h-8 text-[#D97706] shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-[#C62828] shrink-0" />
                )}
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg">
                    {isAllCorrect
                      ? 'Masakan Rendang Matang Sempurna! Skor Penuh: 30 / 30 Poin'
                      : `Urutan Masih Belum Tepat (${correctCount}/6 Benar · Skor: ${calculatedScore}/30 Poin)`}
                  </h4>
                  <p className="text-xs sm:text-sm opacity-90">
                    {isAllCorrect
                      ? 'Seluruh tahapan dari memotong daging, menghaluskan & menumis bumbu, menuang santan, hingga mengaduk di api kecil sudah berurutan!'
                      : 'Perhatikan petunjuk urutan pada kartu yang berwarna merah, lalu tekan tombol Coba Kembali untuk memperbaikinya.'}
                  </p>
                </div>
              </div>

              {!isAllCorrect && (
                <button
                  onClick={handleTryAgain}
                  className="orange-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 cursor-pointer"
                >
                  Coba Kembali
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
