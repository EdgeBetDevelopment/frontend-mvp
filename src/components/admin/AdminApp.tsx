import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Admin, Resource } from 'react-admin';

import customDataProvider from '@/services/admin';

import { AdminLayout } from './AdminLayout';
import { ModeratorAdd } from './ModeratorAdd';
import { ModeratorEdit } from './ModeratorEdit';
import { ModeratorList } from './ModeratorList';
import { PickOfTheDayCreate } from './PickOfTheDayCreate';
import { PickOfTheDayEdit } from './PickOfTheDayEdit';
import { PickOfTheDayList } from './PickOfTheDayList';
import { ReviewCreate } from './ReviewCreate';
import { ReviewEdit } from './ReviewEdit';
import { ReviewList } from './ReviewList';
import { SubscriberCreate } from './SubscriberCreate';
import { SubscriberEdit } from './SubscriberEdit';
import { SubscriberList } from './SubscriberList';
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

    if (!isAdmin && !isSuperAdmin) {
      router.replace('/');
    }
  }, [accessToken, isAdmin, isSuperAdmin, router]);

  if (!accessToken || (!isAdmin && !isSuperAdmin)) {
    return null;
  }

  return (
    <Admin dataProvider={customDataProvider} layout={AdminLayout}>
      <Resource
        create={PickOfTheDayCreate}
        edit={PickOfTheDayEdit}
        name="pick_of_the_day"
        list={PickOfTheDayList}
        options={{ label: 'Pick of the Days' }}
      />
      {isSuperAdmin && (
        <>
          <Resource
            name="moderators"
            list={ModeratorList}
            edit={ModeratorEdit}
            create={ModeratorAdd}
            options={{ label: 'Moderators' }}
          />
          <Resource
            name="subscribers"
            list={SubscriberList}
            create={SubscriberCreate}
            edit={SubscriberEdit}
            options={{ label: 'Newsletter Subscribers' }}
          />
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
