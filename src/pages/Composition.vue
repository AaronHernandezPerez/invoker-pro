<template>
  <q-page>
    <h1>Composition page</h1>
    {{ $route.params.lang }}
    <q-table title="Treats" :data="data" :columns="columns" row-key="name" />
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';

import ExampleComponent from 'components/composition/CompositionComponent.vue';
import { Todo, Meta } from 'components/composition/models';

export default Vue.extend({
  name: 'Composition',
  components: { ExampleComponent },
  data() {
    const todos: Todo[] = [
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ];
    const meta: Meta = {
      totalCount: 1200
    };

    return { todos, meta, data: [], columns: [] };
  }
});
</script>
