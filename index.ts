import * as core from '@actions/core'
import run from './scripts/commit-bitmap'

try {
  const wsDir: string = process.env.WSDIR!
  const skipPush: boolean = core.getInput('skip-push') === 'true' ? true : false
  const skipCI: boolean = core.getInput('skip-ci') === 'false' ? false : true

  const gitUserName = process.env.GIT_USER_NAME
  if (!gitUserName) {
    throw new Error('Git user name not found')
  }

  const gitUserEmail = process.env.GIT_USER_EMAIL
  if (!gitUserEmail) {
    throw new Error('Git user email token not found')
  }

  run(skipPush, skipCI, gitUserName, gitUserEmail, wsDir)
} catch (error) {
  core.setFailed((error as Error).message)
}
