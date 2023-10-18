/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY,
  FB_PROJECT_ID
} from '$env/static/private'

import admin from 'firebase-admin'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY
    })
  })
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin error', err.stack)
  }
}

export const adminDB = getFirestore()
export const adminAuth = getAuth()
