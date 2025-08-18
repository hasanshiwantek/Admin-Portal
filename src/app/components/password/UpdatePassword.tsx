"use client"
import React, {useState} from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxHooks';
import { Eye, EyeOff } from "lucide-react";
import { Label } from '@/components/ui/label';


const UpdatePassword = () => {

  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
    });

  return (
   <div className="flex flex-col min-h-screen mt-5 ">

      <form
        // onSubmit={""}
        className=" p-6 rounded-md shadow-lg w-full border border-2 max-w-[50rem]"
      >
        <div className="flex flex-col ">
        <h1 className="!text-4xl mb-4 ">Change My Password (User Email)</h1>

          {error && <div className="text-red-400 text-xl mb-4">{error}</div>}
          <div className='my-4 relative'>
          <Label>Enter old password</Label>
          <Input
            name="oldPassword"
            type="text"
            placeholder="Old Password"
            value={formData.oldPassword}
            // onChange={handleChange}
            required
            className="!max-w-full !text-2xl !font-light px-4 py-2 bg-blue-50 text-black placeholder:text-gray-500"
          />
          <button
              type="button"
            //   onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {formData.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="my-4">
          <Label>Enter new password</Label>
            <Input
              name="newPassword"
              type={formData.showPassword ? "text" : "password"}
              placeholder=" New Password"
              value={formData.newPassword}
            //   onChange={handleChange}
              required
              className="!max-w-full !text-2xl !font-light px-4 py-2 bg-blue-50 text-black placeholder:text-gray-500"
            />
            <button
              type="button"
            //   onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {formData.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="my-4">
          <Label>Confirm new password</Label>
            <Input
              name="password"
              type={formData.showPassword ? "text" : "password"}
              placeholder=" Confirm Password"
              value={formData.confirmPassword}
            //   onChange={handleChange}
              required
              className="!max-w-full !text-2xl !font-light px-4 py-2 bg-blue-50 text-black placeholder:text-gray-500"
            />
            <button
              type="button"
            //   onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {formData.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="xxl"
            disabled={loading}
            className="!w-full cursor-pointer my-3 !h-[4rem] bg-[#008696] rounded-4xl font-medium !text-2xl focus-within:ring-blue-200 focus-within:border-blue-200 transition hover:border-blue-200 hover:bg-[#3A426E] "
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword;