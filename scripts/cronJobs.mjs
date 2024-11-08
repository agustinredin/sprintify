import cron from 'node-cron';
import { deleteUnverifiedUsers } from '../app/actions/cronJobActions.mjs';

// Schedule the cron job to run every day at 3 AM GMT-3
cron.schedule('0 3 * * *', async () => {
  console.log('Running cron job to delete unverified users...');
  try {
    const deletedCount = await deleteUnverifiedUsers();
    console.log(`Cron job completed. Deleted ${deletedCount} unverified users.`);
  } catch (error) {
    console.error('Cron job failed:', error);
  }
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo" // This corresponds to GMT-3
});

console.log('Cron jobs scheduled.');