"use client";

import React from "react";

export interface FlashCard {
  id: number;
  title: string;
  description: string;
  deleted: boolean;
}

export default function FlashCardList({
  flashCards,
}: {
  flashCards: FlashCard[];
  onChanged?: () => void;
}) {
  if (!flashCards || flashCards.length === 0) return <p>Pole ühtegi</p>;

  return (
    <ul>
      {flashCards.map((card) => (
        <li
          key={card.id}
          className="bg-white shadow-sm border border-gray-200 p-4 rounded-lg flex justify-between items-start"
        >
          {card.title}
        </li>
      ))}
    </ul>
  );
}
