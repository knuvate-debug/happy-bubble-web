# Happy Bubble Web MVP

Happy Bubble English WebLearning MVP입니다.

## 구현 상태

```txt
S1 = open
S2~S15 = coming soon
/game/s01 = 실제 React 기반 Sound Match 게임 작동
```

## 주요 라우트

```txt
/sessions
/sessions/s01
/theater/s01
/game/s01
/singing/s01
/mission/s01
/teacher/s01
/parent
/report/s15
/admin
```

## 실행

```bash
npm install
npm run dev
```

## 빌드 확인

```bash
npm run build
```

## 배포

`DEPLOYMENT.md`를 확인하세요.

## 실제 콘텐츠 파일

`ASSET_MANIFEST.md`를 확인하세요.


## Supabase

`SUPABASE_SETUP.md`를 확인하세요.

기록되는 이벤트 예:

```txt
game_start
listen_click
choice_tap
round_correct
round_wrong
game_complete
theater_open
singing_open
mission_open
```


## Phaser S1 Game

이 버전은 `/game/s01`이 Phaser 기반 SOUND_MATCH 게임으로 구현되어 있습니다.

```txt
game/data/bubbleGameSessions.ts
components/PhaserSoundMatchGame.tsx
```


## GameRouter

이 버전은 공통 GameRouter를 사용합니다.

```txt
app/game/[sessionId]/page.tsx
components/GameRouter.tsx
game/data/bubbleGameSessions.ts
```

현재 `/game/s01`은 Phaser SOUND_MATCH로 작동하고, S2~S15는 coming soon 정책으로 보호됩니다.


## S2 BUILD_WORD Phaser

이 버전은 S2 BUILD_WORD 템플릿을 Phaser로 구현했습니다.

```txt
/game/s02
→ public에서는 Coming Soon

/game/s02?preview=true
→ 내부 preview에서 BUILD_WORD 실행
```


## S3 SOUND_MATCH Preview

이 버전은 S3 데이터를 Phaser SOUND_MATCH 엔진에 연결했습니다.

```txt
/game/s03
→ public Coming Soon

/game/s03?preview=true
→ 내부 preview에서 SOUND_MATCH 실행
```

Teacher preview:

```txt
/teacher/s03?preview=true
```


## Admin Supabase Dashboard

이 버전은 `/admin`에서 Supabase 기록을 확인할 수 있습니다.

```txt
/api/admin-summary
components/AdminDashboard.tsx
```

확인 가능한 기록:

```txt
learning_events
session_progress
```


## QR Admin Panel

이 버전은 `/admin`에서 QR Preview / Production URL을 확인할 수 있습니다.

```txt
lib/qrRoutes.ts
components/QrAdminPanel.tsx
```

QR 규칙:

```txt
P1 /theater/sXX
P2 /game/sXX
P3 /singing/sXX
P4 /mission/sXX
S15 P4 /report/s15
```
