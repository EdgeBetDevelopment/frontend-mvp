import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Admin, Resource } from 'react-admin';

import customDataProvider from '@/services/admin';

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
  const router = useRouter();
  console.log(accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null;
  }

  return (
    <Admin dataProvider={customDataProvider}>
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
      <Resource
        create={PickOfTheDayCreate}
        name="pick_of_the_day"
        // show={PickOfTheDay}
        list={PickOfTheDayList}
        options={{ label: 'Pick of the Days' }}
      />
    </Admin>
  );
};

export default AdminApp;
