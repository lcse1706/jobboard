import { Session } from "next-auth";

import { getCachedUsers } from "@/lib";
import { updateUser } from "@/services";

export const deleteUserOffer = async (
  offerId: string,
  session: Session | null | undefined,
  pickOffers: string
) => {
  const users = await getCachedUsers();
  const sessionUser = session?.user?.email;

  for (const user in users) {
    if (sessionUser === users[user].email) {
      for (let i = 0; i < users[user][pickOffers].length; i++) {
        const offer = users[user][pickOffers][i];

        if (offer === offerId) {
          console.log("Delete offer with id: " + offerId);

          // Remove offerId from array
          const updatedArray = [...users[user][pickOffers]];
          updatedArray.splice(i, 1);

          const updatedUser = {
            ...users[user],
            [pickOffers]: updatedArray,
          };

          updateUser(user, updatedUser);
        }
      }
    }
  }
};
