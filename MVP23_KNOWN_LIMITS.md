# MVP 23 Known Limits

## Full build

이 패키지 생성 환경에서는 외부 npm dependency 설치를 실행하지 않았습니다.  
따라서 최종 검수는 사용자 로컬 또는 Vercel Preview에서 아래 명령으로 확인해야 합니다.

```txt
npm install
npm run build
```

## Assets

S1 영상/음원/PDF 파일은 placeholder 경로만 연결되어 있습니다.  
실제 배포 전 파일을 넣어야 합니다.

## Game visuals

Phaser 게임은 현재 CSS/shape 기반 MVP입니다.  
최종 제품 퀄리티를 위해서는 추후 bubble sprite, sound effect, character reaction asset을 추가하는 것이 좋습니다.

## Rosebud AI

Rosebud AI는 게임 아이디어 실험용으로 유지합니다.  
정식 통합은 Phaser + Next.js + Supabase 구조를 기준으로 합니다.

## Reports

Report는 현재 `learning_events` 기반 요약입니다.  
파일럿 후에는 학급/학생/수업회차 기준 group key가 필요할 수 있습니다.
