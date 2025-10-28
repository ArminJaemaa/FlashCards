"use client";

import {
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconHome,
} from "@tabler/icons-react";
import classes from "./navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/flashcards", label: "FlashCards", icon: IconFingerprint },
  {
    link: "/flashcards/create",
    label: "Create flash cards",
    icon: IconDatabaseImport,
  },
  { link: "flasCards/owerview", label: "Overview", icon: IconBellRinging },
];

export function NavbarSimpleColored() {
  const pathname = usePathname();

  const links = data.map((item) => {
    const isActive = pathname === item.link;

    return (
      <Link
        href={item.link}
        key={item.label}
        className={`${classes.link} ${isActive ? classes.active : ""}`}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
