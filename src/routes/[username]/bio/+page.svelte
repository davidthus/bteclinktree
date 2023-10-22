<script lang="ts">
  import { enhance } from '$app/forms'
  import { page } from '$app/stores'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<main class="max-w-lg prose text-center mx-auto my-6">
  <p>Current Bio: <span class="text-info">{data.bio}</span></p>
  <p>Status Code: {$page.status}</p>
  <p class="text-error">{$page.form.problem ?? ''}</p>
  <form action="" method="post" use:enhance>
    <div class="form-control">
      <label for="bio" class="label">
        <span class="label-text">Your bio</span>
      </label>
      <textarea
        name="bio"
        value={data.bio}
        class="textarea textarea-bordered textarea-accent"
      />
    </div>
    <button class="btn btn-primary my-5">Update bio</button>
  </form>
</main>
