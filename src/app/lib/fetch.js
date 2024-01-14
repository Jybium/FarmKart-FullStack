import {useState} from "react"


import { getCookie } from "cookies-next";
import notifyError from "../utils/notifyError"
import notifySuccess from "../utils/notifySuccess"


let isFetching = false;

export async function fetchData(url, options) {
    const [data, SetData] = useState()
    const [error, SetError] = useState()
    const [loading, setLoading] = useState(false)

  if (isFetching) {
    // If a request is already in progress, you can handle it as needed.
    console.log("Request in progress, please wait.");
    return;
  }

  try {
    isFetching = true;
    setLoading(true)
    const response = await fetch(url, options);
    
setLoading(true)
    // Process the response as needed
    if (response.ok) {
      const data = await response.json();
      SetData(data)
      setLoading(false)
    } else {
      console.error("Request failed:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
    SetError(error)
    setLoading(false)
  } finally {
    isFetching = false;
    setLoading(false)
  }

  return data, loading, error
}

export const fetchWithInterceptors = async (url, options) => {

  const [data, SetData] = useState();
  const [error, SetError] = useState();
  const [loading, setLoading] = useState(false);

  const token = getCookie('token')
  // Add your request interceptors here if needed
  const modifiedOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
      // Add other headers as needed
    },
  };

  try {
    setLoading(true)
    const response = await fetch(url, modifiedOptions);

    // Add your response interceptors here if needed
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Response error:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    SetData(result)
    setLoading(false)
  } catch (error) {
    // Add your error interceptors here if needed
    console.error("Request error:", error);
    SetError(error)
    setLoading(false)
    // throw error;
  } finally{
    setLoading(false)
  }

  return data, error, loading
};

// Example usage:
const onsubmit = async (data) => {
  try {
    const result = await fetchWithInterceptors("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(result);
    notifySuccess(result.message);
  } catch (error) {
    notifyError("An unexpected error occurred");
  }

};

