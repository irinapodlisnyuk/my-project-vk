"use client";
import { useEffect, useState, useCallback } from "react";
import { Button, Space } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import { SearchForm } from "../SearchForm";
import { Icon } from "@/models";
import { AuthModal } from "../AuthModal/AuthModal";
import { useUser } from "@/hooks/useUser";

export const AppHeaderMobile = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: user } = useUser();

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", isSearchOpen);
    return () => document.body.classList.remove("lock-scroll");
  }, [isSearchOpen]);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const handleOpenSearch = useCallback(() => {
    // e.stopPropagation();
    setIsSearchOpen(true);
  }, []);

  return (
    <div className="header__mobile">
      <div className="header__mobile-wrapper">
        <div className="header__logo">
          <Link className="header__logo-link" href="/">
            <Icon
              name="mask-dekstop"
              className="header__marusya-icon"
              width={14}
              height={18}
            />
            <Icon
              className="header__marusya-text"
              name="marusya"
              width={56}
              height={12}
            />
          </Link>
        </div>

        <Space size={20}>
          <Link href="/genres">
            <AppstoreOutlined style={{ fontSize: 24, color: "#fff" }} />
          </Link>
          <Button
            className="header__search-btn"
            type="text"
            aria-label="Открыть поиск"
            onClick={handleOpenSearch}
            style={{ touchAction: "manipulation" }}
          >
            <Icon
              name="search"
              className="search-icon"
              width={24}
              height={24}
            />
          </Button>

          {user ? (
            <Link href="/account">
              <Button className="header__login-btn" type="text">
                <Icon
                  name="login-icon"
                  className="login-icon"
                  width={24}
                  height={24}
                />
              </Button>
            </Link>
          ) : (
            <Button
              className="header__login-btn"
              type="text"
              onPointerDown={() => setIsAuthOpen(true)}
              style={{ touchAction: "manipulation" }}
            >
              <Icon name="login-icon" width={24} height={24} />
            </Button>
          )}
        </Space>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>

      {/* Рендерим оверлей целиком только когда поиск открыт */}
      {isSearchOpen && (
        <div
          className="header__mobile-search is-active"
          onClick={(e) => {
            
            if (e.target === e.currentTarget) setIsSearchOpen(false);
          }}
        >
          <SearchForm
            className="custom__search-mobile"
            onClose={handleCloseSearch}
          />
        </div>
      )}
    </div>
  );
};
