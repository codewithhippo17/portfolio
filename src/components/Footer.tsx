export default function Footer() {
  return (
    <footer className="mt-24 py-8 border-t border-ctp-surface-0 text-sm text-ctp-overlay-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>Built with Next.js · Catppuccin Macchiato</p>
        <p>© {new Date().getFullYear()} Hamza El Haiba</p>
      </div>
    </footer>
  );
}
