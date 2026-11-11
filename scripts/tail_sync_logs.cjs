const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

let serviceAccountPath = path.resolve(__dirname, '../../Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json');
if (!fs.existsSync(serviceAccountPath)) {
  serviceAccountPath = path.resolve(__dirname, '../../../Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json');
}
const serviceAccount = require(serviceAccountPath);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    projectId: 'tennis-app-stats'
  });
}

const db = getFirestore();

async function tailSyncLogs() {
  console.log('--- Fetching recent sync_logs from Firestore ---');
  const snap = await db.collection('sync_logs')
    .orderBy('timestamp', 'desc')
    .limit(25)
    .get();

  if (snap.empty) {
    console.log('No sync_logs entries found yet.');
    return;
  }

  console.log(`Found ${snap.size} log entries:\n`);
  snap.forEach(doc => {
    const data = doc.data();
    const ts = data.timestamp ? new Date(data.timestamp.toDate?.() || data.timestamp).toISOString() : 'no timestamp';
    console.log(`[${ts}] [${data.source || 'unknown'}] Event: ${data.event} | MatchId: ${data.matchId || '-'} | Success: ${data.success}`);
    if (data.error) console.log(`  -> Error: ${data.error}`);
    if (data.userId) console.log(`  -> UserId: ${data.userId} (Subscribed: ${data.isSubscribed})`);
    if (data.details) console.log(`  -> Details:`, JSON.stringify(data.details));
  });
}

tailSyncLogs().catch(console.error);
