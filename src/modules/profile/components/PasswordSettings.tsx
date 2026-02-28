"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Input, Label, Loader } from "@/shared/components";
import { userService } from '@/modules/profile/services';
import { toast } from "sonner";
import { handleFetchError } from "@/shared/utils";

const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasswordMutation = useMutation({
    mutationFn: (data: {
      current_password: string;
      new_password: string;
      new_password_confirm: string;
    }) => userService.changePassword(data),
    onSuccess: () => {
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        "Failed to update password. Please check your current password.",
      );
      toast.error(errorMessage);
    },
  });

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    changePasswordMutation.mutate({
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirm: confirmPassword,
    });
  };

  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">Password</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Change your account password
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border-border bg-secondary/50"
              disabled={changePasswordMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-border bg-secondary/50"
              disabled={changePasswordMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-border bg-secondary/50"
              disabled={changePasswordMutation.isPending}
            />
          </div>
          <Button
            onClick={handleSavePassword}
            disabled={changePasswordMutation.isPending}
          >
            {changePasswordMutation.isPending ? <Loader /> : "Update Password"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PasswordSettings;
