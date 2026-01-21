import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Admin, Resource } from 'react-admin';

import customDataProvider from '@/services/admin';

import { AdminLayout } from './AdminLayout';
import { PickOfTheDayCreate } from './PickOfTheDayCreate';
import { PickOfTheDayList } from './PickOfTheDayList';
import { ReviewCreate } from './ReviewCreate';
import { ReviewEdit } from './ReviewEdit';
import { ReviewList } from './ReviewList';
import { User } from './User';
import { UserWithBets } from './UserBet';
import { UserList } from './UserList';
import { UserWithBetsList } from './UserWithBetsList';

const AdminApp = () => {
  const accessToken = localStorage.getItem('accessToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isSuperAdmin = localStorage.getItem('isSuperAdmin') === 'true';
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace('/login');
      return;
    }

    // Check if user has admin access
    if (!isAdmin && !isSuperAdmin) {
      router.replace('/');
    }
  }, [accessToken, isAdmin, isSuperAdmin, router]);

  if (!accessToken || (!isAdmin && !isSuperAdmin)) {
    return null;
  }

  return (
    <Admin dataProvider={customDataProvider} layout={AdminLayout}>
      {/* Pick of the Day - доступно для всіх адмінів */}
      <Resource
        create={PickOfTheDayCreate}
        name="pick_of_the_day"
        list={PickOfTheDayList}
        options={{ label: 'Pick of the Days' }}
      />

      {/* Решта ресурсів - тільки для super admin */}
      {isSuperAdmin && (
        <>
          <Resource
            name="review"
            list={ReviewList}
            create={ReviewCreate}
            edit={ReviewEdit}
            options={{ label: 'Reviews' }}
          />
          <Resource
            name="users"
            list={UserList}
            show={User}
            options={{ label: 'Users' }}
          />
          <Resource
            name="usersWithBets"
            list={UserWithBetsList}
            show={UserWithBets}
            options={{ label: 'Users with Bets' }}
          />
        </>
      )}
    </Admin>
  );
};

export default AdminApp;
