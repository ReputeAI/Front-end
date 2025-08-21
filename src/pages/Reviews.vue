<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6">
      <h1 class="text-2xl font-bold mb-4">Reviews</h1>
      <table class="min-w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr class="text-left">
            <th class="p-2">Platform</th>
            <th class="p-2">Reviewer</th>
            <th class="p-2">Rating</th>
            <th class="p-2">Review</th>
            <th class="p-2">Sentiment</th>
            <th class="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reviews" :key="r.id" class="border-t">
            <td class="p-2">{{ r.platform }}</td>
            <td class="p-2">{{ r.reviewer }}</td>
            <td class="p-2">{{ '★'.repeat(r.rating) }}</td>
            <td class="p-2">{{ r.text }}</td>
            <td class="p-2"><span :class="badgeClass(r.sentiment)">{{ r.sentiment }}</span></td>
            <td class="p-2"><button class="text-primary" @click="openModal(r)">Respond</button></td>
          </tr>
        </tbody>
      </table>

      <Dialog v-if="selected" @close="selected=null">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel class="w-full max-w-md rounded bg-white p-6">
            <DialogTitle class="text-lg font-medium">AI Suggestion</DialogTitle>
            <p class="mt-2 text-gray-700">{{ aiResponse }}</p>
            <div class="mt-4 flex justify-end space-x-2">
              <button class="px-4 py-2 bg-gray-200 rounded" @click="regenerate">Regenerate</button>
              <button class="px-4 py-2 bg-primary text-white rounded" @click="selected=null">Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { useReviewsStore } from '../stores/reviews';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { ref } from 'vue';

const reviewStore = useReviewsStore();
const reviews = reviewStore.reviews;

function badgeClass(sentiment) {
  return {
    'Positive': 'text-green-600',
    'Neutral': 'text-yellow-600',
    'Negative': 'text-red-600'
  }[sentiment];
}

const selected = ref(null);
const aiResponse = ref('Thank you for your feedback!');

function openModal(review) {
  selected.value = review;
  aiResponse.value = generateResponse(review);
}

function generateResponse(review) {
  if (review.sentiment === 'Positive') {
    return 'Thanks for the great review!';
  } else if (review.sentiment === 'Negative') {
    return 'We are sorry to hear that. We will improve.';
  }
  return 'Thank you for your review.';
}

function regenerate() {
  aiResponse.value = generateResponse(selected.value);
}
</script>
