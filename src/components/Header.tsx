import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Palette, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetHeader as SheetHead, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-to-r from-[hsl(var(--primary))]/70 via-[hsl(var(--secondary))]/60 to-[hsl(var(--accent))]/60 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Palette className="h-6 w-6 text-accent" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Style Your Way
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            Products
          </Link>
          <Link to="/customize" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            Studio
          </Link>
          <Link to="/ai-designer" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            AI Designer
          </Link>
          <Link to="/gallery" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            Gallery
          </Link>
          <Link to="/about" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            Contact
          </Link>
          <Link to="/payments" className="text-sm font-medium transition-all hover:scale-[1.03] hover:text-primary">
            Payments
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user && (
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/customize" className="cursor-pointer">Customize Studio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ai-designer" className="cursor-pointer">AI Designer</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Sign In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-gradient-to-b from-[hsl(var(--secondary))]/80 to-[hsl(var(--accent))]/60 backdrop-blur-md">
              <SheetHead>
                <SheetTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Menu</SheetTitle>
              </SheetHead>
              <div className="mt-6 grid gap-3">
                <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
                <Link to="/products" className="text-sm font-medium hover:text-primary">Products</Link>
                <Link to="/customize" className="text-sm font-medium hover:text-primary">Studio</Link>
                <Link to="/ai-designer" className="text-sm font-medium hover:text-primary">AI Designer</Link>
                <Link to="/gallery" className="text-sm font-medium hover:text-primary">Gallery</Link>
                <Link to="/about" className="text-sm font-medium hover:text-primary">About</Link>
                <Link to="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
                <Link to="/payments" className="text-sm font-medium hover:text-primary">Payments</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
