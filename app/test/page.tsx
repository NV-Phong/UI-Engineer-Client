"use client";

import useGetTeams from "@/hooks/workspace/team/get-team";

const Dashboard = () => {
   const { data, loading, error } = useGetTeams();

   return (
      <div className="h-screen p-4">
         {loading && <p>Loading...</p>}
         {error && <p className="text-red-500">Error: {error}</p>}
         {data && (
            <div>
               {data.map((team: any) => (
                  <div key={team._id} className="mb-4">
                     <p className="text-lg font-medium">{team.teamName}</p>
                     <p className="text-gray-600">Members:</p>
                     <ul className="list-disc list-inside">
                        {team.members.map((member: any) => (
                           <li key={member._id} className="flex space-x-4">
                              <span className="font-semibold">IDUser:</span> {member.IDUser}
                              <span className="font-semibold">Leader:</span> {member.leader ? "Yes" : "No"}
                              <span className="font-semibold">JoinedAt:</span> {new Date(member.joinedAt).toLocaleDateString()}
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Dashboard;
