# Happy Bubble Web MVP · QR Admin Panel

이번 패키지는 `/admin`에 QR Preview / Production 관리 UI를 추가한 버전입니다.

## 추가 파일

```txt
lib/qrRoutes.ts
components/QrAdminPanel.tsx
QR_ADMIN_NOTES.md
```

## QR 규칙

```txt
P1 → /theater/sXX
P2 → /game/sXX
P3 → /singing/sXX
P4 → /mission/sXX
S15 P4 → /report/s15
```

## Preview URL

모든 QR 대상에는 내부 검수용 preview URL이 함께 표시됩니다.

예:

```txt
/game/s02?preview=true
/game/s03?preview=true
/teacher/s03?preview=true
```

## 파일명 규칙

Production:

```txt
HBE_QR_S01_P1.png
HBE_QR_S01_P2.png
HBE_QR_S01_P3.png
HBE_QR_S01_P4.png
```

Preview:

```txt
HBE_QR_S01_P1_preview.png
HBE_QR_S01_P2_preview.png
HBE_QR_S01_P3_preview.png
HBE_QR_S01_P4_preview.png
```

## 운영 원칙

```txt
S1 open → Production QR 사용 가능
S2~S15 coming_soon → Production QR 최종 삽입 금지
Preview QR → 내부 검수용
```

## 검수 순서

```txt
1. /admin 접속
2. QR Operations 확인
3. S1 P1~P4 production URL 복사
4. QR 생성
5. 모바일 스캔
6. S2~S15 production은 coming soon 확인
7. preview URL은 내부 검수에만 사용
```
