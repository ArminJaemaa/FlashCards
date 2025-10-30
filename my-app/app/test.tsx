"use client";

import React, { useState } from "react";
import { TextInput, Button, Card, Text, Stack, Alert } from "@mantine/core";
import { supabase } from "@/lib/supabaseClient";

interface FlashCard {
  id: number;
  title: string;
  answer: string;
}

export default function FlashCardTest({
  flashCards,
}: {
  flashCards: FlashCard[];
}) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const handleSubmit = async () => {
    const card = flashCards[current];
    const correct =
      input.trim().toLowerCase() === card.answer.trim().toLowerCase();

    await supabase.from("stats").insert({
      flashCard_id: card.id,
      correct,
      attempted_at: new Date().toISOString(),
    });

    setFeedback(correct ? "Õige" : `Vale  Õige vastus: ${card.answer}`);

    setTimeout(() => {
      setFeedback(null);
      setInput("");
      if (current + 1 < flashCards.length) setCurrent((c) => c + 1);
      else setFinished(true);
    }, 1500);
  };

  if (finished) return <Alert title="Done!">Test complete 🎉</Alert>;

  const card = flashCards[current];

  return (
    <Card shadow="sm" radius="md" p="lg" withBorder>
      <Stack>
        <Text fw={700} size="lg" ta="center">
          {card.title}
        </Text>
        <TextInput
          placeholder="Type your answer..."
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button onClick={handleSubmit}>Submit</Button>
        {feedback && <Alert>{feedback}</Alert>}
      </Stack>
    </Card>
  );
}
