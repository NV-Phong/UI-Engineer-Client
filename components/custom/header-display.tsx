"use client";

import { usePathname } from "next/navigation";
import Header from "../layout/header";

const HeaderDisplay = () => {
   const pathname = usePathname();

   if (!pathname?.startsWith("/dashboard")) {
      return <Header />;
   }
   return null;
};

export default HeaderDisplay;
