import { Home, ShoppingCart, Users, Store, LineChart, Gift, Settings, AppWindow, Layers, Banknote, Megaphone } from "lucide-react";

export const sidebarData = [
  {
    title: "Home",
    url: "/manage/dashboard",
    icon: Home,
  },
  {
    title: "Administrative Functions",
    icon: ShoppingCart,
    children: [
      { title: "Functions to explore", url: "/manage/orders" },
    ],
  },
  {
    title: "Info for Leaders",
    icon: Gift,
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
    icon: Store,
    children: [
     
    ],
  },
  { title: "Weekly Reports", icon: Megaphone, url: "/marketing" },
];
