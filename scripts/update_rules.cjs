const { GoogleAuth } = require('google-auth-library');

const keyPath = 'C:/Users/darkw/Documents/codes/hobbies/tennis-stats/Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json';

async function updateRules() {
  const auth = new GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/firebase']
  });

  const client = await auth.getClient();
  
  const rulesContent = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sync_logs/{logId} {
      allow create: if true;
      allow read: if true;
    }
    match /matches/{matchId} {
      allow read, write: if true;
    }
    match /tournaments/{tournamentId} {
      allow read, write: if true;
      match /matches/{tournamentMatchId} {
        allow read, write: if true;
      }
    }
    match /equipment/{userId}/{document=**} {
      allow read, write: if true;
    }
    match /users/{userId} {
      allow read, write: if true;
    }
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;

  console.log('Creating ruleset...');
  const createRes = await client.request({
    url: 'https://firebaserules.googleapis.com/v1/projects/tennis-app-stats/rulesets',
    method: 'POST',
    data: {
      source: {
        files: [
          {
            name: 'firestore.rules',
            content: rulesContent
          }
        ]
      }
    }
  });

  const rulesetName = createRes.data.name;
  console.log('Ruleset created:', rulesetName);

  console.log('Releasing ruleset for cloud.firestore...');
  // Find release for cloud.firestore
  const releasesRes = await client.request({
    url: 'https://firebaserules.googleapis.com/v1/projects/tennis-app-stats/releases'
  });
  console.log('Releases:', JSON.stringify(releasesRes.data, null, 2));

  // Update or create release 'projects/tennis-app-stats/releases/cloud.firestore'
  const updateRes = await client.request({
    url: 'https://firebaserules.googleapis.com/v1/projects/tennis-app-stats/releases/cloud.firestore',
    method: 'PATCH',
    data: {
      release: {
        name: 'projects/tennis-app-stats/releases/cloud.firestore',
        rulesetName: rulesetName
      }
    }
  });

  console.log('Release updated successfully:', updateRes.data);
}

updateRules().catch(console.error);
