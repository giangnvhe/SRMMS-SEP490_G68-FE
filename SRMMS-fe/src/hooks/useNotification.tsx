import { useContext } from "react";
import ContextNoti from "../context/NotiContext";

const useNotification = () => {
  const contextNoti = useContext(ContextNoti);

  return {
    successMessage: contextNoti.successMessage,
    warningMessage: contextNoti.warningMessage,
    errorMessage: contextNoti.errorMessage,
    deleteMessage: contextNoti.deleteMessage,
    successModalMessage: contextNoti.successModalMessage,
    warningModalMessage: contextNoti.warningModalMessage,
    comfirmMessage: contextNoti.comfirmMessage,
  };
};

export default useNotification;
