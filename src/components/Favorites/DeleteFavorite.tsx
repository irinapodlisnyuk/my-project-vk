"use client";
import { addToFavorite, removeFromFavorite } from "@/api/Favorites";
import { User } from "@/api/User";
import { Icon } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteFavoriteProps {
  user: User | null;
  movieId: string;
}

export const DeleteFavorite = ({ user, movieId }: DeleteFavoriteProps) => {
  const queryClient = useQueryClient();

  // 1. Проверяем, есть ли фильм в массиве избранного у пользователя
  const isFavorite = user?.favorites?.includes(movieId);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      isFavorite ? removeFromFavorite(movieId) : addToFavorite(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 

    if (!user) {
      alert("Пожалуйста, войдите в аккаунт");
      return;
    }

    // Если запрос уже идет (isPending), не даем кликать повторно
    if (!isPending) {
      mutate();
    }
  };

  return (
    <button
      className="favorite__delete-btn"
      onClick={handleFavoriteClick}
      disabled={isPending} 
      style={{
        cursor: isPending ? "not-allowed" : "pointer",
        opacity: isPending ? 0.5 : 1,
      }}
    >
      <Icon
        className="favorite__delete-icon"
        name="close-icon" 
        width={13}
        height={13}
      />
    </button>
  );
};

export default DeleteFavorite;
