export class MashupService {
  constructor(githubApi, twitterApi) {
    this.githubApi = githubApi;
    this.twitterApi = twitterApi;
  }

  async mashup() {
    const repos = repoMapper(await this.githubApi.fetchRepos());

    return Promise.all(
      repos.map(async repo => {
        const tweets = tweetMapper(
          await this.twitterApi.fetchTweets(repo.name)
        );
        return { ...repo, tweets };
      })
    );
  }
}

const repoMapper = repos =>
  repos.map(repo => {
    const { name, description, url, language } = repo;
    return { name, description, url, language };
  });

const tweetMapper = tweets =>
  tweets.map(tweet => {
    const {
      created_at,
      text,
      user: { name: user },
      lang,
      retweet_count
    } = tweet;
    return { created_at, text, user, lang, retweet_count };
  });
