"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown, Menu as MenuIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { sidebarData } from "@/const/sidebarData";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar: React.FC<SideBarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();

  return (
    <div
      className={`shrink-0 h-auto z-20 fixed top-29 max-h-full  overflow-hidden bg-white text-gray-700 shadow-lg  custom-scroll transition-all duration-300
        ${isCollapsed ? "w-[10rem] overflow-hidden" : "w-[30rem]"}`}
    >
      <SidebarProvider>
        {/* <div className="flex justify-end p-2 border-b ">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded "
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div> */}

        <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2">
  <button onClick={() => setIsCollapsed(!isCollapsed)}>
    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
  </button>
</div>


        <SidebarMenu className="w-full">
          {sidebarData.map((item) =>
            item.children ? (
              <Collapsible key={item.title} className="group/collapsible ">
                <SidebarMenuItem>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild  >
                          <SidebarMenuButton
                            className={`group w-full flex items-center p-8 cursor-pointer text-xl my-5  whitespace-nowrap ${
                              pathname === item.url ? "bg-[#008696] text-white" : ""
                            }`}
                          >
                            {item.icon && (
                              <item.icon className="mr-2 !h-8 !w-8" />
                            )}
                            {!isCollapsed && (
                              <>
                                {item.title}
                                <ChevronDown className="ml-auto !h-7 !w-7 transition-transform group-data-[state=open]:rotate-180" />
                              </>
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">{item.title}</TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>

                  <CollapsibleContent>
                    {!isCollapsed && (
                      <SidebarMenuSub className="ml-16">
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <Link
                              href={child.url}
                              className={`!text-[13px] !leading-8 cursor-pointer px-4 py-2 rounded-md block ${
                                pathname === child.url
                                  ? "bg-[#008696] text-white"
                                  : ""
                              }`}
                            >
                              {child.title}
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Link href={item.url || "#"} className="block">
                        <SidebarMenuButton
                          className={`p-8 cursor-pointer text-xl rounded-md flex items-center w-full ${
                            pathname === item.url
                              ? "bg-[#008696] text-white"
                              : ""
                          }`}
                        >
                          {item.icon && (
                            <item.icon className="mr-2 !h-8 !w-8 " />
                          )}
                          {!isCollapsed && <>{item.title}</>}
                        </SidebarMenuButton>
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarProvider>
    </div>
  );
};
