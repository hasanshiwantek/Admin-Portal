"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
const AddAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  return (
    <div className="w-[40%] bg-white rounded-md p-6 shadow-sm">
      <h2 className="mb-4">Add Administrator</h2>

      {/* Alphabet filter */}
      <div>
        <span>Name starting with</span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((char) => (
          <span key={char} className="cursor-pointer hover:underline">
            {char}
          </span>
        ))}
      </div>

      {/* Admin Selector */}
      <div className="space-y-7">
        <div>
          <Label className="block  mb-2">Select Admin</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Adrianna Davis (atcolema@gmail.com)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                Adrianna Davis (atcolema@gmail.com)
              </SelectItem>
              <SelectItem value="2">John Smith (jsmith@example.com)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block  mb-2">Select Level of Access</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Root">Root</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block  mb-2">Create password</Label>
          <div className="relative border">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Write here"
              className="pr-5 !border-none"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </span>
          </div>
        </div>

        <div>
          <Label className="block  mb-2">Verify password</Label>
          <div className="relative border">
            <Input
              type={showVerify ? "text" : "password"}
              placeholder="Write here"
              className="pr-5 !border-none"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowVerify(!showVerify)}
            >
              {showVerify ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </span>
          </div>
        </div>

        <Button className="btn-primary !w-full !max-w-2xl !rounded-full !p-7">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddAdminForm;
