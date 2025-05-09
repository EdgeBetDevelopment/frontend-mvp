'use client';

import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

const AdminApp = dynamic(() => import('../../../components/admin/AdminApp'), {
  ssr: false,
  loading: () => <CircularProgress />,
});

export default function AdminPage() {
  return <AdminApp />;
}
