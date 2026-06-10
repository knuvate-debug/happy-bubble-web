import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const anonymousId = searchParams.get("anonymousId");
  const sessionId = searchParams.get("sessionId");

  if (!anonymousId || !sessionId) {
    return NextResponse.json(
      { ok: false, error: "anonymousId and sessionId are required" },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, configured: false, progress: null });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: true, configured: false, progress: null });
  }

  const { data, error } = await supabase
    .from("session_progress")
    .select("*")
    .eq("anonymous_id", anonymousId)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: true, configured: true, progress: null });
  }

  return NextResponse.json({ ok: true, configured: true, progress: data });
}
