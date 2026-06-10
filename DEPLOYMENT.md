# Happy Bubble Web MVP · GitHub/Vercel 배포 가이드

이 패키지는 Vercel 배포 준비가 된 Next.js MVP입니다.

## 1. 로컬 실행

```bash
npm install
npm run dev
```

확인 URL:

```txt
http://localhost:3000/sessions
http://localhost:3000/game/s01
http://localhost:3000/teacher/s01
```

## 2. 실제 콘텐츠 파일 넣기

아래 위치에 파일을 넣습니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```

주의:

```txt
코드에서는 /public을 쓰지 않습니다.
URL은 /assets/... 로 시작합니다.
```

## 3. GitHub 업로드

GitHub에서 새 repository를 만듭니다.

추천 repo name:

```txt
happy-bubble-web
```

로컬에서:

```bash
git init
git add .
git commit -m "Initial Happy Bubble Web MVP"
git branch -M main
git remote add origin https://github.com/[계정]/happy-bubble-web.git
git push -u origin main
```

## 4. Vercel 배포

Vercel에서:

```txt
Add New Project
→ Import Git Repository
→ happy-bubble-web 선택
→ Framework Preset: Next.js
→ Deploy
```

환경변수는 1차 MVP에서는 비워도 됩니다.

Supabase 연결 후에는 Vercel Project Settings에서 아래 값을 등록합니다.

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## 5. 배포 후 확인 URL

```txt
/sessions
/sessions/s01
/theater/s01
/game/s01
/singing/s01
/mission/s01
/teacher/s01
/parent
/report/s15
/admin
```

## 6. QR 연결 기준

Production URL이 나온 후 QR은 아래 URL로 생성합니다.

```txt
S1 P1: https://[domain]/theater/s01
S1 P2: https://[domain]/game/s01
S1 P3: https://[domain]/singing/s01
S1 P4: https://[domain]/mission/s01
```

## 7. 배포 전 최종 확인

```txt
□ npm run build 성공
□ /game/s01 끝까지 완료 가능
□ /teacher/s01 수업 흐름 확인
□ S1 open
□ S2~S15 coming soon
□ 실제 asset 파일 업로드
□ 모바일에서 /game/s01 터치 가능
```
