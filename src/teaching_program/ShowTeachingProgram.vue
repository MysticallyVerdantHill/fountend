<template>
  <!-- 查看教学大纲-->
  <div class="myCol" style="height: 100%; width: 100%">
    <el-header
      class="myRow"
      style="
        height: auto;
        margin: 0;
        padding: 0;
        width: 100%;
        margin-bottom: 20px;
      "
    >
      <div class="myTitle" style="margin: 0">查看大纲</div>
      <div class="fill"></div>
      <div>{{ term }}</div>
      <div class="w10"></div>
      <div class="mySubTitle" style="margin: 0">{{ course }}</div>
    </el-header>
    <el-main
      style="
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
      "
    >
      <div class="myRow" style="height: 100%; width: 100%">
        <div class="right">
          <el-scrollbar
            ><div
              style="
                overflow-y: auto;
                overflow-x: hidden;
                height: 100%;
                width: 100%;
              "
            >
              <div
                v-for="(c, index) in data"
                :key="index"
                style="width: 100%; height: auto; margin-bottom: 10px"
              >
                <div
                  class="myRow content"
                  style="
                    border-radius: 10px;
                    padding: 10px;
                    box-sizing: border-box;
                  "
                  @click="onChangeFull(index)"
                >
                  <div style="font-size: 25px; height: 30px">
                    {{ index + 1 }}&nbsp;&nbsp;{{ c.chapter }}
                  </div>
                  <div class="fill"></div>
                  <Icon
                    icon="mdi:chevron-down"
                    width="25"
                    height="25"
                    style="color: black"
                    class="rotate180"
                    :class="{ 'rotate-active': isFull[index] }"
                  />
                </div>
                <transition name="slide"
                  ><div v-if="isFull[index]">
                    <div v-for="(sc, iindex) in c.subChapter" :key="iindex">
                      <div
                        @click="onShowData(index, iindex)"
                        class="content myRow"
                        style="
                          font-size: 20px;
                          height: 40px;
                          width: 100%;
                          border-radius: 10px;
                        "
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ index + 1 }}.{{
                          iindex + 1
                        }}&nbsp;&nbsp;{{ sc.title }}
                      </div>
                    </div>
                  </div></transition
                >
              </div>
            </div></el-scrollbar
          >
        </div>
        <div class="w20"></div>

        <div class="left">
          <div class="myRow">
            <div class="mySubTitle" style="margin: 0">{{ showTitle }}</div>
            <div class="fill"></div>
            <el-button v-if="showTitle != ''" @click="onClickNewLessonPlan()"
              >创建教案</el-button
            >
            <div class="w20"></div>
          </div>

          <el-divider
            style="margin: 0; margin-bottom: 20px; margin-top: 10px"
          ></el-divider>
          {{ showData }}
        </div>
      </div></el-main
    >
  </div>
</template>
<script setup lang="ts">
import { onMounted, type Ref } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDataById, type totalData } from "./TeachingProgramService";
import { Icon } from "@iconify/vue";
import { da } from "element-plus/es/locales.mjs";

const route = useRoute();
const router = useRouter();
var id: number;
var course: Ref<string> = ref("");
var term: string;
var data: Ref<totalData[] | null> = ref(null);
var isFull: Ref<boolean[]> = ref([]);
var showData: Ref<string> = ref("");
var showTitle: Ref<string> = ref("");
var selectIndex: Ref<number> = ref(0);
var selectIindex: Ref<number> = ref(0);
var title: string = "";
onMounted(async () => {
  id = Number(route.params.tpid);
  course.value = route.query.course as string;
  term = route.query.term as string;
  data.value = await getDataById(id);

  for (var i = 0; i < data.value!.length; i++) {
    isFull.value.push(false);
  }
  isFull.value[0] = true;
});
function onChangeFull(index: number): void {
  isFull.value[index] = !isFull.value[index];
}
function onShowData(index: number, iindex: number): void {
  showData.value = data.value![index].subChapter[iindex].content;
  showTitle.value = `${index + 1}.${iindex + 1}   ${
    data.value![index].subChapter[iindex].title
  }`;
  title = data.value![index].subChapter[iindex].title;
  selectIindex.value = iindex;
  selectIndex.value = index;
}
function onClickNewLessonPlan() {
  router.push({
    name: "editLessonPlan",
    query: {
      status: 1,
      course: course.value,
      courseId: Number(route.query.id),
      term: term,
      para: title,
      index: selectIndex.value,
      iindex: selectIindex.value,
    },
  });
}
</script>

<style>
.left {
  height: 100%;
  width: 70%;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.right {
  width: 30%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  border-radius: 20px 20px 20px 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
}
.content {
  transition: background-color 0.3s ease;
}
.content:hover {
  background-color: rgb(228, 228, 228);
}
</style>
