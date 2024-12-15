"use client";

import GetTeams from "@/services/apis/test-api";

const Dashboard = () => {
   const { data, loading, error } = GetTeams();

   return (
      <div className="h-screen">
         {loading && <p>Loading...</p>}
         {error && <p className="text-red-500">Error: {error}</p>}
         {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
   );
};

export default Dashboard;
