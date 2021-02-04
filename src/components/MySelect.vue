<template>
  <div class="my-field">

    <van-field v-model="resultLabel"   readonly   @click="show = !show" class="font"/>
    <van-popup v-model="show" position="bottom">
      <van-picker v-bind="$attrs" :columns="columns" :default-index="selectValue" show-toolbar @cancel="cancel"
        @confirm="onConfirm" @change="change" :value-key="option.label" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'VanFieldSelectPicker',
    model: {
      prop: 'selectValue'
    },
    props: {
      errMsg: {
        type: String
      },
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      selectValue: {
        type: [String, Number],
        default: ''
      },
      option: {
        type: Object,
        default: function () {
          return { label: 'label', value: 'value' }
        }
      }
    },
    computed: {
      resultLabel: {//双向绑定的数据做修改需要用get/set
        get() {
          const res = this.columns.filter(item => {
            return item[this.option.value] == this.resultValue
          })

          return res.length ? res[0][this.option.label] : ''
        },
        set() {

        }
      }
    },
    data() {
      return {
        show: false,//Popup是否弹出
        resultValue: this.selectValue //初始选中数据
      }
    },
    methods: {
      onConfirm(value, index) {//确定
        console.log(value, index)
        // if (Array.isArray(value)) {

        //   console.log((this.columns[index[0]][this.option.children][1])[this.option.value],999)
        //   this.resultValue = this.columns[index[0]][this.option.children][0][this.option.value]
        // } else {
        this.resultValue = value[this.option.value]
        // }
        this.show = !this.show
        this.$emit('confirm', value, index, this.resultValue)
      },
      change(val, index) {//当数据改变
        this.$emit('change', val, index, this.resultValue)
      },
      cancel(val, index) {//取消
        this.show = !this.show
        this.$emit('cancel', val, index, this.resultValue)
      }
    },
    watch: {
      selectValue: function (newVal) {//监听变化初始赋值
        this.resultValue = newVal
      },
      resultValue(val) {//当所选数据变化，组件model的双向绑定
        this.$emit('input', val)
      }
    }
  }
</script>
<style scoped>
  .my-field {
  display: block;
    height: 30px;
    line-height: 30px;
    /* padding-left: 10px; */

    font-size: 14px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-sizing: border-box;

  }
  .font{

    padding-left: 16px;
    line-height: 30px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
</style>