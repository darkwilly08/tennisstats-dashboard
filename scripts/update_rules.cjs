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

    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isSubscriber(userId) {
      return isOwner(userId) && (
        request.auth.token.isSubscriber == true ||
        get(/databases/$(database)/documents/users/$(userId)).data.subscription.status == 'active' ||
        get(/databases/$(database)/documents/users/$(userId)).data.subscription.isSubscribed == true
      );
    }

    // Diagnostics / sync logs
    match /sync_logs/{logId} {
      allow create: if true;
      allow read: if true;
    }

    // User profile and subscription entitlement
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId);
    }

    // Matches collection: only owner with active subscription can read or write
    match /matches/{matchId} {
      allow read: if isAuthenticated() && isSubscriber(resource.data.userId);
      allow create: if isAuthenticated() && isSubscriber(request.resource.data.userId);
      allow update, delete: if isAuthenticated() && isSubscriber(resource.data.userId);
    }

    // Kit bag & equipment
    match /equipment/{userId}/{document=**} {
      allow read, write: if isSubscriber(userId);
    }

    // Tournaments
    match /tournaments/{tournamentId} {
      allow read, write: if isAuthenticated() && 
        isSubscriber(resource.data.userId != null ? resource.data.userId : request.resource.data.userId);

      match /matches/{tournamentMatchId} {
        allow read, write: if isAuthenticated();
      }
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
