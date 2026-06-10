# MVP 25 · S1 Asset Ready Package

이번 패키지는 실제 S1 파일을 넣기 직전의 마지막 코드 정리 패키지입니다.

## 추가 라우트

```txt
/teacher/s1-assets
/admin/s1-assets
/api/s1-assets
```

## 추가 파일

```txt
lib/s1AssetManifest.ts
components/S1AssetDropGuide.tsx
app/teacher/s1-assets/page.tsx
app/admin/s1-assets/page.tsx
app/api/s1-assets/route.ts
scripts/hbe-s1-filename-check.mjs
S1_ASSET_DROP_GUIDE.md
S1_ASSET_READY_NOTES.md
```

## 추가된 public 폴더

```txt
public/assets/theater
public/assets/singing
public/assets/worksheets
public/assets/flashcards
public/assets/game/common
public/assets/game/sfx
public/assets/characters
public/assets/brand
```

## 이번 단계 외부 파일 필요 여부

코드 생성에는 필요하지 않습니다.

하지만 다음 단계에서 실제 S1 수업 검수로 가려면 아래 파일을 넣어야 합니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```
