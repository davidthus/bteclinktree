import { db } from '$lib/firebase'
import { error } from '@sveltejs/kit'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import type { PageLoad } from './$types'

export const load = (async ({ params }) => {
  const collectionRef = collection(db, 'users')
  const q = query(
    collectionRef,
    where('username', '==', params.username),
    limit(1)
  )
  const snapshot = await getDocs(q)
  const exists = snapshot.docs[0]?.exists()

  if (!exists) {
    throw error(404, 'this user does not exist!')
  }

  const data = snapshot.docs[0]?.data()
  const { username, bio, links, photoURL, published } = data

  if (!published) {
    throw error(403, `@${username}'s profile is not public!`)
  }

  return {
    username,
    bio,
    photoURL,
    links: links ?? []
  }
}) satisfies PageLoad
