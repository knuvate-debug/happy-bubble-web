# Happy Bubble Web MVP

실행 가능한 Next.js 기반 Happy Bubble English WebLearning MVP입니다.

## 구현 범위

- `/sessions`
- `/sessions/s01`
- `/theater/s01`
- `/game/s01`
- `/singing/s01`
- `/mission/s01`
- `/teacher/s01`
- `/parent`
- `/report/s15`
- `/admin`

## 정책

- S1 = open
- S2~S15 = coming soon
- S1 Bubble Game은 실제 작동합니다.
- S1 Theater/Singing/PDF는 asset 경로가 연결되어 있습니다.
- 실제 파일은 아래 위치에 넣으세요.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```

## 실행

```bash
npm install
npm run dev
```

브라우저에서:

```txt
http://localhost:3000/sessions
```

## 배포 흐름

1. GitHub repo 생성
2. 이 프로젝트 업로드
3. Vercel에서 repo import
4. Deploy
5. `/sessions`, `/game/s01`, `/teacher/s01` 확인
