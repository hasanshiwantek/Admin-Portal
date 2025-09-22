"use client";
import React, { useState, useEffect } from "react";
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
import { getAllWellers, assignRole } from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { refetchWellers } from "@/lib/wellerUtils";
import { adminRoles } from "@/redux/slices/wellerSlice";
const AddAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const { wellers, error, loading } = useAppSelector(
    (state: any) => state.wellers
  );
  const wellersData = wellers?.data;
  const [selectedWellerId, setSelectedWellerId] = useState<any | null>();

  //  FETCH ALL WELLERS
  useEffect(() => {
    dispatch(getAllWellers());
  }, [dispatch]);

  // HANDLE SUBMIT

  const handleSubmit = async () => {
    const payload = {
      roleId: userRole,
      password: password,
      passwordConfirmation: confirmPassword,
    };
    console.log("Payload: ", payload);

    const wellerId = Number(selectedWellerId?.id);
    try {
      const resultAction = await dispatch(
        assignRole({ data: payload, wellerId: wellerId })
      );
      if (assignRole.fulfilled.match(resultAction)) {
        console.log("Role assign successfully", resultAction?.payload);
        setConfirmPassword("");
        setPassword("");
        setUserRole(0);
        setSelectedWellerId("");
        // Refetch after a short delay
        setTimeout(() => {
          refetchWellers(dispatch);
          dispatch(adminRoles());
        }, 5000);
      } else {
        console.log("Error Assigning role: ", resultAction?.payload);
      }
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

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
          <Select
            value={selectedWellerId ? String(selectedWellerId.id) : ""}
            onValueChange={(value) => {
              const found = wellersData.find(
                (w: any) => w.id === Number(value)
              );
              setSelectedWellerId(found);
            }}
          >
            <SelectTrigger className="w-full" id="select-weller">
              <span>
                {selectedWellerId
                  ? `${selectedWellerId.firstName} ${selectedWellerId.lastName}`
                  : "Select Weller"}
              </span>
            </SelectTrigger>

            <SelectContent>
              {wellersData?.map((weller: any) => (
                <SelectItem key={weller.id} value={String(weller.id)}>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {weller.firstName} {weller.lastName}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {weller.email}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block mb-2">Select Level of Access</Label>
          <Select
            value={userRole !== null ? String(userRole) : undefined}
            onValueChange={(value) => {
              const numericValue = Number(value);
              setUserRole(numericValue);
              console.log("Selected Role ID:", numericValue);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select User Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">Root</SelectItem>
              <SelectItem value="5">Admin</SelectItem>
              <SelectItem value="1">Volunteer</SelectItem>
              <SelectItem value="4">Bible Study Teacher</SelectItem>
              <SelectItem value="3">Prayer Group Leader</SelectItem>
              <SelectItem value="2">Child Watch</SelectItem>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        <Button
          className="btn-primary !w-full !max-w-2xl !rounded-full !p-7"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddAdminForm;
