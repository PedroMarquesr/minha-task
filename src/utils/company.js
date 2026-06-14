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

export const createCompanyForUser = async (uid, displayName, email, companyName, phone) => {
  const companyRef = doc(collection(db, "companies"))


  const newCompany = {
    name: companyName || "",
    phone: phone || "",
    ownerId: uid,
    createdAt: serverTimestamp(),
    onboardingComplete: true,
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
