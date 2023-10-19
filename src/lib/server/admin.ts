/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY,
  FB_PROJECT_ID
} from '$env/static/private'

import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const privateKey = JSON.parse(FB_PRIVATE_KEY)

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey
    })
  })
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin error', err.stack)
  }
}

export const adminDB = getFirestore()
export const adminAuth = getAuth()
