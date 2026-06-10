# React Game → Phaser Game 교체 내역

## 변경 전

```txt
/game/s01
→ components/S1SoundMatchGame.tsx
```

## 변경 후

```txt
/game/s01
→ components/PhaserSoundMatchGame.tsx
→ game/data/bubbleGameSessions.ts
```

## 유지한 것

```txt
S1 open
S2~S15 coming soon
Supabase tracking
Parent Mode
Teacher Mode
Admin Mode
```

## 이유

Phaser로 게임 템플릿을 공통화하면 S2~S15 확장 시 새 페이지 코드를 계속 만들지 않고 데이터 중심으로 확장할 수 있습니다.
