# Happy Bubble Web MVP · Classroom Tracking Package

이번 패키지는 Classroom Mode에 Supabase 이벤트 기록 구조를 추가한 버전입니다.

## 추가된 기록 이벤트

```txt
classroom_open
classroom_presenter_open
classroom_overview_open
classroom_slide_view
classroom_next
classroom_prev
classroom_complete
classroom_timer_start
classroom_timer_pause
classroom_timer_reset
```

## 저장 위치

기존 Supabase 테이블을 그대로 사용합니다.

```txt
learning_events
```

새 테이블은 추가하지 않았습니다.

## 추가된 파일

```txt
lib/classroomTracking.ts
app/api/classroom-summary/route.ts
components/ClassroomRecordsPanel.tsx
```

## 수정된 파일

```txt
lib/trackEvent.ts
components/classroom/ClassroomDeck.tsx
components/classroom/ClassroomPresenter.tsx
components/classroom/ClassroomTimer.tsx
components/classroom/ClassroomOverview.tsx
components/classroom/ClassroomControls.tsx
app/admin/page.tsx
lib/qaChecklist.ts
```

## Admin 확인

```txt
/admin
→ Classroom Records
```

## QA 확인

```txt
/admin/qa
→ /api/classroom-summary
```

## 외부 파일 필요 여부

이번 단계에는 외부 파일이 필요하지 않습니다.

실제 수업 재생 검수 전에는 기존 S1 asset이 필요합니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```
