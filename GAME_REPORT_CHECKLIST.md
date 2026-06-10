# Game Report Checklist

## Game Event Recording

```txt
□ /game/s01/sound-match 실행
□ correct / incorrect / complete 이벤트 기록
□ /game/s01/bubble-pop 실행
□ gameId=bubble-pop 이벤트 기록
□ /game/s01/build-sat 실행
□ gameId=build-sat 이벤트 기록
```

## Teacher Report

```txt
□ /teacher/game-report/s01 접속
□ Game Pack 진행률 표시
□ Sound Match 요약 표시
□ Bubble Pop 요약 표시
□ Build SAT 요약 표시
□ 최근 이벤트 표시
```

## Parent

```txt
□ /parent 접속
□ Game Report 요약 표시
□ Parent 화면에서는 상세 이벤트 테이블이 숨김 처리
```

## Admin

```txt
□ /admin/game-report 접속
□ AdminShell에 Game Report 링크 표시
```

## API / QA

```txt
□ /api/game-report?sessionId=s01 응답
□ /admin/qa에 Game Report API 포함
□ /admin/qa에 Teacher Game Report 포함
□ /admin/qa에 Admin Game Report 포함
□ npm run build 성공
```
