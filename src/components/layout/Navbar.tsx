
import { Bell } from "lucide-react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <Bell className="w-5 h-5 text-white" />
    <span className="font-light tracking-[0.25em] text-base uppercase">The Alerts Company</span>
  </div>
);

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-6">
        <Logo />
      </div>
    </nav>
  );
};

export default Navbar;
