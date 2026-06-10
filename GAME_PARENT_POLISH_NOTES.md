# Happy Bubble Web MVP · Game UI Polish + Parent Mode Redesign

이번 패키지는 UI Design System 13차본을 기준으로 게임 화면 wrapper와 Parent Mode를 개선한 버전입니다.

## 개선 1. Phaser Game Frame

```txt
components/PhaserSoundMatchGame.tsx
components/PhaserBuildWordGame.tsx
```

변경:

```txt
- Game title header 추가
- template badge 추가
- canvas frame border/rounding 개선
- helper text 개선
- complete text 개선
- session subtitle 사용
```

## 개선 2. Parent Mode Redesign

```txt
app/parent/page.tsx
components/ui/ParentReviewCard.tsx
components/ui/ProgressPill.tsx
```

변경:

```txt
- Home Review Hero
- Today&apos;s Bubble 영역
- Review Guide 영역
- Progress Pill
- Watch / Play / Sing / Mission 카드
- Smart Report 안내 영역
```

## 개선 3. Character Slot 준비

```txt
components/ui/CharacterSlot.tsx
```

아직 실제 캐릭터 asset은 넣지 않고, 추후 Adam/J hero art 삽입을 위한 placeholder 컴포넌트만 준비했습니다.

## 확인 URL

```txt
/game/s01
/game/s02?preview=true
/game/s03?preview=true
/parent
```
