import Twitter from "twitter";

const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const SEARCH_TWEETS = "search/tweets";

export class TwitterApi {
  fetchTweets(query) {
    return twitter
      .get(SEARCH_TWEETS, { q: query, result_type: "recent", count: 5 })
      .then(tweets => tweets.statuses);
  }
}
