<template>
  <div class="body">
<img style="display:block;position:absolute;margin-top:-420px;margin-left: 450px;" src="../../../assets/logo.png">
    <!-- begin:: card  -->
    <b-card
      header-bg-variant="dark"
      header-text-variant="white"
      header="Please Sign Up"
      align="center"
      class="form-sign-in"
      style="max-width: 25rem; min-height: 20rem"
    >
      <!-- begin:: form-->
      <b-form>
        <!-- begin:: name-->
        <b-form-group
          label="name"
          label-for="merchant-account-code"
          class="my-5"
        >
          <b-form-input
            type="text"
            class="form-control"
            v-model.trim="name"
          ></b-form-input>
        </b-form-group>
        <!-- end:: name-->
        <!-- begin:: email-->
        <b-form-group
          label="email"
          label-for="merchant-account-code"
          class="my-5"
        >
          <b-form-input
            type="text"
            class="form-control"
            v-model.trim="email"
          ></b-form-input>
        </b-form-group>
        <!-- end:: email-->
        <!-- begin:: password-->
        <b-form-group
          label="Password"
          label-for="merchant-account-code"
          class="my-5"
        >
          <b-form-input
            type="password"
            class="form-control"
            v-model.trim="password"
          ></b-form-input>
        </b-form-group>
        <!-- end:: password-->
        <!-- begin:: bumber-->
        <b-form-group
          label="number"
          label-for="merchant-account-code"
          class="my-5"
        >
          <b-form-input
            type="text"
            class="form-control"
            v-model.trim="number"
          ></b-form-input>
        </b-form-group>
        <!-- end:: email-->
            <b-button v-on:click="Signup" tag="button">Sign Up</b-button>
            <br>
            <br>
            <b-button v-on:click="send_tologin">have an accout?</b-button>
      </b-form>
      <p class="mt-3 mb-3 text-muted text-center">
        2022-©2022
      </p>
      <!-- form:: password-->
    </b-card>
    <!-- end:: card  -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name :'SignUp',
    data()
    {
      return{
        email:'',
        password:'',
        name:'',
        number:''
      }
    },
    methods:{
      async Signup()
      {
        let result = await axios.post('https://zae1qw.deta.dev/signup?email='+this.email+'&username='+this.name+'&password='+this.password+'&role_as=3&phone_number='+this.number)
        console.log(result)
        this.$notify({
        group: 'foo',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
        });
      },
      async send_tologin()
      {
        this.$router.push({name: "login"})
      }
    }
}
</script>

<style scoped lang="stylus">
.body
  display: flex;
  padding-top: 150px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #f6f6f6;
.form-sign-in
  width: 100%;
  max-width: 450px;
  margin: auto;
</style>
