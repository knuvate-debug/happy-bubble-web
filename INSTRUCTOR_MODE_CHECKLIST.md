# Instructor Mode Checklist

## Teacher Board

```txt
□ /teacher/s01 접속
□ Instructor Mode 카드 4개 표시
□ Native Teacher Mode 클릭 시 /classroom/s01/presenter?mode=native 이동
□ Korean Teacher Mode 클릭 시 /classroom/s01/presenter?mode=korean 이동
□ Bilingual Support Mode 클릭 시 /classroom/s01/presenter?mode=bilingual 이동
□ Substitute Teacher Mode 클릭 시 /classroom/s01/presenter?mode=substitute 이동
```

## Presenter

```txt
□ /classroom/s01/presenter?mode=native 접속
□ Native Teacher Mode 노트 표시
□ /classroom/s01/presenter?mode=korean 접속
□ Korean Teacher Mode 노트 표시
□ /classroom/s01/presenter?mode=bilingual 접속
□ Bilingual Support Mode 노트 표시
□ /classroom/s01/presenter?mode=substitute 접속
□ Substitute Teacher Mode 노트 표시
□ Instructor Mode selector가 현재 모드를 강조
```

## Classroom Deck

```txt
□ /classroom/s01?mode=native 접속
□ Student deck에서도 선택된 Instructor Note 확인 가능
□ Presenter 버튼이 현재 mode를 유지
```

## Report

```txt
□ Classroom 이벤트 metadata에 instructorMode 저장
□ /teacher/report/s01에서 topInstructorMode 표시
□ Instructor Modes 요약 표시
```

## QA

```txt
□ /admin/qa에 네 가지 presenter mode route 포함
□ npm run build 성공
```
