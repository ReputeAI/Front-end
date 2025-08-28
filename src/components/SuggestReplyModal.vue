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

        <button
          @click="fetchSuggestions"
          class="bg-primary text-white px-3 py-1 rounded"
          :disabled="loading"
        >
          {{ loading ? 'Loading...' : 'Suggest' }}
        </button>
        <div v-if="error" class="text-red-600">{{ error }}</div>
      </div>

      <div v-for="s in suggestions" :key="s" class="border p-2 rounded mb-2">
        <p>{{ s }}</p>
        <div class="flex gap-2 mt-2">
          <button @click="copy(s)" class="px-2 py-1 border rounded">Copy</button>
          <button
            @click="useSuggestion(s)"
            class="px-2 py-1 bg-primary text-white rounded"
          >
            Use this
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../lib/api';

const props = defineProps({
  review: { type: Object, required: true }
});

const emit = defineEmits(['close', 'select']);

const tone = ref('friendly');
const language = ref('');
const suggestions = ref([]);
const loading = ref(false);
const error = ref('');

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
  emit('select', text);
  emit('close');
}
</script>

