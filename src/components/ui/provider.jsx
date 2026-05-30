'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { system } from '../../styles/theme'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useStore } from '@/hooks/useStore'

export function Provider(props) {
  const { setUser } = useStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const q = query(
          collection(db, "companies"),
          where("members", "array-contains", firebaseUser.uid)
        )
        let companyId = null
        let role = "member"

        try {
          const snapshot = await getDocs(q)
          if (!snapshot.empty) {
            const doc = snapshot.docs[0]
            companyId = doc.id
            role = doc.data().roles?.[firebaseUser.uid] || "member"
          }
        } catch (error) {
          console.error("Error fetching user company in AuthProvider:", error)
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          companyId,
          role,
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [setUser])

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
