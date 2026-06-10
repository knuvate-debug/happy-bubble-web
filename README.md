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
