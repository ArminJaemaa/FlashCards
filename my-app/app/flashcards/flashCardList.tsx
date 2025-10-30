"use client";

import React, { useState } from "react";

export interface FlashCard {
  id: number;
  title: string;
  answer: string;
  deleted: boolean;
}

export default function FlashCardList({
  flashCards,
}: {
  flashCards: FlashCard[];
  onChanged?: () => void;
}) {
  if (!flashCards || flashCards.length === 0) return <p>Pole ühtegi</p>;

  const [shownAnswers, setShownAnswers] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    setShownAnswers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {flashCards.map((card) => {
        const shownAnswer = shownAnswers.has(card.id);
        return (
          <div
            key={card.id}
            onClick={() => toggleCard(card.id)}
            className={`bg-white shadow-lg border border-gray-200 p-6 rounded-lg cursor-pointer`}
          >
            <div
              className={`relative w-full h-40 text-center flex items-center justify-center backface-hidden`}
            >
              {shownAnswer ? card.answer : card.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}
