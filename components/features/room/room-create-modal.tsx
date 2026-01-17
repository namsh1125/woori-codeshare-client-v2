import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import FormField from "@/components/ui/form-field";

interface RoomCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, password: string) => void;
  preventEscClose?: boolean;
}

export default function RoomCreateModal({
  isOpen,
  onClose,
  onSubmit,
  preventEscClose,
}: RoomCreateModalProps) {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(title, password);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      allowBackdropClose={false}
      preventEscClose={preventEscClose}
      closeButton={false}
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
        Create Room
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Room Title" required>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormField>

        <Button type="submit" variant="primary" fullWidth>
          Create
        </Button>
      </form>
    </Modal>
  );
}
