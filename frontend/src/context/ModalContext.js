import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openLogin = () => setModal("login");
  const openRegister = () => setModal("register");
  const closeModal = () => setModal(null);
  const switchModal = () => setModal(prev => (prev === "login" ? "register" : "login"));

  return (
    <ModalContext.Provider value={{ modal, openLogin, openRegister, closeModal, switchModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
