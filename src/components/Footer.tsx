export default function Footer() {
  return (
    <footer className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ctp-overlay-0">
      <p>hamza el haiba © {new Date().getFullYear()}</p>
      
      <div className="flex gap-4 items-center">
        <a 
          href="https://github.com/codewithhippo17" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-ctp-mauve transition-colors"
          aria-label="GitHub"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a 
          href="https://linkedin.com/in/el-haiba-hamza-1628a1403" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-ctp-blue transition-colors"
          aria-label="LinkedIn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a 
          href="https://x.com/elhaiba__hamza" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-ctp-lavender transition-colors"
          aria-label="X"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a 
          href="https://www.reddit.com/u/LongFaithlessness366/s/ai1Wg19f6I" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-ctp-red transition-colors"
          aria-label="Reddit"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.825.07 3.48.632 4.674 1.488a1.745 1.745 0 0 1 1.065-.357c.965 0 1.75.785 1.75 1.75 0 .717-.44 1.327-1.055 1.591.025.175.04.351.04.53 0 2.953-3.284 5.348-7.325 5.348S5.02 16.703 5.02 13.75c0-.179.015-.355.04-.53a1.773 1.773 0 0 1-1.005-1.591c0-.965.785-1.75 1.75-1.75.398 0 .768.14 1.065.357 1.194-.856 2.85-1.418 4.675-1.488l.799-3.747a.3.3 0 0 1 .347-.245l3.248.684a1.247 1.247 0 0 1 1.086-.646zM8.25 11.81c-.719 0-1.25.542-1.25 1.25 0 .709.531 1.251 1.25 1.251.718 0 1.25-.542 1.25-1.25 0-.709-.532-1.251-1.25-1.251zm3.75.001a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75zm-2.032 2.668a.685.685 0 0 0-.397.192.535.535 0 0 0-.007.743.533.533 0 0 0 .743.007 2.88 2.88 0 0 1 1.943-.694c.744 0 1.416.266 1.943.694a.533.533 0 0 0 .743-.007.535.535 0 0 0-.007-.743.685.685 0 0 0-.397-.192 3.94 3.94 0 0 0-2.282 0z" />
          </svg>
        </a>
        <a 
          href="https://medium.com/@elhaiba.hamza" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-ctp-green transition-colors"
          aria-label="Medium"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z" />
          </svg>
        </a>
        <a 
          href="mailto:contact@elhaiba-hamza.tech" 
          className="hover:text-ctp-peach transition-colors"
          aria-label="Email"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M22 4l-10 8L2 4"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
