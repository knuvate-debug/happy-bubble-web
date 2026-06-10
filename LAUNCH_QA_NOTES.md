# Happy Bubble Web MVP · Launch QA Page

이번 패키지는 `/admin/qa` 런칭 전 QA 자동 점검 페이지를 추가한 버전입니다.

## 추가 파일

```txt
lib/qaChecklist.ts
app/api/qa-summary/route.ts
components/LaunchQaPanel.tsx
app/admin/qa/page.tsx
LAUNCH_QA_NOTES.md
```

## 확인 URL

```txt
/admin/qa
```

## 점검 항목

```txt
Routes
Access Policy
Preview
Assets
QR
Supabase configured
```

## 주요 확인 대상

```txt
/sessions
/sessions/s01
/game/s01
/teacher/s01
/parent
/admin
/game/s02
/game/s02?preview=true
/game/s03?preview=true
/report/s15
S1 required assets
S1~S15 QR target URLs
```

## 사용법

```txt
1. /admin/qa 접속
2. Run QA Checks 클릭
3. fail / warning 확인
4. Open 버튼으로 문제 URL 직접 확인
5. asset missing이면 public/assets 파일 확인
6. Supabase Not set이면 Vercel 환경변수 확인
```

## 주의

HEAD 요청이 제한되는 일부 파일/서버에서는 warning이 나올 수 있습니다.  
이 경우 Open 버튼으로 직접 열어 확인합니다.
