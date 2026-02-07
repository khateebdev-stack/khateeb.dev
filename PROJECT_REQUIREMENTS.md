==================================================
PROJECT VERIFICATION DOCUMENT: MODULAR BLOG ENGINE
==================================================

DATED: 2025-12-16
STATUS: IMPLEMENTATION PHASE

I. USER REQUIREMENTS SUMMARY
--------------------------------------------------
1.  **Open Modular Approach:** The blog system must not be a rigid template. It must use a flexible "Block System" where each post can have a completely unique layout.
2.  **JSON Schema as Database:** Content should be stored in structured JSON files (`content.json`), acting as a local database.
3.  **Directory-Based Structure:** Each blog post gets its own folder (e.g., `src/content/blogs/my-post/`) containing:
    - `content.json` (The logic and content)
    - `prompts.txt` (AI prompts for thumbnails/videos)
    - Assets (images, etc.)
4.  **Advanced SEO & Metadata:** 
    - Fix the "Homepage Metadata" bug on sharing.
    - Each post must generate specific Open Graph (OG) tags for WhatsApp, Facebook, twitter.
    - Support Canonical URLs and Structured Data.
5.  **Page Configuration (Frontend Control):** 
    - The JSON should control the UI (Theme colors, Sidebar visibility, Share button toggles).
    - Support for Sticky Share bars.
6.  **Monetization:** Ads (AdSense/Monetag) must appear on Blog pages but NOT ruin the homepage.
7.  **Navigation:** Add "Blog" to the main website Navbar.
8.  **High-Quality Content:** Create 5-6 real-world, high-value blog posts (Tech, Business, Design, Career) to demonstrate the engine.

II. THE AGREED JSON SCHEMA
--------------------------------------------------
We are using the following strict JSON structure for every blog post. 
This allows for "Case A" (Video First), "Case B" (Text First), etc.

```json
{
  // --- PART 1: SYSTEM & METADATA ---
  "meta": {
    "id": "unique_post_id",
    "slug": "url-friendly-slug",
    "status": "published", // published, draft, archived
    "visibility": "public",
    "author_id": "admin_01"
  },

  // --- PART 2: DATES (Detailed Tracking) ---
  "dates": {
    "created_at": "ISO_DATE",
    "updated_at": "ISO_DATE",
    "published_at": "ISO_DATE"
  },

  // --- PART 3: ADVANCED SEO ---
  "seo": {
    "meta_title": "Browser Tab Title",
    "meta_description": "Search Engine Description",
    "canonical_url": "https://khateeb.dev/blog/...",
    "robots": "index, follow",
    "og_title": "Social Share Title",
    "og_image": "/path/to/image.jpg",
    "keywords": ["tag1", "tag2"]
  },

  // --- PART 4: FRONTEND CONFIGURATION ---
  "page_config": {
    "theme_color": "#ff0000", // Dynamic H1/Accent color
    "show_sidebar": true,
    "social_sharing_display": {
      "sticky_bar": true,
      "show_whatsapp": true,
      "show_copy_link": true,
      "show_github": false
    }
  },

  // --- PART 5: DYNAMIC BLOCKS (The Stream) ---
  "blocks": [
    {
      "type": "video_block",
      "data": { "source": "youtube", "url": "...", "aspect_ratio": "16:9" }
    },
    {
      "type": "rich_text",
      "data": { "html_content": "<h2>...</h2>", "alignment": "left" }
    },
    {
      "type": "code_snippet",
      "data": { "language": "javascript", "code": "..." }
    },
    {
      "type": "image_gallery",
      "data": { "layout_type": "slider", "images": [...] }
    },
    {
      "type": "cta_banner",
      "data": { "headline": "...", "action_url": "..." }
    },
    {
      "type": "reference_block",
      "data": { "items": ["other-post-slug"], "title": "Read Next" }
    }
  ]
}
```

III. IMPLEMENTATION PLAN (DONE/IN-PROGRESS)
--------------------------------------------------
1.  [x] **Architecture Setup:** 
    - Created `src/content/blogs` directory.
    - Created `BlogBuilder.jsx` to render blocks dynamically.
    - Updated `.gitignore` to allow these files.

2.  [x] **Engine Logic:**
    - Updated `blog-utils.js` to parse this specific Schema and map it to the UI.
    - Fixed `[slug]/page.js` to support `page_config` (Sticky Share, Theme Colors).

3.  [x] **Content Creation:**
    - Implementing 6 Blog Posts with distinct layouts (Scalable Architecture, React vs Next, Cloud Costs, etc.).
    - Creating `prompts.txt` for each to guide asset generation.

4.  [x] **SEO & Ads:**
    - implemented `generateMetadata()` for perfect social sharing.
    - Added `SafeAdContainer` to Blog Layout.

5.  [ ] **Final Verification:**
    - User to review this file and confirm understanding.
