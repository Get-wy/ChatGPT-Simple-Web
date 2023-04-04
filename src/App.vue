<!--
 * @Descripttion: 
 * @Author: yu@w
 * @Date: 2023-04-04 10:40:40
-->
<script setup></script>

<template>
  <a-layout>
    <a-layout-header> ChatGPT-提供方便使用的Web管理界面 </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <p>key</p>
        <a-input v-model:value="valueKey" placeholder="请输入openAI官方Key" @change="changeKey"/>
        <p>模型选择</p>
        <a-radio-group :value="value" @change="onChange">
          <a-radio :value="'gpt-3.5-turbo'"> ChatGPT-3.5 </a-radio>
          <a-radio :value="'gpt-4'"> ChatGPT-4.0 </a-radio>
        </a-radio-group>
      </a-layout-sider>
      <a-layout-content><RouterView /></a-layout-content>
    </a-layout>
    <a-layout-footer>
      仅供学习参考使用
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      value: 'gpt-3.5-turbo',
      valueKey: ''
    };
  },
  methods: {
    changeKey(e) {
      sessionStorage.setItem('OPENAI_API_KEY', e.target.value);
    },
    onChange(e) {
      this.value = e.target.value;
      sessionStorage.setItem('MODEL', this.value);
    },
  },
  mounted() {
    sessionStorage.setItem('MODEL', 'gpt-3.5-turbo');
  },
};
</script>

<style scoped>
.ant-layout-header {
  color: #f0f0f0;
}
.ant-layout-sider {
  background-color: #ffffff;
  padding: 15px;
}
.ant-layout-content{
  position: relative;
}
.ant-layout {
  height: 100vh;
}
.ant-layout-footer{
  padding: 10px;
  background: #e7e7e7;
}
.ant-input{
  margin-bottom: 14px;
}
</style>
