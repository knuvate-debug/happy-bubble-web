# Happy Bubble Web MVP · Build Fix Notes

이번 패키지는 11차 Launch QA 패키지를 기준으로 빌드 전 안정화 수정을 반영한 버전입니다.

## 수정 1. TSX literal newline 정리

아래 페이지에 `\n` 문자열이 JSX 안에 그대로 들어간 부분을 정리했습니다.

```txt
app/theater/s01/page.tsx
app/singing/s01/page.tsx
app/mission/s01/page.tsx
```

## 수정 2. QA 검사 정확도 개선

기존 QA는 일부 protected route를 HTTP status만 확인했습니다.  
이번 버전은 Coming Soon 보호 정책을 텍스트 기반으로도 확인합니다.

예:

```txt
/game/s02
→ "Coming Soon" 포함 여부 확인

/game/s02?preview=true
→ "Coming Soon"이 포함되면 fail
```

## 수정 3. QR protected route 검사 개선

S2~S15 production QR 대상 URL은 단순 200이 아니라 Coming Soon 보호 상태인지 확인합니다.

## 확인 URL

```txt
/admin/qa
```

## 추천 실행

```bash
npm install
npm run build
npm run dev
```

그다음:

```txt
/admin/qa
→ Run QA Checks
```
