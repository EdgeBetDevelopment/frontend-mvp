import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useNotify } from 'react-admin';

import { userService } from '@/services/user';

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
}

export const ModeratorAdd = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [adding, setAdding] = useState(false);
  const notify = useNotify();

  const handleSearch = async () => {
    if (!email) {
      notify('Please enter an email', { type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const data = await userService.getUsersByEmail(email);

      if (data && data.length > 0) {
        setUser(data[0]);
        setIsAdmin(data[0].is_admin || false);
        setIsSuperAdmin(data[0].is_super_admin || false);
      } else {
        notify('User not found', { type: 'warning' });
        setUser(null);
      }
    } catch (error) {
      notify('Error searching for user', { type: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddModerator = async () => {
    if (!user) return;

    setAdding(true);
    try {
      await userService.updateModeratorPermissions(user.id, {
        is_admin: isAdmin,
        is_super_admin: isSuperAdmin,
      });

      notify('Moderator permissions updated successfully', { type: 'success' });
      setEmail('');
      setUser(null);
      setIsAdmin(false);
      setIsSuperAdmin(false);
    } catch (error) {
      notify('Error updating moderator permissions', { type: 'error' });
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add/Update Moderator
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading || !email}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>

        {user && (
          <Box>
            <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
              <Typography variant="h6">{user.username}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
              <Typography variant="caption" color="text.secondary">
                ID: {user.id}
              </Typography>
            </Card>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                }
                label="Is Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSuperAdmin}
                    onChange={(e) => setIsSuperAdmin(e.target.checked)}
                  />
                }
                label="Is Super Admin"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddModerator}
              disabled={adding}
            >
              {adding ? (
                <CircularProgress size={24} />
              ) : (
                'Update Moderator Permissions'
              )}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
