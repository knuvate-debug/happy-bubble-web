# MVP 23 Pre-Deploy Checklist

## 1. Local install/build

```txt
□ npm install
□ npm run audit:hbe
□ npm run build
□ npm run dev
```

## 2. Student flow

```txt
□ /sessions
□ /sessions/s01
□ /game/s01
□ /game/s01/sound-match
□ /game/s01/bubble-pop
□ /game/s01/build-sat
```

## 3. Classroom flow

```txt
□ /classroom/s01
□ /classroom/s01/presenter?mode=native
□ /classroom/s01/presenter?mode=korean
□ /classroom/s01/presenter?mode=bilingual
□ /classroom/s01/presenter?mode=substitute
□ /classroom/s01/overview
□ Fullscreen 버튼
□ Next / Back
□ Timer Start / Pause / Reset
```

## 4. Report flow

```txt
□ /teacher/report/s01
□ /teacher/game-report/s01
□ /parent
□ /admin/classroom-report
□ /admin/game-report
```

## 5. Admin / QA

```txt
□ /admin
□ /admin/qa
□ Asset Check
□ Classroom Records
□ Game Report
□ Launch QA route checks
```

## 6. Supabase

```txt
□ NEXT_PUBLIC_SUPABASE_URL 설정
□ NEXT_PUBLIC_SUPABASE_ANON_KEY 설정
□ SUPABASE_SERVICE_ROLE_KEY 설정
□ supabase/schema.sql 적용
□ learning_events insert 확인
□ session_progress update 확인
```

## 7. Required S1 assets

```txt
□ public/assets/theater/HBE_BT_S01_FINAL.mp4
□ public/assets/singing/HBE_SB_S01.mp3
□ public/assets/singing/HBE_SB_Hello.mp3
□ public/assets/singing/HBE_SB_Goodbye.mp3
□ public/assets/worksheets/HBE_WS_S01.pdf
□ public/assets/flashcards/HBE_FC_S01.pdf
```

## 8. Device QA

```txt
□ Desktop Chrome
□ iPad Safari
□ Android Chrome
□ iPhone Safari
□ classroom projector / fullscreen
```
