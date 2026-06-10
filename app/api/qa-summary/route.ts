import { NextResponse } from "next/server";
import { buildStaticQaChecklist } from "@/lib/qaChecklist";
import { isSupabaseConfigured } from "@/lib/supabaseServer";

export async function GET() {
  return NextResponse.json({
    ok: true,
    supabaseConfigured: isSupabaseConfigured(),
    checks: buildStaticQaChecklist(),
    generatedAt: new Date().toISOString()
  });
}
