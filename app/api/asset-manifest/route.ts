import { NextResponse } from "next/server";
import { buildAssetManifest, requiredS1Assets } from "@/lib/assetManifest";

export async function GET() {
  return NextResponse.json({
    ok: true,
    assets: buildAssetManifest(),
    requiredS1Assets
  });
}
