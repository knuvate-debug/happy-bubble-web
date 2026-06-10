import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { s1AssetManifest } from "@/lib/s1AssetManifest";

function publicPathToFileSystemPath(publicPath: string) {
  return join(process.cwd(), "public", publicPath.replace(/^\//, ""));
}

export async function GET() {
  const assets = s1AssetManifest.map((asset) => {
    const filePath = publicPathToFileSystemPath(asset.path);
    const exists = existsSync(filePath);
    const sizeBytes = exists ? statSync(filePath).size : 0;

    return {
      ...asset,
      exists,
      sizeBytes
    };
  });

  const required = assets.filter((asset) => asset.required);
  const missingRequired = required.filter((asset) => !asset.exists);
  const ready = missingRequired.length === 0;

  return NextResponse.json({
    ok: true,
    ready,
    assets,
    summary: {
      total: assets.length,
      required: required.length,
      missingRequired: missingRequired.length,
      optional: assets.filter((asset) => !asset.required).length
    }
  });
}
