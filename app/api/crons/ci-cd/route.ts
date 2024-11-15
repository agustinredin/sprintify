import simpleGit from 'simple-git';
import { exec } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic"; // Ensures dynamic behavior

const git = simpleGit();

export interface CronJobResponse {
  message: string;
  error?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<CronJobResponse>> {
  try {
    // Stage all changes
    await git.add('.');
    
    // Commit changes with a timestamp
    const commitMessage = `Auto-commit at ${new Date().toISOString()}`;
    await git.commit(commitMessage);
    
    // Push changes to the specified branch
    await git.push('origin', 'main');
    
    // Trigger Vercel deployment using Vercel CLI
    exec('vercel --prod', (error, stdout, stderr) => {
      if (error) {
        console.error(`Deployment error: ${error}`);
        return NextResponse.json({ message: 'Deployment failed', error: error.message }, { status: 500 });
      }
      console.log(`Deployment output: ${stdout}`);
      console.error(`Deployment errors: ${stderr}`);
    });
    
    return NextResponse.json({ message: 'Cron job executed successfully' });
    
  } catch (err) {
    console.error('Error in cron job:', err);
    return NextResponse.json({ message: 'Error executing cron job', error: (err as Error).message }, { status: 500 });
  }
}