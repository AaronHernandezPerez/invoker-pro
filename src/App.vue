<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { get, fill } from "lodash-es"

export default {
  name: 'App',
  mounted() {
    const xd:Array<string>  = []
    fill( xd ,'xdfd',10)
    console.log(xd)
  }
}
</script>
