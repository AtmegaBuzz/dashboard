"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo2.png"; // Import the image from assets

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "grid" },
  { name: "Agents", href: "/dashboard/agents", icon: "users" },
  { name: "Search", href: "/dashboard/search", icon: "search" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-none border-gray-200 h-full">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-8 border border-black/10 rounded-lg flex items-center justify-center bg-white group-hover:border-[#7678ed] transition-colors">
            <Image
              src={logo}
              className="w-full h-full scale-150 p-1"
              alt="Zynd Protocol Logo"
            />
          </div>
          <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#7678ed] to-[#3B82F6]">
            Zynd Protocol
          </div>
        </Link>
      </div>

      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  pathname === item.href
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-3">{/* Icon would go here */}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
