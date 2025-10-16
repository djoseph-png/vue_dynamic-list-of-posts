<template>
  <form @submit.prevent="handleSubmit" class="box">
    <h3 class="title is-5">Add a comment</h3>

    <!-- Nome -->
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model.trim="name"
          placeholder="Your name"
          :class="{ 'is-danger': submitted && !name }"
        />
      </div>
      <p v-if="submitted && !name" class="help is-danger">Name is required</p>
    </div>

    <!-- Email -->
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="email"
          v-model.trim="email"
          placeholder="Your email"
          :class="{ 'is-danger': submitted && !email }"
        />
      </div>
      <p v-if="submitted && !email" class="help is-danger">Email is required</p>
    </div>

    <!-- Comentário -->
    <div class="field">
      <label class="label">Comment</label>
      <div class="control">
        <!-- ⚠️ Corrigido: <textarea> precisa de fechamento -->
        <textarea
          class="textarea"
          v-model.trim="body"
          placeholder="Write your comment..."
          :class="{ 'is-danger': submitted && !body }"
        ></textarea>
      </div>
      <p v-if="submitted && !body" class="help is-danger">Comment text is required</p>
    </div>

    <!-- Botões -->
    <div class="field is-grouped mt-4">
      <div class="control">
        <button
          class="button is-link"
          type="submit"
          :class="{ 'is-loading': loading }"
        >
          Submit
        </button>
      </div>
      <div class="control">
        <button
          class="button is-light"
          type="button"
          @click="clearForm"
        >
          Clear
        </button>
      </div>
    </div>

    <p v-if="error" class="notification is-danger mt-4">
      Failed to add comment. Please try again.
    </p>
  </form>
</template>

<script>
import { ref } from 'vue';
import { createComment } from '../api';

export default {
  name: 'CommentForm',
  props: {
    postId: { type: Number, required: true },
  },
  emits: ['comment-added'],
  setup(props, { emit }) {
    const name = ref('');
    const email = ref('');
    const body = ref('');
    const submitted = ref(false);
    const loading = ref(false);
    const error = ref(false);

    const clearForm = () => {
      name.value = '';
      email.value = '';
      body.value = '';
      error.value = false;
      submitted.value = false;
    };

    const handleSubmit = async () => {
      submitted.value = true;
      error.value = false;

      if (!name.value || !email.value || !body.value) {
        return;
      }

      try {
        loading.value = true;
        const newComment = await createComment({
          postId: props.postId,
          name: name.value,
          email: email.value,
          body: body.value,
        });
        emit('comment-added', newComment);

        // Após sucesso: mantém nome e email, limpa apenas o texto
        body.value = '';
        submitted.value = false;
      } catch {
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    return {
      name,
      email,
      body,
      submitted,
      loading,
      error,
      clearForm,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.box {
  max-width: 600px;
  margin: 0 auto;
}
</style>
