import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { data: cards, error } = await supabase
    .from("flashCards")
    .select("*")
    .eq("deleted", false)
    .order("created_at", { ascending: false });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }));
  }
  return (
    new Response(JSON.stringify(cards ?? [])),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { title, answer, category_id } = body;

    const { error } = await supabase
      .from("flashCards")
      .insert([{ title, answer, category_id }])
      .select();

    if (error) {
      console.error(error);
      return Response.json(
        { error: error.message, details: error },
        { status: 400 }
      );
    }

    return Response.json({ status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
