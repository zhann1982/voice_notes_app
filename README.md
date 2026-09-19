# Voice Notes

Local-first PWA for recording and organizing voice notes.

Current release: **v3.4 (Netlify-ready)**.

## Main features

- Voice recording with crash recovery
- Folders, tags and text comments
- Favorites and pinned notes
- Archive and trash with configurable retention
- Search, filters and pagination
- Batch selection and actions
- Multiple themes
- IndexedDB local storage
- Backup and import
- PWA installation
- Netlify configuration

Recordings are stored locally in the user's browser with IndexedDB.

## Run locally

With Node.js installed:

```bash
node server.js
```

Then open `http://localhost:8080/`.

On Windows, `start-localhost.bat` can also be used.

## Deploy to Netlify

The repository includes `netlify.toml` and `_headers`. Connect this repository to Netlify and publish from the repository root.
