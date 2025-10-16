<template>
  <form @submit.prevent="onSubmit" class="box" novalidate>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" v-model.trim="name" :class="{ 'is-danger': submitted && !name }" placeholder="Your name" />
          </div>
          <p v-if="submitted && !name" class="help is-danger">Name is required</p>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" v-model.trim="email" :class="{ 'is-danger': submitted && !validEmail }" placeholder="you@example.com" />
          </div>
          <p v-if="submitted && !validEmail" class="help is-danger">Valid email is required</p>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Comment</label>
      <div class="control">
        <textarea
          class="textarea"
          v-model.trim="body"
          :class="{ 'is-danger': submitted && !body }"
          placeholder="Write your comment..."
      </div>
      <p v-if="submitted && !body" class="help is-danger">Comment is required</p>
    </div>

    <div class="buttons">
      <button class="button is-success" :class="{ 'is-loading': isSubmitting }" type="submit">Submit</button>
      <button class="button" type="button" @click="onClear">Clear</button>
    </div>

    <Notification v-if="error" :message="error" @close="error = ''" />
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import Notification from './Notification.vue';

const props = defineProps({ postId: { type: Number, required: true } });
const emit = defineEmits(['submitted']);

const name = ref(localStorage.getItem('comment_name') || '');
const email = ref(localStorage.getItem('comment_email') || '');
const body = ref('');
const submitted = ref(false);
const isSubmitting = ref(false);
const error = ref('');

const validEmail = computed(() => /.+@.+\..+/.test(email.value));

function onClear() {
  name.value = '';
  email.value = '';
  body.value = '';
  error.value = '';
  submitted.value = false;
}

async function onSubmit() {
  submitted.value = true;
  if (!name.value || !validEmail.value || !body.value) return;
  try {
    isSubmitting.value = true;
    await emit('submitted', { name: name.value, email: email.value, body: body.value });
    localStorage.setItem('comment_name', name.value);
    localStorage.setItem('comment_email', email.value);
    body.value = '';
    error.value = '';
  } catch (e) {
    error.value = 'Failed to add a comment. Please retry.';
    throw e;
  } finally {
    isSubmitting.value = false;
  }
}
</script>
