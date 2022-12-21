<template>
  <div>
    <div class="message-alert">
      <div class="alert alert-dismissible" :class="'alert-' + item.status" v-for="(item, i) in messages" :key="i">
        <span v-if="item.status === 'success'" class="mr-2"><i class="far fa-check-circle"></i></span>
        <span v-if="item.status === 'danger'" class="mr-2"><i class="fas fa-ban"></i></span>
        <span>{{ item.message }}</span>
        <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const vm=this;
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
.alert-success{
  background-color:white;
  border-radius:20px;
  color:rgba(111,230,140);
}
.alert-danger{
  background-color:white;
  border-radius:20px;
  color:rgba(236,14,55);
}
</style>