# Happy Bubble Web MVP · Classroom Mode / Web PPT Mode

이번 패키지는 classroom PPT처럼 수업을 진행할 수 있는 웹 슬라이드 모드를 추가한 버전입니다.

## 추가된 라우트

```txt
/classroom/s01
```

## 추가된 파일

```txt
lib/classroomSlides.ts
components/classroom/ClassroomDeck.tsx
components/classroom/ClassroomSlide.tsx
components/classroom/ClassroomVisual.tsx
components/classroom/ClassroomControls.tsx
components/classroom/SlideActionButton.tsx
app/classroom/s01/page.tsx
app/classroom/[sessionId]/page.tsx
```

## S1 슬라이드 흐름

```txt
1. Hello Song
2. Today’s Bubble: S, A, T
3. Bubble Theater
4. Sound Focus: s
5. Sound Focus: a
6. Sound Focus: t
7. Word Build: sat / at
8. Bubble Game
9. Singing Bubble
10. Worksheet Mission
11. Goodbye Song
```

## 기능

```txt
- Next / Back 슬라이드 이동
- 키보드 이동: ArrowLeft / ArrowRight / Space
- Fullscreen 버튼
- Teacher Note
- Slide action buttons
- audio/video/pdf/game route 연결
```

## 현재 외부 파일 필요 여부

Classroom Mode UI 자체는 외부 이미지 없이 동작합니다.

하지만 실제 재생/열람 검수에는 아래 파일이 필요합니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```

## 확인 URL

```txt
/classroom/s01
/teacher/s01
/admin/qa
```
