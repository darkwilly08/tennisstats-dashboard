const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');

const keyPath = path.resolve('../Tennis%20stats%20dashboard/expressBackend/firebase-serviceAccount.json');
const serviceAccount = require(keyPath);

initializeApp({ credential: cert(serviceAccount) });

const targetUid = process.argv[2] || 'QJn56KWUJQVV7l5XvKwUL4hH00N2';

getAuth().createCustomToken(targetUid).then(token => {
  console.log(token);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
