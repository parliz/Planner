<template>
  <div class="add-task">
    <div style="display: flex; gap: 1rem; justify-content: center">
      <label>{{ $t("calendar.task.addTask") }}</label>
      <label>{{ selectedDay }}</label>
    </div>
    <div class="add-task-content">
      <b-input v-model="taskText" size="is-small"></b-input>
    </div>
    <button type="is-success" inverted @click="addTask" class="add-button" style="">{{ $t("btn.add") }}</button>
  </div>
</template>

<script>
export default {
  props: {
    selectedDay: {
      type: String
    }
  },
  data() {
    return {
      taskText: ""
    };
  },
  methods: {
    addTask() {
      if (this.taskText) {
        this.$emit("createTask", this.taskText);
        this.taskText = "";
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Задача не может быть пустой",
          type: "is-warning"
        });
      }
    }
  },
  components: {}
};
</script>

<style lang="scss">
.time-picker {
  height: 2rem;
  width: 10rem;
  background-color: green;
}
.add-task {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;

  .add-task-content {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .add-button {
    border-radius: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #04aa6d;
    background-color: white;
    color: black;
    padding: 10px 25px;
    cursor: pointer;
  }

  .add-button:hover {
    background-color: #04aa6d;
    color: white;
  }
}
</style>
