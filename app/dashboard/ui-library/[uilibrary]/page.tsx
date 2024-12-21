"use client";

import useGetComponentsByUILibrary from "@/hooks/workspace/component/get-component";
import { useEffect, useState } from "react";

export default function UILibrary({
   params,
}: {
   params: Promise<{ uilibrary: string }>;
}) {
   const [uilibrary, setUILibrary] = useState<string>("");
   const { data, loading, error } = useGetComponentsByUILibrary(uilibrary);

   useEffect(() => {
      const fetchUILibrary = async () => {
         const result = await params;
         setUILibrary(result.uilibrary);
      };

      fetchUILibrary();
   }, [params]);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div>
         <h1>Components for {uilibrary}</h1>
         <ul>
            {data?.map((component) => (
               <li key={component._id}>
                  <h2>{component.componentName}</h2>
                  <p>{component.componentDescription}</p>
                  <code>{component.code}</code>
               </li>
            ))}
         </ul>
      </div>
   );
}
