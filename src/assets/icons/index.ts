import ArrowRight from "./arrowRight.svg?react";
import Check from "./check.svg?react";
import Clock from "./clock.svg?react";
import Edit from "./edit.svg?react";
import Euro from "./euro.svg?react";
import Launch from "./launch.svg?react";
import Layout from "./layout.svg?react";
import MapPin from "./mapPin.svg?react";
import Message from "./message.svg?react";
import Phone from "./phone.svg?react";
import Plus from "./plus.svg?react";
import Search from "./search.svg?react";
import User from "./user.svg?react";

export const icons = {
  arrowRight: ArrowRight,
  check: Check,
  clock: Clock,
  edit: Edit,
  euro: Euro,
  launch: Launch,
  layout: Layout,
  mapPin: MapPin,
  message: Message,
  phone: Phone,
  plus: Plus,
  search: Search,
  user: User,
};

export type IconName = keyof typeof icons;
