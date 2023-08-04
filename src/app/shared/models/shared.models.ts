export type User = {
  active: boolean;
  email: string;
  id: number;
  join_date: string;
  username: string;
};

export type Timeline = {
  content: string;
  id: number;
  published: string;
  user: User;
};
export type Environment = {
  production: boolean;
  debugMode: boolean;
  commandQueryUrls: {
    register: string;
    login: string;
    makeTweet: string;
    getAllUsers: string;
    getTweetsByUserId: string;
    getFollwingsByUserId: string;
    getFollowersByUserId: string;
    getMyFollowers: string;
    getMyFollowings: string;
    getMyTweets: string;
    getMyTimeline: string;
    followUser: string;
    unfollowUser: string;
    searchByUsername: string;
  };
};
