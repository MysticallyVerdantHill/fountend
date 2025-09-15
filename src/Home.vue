<template>
    <!-- 顶部以及左侧导航栏-->
    <div class="myCol" style="height: 100vh;">
        <div class="header-container myRow">
            <div class="myRow" style="min-width: 200px; justify-content: center; gap: 4px;">
                <img src="/ico.png" alt="Logo" style="height: 40px; width: auto;" />
                <div style="color: white; font-size: 20px; font-family: Source Han Serif SC;">教学实训</div>
            </div>
            <div class="myRow" style="flex-grow: 1">
                <div class="searchBox myRow">
                    <Icon icon="mdi:search" width="24" height="24" style="color: white; padding-left:10px" />
                </div>
                <div class="myRow" style="justify-content: flex-end; flex-grow: 1; gap: 20px; padding-right: 20px;">
                    <Icon icon="mdi:settings" class="headIcon" />
                    <Icon icon="mdi:download" class="headIcon" />
                    <Icon icon="mdi:bell" width="24" height="24" style="color: white;" />
                    <div style="color: white; font-size: 20px;">Hinjin</div>
                    <div style="border-radius: 50px; height: 35px; width: 35px; background-color: white;"></div>
                </div>
            </div>
        </div>

        <div class="main-container">
            <div class="myRow" style="height: 100%; width: 100%">
                <el-aside style="width: 200px; height: 100%">
                    <div class="myCol" style="height: 100%; width: 200px; align-items: center">
                        <div class="menuCard myRow" @click="onMenuClick(0)" 
                        :class="{ menuCardSelect: selectIndex == 0 }">
                            <div class="w10"></div>
                            <Icon icon="mdi:home" width="30" height="30" style="color: white" />
                            <div class="w10"></div>
                            <div class="menuText">首页</div>
                        </div>
                        <div class="menuCard myRow" @click="onMenuClick(1)"
                            :class="{ menuCardSelect: selectIndex == 1 }">
                            <div class="w10"></div>
                            <Icon icon="mdi:file-document" width="30" height="30" style="color: white" />
                            <div class="w10"></div>
                            <div class="menuText">教学大纲</div>
                        </div>
                        <div class="menuCard myRow" @click="onMenuClick(2)"
                            :class="{ menuCardSelect: selectIndex == 2 }">
                            <div class="w10"></div>
                            <Icon icon="mdi:insert-photo" width="30" height="30" style="color: white" />
                            <div class="w10"></div>
                            <div class="menuText">教案</div>
                        </div>
                        <div class="menuCard myRow" @click="onMenuClick(3)" :class="{
                            menuCardSelect:
                                (selectIndex == 3 ||
                                    selectIndex == 3.1 ||
                                    selectIndex == 3.2) &&
                                isSubMenuVisible == false,
                        }">
                            <div class="w10"></div>
                            <Icon icon="mdi:pencil-box" width="30" height="30" style="color: white" />
                            <div class="w10"></div>
                            <div class="menuText">备课</div>
                            <div class="fill"></div>
                            <Icon icon="mdi:chevron-down" width="25" height="25" style="color: white" class="rotate180"
                                :class="{ 'rotate-active': isSubMenuVisible }" />
                            <div class="w10"></div>
                        </div>
                        <transition name="slide">
                            <div v-if="isSubMenuVisible" class="subMenu">
                                <div class="menuCard myRow" @click="onMenuClick(3.1)"
                                    :class="{ menuCardSelect: selectIndex == 3.1 }">
                                    <div class="w20"></div>
                                    <div class="w20"></div>
                                    <Icon icon="mdi:chat-processing" width="20" height="20" style="color: white" />
                                    <div class="w10"></div>

                                    <div class="menuText">备课文档</div>
                                </div>
                                <div class="menuCard myRow" @click="onMenuClick(3.2)"
                                    :class="{ menuCardSelect: selectIndex == 3.2 }">
                                    <div class="w20"></div>
                                    <div class="w20"></div>
                                    <Icon icon="mdi:chat-processing" width="20" height="20" style="color: white" />
                                    <div class="w10"></div>

                                    <div class="menuText">备课PPt</div>
                                </div>
                            </div>
                        </transition>
                        <div class="menuCard myRow">
                            <div class="w10"></div>
                            <Icon icon="mdi:chat-processing" width="30" height="30" style="color: white" />
                            <div class="w10"></div>
                            <div class="menuText">练习管理</div>
                        </div>
                        <div class="menuCard myRow">
                            <div class="w10"></div>
                            <Icon icon="mdi:chart-pie" width="30" height="30" style="color: white" />
                            <div class="w10"></div>
                            <div class="menuText">学情分析</div>
                        </div>
                    </div>
                </el-aside>
                <el-main style="
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            margin-right: 20px;
          ">
                    <div class="main">
                        <router-view></router-view>
                    </div>
                    <div class="w20"></div>
                </el-main>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const selectIndex: Ref<number> = ref(3);
const isSubMenuVisible: Ref<boolean> = ref(false);

const subMenuItems = [
    { icon: "mdi:pencil", text: "子菜单1", routeName: "submenu1" },
    { icon: "mdi:format-list-bulleted", text: "子菜单2", routeName: "submenu2" },
    { icon: "mdi:content-save", text: "子菜单3", routeName: "submenu3" },
];

function onMenuClick(index: number): void {
    if (index == 3) {
        isSubMenuVisible.value = !isSubMenuVisible.value;
        return;
    }
    if (index != selectIndex.value) {
        switch (index) {
            case 0:
                router.push({ name: "homeMain" });
                selectIndex.value = 0;
                break;
            case 1:
                router.push({ name: "teachingProgram" });
                selectIndex.value = 1;
                break;
            case 2:
                router.push({ name: "lessonPlan" });
                selectIndex.value = 2;
                break;
            case 3.1:
                router.push({ name: "lessonPrepareDocx" });
                selectIndex.value = 3.1;
                break;
            case 3.2:
                router.push({ name: "lessonPreparePPT" });
                selectIndex.value = 3.2;
                break;
        }
    }
}

function onSubMenuClick(routeName: string): void {
    router.push({ name: routeName });
}
</script>

<style>
.main {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px 20px 0px 0px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 0px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>
