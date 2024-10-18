"use client";
// import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Home() {
  // const [token, setToken] = useState(null);
  // const [isMounted, setIsMounted] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedToken = localStorage.getItem("jwt");
  //     if (storedToken) {
  //       setToken(storedToken);
  //     } else {
  //       router.push("/User/login");
  //     }
  //     setIsMounted(true);
  //   }
  // }, [router]);

  // if (!isMounted) {
  //   return null; // 或者返回一个加载指示器
  // }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#333",
        }}
      >
        Welcome Onboarding Quiz App
      </h1>
    </div>
  );
}
