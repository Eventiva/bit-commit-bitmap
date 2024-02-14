import { exec } from '@actions/exec'

const run = async (
  skipPush: boolean,
  skipCI: boolean,
  gitUserName: string,
  gitUserEmail: string,
  wsdir: string
): Promise<void> => {
  await exec(`git config --global user.name "${gitUserName}"`, [], {
    cwd: wsdir
  })
  await exec(`git config --global user.email "${gitUserEmail}"`, [], {
    cwd: wsdir
  })
  await exec('git add .bitmap pnpm-lock.yaml', [], { cwd: wsdir })

  try {
    await exec(
      `git commit -m "update .bitmap and pnpm-lock.yaml with new component and dependency versions (automated)${skipCI ? ` [skip-ci]` : ''}"`,
      [],
      { cwd: wsdir }
    )
  } catch (error) {
    console.error(`Error while committing changes`)
  }

  if (!skipPush) {
    await exec('git push', [], { cwd: wsdir })
  }
}

export default run
