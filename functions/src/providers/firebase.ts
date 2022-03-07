import * as _ from 'lodash'

/* Admin */
import { initializeApp as initializeAdminApp, App as AdminApp } from 'firebase-admin/app'
import { getAuth as getAdminAuth, Auth as AdminAuth } from 'firebase-admin/auth'

/* Client */
import { initializeApp as initializeClientApp, FirebaseApp as ClientApp } from 'firebase/app'
import { initializeAuth as initializeClientAuth, connectAuthEmulator, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'

/* Firebase */
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getDatabase as getRealtimeDatabase, Database as RealtimeDatabase } from 'firebase-admin/database'

export interface FirebaseProviderConfigInterface {
  projectId: string,
  apiKey: string,
  authDomain: string,
  databaseURL: string,
  storageBucket: string
}

export interface ClientAuth {
  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential>
}

export default class FirebaseProvider {
  #adminApp: AdminApp
  #clientApp: ClientApp
  #useEmulators: boolean

  #firestore: Firestore | null = null
  #realtimeDatabase: RealtimeDatabase | null = null
  #adminAuth: AdminAuth | null = null
  #clientAuth: ClientAuth | null = null

  constructor(firebaseConfig: FirebaseProviderConfigInterface, useEmulators?: boolean) {
    this.#adminApp = initializeAdminApp(firebaseConfig)
    this.#clientApp = initializeClientApp(firebaseConfig)
    this.#useEmulators = useEmulators || false
  }

  getFirestore(): Firestore {
    if (!this.#firestore) this.#firestore = getFirestore(this.#adminApp)
    return this.#firestore
  }

  getRealtimeDatabase(): RealtimeDatabase {
    if (!this.#realtimeDatabase) this.#realtimeDatabase = getRealtimeDatabase(this.#adminApp)
    return this.#realtimeDatabase
  }

  getAdminAuth(): AdminAuth {
    if (!this.#adminAuth) {
      this.#adminAuth = this.#adminAuth = getAdminAuth(this.#adminApp)
    }

    return this.#adminAuth
  }

  getClientAuth(): ClientAuth {
    if (!this.#clientAuth) {
      const clientAuth =  initializeClientAuth(this.#clientApp)
      if (this.#useEmulators) {
        connectAuthEmulator(clientAuth, 'http://localhost:9099')
      }

      this.#clientAuth = {
        async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
          return await signInWithEmailAndPassword(clientAuth, email, password)
        }
      }
    }

    return this.#clientAuth
  }
}