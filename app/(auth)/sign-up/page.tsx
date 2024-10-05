"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoUnlock } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { TbCameraPlus } from "react-icons/tb";
import Image from 'next/image'
import { MdDelete } from "react-icons/md";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadImageToFirebase } from "@/lib/firebaseMethods";
import { Download, Loader2 } from "lucide-react";

const SignUpPage = () => {

  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState<any>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isSignInWithGoogle, setIsSignInWithGoogle] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignUp = async () => {
    try {
      if (email && password) {
        setIsLoading(true);
        const user = await createUserWithEmailAndPassword(auth, email, password);
        const photoURL = await uploadImageToFirebase(selectedPhoto);
        if (name && photoURL) {
          await updateProfile(user.user, {
            displayName: name,
            photoURL: photoURL,
          }).then(() => {
            router.replace('/');
            toast.success("Register Successfull, Welcome!");
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const onGoogleSignIn = () => {
    setIsSignInWithGoogle(true);
    const googleProvider = new GoogleAuthProvider();
    const promise = signInWithPopup(auth, googleProvider);
    toast.promise(promise, {
      loading: "Signing in with google",
      success: "Login Succesfull",
      error: "Error signing in with google.😞"
    }).then(() => {
      router.push('/');
    }).finally(() => {
      setIsSignInWithGoogle(false);
    })
  }

  useEffect(() => {
    if (selectedPhoto) {
      setPhotoUrl(URL.createObjectURL(selectedPhoto))
    }
  }, [selectedPhoto])

  return (
    <div className="card w-full px-[4rem] py-[2rem] max-md:px-[2rem] max-md:mx-[1rem] rounded-[20px] shadow-lg max-w-md flex flex-col items-center ">
      <h1 className="text-center text-4xl mb-3 font-[family-name:var(--font-gilroy-bold)]">
        Register
      </h1>
      <div className="space-y-4 w-full">
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          className="hidden"
          onChange={(e: any) => {
            setSelectedPhoto(e.target.files[0])
          }}
        />
        <label htmlFor='profileImage' className="relative flex justify-center items-center w-full">
          {!photoUrl && !selectedPhoto && (
            <div className="flex justify-center items-center w-[100px] h-[100px] rounded-[50%] bg-slate-200 cursor-pointer">
              <TbCameraPlus className="w-8 h-8" />
            </div>
          )}
          {photoUrl && selectedPhoto && (
            <div className="relative flex justify-center items-center w-[100px] h-[100px] rounded-[50%] cursor-pointer">
              <Image src={photoUrl} alt="pfp" width={100} height={100} className="w-[100px] h-[100px] rounded-[50%] object-cover" />
              <button
                className="absolute bottom-0 right-0 outline-none rounded-[50%] p-1 bg-slate-200"
                onClick={() => {
                  setPhotoUrl(null)
                  setSelectedPhoto('')
                }}
              >
                <MdDelete className="text-red-500 w-4 h-4" />
              </button>
            </div>
          )}
        </label>
        <div className="bg-white w-full flex items-center p-2 border rounded-lg">
          <span>
            <FaRegUser className="w-6 h-6 text-gray-600" />
          </span>
          <input
            type="text"
            name="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 outline-none font-[family-name:var(--font-gilroy-medium)]"
          />
        </div>
        <div className="bg-white w-full flex items-center p-2 border rounded-lg">
          <span>
            <HiOutlineMail className="w-6 h-6 text-gray-600" />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 outline-none font-[family-name:var(--font-gilroy-medium)]"
          />
        </div>
        <div className="bg-white flex items-center p-2 border rounded-lg">
          <span>
            <GoUnlock className="w-6 h-6 text-gray-600" />
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 outline-none font-[family-name:var(--font-gilroy-medium)]"
          />
          <span onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible && (
              <AiOutlineEye className="w-6 h-6 text-gray-400" />
            )}
            {!isPasswordVisible && (
              <AiOutlineEyeInvisible className="w-6 h-6 text-gray-400" />
            )}
          </span>
        </div>
      </div>
      <button
        onClick={handleSignUp}
        disabled={isLoading}
        className="bg-red-600 w-full p-3 rounded-lg my-4 text-white text-[19px] font-[family-name:var(--font-gilroy-medium)]">
        {isLoading ? (
          <div className="flex items-center justify-center gap-x-2">
            <Loader2 className="animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            Register
          </>
        )}
      </button>
      <span className="mt-2 mb-4 font-[family-name:var(--font-gilroy-medium)]">
        Already have an account?
        <Link
          href={"/sign-in"}
          className=" ml-2 underline font-medium font-[family-name:var(--font-gilroy-bold)]"
        >
          Login
        </Link>
      </span>
      <button
        onClick={onGoogleSignIn}
        disabled={isSignInWithGoogle}
        className="flex items-center w-full bg-white p-3 justify-center space-x-2 mt-4 rounded-lg font-[family-name:var(--font-gilroy-medium)]">
        <FcGoogle className="w-8 h-8" />
        <span className="text-[17px]">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignUpPage;
