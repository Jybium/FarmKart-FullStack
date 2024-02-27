"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchWithInterceptors } from "../lib/fetch";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState({});
  const { data, loading, error } = useFetchWithInterceptors("/api/auth/me", {
    method: "GET",
  });

  // console.log(data?.data)

  useEffect(() => {
    const fetchUser = async () => {
      if (!loading) {
        if (error) {
          // Handle error, e.g., redirect to login page
          console.error("Error fetching user:", error);
        router.push("/login")
        } else if (data) {
          setUser(data?.data);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading
     }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
