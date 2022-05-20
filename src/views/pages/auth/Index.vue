<template>
  <div class="body">
    <img style="display:block;position:absolute;margin-top:-310px;margin-left: 450px;" src="../../../assets/logo.png">
    <!-- begin:: card  -->
    <b-card
      header-bg-variant="dark"
      header-text-variant="white"
      header="Please sign in"
      align="center"
      class="form-sign-in"
      style="max-width: 25rem; min-height: 20rem"
    >
      <!-- begin:: form-->
      <b-form>
        <!-- begin:: email-->
        <b-form-group
          label="name"
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
            <b-button v-on:click="Signin" tag="button">SignIn</b-button>
            <br>
            <br>
            <b-button v-on:click="send_tosignup">create account</b-button>
      </b-form>
      <TableListOfTickets :userid="uid" />

      <p class="mt-3 mb-3 text-muted text-center">
       2020-© 2022
      </p>
      <!-- form:: password-->
    </b-card>
    <!-- end:: card  -->
  </div>
</template>

<script>
import TableListOfTickets from '../../../components/tables/table-list-of-tickets/TableListOfTickets.vue'
import axios from 'axios'
import router from '../../../router'
export default {
  
    name :'SignIn',
    data()
    {
      return{
        email:'',
        password:'',
        uid: user.user_id
      }
    },
    components: {
      TableListOfTickets
    },
    methods:{
      async Signin()
      {
        let result = await axios.get('https://zae1qw.deta.dev/login'+'/'+this.email+'/'+this.password)
        localStorage.setItem("user-info",JSON.stringify(result.data))
        console.log(localStorage.getItem("user-info"))
        const info = localStorage.getItem("user-info")
        const user = JSON.parse(info.substring(8,info.length-1))
        localStorage.setItem("user-id",user.user_id)
        console.log(user.user_id)
       if(user.user_role==1){
         this.$router.push({name:'admin_home'});  
       }else if(user.user_role==3)
       { 
         this.$router.push({ name: "user_home" })
        }else {
          this.$router.push({name:"support_home"})
        }
      },
      async send_tosignup()
      {
        this.$router.push({name: "signup"})
      }
      }
    }
</script>

<style scoped lang="stylus">
.body
  display: flex;
  padding-top: 100px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #f6f6f6;
.form-sign-in
  width: 100%;
  max-width: 450px;
  margin: auto;
</style>
