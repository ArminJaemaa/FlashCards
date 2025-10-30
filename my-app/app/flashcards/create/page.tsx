"use client";

import { Button, Group, Select, TextInput } from "@mantine/core";
import classes from "./ContainedInput.module.css";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function FlashCardForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");
      if (!error && data) {
        setCategories(
          data.map((category) => ({
            label: category.name,
            value: String(category.id),
          }))
        );
      }
    }
    fetchCategories();
  }, []);

  const form = useForm({
    initialValues: {
      title: "",
      answer: "",
      category_id: "",
    },
    validate: {
      //title: (value) => (/^\S+@\S+$/.test(value) ? null : ""),
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    const payload = { ...values, category_id: Number(values.category_id) };
    const res = await fetch("/flashcards/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    router.refresh();
  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Küsimus"
        placeholder="Lisa siia küsimus"
        classNames={classes}
        {...form.getInputProps("title")}
      />
      <TextInput
        label="Vastus"
        placeholder="Lisa siia kirjeldus"
        classNames={classes}
        {...form.getInputProps("answer")}
      />
      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={categories}
        label="kategooria"
        classNames={classes}
        {...form.getInputProps("category_id")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Lisa</Button>
      </Group>
    </form>
  );
}
