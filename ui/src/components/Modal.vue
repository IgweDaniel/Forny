<template>
  <!-- <div class="modal" v-show="show" ref="modal"> -->
  <div class="modal" ref="modal">
    <div class="modal__backdrop" @click="close" ref="backdrop"></div>
    <div class="modal__content" ref="content">
      <button @click="close" class="close-button">
        <i class="fas fa-times"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { TimelineLite } from "gsap";
export default {
  props: {
    show: Boolean,
    close: Function
  },
  data() {
    return {
      tl: new TimelineLite()
    };
  },
  watch: {
    show(val) {
      if (val === true) {
        this.tl
          .to(this.$refs.modal, { display: "flex", duration: 0 })
          .to(this.$refs.backdrop, {
            opacity: 0.6,
            duration: 0.1
          })
          .fromTo(
            this.$refs.content,
            {
              y: 100,
              opacity: 0
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.2
            }
          );
      } else {
        this.tl.reverse().then(() => (this.tl = new TimelineLite()));
      }
    }
  },
  methods: {},

  mounted() {
    // this.tl = new TimelineLite();
  }
};
</script>

<style scoped>
.modal {
  top: 0;
  width: 100%;
  position: fixed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  z-index: 5000;
}

.modal__backdrop {
  position: absolute;
  height: 100%;
  background: #000;
  /* background: var(--primary-light-color); */

  width: 100%;
  opacity: 0;
  transition: opacity 0.2s ease-in;
}
.modal__content {
  position: relative;
  z-index: 1;
  background: #fff;
  opacity: 0;
}
.close-button {
  /* position: absolute;
  top: -50px;
  right: -20px;
    color: #fff; */
  font-size: 1.1rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 5px;
  /* display: none; */
  /* background: #fff; */
  height: 25px;
  width: 30px;
}
</style>
