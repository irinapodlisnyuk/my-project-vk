'use client'

import { AuthForm } from "../Form/AuthForm/AuthForm";
import { AccountView } from "./AccountView";
import { LoaderForm } from "../Form/LoaderForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface AccountProps {
  onClose?: () => void; 
}

export const Account = ({ onClose }: AccountProps) => {
  const router = useRouter();
  const { data, isError, isLoading } = useUser();

 
  useEffect(() => {
    if (isError && !onClose) {
      router.replace("/");
    }
  }, [isError, onClose, router]);

  if (isLoading) return <LoaderForm />;

  if (isError || !data) {
    return onClose ? <AuthForm onClose={onClose} /> : null;
  }

  return <AccountView user={data} />;
};