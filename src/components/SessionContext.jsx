import React, { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch session data from the backend
    fetch("http://localhost/skillswap/backend/session.php", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
