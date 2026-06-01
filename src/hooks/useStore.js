import { create } from "zustand"
import { persist } from "zustand/middleware"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const TEMPO_INATIVIDADE = 30 * 60 * 1000

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      isLogin: false,
      setIsLogin: (isLogin) => set({ isLogin }),
      lastActivityAt: null,

      updateActivity: () => set({ lastActivityAt: Date.now() }),

      checkInactivity: async () => {
        const { lastActivityAt } = get()
        const inativo =
          lastActivityAt && Date.now() - lastActivityAt > TEMPO_INATIVIDADE

        if (inativo) {
          await signOut(auth)
          set({ user: null, isLogin: false, lastActivityAt: null })
          return true
        }
        return false
      },
    }),
    {
      name: "task-app-storage",
    },
  ),
)
