const { GoogleAuth } = require('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/tennisstats-dashboard-firebase/node_modules/google-auth-library');

const keyPath = 'C:/Users/darkw/Documents/codes/hobbies/tennis-stats/Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json';

async function listAndroidApps() {
  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/firebase']
  });

  const client = await auth.getClient();
  const res = await client.request({
    url: 'https://firebase.googleapis.com/v1beta1/projects/tennis-app-stats/androidApps'
  });

  console.log('Firebase Android Apps:', JSON.stringify(res.data, null, 2));
}

listAndroidApps().catch(console.error);
