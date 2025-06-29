import { getFirestore, getDocs, collection, getDoc, doc, query, where, addDoc, updateDoc } from "firebase/firestore"
import app from "./init";
import bcrypt from 'bcrypt';
import { TUser } from "@/app/api/auth/[...nextauth]/route";

type LoginCallback = (arg: { status: boolean; data: TUser }) => void;

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const q = query(collection(firestore, "users"), where("email", "==", data.email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  if (users.length > 0) {
    return { status: false, statusCode: 400, message: "email already exists" }
  } else {
    data.role = 'member';
    data.password = await bcrypt.hash(data.password, 10);

    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, statusCode: 200, message: 'Register success' };

    } catch (error) {
      return { status: false, statusCode: 400, message: (error as Error).message }
    }

  }
}

export async function login(data: { email: string }): Promise<TUser | null> {
  const q = query(
    collection(firestore, 'users'),
    where('email', '==', data.email),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const docData = doc.data();

  const user: TUser = {
    id: doc.id,
    name: docData.name ?? '',
    email: docData.email ?? '',
    password: docData.password ?? '',
    role: docData.role ?? 'user',
  };

  return user;

}

export async function loginWithGoogle(data: Partial<TUser>, callbacks: LoginCallback): Promise<void> {
  const q = query(
    collection(firestore, 'users'),
    where('email', '==', data.email),
  );

  const snapshot = await getDocs(q);

  const users = snapshot.docs.map((docSnap) => {
    const docData = docSnap.data() as Partial<TUser>;
    return {
      id: docSnap.id,
      ...docData,
    };
  });

  if (users.length > 0) {
    const updatedUser: TUser = {
      ...users[0],
      name: data.name ?? users[0].name ?? '',
      email: users[0].email ?? '',
      password: users[0].password ?? '',
      role: users[0].role ?? 'member',
      id: users[0].id,
    };

    await updateDoc(doc(firestore, "users", updatedUser.id), updatedUser);
    callbacks({ status: true, data: updatedUser });
  } else {
    const newUser: TUser = {
      id: '', 
      name: data.name ?? '',
      email: data.email ?? '',
      password: '',
      role: 'member',
    };

    const docRef = await addDoc(collection(firestore, "users"), newUser);
    newUser.id = docRef.id;

    callbacks({ status: true, data: newUser });
  }
}