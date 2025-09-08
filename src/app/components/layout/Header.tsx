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
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userString = localStorage?.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  console.log("Logged in user Data: ", user);

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure want to logout?");
    if (!confirm) {
      return;
    } else {
      dispatch(logout());
      router.push("/login");
    }
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
            <div className="flex justify-start items-center gap-2">
              <div className=" rounded-full bg-green-700 ">
                <span className="!text-white !text-3xl p-4 !font-light">
                  {user?.firstName?.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="!font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <span>Saturday-August 9,2025</span>
              </div>
            </div>
            <div
              className="cursor-pointer text-[#008696] hover:text-black"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
