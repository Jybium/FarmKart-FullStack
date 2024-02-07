import { toast } from "react-toastify";

const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // transition: "bounce",
    theme: "dark",
  });
};

export default notifySuccess;
