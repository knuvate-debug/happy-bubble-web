# Happy Bubble Web MVP · S3 SOUND_MATCH Preview

이번 패키지는 S3 데이터를 기존 Phaser SOUND_MATCH 엔진에 연결해 재사용성을 검수하는 버전입니다.

## 확인 URL

Public 보호:

```txt
/game/s03
→ Coming Soon
```

내부 preview:

```txt
/game/s03?preview=true
→ Phaser SOUND_MATCH 실행
```

Teacher preview:

```txt
/teacher/s03?preview=true
```

## S3 데이터

```txt
Session: S3
Title: M, D
Theme: Bubble Science Lab
Template: SOUND_MATCH
Rounds:
1. m
2. d
3. mad
4. map
```

## 검수 포인트

```txt
□ /game/s03는 public에서 Coming Soon
□ /game/s03?preview=true는 Phaser 실행
□ m 라운드 작동
□ d 라운드 작동
□ mad 라운드 작동
□ map 라운드 작동
□ Supabase tracking 유지
□ S1 /game/s01 영향 없음
□ S2 /game/s02?preview=true 영향 없음
```

## 의미

S1과 S3가 같은 SOUND_MATCH 엔진을 공유합니다.

```txt
S1: S, A, T
S3: M, D
```

따라서 S4 이후도 세션 데이터만 추가하는 방식으로 확장할 수 있습니다.
