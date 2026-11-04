# Journal

The journal is a static, dependency-free part of the site. It starts empty so no writing is attributed to Amir until an actual post is supplied. Posts have their own URLs, work without JavaScript, and are readable by search engines.

## Add a post

1. Copy `blog/post-template.html` to `blog/posts/your-post-slug.html`. Use a lowercase, hyphen-separated filename.
2. Replace the title, description, date, introduction, and text in the copy. The template's CSS and navigation paths are already relative to `blog/posts/`. Remove its `noindex` meta tag when the post is ready to publish. Use ordinary HTML paragraphs, headings, links, lists, or code blocks inside `.article-body`.
3. Add an entry inside the `post-list` in `blog/index.html`, for example:

   ```html
   <li><a href="posts/your-post-slug.html"><span>Post title</span><time datetime="2026-01-01">JAN 01, 2026</time></a></li>
   ```

4. Remove the `journal-empty` block when the first post is published. Commit the new post and the updated index together. The normal GitHub Pages deployment serves both; no build step is needed.

For a Persian post, set the copied document’s opening tag to `<html lang="fa" dir="rtl">`; keep the file encoded as UTF-8.

Preview locally from the repository root with `python3 -m http.server 8000`. Review the journal index and the post in a browser before publishing.
