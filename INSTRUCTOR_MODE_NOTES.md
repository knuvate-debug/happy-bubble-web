# Happy Bubble Web MVP · Instructor Mode Package

이번 패키지는 원어민 강사, 한국인 강사, 이중언어 지원, 대체강사 모두가 같은 Classroom Deck을 안정적으로 운영할 수 있도록 Instructor Mode Layer를 추가한 버전입니다.

## 추가 모드

```txt
native
korean
bilingual
substitute
```

## 라우트 사용 방식

```txt
/classroom/s01?mode=native
/classroom/s01?mode=korean
/classroom/s01?mode=bilingual
/classroom/s01?mode=substitute

/classroom/s01/presenter?mode=native
/classroom/s01/presenter?mode=korean
/classroom/s01/presenter?mode=bilingual
/classroom/s01/presenter?mode=substitute
```

## 추가 파일

```txt
lib/instructorModes.ts
components/classroom/InstructorModeSelector.tsx
components/classroom/InstructorNotePanel.tsx
components/classroom/InstructorModeCards.tsx
```

## 수정된 구조

기존:

```txt
slide.teacherNote
```

변경:

```txt
slide.teacherNote
slide.teacherNotes.native
slide.teacherNotes.korean
slide.teacherNotes.bilingual
slide.teacherNotes.substitute
```

기존 `teacherNote`는 fallback으로 유지했습니다.

## 수업 기록

Classroom 이벤트 metadata에 instructorMode가 저장됩니다.

```txt
metadata.instructorMode
```

Classroom Report는 가장 많이 기록된 instructor mode를 요약합니다.

## 외부 파일 필요 여부

이번 단계에는 외부 파일이 필요하지 않습니다.

나중에 선택적으로 있으면 좋은 파일:

```txt
public/assets/icons/instructor-native.png
public/assets/icons/instructor-korean.png
public/assets/icons/instructor-bilingual.png
public/assets/icons/instructor-substitute.png
```
