import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "grid" },
  { name: "Agents", href: "/dashboard/agents", icon: "users" },
  { name: "Search", href: "/dashboard/search", icon: "search" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-indigo-600">P3AI</span>
          <span className="text-xl font-medium">Registry</span>
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
