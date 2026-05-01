import { User } from "@/api/User";
import { Icon } from "@/models";
import { Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorite, removeFromFavorite } from "@/api/Favorites";

interface FavoriteButtonProps {
  user: User | null;
  movieId: string;
  onOpenAuth: () => void;
}

export const FavoriteButton = ({
  user,
  movieId,
  onOpenAuth,
}: FavoriteButtonProps) => {
  const isFavorite = user?.favorites?.includes(movieId);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // В зависимости от того, есть фильм в избранном или нет, вызываем нужный метод
    mutationFn: () =>
      isFavorite ? removeFromFavorite(movieId) : addToFavorite(movieId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
    onError: (error) => {
      console.error("Ошибка при работе с избранным:", error);
    },
  });

  const handleFavoriteClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (!user) {
      onOpenAuth();
      return;
    }

    if (mutation.isPending) return;

    mutation.mutate();
    console.log(`Фильм ${movieId} ${isFavorite ? "удален" : "добавлен"}`);
  };

  return (
    <Button
      className={`intro__favorites-btn btn ${isFavorite ? "intro__favorites-btn--active" : ""}`}
      type="text"
      loading={mutation.isPending}
      onPointerDown={handleFavoriteClick}
      style={{ touchAction: "manipulation" }} 
      aria-label="Добавить фильм в избранное" 
    >
      <Icon
        name="love-favorites"
        className={`intro__favorites-icon ${!isFavorite ? "is-visible" : "is-hidden"}`}
        width={20}
        height={19}
      />
      <Icon
        name="favorite-icon"
        className={`intro__favorites-icon isActive ${isFavorite ? "is-visible" : "is-hidden"}`}
        width={20}
        height={19}
      />
    </Button>
  );
};
