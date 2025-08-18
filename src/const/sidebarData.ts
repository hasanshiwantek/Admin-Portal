// import { Home, ShoppingCart, Users, Store, LineChart, Gift, Settings, AppWindow, Layers, Banknote, Megaphone } from "lucide-react";
import {
  Home,
  MessageSquareText,
  IdCard, // or SquareUser
  Users,
  User,
  BarChart3,
} from "lucide-react";
export const sidebarData = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
     children: [{ title: "Update My Password", url: "/update-password" }],
  },
  {
    title: "Administrative Functions",
    icon: MessageSquareText,
    children: [{ title: "Functions to explore", url: "/manage/orders" }],
  },
  {
    title: "Info for Leaders",
    icon: IdCard,
    children: [],
  },
  {
    title: "Prayers groups",
    icon: Users,
    children: [],
  },
  {
    title: "View Wellers by day",
    icon: User,
    children: [
      { title: "View Wellers", url: "/wellers" },
      { title: "Screen name", url: "/wellers/screen-name" },
      { title: "Wam Backup", url: "/wellers/wam-backup" },
      { title: "Volunteer Info", url: "/wellers/volunteer-info" },
      { title: "Quick View", url: "/wellers/quick-view" },
      { title: "Studies", url: "/wellers/studies" },

    ],
  },
  { title: "Weekly Reports", icon: BarChart3, url: "/marketing" },
];
