# Classroom Report Checklist

## Recording Flow

```txt
□ /classroom/s01 접속
□ Next / Back / Complete 클릭
□ /classroom/s01/presenter 접속
□ Timer Start / Pause / Reset 클릭
□ /teacher/report/s01 접속
□ 진행률 표시 확인
□ Timer 요약 확인
□ 최근 이벤트 목록 확인
```

## Admin

```txt
□ /admin/classroom-report 접속
□ AdminShell 안에서 Classroom Report 표시
□ /admin sidebar에 Classroom Report 링크 표시
```

## API

```txt
□ /api/classroom-report?sessionId=s01 응답
□ Supabase 미연결 시 configured false
□ Supabase 연결 시 events 배열 표시
```

## QA

```txt
□ /admin/qa에 /teacher/report/s01 포함
□ /admin/qa에 /admin/classroom-report 포함
□ /admin/qa에 /api/classroom-report?sessionId=s01 포함
□ npm run build 성공
```
