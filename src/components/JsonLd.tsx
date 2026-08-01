/**
 * Renders JSON-LD structured data as a <script> tag.
 * Server component — output is baked into the static HTML at build time,
 * so crawlers see it without executing JavaScript.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
