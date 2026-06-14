import { db } from "@/lib/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"

// Busca a empresa do usuário pelo uid
// Sua estrutura no Firestore é: members: { uid: { role: "owner" } }
// Por isso usamos members.{uid} != null (e não array-contains)
export const findUserCompany = async (uid) => {
  if (!uid) return null

  const q = query(
    collection(db, "companies"),
    where(`members.${uid}`, "!=", null)
  )

  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    const docSnap = snapshot.docs[0]
    return { id: docSnap.id, ...docSnap.data() }
  }

  return null // usuário não pertence a nenhuma empresa
}

// Cria uma empresa nova para o usuário
// Isso acontece quando o usuário loga pela primeira vez
export const createCompanyForUser = async (uid, displayName, email) => {
  const companyRef = doc(collection(db, "companies")) // gera um ID automático

  const newCompany = {
    name: "", // o usuário vai preencher no onboarding
    ownerId: uid,
    createdAt: serverTimestamp(),
    onboardingComplete: false,
    members: {
      [uid]: {
        role: "owner",
        joinedAt: serverTimestamp(),
        displayName: displayName,
        email: email,
      },
    },
  }

  await setDoc(companyRef, newCompany)

  return { id: companyRef.id, ...newCompany }
}
