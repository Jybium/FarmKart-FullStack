import { toast } from "react-toastify";

const notifyError = (message) => {
  toast.error(message, {
    position: "top-left",
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

export default notifyError;
