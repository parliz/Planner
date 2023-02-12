export default {
    methods: {
      logout: function () {
        this.$store.dispatch('secure/logout').then(() => {
          if (this.$route.path != '/login')
            this.$router.push('/login')
        })
      }
    }
  }
  