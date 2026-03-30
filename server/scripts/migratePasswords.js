/**
 * migratePasswords.js — one-time: bcrypt-hash any users still storing plaintext passwords.
 *
 * Safe to run multiple times — already-migrated users (passwordHash exists) are skipped.
 * Run: cd server && node scripts/migratePasswords.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const bcrypt = require('bcrypt');
const { getUsers, setUser } = require('../services/firestore');

const SALT_ROUNDS = 12;

async function main() {
  const users = await getUsers();
  console.log(`Found ${users.length} user(s).`);

  let migrated = 0;
  let skipped = 0;

  for (const user of users) {
    if (user.passwordHash) {
      skipped++;
      continue;
    }
    if (!user.password) {
      console.warn(`  [warn] ${user.email} has no password field — skipping`);
      skipped++;
      continue;
    }

    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);
    const { password: _removed, ...updated } = { ...user, passwordHash };
    await setUser(updated);
    console.log(`  ✓ migrated ${user.email}`);
    migrated++;
  }

  console.log(`\nMigrated: ${migrated}  Skipped (already hashed or no password): ${skipped}`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
