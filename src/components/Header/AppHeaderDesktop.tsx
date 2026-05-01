"use client";
import { Menu, Button, Space } from "antd";
import Link from "next/link";
import { Icon } from "@/models/Icon";
import { SearchForm } from "../SearchForm";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { AuthModal } from "../AuthModal/AuthModal";
import { useUser } from "@/hooks/useUser";

export const AppHeaderDesktop = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const pathname = usePathname();

  const { data: user } = useUser();

  const menuItems = useMemo(
    () => [
      { key: "/", label: <Link href="/">Главная</Link> },
      { key: "/genres", label: <Link href="/genres">Жанры</Link> },
    ],
    [],
  );

  return (
    <header className="header__desktop-wrapper">
      <div className="header__logo">
        <Link
          className="header__logo-link"
          href="/"
          aria-label="Перейти на главную страницу VK-Маруся"
        >
          <Icon
            name="mask-dekstop"
            className="header__marusya-icon"
            width={25}
            height={33}
          />
          <Icon
            name="marusya"
            className="header__marusya-text"
            width={100}
            height={25}
          />
        </Link>
      </div>

      <nav className="header__nav">
        <Menu
          mode="horizontal"
          className="header__menu"
          items={menuItems}
          selectedKeys={[pathname]}
          disabledOverflow
        />
        <SearchForm className="custom__search-desktop" />
      </nav>

      <Space>
        {user ? (
          <Link href="/account">
            <Button
              type="text"
              className={`account__user-btn ${pathname === "/account" ? "active" : ""}`}
            >
              {user.name}
            </Button>
          </Link>
        ) : (
          <Button
            className="account__user-btn"
            type="text"
            onPointerDown={(e) => {
              // Если это тач-экран (палец), предотвращаем эмуляцию клика мышкой
              if (e.pointerType === "touch") {
                e.preventDefault();
                setIsAuthOpen(true);
              }
            }}
            onClick={(e) => {
              // Если это мышка, открываем по обычному клику
              if (e.detail !== 0) {
                setIsAuthOpen(true);
              }
            }}
            style={{ touchAction: "manipulation" }}
          >
            Войти
          </Button>
        )}
      </Space>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};
