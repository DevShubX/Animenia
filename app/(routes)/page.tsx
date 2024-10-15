import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import PopularAnimeSlider from "./_components/PopularAnimeSlider";
import Top100AnimeSlider from "./_components/Top100AnimeSlider";
import FavoriteAnimeSlider from "./_components/FavoriteAnimeSlider";
import TrendingAnimeSlider from "./_components/TrendingAnimeSlider";

export default function Homepage() {

  const onSignOut = async() =>{
    await signOut(auth);
  }

  return (
    <div className="w-full">
      <PopularAnimeSlider />
      <Top100AnimeSlider />
      <TrendingAnimeSlider />
      <FavoriteAnimeSlider />

      {/* <button onClick={onSignOut}>
        Sign out
      </button> */}
    </div>
  );
}
