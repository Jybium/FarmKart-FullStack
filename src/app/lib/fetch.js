"use client"

import {useState, useEffect} from "react"


import {getCookie} from "cookies-next"
import notifyError from "../utils/notifyError"
import notifySuccess from "../utils/notifySuccess"


console.log(
  getCookie("token", {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  })
);


export function fetchData(url, options) {
  let isFetching = false;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (isFetching) {
    console.log("Request in progress, please wait.");
    return { data, loading, error };
  }

  try {
    isFetching = true;
    setLoading(true);

    const response =  fetch(url, options);

    if (response.ok) {
      const responseData =  response.json();
      setData(responseData);
    } else {
      console.error("Request failed:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
    setError(error);
  } finally {
    isFetching = false;
    setLoading(false);
  }

  return { data, loading, error };
}





export const useFetchWithInterceptors = (url, options = {}) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const token = getCookie("token");
        const modifiedOptions = {
          ...options,
          headers: {
            ...(options.headers || {}),
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, modifiedOptions);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Response error:", errorData);

          if (response.status === 401) {
            // Handle token expiry or unauthorized access
          }

          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        const result =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        console.error("Request error:", error);

        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, error, loading };
};





// Example usage:
// const onsubmit = async (data) => {
//   try {
//     const result = await fetchWithInterceptors("/api/auth/register", {
//       method: "POST",
//       body: JSON.stringify(data),
//     });

//     console.log(result);
//     notifySuccess(result.message);
//   } catch (error) {
//     notifyError("An unexpected error occurred");
//   }

// };

