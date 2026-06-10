# Happy Bubble Web MVP 23 · 통합 안정화 패키지

이번 패키지는 새 기능을 크게 추가하지 않고, MVP 22까지 들어간 기능을 배포 전 점검하기 위한 안정화 패키지입니다.

## 안정화 대상

```txt
Student Mode
Bubble Journey
Classroom Mode
Presenter View
Instructor Mode
S1 Game Pack
Game Report
Classroom Report
Parent Mode
Admin Mode
Launch QA
Supabase event tracking
```

## 추가된 점검 스크립트

```txt
npm run audit:hbe:source
npm run audit:hbe:routes
npm run audit:hbe:assets
npm run audit:hbe
```

## 확인해야 할 핵심 URL

```txt
/sessions
/sessions/s01

/game/s01
/game/s01/sound-match
/game/s01/bubble-pop
/game/s01/build-sat

/classroom/s01
/classroom/s01?mode=korean
/classroom/s01/presenter?mode=native
/classroom/s01/presenter?mode=korean
/classroom/s01/presenter?mode=bilingual
/classroom/s01/presenter?mode=substitute
/classroom/s01/overview

/teacher/s01
/teacher/report/s01
/teacher/game-report/s01

/parent

/admin
/admin/qa
/admin/classroom-report
/admin/game-report

/api/classroom-report?sessionId=s01
/api/game-report?sessionId=s01
/api/classroom-summary
```

## 이번 단계 외부 파일 필요 여부

코드 안정화와 라우트 점검에는 외부 파일이 필요하지 않습니다.

실제 S1 배포 QA 전에는 아래 asset이 필요합니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```

## 권장 검수 순서

```txt
1. npm install
2. npm run audit:hbe
3. npm run build
4. npm run dev
5. /admin/qa 실행
6. 주요 라우트 수동 확인
7. S1 실제 asset 삽입
8. 다시 npm run audit:hbe:assets
9. Vercel Preview 배포
10. 모바일/태블릿 실기기 확인
```
