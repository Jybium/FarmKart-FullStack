
import notifyError from "../utils/notifyError";
import notifySuccess from "../utils/notifySuccess";

export const removeCartItem = async (id) => {
    
  try {
    const response = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      notifyError(errorData.error);
      return;
    }
    const result = await response.json();
    console.log(result.response);
    notifySuccess(result?.response?.message);
   
  } catch (error) {
    console.log(error);
    notifyError(error);
  }
};

export const increaseCartItem = async (id) => {
    

  try {
    const response = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ action: "increment" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      notifyError(errorData.error);
      return;
    }
    const result = await response.json();
    console.log(result.response);
    
    notifySuccess(result?.response?.message);
   
  } catch (error) {
    console.log(error);
    notifyError(error);
  }
};

export const decreaseCartItem = async (id) => {
    

  try {
    const response = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ action: "decrement" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      notifyError(errorData.error);
      return;
    }
    const result = await response.json();
    console.log(result.response);
    
    notifySuccess(result?.response?.message);
  
  } catch (error) {
    console.log(error);
    notifyError(error);
  }
};




  