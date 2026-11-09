const { GoogleAuth } = require('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/tennisstats-dashboard-firebase/node_modules/google-auth-library');
const keyPath = 'C:/Users/darkw/Documents/codes/hobbies/tennis-stats/Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json';

async function getToken() {
  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/firebase'
    ]
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  console.log(token.token);
}

getToken().catch(console.error);
