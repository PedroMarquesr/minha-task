import { db } from "@/lib/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
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

export const acceptInviteForUser = async (inviteId, uid, displayName, email) => {
  const inviteRef = doc(db, "invites", inviteId)
  const inviteSnap = await getDoc(inviteRef)

  if (!inviteSnap.exists()) {
    throw new Error("Convite não encontrado.")
  }

  const inviteData = inviteSnap.data()

  if (inviteData.status !== "pending") {
    throw new Error("Convite já foi aceito ou expirou.")
  }

  if (inviteData.expiresAt && inviteData.expiresAt.toMillis() < Date.now()) {
    throw new Error("Convite expirado.")
  }

  const companyId = inviteData.companyId
  const role = inviteData.role || "member"

  // Atualizar a empresa
  const companyRef = doc(db, "companies", companyId)
  
  await updateDoc(companyRef, {
    [`members.${uid}`]: {
      role: role,
      joinedAt: serverTimestamp(),
      displayName: displayName || "",
      email: email || "",
    }
  })

  // Atualizar o convite para não ser usado de novo
  await updateDoc(inviteRef, {
    status: "accepted",
    acceptedBy: uid,
    acceptedAt: serverTimestamp()
  })

  // Retornar os dados da empresa para o GoogleButton usar
  const companySnap = await getDoc(companyRef)
  return { id: companySnap.id, ...companySnap.data() }
}
