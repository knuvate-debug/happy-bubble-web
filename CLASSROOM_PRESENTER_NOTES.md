# Happy Bubble Web MVP · Classroom Presenter Package

이번 패키지는 Classroom Mode에 교사용 Presenter View, Slide Overview, Class Timer를 추가한 버전입니다.

## 추가 라우트

```txt
/classroom/s01/presenter
/classroom/s01/overview
```

## 추가 파일

```txt
components/classroom/ClassroomPresenter.tsx
components/classroom/ClassroomTimer.tsx
components/classroom/PresenterSlideList.tsx
components/classroom/ClassroomOverview.tsx
app/classroom/s01/presenter/page.tsx
app/classroom/s01/overview/page.tsx
```

## Presenter View 기능

```txt
- 현재 슬라이드 표시
- Teacher Note 크게 표시
- 다음 슬라이드 미리보기
- 전체 슬라이드 목록
- 수업 타이머 Start / Pause / Reset
- 키보드 이동: ArrowLeft / ArrowRight / Space
- Student Deck 새 창 열기
```

## Deck / Presenter 역할

```txt
/classroom/s01
→ 학생/프로젝터용 전체화면 슬라이드

/classroom/s01/presenter
→ 교사용 진행 화면

/classroom/s01/overview
→ 전체 슬라이드 구성 확인 화면
```

## 현재 외부 파일 필요 여부

Presenter View 자체는 외부 이미지 없이 동작합니다.

실제 수업 재생 검수 전에는 기존 S1 asset이 필요합니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```
