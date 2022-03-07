import { Auth as AdminAuth, CreateRequest, UserRecord, DecodedIdToken } from 'firebase-admin/auth'
import { UserCredential } from 'firebase/auth'

import FirebaseProvider, { ClientAuth } from "../providers/firebase"

export default class AuthService {
  #adminAuth: AdminAuth
  #clientAuth: ClientAuth

  constructor(firebaseProvider: FirebaseProvider) {
    this.#adminAuth = firebaseProvider.getAdminAuth()
    this.#clientAuth = firebaseProvider.getClientAuth()
  }

  async authenticate(acessToken: string): Promise<DecodedIdToken> {
    return await this.#adminAuth.verifyIdToken(acessToken, true)
  }

  async register(user: CreateRequest): Promise<UserRecord> {
    return await this.#adminAuth.createUser(user)
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await this.#clientAuth.signInWithEmailAndPassword(email, password)
  }

  async logout(uid: string): Promise<void> {
    return await this.#adminAuth.revokeRefreshTokens(uid)
  }
}