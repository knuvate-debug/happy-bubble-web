# S1 Asset Drop Guide

## 정확한 파일 경로

아래 파일명과 경로를 그대로 사용해야 합니다.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```

## 확인 화면

```txt
/teacher/s1-assets
/admin/s1-assets
/api/s1-assets
```

## 확인 명령

```txt
npm run check:s1:filenames
npm run audit:hbe:assets
npm run audit:hbe
```

## 주의

```txt
HBE_SB_S01.mp3
HBE_SB_S1.mp3
```

위 두 파일명은 다릅니다. 반드시 `HBE_SB_S01.mp3`을 사용하세요.

```txt
HBE_WS_S01.pdf
HBE_WS_S1.pdf
```

위 두 파일명도 다릅니다. 반드시 `HBE_WS_S01.pdf`을 사용하세요.
