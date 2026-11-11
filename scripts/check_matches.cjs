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

async function checkRecentMatches() {
  console.log('--- Checking all collections / recent matches ---');
  const snap = await db.collection('matches').get();
  console.log(`Total matches in collection 'matches': ${snap.size}`);

  const matches = [];
  snap.forEach(doc => {
    const data = doc.data();
    matches.push({
      id: doc.id,
      userId: data.userId,
      idt: data.idt,
      fdt: data.fdt,
      dateFormatted: data.idt ? new Date(typeof data.idt === 'number' ? data.idt : data.idt.toDate?.() || data.idt).toISOString() : 'no idt',
      fdtFormatted: data.fdt ? new Date(typeof data.fdt === 'number' ? data.fdt : data.fdt.toDate?.() || data.fdt).toISOString() : 'no fdt',
      rival: data.rival || data.opponent,
      score: data.score
    });
  });

  // Sort by idt descending
  matches.sort((a, b) => (b.idt || 0) - (a.idt || 0));

  console.log('Top 10 most recent matches in Firestore:');
  console.log(JSON.stringify(matches.slice(0, 10), null, 2));

  // Also check if any matches are stored in users/{userId}/matches subcollection
  for (const uid of ['QJn56KWUJQVV7l5XvKwUL4hH00N2', 'gz6cs3NkssMP9ElFbn4gpNXsHUB3']) {
    const userMatchesSnap = await db.collection('users').doc(uid).collection('matches').get();
    console.log(`Subcollection users/${uid}/matches size: ${userMatchesSnap.size}`);
  }
}

checkRecentMatches().catch(console.error);
