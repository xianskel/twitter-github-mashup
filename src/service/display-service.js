import chalk from "chalk";
import figlet from "figlet";
import util from "util";

export class DisplayService {
  constructor(mashupService, spinner) {
    this.mashupService = mashupService;
    this.spinner = spinner;
  }

  display() {
    console.clear();
    console.log(chalk.yellow(figlet.textSync("Reactive Tweets")));
    this.spinner.start();
    this.mashupService
      .mashup()
      .then(result => {
        this.spinner.stop();
        console.log(util.inspect(result, { depth: null, colors: true }));
      })
      .catch(err => {
        this.spinner.stop();
        console.error("An Error occured: " + err);
      });
  }
}
