# Bubble Game Pack Checklist

## Game Pack Landing

```txt
□ /game/s01 접속
□ Sound Match 카드 표시
□ Bubble Pop 카드 표시
□ Build SAT 카드 표시
□ 각 카드에서 학습 목표 표시
□ 각 카드에서 Child Action 표시
□ 각 카드 클릭 시 해당 게임으로 이동
```

## Sound Match

```txt
□ /game/s01/sound-match 접속
□ Phaser 게임 로드
□ Listen / 버블 선택 흐름 작동
□ 정답/오답 기록
□ 완료 기록
```

## Bubble Pop

```txt
□ /game/s01/bubble-pop 접속
□ Phaser 게임 로드
□ 목표 소리 표시
□ 맞는 버블만 터뜨릴 수 있음
□ 오답 버블은 흔들림
□ 라운드 전환
□ 완료 기록
```

## Build SAT

```txt
□ /game/s01/build-sat 접속
□ Phaser 게임 로드
□ s → a → t 순서대로 터치
□ 틀린 순서 터치 시 흔들림
□ sat 완성 표시
□ 완료 기록
```

## Integration

```txt
□ /sessions/s01 Play에서 /game/s01 이동
□ Classroom slide의 Game 버튼이 /game/s01 이동
□ /admin/qa에 세부 게임 라우트 포함
□ npm run build 성공
```
