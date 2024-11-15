import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function GET() {
  try {
    // Get the latest commit SHA
    const { data: refData } = await octokit.git.getRef({
      owner: 'agustinredin',
      repo: 'sprintify',
      ref: 'heads/main',
    })
    const latestCommitSha = refData.object.sha

    // Create a new tree with the changes
    const { data: treeData } = await octokit.git.createTree({
      owner: 'your-username',
      repo: 'your-repo',
      base_tree: latestCommitSha,
      tree: [
        {
          path: 'path/to/your/file.txt',
          mode: '100644',
          type: 'blob',
          content: 'Updated content',
        },
      ],
    })

    // Create a new commit
    const { data: commitData } = await octokit.git.createCommit({
      owner: 'agustinredin',
      repo: 'sprintify',
      message: 'Automated commit from CI/CD cron job',
      tree: treeData.sha,
      parents: [latestCommitSha],
    })

    // Update the reference to point to the new commit
    await octokit.git.updateRef({
      owner: 'agustinredin',
      repo: 'sprintify',
      ref: 'heads/main',
      sha: commitData.sha,
    })

    return NextResponse.json({ message: 'CI/CD cron job completed successfully' })
  } catch (error) {
    console.error('Error in cron job:', error)
    return NextResponse.json({ error: 'CI/CD cron job failed' }, { status: 500 })
  }
}