# Happy Bubble Web MVP · GameRouter 구조

이번 패키지는 `/game/[sessionId]`를 공통 GameRouter 구조로 정리한 버전입니다.

## 핵심 구조

```txt
app/game/[sessionId]/page.tsx
→ components/GameRouter.tsx
→ template에 따라 컴포넌트 선택
```

## 현재 지원

```txt
SOUND_MATCH
→ components/PhaserSoundMatchGame.tsx
```

## 준비 상태

```txt
BUILD_WORD
→ components/BuildWordPlaceholder.tsx
```

S2 BUILD_WORD는 placeholder로 연결되어 있으며, 다음 단계에서 실제 Phaser BUILD_WORD 템플릿으로 교체하면 됩니다.

## 데이터 위치

```txt
game/data/bubbleGameSessions.ts
```

## 공개 정책

```txt
S1 = open
S2~S15 = coming_soon
```

`/game/s02`, `/game/s03`는 데이터가 있어도 public에서는 Coming Soon으로 보호됩니다.

## 확장 방식

새 세션을 추가할 때는 새 page 파일을 만들지 않습니다.

```txt
1. game/data/bubbleGameSessions.ts에 데이터 추가
2. 필요한 template 컴포넌트 구현
3. GameRouter에서 template 분기 추가
```

## 다음 단계 추천

```txt
S2 BUILD_WORD Phaser 템플릿 구현
```
