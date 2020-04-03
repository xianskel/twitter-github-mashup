import { MashupService } from "./service/mashup-service.js";
import { TwitterApi } from "./network/twitter-api.js";
import { GitHubApi } from "./network/github-api.js";
import { DisplayService } from "./service/display-service.js";
import ora from "ora";

const spinner = ora("Loading ...");
const githubApi = new GitHubApi();
const twitterApi = new TwitterApi();
const mashupService = new MashupService(githubApi, twitterApi);
const displayService = new DisplayService(mashupService, spinner);

displayService.display();
