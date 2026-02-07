# Modular JSON Blog Engine Architecture

This project implements a fully dynamic, block-based Content Management System (CMS) using local JSON files. This approach decouples content from design, allowing for complex layouts without touching React code for every new post.

## 1. Core Concept: "Everything is a Block"
Instead of a single "body" text field, content is structured as a stream of **Blocks**.
Each block has a `type` (defining the component) and `data` (props for that component).

### Schema Structure
Each post lives in `src/content/blogs/[slug]/content.json`:

```json
{
  "meta": { "slug": "my-post", "status": "published" },
  "seo": { "title": "My Post", "og_image": "/img/share.jpg" },
  "blocks": [
    { "type": "rich_text", "data": { "html_content": "<p>Hello</p>" } },
    { "type": "video_block", "data": { "url": "..." } },
    { "type": "code_snippet", "data": { "code": "console.log('hi')" } }
  ]
}
```

## 2. Directory Structure
```
src/
├── components/
│   └── blog/
│       ├── BlogBuilder.jsx      <-- The "Factory" that renders blocks
│       └── blocks/              <-- Individual Components
│           ├── VideoBlock.jsx
│           ├── CodeSnippet.jsx
│           └── ...
├── content/
│   └── blogs/
│       └── [slug]/              <-- One Folder Per Post
│           ├── content.json     <-- The Database
│           └── prompts.txt      <-- Content generation prompts
└── lib/
    └── blog-utils.js            <-- Data Fetching Layer
```

## 3. How to Reuse in Another Project
This module is strictly decoupled. To port it to a new Next.js project:

1.  **Copy Components:** Copy `src/components/blog` folder.
2.  **Copy Utils:** Copy `src/lib/blog-utils.js`.
3.  **Setup Pages:** Create `app/blog/[slug]/page.js` and use `<BlogBuilder blocks={data.blocks} />`.
4.  **Install Dependencies:** Ensure `lucide-react` is installed (used for icons).

## 4. Expanding the System
To add a new Block Type (e.g., `SpotifyEmbed`):
1.  Create `src/components/blog/blocks/SpotifyEmbed.jsx`.
2.  Import it in `BlogBuilder.jsx`.
3.  Add it to the `BLOCK_COMPONENTS` map:
    ```javascript
    const BLOCK_COMPONENTS = {
        ...,
        'spotify_embed': SpotifyEmbed
    }
    ```
4.  Use `{ "type": "spotify_embed" }` in your JSON.

## 5. Legacy Support
The system supports `.txt` files with Frontmatter. They are automatically converted into a single `legacy_markdown` block, ensuring backward compatibility.
