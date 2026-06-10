# HBE Vercel Hotfix

Vercel build error:

```txt
Module not found: Can't resolve '@/lib/s1AssetManifest'
```

Fix:

Upload this file to GitHub:

```txt
lib/s1AssetManifest.ts
```

Do not upload the folder itself as an extra nested folder. The final repository path must be:

```txt
happy-bubble-web/
  lib/
    s1AssetManifest.ts
```
