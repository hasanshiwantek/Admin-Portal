"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { addWellers } from "@/redux/slices/wellerSlice";

const AddWeller = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useAppDispatch();
  const onSubmit = async (data: any) => {
    console.log("Submitted Data:", data);

    const payload = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      homeChurch: data?.homeChurch,
      phone: data?.phone,
      addressCity: data?.city,
      addressState: data?.state,
      addressStreet: data?.street,
    };

    try {
      const resultAction = await dispatch(addWellers({ data: payload }));
      if (addWellers.fulfilled.match(resultAction)) {
        console.log("Weller added successfully: ", resultAction?.payload);
        reset();
      } else {
        console.log("Error adding weller: ", resultAction?.payload);
      }
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
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
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Write here"
                {...register("firstName")}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Write here"
                {...register("lastName")}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="e.g. johndoe@gmail.com"
              type="email"
              id="email"
              {...register("email")}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input placeholder="Write here" id="phone" {...register("phone")} />
          </div>

          <div>
            <Label htmlFor="homeChurch">Home Church</Label>
            <Input
              id="homeChurch"
              placeholder="e.g. Agape Fellowship"
              {...register("homeChurch")}
            />
          </div>
        </div>

        {/* Address Info */}
        <div className="space-y-6">
          <h2>Address</h2>

          <div>
            <Label htmlFor="street">Street</Label>
            <Input
              placeholder="e.g. 123 elm st"
              id="street"
              {...register("street")}
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input placeholder="e.g. Tampa" id="city" {...register("city")} />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input placeholder="e.g. FL" id="state" {...register("state")} />
          </div>

          <div>
            <Label htmlFor="zip">Zip</Label>
            <Input placeholder="e.g. 123456" id="zip" {...register("zip")} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className=" mt-6">
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="p-4 text-lg"
          >
            Clear fields
          </Button>
        </div>
        <div className="mr-[10rem] flex justify-center">
          <Button
            type="submit"
            className="btn-primary !w-full !max-w-2xl !rounded-full !p-7"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Weller"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddWeller;
