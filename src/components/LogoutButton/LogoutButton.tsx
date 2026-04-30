import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../components/Form/Button/Button";
import { logoutUser } from "../../api/User";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["users", "me"], null);
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });

      router.push("/");
    },
  });

  return (
    <div className="settings__logout">
      <Button
        className="settings__logout-btn"
        kind="secondary"
        onClick={() => logoutMutation.mutate()}
        isLoading={logoutMutation.isPending}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};
