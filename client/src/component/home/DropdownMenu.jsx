import { Link, useLocation } from 'react-router-dom';

const DropdownMenu = ({ items, isOpen, parentName }) => {
  const location = useLocation();

  const nounderline = {
    textDecoration: 'none'
  };

  return (
    <div className={`absolute left-0 mt-0 w-48 bg-white border shadow-lg rounded-md z-10 transition-opacity duration-200 ${isOpen ? 'block' : 'hidden'}`}>
      {items.map((sub) => (
        <Link
          key={sub.name}
          to={sub.href}
          style={nounderline}
          className={`block px-4 py-2 text-sm ${location.pathname === sub.href ? 'text-blue-600 font-semibold' : 'text-black'} hover:bg-gray-200 hover:text-blue-600`}
        >
          {sub.name}
        </Link>
      ))}
    </div>
  );
};

export default DropdownMenu;
