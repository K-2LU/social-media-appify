"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";

export default function HomePage() {
  const { currentUser } = useContext(AuthContext)!;
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/feed");
    } else {
      // Otherwise, send to login
      router.push("/auth/login");
    }
  }, [currentUser, router]);

  return null; 
}