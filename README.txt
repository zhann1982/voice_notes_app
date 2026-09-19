VOICE NOTES — local-first PWA, version 3.4
==================================

START ON WINDOWS
1. Extract this ZIP.
2. Double-click start-localhost.bat.
3. Open http://localhost:8080/ if the browser does not open automatically.

Node.js is required only for this convenient local launcher. You can also serve the folder from any localhost/HTTPS static server.

IMPORTANT
- Do not use file:// for normal microphone/PWA testing. Microphone recording and service workers need localhost or HTTPS.
- Notes and audio remain in this browser profile/device. The app does not upload recordings to a server.
- Use Settings > Backup to export important data periodically.

VERSION 3 FEATURES
- User-created topic folders in the sidebar.
- Folder colors, rename/delete, drag-and-drop reordering.
- Drag a normal note onto a folder to move it.
- Favorites smart folder, pinning, Recent view.
- Tags and text comments for every note.
- Search across title, text comment, tags and folder name.
- Advanced search operators: tag:, folder:, favorite:, pinned:, after:, before: (quoted values supported).
- Tag filters and quick filters (Today, 7 days, Unfiled).
- Multi-select normal notes for bulk move, tag, favorite, archive, Trash or export.
- Pagination in every note view/search result; page size is configurable.
- Archive stores notes indefinitely; Settings can move the whole Archive to Trash when you decide to clean it.
- Archive review reminder defaults to every 30 days and appears when the app is opened.
- Trash is separate from Archive. Trash auto-deletion defaults to 30 days and can be changed or disabled.
- Light, Dark, Blue, Green, Red and System themes.
- Settings for recording quality, safety duration, default folder, generated title prefix, page size, sorting, date display, Favorites priority, archive confirmation, card density, waveforms and storage.
- Backup/import now includes folders and note metadata; older v1 backups are still accepted.
- Statistics and storage usage.
- Note-related action notifications (saved, moved, archived, restored, deleted, etc.).
- Crash-recovery recording chunks remain stored in IndexedDB during recording.
- Existing notes from earlier versions are migrated automatically and become Unfiled unless they already have a folder.

ARCHIVE REMINDER LIMITATION
The reminder is local and is checked when the PWA/site is opened. Browsers do not reliably allow a completely local PWA to wake itself every 30 days while it is closed, so this build does not claim background reminders when the app is not running.

PRIVACY
No analytics, accounts, cloud sync, external APIs or third-party libraries are used.


Version 3.1 fix:
- Fixed recorder state getting stuck after Stop.
- Added explicit Saving state while MediaRecorder finalizes.
- Recorder now always resets to idle after save/discard/error finalization.
- Live recording indicator and timer are cleared after Stop.

Voice Notes v3.2 additions
--------------------------
- After Stop, a Save recording window asks for title, folder, tags, text comment, Favorite and Pin before the note is added to the list.
- Finished audio remains in recoverable local draft storage until the user saves or explicitly discards it.
- Saved-note playback now shows local-audio loading state, a seekable progress slider, current/total time and buffering/paused status.

Version 3.3 playback sync fix
- Waveform playback progress is synchronized with audio.currentTime on requestAnimationFrame instead of relying on the low-frequency timeupdate event.
- Seeking, pause/resume, buffering and tab visibility changes force an immediate waveform/progress refresh.
- timeupdate is retained only as a compatibility fallback.


Version 3.4 UI + Netlify-ready update
-----------------------------------
- Added “Select all” to bulk actions after selecting a note. It selects every note in the current filtered result, including notes on other pagination pages.
- Centered the main search field in the desktop header and centered the filter row.
- Increased Favorite and Pin controls for easier clicking and clearer visibility.
- Increased the app logo in the header.
- Added netlify.toml and _headers with PWA-friendly cache rules, microphone Permissions-Policy, and service-worker headers.
- Service-worker registration now uses updateViaCache: none so deployments are checked more reliably.
- Service-worker shell cache bumped for this release.

NETLIFY DEPLOYMENT
1. Extract the ZIP.
2. In Netlify, create a new site and deploy the contents of the voice-notes folder (the folder containing index.html).
3. Netlify provides HTTPS automatically. Microphone access must be allowed by the user in the browser.
4. Data remains local to each browser/device in IndexedDB. Deploying to Netlify does not sync or upload existing localhost recordings.
5. Before moving from localhost to the Netlify URL, export a backup in Settings > Backup, then import it on the Netlify site if you want the same notes there.

For Git-based Netlify deploys, netlify.toml is included. For manual drag-and-drop deploys, _headers provides the same important response headers.
