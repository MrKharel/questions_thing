import { create } from "zustand";

type Formdata = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

const useFormdataStore = create<Formdata>((set) => ({
  email: "",
  password: "",

  setEmail: (email: string) => {
    set(() => ({ email }));
  },
  setPassword: (password: string) => {
    set(() => ({ password }));
  },
}));

export { useFormdataStore };
