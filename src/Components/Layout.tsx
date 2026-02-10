import type { ReactNode } from "react"
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children } : LayoutProps){
    return(
        <div className="flex min-h-screen">
      {/* Sidebar will take 64px width */}
      <Sidebar />

      {/* Main content takes remaining space */}
      <main className="flex-1 p-8 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 transition-colors">
        {children}
      </main>
      <ToastContainer position="top-right"/>
    </div>
    )
}