<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte'
  import { db, storage, user, userData } from '$lib/firebase'
  import { doc, updateDoc } from 'firebase/firestore'
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

  let previewURL: string
  let uploading: boolean

  async function upload(e: any) {
    uploading = true
    const file = e.target.files[0]
    previewURL = URL.createObjectURL(file)
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`)
    const result = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(result.ref)

    await updateDoc(doc(db, 'users', $user!.uid), { photoURL: url })
    uploading = false
  }
</script>

<AuthCheck>
  <h2 class="card-title">Upload a Profile Photo</h2>

  <form class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
      <img
        src={previewURL ?? $userData?.photoURL ?? '/profile.png'}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto"
      />
      <label for="photoURL" class="label">
        <span class="label-text">Pick a file</span>
      </label>
      <input
        type="file"
        name="photoURL"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="image/png, image/gif, image/webp, image/jpeg"
        on:change={upload}
      />
      {#if uploading}
        <p>Uploading...</p>
        <progress class="progress progress-info w-56 mt-6" />
      {/if}
    </div>
  </form>
  <a href={`/${$userData && $userData.username}`}
    ><button>Go to home page</button></a
  >
</AuthCheck>
