"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../utils/firebase"; // Ensure these are imported from your firebase.ts file
import { signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaUsers, FaHeart, FaGraduationCap, FaGoogle } from "react-icons/fa";

const codeBgSVG = (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
    <defs>
      <linearGradient id="gradCode" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0ff" />
        <stop offset="100%" stopColor="#ff66cc" />
      </linearGradient>
    </defs>
    <text x="10" y="60" fill="url(#gradCode)" fontSize="32" fontFamily="monospace" opacity="0.22">
      {'{ user: "VibeMatch", mood: "coded" }'}
    </text>
    <text x="140" y="200" fill="#00ffff" fontSize="22" fontFamily="monospace" opacity="0.12">
      {'function findConnection(user) {'}
    </text>
    <text x="200" y="240" fill="#ff66cc" fontSize="18" fontFamily="monospace" opacity="0.10">
      {'return interests.filter(...);'}
    </text>
    <text x="280" y="400" fill="#22c55e" fontSize="14" fontFamily="monospace" opacity="0.20">
      {"// College vibes loading..."}
    </text>
  </svg>
);

const SignInPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ hd: "sahrdaya.ac.in" });

      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestore user doc reference
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // User does not exist, add them to Firestore then redirect to questionnaire
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        router.push("/questionnaire");
      } else {
        // User exists, redirect to home page
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
      {/* Coded background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-gray-950 opacity-95"></div>
      <div className="absolute inset-0">{codeBgSVG}</div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-transparent via-[#1f2937]/30 to-transparent pointer-events-none"></div>

      <div className="z-10 max-w-md w-full space-y-8 text-center">
        <h1
          className="text-4xl font-bold drop-shadow-[0_0_8px_#00ffff] drop-shadow-[0_0_16px_#00ffff] drop-shadow-[0_0_24px_#00ffff]"
          style={{ color: "#00ffff" }}
        >
          Sign in to Vibe Match
        </h1>
        {error && (
          <p className="text-red-500 text-xs italic mb-4">{error}</p>
        )}
        <div className="flex items-center justify-center">
          <button
            className="px-8 py-4 rounded-full text-xl font-bold text-black transition-all duration-300 ease-in-out hover:scale-105 drop-shadow-[0_0_8px_#00ffff] hover:drop-shadow-[0_0_16px_#00ffff]"
            style={{ backgroundColor: "#00ffff" }}
            onClick={handleGoogleSignIn}
          >
            <span className="inline-flex items-center gap-2">
              <FaGoogle /> Sign in with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
