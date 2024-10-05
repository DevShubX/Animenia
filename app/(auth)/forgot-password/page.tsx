"use client";
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { Loader2 } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForgotPassword = async () => {
    if (!email) return toast.error("Email is Required!!");
    try{
        setIsLoading(true)
        await sendPasswordResetEmail(auth, email).then(() => {
        toast.success("Reset Email Send Succesfully");
    });
    }catch(err){
        toast.error("Something Went Wrong")
    }finally{
        setIsLoading(false)
    }
  };

  return (
    <div className="card w-full px-[4rem] py-[2rem] max-md:px-[2rem] max-md:mx-[1rem] rounded-[20px] shadow-lg max-w-md flex flex-col items-center ">
      <Image
        src="/static/Forgot-Password.png"
        alt="ForgotPassword"
        width={120}
        height={120}
      />
      <h1 className="text-center text-3xl mb-3 font-[family-name:var(--font-gilroy-bold)]">
        Forgot Password
      </h1>
      <div className="text-center font-[family-name:var(--font-gilroy-medium)]">
        Enter your email and we'll send you a link to reset your password
      </div>
      <div className="bg-white w-full flex items-center p-2 border rounded-lg space-x-2 mt-8">
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
      <button
        disabled={isLoading}
        onClick={handleForgotPassword}
        className="bg-red-600 w-full p-3 rounded-lg my-4 text-white text-[19px] font-[family-name:var(--font-gilroy-medium)]"
      >
        {isLoading ? (
            <div className="flex justify-center items-center gap-x-3">
                <Loader2 className="animate-spin"/>
                Loading...
            </div>
        ) : (
            <>Submit</>
        )}
      </button>
      <Link
        href="/sign-in"
        className="flex justify-center items-center space-x-2 mt-4"
      >
        <FaAngleLeft className="w-6 h-6 text-gray-600" />
        <span className="font-[family-name:var(--font-gilroy-medium)]">
          Back to Login
        </span>
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
