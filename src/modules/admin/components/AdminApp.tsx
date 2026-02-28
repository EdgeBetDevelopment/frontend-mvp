import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Admin, Resource } from "react-admin";

import { customDataProvider } from "@/modules/admin/services";

import { AdminLayout } from "./AdminLayout";
import { ModeratorAdd } from "./moderator/ModeratorAdd";
import { ModeratorEdit } from "./moderator/ModeratorEdit";
import { ModeratorList } from "./moderator/ModeratorList";
import { PickOfTheDayCreate } from "./pickOfTheDay/PickOfTheDayCreate";
import { PickOfTheDayEdit } from "./pickOfTheDay/PickOfTheDayEdit";
import { PickOfTheDayList } from "./pickOfTheDay/PickOfTheDayList";
import { ReviewCreate } from "./review/ReviewCreate";
import { ReviewEdit } from "./review/ReviewEdit";
import { ReviewList } from "./review/ReviewList";
import { SubscriberCreate } from "./subscriber/SubscriberCreate";
import { SubscriberEdit } from "./subscriber/SubscriberEdit";
import { SubscriberList } from "./subscriber/SubscriberList";
import { User } from "./user/User";
import { UserWithBets } from "./user/UserBet";
import { UserList } from "./user/UserList";
import { UserWithBetsList } from "./user/UserWithBetsList";

const AdminApp = () => {
  const accessToken = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isSuperAdmin = localStorage.getItem("isSuperAdmin") === "true";
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    if (!isAdmin && !isSuperAdmin) {
      router.replace("/");
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
        options={{ label: "Pick of the Days" }}
      />
      {isSuperAdmin && (
        <>
          <Resource
            name="moderators"
            list={ModeratorList}
            edit={ModeratorEdit}
            create={ModeratorAdd}
            options={{ label: "Moderators" }}
          />
          <Resource
            name="subscribers"
            list={SubscriberList}
            create={SubscriberCreate}
            edit={SubscriberEdit}
            options={{ label: "Newsletter Subscribers" }}
          />
          <Resource
            name="review"
            list={ReviewList}
            create={ReviewCreate}
            edit={ReviewEdit}
            options={{ label: "Reviews" }}
          />
          <Resource
            name="users"
            list={UserList}
            show={User}
            options={{ label: "Users" }}
          />
          <Resource
            name="usersWithBets"
            list={UserWithBetsList}
            show={UserWithBets}
            options={{ label: "Users with Bets" }}
          />
        </>
      )}
    </Admin>
  );
};

export default AdminApp;
