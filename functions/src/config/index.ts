import * as nconf from 'nconf'
import * as dotenv from 'dotenv'

import { FirebaseProviderConfigInterface } from '../providers/firebase'

interface ConfigMapInterface {
  isProduction: boolean,
  firebase: FirebaseProviderConfigInterface
  cookie: {
    secret: string
  }
}

dotenv.config({ path: '../secrets/.env' })

nconf.env('__')

nconf.defaults({
  firebase: {
    project_id: '',
    auth_domain: '',
    api_key: '<FIREBASE_API_KEY>',
    database_url: 'http://localhost:9000/?ns=poor-mans-web-app',
    storage_bucket: ''
  },
  cookie: {
    secret: '<COOKIE_SECRET>'
  }
})

const config: ConfigMapInterface = {
  isProduction: process.env.NODE_ENV === 'production',
  ...nconf.get()
}

export default config
