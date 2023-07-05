// import { create } from "zustand";

// export const useStore = create<any>((set: any) => ({
//   authData: localStorage.getItem("authData") ? JSON.parse(localStorage.getItem("authData") as any) : null,
//   setAuthData: (newAuthData : any) => set((state : any) => ({ authData: newAuthData })),
// }))

import { create } from "zustand";

export const useStore = create<any>((set: any) => {
  const storedAuthData = localStorage.getItem("authData");

  let initialAuthData = null;
  if (storedAuthData) {
    try {
      initialAuthData = JSON.parse(storedAuthData);
    } catch (error) {
      console.error("Invalid JSON format for 'authData'");
    }
  }

  return {
    authData: initialAuthData,
    setAuthData: (newAuthData: any) => set((state: any) => ({ authData: newAuthData })),
  };
});
