---
title: "Markdown Syntax Guide"
description: "A comprehensive test page to see how all Markdown elements render on the site."
date: "2026-10-03"
---

This is a test post designed to showcase all the Markdown syntax supported on this site. Use this as a visual reference for how your typography CSS renders different elements.

## 1. Text Formatting

Here is how standard inline text formatting looks:

- **Bold:** You can make text **bold** using double asterisks.
- *Italic:* You can make text *italic* using single asterisks or _underscores_.
- ***Bold & Italic:*** You can combine them to make text ***bold and italic***.
- ~~Strikethrough:~~ Use double tildes to ~~cross out text~~.
- ==Highlight:== Use double equals signs to ==highlight text== (if your MDX/remark setup supports it).
- `Inline Code`: Use backticks for `inline code snippets` like `const a = 1;`.

## 2. Headings

Headings create structure and automatically populate the Table of Contents on the left (for H2 and H3).

### This is a Heading 3
It represents a subsection.

#### This is a Heading 4
For minor groupings.

##### This is a Heading 5
Rarely used, but available.

## 3. Lists

### Unordered Lists

- This is a bullet point.
- Here is another one.
  - This one is nested (indented with 2 spaces).
  - Another nested item.
- Back to the main level.

### Ordered Lists

1. First, you do this.
2. Second, you do that.
3. Finally, you finish up.

## 4. Blockquotes

Blockquotes are great for calling out specific text, quotes, or important notes:

> "Architecture is a Conversation, Not a Monument. The most expensive mistake in software isn't bad code. It's building a monument to assumptions that haven't been tested yet."
> — *Hamza El Haiba*

## 5. Code Blocks

Multi-line code blocks include syntax highlighting based on the language specified.

```typescript
// src/example.ts
export function createResilientSystem(isTested: boolean): string {
  if (!isTested) {
    throw new Error("Assumptions must be tested.");
  }
  return "System is ready.";
}
```

```css
/* example.css */
.resilient-box {
  display: flex;
  background-color: var(--ctp-mauve);
  color: var(--ctp-base);
}
```

## 6. Links and Images

Standard web links look like this: [Visit GitHub](https://github.com/).

And here is how a standard image would render (using an external placeholder for the demo):

![A placeholder image](https://picsum.photos/seed/resilient/800/400)

## 7. Dividers

You can break up sections using horizontal rules:

---

End of the syntax guide!
