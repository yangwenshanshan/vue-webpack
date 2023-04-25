<template>
  <div class="yb-input-range">
    <el-input
      v-model="value1"
      style="width:100%"
      clearable
      :placeholder="startPlaceholder"
    ></el-input>
    <p class="range-text">{{ rangeSeparator }}</p>
    <el-input
      v-model="value2"
      style="width:100%"
      clearable
      :placeholder="endPlaceholder"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    startPlaceholder: {
      type: String,
      default: ''
    },
    rangeSeparator: {
      type: String,
      default: '-'
    },
    endPlaceholder: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      value1: '',
      value2: ''
    }
  },
  created () {
    this.value1 = this.value[0]
    this.value2 = this.value[1]
  },
  watch: {
    value1 (val) {
      this.$emit('input', [val, this.value2])
    },
    value2 (val) {
      this.$emit('input', [this.value1, val])
    }
  }
}
</script>

<style lang="scss">
.yb-input-range{
  display: flex;
  .range-text{
    margin: 0 5px;
  }
}
</style>