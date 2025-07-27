"use client";
import { Flex, Text, UnstyledButton } from "@mantine/core";
import {
  IconBuilding,
  IconCalendarEvent,
  IconShirt,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import classes from "./navbar.module.css";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    // { label: "ホーム", icon: IconHome, path: "/" },
    { label: "スタジアム", icon: IconBuilding, path: "/stadiums" },
    { label: "チーム", icon: IconShirt, path: "/teams" },
    { label: "試合日程", icon: IconCalendarEvent, path: "/matches" },
    // { label: "お気に入り", icon: IconStar, path: "/favorites" },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className={classes.navbar}>
      <Flex justify="space-around" align="center" h="100%">
        {navItems.map(item => {
          const isActive =
            (pathname?.startsWith(item.path) && item.path !== "/") ||
            (pathname === "/" && item.path === "/");
          const Icon = item.icon;

          return (
            <UnstyledButton
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={classes.navItem}
              data-active={isActive || undefined}
            >
              <Flex gap={8} align="center">
                <Icon size={20} stroke={1.5} />
                <Text size="sm" style={{ whiteSpace: "nowrap" }}>
                  {item.label}
                </Text>
              </Flex>
            </UnstyledButton>
          );
        })}
      </Flex>
    </nav>
  );
};
