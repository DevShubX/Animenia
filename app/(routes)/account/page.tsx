"use client";
import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import SliderNav from "@/components/Home/SliderNav";
import { useStateContext } from "@/GlobalContext/ContextProvider";
import { FolderClosedIcon, PenLine, User2Icon } from "lucide-react";
import { uploadImageToFirebase } from "@/lib/firebaseMethods";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

const AccountsPage = () => {
  const router = useRouter();
  const { currentUser } = useStateContext();

  const updateProfilePic = async (e: any) => {
    const file = e.target.files[0];
    const photoUrl = await uploadImageToFirebase(file);
    if (!photoUrl) return;
    await updateProfile(currentUser!, {
      photoURL: photoUrl,
    }).then(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2">
        <SliderNav title="Account" icon={User2Icon} />
        <div className="flex gap-x-4 my-4">
          <div className="relative flex justify-center items-center w-[100px] h-[100px] rounded-[50%]">
            <Image
              src={currentUser?.photoURL!}
              alt="pfp"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-[50%] object-cover"
            />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                toast.promise(updateProfilePic(e), {
                  loading: "Updating Profile Pic...",
                  success: "Profile Pic Updated ✅",
                  error: "Error Updating Profile Pic ❌",
                });
              }}
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 outline-none rounded-[50%] p-1 bg-slate-200 cursor-pointer"
            >
              <PenLine className="text-red-500 w-4 h-4" />
            </label>
          </div>
          <div className="flex flex-col gap-2 mt-4 ">
            <div className="text-red-600  text-2xl font-[family-name:var(--font-gilroy-bold)]">
              {currentUser?.displayName}
            </div>
            <div className="font-[family-name:var(--font-gilroy-medium)] ">
              {currentUser?.email}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <SliderNav title="Anime List" icon={FolderClosedIcon} />
      </div>
    </div>
  );
};

export default AccountsPage;
