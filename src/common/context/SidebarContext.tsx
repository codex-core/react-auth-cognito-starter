import { createContext, useState } from "react";

export const Context = createContext<{ isOpen: boolean; setIsOpen: any }>({
  isOpen: false,
  setIsOpen: () => {},
});

export const Provider = (props: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Context.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as SidebarContext,
  Provider as SidebarProvider,
} from "./SidebarContext";
