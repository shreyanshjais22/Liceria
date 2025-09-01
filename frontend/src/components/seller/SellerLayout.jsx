import { data, Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { 
      name: "Add Product", 
      path: "/seller", 
      icon: assets.add_icon,
      description: "Add new products"
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
      description: "Manage inventory"
    },
    { 
      name: "Orders", 
      path: "/seller/orders", 
      icon: assets.order_icon,
      description: "Track orders"
    },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 md:px-8 py-4">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <img
              src={assets.logo}
              alt="Company Logo"
              className="w-10 h-10 group-hover:scale-105 transition-transform"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your business</p>
            </div>
          </Link>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* Welcome Message */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">A</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Welcome, Admin</p>
                <p className="text-xs text-gray-500">Seller Account</p>
              </div>
            </div>

            {/* Mobile Admin Indicator */}
            <div className="md:hidden">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-xs">A</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-16 md:w-72 bg-white border-r border-gray-200 shadow-sm">
          <nav className="p-4">
            {/* Navigation Header */}
            <div className="hidden md:block mb-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Navigation
              </h2>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              {sidebarLinks.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  end={item.path === "/seller"}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600 ml-1"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Icon Container */}
                      <div className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}>
                        <img 
                          src={item.icon} 
                          alt={item.name}
                          className="w-5 h-5" 
                        />
                      </div>

                      {/* Text Content */}
                      <div className="hidden md:block flex-1 min-w-0">
                        <p className={`font-medium truncate ${
                          isActive ? 'text-blue-900' : 'text-gray-900 group-hover:text-gray-900'
                        }`}>
                          {item.name}
                        </p>
                        <p className={`text-sm truncate ${
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {item.description}
                        </p>
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <div className="hidden md:block w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="hidden md:block mt-8 pt-8 border-t border-gray-200">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">System Status</span>
                </div>
                <p className="text-xs text-gray-500">All systems operational</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-xs text-gray-500">80%</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full bg-gray-50">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;