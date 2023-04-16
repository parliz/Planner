<template>
  <div class="user-icon" @click="iconClick">
    <font-awesome-icon icon="fa-solid fa-user" />
  </div>
</template>

<script>
export default {
  name: "ShortUserInfo",
  methods: {
    iconClick() {
      this.$emit("iconClick");
    }
  }
};
</script>

<style lang="scss">
.user-icon {
  background-color: #c1c1c1;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-icon svg {
  color: #ffffff;
}

@media screen and (max-width: 600px) {
  .user-icon {
    width: 3em;
    height: 3em;
  }

  .user-icon svg {
    color: #ffffff;
    height: 2em;
  }
}
</style>
