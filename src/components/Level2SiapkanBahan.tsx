import React, { useState, useMemo } from 'react';
import {
  ShoppingBasket,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Trash2,
  HelpCircle
} from 'lucide-react';
import { LEVEL2_INGREDIENTS, IngredientItem } from '../data/gameData';
import { IngredientIllustrationSVG, ChefCharacterSVG } from './GameIllustrations';
import { sound } from '../utils/sound';

interface Level2Props {
  chefVariant: 'female' | 'male';
  savedScore: number;
  onSaveScore: (score: number, correctCount: number) => void;
  onNextLevel: () => void;
}

export const Level2SiapkanBahan: React.FC<Level2Props> = ({
  chefVariant,
  savedScore,
  onSaveScore,
  onNextLevel
}) => {
  // Shuffle ingredients once on mount so decoys are mixed naturally
  const shuffledIngredients = useMemo(() => {
    const copy = [...LEVEL2_INGREDIENTS];
    // Deterministic-friendly shuffle
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const toggleIngredient = (item: IngredientItem) => {
    if (hasChecked) return;
    if (selectedIds.includes(item.id)) {
      sound.playPop(false);
      setSelectedIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      sound.playPop(true);
      setSelectedIds((prev) => [...prev, item.id]);
    }
  };

  const removeFromBasket = (id: string) => {
    if (hasChecked) return;
    sound.playPop(false);
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const evaluation = useMemo(() => {
    const selectedItems = LEVEL2_INGREDIENTS.filter((i) => selectedIds.includes(i.id));
    const correctSelected = selectedItems.filter((i) => i.isCorrect);
    const wrongSelected = selectedItems.filter((i) => !i.isCorrect);
    const missedCorrect = LEVEL2_INGREDIENTS.filter(
      (i) => i.isCorrect && !selectedIds.includes(i.id)
    );

    // Score calculation: 10 authentic ingredients = 3 points each (30 points max).
    // Each decoy selected deducts 3 points.
    const rawPoints = correctSelected.length * 3 - wrongSelected.length * 3;
    const calculatedScore = Math.max(0, Math.min(30, rawPoints));
    const isPerfect = correctSelected.length === 10 && wrongSelected.length === 0;

    return {
      selectedItems,
      correctSelected,
      wrongSelected,
      missedCorrect,
      calculatedScore,
      isPerfect
    };
  }, [selectedIds]);

  const handleCheckIngredients = () => {
    if (selectedIds.length === 0) return;
    setHasChecked(true);
    onSaveScore(evaluation.calculatedScore, evaluation.correctSelected.length);
    if (evaluation.isPerfect) {
      sound.playFanfare();
    } else if (evaluation.calculatedScore >= 21) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setHasChecked(false);
    setSelectedIds([]);
  };

  const handleEditSelection = () => {
    sound.playClick();
    setHasChecked(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Instructions */}
      <div className="game-panel rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block shrink-0">
              <ChefCharacterSVG
                variant={chefVariant}
                mood={hasChecked && evaluation.isPerfect ? 'excited' : 'happy'}
                className="w-20 h-22"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-[#8B4C24] tracking-wide">
                LEVEL 2 DARI 4 · TANTANGAN MEMILIH BAHAN
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] font-display">
                Siapkan Bahan Rendang
              </h2>
              <p className="text-sm text-[#6E3D1E] mt-1">
                Sentuh <strong>10 bahan asli memasak rendang</strong> untuk dimasukkan ke keranjang bahan. Hati-hati, ada 6 bahan pengecoh!
              </p>
            </div>
          </div>

          <div className="game-panel-soft rounded-2xl px-4 py-3 text-center shrink-0 w-full sm:w-auto">
            <div className="text-xs font-semibold text-[#7A421D]">Isi Keranjang</div>
            <div className="text-xl font-bold text-[#4A2511] tabular-nums">
              {selectedIds.length} Bahan · Skor Maks 30
            </div>
            {savedScore > 0 && (
              <div className="text-xs font-bold text-[#2E7D32] mt-0.5">
                Skor Terbaikmu: {savedScore}/30
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Split: Ingredient Grid & Keranjang Bahan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Ingredient Grid (8 cols) */}
        <div className="lg:col-span-8 game-panel rounded-3xl p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#4A2511]">
              Meja Bahan Dapur ({shuffledIngredients.length} Pilihan)
            </h3>
            <span className="text-xs font-semibold text-[#7A421D]">
              Sentuh gambar untuk memilih / membatalkan
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {shuffledIngredients.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              let statusBorder = 'border-[#D5A372] bg-[#FFFDF8]';
              if (hasChecked) {
                if (isSelected && item.isCorrect) {
                  statusBorder = 'border-[#2E7D32] bg-[#E8F5E9]';
                } else if (isSelected && !item.isCorrect) {
                  statusBorder = 'border-[#C62828] bg-[#FFEBEE]';
                } else if (!isSelected && item.isCorrect) {
                  statusBorder = 'border-[#F59E0B] bg-[#FFFBEB]';
                }
              } else if (isSelected) {
                statusBorder = 'border-[#8B4C24] bg-[#FDECC8] -translate-y-1 shadow-[0_5px_0_#6A3615]';
              }

              return (
                <button
                  key={item.id}
                  onClick={() => toggleIngredient(item)}
                  disabled={hasChecked}
                  className={`rounded-2xl p-3 border-3 transition-all flex flex-col items-center text-center cursor-pointer min-h-[138px] justify-between ${statusBorder}`}
                >
                  <div className="w-full flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#7A421D]">
                      {isSelected ? 'Di Keranjang' : 'Pilih'}
                    </span>
                    {hasChecked && isSelected && item.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    )}
                    {hasChecked && isSelected && !item.isCorrect && (
                      <XCircle className="w-4 h-4 text-[#C62828]" />
                    )}
                  </div>

                  <IngredientIllustrationSVG id={item.id} className="w-16 h-16 my-1" />

                  <div>
                    <div className="font-display font-bold text-sm text-[#4A2511] leading-tight">
                      {item.name}
                    </div>
                    {hasChecked && (
                      <div
                        className={`text-[11px] font-bold mt-0.5 ${
                          item.isCorrect ? 'text-[#2E7D32]' : 'text-[#C62828]'
                        }`}
                      >
                        {item.isCorrect ? 'Bahan Rendang' : 'Pengecoh'}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keranjang Bahan (4 cols) */}
        <div className="lg:col-span-4 game-panel rounded-3xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6C79C] pb-3">
            <div className="flex items-center gap-2.5">
              <ShoppingBasket className="w-6 h-6 text-[#8B4C24]" />
              <div>
                <h3 className="font-display font-bold text-lg text-[#4A2511]">
                  Keranjang Bahan
                </h3>
                <p className="text-xs text-[#7A421D]">
                  Target: 10 Bahan Asli Rendang
                </p>
              </div>
            </div>
            <span className="font-display font-bold text-lg text-[#8B4C24] tabular-nums">
              {selectedIds.length}/10
            </span>
          </div>

          {selectedIds.length === 0 ? (
            <div className="bg-[#FDF3DF] border-2 border-dashed border-[#C68B59] rounded-2xl p-6 text-center space-y-2">
              <ShoppingBasket className="w-10 h-10 text-[#B37B48] mx-auto opacity-75" />
              <p className="text-sm font-semibold text-[#6E3D1E]">
                Keranjang masih kosong
              </p>
              <p className="text-xs text-[#8B4C24]">
                Sentuh gambar bahan di sebelah kiri untuk memasukkannya ke keranjang.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {evaluation.selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 bg-[#FFFDF8] border-2 border-[#D5A372] rounded-xl px-3 py-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IngredientIllustrationSVG id={item.id} className="w-9 h-9 shrink-0" />
                    <div className="truncate">
                      <div className="font-bold text-sm text-[#4A2511] truncate">
                        {item.name}
                      </div>
                      {hasChecked && (
                        <div
                          className={`text-[11px] font-bold ${
                            item.isCorrect ? 'text-[#2E7D32]' : 'text-[#C62828]'
                          }`}
                        >
                          {item.isCorrect ? 'Benar (+3 Poin)' : 'Bahan Pengecoh (-3 Poin)'}
                        </div>
                      )}
                    </div>
                  </div>
                  {!hasChecked && (
                    <button
                      onClick={() => removeFromBasket(item.id)}
                      className="text-xs font-bold text-[#C62828] hover:bg-[#FFEBEE] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Batalkan bahan ini"
                    >
                      Batal
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons inside Basket */}
          <div className="pt-2 space-y-2.5">
            {!hasChecked ? (
              <>
                <button
                  onClick={handleCheckIngredients}
                  disabled={selectedIds.length === 0}
                  className={`w-full py-3.5 px-5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer ${
                    selectedIds.length > 0
                      ? 'orange-btn'
                      : 'bg-[#E5D3BC] text-[#8D6E63] border-2 border-[#C68B59] opacity-60 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>PERIKSA BAHAN ({selectedIds.length})</span>
                </button>

                {selectedIds.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 px-4 rounded-xl cream-btn font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Kosongkan Keranjang</span>
                  </button>
                )}
              </>
            ) : (
              <div className="space-y-2.5">
                <button
                  onClick={handleEditSelection}
                  className="w-full py-3 px-4 rounded-2xl cream-btn font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ubah Pilihan Bahan</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNextLevel();
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl green-btn font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>LANJUT KE LEVEL 3</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Verification Feedback Panel */}
      {hasChecked && (
        <div className="game-panel rounded-3xl p-5 sm:p-6 space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6C79C] pb-4">
            <div className="flex items-center gap-3">
              {evaluation.isPerfect ? (
                <Sparkles className="w-9 h-9 text-[#D97706] shrink-0" />
              ) : (
                <HelpCircle className="w-9 h-9 text-[#8B4C24] shrink-0" />
              )}
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#4A2511]">
                  {evaluation.isPerfect
                    ? 'Sempurna! Semua 10 Bahan Rendang Tepat!'
                    : `Hasil Pemeriksaan Keranjang: Skor ${evaluation.calculatedScore} dari 30 Poin`}
                </h3>
                <p className="text-sm text-[#6E3D1E]">
                  Bahan Benar Terpilih: <strong>{evaluation.correctSelected.length}/10</strong> · Bahan Pengecoh Terpilih: <strong>{evaluation.wrongSelected.length}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleEditSelection}
                className="cream-btn px-4 py-2.5 rounded-xl font-bold text-sm cursor-pointer"
              >
                Perbaiki Pilihan
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="green-btn px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lanjut Level 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Explanation of Selected & Missed Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selected items feedback */}
            <div className="bg-[#FFFDF8] border-2 border-[#D5A372] rounded-2xl p-4 space-y-3">
              <h4 className="font-display font-bold text-base text-[#4A2511]">
                Penjelasan Bahan yang Kamu Pilih ({evaluation.selectedItems.length})
              </h4>
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {evaluation.selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border text-xs sm:text-sm ${
                      item.isCorrect
                        ? 'bg-[#F4FBF1] border-[#81C784] text-[#1B5E20]'
                        : 'bg-[#FFF5F5] border-[#E57373] text-[#B71C1C]'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>
                        {item.name} {item.minangName ? `(${item.minangName})` : ''}
                      </span>
                      <span>{item.isCorrect ? 'BENAR' : 'SALAH (PENGECOH)'}</span>
                    </div>
                    <p className="mt-1 text-xs opacity-90">{item.roleExplanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Missed authentic ingredients */}
            <div className="bg-[#FFFDF8] border-2 border-[#D5A372] rounded-2xl p-4 space-y-3">
              <h4 className="font-display font-bold text-base text-[#4A2511]">
                {evaluation.missedCorrect.length === 0
                  ? 'Semua 10 Bahan Utama & Rempah Sudah Lengkap!'
                  : `Bahan Rendang yang Belum Kamu Pilih (${evaluation.missedCorrect.length})`}
              </h4>
              {evaluation.missedCorrect.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#F59E0B] text-sm text-[#78350F]">
                  Kamu berhasil mengenali seluruh bahan utama (Daging Sapi & Santan), bumbu halus (Cabai Merah, Bawang Merah, Bawang Putih, Jahe), dan rempah aromatik (Lengkuas, Serai, Daun Jeruk, Daun Kunyit)!
                </div>
              ) : (
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {evaluation.missedCorrect.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border bg-[#FFFBEB] border-[#FCD34D] text-[#78350F] text-xs sm:text-sm"
                    >
                      <div className="font-bold">
                        {item.name} ({item.category})
                      </div>
                      <p className="mt-1 text-xs">{item.roleExplanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
