# AEG-v1 Design Sync Notes

## Setup

- This is a Next.js 14 *application* (not a component library). No `dist/` build exists.
- Components live in `src/components/` and all use `export default`.
- A self-symlink at `node_modules/adventure-experts-georgia → ../` lets the converter find the project root as the package dir and trigger the synth-entry path.
- `src/components/index.ts` is a hand-authored barrel file with `export { default as Name }` for all 14 components. It is the bundle entry (`cfg.entry`). Without it, the converter's auto-generated synth-entry uses `export *` which skips default exports and produces an empty `window.AEG`.
- `cfg.componentSrcMap` enumerates all 14 components explicitly because the project has no `.d.ts` tree and synth-entry DTS discovery finds nothing.

## Next.js shim

- `.design-sync/overrides/bundle.mjs` forks the bundler to intercept `next/image`, `next/link`, `next/navigation`, and any other `next/*` imports before esbuild tries to bundle the real Next.js runtime.
- The real `node_modules/next/` client modules reference `process` and other Node globals that break in a browser IIFE.
- `next/image` → plain `<img>` with fill/style support.
- `next/link` → plain `<a>` with href, style, onClick, aria-label forwarding.
- `next/navigation` → mock hooks: `usePathname` returns `'/'`, `useSearchParams` returns empty `URLSearchParams`, `useRouter` returns no-ops.
- The fork imports `esbuild` via a local symlink: `.design-sync/overrides/node_modules/esbuild → ../../../.ds-sync/node_modules/esbuild`.

## Re-sync risks

- **Self-symlink**: `node_modules/adventure-experts-georgia` is a symlink to `../`. After a fresh `npm install` it may be overwritten. Check it exists before re-syncing: `ls node_modules/adventure-experts-georgia/package.json`.
- **esbuild symlink**: `.design-sync/overrides/node_modules/esbuild` points into `.ds-sync/node_modules/`. If `.ds-sync/` is re-staged (a new design-sync session), this symlink stays valid as long as esbuild is still installed there. If the session cleans `.ds-sync/` before re-staging, the symlink will break — re-create it: `ln -sf ../../../.ds-sync/node_modules/esbuild .design-sync/overrides/node_modules/esbuild`.
- **New Next.js imports**: If a future component imports a new `next/*` module not already shimmed, it will bundle fine (the catch-all `next/*` shim returns `{}`), but that module's functionality will silently no-op in previews. Add an explicit shim to the fork if the component depends on it.
- **`src/components/index.ts`**: This file must stay in sync with the actual component list in `src/components/`. Adding a new component requires updating both `index.ts` and `cfg.componentSrcMap`.
- **Floor cards only**: All 14 previews are unauthored typographic floor cards. No authored `.design-sync/previews/<Name>.tsx` files were written. The previews show the component name and prop types but no live renders. Author previews incrementally on re-sync for higher fidelity.
