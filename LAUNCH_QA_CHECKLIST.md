# Launch QA Checklist

## Before Deploy

```txt
□ npm install
□ npm run build
□ S1 asset 파일 삽입
□ .env.local은 commit하지 않음
□ Supabase schema.sql 실행
```

## After Deploy

```txt
□ /admin 접속
□ /admin/qa 접속
□ Run QA Checks 실행
□ critical fail 없음
□ S1 asset ok
□ S1 QR production URL 모바일 테스트
□ S2~S15 production은 coming soon
□ S2/S3 preview 내부 테스트
□ Supabase Dashboard에 기록 표시
```

## Launch Blockers

```txt
□ /game/s01 fail
□ S1 Theater mp4 missing
□ S1 Singing mp3 missing
□ Worksheet PDF missing
□ Flashcard PDF missing
□ S2~S15가 public에서 열림
□ S15 P4가 /report/s15가 아님
```
