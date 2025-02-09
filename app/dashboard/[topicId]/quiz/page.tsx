"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function QuizPage({ params }: { params: { topicId: string } }) {
  const router = useRouter();
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime] = useState(Date.now());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/generate-quiz`);
        if (!response.ok) throw new Error("Failed to fetch quiz questions");
        const data = await response.json();
        setQuizQuestions(data.questions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [params.topicId]);

  const handleNextQuestion = useCallback(() => {
    if (isQuizComplete) return;
    if (currentQuestion >= quizQuestions.length - 1) {
      setIsQuizComplete(true);
      setTimeTaken(Math.floor((Date.now() - startTime) / 1000));
      return;
    }
    setSelectedOption(null);
    setCurrentQuestion((prev) => prev + 1);
    setTimer(10);
    setIsPaused(false);
  }, [currentQuestion, startTime, isQuizComplete, quizQuestions.length]);

  useEffect(() => {
    if (isQuizComplete || isPaused || quizQuestions.length === 0) return;
    if (timer <= 0) {
      handleNextQuestion();
      return;
    }
    const timeout = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timer, isQuizComplete, isPaused, handleNextQuestion, quizQuestions.length]);

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    setIsPaused(true);
    if (isCorrect) setScore((prev) => prev + 1);
    setTimeout(handleNextQuestion, 2000);
  };

  if (isQuizComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Quiz Complete!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Time Taken</p>
              <p className="text-xl font-bold">{timeTaken}s</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-xl font-bold">{score}/{quizQuestions.length}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Points</p>
              <p className="text-xl font-bold">{score}</p>
            </div>
          </div>
          <Button className="w-full" onClick={() => router.push(`/dashboard/${params.topicId}`)}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Quiz</h1>
      <div className="w-full max-w-2xl">
        <Card className="p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Question {currentQuestion + 1} of {quizQuestions.length}</h1>
            <span className="text-lg font-medium">⏳ {timer}s</span>
          </div>
          <p className="text-lg mb-4">{quizQuestions[currentQuestion]?.text || "No question available"}</p>
          <div className="space-y-3">
            {quizQuestions[currentQuestion]?.options.map((option: any) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id, option.correct)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 hover:bg-muted/50
                  ${selectedOption === option.id && option.correct ? "bg-green-500/20 border-green-500" : ""}
                  ${selectedOption === option.id && !option.correct ? "bg-red-500/20 border-red-500" : ""}`}
              >
                {option.id}. {option.text}
              </button>
            ))}
          </div>
          <div className="mt-4 text-lg font-medium">Points: {score}</div>
        </Card>
      </div>
    </div>
  );
}
