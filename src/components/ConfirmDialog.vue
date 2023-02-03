<script setup>
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="dialog-mask dialog-mask-enter d-flex justify-content-center align-items-center">
    <div class="dialog d-flex flex-column">

      <div class="dialog-header d-flex justify-content-between">
        <span>Confirmation</span>
        <button @click="emit('cancel')" type="button"><i class="fa fa-close" aria-hidden="true"/></button>
      </div>

      <div class="dialog-content d-flex">
        <i class="fa fa-warning" aria-hidden="true"/>
        <div class="ml-3">Are you sure you want to proceed?</div>
      </div>

      <div class="dialog-footer d-flex justify-content-end">
        <button @click="emit('cancel')" type="button" class="btn mr-2">No</button>
        <button @click="emit('confirm')" type="button" class="btn">Yes</button>
      </div>
    </div>
  </div>
</template>