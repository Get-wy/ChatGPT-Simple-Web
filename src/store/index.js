/*
 * @Descripttion: 
 * @Author: yu@w
 * @Date: 2023-04-04 14:06:13
 */
//AI头像地址设置
export const AI_HEAD_IMG_URL = "https://th.bing.com/th?id=ODL.3e2fbff4543f0d3632d34be6d02adc93&w=100&h=100&c=12&pcl=faf9f7&o=6&dpr=1.5&pid=13.1"
//用户头像地址设置
export const USER_HEAD_IMG_URL = "https://avatars.githubusercontent.com/u/40659515?v=4"
//用户名称设置
export const USER_NAME = "用户"
export const AI_NAME = "chatGPT"


export const AI_MODEL = {
  model: "gpt-3.5-turbo",
  // 指定要生成的最大单词数，不能超过2048。
  max_tokens: 1200,
  // 指定生成文本的随机性，范围是0到2，越高表示越多样化和创造性，越低表示越保守和确定性。
  temperature: 1,
  // 指定在每个步骤中保留概率最高的单词的比例，范围是0到1，与temperature类似，但更加灵活和稳健
  top_p: 0.8,
  // 指定降低重复单词出现概率的程度，范围是-2到2，越高表示越避免重复。
  presence_penalty: 0,
  // 指定降低重复话题出现概率的程度，范围是-2到2，越高表示越避免重复。
  frequency_penalty: 0,
  stream: true
}

export const API = {
  baseUrl: 'https://api.openai.com'
}