<template>
    <div class="my-projects">
      <h3>{{ $t("project.label.myLists") }}</h3>
      <div class="list-link" v-for="(list, idx) in lists" :key="idx">
        <h2 @click="selectList(list.listId)">{{ list.listName }}</h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      lists: {
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
  .list-link:hover {
    cursor: pointer;
  }
  </style>
  