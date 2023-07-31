import * as core from "@actions/core";
import run from "./scripts/commit-bitmap";

try {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  const skipPush: string | undefined = core.getInput("skip-push");
  const skipCI: string = core.getInput("skip-ci") === 'false' ? 'false' : 'true';

  const gitUserName = process.env.GIT_USER_NAME;
  if (!gitUserName) {
    throw new Error("Git user name not found");
  }

  const gitUserEmail = process.env.GIT_USER_EMAIL;
  if (!gitUserEmail) {
    throw new Error("Git user email token not found");
  }

  run(skipPush, skipCI, gitUserName, gitUserEmail, wsDir);
} catch (error) {
  core.setFailed((error as Error).message);
}
