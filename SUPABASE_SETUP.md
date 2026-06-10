# Happy Bubble Web MVP · Supabase 연결 가이드

이 패키지는 Supabase 연결 없이도 작동합니다.  
Supabase 환경변수를 넣으면 `/game/s01` 활동 기록이 저장됩니다.

## 1. Supabase 프로젝트 생성

Supabase에서 새 프로젝트를 만듭니다.

## 2. SQL 실행

Supabase SQL Editor에서 아래 파일 내용을 실행합니다.

```txt
supabase/schema.sql
```

생성되는 테이블:

```txt
learning_events
session_progress
```

## 3. API Keys 확인

Supabase Project Settings → API에서 확인합니다.

```txt
Project URL
anon public key
service_role key
```

## 4. Vercel 환경변수 등록

Vercel Project Settings → Environment Variables에 등록합니다.

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

주의:

```txt
SUPABASE_SERVICE_ROLE_KEY는 절대 브라우저 코드에 넣지 않습니다.
.env.local은 GitHub에 올리지 않습니다.
```

## 5. 로컬 테스트

`.env.local` 파일을 만들고 아래를 채웁니다.

```txt
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

실행:

```bash
npm install
npm run dev
```

테스트:

```txt
/game/s01 → Start → Listen → 정답 선택 → 완료
```

Supabase에서 확인:

```txt
learning_events
session_progress
```

## 6. 안전 원칙

Supabase 저장 실패 시에도 게임은 멈추지 않습니다.  
이 MVP는 기록 실패를 조용히 무시하고 학습 흐름을 유지합니다.
