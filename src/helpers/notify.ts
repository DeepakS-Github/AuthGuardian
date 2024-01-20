import { toast } from "react-toastify";
import { notifyType } from "./notifyType";

export const notify = (message: string, status: Number | string) => {
    (toast as any)[notifyType(status)](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

