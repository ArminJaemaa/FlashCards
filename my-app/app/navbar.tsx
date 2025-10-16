"use client";

import { useState } from "react";
import {
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconHome,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import classes from "./navbar.module.css";

const data = [
  { link: "", label: "Home", icon: IconHome },
  { link: "", label: "FlashCards", icon: IconFingerprint },
  { link: "", label: "Create flash cards", icon: IconDatabaseImport },
  { link: "", label: "Overview", icon: IconBellRinging },
];

export function NavbarSimpleColored() {
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>
    </nav>
  );
}
