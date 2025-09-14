<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref, type Ref } from "vue";
import { getAllData, type teachingProgram } from "./TeachingProgramService";
import { da } from "element-plus/es/locales.mjs";
const router = useRouter();

//基础数据
var data: Ref<teachingProgram[]> = ref([]);
var term: Ref<string[]> = ref([]);
var selectTerm: Ref<string> = ref("");
var course: Ref<string[]> = ref([]);
var selectCourse: Ref<string> = ref("");
function onClickShow(index: number) {
    const routeUrl = router.resolve({
        name: "showTeachingProgram",
        params: {
            tpid: data.value[index].id,
        },
        query: {
            term: data.value[index].term,
            course: data.value[index].courseName,
            id: data.value[index].id,
            courseId: data.value[index].courseId
        },
    });
    window.open(routeUrl.href, "_blank");
}

//初始加载数据
onMounted(async () => {
    var allData: teachingProgram[] = await getAllData();
    data.value = allData;
    allData.forEach((t) => {
        course.value.push(t.courseName);
        term.value.push(t.term);
    });
    course.value = [...new Set(course.value)];
    term.value = [...new Set(term.value)];
});
</script>
<template>
    <!-- 教学大纲主页-->
    <div class="myCol" style="height: 100%; width: 100%">
        <el-header style="
        height: min-content;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
      ">
            <div class="myTitle">教学大纲</div>
        </el-header>

        <el-main style="
        width: 100%;
        height: 100%;
        margin-bottom: 0;
        padding-bottom: 0;
        margin-top: 0;
        padding-top: 0;
        padding-left: 0;
        padding-right: 0;
      ">
            <div class="myCol" style="
          height: 100%;
          width: 100%;
          background-color: white;
          padding: 20px;
          box-sizing: border-box;
          border-radius: 10px 10px 0 0;
          overflow-y: auto;
        ">
                <div class="myRow" style="margin-bottom: 20px">
                    <div class="myRow" style="margin-right: 20px">
                        <div class="myTextSecond">选择学期</div>
                        <div class="w5"></div>
                        <el-select style="width: 180px" placeholder="所有学期" v-model="selectTerm" clearable
                            value-on-clear="">
                            <el-option v-for="(t, index) in term" :key="index" :value="t" :label="t"></el-option>
                        </el-select>
                    </div>
                    <div class="myRow" style="margin-right: 20px">
                        <div class="myTextSecond">选择课程</div>
                        <div class="w5"></div>
                        <el-select style="width: 180px" placeholder="所有课程" v-model="selectCourse" clearable
                            value-on-clear="">
                            <el-option v-for="(t, index) in course" :key="index" :label="t" :value="t"></el-option>
                        </el-select>
                    </div>
                </div>
                <el-divider style="margin-top: 0px; margin-bottom: 20px"> </el-divider>
                <div class="myRow" style="width: 100%; margin-bottom: 15px">
                    <div class="myTextSecond" style="width: 20%">编号</div>
                    <div class="myTextSecond center" style="width: 20%">名称</div>
                    <div class="myTextSecond center" style="width: 20%">学期</div>
                    <div class="myTextSecond center" style="width: 20%">创建时间</div>
                    <div class="myTextSecond center" style="width: 20%">操作</div>
                </div>
                <div v-for="(item, index) in data" :key="index" style="width: 100%">
                    <div class="myRow list" style="width: 100%" v-if="
                        (selectCourse === '' || selectCourse === item.courseName) &&
                        (selectTerm === '' || selectTerm === item.term)
                    ">
                        <div class="myTextSecond" style="width: 20%">
                            {{ item.id }}
                        </div>
                        <div class="myTextSecond center" style="width: 20%">
                            {{ item.courseName }}
                        </div>
                        <div class="myTextSecond center" style="width: 20%">
                            {{ item.term }}
                        </div>
                        <div class="myTextSecond center" style="width: 20%">
                            {{ item.changeTime.getFullYear() }}.{{
                                item.changeTime.getMonth() + 1
                            }}.{{ item.changeTime.getDay() }}
                            {{ item.changeTime.getHours() }}:{{
                                item.changeTime.getMinutes()
                            }}
                        </div>
                        <div class="myTextSecond myRow" style="width: 20%">
                            <div class="fill"></div>
                            <el-button type="primary" @click="onClickShow(index)">查看大纲</el-button>
                            <div class="fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </div>
</template>
