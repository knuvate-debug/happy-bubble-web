# Happy Bubble Web MVP · Bubble Journey UI

이번 패키지는 Student Mode를 카드 목록에서 HBE 고유의 Bubble Journey Map 구조로 변경한 버전입니다.

## 핵심 컨셉

```txt
Bubble Journey Map
```

참고 UX 원리:

```txt
Todo English식 점진적 오픈 구조
Duolingo ABC식 유아용 직관성
HBE 고유 Bubble Theater / Game / Singing / Mission 구조
```

## 추가 컴포넌트

```txt
components/student/BubbleJourneyMap.tsx
components/student/BubbleNode.tsx
components/student/TodayBubbleHero.tsx
components/student/ActivityBubbleGrid.tsx
components/student/BubbleStatusLegend.tsx
```

## 변경된 페이지

```txt
app/sessions/page.tsx
app/sessions/s01/page.tsx
```

## 상태 디자인

```txt
open
→ Green / Gold / Sky / active glow

coming_soon
→ Lilac / Cream / gentle locked bubble

preview
→ Sky / Navy outline / internal QA feel
```

## 현재 외부 파일 필요 여부

```txt
필수 외부 파일 없음
```

이번 단계는 placeholder bubble shapes만으로 구현했습니다.

## 나중에 있으면 좋은 파일

```txt
public/assets/characters/HBE_CHAR_GUIDE_ADAM.png
public/assets/characters/HBE_CHAR_GUIDE_J.png
public/assets/characters/HBE_CHAR_COMPLETE_ADAM_J.png
public/assets/characters/HBE_CHAR_COMING_SOON.png
public/assets/game/common/bubble_map_bg.png
```
