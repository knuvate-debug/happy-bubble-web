# Happy Bubble Web MVP · Game Report Package

이번 패키지는 S1 Game Pack 결과를 Teacher / Parent / Admin에서 확인할 수 있도록 연결한 버전입니다.

## 추가 라우트

```txt
/api/game-report?sessionId=s01
/teacher/game-report/s01
/admin/game-report
```

## Parent 연결

```txt
/parent
→ S1 Game Report 요약 표시
```

## 요약 항목

```txt
- Game Pack 진행률
- 게임별 시작 수
- 게임별 완료 수
- 게임별 정답/오답 수
- 게임별 정확도
- 최근 게임 이벤트
- 다음 운영 추천 문구
```

## 게임별 요약

```txt
Sound Match
Bubble Pop
Build SAT
```

## 사용하는 테이블

새 Supabase 테이블을 추가하지 않습니다.

```txt
learning_events
```

## 이벤트 구분 방식

각 Phaser 게임은 event metadata에 gameId를 저장합니다.

```txt
metadata.gameId = sound-match | bubble-pop | build-sat
```

## 외부 파일 필요 여부

이번 단계에는 외부 이미지/효과음이 필요하지 않습니다.
