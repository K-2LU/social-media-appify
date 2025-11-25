"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";

export default function HomePage() {
  const { currentUser } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    // If user data exists in context (localStorage), send to feed
    if (currentUser) {
      router.push("/feed");
    } else {
      // Otherwise, send to login
      router.push("/auth/login");
    }
  }, [currentUser, router]);

  // Render nothing (or a loading spinner) while redirecting
  return null; 
}