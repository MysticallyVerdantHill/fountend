<template>
  <!-- 编辑教案和新建教案-->
  <div class="myCol" style="height: 100%; width: 100%">
    <el-header class="myRow" style="
        height: auto;
        margin: 0;
        padding: 0;
        width: 100%;
        margin-bottom: 20px;
      ">
      <div class="myTitle" style="margin: 0">编辑教案</div>
      <div class="fill"></div>
      <div class="mySubTitle" style="margin: 0">{{ name }}</div>
    </el-header>
    <el-main style="
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
      ">
      <div class="myRow" style="height: 100%; width: 100%">
        <div class="right">
          <div class="mySubTitle">AI编辑</div>
          <div class="myRow list" style="margin-left: 20px">
            <div class="myText">学期</div>
            <div class="w10"></div>
            <el-select style="width: 200px" placeholder="选择学期" :disabled="isItemLocked" v-model="selectTerm"
              @change="selectingTerm">
              <el-option v-for="(t, index) in term" :key="index" :label="t" :value="t">
              </el-option>
            </el-select>
          </div>
          <div class="myRow list" style="margin-left: 20px">
            <div class="myText">课程</div>
            <div class="w10"></div>
            <el-select style="width: 200px" placeholder="选择课程" v-model="selectCourse" @change="selectingCourse"
              :disabled="isItemLocked">
              <el-option v-for="(t, index) in course" :key="index" :label="t.name" :value="t.name"></el-option>
            </el-select>
          </div>
          <div class="myRow list" style="margin-left: 20px">
            <div class="myText">章节</div>
            <div class="w10"></div>
            <el-tree-select style="width: 200px" placeholder="选择章节" :data="para" v-model="selectParaIndex"
              :disabled="isItemLocked" :render-after-expand="false" @change="selectingPara">
            </el-tree-select>
          </div>
          <div class="myRow list" style="margin-left: 20px">
            <div class="myText">目录结构</div>
            <div class="w10"></div>
            <el-input v-model="newContent" placeholder="输入新标题" style="width: 150px; padding: 5px" />
            <div class="w10"></div>
            <el-button @click="addContent" style="padding: 5px 10px">添加</el-button>
          </div>
          <div class="myRow list" style="
              margin-left: 30px;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
            ">
            <el-tag v-for="(item, index) in content" :key="index" style="margin: 5px" closable
              @close="removeContent(index)" size="large">
              {{ item }}
            </el-tag>
          </div>
          <div class="myRow">
            <div class="myText" style="margin-left: 20px">提示词</div>
            <div class="fill"></div>
            <Icon class="onHover" icon="mdi:attachment" width="24" height="24" style="border-radius: 50px" />
          </div>
          <div class="h10"></div>
          <div style="
              padding-left: 20px;
              height: 150px;
              width: 100%;
              box-sizing: border-box;
            ">
            <div style="
                height: 100%;
                width: 100%;
                border-width: 1px;
                border-radius: 5px;
                border-color: #cccccc;
                border-style: solid;
                box-sizing: border-box;
                padding: 5px;
              ">
              <textarea placeholder="请输入提示词" style="
                  height: 100%;
                  width: 100%;
                  border-width: 0;
                  outline: 0;
                  resize: none;
                  border-radius: 10px;
                  font-size: 15px;
                " v-model="callWord"></textarea>
            </div>
          </div>
          <div class="h10"></div>
          <div class="myRow">
            <div class="fill"></div>
            <div class="w5"></div>
            <!-- 生成按钮 color="#626aef"-->
            <el-button @click="onCreateButton" size="large" type="primary" style="
                font-size: 17px;
                background: linear-gradient(to bottom right, #19a3fa, #b11eb6);
              ">
              <Icon icon="mdi:paper-airplane" width="24" height="24" />
              <div class="w5"></div>
              开始生成
            </el-button>
            <div class="fill"></div>
          </div>
        </div>
        <div class="middle">
          <textarea id="111" class="mytextarea" v-model="text"></textarea>
        </div>

        <div class="left">
          <div class="mySub">目录</div>
          <div v-for="(item, index) in content" :key="index">
            <div class="myText" style="font-size: 18px">
              {{ index + 1 }} {{ item }}
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script setup lang="ts">

import { Icon } from "@iconify/vue";
declare const tinymce: any;
import { onMounted, type Ref } from "vue";
import { ref } from "vue";
import {
  getAllTerm,
  getCourseByTerm,
  createNewText,
  getParaByCourse,
  type Para,
} from "./LessonPlanService";
import { useRoute } from "vue-router";

//设置基础信息
const route = useRoute();
var isItemLocked: Ref<boolean> = ref(false);
//全部数据
var term: Ref<string[]> = ref([]);
var course: Ref<{ id: number, name: string }[]> = ref([]);
var para: Ref<Para> = ref([]);
//选择数据
var selectTerm: Ref<string> = ref("");
var selectCourse: Ref<string> = ref(""); //选择教案对应的课程
var selectPara: string = ""
var callWord: Ref<string> = ref(""); //输入提示词
var text: Ref<string> = ref("");  //最终展示教案
var index: number = -1;
var iindex: number = -1;
var name: Ref<string> = ref("未命名");  //教案名
var courseId: number = 0  //这里实际上存储的是教案的id
const content = ref(["标题一", "标题二", "标题三", "标题四"]);

const newContent = ref("");  //临时存储用
var selectParaIndex: Ref<string> = ref(""); //仅作为获取index使用
  
async function selectingCourse(): Promise<void> {
  course.value.forEach(t => {
    if (t.name == selectCourse.value) {
      courseId = t.id;
    }
  });
  para.value = await getParaByCourse(selectTerm.value, courseId);
  console.log(para.value)
}
function selectingPara(): void {
  var temp = selectParaIndex.value.split("-");
  index = parseInt(temp[0], 10);
  iindex = parseInt(temp[1], 10);
  selectPara = para.value[index].children[iindex].label;
}

async function selectingTerm(): Promise<void> {
  var result = await getCourseByTerm(selectTerm.value);
  course.value = result;
}
async function onCreateButton() {
  text.value = await createNewText(
    name.value,
    selectTerm.value,
    courseId, //这里是课程id
    selectPara,
    index,
    iindex,
    callWord.value,
    text.value,
    content.value,
    selectCourse.value,
  );
  tinymce.get("111").setContent(text.value);
}


function addContent(): void {
  if (newContent.value.trim()) {
    content.value.push(newContent.value);
    newContent.value = "";
  }
};
function removeContent(index: number): void {
  content.value.splice(index, 1);
};

onMounted(async () => {
  //初始化文本输入框
  tinymce.init({
    selector: ".mytextarea",
    language: "zh_CN",
    plugins: [
      "advlist",
      "lists",
      "charmap",
      "preview",
      "anchor",
      "pagebreak",
      "visualblocks",
      "visualchars",
      "fullscreen",
      "emoticons",
    ],
    toolbar: [
      "undo redo | cut copy paste | removeformat | styles",
      "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | subscript superscript",
    ],
    setup: function (editor: any) {
      editor.on("init", function () {
        editor.getContainer().style.height = "100%";
        editor.getContainer().style.width = "100%";
        editor.getContainer().style.borderRadius = "20px 20px 20px 20px";
      });
    },
    branding: false,
    menubar: false,
    promotion: false,
    statusbar: true,
  });
  if ((route.query.status as string) == "1") {
    isItemLocked.value = true;
    selectCourse.value = route.query.course as string;
    selectPara = route.query.para as string;
    selectTerm.value = route.query.term as string;
    index = Number(route.query.index);
    iindex = Number(route.query.iindex);
    courseId = Number(route.query.courseId);
  } else {
    isItemLocked.value = false;
    term.value = await getAllTerm();
  }
});
</script>

<style>
.left {
  height: 100%;
  width: 20%;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.middle {
  width: auto;
  height: 100%;
  background-color: white;
  width: 50%;
  border-radius: 20px 20px 20px 20px;
  box-sizing: border-box;
  margin-left: 20px;
  margin-right: 20px;
}

.right {
  width: 30%;
  height: 100%;
  background-color: white;
  flex-grow: 2;
  border-radius: 20px;
  border-radius: 20px 20px 20px 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
