import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  const activeLinkStyle = "font-medium bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full";
  
  const inactiveLinkStyle = "font-medium bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-gray-700 hover:text-transparent transition-colors duration-300 px-3 py-1.5";

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold">
          <Link 
            to="/" 
            className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-indigo-600 hover:text-transparent transition-colors duration-300"
          >
            Gyanito
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <Link to="/" className={pathname === "/" ? activeLinkStyle : inactiveLinkStyle}>
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/quizzes" className={pathname === "/quizzes" ? activeLinkStyle : inactiveLinkStyle}>
                LeaderBoard
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/dashboard" className={pathname === "/dashboard" ? activeLinkStyle : inactiveLinkStyle}>
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="space-x-3">
          <Link 
            to="/login"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 text-indigo-600 border-indigo-400 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:border-transparent transition-all duration-300"
          >
            Login
          </Link>
          <Link 
            to="/signup"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-indigo-600 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
          >
            Signup
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
