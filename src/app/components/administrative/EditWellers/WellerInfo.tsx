"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const WellerInfo = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Left: Personal Information */}
        <div className="space-y-6  ">
          <div className="space-y-5 bg-white p-5  shadow-sm rounded-md">
            <h2 className="mb-8">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mt-2 block">First Name</Label>
                <Input placeholder="First name" {...register("firstName")} />
              </div>
              <div>
                <Label className="mt-2 block">Last Name</Label>
                <Input placeholder="Last name" {...register("lastName")} />
              </div>
            </div>
            <div className="flex flex-col">
              <Label className="">Email</Label>
              <Input placeholder="Email" {...register("email")} />
            </div>
            <div className="flex flex-col">
              <Label>Phone</Label>
              <Input placeholder="Phone" {...register("phone")} />
            </div>
            <div className="flex flex-col">
              <Label className="">Invited By</Label>
              <Input placeholder="Invited By" {...register("invitedBy")} />
            </div>
            <div className="flex flex-col">
              <Label>Home Church</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Other / Not listed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="other">Other / Not listed</SelectItem>
                  <SelectItem value="listed">Some Listed Church</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <Label>Home Church if 'Other' Selected</Label>
              <Input
                placeholder="Lifespring Seventh Day Adventist Church"
                {...register("homeChurchName")}
              />
            </div>
          </div>

          <div className="space-y-5 bg-white p-5  shadow-sm rounded-md">
            <h2 className="text-lg font-semibold mb-8">Address</h2>
            <div className="flex flex-col">
              <Label htmlFor="street">Street</Label>
              <Input placeholder="Street" {...register("street")} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col">
                <Label htmlFor="city">City</Label>

                <Input placeholder="City" {...register("city")} />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="state">State</Label>
                <Input placeholder="State" {...register("state")} />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="zip">Zip</Label>

                <Input placeholder="Zip" {...register("zip")} />
              </div>
            </div>
          </div>

          <div className="space-y-5 bg-white p-5  shadow-sm rounded-md">
            <h2 className=" mb-4">Studies</h2>
            {["TUPM", "WAM", "TAM", "TPM"].map((study) => (
              <div key={study} className="flex flex-col  gap-2">
                <div>
                  <Label htmlFor={`teacher-${study}`}>Study {study}</Label>
                </div>
                <div className="flex justify-start gap-2 items-center">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={`Study ${study}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None selected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Checkbox
                    id={`teacher-${study}`}
                    {...register(`teacher.${study}`)}
                  />
                  <Label htmlFor={`teacher-${study}`}>Teacher</Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Attendance */}
        <div className="space-y-6 ">
          <div className="space-y-6 p-5 bg-white  shadow-sm rounded-md">
            <h2 className="mb-4">Attendance</h2>
            <Input
              value="Active"
              disabled
              className="text-green-600 font-semibold"
            />
            <div className="flex items-center gap-6 mt-4">
              <Checkbox {...register("newWeller")} /> <span>New Weller</span>
              <Checkbox {...register("returningWeller")} />{" "}
              <span>Returning Weller</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <Label>NW Start Date</Label>
                <Input type="date" {...register("nwStartDate")} />
              </div>
              <div className="flex flex-col">
                <Label>Return Date</Label>
                <Input type="date" {...register("returnDate")} />
              </div>
              <div className="flex flex-col">
                <Label>Last attended</Label>
                <Input type="date" {...register("lastAttended")} />
              </div>
              <div className="flex flex-col">
                <Label>Drop Date</Label>
                <Input type="date" {...register("dropDate")} />
              </div>
            </div>
            <div className="mt-8">
              <span className="block mt-4">Days Attending</span>
              <div className="flex flex-wrap gap-4 mt-2">
                {["TU_PM", "WED_AM", "THU_AM", "THU_PM"].map((day) => (
                  <div key={day} className="flex items-center gap-2">
                    <Checkbox {...register(`days.${day}`)} /> <span>{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GROUPS SECTION */}
          <div className="space-y-6 p-6 bg-white shadow-sm rounded-md">
            <h2 className="text-lg font-semibold">Groups</h2>

            {/* PG Numbers */}
            <div className="flex items-start gap-4">
              <div className="w-24 pt-2">
                <Label className="block">PG #</Label>
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                {["TUPM", "WAM", "TAM", "TPM"].map((group) => (
                  <div key={group} className="flex flex-col items-center">
                    <Label className=" mb-1">{group}</Label>
                    <Input
                      type="number"
                      className="w-full"
                      {...register(`pgNumber.${group}`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* PG Leader */}
            <div className="flex items-start gap-4">
              <div className="w-48 pt-2">
                <Label className="block">PG Leader</Label>
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                {["TUPM", "WAM", "TAM", "TPM"].map((group) => (
                  <div key={group} className="flex justify-center">
                    <Checkbox {...register(`pgLeader.${group}`)} />
                  </div>
                ))}
              </div>
            </div>

            {/* First Time PG Leader */}
            <div className="flex items-start gap-4">
              <div className="w-48 pt-2">
                <Label className="block">First Time PG Leader</Label>
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                {["TUPM", "WAM", "TAM", "TPM"].map((group) => (
                  <div key={group} className="flex justify-center">
                    <Checkbox {...register(`firstTimeLeader.${group}`)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Second Time PG Leader */}
            <div className="flex items-start gap-4">
              <div className="w-48 pt-2">
                <Label className="block">Second Time PG Leader</Label>
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                {["TUPM", "WAM", "TAM", "TPM"].map((group) => (
                  <div key={group} className="flex justify-center">
                    <Checkbox {...register(`secondTimeLeader.${group}`)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mentor checkboxes and Save Button */}
            <div className="flex justify-between items-end pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="mentorLead" {...register("mentorLead")} />
                  <Label htmlFor="mentorLead">
                    Mentor or Leading Acct Group
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="mentorRelationship"
                    {...register("mentorRelationship")}
                  />
                  <Label htmlFor="mentorRelationship">
                    In Acct Group or Mentoring Relationship
                  </Label>
                </div>
              </div>

              <Button type="submit" className="btn-primary !rounded-full !p-7">
                Update & Save weller
              </Button>
            </div>
          </div>

          <div className="p-6 bg-white shadow-sm rounded-md">
            <h2 className=" mb-2">Notes</h2>
            <Textarea
              rows={6}
              placeholder="Add notes..."
              {...register("notes")}
              className="h-[100px]"
            />
            <div className="mt-4">
              <img
                src="https://www.barcodesinc.com/generator/image.php?code=Test+Label+Data+1&style=197&type=C128B&width=300&height=100&xres=1&font=3"
                alt="Barcode"
                className="w-full max-w-xs mx-auto"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WellerInfo;
