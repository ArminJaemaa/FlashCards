"use client";
import Link from "next/link";
import { Card, Group, Text, Button } from "@mantine/core";

export default function CategoryList({ categories }: { categories: any[] }) {
  if (!categories.length) return <Text>Pole kategooriaid</Text>;

  return (
    <div className="p-5 flex flex-col gap-4 max-w-3xl mx-auto">
      {categories.map((cat) => (
        <Card key={cat.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Group>
            <Text fw={600}>{cat.name}</Text>
            <Link href={`/flashcards/category/${cat.id}`}>
              <Button size="xs">View Cards</Button>
            </Link>
          </Group>
        </Card>
      ))}
    </div>
  );
}
