# Next Step · S2 BUILD_WORD Phaser 템플릿 구현

다음 구현 목표:

```txt
/game/s02 내부 preview
→ BUILD_WORD Phaser 템플릿
→ pin / pat / tap / sat
```

Production 정책:

```txt
S2는 계속 coming_soon
```

구현할 컴포넌트:

```txt
components/PhaserBuildWordGame.tsx
```

GameRouter에 추가할 분기:

```tsx
if (gameSession.template === "BUILD_WORD") {
  return <PhaserBuildWordGame gameSession={gameSession} />;
}
```

게임 흐름:

```txt
Ready
→ Listen
→ Word Slots
→ Letter Bubbles
→ Tap letters
→ Correct Pop
→ Next
→ Complete
```

이벤트:

```txt
game_start
listen_click
letter_tap
word_complete
round_correct
round_wrong
game_complete
restart
```
