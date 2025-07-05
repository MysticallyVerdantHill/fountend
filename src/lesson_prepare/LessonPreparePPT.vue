<script setup lang="ts">
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const router = useRouter();
function onClickNew() {
  const routeUrl = router.resolve({ name: "editLessonPlan" });
  window.open(routeUrl.href, "_blank");
}
const temp = ref([
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
  {
    id: "5-3",
    name: "二维数组与数组的应用",
    course: "程序设计基础 Ⅰ",
    para: "数组",
    time: "2025-12-22 20:20",
  },
]);
</script>
<template>
  <div class="myCol" style="height: 100%; width: 100%">
    <el-header
      style="height: 130px; width: 100%; padding-left: 0; padding-right: 0"
      ><div class="myTitle">备课PPT管理</div>
      <div class="myRow">
        <div class="myAddCard" @click="onClickNew">
          <div class="myRow" style="height: 100%; width: 100%">
            <Icon
              icon="mdi:file-document-outline"
              width="40"
              height="40"
              style="color: #325cd2"
            />
            <div class="w5"></div>
            <div class="myCol" style="margin-left: 10px; height: 100%">
              <div class="addCardTitle">新建教案</div>
              <div class="fill"></div>
              <div class="addCardText" style="color: #606266">AI辅助生成</div>
            </div>
            <div class="fill"></div>
            <Icon icon="mdi:add" width="35" height="35" />
          </div>
        </div>
        <div class="myAddCard">
          <div class="myRow" style="height: 100%; width: 100%">
            <Icon
              icon="mdi:cloud-outline"
              width="40"
              height="40"
              style="color: #325cd2"
            />
            <div class="w5"></div>
            <div class="myCol" style="margin-left: 10px; height: 100%">
              <div class="addCardTitle">上传</div>
              <div class="fill"></div>
              <div class="addCardText" style="color: #606266">上传本地文件</div>
            </div>
            <div class="fill"></div>
            <Icon icon="mdi:add" width="35" height="35" />
          </div>
        </div></div
    ></el-header>

    <el-main
      style="
        width: 100%;
        height: 100%;
        margin-bottom: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
      "
    >
      <div
        class="myCol"
        style="
          height: 100%;
          width: 100%;
          background-color: white;
          padding: 20px;
          box-sizing: border-box;
          border-radius: 10px 10px 0 0;
          overflow-y: auto;
        "
      >
        <div class="myRow" style="margin-bottom: 20px">
          <div class="myRow" style="margin-right: 20px">
            <div class="myTextSecond">选择学期</div>
            <div class="w5"></div>
            <el-select style="width: 180px" placeholder="所有学期"></el-select>
          </div>
          <div class="myRow" style="margin-right: 20px">
            <div class="myTextSecond">选择课程</div>
            <div class="w5"></div>
            <el-select style="width: 180px" placeholder="所有课程"></el-select>
          </div>
        </div>
        <el-divider style="margin-top: 0px; margin-bottom: 20px"> </el-divider>
        <div class="myRow" style="width: 100%; margin-bottom: 15px">
          <div class="myTextSecond" style="width: 10%">章节号</div>
          <div class="myTextSecond" style="width: 25%">名称</div>
          <div class="myTextSecond center" style="width: 15%">课程</div>
          <div class="myTextSecond center" style="width: 15%">章节</div>
          <div class="myTextSecond center" style="width: 20%">修改时间</div>
          <div class="myTextSecond center" style="width: 15%">操作</div>
        </div>
        <div
          v-for="(item, index) in temp"
          :key="index"
          class="myRow list"
          style="width: 100%"
        >
          <div class="myTextSecond" style="width: 10%">{{ item.id }}</div>
          <div class="myTextSecond" style="width: 25%">{{ item.name }}</div>
          <div class="myTextSecond center" style="width: 15%">
            {{ item.course }}
          </div>
          <div class="myTextSecond center" style="width: 15%">
            {{ item.para }}
          </div>
          <div class="myTextSecond center" style="width: 20%">
            {{ item.time }}
          </div>
          <div class="myTextSecond myRow" style="width: 15%">
            <div class="fill"></div>
            <el-button type="primary">创建备课</el-button>
            <div class="w5"></div>
            <Icon
              class="onHover"
              style="border-radius: 50px"
              icon="mdi:more-horiz"
              width="20"
              height="20"
            />
            <div class="fill"></div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
