<template>
  <!-- 没有顶部以及左侧导航栏的页面-->
  <div class="temp1">
    <div class="temp2"><router-view></router-view></div>
  </div>
</template>

<style>
.temp1 {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 0px;
  padding-left: 20px;
  padding-right: 20px;
}
.temp2 {
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  width: 100%;
  border-radius: 20px 20px 0 0;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0px;
}
</style>
