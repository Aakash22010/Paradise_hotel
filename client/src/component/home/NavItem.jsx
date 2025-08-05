import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import useClickOutside from './useClickOutside';

const NavItem = ({ item, openDropdown, setOpenDropdown }) => {
  const ref = useRef();
  const location = useLocation();
  const isOpen = openDropdown === item.name;

  useClickOutside(ref, () => {
    if (isOpen) setOpenDropdown(null);
  });

  if (item.dropdown) {
    return (
      <div ref={ref} className="relative group">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : item.name)}
          className="text-black font-medium hover:text-blue-600"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {item.name}
        </button>
        <DropdownMenu items={item.dropdown} isOpen={isOpen} parentName={item.name} />
      </div>
    );
  }

  return (
    <Link
      to={item.href}
      style={{ textDecoration: 'none' }}
      className={`text-black font-medium hover:text-blue-500 ${location.pathname === item.href ? 'text-blue-600 font-semibold' : ''}`}
    >
      {item.name}
    </Link>
  );
};

export default NavItem;
