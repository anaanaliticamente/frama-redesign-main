import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Plugin } from "vite";

function markdownToBlocks(md: string) {
  const lines = md.trim().split("\n");
  const blocks: Array<
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "list"; items: string[] }
  > = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Heading (## )
    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", text: line.slice(3).trim() });
      i++;
      continue;
    }

    // List items (- )
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Paragraph — collect lines until blank, heading, or list
    let text = "";
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("## ") &&
      !lines[i].trim().startsWith("- ")
    ) {
      text += (text ? " " : "") + lines[i].trim();
      i++;
    }
    if (text) {
      blocks.push({ type: "paragraph", text });
    }
  }

  return blocks;
}

function generate(contentDir: string, outputFile: string) {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    return;
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug || file.replace(".md", ""),
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      category: data.category || "",
      image: data.image || "",
      readTime: data.readTime || "5 min",
      content: markdownToBlocks(content),
    };
  });

  // Sort by date descending (Spanish date format: "30 de noviembre de 2021")
  const MONTHS: Record<string, number> = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
  };
  posts.sort((a, b) => {
    const parse = (d: string) => {
      const m = d.match(/(\d+)\s+de\s+(\w+)\s+de\s+(\d{4})/);
      if (!m) return 0;
      return new Date(+m[3], MONTHS[m[2].toLowerCase()] ?? 0, +m[1]).getTime();
    };
    return parse(b.date) - parse(a.date);
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log(`[blog] Generated ${posts.length} posts`);
}

export function blogGenerator(): Plugin {
  const contentDir = path.resolve("content/blog");
  const outputFile = path.resolve("public/content/posts.json");

  return {
    name: "blog-generator",
    buildStart() {
      generate(contentDir, outputFile);
    },
    configureServer(server) {
      server.watcher.add(contentDir);

      const rebuild = (file: string) => {
        if (file.includes(path.join("content", "blog")) && file.endsWith(".md")) {
          generate(contentDir, outputFile);
        }
      };

      server.watcher.on("change", rebuild);
      server.watcher.on("add", rebuild);
      server.watcher.on("unlink", rebuild);
    },
  };
}
