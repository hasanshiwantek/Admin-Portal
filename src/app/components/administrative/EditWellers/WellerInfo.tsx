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
import {
  updateWeller,
  getWellerById,
  getAllWellers,
} from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { WellerFormValues } from "@/types/types";
const WellerInfo = ({
  selectedWeller,
  setSelectedWeller,
}: {
  selectedWeller: any;
  setSelectedWeller: any;
}) => {
  const dispatch = useAppDispatch();
  const { weller } = useAppSelector((state: any) => state.wellers);
  const wellerData = weller?.data;
  console.log("Selected Weller data thru ID: ", wellerData);

  const { wellers, error, loading } = useAppSelector(
    (state: any) => state.wellers
  );
  const wellersData = wellers?.data;
  const [selectedInvitedByWeller, setSelectedInvitedByWeller] = useState<
    any | null
  >(null);
  //  FETCH ALL WELLERS
  useEffect(() => {
    dispatch(getAllWellers());
  }, [dispatch]);

  const wellerId = selectedWeller?.id;

  // 👇 Fetch weller data on first mount
  useEffect(() => {
    if (wellerId) dispatch(getWellerById(wellerId));
  }, [dispatch, wellerId]);

  const days = ["TUE_PM", "WED_AM", "THU_AM", "THU_PM"];
  const sessions = ["TUE_PM", "WED_AM", "THU_AM", "THU_PM"];
  const studies = [
    "Floater",
    "Boundaries",
    "Disciples Are Made",
    "Disunity",
    "God is Enough",
    "Johns Letters",
    "Overcoming",
    "Raising Kids",
  ];

  // ✅ Set up default values for all fields
  const defaultValues: WellerFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    invitedBy: "",
    homeChurchName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    status: "",
    newWeller: false,
    returningWeller: false,
    nwStartDate: "",
    returnDate: "",
    dropDate: "",
    lastAttended: "",
    mentorLead: false,
    mentorRelationship: false,
    days: Object.fromEntries(sessions.map((s) => [s, false])),
    teacher: Object.fromEntries(sessions.map((s) => [s, false])),
    studyName: Object.fromEntries(sessions.map((s) => [s, "none"])),
    pgNumber: Object.fromEntries(sessions.map((s) => [s, ""])),
    pgLeader: Object.fromEntries(sessions.map((s) => [s, false])),
    firstTimeLeader: Object.fromEntries(sessions.map((s) => [s, false])),
    secondTimeLeader: Object.fromEntries(sessions.map((s) => [s, false])),
  };

  // ✅ useForm now has defaultValues
  const { register, handleSubmit, reset, control, getValues } = useForm({
    defaultValues,
  });

  // 👇 Reset form when weller data loads
  useEffect(() => {
    if (wellerData) {
      const {
        attendances = [],
        bibleStudies = [],
        prayerGroups = [],
        isNewMember,
        isReturningMember,
        mentorLead,
        mentorRelationship,
        startDate,
        returnDate,
        dropDate,
        lastAttended,
      } = wellerData;

      const days = attendances.reduce((acc: any, day: string) => {
        acc[day.toUpperCase()] = true;
        return acc;
      }, {});

      const teacher = bibleStudies.reduce((acc: any, study: any) => {
        const key = study.session?.toUpperCase();
        acc[key] = study.is_teacher ?? false;
        return acc;
      }, {});

      const studyName = bibleStudies.reduce((acc: any, study: any) => {
        const key = study.session?.toUpperCase();
        acc[key] = study.name;
        return acc;
      }, {});

      const pgNumber: any = {};
      const pgLeader: any = {};
      const firstTimeLeader: any = {};
      const secondTimeLeader: any = {};

      prayerGroups.forEach((pg: any) => {
        const key = pg.session?.toUpperCase();
        pgNumber[key] = pg.pg_number || "";
        pgLeader[key] = !!pg.is_leader;
        firstTimeLeader[key] = !!pg.is_first_time_leader;
        secondTimeLeader[key] = !!pg.is_second_time_leader;
      });

      reset({
        firstName: wellerData.firstName || "",
        lastName: wellerData.lastName || "",
        email: wellerData.email || "",
        phone: wellerData.phone || "",
        invitedBy: wellerData.invitedBy || "",
        homeChurchName: wellerData.homeChurch || "",
        street: wellerData.addressStreet || "",
        city: wellerData.addressCity || "",
        state: wellerData.addressState || "",
        zip: wellerData.addressZip || "",
        notes: wellerData.notes || "",
        status: wellerData.status || "",
        newWeller: isNewMember || false,
        returningWeller: isReturningMember || false,
        nwStartDate: startDate?.substring(0, 10) || "",
        returnDate: returnDate?.substring(0, 10) || "",
        dropDate: dropDate?.substring(0, 10) || "",
        lastAttended: lastAttended?.substring(0, 10) || "",
        mentorLead: mentorLead || false,
        mentorRelationship: mentorRelationship || false,
        days,
        teacher,
        studyName,
        pgNumber,
        pgLeader,
        firstTimeLeader,
        secondTimeLeader,
      });
    }
  }, [wellerData, reset]);
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

    // 3. Build prayer groups array
    const sessions = ["TUE_PM", "WED_AM", "THU_AM", "THU_PM"];
    const prayerGroups = sessions.map((session) => ({
      session: session.toLowerCase(),
      pg_number: pgNumber[session] || "",
      is_leader: !!pgLeader[session],
      is_first_time_leader: !!firstTimeLeader[session],
      is_second_time_leader: !!secondTimeLeader[session],
    }));

    const bibleStudies = sessions
      .map((session) => ({
        session: session.toLowerCase(),
        name: formData.studyName?.[session],
        is_teacher: !!formData.teacher?.[session],
      }))
      .filter((study) => study.name && study.name !== "none");

    return {
      ...rest,
      homeChurch: rest.homeChurchName,
      addressStreet: rest.street,
      addressCity: rest.city,
      addressState: rest.state,
      addressZip: rest.zip,
      status: rest.status,
      notes: rest.notes,
      isNewMember: !!newWeller,
      isReturningMember: !!returningWeller,
      invitedBy: selectedInvitedByWeller?.id || null,
      startDate: rest.nwStartDate || null,
      returnDate: rest.returnDate || null,
      dropDate: rest.dropDate || null,
      lastAttended: rest.lastAttended || null,
      mentorLead: !!mentorLead,
      mentorRelationship: !!mentorRelationship,
      attendances,
      bibleStudies,
      prayerGroups,
    };
  };

  const onSubmit = async (data: any) => {
    const payload = transformPayload(data);
    const wellerId = wellerData?.id;
    console.log("📤 Transformed Payload:", payload);
    try {
      const resultAction = await dispatch(
        updateWeller({ data: payload, wellerId: wellerId })
      );
      if (updateWeller.fulfilled.match(resultAction)) {
        console.log("✅Weller updated successfully: ", resultAction?.payload);
        setTimeout(() => {
          reset();
        }, 2000);
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
              <Label>Invited By</Label>
              <Controller
                name="invitedBy"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => {
                      field.onChange(value); // updates useForm state
                      const found = wellersData.find(
                        (w: any) => w.id === Number(value)
                      );
                      setSelectedInvitedByWeller(found);
                    }}
                  >
                    <SelectTrigger className="w-full" id="select-weller">
                      <span>
                        {selectedInvitedByWeller
                          ? `${selectedInvitedByWeller.firstName} ${selectedInvitedByWeller.lastName}`
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
                )}
              />
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

            {sessions.map((session) => (
              <div key={session} className="flex flex-col gap-2">
                <Label className="font-medium">{session}</Label>

                <div className="flex justify-start gap-4 items-center">
                  {/* Select for study name */}
                  <Controller
                    name={`studyName.${session}`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value || "none"} // value MUST match SelectItem
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Study"
                            // 👇 Ensure controlled value is passed!
                            defaultValue={field.value || "none"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" disabled>
                            -- None selected --
                          </SelectItem>
                          {studies.map((study) => (
                            <SelectItem key={study} value={study}>
                              {study}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {/* Checkbox for is_teacher */}
                  <Controller
                    name={`teacher.${session}`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <>
                        <Checkbox
                          id={`teacher-${session}`}
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                        />
                        <Label htmlFor={`teacher-${session}`}>Teacher</Label>
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
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
              <Controller
                name="newWeller"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <>
                    <Checkbox
                      id="newWeller"
                      checked={!!field.value}
                      onCheckedChange={(val) => field.onChange(!!val)}
                    />
                    <span>New Weller</span>
                  </>
                )}
              />

              <Controller
                name="returningWeller"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <>
                    <Checkbox
                      id="returningWeller"
                      checked={!!field.value}
                      onCheckedChange={(val) => field.onChange(!!val)}
                    />
                    <span>Returning Weller</span>
                  </>
                )}
              />
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
                <Controller
                  name="mentorLead"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mentorLead"
                        checked={!!field.value}
                        onCheckedChange={(val) => field.onChange(!!val)}
                      />
                      <Label htmlFor="mentorLead">
                        Mentor or Leading Acct Group
                      </Label>
                    </div>
                  )}
                />

                <Controller
                  name="mentorRelationship"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="mentorRelationship"
                        checked={!!field.value}
                        onCheckedChange={(val) => field.onChange(!!val)}
                      />
                      <Label htmlFor="mentorRelationship">
                        In Acct Group or Mentoring Relationship
                      </Label>
                    </div>
                  )}
                />
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
