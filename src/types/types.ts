

export interface MappingField  {
  label: string;
  type: "dropdown" | "radio-dropdown";
  options?: string[]; // For radio
};

export type Admin = {
  id: number;
  name: string;
  email: string;
  role: { id: number; name: string };
};



  // ✅ Define Form Schema
  export type WellerFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    invitedBy: string;
    homeChurchName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    notes: string;
    status: string;
    newWeller: boolean;
    returningWeller: boolean;
    nwStartDate: string;
    returnDate: string;
    dropDate: string;
    lastAttended: string;
    mentorLead: boolean;
    mentorRelationship: boolean;
    days: { [key: string]: boolean };
    teacher: { [key: string]: boolean };
    studyName: { [key: string]: string };
    pgNumber: { [key: string]: string };
    pgLeader: { [key: string]: boolean };
    firstTimeLeader: { [key: string]: boolean };
    secondTimeLeader: { [key: string]: boolean };
  };