import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase'; // adjust if needed
import logo from '../../assets/logo.jpg';
import NavItem from './NavItem';
import "../style/navbar.css";

const navItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Rooms & Suites',
    dropdown: [
      { name: 'Deluxe Rooms', href: '/rooms/deluxe' },
      { name: 'Family Rooms', href: '/rooms/family' },
      { name: 'Room Features', href: '/rooms/features' }
    ]
  },
  {
    name: 'Dining',
    dropdown: [
      { name: 'Restaurants & Bars', href: '/dining/restaurants' },
      { name: 'Breakfast', href: '/dining/breakfast' },
      { name: 'Room Service', href: '/dining/room-service' },
      { name: 'Menus', href: '/dining/menus' },
      { name: 'Special Events', href: '/dining/events' }
    ]
  },
  {
    name: 'Amenities',
    dropdown: [
      { name: 'Swimming Pool', href: '/amenities/pool' },
      { name: 'Spa & Wellness', href: '/amenities/spa' },
      { name: 'Fitness Center', href: '/amenities/fitness' },
      { name: 'Meeting Rooms', href: '/amenities/meeting' },
      { name: 'Concierge Services', href: '/amenities/concierge' }
    ]
  },
  { name: 'Gallery', href: '/hotels' },
  { name: 'Offers', href: '/offers' },
  { name: 'Feedback', href: '/feedback' },
  { name: 'Admin', href: '/admin' }
];

const nounderline = {
  textDecoration: 'none'
};

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Brand */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center" style={nounderline}>
              <div className="w-12 h-12 bg-gray-300 rounded overflow-hidden">
                <img src={logo} alt="Paradise Hotel Logo" className="w-full h-full object-cover" />
              </div>
              <span className="ml-3 font-bold text-xl text-gray-800">Paradise Hotel</span>
            </Link>
          </div>

          {/* Center: Navigation Items */}
          <div className="hidden lg:flex flex-1 justify-center space-x-6" style={nounderline}>
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
          </div>

          {/* Right: Login/Signup or Profile */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0" style={nounderline}>
            {user ? (
              <Link to="/profile" style={nounderline}>
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/40'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300 hover:scale-105 transition"
                />
              </Link>
            ) : (
              <>
                <Link to="/signin" style={nounderline}>
                  <button className="btn-1">
                    <div className="original">Log in</div>
                    <div className="letters">
                      <span>L</span><span>O</span><span>G</span><span>I</span><span>N</span>
                    </div>
                  </button>
                </Link>
                <Link to="/signup" style={nounderline}>
                  <button className="btn-1">
                    <div className="original">Signup</div>
                    <div className="letters">
                      <span>S</span><span>I</span><span>G</span><span>N</span><span>U</span><span>P</span>
                    </div>
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggler */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4">
          {navItems.map((item) => (
            <div key={item.name} className="mt-2">
              <NavItem
                item={item}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                isMobile={true}
              />
            </div>
          ))}
          <div className="mt-4 space-y-2">
            {user ? (
              <Link to="/profile" style={nounderline}>
                <div className="flex items-center space-x-2">
                  <img
                    src={user.photoURL || 'https://i.pravatar.cc/40'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="font-medium text-gray-700">{user.displayName || 'Profile'}</span>
                </div>
              </Link>
            ) : (
              <>
                <Link to="/signin" style={nounderline}>
                  <button className="btn-1">
                    <div className="original">Log in</div>
                    <div className="letters">
                      <span>L</span><span>O</span><span>G</span><span>I</span><span>N</span>
                    </div>
                  </button>
                </Link>
                <Link to="/signup" style={nounderline}>
                  <button className="btn-1">
                    <div className="original">Signup</div>
                    <div className="letters">
                      <span>S</span><span>I</span><span>G</span><span>N</span><span>U</span><span>P</span>
                    </div>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
