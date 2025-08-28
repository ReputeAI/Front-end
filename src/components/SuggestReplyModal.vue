<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-4 rounded w-full max-w-lg">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-semibold">Suggest Reply</h2>
        <button @click="$emit('close')" class="text-gray-600">✕</button>
      </div>

      <div class="space-y-2 mb-4">
        <label class="block">
          Tone
          <select v-model="tone" class="border p-1 rounded w-full">
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="apologetic">Apologetic</option>
          </select>
        </label>

        <label class="block">
          Language (optional)
          <input v-model="language" class="border p-1 rounded w-full" />
        </label>

          <BaseButton @click="fetchSuggestions" :loading="loading">Suggest</BaseButton>
        <div v-if="error" class="text-red-600">{{ error }}</div>
      </div>

        <div v-for="s in suggestions" :key="s" class="border p-2 rounded mb-2">
          <p>{{ s }}</p>
          <div class="flex gap-2 mt-2">
            <BaseButton variant="secondary" class="px-2 py-1" @click="copy(s)">Copy</BaseButton>
            <BaseButton class="px-2 py-1" @click="useSuggestion(s)">Use this</BaseButton>
          </div>
        </div>

      <div class="mt-4 space-y-2">
          <textarea
            v-model="replyText"
            rows="4"
            class="border p-2 rounded w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            placeholder="Type your reply here"
          ></textarea>
          <div class="flex gap-2">
            <BaseButton
              variant="secondary"
              class="px-3 py-1"
              :loading="saving"
              @click="saveDraft"
            >
              Save as draft
            </BaseButton>
            <BaseButton
              class="px-3 py-1"
              :loading="sending"
              @click="sendReply"
            >
              Send to platform
            </BaseButton>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { api } from '../lib/api';
  import { useAuthStore } from '../stores/auth';
  import BaseButton from './BaseButton.vue';

const props = defineProps({
  review: { type: Object, required: true }
});

const emit = defineEmits(['close']);

const tone = ref('friendly');
const language = ref('');
const suggestions = ref([]);
const loading = ref(false);
const error = ref('');
const replyText = ref('');
const saving = ref(false);
const sending = ref(false);
const auth = useAuthStore();

async function fetchSuggestions() {
  loading.value = true;
  error.value = '';
  suggestions.value = [];
  try {
    const { data } = await api.post('/ai/suggest-reply', {
      review_id: props.review.id,
      tone: tone.value,
      language: language.value || undefined
    });
    suggestions.value = data.suggestions || [];
  } catch (e) {
    error.value = e?.message || String(e);
  } finally {
    loading.value = false;
  }
}

function copy(text) {
  navigator.clipboard.writeText(text);
}

function useSuggestion(text) {
  replyText.value = text;
}

async function saveDraft() {
  if (!auth.orgId) return;
  saving.value = true;
  try {
    await api.post(`/orgs/${auth.orgId}/reviews/${props.review.id}/reply`, {
      text: replyText.value,
      is_auto: false
    });
    alert('Draft opgeslagen');
    emit('close');
  } catch (e) {
    alert(e?.message || String(e));
  } finally {
    saving.value = false;
  }
}

async function sendReply() {
  if (!auth.orgId) return;
  sending.value = true;
  try {
    const { data } = await api.post(
      `/orgs/${auth.orgId}/reviews/${props.review.id}/send-reply`
    );
    if (data?.status) props.review.status = data.status;
    if (data?.platform_status) props.review.platform_status = data.platform_status;
    alert('Verzonden');
    emit('close');
  } catch (e) {
    alert(e?.message || String(e));
  } finally {
    sending.value = false;
  }
}
</script>

