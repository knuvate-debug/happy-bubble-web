# UI Test Checklist

## Child Mode

```txt
□ /sessions가 세션 선택 화면처럼 보이는가?
□ /sessions/s01에 큰 Hero가 있는가?
□ Watch / Play / Sing / Mission 버튼이 명확한가?
□ 모바일에서 버튼이 충분히 큰가?
```

## Teacher Mode

```txt
□ /teacher/s01에 수업 단계가 카드로 정리되는가?
□ 각 단계에 실행 버튼이 있는가?
□ Teacher Prompt와 Backup Plan이 분리되어 보이는가?
□ 태블릿/노트북에서 보기 편한가?
```

## Admin Mode

```txt
□ /admin에 Sidebar가 표시되는가?
□ Overview / Launch QA / Student View / Teacher S1 이동이 되는가?
□ 기존 Asset / QR / Dashboard 기능이 유지되는가?
□ /admin/qa가 AdminShell 안에서 표시되는가?
```

## Regression

```txt
□ /game/s01 작동
□ /game/s02?preview=true 작동
□ /game/s03?preview=true 작동
□ /admin/qa 진입 가능
□ npm run build 성공
```
