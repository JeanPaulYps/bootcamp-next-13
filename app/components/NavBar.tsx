"use client";
import React, { useContext } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/authContext";
import useAuth from "@/hooks/useAuth";

function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          {loading ? null : data ? (
            <button
              className="bg-blue-400 text-white p-1 px-4 rounded mr-3"
              onClick={signOut}
            >
              Sign out
            </button>
          ) : (
            <>
              <AuthModal isSignIn />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
