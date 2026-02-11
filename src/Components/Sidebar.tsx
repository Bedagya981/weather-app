import { useState, useEffect } from "react";
import { Menu, X, Home, MapPin, Sun, Moon } from "lucide-react";
import { Link as NavLink } from "react-router";

export default function Sidebar() {
  const [dark, setDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let mode: boolean = true;
    const storedMode = localStorage.getItem("mode");
    if (storedMode !== null) {
      try {
        const localMode = JSON.parse(storedMode);
        if (typeof localMode === "boolean") mode = localMode;
      } catch {}
    }
    setDark(mode)
    document.documentElement.classList.toggle("dark", mode)
  }, []);
  const handleThemeChange = () => {
    const newMode = !dark;
    setDark(newMode)
    localStorage.setItem('mode', JSON.stringify(newMode))
    document.documentElement.classList.toggle('dark', newMode)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-900 dark:text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      <aside
        className={`
          shrink-0 w-64 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white
          h-screen lg:static fixed top-0 left-0 z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          shadow-lg
        `}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-8">Weather App</h2>

            <nav className="space-y-2">
              <NavLink
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Home size={20} />
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/cities"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <MapPin size={20} />
                <span>Your Cities</span>
              </NavLink>
            </nav>
          </div>

          <button
            onClick={handleThemeChange}
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full mt-auto"
          >
            {dark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </aside>
    </>
  );
}
