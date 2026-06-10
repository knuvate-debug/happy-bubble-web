import { sessions } from "./sessions";
import { buildQrTargets } from "./qrRoutes";
import { requiredS1Assets } from "./assetManifest";

export type QaSeverity = "critical" | "warning" | "info";

export type QaCheckItem = {
  id: string;
  group: string;
  title: string;
  description: string;
  severity: QaSeverity;
  expected: string;
  route?: string;
};

export function buildStaticQaChecklist(): QaCheckItem[] {
  const checks: QaCheckItem[] = [
    {
      id: "route-sessions",
      group: "Routes",
      title: "/sessions",
      description: "세션 목록 페이지가 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/sessions"
    },
    {
      id: "route-s01",
      group: "Routes",
      title: "/sessions/s01",
      description: "S1 학생 세션 페이지가 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/sessions/s01"
    },
    {
      id: "route-game-s01",
      group: "Routes",
      title: "/game/s01",
      description: "S1 Phaser SOUND_MATCH 게임 페이지가 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/game/s01"
    },
    {
      id: "route-teacher-s01",
      group: "Routes",
      title: "/teacher/s01",
      description: "S1 교사용 수업 운영 페이지가 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/teacher/s01"
    },
    {
      id: "route-parent",
      group: "Routes",
      title: "/parent",
      description: "학부모 복습 페이지가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/parent"
    },
    {
      id: "route-admin",
      group: "Routes",
      title: "/admin",
      description: "운영 관리자 페이지가 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/admin"
    },
    {
      id: "route-s02-protected",
      group: "Access Policy",
      title: "/game/s02",
      description: "S2는 public에서 Coming Soon으로 보호되어야 합니다.",
      severity: "critical",
      expected: "200 OK with Coming Soon",
      route: "/game/s02"
    },
    {
      id: "route-s02-preview",
      group: "Preview",
      title: "/game/s02?preview=true",
      description: "S2 BUILD_WORD preview가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/game/s02?preview=true"
    },
    {
      id: "route-s03-preview",
      group: "Preview",
      title: "/game/s03?preview=true",
      description: "S3 SOUND_MATCH preview가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/game/s03?preview=true"
    },
    {
      id: "route-report-s15",
      group: "Routes",
      title: "/report/s15",
      description: "S15 Smart Report placeholder가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/report/s15"
    }
  ];

  for (const asset of requiredS1Assets) {
    checks.push({
      id: `asset-${asset.webUrl}`,
      group: "Assets",
      title: asset.label,
      description: `${asset.localPath} 파일이 배포 URL에서 접근 가능해야 합니다.`,
      severity: "critical",
      expected: "200 OK",
      route: asset.webUrl
    });
  }

  for (const session of sessions) {
    const targets = buildQrTargets(session.id, session.number);
    for (const target of targets) {
      checks.push({
        id: `qr-${session.id}-${target.part}`,
        group: "QR",
        title: `S${String(session.number).padStart(2, "0")} ${target.part}`,
        description: `${target.label} production QR 대상 URL입니다.`,
        severity: session.status === "open" ? "critical" : "info",
        expected: session.status === "open" ? "200 OK" : "Coming Soon protected",
        route: target.productionPath
      });
    }
  }

  return checks;
}
