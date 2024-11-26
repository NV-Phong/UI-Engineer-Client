"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const SERVER_PORT = process.env.NEXT_PUBLIC_API_URL;

function MyComponent() {
   const [data, setData] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = Cookies.get("access_token");
            if (!token) {
               router.push("/auth");
            } else {
               console.log("Token:", token);
               const response = await axios.get(`${SERVER_PORT}`, {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               });

               setData(response.data);
            }
         } catch (error: any) {
            if (error.response) {
               // Xử lý lỗi cụ thể từ server (ví dụ: 401 Unauthorized)
               setError(
                  error.response.data.message || error.response.statusText
               );
            } else if (error.request) {
               // Yêu cầu đã được gửi nhưng không nhận được phản hồi
               setError("No response from server");
            } else {
               // Xử lý các lỗi khác
               setError(error.message);
            }
         }
      };

      fetchData();
   }, [router]);

   return (
      <div className="h-screen">
         {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
         <ul>
            <ul>
               {data}
            </ul>
         </ul>
      </div>
   );
}

export default MyComponent;