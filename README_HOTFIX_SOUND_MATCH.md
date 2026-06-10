# HBE Vercel Hotfix · Sound Match Prop

Vercel build error:

```txt
Type error: Type '{ sessionId: string; }' is not assignable to type '{ gameSession: BubbleGameSession; }'.
Property 'sessionId' does not exist.
```

Fix:

Replace this file in GitHub:

```txt
app/game/s01/sound-match/page.tsx
```

The page now passes:

```tsx
<PhaserSoundMatchGame gameSession={gameSession} />
```

instead of:

```tsx
<PhaserSoundMatchGame sessionId="s01" />
```
