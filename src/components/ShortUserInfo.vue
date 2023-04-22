
<template>
  <div class="user-info">
    <span class="bold">{{ user?.userLogin }}</span>
    <!-- <span>{{ user?.userOffice }}</span>
    <span>{{ user?.userAddress }}</span> -->
  </div>
</template>

<script>
export default {
  name: "ShortUserInfo",
  props: {
    user: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
$primaryColor: #2c3e50;

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.725rem;
  margin: 0 0.75rem;
}

</style>
