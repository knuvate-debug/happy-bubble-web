# Happy Bubble Web MVP · Bubble Game Pack Package

이번 패키지는 기존 세션별 1개 게임 구조를 S1 Game Pack 구조로 확장한 버전입니다.

## 핵심 방향

```txt
MVP에서는 세션별 1개 게임도 가능
정식 제품에서는 세션별 2~3개 Game Pack 구조 권장
```

## S1 Game Pack

```txt
/game/s01
→ S1 Game Pack Landing

/game/s01/sound-match
→ Sound Match
→ 소리를 듣고 맞는 버블 선택

/game/s01/bubble-pop
→ Bubble Pop
→ 목표 소리와 같은 버블만 터뜨리기

/game/s01/build-sat
→ Build SAT
→ s, a, t를 순서대로 모아 sat 완성
```

## 추가 파일

```txt
game/data/gamePacks.ts
components/game/GamePackLanding.tsx
components/game/GamePlayShell.tsx
components/PhaserBubblePopGame.tsx
components/PhaserBuildSatGame.tsx
app/game/s01/page.tsx
app/game/s01/sound-match/page.tsx
app/game/s01/bubble-pop/page.tsx
app/game/s01/build-sat/page.tsx
```

## Rosebud AI 역할

Rosebud AI는 최종 통합 엔진이 아니라 게임 컨셉 실험용으로 사용하는 것을 권장합니다.

```txt
Rosebud
→ 게임 아이디어 시각화 / 빠른 프로토타입 / 아이 반응 테스트

Phaser
→ HBE 플랫폼 정식 구현 / Supabase 기록 / QR / Parent Report 연결
```

## 외부 파일 필요 여부

이번 단계에는 외부 파일이 필요하지 않습니다.

나중에 게임 퀄리티를 높일 때 선택적으로 필요합니다.

```txt
public/assets/game/common/bubble_blue.png
public/assets/game/common/bubble_gold.png
public/assets/game/common/star_complete.png
public/assets/game/sfx/pop_correct.mp3
public/assets/game/sfx/try_again.mp3
public/assets/game/sfx/complete.mp3
```
