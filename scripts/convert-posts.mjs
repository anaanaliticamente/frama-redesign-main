/**
 * One-time script: converts public/content/posts.json → content/blog/*.md
 * Run with: node scripts/convert-posts.mjs
 */
import fs from "fs";
import path from "path";

const posts = JSON.parse(
  fs.readFileSync("public/content/posts.json", "utf-8")
);

const outDir = "content/blog";
fs.mkdirSync(outDir, { recursive: true });

for (const post of posts) {
  // Build markdown body from content blocks
  const bodyParts = [];
  for (const block of post.content || []) {
    if (block.type === "heading") {
      bodyParts.push(`## ${block.text}`);
    } else if (block.type === "list") {
      bodyParts.push(block.items.map((item) => `- ${item}`).join("\n"));
    } else {
      bodyParts.push(block.text);
    }
  }

  const frontmatter = [
    "---",
    `slug: "${post.slug}"`,
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `date: "${post.date}"`,
    `excerpt: "${post.excerpt.replace(/"/g, '\\"')}"`,
    `category: "${post.category}"`,
    `image: "${post.image}"`,
    `readTime: "${post.readTime}"`,
    "---",
  ].join("\n");

  const content = frontmatter + "\n\n" + bodyParts.join("\n\n") + "\n";
  const filename = `${post.slug}.md`;

  fs.writeFileSync(path.join(outDir, filename), content);
  console.log(`Created: ${filename}`);
}

console.log(`\nConverted ${posts.length} posts to ${outDir}/`);
