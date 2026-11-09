const { initializeApp, cert } = require('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/tennisstats-dashboard-firebase/node_modules/firebase-admin');
const { getFirestore } = require('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/tennisstats-dashboard-firebase/node_modules/firebase-admin/lib/firestore');

const serviceAccount = require('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json');

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

async function run() {
  const matchId = '99f21204-d835-46f0-9bd1-defe35d7b4a5';
  console.log(`Checking match with ID: ${matchId}`);
  
  const docRef = db.collection('matches').doc(matchId);
  const docSnap = await docRef.get();
  
  if (!docSnap.exists) {
    console.log(`Document ${matchId} does not exist directly. Listing latest 5 matches in collection:`);
    const list = await db.collection('matches').limit(5).get();
    list.forEach(d => {
      console.log(`Doc ID: ${d.id}, data:`, JSON.stringify(d.data(), null, 2));
    });
    return;
  }
  
  const data = docSnap.data();
  console.log('=== MATCH FOUND IN CLOUD FIRESTORE ===');
  console.log(JSON.stringify(data, null, 2));

  // Validation checks:
  console.log('\n--- FIELD VALIDATION ---');
  console.log('matchId matches doc.id:', data.matchId === matchId);
  console.log('userId present:', !!data.userId, `(${data.userId})`);
  console.log('sets count:', data.sets?.length);
  console.log('games total:', data.games);
  console.log('health_metrics present:', !!data.health_metrics);
  if (data.health_metrics) {
    console.log('health_metrics.active_calories:', data.health_metrics.active_calories);
    console.log('health_metrics.heart_rate:', JSON.stringify(data.health_metrics.heart_rate));
    console.log('health_metrics.duration_ms:', data.health_metrics.duration_ms);
    console.log('health_metrics.total_steps:', data.health_metrics.total_steps);
  }
}

run().catch(console.error);
