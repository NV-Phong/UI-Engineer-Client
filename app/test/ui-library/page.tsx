"use client";

import useGetUILibrary from "@/hooks/workspace/uilibrary/get-uilibrary";
import React from "react";

export default function Page() {
  const { data, loading, error } = useGetUILibrary();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>UI Libraries</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((library) => (
            <li key={library._id}>
              <h2>{library.uiLibraryName}</h2>
              <p>{library.uiLibraryDescription}</p>
              <p>{library.style}</p>
              <p>
                <strong>Tech Stacks:</strong> {library.techStacks.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No UI libraries available.</p>
      )}
    </div>
  );
}
