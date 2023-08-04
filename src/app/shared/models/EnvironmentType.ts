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
