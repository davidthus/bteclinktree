import { error, json } from '@sveltejs/kit'

import { adminAuth } from '$lib/server/admin'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ cookies, request }) => {
  const idToken = await request.json()
  const expiresIn = 1000 * 60 * 60 * 24 * 5
  const decodedIdToken = await adminAuth.verifyIdToken(idToken)

  if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: '/'
    }
    cookies.set('__session', cookie, options)
    return json({ status: 'signedIn' })
  } else {
    throw error(401, 'Recent sign in is required!')
  }
}
export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete('__session', { path: '/' })
  return json({ status: 'signedOut' })
}
