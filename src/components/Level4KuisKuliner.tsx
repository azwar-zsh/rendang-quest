import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { LEVEL4_QUIZ } from '../data/gameData';
import { ChefCharacterSVG, RendangDishSVG } from './GameIllustrations';
import { sound } from '../utils/sound';

interface Level4Props {
  chefVariant: 'female' | 'male';
  onFinishQuiz: (score: number, correctAnswers: number) => void;
}

export const Level4KuisKuliner: React.FC<Level4Props> = ({
  chefVariant,
  onFinishQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answersRecord, setAnswersRecord] = useState<
    { questionId: number; selected: number; isCorrect: boolean }[]
  >([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentQuestion = LEVEL4_QUIZ[currentIndex];
  const optionLabels = ['A', 'B', 'C'];

  const handleSelectOption = (optionIdx: number) => {
    if (selectedOption !== null) return; // already answered current question
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === currentQuestion.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setAnswersRecord((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: optionIdx,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 < LEVEL4_QUIZ.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
      sound.playFanfare();
    }
  };

  const handleRetryQuiz = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswersRecord([]);
    setQuizCompleted(false);
  };

  const totalCorrect = answersRecord.filter((a) => a.isCorrect).length;
  const totalScore = totalCorrect * 6; // 5 questions * 6 points = 30 points max

  if (quizCompleted) {
    return (
      <div className="game-panel rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto text-center space-y-6">
        <div className="flex flex-col items-center">
          <RendangDishSVG className="w-48 h-34" />
          <div className="text-xs font-bold text-[#8B4C24] tracking-wide mt-2">
            LEVEL 4 SELESAI · RINGKASAN KUIS KULINER
          </div>
          <h2 className="font-display font-bold text-3xl text-[#4A2511] mt-1">
            Kuis Kuliner Selesai!
          </h2>
          <p className="text-sm sm:text-base text-[#6E3D1E] mt-1 max-w-lg">
            Kamu telah menjawab seluruh 5 pertanyaan kuis seputar sejarah, bahan, santan, rempah, dan teknik memasak rendang.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="game-panel-soft rounded-2xl p-4">
            <div className="text-xs font-bold text-[#7A421D]">Jawaban Benar</div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-[#2E7D32] tabular-nums mt-1">
              {totalCorrect} / {LEVEL4_QUIZ.length}
            </div>
          </div>
          <div className="game-panel-soft rounded-2xl p-4">
            <div className="text-xs font-bold text-[#7A421D]">Skor Level 4</div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-[#D97706] tabular-nums mt-1">
              {totalScore} / 30 Poin
            </div>
          </div>
        </div>

        {/* Review list */}
        <div className="text-left space-y-2.5 bg-[#FFFDF8] border-2 border-[#D5A372] rounded-2xl p-4">
          <div className="text-xs font-bold text-[#8B4C24]">RINGKASAN JAWABANMU:</div>
          {LEVEL4_QUIZ.map((q, idx) => {
            const rec = answersRecord[idx];
            const ok = rec?.isCorrect;
            return (
              <div
                key={q.id}
                className="flex items-start justify-between gap-3 text-xs sm:text-sm border-b last:border-b-0 border-[#EFE0C6] pb-2 last:pb-0"
              >
                <div>
                  <span className="font-bold text-[#4A2511]">
                    {idx + 1}. {q.topic}:
                  </span>{' '}
                  <span className="text-[#6E3D1E]">{q.options[q.correctIndex]}</span>
                </div>
                <span
                  className={`font-bold shrink-0 ${
                    ok ? 'text-[#2E7D32]' : 'text-[#C62828]'
                  }`}
                >
                  {ok ? 'Benar (+6)' : 'Salah (0)'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRetryQuiz}
            className="cream-btn px-5 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Kuis Level 4</span>
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              onFinishQuiz(totalScore, totalCorrect);
            }}
            className="green-btn px-7 py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
          >
            <Award className="w-5 h-5" />
            <span>LIHAT HASIL AKHIR & LENCANA</span>
          </button>
        </div>
      </div>
    );
  }

  const isAnswered = selectedOption !== null;
  const isCurrentCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Quiz Top Header */}
      <div className="game-panel rounded-3xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block shrink-0">
              <ChefCharacterSVG
                variant={chefVariant}
                mood={isAnswered ? (isCurrentCorrect ? 'excited' : 'thinking') : 'happy'}
                className="w-20 h-22"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-[#8B4C24] tracking-wide">
                LEVEL 4 DARI 4 · KUIS KULINER RENDANG
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] font-display">
                Uji Wawasan Kulinermu!
              </h2>
              <p className="text-sm text-[#6E3D1E] mt-1">
                Pilih satu jawaban yang paling tepat pada setiap pertanyaan. Setiap jawaban benar bernilai 6 poin!
              </p>
            </div>
          </div>

          <div className="game-panel-soft rounded-2xl px-4 py-3 text-center shrink-0 w-full sm:w-auto">
            <div className="text-xs font-semibold text-[#7A421D]">
              Pertanyaan {currentIndex + 1} / {LEVEL4_QUIZ.length}
            </div>
            <div className="text-xl font-bold text-[#4A2511] tabular-nums">
              Skor Kuis: {totalScore} / 30
            </div>
          </div>
        </div>
      </div>

      {/* Active Question Card */}
      <div className="game-panel rounded-3xl p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between gap-2 border-b border-[#E6C79C] pb-3">
          <span className="text-xs sm:text-sm font-bold text-[#B45309]">
            TOPIK: {currentQuestion.topic.toUpperCase()}
          </span>
          <span className="text-xs font-bold text-[#7A421D] tabular-nums">
            Soal {currentIndex + 1} dari {LEVEL4_QUIZ.length}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl sm:text-2xl text-[#4A2511] leading-snug">
          {currentQuestion.question}
        </h3>

        {/* 3 Multiple Choice Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((optionText, idx) => {
            const isPicked = selectedOption === idx;
            const isRightAnswer = idx === currentQuestion.correctIndex;

            let optionClasses =
              'bg-[#FFFDF8] border-[#D5A372] hover:border-[#8B4C24] hover:bg-[#FFF5E0] text-[#4A2511]';
            if (isAnswered) {
              if (isRightAnswer) {
                optionClasses = 'bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20] shadow-[0_4px_0_#1B5E20]';
              } else if (isPicked && !isRightAnswer) {
                optionClasses = 'bg-[#FFEBEE] border-[#C62828] text-[#B71C1C]';
              } else {
                optionClasses = 'bg-[#FAF3E6] border-[#DFC8A9] text-[#8C6D53] opacity-75';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left rounded-2xl p-4 border-3 transition-all flex items-center justify-between gap-3 cursor-pointer ${optionClasses}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-10 h-10 rounded-xl font-display font-bold text-base flex items-center justify-center shrink-0 border-2 ${
                      isAnswered && isRightAnswer
                        ? 'bg-[#2E7D32] text-white border-[#1B5E20]'
                        : isAnswered && isPicked && !isRightAnswer
                        ? 'bg-[#C62828] text-white border-[#7F0000]'
                        : 'bg-[#F4E3C6] text-[#4A2511] border-[#9C6234]'
                    }`}
                  >
                    {optionLabels[idx]}
                  </span>
                  <span className="font-semibold text-sm sm:text-base leading-snug">
                    {optionText}
                  </span>
                </div>

                {isAnswered && isRightAnswer && (
                  <CheckCircle2 className="w-6 h-6 text-[#2E7D32] shrink-0" />
                )}
                {isAnswered && isPicked && !isRightAnswer && (
                  <XCircle className="w-6 h-6 text-[#C62828] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box after choosing an option */}
        {isAnswered && (
          <div
            className={`rounded-2xl p-4 border-2 space-y-3 ${
              isCurrentCorrect
                ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20]'
                : 'bg-[#FFF5F5] border-[#E57373] text-[#B71C1C]'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCurrentCorrect ? (
                <Sparkles className="w-6 h-6 text-[#2E7D32] shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-6 h-6 text-[#C62828] shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-display font-bold text-base sm:text-lg">
                  {isCurrentCorrect
                    ? 'Jawaban Kamu BENAR! (+6 Poin)'
                    : 'Jawaban Kamu Kurang Tepat (0 Poin)'}
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleNextQuestion}
                className="green-btn px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {currentIndex + 1 < LEVEL4_QUIZ.length
                    ? 'Pertanyaan Berikutnya'
                    : 'Selesaikan Kuis & Lihat Skor'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
