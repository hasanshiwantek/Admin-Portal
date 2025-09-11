"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/Header/Header.module.css";
import logo from "@/assets/portal-logo.png";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  console.log("Logged in user Data: ", user);
  // ✅ Safe: only runs in browser
  useEffect(() => {
    const userString =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (userString) {
      try {
        setUser(JSON.parse(userString));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="w-full fixed h-28 px-4 z-40  bg-white shadow-xs">
      {/* HEADER */}

      <div className="flex justify-between items-center gap-10 p-4 mx-10">
        <Link href={"/dashboard"}>
          <div>
            <Image
              src={logo}
              alt="logo"
              height={300}
              width={220}
              objectFit="cover"
            />
          </div>
        </Link>

        <div>
          <div className="flex justify-start items-center gap-5">
            {user && (
              <div className="flex justify-start items-center gap-2">
                <div className="rounded-full bg-green-700">
                  <span className="!text-white !text-3xl p-4 !font-light">
                    {user?.firstName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="!font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            )}

            {/* Logout Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer text-[#008696] hover:text-black">
                  <LogOut className="w-6 h-6" />
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-md ">
                <DialogHeader>
                  <DialogTitle>Log out</DialogTitle>
                  <DialogDescription className="my-5">
                    Are you sure you want to log out? You will need to sign in
                    again to continue.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <button className="px-4 py-2 border rounded-md text-lg">
                      Cancel
                    </button>
                  </DialogClose>
                  <DialogClose asChild>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md text-lg hover:bg-red-700"
                      onClick={handleLogout}
                    >
                      Yes, Logout
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
