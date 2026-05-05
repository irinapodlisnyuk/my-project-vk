"use client";
import { getInitials } from "@/utils/Initials";
import { LogoutButton } from "../LogoutButton";
import { Icon } from "@/models";
import { useUser } from "@/hooks/useUser";
import styles from './Settings.module.scss'

export const SettingsPage = () => {
  const { data: user } = useUser();

  const fullName = user ? `${user.name} ${user.surname}` : "Загрузка...";

  return (
    <div className={styles["settings"]}>
      <div className={styles["settings__wrapper"]}>
        <div className={styles["settings__user"]}>
          <div className={styles["settings__user-avatar"]}>
            {getInitials(user?.name, user?.surname)}
          </div>
          <div className={styles["settings__user-info"]}>
            <span className={styles["settings__user-text"]}>Имя Фамилия</span>
            <span className={styles["settings__user-name"]}>{fullName}</span>
          </div>
        </div>
        <div className={styles["settings__email"]}>
          <div className={styles["settings__email-avatar"]}>
            <Icon
              className={styles["settings__email-icon"]}
              name="email"
              width={22}
              height={18}
            />
          </div>
          <div className={styles["settings__user-info"]}>
            <span className={styles["settings__user-text"]}>Электронная почта</span>
            <span className={styles["settings__user-name"]}>{user?.email}</span>
          </div>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default SettingsPage;
