
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Header() {
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/leaderboard", label: "Leaderboard" },
        { to: "/about", label: "About" },
    ];

    return (
        <div>
        <nav className="w-[80%] mx-auto mt-[30px] bg-slate-900/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg rounded-xl border border-slate-700">
            <div className="text-3xl font-bold tracking-wider">
                <Link to="/" className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Gyanito
                </Link>
            </div>

            <div className="hidden md:flex">
                <NavigationMenu>
                    <NavigationMenuList>
                        {navLinks.map((link) => (
                            <NavigationMenuItem key={link.to}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to={link.to}
                                        className="group bg-transparent hover:bg-transparent focus:bg-transparent relative !text-lg !font-medium !text-slate-200 transition-colors duration-300 hover:!bg-gradient-to-r hover:!from-purple-500 hover:!to-pink-500 hover:!bg-clip-text hover:!text-transparent py-2 px-4"
                                    >
                                        {link.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="hidden md:flex items-center gap-6">
                 <Link
                    to="/login"
                    className="relative group text-lg font-medium text-slate-200 transition-colors duration-300 hover:bg-gradient-to-r hover:from-sky-400 hover:to-cyan-300 hover:bg-clip-text hover:text-transparent"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
                >
                    Sign Up
                </Link>
            </div>

            <div className="md:hidden">
                <button className="text-white focus:outline-none">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </nav>
        </div>
    );
};
