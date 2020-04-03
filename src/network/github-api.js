import axios from "axios";

const BASE_URL = "https://api.github.com/";
const SEARCH_REPOS = "search/repositories";

export class GitHubApi {
  fetchRepos() {
    return axios
      .get(`${BASE_URL}${SEARCH_REPOS}`, {
        params: {
          q: "Reactive",
          per_page: 10
        }
      })
      .then(response => response.data.items);
  };
}
