import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { DisplayService } from "../src/service/display-service";
chai.use(sinonChai);

const mockMashupService = {
  mashup: () => Promise.resolve("Test Response")
};

const mockSpinner = {
  start: () => {},
  stop: () => {}
};

console.clear = () => {};
console.log = () => {};
console.error = () => {};

const service = new DisplayService(mockMashupService, mockSpinner);

describe("DisplayService", () => {
  afterEach(function() {
    sinon.restore();
  });
  it("should clear console", () => {
    sinon.spy(console, "clear");
    service.display();
    expect(console.clear.calledOnce).to.be.true;
  });

  it("should display header text", () => {
    sinon.spy(console, "log");
    service.display();
    expect(console.log.calledOnce).to.be.true;
  });

  it("should display the loading spinner", () => {
    sinon.spy(mockSpinner, "start");
    service.display();
    expect(mockSpinner.start.calledOnce).to.be.true;
  });

  it("should stop the loading spinner on successfull response", async () => {
    sinon.spy(mockSpinner, "stop");
    await service.display();
    expect(mockSpinner.stop.calledOnce).to.be.true;
  });

  it("should show result successfull response", async () => {
    sinon.spy(console, "log");
    await service.display();
    expect(console.log.calledTwice).to.be.true;
  });

  it("should stop the loading spinner on failure", async () => {
    mockMashupService.mashup = () => Promise.reject("error");
    sinon.spy(mockSpinner, "stop");
    try {
      await service.display();
    } catch {
      expect(mockSpinner.stop.calledOnce).to.be.true;
    }
  });

  it("should display error message on failure", async () => {
    mockMashupService.mashup = () => Promise.reject("error");
    sinon.spy(console, "error");
    try {
      await service.display();
    } catch {
      expect(console.error.calledOnce).to.be.true;
    }
  });
});
