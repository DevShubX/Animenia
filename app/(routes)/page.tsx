import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import PopularAnimeSlider from "./_components/PopularAnimeSlider";

export default function Homepage() {

  const onSignOut = async() =>{
    await signOut(auth);
  }

  return (
    <div>
      <PopularAnimeSlider />

      {/* <button onClick={onSignOut}>
        Sign out
      </button> */}
    </div>
  );
}
