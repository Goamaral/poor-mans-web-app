import { https } from 'firebase-functions'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'

import config from './config'
import newRouterLayer from './routers/layer'
import newRepositoryLayer from './repositories/layer'
import FirebaseProvider from './providers/firebase'
import AuthService from './services/auth'

const app = express()

app.use(express.json())
app.use(cookieParser(config.cookie.secret))

/* Providers */
const firebaseProvider = new FirebaseProvider(config.firebase)

/* Services */
const authService = new AuthService(firebaseProvider)

/* Repositories */
const repositoryLayer = newRepositoryLayer(firebaseProvider)

/* Routers */
const routerLayer = newRouterLayer(authService, repositoryLayer)
app.use(`/auth`, routerLayer.auth)
app.use(`/resources`, routerLayer.resources)

export const api = https.onRequest(app)
