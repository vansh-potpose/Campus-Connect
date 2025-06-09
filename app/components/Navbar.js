import Image from "next/image";
import { IoPersonSharp } from "react-icons/io5";

const navItems = ["Home", "Dashboard", "Query", "Settings"];

const Navbar = ({ currentPage, setCurrentPage, user }) => {
    return (
        <nav className="fixed w-full flex justify-between items-center bg-white h-16 px-5 border-b-[1px] border-blue-200">
            {/* Left - Logo */}
            <div className="flex items-center gap-2 overflow-hidden">
                <Image
                    src="/icon2.webp"
                    alt="Logo"
                    width={60} 
                    height={60}
                    className="rounded-full scale-125"
                />
                <p className="text-blue-700 font-semibold text-lg">Campus Connect</p>
            </div>

            {/* Middle - Navigation Links */}
            <ul className="flex gap-3 items-center">
                {navItems.map((item) => (
                    <li
                        key={item}
                        role="button"
                        tabIndex={0}
                        onClick={() => setCurrentPage(item)}
                        className={`px-3 py-1 border-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-300
                            ${
                                currentPage === item
                                    ? "border-blue-400 text-blue-50 bg-blue-600"
                                    : "border-transparent text-blue-700 hover:border-blue-400 hover:text-blue-600"
                            }`}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {/* Right - User Info */}
            <div className="flex gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center bg-blue-100 p-2 rounded-full w-10 h-10">

                    <IoPersonSharp className="text-blue-600" size={30} />
                    </div>
                    <p className="text-blue-700 text-sm font-medium">{user.name}</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
