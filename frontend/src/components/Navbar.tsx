import { useUserStore } from '@/store';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const { accessToken, clearAccessToken } = useUserStore();
  const navigate = useNavigate();
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function toggleUserMenu() {
    setIsUserMenuVisible((prev) => !prev);
  }

  function handleLogout() {
    clearAccessToken();
    navigate('/');
  }

  return (
    <nav className="flex justify-between items-center">
      <div>
        <Link
          className="text-xl font-semibold"
          to="/"
        >
          Home
        </Link>
      </div>
      <div>
        {accessToken ? (
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full cursor-pointer border"
              src="/images/avatar.png"
              alt="User dropdown"
              onClick={toggleUserMenu}
            />

            <div
              className={`z-10 absolute end-0 top-12 bg-white divide-y divide-gray-200 rounded-lg border shadow-md w-44 ${
                isUserMenuVisible ? '' : 'hidden'
              }`}
              ref={menuRef}
              onClick={toggleUserMenu}
            >
              <ul
                className="py-2 text-sm text-gray-600"
                aria-labelledby="avatarButton"
              >
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              <div className="py-1">
                <a
                  className="block cursor-pointer px-4 py-2 text-gray-600 text-sm hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link
              className="bg-blue-500/50 hover:bg-blue-400/50 inline-block py-2 px-4 rounded-lg font-semibold text-primary mr-4"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="bg-primary hover:bg-blue-500 inline-block py-2 px-4 rounded-lg font-semibold text-white"
              to="/register"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
