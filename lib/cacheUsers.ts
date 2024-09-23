import { getUsers } from "../services/users";

//TODO typa dla userCache
let userCache: any[] | null = null;
let isCacheLoaded = false;

export const getCachedUsers = async () => {
  if (!isCacheLoaded) {
    const users = await getUsers();
    userCache = users;
    isCacheLoaded = true;
    console.log("Users loaded !");
    return users;
  }
  console.log("Users already exist in cache !");
  return userCache;
};

export const invalidateUserCache = () => {
  userCache = null;
  isCacheLoaded = false;
};
