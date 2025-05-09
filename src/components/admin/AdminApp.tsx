import { Admin, Resource } from 'react-admin';

import customDataProvider from '@/services/admin';

import { UserList } from './UserList';
import { UserWithBetsList } from './UserWithBetsList';

const AdminApp = () => (
  <Admin dataProvider={customDataProvider}>
    <Resource name="users" list={UserList} options={{ label: 'Users' }} />
    <Resource
      name="usersWithBets"
      list={UserWithBetsList}
      options={{ label: 'Users with Bets' }}
    />
  </Admin>
);

export default AdminApp;
