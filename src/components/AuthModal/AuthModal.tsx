"use client";
import { Modal} from "antd";
import { Icon } from "@/models";
import { Account } from "../Account/Account";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { data: user } = useUser();

  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      closable={false}
      footer={null}
      mask={{ closable: false }} 
      rootClassName="auth-modal-custom"
      closeIcon={<Icon name="close-icon" width={19} height={19} />}
      destroyOnHidden 
      style={{ maxWidth: "calc(100vw - 32px)" }}
      centered
      width={450}
    >
      <Account onClose={onClose} />
    </Modal>
  );
};
