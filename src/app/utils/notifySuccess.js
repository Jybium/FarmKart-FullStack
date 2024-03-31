import { toast } from "react-hot-toast";

const notifySuccess = (message) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid #52c41a",
      padding: "10px",
      color: "#52c41a",
    },
  });
};

export default notifySuccess;
