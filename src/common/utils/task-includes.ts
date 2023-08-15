import { userIncludes } from './user-includes';

export const taskIncludes = {
  project: {
    select: {
      name: true,
      user: userIncludes.user,
    },
  },
  user: userIncludes.user
};
