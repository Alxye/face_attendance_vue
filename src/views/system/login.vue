<template>
  <div class="container">
    <div class="box">
      <div class="login-content-left">
        <img :src="loginLeftPng"/>
        <div class="login-content-left-mask">
          <div>{{ $t(systemTitle) }}</div>
          <div>{{ $t(systemSubTitle) }}</div>
        </div>
      </div>

      <div class="box-inner">
        <h1 v-if=!form.isRegister>{{ $t('message.system.welcome') }}</h1>
        <h1 v-if=form.isRegister>欢迎注册</h1>
        <el-form class="form">
          <el-input
              size="large"
              v-model="form.staff_id"
              :placeholder="$t('message.system.userName')"
              type="text"
              maxlength="50"
          >
            <template #prepend>
              <i class="sfont system-xingmingyonghumingnicheng"></i>
            </template>
          </el-input>
          <el-input
              size="large"
              ref="password"
              v-model="form.password"
              :type="passwordType"
              :placeholder="$t('message.system.password')"
              name="password"
              maxlength="50"
          >
            <template #prepend>
              <i class="sfont system-mima"></i>
            </template>
            <template #append>
              <i class="sfont password-icon" :class="passwordType ? 'system-yanjing-guan': 'system-yanjing'"
                 @click="passwordTypeChange"></i>
            </template>

          </el-input>
          <el-select
              v-if=form.isRegister
              v-model="form.name"
              size="large"
              type="text"
              maxlength="150"
              style="width: 100%"
          >
            <el-option v-for="item in form.departmentList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <div style="display: flex">
            <el-button v-if=!form.isRegister type="primary" :loading="form.loading" @click="submit" style="width: 100%;margin-top: 20px;"
                       size="medium">
              {{ $t('message.system.login') }}
            </el-button>

            <el-button v-if=!form.isRegister type="primary" :loading="form.loading_register" @click="toregister"
                       style="width: 100%; margin-top: 20px;margin-left: 10px" size="medium">
              去注册
            </el-button>
            <el-button v-if=form.isRegister type="primary" :loading="form.loading_register" @click="tologin"
                       style="width: 100%; margin-top: 20px;" size="medium">
              去登录
            </el-button>
            <el-button v-if=form.isRegister type="primary" :loading="form.loading_register" @click="register"
                       style="width: 100%; margin-top: 20px;margin-left: 10px" size="medium">
              注册
            </el-button>
          </div>

        </el-form>
        <div class="fixed-top-right">
          <select-lang/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {systemTitle, systemSubTitle} from '@/config'
import {defineComponent, ref, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import type {RouteLocationRaw} from 'vue-router'
import {getAuthRoutes} from '@/router/permission'
import {ElMessage} from 'element-plus'
// import selectLang from '@/layout/Header/functionList/word.vue'
import loginLeftPng from '@/assets/login/left.jpg';
import {getDepartmentInfo} from "@/api/department";
import {Register} from "@/api/user";

export default defineComponent({
  // components: {
  //   selectLang
  // },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    let isRegister=ref(false)
    const form = reactive({
      // name: 'admin',
      isRegister:false,
      staff_id: '1112',
      password: '123456',
      loading: false,
      loading_register: false,
      name: "请选择部门",
      departmentList: [
        ''
      ]
    })

    function fetchDepartment() {
      getDepartmentInfo()
          .then(res => {
            console.log(res)
            let arr = [];
            for (const key in res.data) {
              if (!res.data.hasOwnProperty(key)) {
                continue;
              }
              const item = res.data[key].name;
              arr.push(item);
            }
            console.log(arr)
            console.log(typeof (arr))
            form.departmentList = arr
          })
    }

    fetchDepartment()

    // const store=useStore()
    const passwordType = ref('password')
    const passwordTypeChange = () => {
      passwordType.value === '' ? passwordType.value = 'password' : passwordType.value = ''
    }
    const checkForm = () => {
      return new Promise((resolve, reject) => {
        if (form.staff_id === '') {
          ElMessage.warning({
            message: '用户名不能为空',
            type: 'warning'
          });
          return;
        }
        if (form.password === '') {
          ElMessage.warning({
            message: '密码不能为空',
            type: 'warning'
          })
          return;
        }
        if (form.name === '请选择部门') {
          ElMessage.warning({
            message: '请选择部门',
            type: 'warning'
          });
          return;
        }
        resolve(true)
      })
    }
    const checkFormLogin = () => {
      return new Promise((resolve, reject) => {
        if (form.staff_id === '') {
          ElMessage.warning({
            message: '用户名不能为空',
            type: 'warning'
          });
          return;
        }
        if (form.password === '') {
          ElMessage.warning({
            message: '密码不能为空',
            type: 'warning'
          })
          return;
        }
        resolve(true)
      })
    }
    const toregister=()=>{
      form.isRegister=true
    }
    const tologin=()=>{
      form.isRegister=false
    }
    const register = () => {
      checkForm()
          .then(() => {
            form.loading = true
            let params = {
              staff_id: form.staff_id,
              password: form.password,
              department_name: form.name
            }
            Register(params)
                .then(res => {
                  ElMessage({
                    type: 'success',
                    message: '注册成功'
                  })
                  location.reload()
                }).finally(() => {
              form.loading = false
            })
          })
    }

    const submit = () => {
      checkFormLogin()
          .then(() => {
            form.loading = true
            let params = {
              staff_id: form.staff_id,
              password: form.password
            }
            store.dispatch('user/login', params)
                .then(async () => {
                  ElMessage.success({
                    message: '登录成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                  })
                  location.reload()
                }).finally(() => {
              form.loading = false
            })
          })
    }
    return {
      loginLeftPng,
      systemTitle,
      systemSubTitle,
      form,
      passwordType,
      passwordTypeChange,
      submit,
      register,
      toregister,
      tologin
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #fff url('@/assets/login/bg.png') no-repeat center;
  overflow: hidden;
  background-size: cover;
  cursor: pointer;
  user-select: none;

  .box {
    width: 1160px;
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    background: white;
    border-radius: 8px;
    transform: translate(-50%, -50%);
    height: 440px;
    overflow: hidden;
    box-shadow: 0 6px 20px 5px rgba(152, 152, 152, 0.1),
    0 16px 24px 2px rgba(117, 117, 117, 0.14);

    .login-content-left {
      position: relative;

      img {
        height: 440px;
      }

      .login-content-left-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(rgba(0, 204, 222, 0.8), rgba(51, 132, 224, 0.8));
        text-align: center;
        color: #fff;
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        letter-spacing: 2px;

        div:nth-child(1) {
          font-size: 3.5rem;
          margin-bottom: 1em;
        }
      }
    }

    .box-inner {
      width: 500px;

      h1 {
        margin-top: 80px;
        text-align: center;
      }

      .form {
        width: 80%;
        margin: 50px auto 15px;

        .el-input {
          margin-bottom: 20px;
        }

        .password-icon {
          cursor: pointer;
          color: #409eff;
        }
      }

      .fixed-top-right {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
}

@media screen and (max-width: 1260px) {
  .login-content-left {
    display: none;
  }
  .box {
    width: 500px !important;
  }
}

@media screen and (max-width: 750px) {
  .container .box, .container .box-inner {
    width: 100vw !important;
    height: 100vh;
    box-shadow: none;
    left: 0;
    top: 0;
    transform: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      margin-top: 0;
    }

    .form {
    }
  }
}
</style>
