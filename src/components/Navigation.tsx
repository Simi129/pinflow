import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Grid2X2, PlusCircle, Settings, LogOut, Share2, Mail } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  className?: string;
  user?: any;
}

export function Sidebar({ className, user }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Publications', icon: Grid2X2, path: '/publications' },
    { name: 'Create', icon: PlusCircle, path: '/create' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const displayEmail = user?.email || '';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <aside className={cn("h-screen w-64 fixed left-0 top-0 bg-white dark:bg-stone-900 border-r border-stone-100 dark:border-stone-800 flex flex-col py-6 z-50", className)}>
      <div className="px-8 mb-10">
        <Link to="/" className="text-xl font-black text-primary">PinFlow Pro</Link>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-1">Business Account</p>
      </div>

      <nav className="flex-grow space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 font-medium text-sm transition-all duration-200 hover:translate-x-1",
                isActive
                  ? "text-primary border-l-4 border-primary bg-surface-container-low"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              )}
            >
              <item.icon size={20} fill={isActive ? "currentColor" : "none"} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-auto">
        <div className="bg-surface-container-low rounded-xl p-4 mb-6">
          <p className="text-xs font-bold text-on-surface mb-2">Pro Analytics</p>
          <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed">Get deeper insights with our advanced automation tools.</p>
          <button className="w-full py-2 px-4 rounded-full primary-gradient text-on-primary text-xs font-bold shadow-sm active:scale-95 transition-all">
            Upgrade Now
          </button>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white text-xs font-black flex-shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-bold text-on-surface truncate">{displayName}</p>
            <p className="text-[10px] text-on-surface-variant truncate">{displayEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function Navbar() {
  const location = useLocation();

  const navLinks = [
    { label: 'Features', to: '/#features' },
    { label: 'Solutions', to: '/#solutions' },
    { label: 'Pricing', to: '/#pricing' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-stone-100">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-black text-primary font-headline">PinFlow</Link>
        <div className="hidden md:flex items-center gap-8 font-headline font-bold text-lg tracking-tight">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.to}
              className="text-on-surface-variant hover:text-on-surface transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-on-surface-variant font-bold hover:text-on-surface">Login</Link>
          <Link to="/signup" className="primary-gradient text-on-primary px-6 py-2 rounded-xl font-bold transition-all hover:scale-105 shadow-lg">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-stone-50 w-full py-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-headline font-bold text-on-surface text-xl mb-4">PinFlow</div>
          <p className="text-on-surface-variant text-sm max-w-xs">Automate your Pinterest growth with the world's most reliable scaling tool.</p>
        </div>
        <div>
          <h6 className="font-headline font-bold text-on-surface mb-4">Product</h6>
          <ul className="space-y-2 text-on-surface-variant text-sm">
            <li><a href="/#features" className="hover:underline hover:text-primary">Features</a></li>
            <li><Link to="#" className="hover:underline hover:text-primary">API Docs</Link></li>
            <li><Link to="#" className="hover:underline hover:text-primary">Help Center</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-headline font-bold text-on-surface mb-4">Legal</h6>
          <ul className="space-y-2 text-on-surface-variant text-sm">
            <li><Link to="#" className="hover:underline hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:underline hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-headline font-bold text-on-surface mb-4">Connect</h6>
          <div className="flex gap-4">
            <Share2 className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" size={20} />
            <Mail className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" size={20} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-stone-200 text-center md:text-left">
        <p className="text-sm text-on-surface-variant">© 2024 PinFlow Automation. All rights reserved.</p>
      </div>
    </footer>
  );
}