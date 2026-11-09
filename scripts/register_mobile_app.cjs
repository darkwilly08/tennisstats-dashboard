const { GoogleAuth } = require('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/tennisstats-dashboard-firebase/node_modules/google-auth-library');

const keyPath = 'C:/Users/darkw/Documents/codes/hobbies/tennis-stats/Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json';

async function registerMobileApp() {
  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/firebase']
  });

  const client = await auth.getClient();

  console.log('1. Registering Android app in Firebase...');
  const createRes = await client.request({
    url: 'https://firebase.googleapis.com/v1beta1/projects/tennis-app-stats/androidApps',
    method: 'POST',
    data: {
      displayName: 'Tennis Stats Mobile Companion',
      packageName: 'com.darkwilly08.tennisstats_mobile'
    }
  });

  console.log('App create operation:', createRes.data);

  // Poll for completion
  let opName = createRes.data.name;
  let appData = null;
  while (!appData) {
    console.log('Waiting for creation operation to complete...');
    await new Promise(r => setTimeout(r, 2000));
    const opRes = await client.request({
      url: `https://firebase.googleapis.com/v1beta1/${opName}`
    });
    if (opRes.data.done) {
      appData = opRes.data.response;
      console.log('App created:', appData);
    }
  }

  const appId = appData.appId;
  const sha1List = [
    'c7a9cc25b7fbfdf402cad1cad2d9880413bd4375',
    'f1f06c4cccde442b4a8d6743088e21a6e7dcc979',
    'ca877d665d87a3efcbb3edbe73eafae85e1f88f6'
  ];

  for (const sha of sha1List) {
    try {
      console.log(`Adding SHA1 ${sha}...`);
      await client.request({
        url: `https://firebase.googleapis.com/v1beta1/projects/tennis-app-stats/androidApps/${appId}/sha`,
        method: 'POST',
        data: {
          shaHash: sha,
          certType: 'SHA_1'
        }
      });
      console.log(`Added SHA1 ${sha}`);
    } catch (e) {
      console.warn(`SHA ${sha} add error:`, e.message);
    }
  }

  // Fetch google-services.json configuration
  console.log('Fetching google-services.json for mobile app...');
  const configRes = await client.request({
    url: `https://firebase.googleapis.com/v1beta1/projects/tennis-app-stats/androidApps/${appId}/config`
  });
  
  const fs = require('fs');
  const configFileContents = Buffer.from(configRes.data.configFileContents, 'base64').toString('utf8');
  fs.writeFileSync('C:/Users/darkw/Documents/codes/hobbies/tennis-stats/tennisstats-mobile/android/app/google-services.json', configFileContents);
  console.log('Successfully wrote google-services.json to tennisstats-mobile/android/app/google-services.json');
}

registerMobileApp().catch(console.error);
