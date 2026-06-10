import { existsSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { s1RequiredAssets, s1TeachingReadyRoutes } from "@/lib/s1TeachingReady";

export async function GET() {
  const assets = s1RequiredAssets.map((item) => ({
    ...item,
    exists: item.filePath ? existsSync(join(process.cwd(), item.filePath)) : false
  }));

  const missingRequiredAssets = assets.filter((item) => item.required && !item.exists);

  return NextResponse.json({
    ok: true,
    sessionId: "s01",
    ready: missingRequiredAssets.length === 0,
    assets,
    routes: s1TeachingReadyRoutes,
    summary: {
      requiredAssets: assets.length,
      missingRequiredAssets: missingRequiredAssets.length,
      routeChecks: s1TeachingReadyRoutes.length
    }
  });
}
