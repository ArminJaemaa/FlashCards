import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("flashCard")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await req.json();
  const { data, error } = await supabase
    .from("flashCards")
    .update(body)
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase
    .from("flashCards")
    .update({ deleted: true })
    .eq("id", params.id);

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ success: true });
}
