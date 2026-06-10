# Happy Bubble Web MVP · Admin Supabase Dashboard

이번 패키지는 `/admin`에 Supabase 기록 대시보드를 추가한 버전입니다.

## 추가된 기능

```txt
/api/admin-summary
components/AdminDashboard.tsx
```

## /admin에서 확인 가능한 것

```txt
- Supabase 연결 여부
- learning_events 전체 개수
- session_progress 전체 개수
- 최근 session_progress 20개
- 최근 learning_events 30개
```

## Supabase 미연결 상태

Supabase 환경변수가 없어도 `/admin`은 깨지지 않습니다.

```txt
Supabase not configured
```

안내 문구가 표시됩니다.

## 필요한 환경변수

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## 테스트 순서

```txt
1. /game/s01 실행
2. Start
3. Listen
4. 정답/오답 선택
5. 게임 완료
6. /admin 접속
7. Refresh 클릭
8. learning_events와 session_progress 확인
```

## 운영 주의

이 MVP의 Admin Mode는 read-only입니다.  
수정/삭제 기능은 없습니다.
