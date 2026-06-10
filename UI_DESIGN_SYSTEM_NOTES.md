# Happy Bubble Web MVP · UI Design System

이번 패키지는 기능형 MVP를 제품형 UI 구조로 다듬은 버전입니다.

## 추가된 UI 컴포넌트

```txt
components/ui/Button.tsx
components/ui/Card.tsx
components/ui/Badge.tsx
components/ui/PageTitle.tsx
components/ui/ModeShell.tsx
components/ui/AdminShell.tsx
components/ui/ChildHero.tsx
components/ui/FeatureTile.tsx
components/ui/TeacherStepCard.tsx
```

## 모드 분리

```txt
Child Mode
→ 아이가 보는 학습 화면
→ 큰 버튼, 단순한 선택, 버블형 Hero

Teacher Mode
→ 교사용 수업 운영 화면
→ Step Card, 실행 버튼, 백업 플랜

Admin Mode
→ 운영자 관리 화면
→ Sidebar, Overview, QA, QR, Asset, Data
```

## 컬러 역할

```txt
Primary Action → Green #5DA636
Main Text → Navy #1B4F8A
Reward / Ready → Gold #F5B800
Soft Background → Sky #E8F4FB
Paper / Warm Section → Cream #FFF4D6
Warning / Missing → Peach #FDE7E0
Preview / Coming Soon → Lilac #EFE6FA
Page BG → #FBF8EF
```

## 개선된 페이지

```txt
/sessions
/sessions/s01
/teacher/s01
/teacher/[sessionId]
/admin
/admin/qa
```

## 아직 남은 UI 작업

```txt
1. Phaser 내부 UI polish
2. Adam/J 캐릭터 hero asset 삽입
3. Admin 기능을 /admin/content, /admin/qr, /admin/assets, /admin/data로 분리
4. Parent Mode 리디자인
5. 모바일 터치 테스트
```
