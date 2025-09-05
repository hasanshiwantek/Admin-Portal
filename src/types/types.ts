export type PreviewItem = {
  file: File | null;
  path: string | File;
  description: string;
  selected: boolean;
  isThumbnail: boolean;
  type: "image" | "video";
};

export interface StoreMetric {
  date: string;
  revenue: string;
  orders: number;
  visits: string;
  label: string;
  conversions: number;
}

export interface StoreMetricsResponse {
  status: boolean;
  message: string;
  range_start: string;
  range_end: string;
  data: StoreMetric[];
}

// types/order.ts
export interface OrderProduct {
  product_id: number;
  product_name: string;
  price: string;
  quantity: number;
}

export interface OrderItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalAmount: string;
  shippingCost: string;
  shippingMethod: string;
  address: string;
  comments?: string;
  paymentMethod: string;
  createdAt: string;
  items: OrderProduct[];
}

export interface OrderListResponse {
  data: OrderItem[];
  message: string;
  status:boolean;
  pagination: {
    total: number;
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}

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