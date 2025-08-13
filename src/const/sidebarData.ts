// import { Home, ShoppingCart, Users, Store, LineChart, Gift, Settings, AppWindow, Layers, Banknote, Megaphone } from "lucide-react";
import {
  Home,
  MessageSquareText,
  IdCard,       // or SquareUser
  Users,
  User,
  BarChart3,
} from "lucide-react";
export const sidebarData = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Administrative Functions",
    icon:  MessageSquareText,
    children: [
      { title: "Functions to explore", url: "/manage/orders" },
    ],
  },
  {
    title: "Info for Leaders",
    icon:IdCard,
    children: [
     
    ],
  },
  {
    title: "Prayers groups",
    icon: Users,
    children: [
    
    ],
  },
  {
    title: "View Wellers by day",
    icon:   User,
    children: [
     
    ],
  },
  { title: "Weekly Reports", icon: BarChart3, url: "/marketing" },
];
