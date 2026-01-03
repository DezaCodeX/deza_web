import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link 
                to="/admin/dashboard" 
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Requests
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/projects" 
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-900 text-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
