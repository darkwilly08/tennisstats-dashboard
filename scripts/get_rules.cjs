const { GoogleAuth } = require('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/tennisstats-dashboard-firebase/node_modules/google-auth-library');
const path = require('path');

const keyPath = 'C:/Users/darkw/Documents/codes/hobbies/tennis-stats/Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json';

async function getRules() {
  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/firebase']
  });

  const client = await auth.getClient();
  const res = await client.request({
    url: 'https://firebaserules.googleapis.com/v1/projects/tennis-app-stats/rulesets'
  });

  console.log('Rulesets:', JSON.stringify(res.data, null, 2));

  if (res.data.rulesets && res.data.rulesets.length > 0) {
    const latest = res.data.rulesets[0].name;
    const detail = await client.request({
      url: `https://firebaserules.googleapis.com/v1/${latest}`
    });
    console.log('=== CURRENT FIRESTORE RULES ===');
    console.log(detail.data.source.files[0].content);
  }
}

getRules().catch(console.error);
