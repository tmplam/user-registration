import { Link } from 'react-router-dom';

export function Navbar() {
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
      </div>
    </nav>
  );
}
