const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

// Locate service account credentials
let serviceAccountPath = path.resolve(__dirname, '../../Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json');
if (!fs.existsSync(serviceAccountPath)) {
  serviceAccountPath = path.resolve(__dirname, '../../../Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json');
}

if (!fs.existsSync(serviceAccountPath)) {
  console.error('Service account file not found at:', serviceAccountPath);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    projectId: 'tennis-app-stats'
  });
}

const db = getFirestore();

async function activateSubscription() {
  const args = process.argv.slice(2);
  let targetUid = 'gz6cs3NkssMP9ElFbn4gpNXsHUB3'; // Default primary user

  const uidArgIdx = args.indexOf('--uid');
  if (uidArgIdx !== -1 && args[uidArgIdx + 1]) {
    targetUid = args[uidArgIdx + 1];
  }

  console.log(`Activating PRO subscription in Firestore for UID: ${targetUid}...`);

  const userDocRef = db.collection('users').doc(targetUid);
  const snap = await userDocRef.get();

  console.log(`Current document exists: ${snap.exists}`);
  if (snap.exists) {
    console.log('Current user data:', JSON.stringify(snap.data()?.subscription || {}, null, 2));
  }

  const subscriptionPayload = {
    isSubscribed: true,
    status: 'active',
    plan: 'pro_lifetime',
    productId: 'tennisstats_pro_monthly',
    source: 'admin_bypass',
    activatedAt: new Date().toISOString(),
    expiryDateMs: 4102444800000 // Far future: year 2100
  };

  await userDocRef.set({
    subscription: subscriptionPayload,
    updatedAt: new Date().toISOString()
  }, { merge: true });

  const updatedSnap = await userDocRef.get();
  console.log('Successfully activated subscription in Firestore!');
  console.log('New subscription status:', JSON.stringify(updatedSnap.data()?.subscription, null, 2));
}

activateSubscription().catch((err) => {
  console.error('Error activating subscription:', err);
  process.exit(1);
});
