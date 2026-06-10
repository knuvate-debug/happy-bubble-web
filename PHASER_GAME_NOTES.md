# Happy Bubble Web MVP · Phaser S1 Game Notes

이번 패키지는 `/game/s01`을 Phaser 기반 SOUND_MATCH 게임으로 교체한 버전입니다.

## 구현 내용

```txt
/game/s01
→ Phaser canvas
→ S1 SOUND_MATCH
→ rounds: s, a, t, sat, at
→ speechSynthesis 음성
→ Supabase tracking 유지
```

## 데이터 위치

```txt
game/data/bubbleGameSessions.ts
```

S1은 open이고, S2~S15는 coming soon 정책을 유지합니다.

## 이벤트

```txt
game_start
listen_click
choice_tap
round_correct
round_wrong
game_complete
restart
```

## 주의

Phaser는 브라우저에서만 실행되므로, 컴포넌트는 dynamic import 방식으로 Phaser를 로드합니다.

## 테스트

```bash
npm install
npm run dev
```

확인:

```txt
/game/s01
```

체크:

```txt
□ Phaser 캔버스가 보인다.
□ Start 버튼 작동
□ Listen 버튼 작동
□ s/a/t/sat/at 라운드 작동
□ 완료 화면 표시
□ Again 작동
□ Session 버튼 작동
□ Supabase 환경변수 없이도 게임이 멈추지 않음
```
