"use client"; // Đánh dấu component này là client-side

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";

const HeaderDisplay = () => {
   const pathname = usePathname();

   if (!pathname?.startsWith("/dashboard")) {
      return <Header />;
   }
   return null;
};

export default HeaderDisplay;
