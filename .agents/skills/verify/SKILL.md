---
name: verify
description: Build/launch/drive recipe for verifying UI changes in the h4ppi-web Next.js client at runtime.
---

# Verifying h4ppi-web at runtime

## Launch

```bash
cd client
npm run dev        # ready in ~6s at http://localhost:3000
```

Poll readiness with `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` until 200.

## Drive (headless browser)

Playwright is installed in `client/node_modules` (browsers already downloaded). Drive the real UI with a plain Node script — no test runner needed:

```bash
NODE_PATH=$PWD/client/node_modules node your-driver.cjs
```

`const { chromium } = require("playwright")` works with NODE_PATH set as above (scripts outside `client/` won't resolve it otherwise).

## Gotchas learned the hard way

- Chakra v3 Drawer/Dialog: while open, everything outside the dialog is made inert, so `getByRole("button", ...)` cannot find the trigger — query attributes via `page.evaluate` + `querySelector` instead.
- Ark UI generated ids contain colons (`dialog:_R_..._:title`) — invalid in raw CSS selectors; use `document.getElementById` inside `evaluate`.
- Drawer entry animation takes ~500ms; screenshot after `waitForTimeout(600+)` or you capture it mid-slide.
- Breakpoints: desktop nav shows at `xl` (1280px); 1024px and below get the hamburger + drawer.
- Useful hooks: `nav[aria-label="Primary navigation"]`, `nav[aria-label="Mobile navigation"]`, `getByRole("dialog")`, hamburger `button[aria-label="Open navigation menu"]`.

`npm run check` (from `client/`) is the CI gate — lint + typecheck + vitest + content check + build — but it is not runtime verification; drive the browser too.
