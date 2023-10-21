import { adminDB } from '$lib/server/admin'
import { error, fail, redirect } from '@sveltejs/kit'
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

export const actions = {
  default: async (locals, request, params) => {
    const uid = locals.userID

    const data = await request.formData()
    const bio = data.get('bio')

    const userRef = adminDB.collection('users').doc(uid!)
    const { username } = (await userRef.get()).data()!

    if (username !== params.username) {
      throw error(401, 'This aint your profile bud')
    }

    if (bio!.length > 260) {
      return fail(400, { problem: 'Bio must be less than 260 characters' })
    }

    await userRef.update({
      bio
    })
  }
}
