import { Button, Icon, Text } from "@chakra-ui/react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { useStore } from "@/hooks/useStore"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function GoogleButton() {
  const provider = new GoogleAuthProvider()
  const { user, setUser } = useStore()
  const router = useRouter()

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const loggedUser = result.user

        setUser(loggedUser)
        router.push("/dashboard")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.error("Erro:", errorMessage)
      })
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
