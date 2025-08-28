<template>
  <select
    :value="auth.orgId"
    @change="onChange"
    class="border border-gray-300 rounded p-1 dark:bg-gray-800 dark:border-gray-700"
  >
    <option
      v-for="m in memberships"
      :key="m.org_id"
      :value="m.org_id"
    >
      Org #{{ m.org_id }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useAuthStore } from '../stores/auth';

type Membership = { org_id: number; role: string };

defineProps<{ memberships: Membership[] }>();
const auth = useAuthStore();

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  auth.setOrg(Number(target.value));
}
</script>
