<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" @click="svgClick">
      <title>{{iconTitle}}</title>
    </use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    iconTitle: {
      type: String
    }
  },
  methods: {
    svgClick () {
      this.$emit('click')
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.svg-icon
    width: 16px;
    height: 16px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
</style>
