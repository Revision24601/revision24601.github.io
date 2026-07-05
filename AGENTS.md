# revision24601.github.io

Personal portfolio website for Nischay Mohan.

## Cursor Cloud specific instructions

### What this repo is
- Primary product: a **static portfolio website** (deployed via GitHub Pages — `.nojekyll` disables Jekyll). The real pages are the root-level HTML files: `index.html` (home), `projects.html`, `about.html`, plus assets in `static/`.
- Secondary: a small **Flask dev server** (`app.py`, and a near-duplicate `app/routes.py`) that renders pages from `templates/` via Jinja2.
- `parallax-master/` is a vendored third-party library (Parallax.js), not a product built here; its pre-built output already exists in `parallax-master/deploy/`.

### Running the site (dev)
- Static site (matches how GitHub Pages serves it), from the repo root: `python3 -m http.server 8000` then open `http://127.0.0.1:8000/index.html`. Uses only the Python stdlib.
- Flask server: `python3 app.py` serves on `0.0.0.0:5000` (debug on). `app/routes.py` binds Flask defaults (`127.0.0.1:5000`).

### Non-obvious caveats
- **The Flask app is broken on `master`.** `app.py` calls `render_template('index.html')`, but on `master` the `templates/` folder only contains `base.html`, so requests return HTTP 500 (`TemplateNotFound`). The complete Jinja templates (`templates/index.html`, `projects.html`, `about.html`) live on the **`flask` branch** — check out that branch to develop/run the Flask serving path. On `master`, use the static server above to run the product.
- There is **no `requirements.txt`/`pyproject.toml`**; Flask is the only Python dependency and is installed via pip (see update script).
- There are **no automated tests and no lint config** in this repo.
- The floating chatbot widget (`static/js/chatbot.js`) calls the OpenAI API directly from the browser and requires a valid key; it is optional and non-blocking for viewing the site. Note the file currently contains a hard-coded API key committed to the repo.
