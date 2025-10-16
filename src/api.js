import axios from 'axios';

// Requisito: usar Mate API como base
// Se quiser permitir troca via .env, mantenha a linha abaixo.
// Caso contrário, troque diretamente para a string fixa.
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://mate-academy.github.io/fe-students-api';

const api = axios.create({ baseURL: BASE_URL, timeout: 12000 });

// Endpoints padrão do exercício (Mate API mantém /users, /posts, /comments)
export async function fetchUsers() {
  const { data } = await api.get('/users');
  return data;
}

export async function fetchUserPosts(userId) {
  const { data } = await api.get('/posts', { params: { userId } });
  return data;
}

export async function fetchPost(postId) {
  const { data } = await api.get(`/posts/${postId}`);
  return data;
}

export async function createPost({ userId, title, body }) {
  const { data } = await api.post('/posts', { userId, title, body });
  return data;
}

export async function updatePost(postId, payload) {
  const { data } = await api.patch(`/posts/${postId}`, payload);
  return data;
}

export async function deletePost(postId) {
  const { data } = await api.delete(`/posts/${postId}`);
  return data;
}

export async function fetchComments(postId) {
  const { data } = await api.get('/comments', { params: { postId } });
  return data;
}

export async function createComment({ postId, name, email, body }) {
  const { data } = await api.post('/comments', { postId, name, email, body });
  return data;
}

export async function deleteComment(commentId) {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
}
