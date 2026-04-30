"use client";
import { getInitials } from "@/utils/Initials";
import { LogoutButton } from "../LogoutButton";
import { Icon } from "@/models";
import { useUser } from "@/hooks/useUser";

export const SettingsPage = () => {
  const { data: user } = useUser();

  const fullName = user ? `${user.name} ${user.surname}` : "Загрузка...";

  return (
    <div className="settings">
      <div className="settings__wrapper">
        <div className="settings__user">
          <div className="settings__user-avatar">
            {getInitials(user?.name, user?.surname)}
          </div>
          <div className="settings__user-info">
            <span className="settings__user-text">Имя Фамилия</span>
            <span className="settings__user-name">{fullName}</span>
          </div>
        </div>
        <div className="settings__email">
          <div className="settings__email-avatar">
            <Icon
              className="settings__email-icon"
              name="email"
              width={22}
              height={18}
            />
          </div>
          <div className="settings__user-info">
            <span className="settings__user-text">Электронная почта</span>
            <span className="settings__user-name">{user?.email}</span>
          </div>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default SettingsPage;
