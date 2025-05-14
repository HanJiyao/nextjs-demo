"use client";

import { Button } from "antd";
import { signOut } from "@/lib/firebase/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Button type="primary" className="mt-6 rounded-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}
