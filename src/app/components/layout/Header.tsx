"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/Header/Header.module.css";
import logo from "@/assets/portal-logo.png";
import { LogOut } from "lucide-react";
import Image from "next/image";
const Header: React.FC = () => {
  return (
    <header className="w-full fixed h-28 px-4 z-40  bg-white shadow-sm">
      {/* HEADER */}

      <div className="flex justify-between items-center gap-10 p-4 mx-10">
        <div>
          <Image
            src={logo}
            alt="logo"
            height={300}
            width={220}
            objectFit="cover"
          />
        </div>

        <div>
          <div className="flex justify-start items-center gap-5">
            <div className="flex justify-start items-center gap-2">
              <div className=" rounded-full bg-green-700 ">
                <span className="!text-white !text-3xl p-4 !font-light">J</span>
              </div>
              <div>
                <h2 className="!font-bold">John Doe</h2>
                <span>Saturday-August 9,2025</span>
              </div>
            </div>
            <div>
              <LogOut className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
