export const deleteUnverifiedUsers = async () => {
    try {
      const result = await sql`DELETE FROM users WHERE verified = false`;
      console.log(`Deleted ${result.rowCount} unverified users.`);
      return result.rowCount ?? 0;
    } catch (error) {
      console.error('Error deleting unverified users:', error);
      throw error;
    }
  }