<template>
  <div>
    <b-taginput v-model="newSelectedItems" :data="filteredTags" icon="fa-tag" autocomplete :allow-new="allowNew" :open-on-focus="true"
      field="userLogin" :placeholder="$t('project.label.create.projectParticipants')" @typing="getFilteredTags">
    </b-taginput>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "10rem"
    }
  },
  watch: {
    selectedItems(newValue) {
      this.newSelectedItems = newValue;
    },
    newSelectedItems() {
      this.$emit("changeUserList", this.newSelectedItems);
    }
  },
  data() {
    return {
      filteredTags: null,      tags: null,
      newSelectedItems: this.selectedItems
    };
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.items.filter((option) => {
        return option.userLogin.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
      });
    }
  }
};
</script>

<style lang="scss">
.customMultiSelect {
  border: 1px solid #2c3e50;
  border-radius: 4px;

  .taginput-container.is-small.is-focusable {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    //  border-right: 0;
    border: none;
    width: inherit;
  }

  .taginput .taginput-container.is-focusable {
    flex-wrap: unset;
    overflow: hidden;
  }

  .dropdown .button.is-small {
    border-left: none;
    border-top-left-radius: 0;
    border: none;
    border-bottom-left-radius: 0;
  }

  a.dropdown-item.is-active {
    background: #2c3e50;
  }

  .customButton.button .icon,
  .customButton.button .icon.is-small {
    height: 1.2rem;
    width: 1.2rem;
  }

  .autocomplete>.control>.icon svg {
    height: 2em;
    width: 2em;
    margin-left: 1rem;
  }
}

.input>.icon svg {
  width: 2rem;
  height: 2rem;
}
</style>
