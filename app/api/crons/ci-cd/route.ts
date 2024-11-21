// import { NextResponse } from 'next/server'
// import { Octokit } from '@octokit/rest'

// const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

// const OWNER = 'agustinredin'
// const REPO = 'sprintify'
// const BRANCH = 'main'

// type GitMode = '100644' | '100755' | '040000' | '160000' | '120000'
// type GitType = 'blob' | 'tree' | 'commit'

// TODO: Arreglar 
// function getGitMode(mode: string | undefined): GitMode {
//   switch (mode) {
//     case '100644':
//     case '100755':
//     case '040000':
//     case '160000':
//     case '120000':
//       return mode
//     default:
//       return '100644' // Default to regular file mode
//   }
// }

// function getGitType(type: string | undefined): GitType {
//   switch (type) {
//     case 'blob':
//     case 'tree':
//     case 'commit':
//       return type
//     default:
//       return 'blob' // Default to blob type
//   }
// }

// export async function GET() {
//   try {
//     // Get the latest commit SHA
//     const { data: refData } = await octokit.git.getRef({
//       owner: OWNER,
//       repo: REPO,
//       ref: `heads/${BRANCH}`,
//     })
//     const latestCommitSha = refData.object.sha

//     // Get the tree SHA of the latest commit
//     const { data: commitData } = await octokit.git.getCommit({
//       owner: OWNER,
//       repo: REPO,
//       commit_sha: latestCommitSha,
//     })
//     const treeSha = commitData.tree.sha

//     // Get all files in the repository
//     const { data: treeData } = await octokit.git.getTree({
//       owner: OWNER,
//       repo: REPO,
//       tree_sha: treeSha,
//       recursive: 'true'
//     })

//     // Create a new tree with all files
//     const newTree = await Promise.all(treeData.tree.map(async (item) => {
//       const mode = getGitMode(item.mode)
//       const type = getGitType(item.type)
      
//       if (type === 'blob' && item.sha) {
//         const { data: blobData } = await octokit.git.getBlob({
//           owner: OWNER,
//           repo: REPO,
//           file_sha: item.sha,
//         })
//         return {
//           path: item.path,
//           mode,
//           type,
//           content: Buffer.from(blobData.content, 'base64').toString('utf-8'),
//         }
//       }
//       return {
//         path: item.path,
//         mode,
//         type,
//         sha: item.sha,
//       }
//     }))

//     // Create a new tree with all files
//     const { data: newTreeData } = await octokit.git.createTree({
//       owner: OWNER,
//       repo: REPO,
//       tree: newTree,
//       base_tree: treeSha,
//     })

//     // Create a new commit
//     const { data: newCommitData } = await octokit.git.createCommit({
//       owner: OWNER,
//       repo: REPO,
//       message: 'Automated commit from CI/CD cron job',
//       tree: newTreeData.sha,
//       parents: [latestCommitSha],
//     })

//     // Update the reference to point to the new commit
//     await octokit.git.updateRef({
//       owner: OWNER,
//       repo: REPO,
//       ref: `heads/${BRANCH}`,
//       sha: newCommitData.sha,
//     })

//     return NextResponse.json({ message: 'CI/CD cron job completed successfully', commitSha: newCommitData.sha })
//   } catch (error) {
//     console.error('Error in cron job:', error)
//     return NextResponse.json({ error: 'CI/CD cron job failed', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
//   }
// }