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
  expectedText?: string;
  forbiddenText?: string;
  method?: "HEAD" | "GET";
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
      id: "route-game-s01-pack",
      group: "Routes",
      title: "/game/s01",
      description: "S1 Game Pack landing이 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/game/s01"
    },
    {
      id: "route-game-s01-sound-match",
      group: "Routes",
      title: "/game/s01/sound-match",
      description: "S1 Sound Match 게임이 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/game/s01/sound-match"
    },
    {
      id: "route-game-s01-bubble-pop",
      group: "Routes",
      title: "/game/s01/bubble-pop",
      description: "S1 Bubble Pop 게임이 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/game/s01/bubble-pop"
    },
    {
      id: "route-game-s01-build-sat",
      group: "Routes",
      title: "/game/s01/build-sat",
      description: "S1 Build SAT 게임이 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/game/s01/build-sat"
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
      id: "route-classroom-s01",
      group: "Routes",
      title: "/classroom/s01",
      description: "S1 Classroom Mode / Web PPT deck이 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/classroom/s01"
    },
    {
      id: "route-classroom-presenter-native",
      group: "Routes",
      title: "/classroom/s01/presenter?mode=native",
      description: "Native Teacher Mode Presenter가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/classroom/s01/presenter?mode=native"
    },
    {
      id: "route-classroom-presenter-korean",
      group: "Routes",
      title: "/classroom/s01/presenter?mode=korean",
      description: "Korean Teacher Mode Presenter가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/classroom/s01/presenter?mode=korean"
    },
    {
      id: "route-classroom-presenter-bilingual",
      group: "Routes",
      title: "/classroom/s01/presenter?mode=bilingual",
      description: "Bilingual Support Mode Presenter가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/classroom/s01/presenter?mode=bilingual"
    },
    {
      id: "route-classroom-presenter-substitute",
      group: "Routes",
      title: "/classroom/s01/presenter?mode=substitute",
      description: "Substitute Teacher Mode Presenter가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/classroom/s01/presenter?mode=substitute"
    },
    {
      id: "route-classroom-s01-presenter",
      group: "Routes",
      title: "/classroom/s01/presenter",
      description: "S1 Presenter View가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/classroom/s01/presenter"
    },
    {
      id: "route-classroom-s01-overview",
      group: "Routes",
      title: "/classroom/s01/overview",
      description: "S1 Slide Overview가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/classroom/s01/overview"
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
      id: "api-classroom-summary",
      group: "Routes",
      title: "/api/classroom-summary",
      description: "Classroom 이벤트 조회 API가 응답해야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/api/classroom-summary"
    },
    {
      id: "api-s1-teaching-ready",
      group: "Routes",
      title: "/api/s1-teaching-ready",
      description: "S1 Teaching Ready API가 응답해야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/api/s1-teaching-ready"
    },
    {
      id: "route-teacher-s1-ready",
      group: "Routes",
      title: "/teacher/s1-ready",
      description: "교사용 S1 Teaching Ready 화면이 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/teacher/s1-ready"
    },
    {
      id: "route-admin-s1-ready",
      group: "Routes",
      title: "/admin/s1-ready",
      description: "관리자용 S1 Teaching Ready 화면이 열려야 합니다.",
      severity: "critical",
      expected: "200 OK",
      route: "/admin/s1-ready"
    },
    {
      id: "api-game-report",
      group: "Routes",
      title: "/api/game-report?sessionId=s01",
      description: "Game Report API가 응답해야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/api/game-report?sessionId=s01"
    },
    {
      id: "route-teacher-game-report-s01",
      group: "Routes",
      title: "/teacher/game-report/s01",
      description: "교사용 S1 Game Report가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/teacher/game-report/s01"
    },
    {
      id: "route-admin-game-report",
      group: "Routes",
      title: "/admin/game-report",
      description: "Admin Game Report가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/admin/game-report"
    },
    {
      id: "api-classroom-report",
      group: "Routes",
      title: "/api/classroom-report?sessionId=s01",
      description: "Classroom Report API가 응답해야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/api/classroom-report?sessionId=s01"
    },
    {
      id: "route-teacher-report-s01",
      group: "Routes",
      title: "/teacher/report/s01",
      description: "교사용 S1 Classroom Report가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/teacher/report/s01"
    },
    {
      id: "route-admin-classroom-report",
      group: "Routes",
      title: "/admin/classroom-report",
      description: "Admin Classroom Report가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/admin/classroom-report"
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
      route: "/game/s02",
      expectedText: "Coming Soon",
      method: "GET"
    },
    {
      id: "route-s02-preview",
      group: "Preview",
      title: "/game/s02?preview=true",
      description: "S2 BUILD_WORD preview가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/game/s02?preview=true",
      forbiddenText: "Coming Soon",
      method: "GET"
    },
    {
      id: "route-s03-preview",
      group: "Preview",
      title: "/game/s03?preview=true",
      description: "S3 SOUND_MATCH preview가 열려야 합니다.",
      severity: "warning",
      expected: "200 OK",
      route: "/game/s03?preview=true",
      forbiddenText: "Coming Soon",
      method: "GET"
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
        route: target.productionPath,
        expectedText: session.status === "open" ? undefined : "Coming Soon",
        method: session.status === "open" ? "HEAD" : "GET"
      });
    }
  }

  return checks;
}
