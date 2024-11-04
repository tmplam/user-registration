import { Navbar } from '@/components';
import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div className="">
      <div className="border-b-2 bg-white fixed left-0 right-0 top-0">
        <div className="container mx-auto">
          <div className="py-3 px-2 md:px-0">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="container min-h-screen mx-auto pt-16 px-2 md:px-0">
        <Outlet />
      </div>
    </div>
  );
}
