import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { IMAGE_PATHS } from "../../common/ImageConstant";

export default function Navbar() {
  const authnavigate = useNavigate(); 

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm font-Annapurna">
      <div className="w-full py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center ml-8">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={IMAGE_PATHS.logo}
              alt="jyaanbanau"
              className="h-20 object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 mr-6">
          <ScrollLink
            to="features"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground hover:text-primary transition cursor-pointer"
            activeClass="text-blue-500 font-bold"
          >
            Features
          </ScrollLink>

          <ScrollLink
            to="steps"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground hover:text-primary transition cursor-pointer"
            activeClass="text-blue-500 font-bold"
          >
            How it Works
          </ScrollLink>

          <ScrollLink
            to="pricing"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground hover:text-primary transition cursor-pointer"
            activeClass="text-blue-500 font-bold"
          >
            Pricing
          </ScrollLink>

          <ScrollLink
            to="testimonials"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-sm text-foreground hover:text-primary transition cursor-pointer"
            activeClass="text-blue-500 font-bold"
          >
            Testimonials
          </ScrollLink>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4 mr-8">
          <button className="w-20 h-10 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium shadow-sm"
          onClick={() => authnavigate("/login")}
          >
            Login
          </button>

          <button
            className="w-20 h-10 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all duration-200 font-medium shadow-md active:bg-blue-800"
            onClick={() => authnavigate("/register")} 
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
