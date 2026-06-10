# Happy Bubble Web MVP · Asset Admin Panel

이번 패키지는 `/admin`에 실제 콘텐츠 asset 검수 UI를 추가한 버전입니다.

## 추가 파일

```txt
lib/assetManifest.ts
app/api/asset-manifest/route.ts
components/AssetAdminPanel.tsx
ASSET_ADMIN_NOTES.md
```

## /admin에서 확인 가능한 것

```txt
- S1 필수 asset 파일 목록
- 실제 웹 URL 접근 여부
- 세션별 content status
- assetUrl / route URL
- pilot 필수 여부
```

## S1 필수 파일

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```

## 웹 URL 규칙

```txt
/public 사용 금지
/assets/... 사용
```

예:

```txt
/assets/theater/HBE_BT_S01_FINAL.mp4
```

## 검수 순서

```txt
1. 실제 asset 파일을 public/assets에 넣기
2. npm run build 확인
3. Vercel 배포
4. /admin 접속
5. Asset Check 섹션에서 Check S1 Assets 클릭
6. missing 파일 확인
7. Open 버튼으로 직접 파일 열기
```

## 주의

로컬에서 파일이 있어도 GitHub에 commit하지 않으면 Vercel에는 반영되지 않습니다.
