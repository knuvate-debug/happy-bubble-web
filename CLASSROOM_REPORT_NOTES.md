# Happy Bubble Web MVP · Classroom Report Package

이번 패키지는 Classroom Tracking 데이터를 바탕으로 수업 리포트 요약 화면을 추가한 버전입니다.

## 추가 라우트

```txt
/teacher/report/s01
/admin/classroom-report
/api/classroom-report?sessionId=s01
```

## 추가 파일

```txt
components/classroom/ClassroomReportPanel.tsx
app/teacher/report/s01/page.tsx
app/admin/classroom-report/page.tsx
app/api/classroom-report/route.ts
```

## 리포트 요약 항목

```txt
- 진행률
- 조회한 슬라이드 수
- 전체 classroom 이벤트 수
- Next / Back 이동 수
- Complete 기록 수
- Timer Start / Pause / Reset 수
- 첫 이벤트 시각
- 마지막 이벤트 시각
- 마지막 조회 슬라이드
- 최근 Classroom 이벤트 목록
```

## 사용하는 Supabase 테이블

새 테이블을 추가하지 않습니다.

```txt
learning_events
```

## 외부 파일 필요 여부

이번 단계에는 외부 파일이 필요하지 않습니다.

실제 영상/음원/PDF 수업 재생 검수 전에는 기존 S1 asset이 필요합니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```
