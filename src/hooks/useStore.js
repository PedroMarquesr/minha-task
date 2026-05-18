import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      isLogin: false,
      setIsLogin: (isLogin) => set({ isLogin }),
    }),
    {
      name: "task-app-storage",
    },
  ),
)
