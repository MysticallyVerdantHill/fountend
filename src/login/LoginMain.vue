<template>
    <input type="text" />
    <input type="text" />
    <button @click="onLoginButtonClick">登录</button>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import { login, type status } from "./LoginService";
import { useRouter } from "vue-router";
const router = useRouter();
var name: Ref<string> = ref("");
var password: Ref<string> = ref("");
async function onLoginButtonClick() {
    var result: status = await login(name.value, password.value);
    if (result.errorNum == 0) {
        router.push({
            name: "lessonPlan",
            params: { id: result.id },
        });
    }
}
</script>
