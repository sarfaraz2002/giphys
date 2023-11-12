import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { initFirebase } from "@/app/firebase";
import { useRouter } from "next/navigation";
const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleLogout = async () => {
    initFirebase();
    const auth = getAuth();

    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for GIFs..."
          style={{
            padding: "0.5em",
            fontSize: "1em",
            marginLeft: "265%",
          }}
        />
      </div>
      <div>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5em 1em",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1em",
            marginLeft: "1250%",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
