# Happy Bubble Web

HBE Happy Bubble English web learning platform.

This repository contains the Session 1 teaching-ready MVP for Happy Bubble English.

## Current scope

This project is focused on making **Session 1** ready for real classroom use.

Session 2 and later sessions will be expanded in a separate development phase.

## Main features

```txt
Student Mode
Teacher Mode
Classroom Mode
Presenter View
Instructor Mode
S1 Game Pack
Game Report
Classroom Report
Parent Mode
Admin QA
S1 Asset Guide
```

## Important S1 routes

```txt
/sessions
/sessions/s01

/classroom/s01
/classroom/s01/presenter?mode=korean
/classroom/s01/presenter?mode=native
/classroom/s01/presenter?mode=bilingual
/classroom/s01/presenter?mode=substitute
/classroom/s01/overview

/game/s01
/game/s01/sound-match
/game/s01/bubble-pop
/game/s01/build-sat

/teacher/s01
/teacher/s1-ready
/teacher/s1-assets
/teacher/report/s01
/teacher/game-report/s01

/parent

/admin
/admin/qa
/admin/s1-ready
/admin/s1-assets
/admin/classroom-report
/admin/game-report
```

## Required S1 assets before real class

The app can build without these files, but real S1 classroom testing requires them.

```txt
public/assets/theater/HBE_BT_S01_FINAL.mp4
public/assets/singing/HBE_SB_Hello.mp3
public/assets/singing/HBE_SB_S01.mp3
public/assets/singing/HBE_SB_Goodbye.mp3
public/assets/worksheets/HBE_WS_S01.pdf
public/assets/flashcards/HBE_FC_S01.pdf
```

## Local development

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Build check

```bash
npm run build
```

## HBE checks

```bash
npm run audit:hbe:source
npm run audit:hbe:routes
npm run audit:hbe:assets
npm run check:s1:filenames
npm run audit:hbe
```

## Vercel deployment note

If Vercel fails with a module error, check that the referenced file exists in the correct root path.

The repository root should look like this:

```txt
package.json
app/
components/
game/
lib/
public/
scripts/
```

Do not upload the project folder as a nested folder.

Correct:

```txt
happy-bubble-web/
  package.json
  app/
  components/
  lib/
```

Incorrect:

```txt
happy-bubble-web/
  happy-bubble-web-mvp-s1-asset-ready/
    package.json
    app/
    components/
    lib/
```

## Recent hotfix notes

Sound Match page should pass `gameSession` to the Phaser component.

Correct:

```tsx
<PhaserSoundMatchGame gameSession={gameSession} />
```

Incorrect:

```tsx
<PhaserSoundMatchGame sessionId="s01" />
```

S1 asset manifest should exist here:

```txt
lib/s1AssetManifest.ts
```

## Current goal

```txt
Finish Session 1 until it can be used for a real class.
Then continue Session 2 in a new chat/development phase.
```
