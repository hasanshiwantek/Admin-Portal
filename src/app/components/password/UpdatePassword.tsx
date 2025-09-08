"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { updatePassword } from "@/redux/slices/authSlice";
type Field = "old" | "new" | "confirm";

const UpdatePassword = () => {
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const toggleShowPassword = (field: Field) => {
    setShow((s) => ({ ...s, [field]: !s[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      currentPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      newPassword_confirmation: formData.confirmPassword,
    };
    console.log(payload);

    try {
      const resultAction = await dispatch(updatePassword({ data: payload }));
      if (updatePassword.fulfilled.match(resultAction)) {
        console.log("✅Password updated succesfully: ", resultAction?.payload);
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        console.log("❌Error updating password: ", resultAction?.payload);
      }
    } catch (err) {
      console.error("Somethin went wrong: ", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
        Home <ChevronRight className="h-5 w-6" />
        <span className="!font-light !text-[var(--primary-color)]">
          Change Password
        </span>
      </div>

      <form
        // onSubmit={""}
        className=" p-6 rounded-lg shadow-lg w-full  border-2 max-w-[50rem]"
      >
        <div className="flex flex-col ">
          <h1 className="!text-4xl mb-4 ">Change My Password (User Email)</h1>

          {error && <div className="text-red-400 text-xl mb-4">{error}</div>}
          <div className="my-4 relative">
            <Label>Enter old password</Label>
            <Input
              name="oldPassword"
              type={show.old ? "text" : "password"}
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              className="!max-w-full !text-xl !font-light px-4 py-2  text-black placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("old")}
              className="absolute right-5 top-[3.7rem] -translate-y-1/2 text-gray-600"
            >
              {show.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="my-4 relative">
            <Label>Enter new password</Label>
            <Input
              name="newPassword"
              type={show.new ? "text" : "password"}
              placeholder=" New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="!max-w-full !text-xl !font-light px-4 py-2  text-black placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("new")}
              className="absolute right-5 top-[3.7rem] -translate-y-1/2 text-gray-600"
            >
              {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="my-4 relative">
            <Label>Confirm new password</Label>
            <Input
              name="confirmPassword"
              type={show.confirm ? "text" : "password"}
              placeholder=" Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="!max-w-full !text-xl !font-light px-4 py-2  text-black placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("confirm")}
              className="absolute right-5 top-[3.7rem] -translate-y-1/2 text-gray-600"
            >
              {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="xxl"
            disabled={loading}
            onClick={handleSubmit}
            className="!w-full cursor-pointer my-3 !h-[4.5rem] btn-primary "
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
