'use client'
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";

export default function Homepage() {

  const onSignOut = async() =>{
    await signOut(auth);
  }

  return (
    <div>
      HomePage

      <button onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}
