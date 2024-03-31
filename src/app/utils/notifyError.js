import { toast } from "react-hot-toast";

const notifyError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid #ff4d4f",
      padding: "10px",
      color: "#ff4d4f",
    },
  });
};

export default notifyError;
