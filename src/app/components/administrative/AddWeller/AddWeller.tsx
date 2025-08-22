"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AddWeller = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-md shadow-sm "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Personal Info */}
        <div className="space-y-6">
          <h2>Personal information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First name</Label>
              <Input placeholder="Write here" {...register("firstName")} />
            </div>
            <div>
              <Label>Last name</Label>
              <Input placeholder="Write here" {...register("lastName")} />
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input
              placeholder="e.g. johndoe@gmail.com"
              type="email"
              {...register("email")}
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input placeholder="Write here" {...register("phone")} />
          </div>

          <div>
            <Label>Home Church</Label>
            <Input
              placeholder="e.g. Agape Fellowship"
              {...register("homeChurch")}
            />
          </div>
        </div>

        {/* Address Info */}
        <div className="space-y-6">
          <h2>Address</h2>

          <div>
            <Label>Street</Label>
            <Input placeholder="e.g. 123 elm st" {...register("street")} />
          </div>

          <div>
            <Label>City</Label>
            <Input placeholder="e.g. Tampa" {...register("city")} />
          </div>

          <div>
            <Label>State</Label>
            <Input placeholder="e.g. FL" {...register("state")} />
          </div>

          <div>
            <Label>Zip</Label>
            <Input placeholder="e.g. 123456" {...register("zip")} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className=" mt-6">
        <div>
        <Button type="button" variant="outline" onClick={() => reset()} className="p-4 text-lg">
          Clear fields
        </Button>
        </div>
        <div className="mr-[10rem] flex justify-center">
          <Button
            type="submit"
            className="btn-primary !w-full !max-w-2xl !rounded-full !p-7 "
          >
            Create Weller
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddWeller;
