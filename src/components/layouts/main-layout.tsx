import React from "react";

import { marketingConfig } from "@/config/marketing";

import { MainNav } from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";


const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const color = false;

  return (
    <div className="min-h-screen flex flex-col">
      {/* fixed left-0 top-0 */}
      <header
        style={color ? { backgroundColor: "rgba(0,0,0,0.4)" } : {}}
        className="z-10 w-full backdrop-blur duration-300  ease-in"
      >
        <div className="m-auto flex h-20 items-center justify-between p-5 py-6">
          <MainNav items={marketingConfig.mainNav} />

          <nav className="flex justify-end w-[1000px]">
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
