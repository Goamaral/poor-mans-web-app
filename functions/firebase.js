const { initializeApp: initializeClientApp } = require('firebase/app')
const { initializeAuth: initializeClientAuth, connectAuthEmulator, ...clientFunctions } = require('firebase/auth')
const { initializeApp: initializeAdminApp } = require('firebase-admin/app')
const { getAuth: getAdminAuth } = require('firebase-admin/auth')
const { getFirestore } = require('firebase-admin/firestore')
const { getDatabase } = require('firebase-admin/database')
const _ = require('lodash')

const config = require('./config')

const firebaseConfig = {
  projectId: config.firebase.project_id,
  apiKey: config.firebase.api_key,
  authDomain: config.firebase.auth_domain,
  databaseURL: config.firebase.database_url,
  storageBucket: config.firebase.storage_bucket
}

/* Admin */
const adminApp = initializeAdminApp(firebaseConfig)
const adminAuth = getAdminAuth(adminApp)

/* Client */
const clientApp = initializeClientApp(firebaseConfig)
const clientAuth = initializeClientAuth(clientApp)
if (!config.isProduction) {
  connectAuthEmulator(clientAuth, 'http://localhost:9099')
}

module.exports = {
  firestore: getFirestore(adminApp),
  realtimeDatabase: getDatabase(adminApp),
  auth: new Proxy(adminAuth, {
    get (target, propertyKey) {
      const originalProperty = Reflect.get(target, propertyKey)

      if (originalProperty === undefined) {
        const clientProproperty = Reflect.get(clientFunctions, propertyKey)
        return (...args) => clientProproperty(clientAuth, ...args)
      } else {
        if (_.isFunction(originalProperty)) return originalProperty.bind(target)

        return originalProperty
      }
    }
  })
}
