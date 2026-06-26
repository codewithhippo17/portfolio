export default function Footer() {
  return (
    <footer className="mt-24 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ctp-overlay-0">
      <p>hamza el haiba © {new Date().getFullYear()}</p>
      
      <div className="flex gap-4">
        <a 
          href="https://github.com/codewithhippo17" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-ctp-mauve transition-colors"
        >
          github
        </a>
        <a 
          href="https://linkedin.com/in/elhaibahamza" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-ctp-blue transition-colors"
        >
          linkedin
        </a>
        <a 
          href="mailto:contact@elhaiba-hamza.tech" 
          className="hover:text-ctp-peach transition-colors"
        >
          email
        </a>
      </div>
    </footer>
  );
}
