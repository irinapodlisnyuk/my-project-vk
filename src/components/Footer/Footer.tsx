"use client";
import { Layout } from "antd";
import Link from "next/link";
import { Icon } from "@/models/Icon";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <ul className="footer__socials">
            <li className="footer__socials-item">
              <Link
                aria-label="Перейти на страницу Вконтакте"
                href="https://vk.com"
                className="footer__socials-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="vk" width={19} height={10} />
              </Link>
            </li>
            <li className="footer__socials-item">
              <Link
                aria-label="Перейти на страницу Ютуб"
                href="https://youtube.com"
                className="footer__socials-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="youtube" width={16} height={12} />
              </Link>
            </li>
            <li className="footer__socials-item">
              <Link
                aria-label="Перейти на страницу Однокласстники"
                href="https://ok.ru"
                className="footer__socials-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="ok" width={11} height={18} />
              </Link>
            </li>

            <li className="footer__socials-item">
              <Link
                aria-label="Перейти на страницу телеграм"
                href="https://t.me"
                className="footer__socials-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="telegram" width={16} height={13} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
