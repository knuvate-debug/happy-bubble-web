import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const anonymousId = searchParams.get("anonymousId");

  if (!anonymousId) {
    return NextResponse.json({ ok: false, error: "anonymousId is required" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      configured: false,
      progress: []
    });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      progress: []
    });
  }

  const { data, error } = await supabase
    .from("session_progress")
    .select("*")
    .eq("anonymous_id", anonymousId)
    .order("session_id", { ascending: true });

  if (error) {
    return NextResponse.json({
      ok: true,
      configured: true,
      progress: [],
      warning: "Could not load progress"
    });
  }

  return NextResponse.json({
    ok: true,
    configured: true,
    progress: data ?? []
  });
}
