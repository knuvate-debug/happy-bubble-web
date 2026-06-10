# Happy Bubble Web MVP · S2 BUILD_WORD Phaser 구현

이번 패키지는 S2 BUILD_WORD 템플릿을 Phaser로 구현한 버전입니다.

## 확인 URL

Production 보호:

```txt
/game/s02
→ Coming Soon
```

내부 preview:

```txt
/game/s02?preview=true
→ Phaser BUILD_WORD 실행
```

## S2 데이터

```txt
pin
pat
tap
sat
```

위치:

```txt
game/data/bubbleGameSessions.ts
```

## 게임 흐름

```txt
Ready
→ Start
→ Listen
→ Word Slots
→ Letter Bubbles
→ Tap letters
→ Correct Pop
→ Next
→ Complete
```

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

## 운영 정책

```txt
S1 = open
S2 = coming_soon
S3~S15 = coming_soon
```

S2는 preview URL에서만 내부 테스트합니다.
