import { adminDB } from '$lib/server/admin'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ locals, params }) => {
  const uid = locals.userID

  if (!uid) {
    throw redirect(301, '/login')
  }

  const userDoc = await adminDB.collection('users').doc(uid).get()
  const { username, bio } = userDoc.data()

  if (username !== params.username) {
    throw error(401, 'This aint your profile bud')
  }

  return {
    bio
  }
}) satisfies PageServerLoad
