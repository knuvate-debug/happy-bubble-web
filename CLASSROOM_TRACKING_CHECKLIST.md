# Classroom Tracking Checklist

## Student Deck

```txt
□ /classroom/s01 접속
□ classroom_open 기록
□ slide 1 classroom_slide_view 기록
□ Next 클릭 시 classroom_next 기록
□ Back 클릭 시 classroom_prev 기록
□ Complete 클릭 시 classroom_complete 기록
```

## Presenter View

```txt
□ /classroom/s01/presenter 접속
□ classroom_presenter_open 기록
□ slide list 클릭 시 classroom_slide_view 기록
□ Next / Back 기록
□ Complete 기록
```

## Timer

```txt
□ Timer Start 클릭 시 classroom_timer_start 기록
□ Timer Pause 클릭 시 classroom_timer_pause 기록
□ Timer Reset 클릭 시 classroom_timer_reset 기록
```

## Admin

```txt
□ /admin 접속
□ Classroom Records 패널 표시
□ Supabase 미연결 시 안내 표시
□ Supabase 연결 시 classroom 이벤트 목록 표시
```

## QA

```txt
□ /admin/qa에 /api/classroom-summary 포함
□ npm run build 성공
```
