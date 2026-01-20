import { Layout, AppBar } from 'react-admin';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { Button } from '@/ui/button';

const CustomAppBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <AppBar sx={{ '& .RaAppBar-toolbar': { paddingRight: 2 } }}>
      <Box
        display="flex"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" color="inherit">
          Admin Panel
        </Typography>
        <Button
          onClick={handleLogout}
          variant="outline"
          style={{ marginLeft: 'auto' }}
        >
          Logout
        </Button>
      </Box>
    </AppBar>
  );
};

export const AdminLayout = (props: any) => (
  <Layout {...props} appBar={CustomAppBar} />
);
