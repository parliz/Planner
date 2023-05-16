<template>
  <div class="my-list-items">
    <h3>{{ $t("list.label.myLists") }}</h3>
    <div class="list-link" v-for="(item, idx) in items" :key="idx">
      <h2>{{ item.listItemTitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectList(listId) {
    this.$emit("showListItem", listId);
    }
  }
};
</script>

<style>
.my-list-items {
  padding: 1.5rem;
}
.list-link:hover {
  cursor: pointer;
}
</style>
