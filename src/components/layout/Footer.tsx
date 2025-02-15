
import { Logo } from "./Navbar";

interface FooterProps {
  currentYear: number;
}

const Footer = ({ currentYear }: FooterProps) => {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo />
          <p className="text-muted-foreground text-sm">&copy; {currentYear} The Alerts Company. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a
              href="https://twitter.com/alertscompany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
