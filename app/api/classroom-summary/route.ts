import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      configured: false,
      classroomEvents: []
    });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      classroomEvents: []
    });
  }

  const { data, error } = await supabase
    .from("learning_events")
    .select("*")
    .eq("activity_type", "classroom")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({
      ok: true,
      configured: true,
      classroomEvents: [],
      warning: "Could not load classroom events"
    });
  }

  return NextResponse.json({
    ok: true,
    configured: true,
    classroomEvents: data ?? []
  });
}
