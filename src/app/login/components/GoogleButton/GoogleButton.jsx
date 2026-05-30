import { Button, Icon, Text } from "@chakra-ui/react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { useStore } from "@/hooks/useStore"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function GoogleButton() {
  const provider = new GoogleAuthProvider()
  const { user, setUser } = useStore()
  const router = useRouter()

  const findUserCompany = async (uid) => {
    const q = query(
      collection(db, "companies"),
      where("members", "array-contains", uid),
    )

    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }
    return null
  }

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const loggedUser = result.user

      // Busca a empresa do usuário
      const company = await findUserCompany(loggedUser.uid)

      // Salva usuário + empresa no store
      setUser({
        uid: loggedUser.uid,
        email: loggedUser.email,
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        companyId: company?.id || null,
        role: company?.roles?.[loggedUser.uid] || "member",
      })
      console.log("Empresa encontrada:", company)
      console.log("Role do usuário:", company?.roles?.[loggedUser.uid])
      console.log("Empresa", company)
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro:", error.message)
    }
  }

  return (
    <>
      <Button
        onClick={handleLoginGoogle}
        colorPalette="red"
        size="lg"
        w="100%"
        mt={4}
        borderRadius="md"
        variant="outline"
      >
        <Icon as={FcGoogle} size={"2xl"} mr={2} />
        Entrar com sua conta Google
      </Button>

      {user && (
        <Text mt={4} textAlign="center">
          Logado como: {user.displayName}
        </Text>
      )}
    </>
  )
}
