"use client";

import { useEffect, useState } from "react";
import { Select, Button } from "@mantine/core";
import { supabase } from "@/lib/supabaseClient";
import FlashCardTest from "./test";

export default function HomePage() {
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [flashCards, setFlashCards] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase.from("categories").select("id, name");
      if (data)
        setCategories(
          data.map((c) => ({ value: String(c.id), label: c.name }))
        );
    };
    loadCategories();
  }, []);

  const startTest = async () => {
    if (!selected) return;
    const { data, error } = await supabase
      .from("flashCards")
      .select("*")
      .eq("category_id", selected)
      .eq("deleted", false)
      .limit(5);
    setFlashCards(data || []);

    console.log("Loaded flashcards:", data);
    console.log("Error:", error);

    if (error) {
      alert("Error loading flashcards: " + error.message);
      return;
    }
  };

  if (flashCards.length > 0) {
    return <FlashCardTest flashCards={flashCards} />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Flashcard Test</h1>
      <Select
        placeholder="Select category"
        data={categories}
        value={selected}
        onChange={setSelected}
        className="mb-4"
      />
      <Button onClick={startTest} disabled={!selected}>
        Start Test
      </Button>
    </main>
  );
}
