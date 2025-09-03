"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { updateWeller } from "@/redux/slices/wellerSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
const WellerInfo = ({ selectedWeller }: { selectedWeller: any }) => {
  const { register, handleSubmit, reset, control } = useForm();
  const dispatch = useAppDispatch();
  const days = ["TUE_PM", "WED_AM", "THU_AM", "THU_PM"];
  const sessions = ["TUPM", "WAM", "TAM", "TPM"];

  useEffect(() => {
    if (selectedWeller) {
      reset({
        firstName: selectedWeller.firstName || "",
        lastName: selectedWeller.lastName || "",
        email: selectedWeller.email || "",
        phone: selectedWeller.phone || "",
        invitedBy: selectedWeller.invitedBy || "",
        homeChurchName: selectedWeller.homeChurch || "",
        street: selectedWeller.addressStreet || "",
        city: selectedWeller.addressCity || "",
        state: selectedWeller.addressState || "",
        zip: selectedWeller.addressZip || "",
        notes: selectedWeller.notes || "",
        // handle checkboxes and groups if needed
      });
    }
  }, [selectedWeller, reset]);

  const transformPayload = (formData: any) => {
    const {
      teacher = {},
      days = {},
      pgLeader = {},
      firstTimeLeader = {},
      secondTimeLeader = {},
      pgNumber = {},
      mentorLead,
      mentorRelationship,
      newWeller,
      returningWeller,
      ...rest
    } = formData;

    // 1. Convert checkboxes to attendance strings
    const attendances = Object.entries(days)
      .filter(([_, value]) => value === true)
      .map(([day]) => day.toLowerCase());

    // 2. Convert teacher selection to bible studies
    const bibleStudies = Object.entries(teacher).map(([session, value]) => ({
      session: session.toLowerCase(),
      name: `${session} Study`,
      is_teacher: !!value, // ✅ works with true/false
    }));

    // 3. Build prayer groups array
    const sessions = ["TUPM", "WAM", "TAM", "TPM"];
    const prayerGroups = sessions.map((session) => ({
      session: session.toLowerCase(),
      pg_number: pgNumber[session] || "",
      is_leader: !!pgLeader[session],
      is_first_time_leader: !!firstTimeLeader[session],
      is_second_time_leader: !!secondTimeLeader[session],
    }));

    return {
      ...rest,
      homeChurch: rest.homeChurchName,
      addressStreet: rest.street,
      addressCity: rest.city,
      addressState: rest.state,
      addressZip: rest.zip,
      status: rest.status,
      notes: rest.notes,
      isNewMember: newWeller === "on",
      isReturningMember: returningWeller === "on",
      startDate: rest.nwStartDate || null,
      returnDate: rest.returnDate || null,
      dropDate: rest.dropDate || null,
      lastAttended: rest.lastAttended || null,
      mentorLead: mentorLead === "on",
      mentorRelationship: mentorRelationship === "on",
      attendances,
      bibleStudies,
      prayerGroups,
    };
  };

  const onSubmit = async (data: any) => {
    const payload = transformPayload(data);
    const wellerId = selectedWeller?.id;
    console.log("📤 Transformed Payload:", payload);
    try {
      const resultAction = await dispatch(
        updateWeller({ data: payload, wellerId: wellerId })
      );
      if (updateWeller.fulfilled.match(resultAction)) {
        console.log("✅Weller updated successfully: ", resultAction?.payload);
        setTimeout(()=>{
          reset();
        },2000)
      } else {
        console.log("❌Error updating weller: ", resultAction?.payload);
      }
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  };

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

          <div className="space-y-5 bg-white p-5 shadow-sm rounded-md">
            <h2 className="mb-4">Studies</h2>
            {sessions.map((study) => (
              <div key={study} className="flex flex-col gap-2">
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
                      <SelectItem
                        value={`Study ${study}`}
                      >{`Study ${study}`}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Controller
                    name={`teacher.${study}`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <>
                        <Checkbox
                          id={`teacher-${study}`}
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                        <Label htmlFor={`teacher-${study}`}>Teacher</Label>
                      </>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Attendance */}
        <div className="space-y-6 ">
          <div className="space-y-6 p-5 bg-white  shadow-sm rounded-md">
            <h2 className="mb-4">Attendance</h2>
            <Controller
              control={control}
              name="status"
              defaultValue=""
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Attendance Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Active", "Inactive", "Guest", "Staff", "Archeive"].map(
                      (status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
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
                {days.map((day) => (
                  <div key={day} className="flex items-center gap-2">
                    <Controller
                      control={control}
                      name={`days.${day}`}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                      )}
                    />
                    <span>{day}</span>
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
                {sessions.map((session) => (
                  <div key={session} className="flex flex-col items-center">
                    <Label className="mb-1">{session}</Label>
                    <Input
                      type="text" // keep as text so you can send "02", "PG-02", etc.
                      className="w-full"
                      {...register(`pgNumber.${session}`)}
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
                {sessions.map((session) => (
                  <div key={session} className="flex justify-center">
                    <Controller
                      name={`pgLeader.${session}`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                      )}
                    />
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
                {sessions.map((session) => (
                  <div key={session} className="flex justify-center">
                    <Controller
                      name={`firstTimeLeader.${session}`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                      )}
                    />
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
                {sessions.map((session) => (
                  <div key={session} className="flex justify-center">
                    <Controller
                      name={`secondTimeLeader.${session}`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                      )}
                    />
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default WellerInfo;
