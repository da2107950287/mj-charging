 let myMixin = {
  mounted() {
    console.log(789)
    this.pushHistory()
    window.addEventListener("popstate", this.onReturnBack, false);
  },
  methods: {
    pushHistory() {
      var state = {
        title: "title",
        url: ""
      };
      window.history.pushState(state, "title", "");
    },
    onReturnBack() {
      this.$router.push('/home')
    },

  },
  destroyed() {
    // 页面销毁时必须要移除这个事件，vue 不刷新页面，不移除会重复执行
    window.removeEventListener("popstate", this.onReturnBack, false);
  },
}
export default myMixin;