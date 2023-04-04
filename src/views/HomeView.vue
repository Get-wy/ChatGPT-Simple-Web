<!--
 * @Descripttion: 
 * @Author: yu@w
 * @Date: 2023-04-04 10:40:40
-->
<!--
 * @Descripttion: 
 * @Author: yu@w
 * @Date: 2023-04-04 10:40:40
-->
<template>
  <main class="chatBox">
    <div class="chat-content" id="chat-content" ref="chatContent">
      <div v-for="(item, index) in chatList" :key="index">
        {{ item.name }}: {{ item.msg }}
      </div>
    </div>

    <div class="chatInputs" v-show="inputsStatus">
      <!--输入框-->
      <a-input
        type="textarea"
        id="textareaMsg"
        ref="textInput"
        class="textarea"
        v-model:value="inputMsg"
        :maxlength="2000"
        @keydown.enter.stop
        @pressEnter="sendText"
        placeholder="在此输入~"
      ></a-input>
      <!--发送-->
      <div>
        <div class="send boxinput" @click="sendText">
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { animation } from "@/utils/tools";
import {
  AI_HEAD_IMG_URL,
  USER_HEAD_IMG_URL,
  USER_NAME,
  AI_MODEL,
  AI_NAME,
  API,
} from "@/store";

export default {
  data() {
    return {
      inputsStatus: true,
      inputMsg: "",
      chatList: [],
    };
  },
  methods: {
    onChange(e) {
      this.value = e.target.value;
    },
    async sendText() {
      if (!sessionStorage.getItem("OPENAI_API_KEY")) {
        this.$notification.error({
          message: "OPENAI_API_KEY错误",
          description: "请输入您的OPENAI_API_KEY",
        });
        return;
      }

      let userMsg = {
        headImg: USER_HEAD_IMG_URL,
        name: USER_NAME,
        time: this.$dayjs().format("YYYY-MM-DD HH:mm:ss"),
        msg: this.inputMsg,
        chatType: 0, //发送 or 接收
        speaker: "user",
      };
      // 发送一条 用户消息
      this.sendMsg(userMsg);

      this.inputMsg = "";

      let params = AI_MODEL;
      params.model = sessionStorage.getItem("MODEL") || params.model;

      try {
        params.messages = this.chatList.map((item) => {
          return {
            role: item.speaker === "user" ? "user" : "assistant",
            content: item.msg,
          };
        });

        let chatMsg = {
          headImg: AI_HEAD_IMG_URL,
          name: AI_NAME,
          time: this.$dayjs().format("YYYY-MM-DD HH:mm:ss"),
          msg: "",
          chatType: 1, //发送 or 接收
          speaker: "assistant",
        };
        // 发送一条 ai消息
        this.sendMsg(chatMsg);

        let _this = this;
        const currentResLocation = this.chatList.length - 1;

        await fetch(API.baseUrl + "/v1/chat/completions", {
          method: "POST",
          timeout: 10000,
          body: JSON.stringify({
            ...params,
          }),
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("OPENAI_API_KEY"),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }).then((response) => {
          console.log("response", response);
          if (response.status !== 200) {
            this.chatList[currentResLocation].msg = "invalid_request_error";
            return;
          }

          const reader = response.body.getReader();
          function readStream(reader) {
            return reader.read().then(({ done, value }) => {
              if (done) {
                return;
              }
              let decoded = new TextDecoder().decode(value);
              decoded = _this.chatList[currentResLocation].reminder + decoded;
              let decodedArray = decoded.split("data: ");

              decodedArray.forEach((decoded) => {
                if (decoded !== "" && decoded !== "undefined") {
                  if (decoded.trim() === "[DONE]") {
                    return;
                  } else {
                    const response = JSON.parse(decoded).choices[0].delta
                      .content
                      ? JSON.parse(decoded).choices[0].delta.content
                      : "";
                    _this.chatList[currentResLocation].msg =
                      _this.chatList[currentResLocation].msg + response;
                    _this.scrollBottom();
                  }
                }
              });
              return readStream(reader);
            });
          }
          _this.chatList[currentResLocation].msg =
            _this.chatList[currentResLocation].msg;
          readStream(reader);
        });
      } catch (error) {
        console.error(error);
      }
    },
    //发送信息
    sendMsg(msgList) {
      this.chatList.push(msgList);
      this.scrollBottom();
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chatBox {
  position: relative;
  height: 100%;
}
.chat-content {
  width: calc(100% - 30px);
  height: calc(100% - 95px);
  margin: 15px;
  border-radius: 15px;
  border: 1px solid #b1b1b1;
  background-color: #fff;
  padding: 15px;
}
.chatInputs {
  width: calc(100% - 30px);
  position: absolute;
  bottom: 15px;
  margin: 15px;
  display: flex;
  .boxinput {
    margin-left: 15px;
    width: 50px;
    height: 50px;
    background-color: rgb(50, 54, 68);
    border-radius: 15px;
    border: 1px solid rgb(80, 85, 103);
    box-shadow: 0px 0px 5px 0px rgb(0, 136, 255);
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
