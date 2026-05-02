import { FC, useState } from "react";
import { User } from "../../api/User";
import { Icon,  } from "@/models";
import { useFavoriteMovies } from "@/hooks/useFavoriteMovies";
import FavoritesList from "../Favorites/FavoritesList";
import Settings from "../Settings/Settings";
import './Account.scss'
import LoaderPage from "../LoaderPage/LoaderPage";

interface AccountViewProps {
  user: User;
}

export const AccountView: FC<AccountViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<"favorites" | "settings">("favorites");

    const { favoriteMovies, isLoading } = useFavoriteMovies(activeTab === "favorites");

  return (
    <section className="account" style={{ minHeight: '600px' }}>
      <div className="container">
        <h1 className="account__title">Мой аккаунт</h1>
        <ul className="account__info-list">
          <li className="account__info-item">
            <button
              className={`account__favorites-btn ${activeTab === "favorites" ? "account__favorites-btn--active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              <Icon
                name="love-favorites"
                className="account__favorites-icon"
                width={20}
                height={19}
              />
              <span className="account__info-label">Избранные фильмы</span>
              <span className="account__info-label-mobile">Избранное</span>
            </button>
          </li>
          <li className="account__info-item">
            <button
              className={`account__settings-btn ${activeTab === "settings" ? "account__settings-btn--active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Icon
                className="account__name-icon"
                name="human"
                width={16}
                height={21}
              />
              <span className="account__info-label">Настройка аккаунта</span>
              <span className="account__info-label-mobile">Настройки</span>
            </button>
          </li>
        </ul>


        {activeTab === "favorites" ? (
            <div className="account__favorites-content">
              {isLoading ? (
               <div className="loader"><LoaderPage/></div>
            ) : (
              <FavoritesList initialMovies={favoriteMovies} user={user} />
            )}
          </div>
        ) : (
          <div className="account-card__form">
            <Settings />
          </div>
        )}
      </div>
    </section>
  );
};
