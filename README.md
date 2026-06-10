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


## Asset Admin Panel

이 버전은 `/admin`에서 실제 콘텐츠 파일 접근 여부를 확인할 수 있습니다.

```txt
components/AssetAdminPanel.tsx
app/api/asset-manifest/route.ts
lib/assetManifest.ts
```

S1 필수 파일 검수:

```txt
/admin → Asset Check → Check S1 Assets
```


## Launch QA Page

이 버전은 `/admin/qa`에서 런칭 전 QA 점검을 실행할 수 있습니다.

```txt
/admin/qa
```

점검 항목:

```txt
Routes
Access Policy
Preview
Assets
QR
Supabase configured
```


## Build Fix Package

이 버전은 Launch QA 패키지의 빌드 전 안정화 수정본입니다.

```txt
BUILD_FIX_NOTES.md
SOURCE_AUDIT_RESULT.md
```

핵심 수정:

```txt
TSX literal newline 정리
/admin/qa Coming Soon 보호 검사 강화
preview route 검사 강화
```


## UI Design System Package

이 버전은 Child / Teacher / Admin 모드별 UI 구조를 개선한 패키지입니다.

```txt
components/ui/*
UI_DESIGN_SYSTEM_NOTES.md
UI_TEST_CHECKLIST.md
```

개선된 페이지:

```txt
/sessions
/sessions/s01
/teacher/s01
/teacher/[sessionId]
/admin
/admin/qa
```


## Game & Parent Polish Package

이 버전은 Phaser game frame과 Parent Mode를 개선했습니다.

```txt
GAME_PARENT_POLISH_NOTES.md
GAME_PARENT_POLISH_CHECKLIST.md
```

확인 URL:

```txt
/game/s01
/game/s02?preview=true
/game/s03?preview=true
/parent
```


## Bubble Journey UI Package

이 버전은 Student Mode를 HBE 고유의 Bubble Journey Map 구조로 변경했습니다.

```txt
components/student/BubbleJourneyMap.tsx
components/student/BubbleNode.tsx
components/student/TodayBubbleHero.tsx
components/student/ActivityBubbleGrid.tsx
components/student/BubbleStatusLegend.tsx
```

확인 URL:

```txt
/sessions
/sessions/s01
```

외부 이미지 파일 없이 CSS bubble shapes로 구현했습니다.


## Classroom Mode / Web PPT Mode

이 버전은 `/classroom/s01` 웹 슬라이드 수업 모드를 추가했습니다.

```txt
/classroom/s01
```

추가 파일:

```txt
lib/classroomSlides.ts
components/classroom/*
app/classroom/s01/page.tsx
```

확인:

```txt
/teacher/s01 → Open Classroom Mode
/classroom/s01
```


## Classroom Presenter Package

이 버전은 Classroom Mode에 Presenter View, Slide Overview, Class Timer를 추가했습니다.

```txt
/classroom/s01/presenter
/classroom/s01/overview
```

교사용 수업 운영:

```txt
/classroom/s01
→ 학생/프로젝터용

/classroom/s01/presenter
→ 교사용 진행 화면
```


## Classroom Tracking Package

이 버전은 Classroom Mode에 Supabase 이벤트 기록을 추가했습니다.

```txt
classroom_open
classroom_presenter_open
classroom_overview_open
classroom_slide_view
classroom_next
classroom_prev
classroom_complete
classroom_timer_start
classroom_timer_pause
classroom_timer_reset
```

확인:

```txt
/classroom/s01
/classroom/s01/presenter
/admin
/api/classroom-summary
```


## Classroom Report Package

이 버전은 Classroom Tracking 데이터를 요약하는 수업 리포트 화면을 추가했습니다.

```txt
/teacher/report/s01
/admin/classroom-report
/api/classroom-report?sessionId=s01
```

리포트 항목:

```txt
진행률
슬라이드 조회 수
Next / Back 이동 수
Complete 기록
Timer 기록
최근 Classroom 이벤트
```


## Instructor Mode Package

이 버전은 Classroom/Presenter에 Instructor Mode Layer를 추가했습니다.

```txt
native
korean
bilingual
substitute
```

확인 URL:

```txt
/teacher/s01
/classroom/s01/presenter?mode=native
/classroom/s01/presenter?mode=korean
/classroom/s01/presenter?mode=bilingual
/classroom/s01/presenter?mode=substitute
/teacher/report/s01
```


## Bubble Game Pack Package

이 버전은 S1 Bubble Game을 Game Pack 구조로 확장했습니다.

```txt
/game/s01
/game/s01/sound-match
/game/s01/bubble-pop
/game/s01/build-sat
```

S1 Game Pack:

```txt
1. Sound Match
2. Bubble Pop
3. Build SAT
```


## Game Report Package

이 버전은 S1 Game Pack 결과를 Teacher / Parent / Admin 리포트로 연결했습니다.

```txt
/api/game-report?sessionId=s01
/teacher/game-report/s01
/admin/game-report
/parent
```

요약:

```txt
Game Pack 진행률
게임별 완료 수
게임별 정답/오답
게임별 정확도
최근 게임 이벤트
```


## MVP 23 Stabilization Package

이 버전은 MVP 22까지의 기능을 통합 안정화하고 점검 스크립트를 추가했습니다.

```txt
npm run audit:hbe:source
npm run audit:hbe:routes
npm run audit:hbe:assets
npm run audit:hbe
```

중요 문서:

```txt
MVP23_STABILIZATION_NOTES.md
MVP23_ROUTE_MATRIX.md
MVP23_PRE_DEPLOY_CHECKLIST.md
MVP23_KNOWN_LIMITS.md
```


## MVP 24 · S1 Teaching Ready Package

이 버전은 Session 1을 실제 수업 가능 상태로 마감하기 위한 Teaching Ready 화면과 체크리스트를 추가했습니다.

```txt
/teacher/s1-ready
/admin/s1-ready
/api/s1-teaching-ready
```

문서:

```txt
S1_TEACHING_READY_CHECKLIST.md
S1_CLASSROOM_RUNBOOK.md
S1_ASSET_FINAL_REQUIREMENTS.md
S1_PILOT_OPERATION_GUIDE.md
S1_TEACHING_READY_NOTES.md
```


## MVP 25 · S1 Asset Ready Package

이 버전은 S1 실제 파일을 넣기 직전의 asset drop guide를 추가했습니다.

```txt
/teacher/s1-assets
/admin/s1-assets
/api/s1-assets
```

추가 확인 명령:

```txt
npm run check:s1:filenames
npm run audit:hbe
```

S1 asset manifest hotfix applied.

Sound Match prop hotfix applied.
