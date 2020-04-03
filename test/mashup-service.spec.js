import { MashupService } from "../src/service/mashup-service";
import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { rawGithubResponse } from "./stubs/github-stubs";
import { rawTwitterResponse } from "./stubs/twitter-stubs";
chai.use(sinonChai);

const mockGitHubApi = {
  fetchRepos: () => rawGithubResponse
};

const mockTwitterApi = {
  fetchTweets: () => rawTwitterResponse
};

const service = new MashupService(mockGitHubApi, mockTwitterApi);

describe("MashupService", () => {
  it("should try to fetch GitHub repos", async () => {
    sinon.spy(mockGitHubApi, "fetchRepos");
    await service.mashup();
    expect(mockGitHubApi.fetchRepos.calledOnce).to.be.true;
  });

  it("should try to fetch tweets for every repo", async () => {
    sinon.spy(mockTwitterApi, "fetchTweets");
    await service.mashup();
    expect(mockTwitterApi.fetchTweets.calledTwice).to.be.true;
  });

  it("should correctly map the repo response", async () => {
    const result = await service.mashup();
    expect(result[0]).to.have.keys([
      "name",
      "description",
      "url",
      "language",
      "tweets"
    ]);
  });

  it("should correctly map the tweets response", async () => {
    const result = await service.mashup();
    expect(result[0].tweets[0]).to.have.keys([
      "created_at",
      "lang",
      "retweet_count",
      "text",
      "user"
    ]);
  });
});
