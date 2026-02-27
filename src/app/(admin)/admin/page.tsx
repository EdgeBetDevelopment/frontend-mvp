"use client";

import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const AdminApp = dynamic(
  () => import("../../../modules/admin/components/AdminApp"),
  {
    ssr: false,
    loading: () => <CircularProgress />,
  },
);

export default function AdminPage() {
  return <AdminApp />;
}
