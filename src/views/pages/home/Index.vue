<template>
    <!-- Developed by http://grohit.com/ -->
<div>
<p data-item='HELP DESK'>HELP DESK</p>
    <div class="button-div">
    
    <button v-on:click="tosignup" class="signup-button">Signup</button>
    <button v-on:click="tologin" class="login-button">Login</button>
    
    
</div>
  <nav>
    <ul class="menuItems">
      <li><a v-on:click="tologin" data-item='Tickets'>Tickets</a></li>
    </ul>
  </nav>
      <div class="banner">
  <div>
    <h1>Welcome to the site</h1>
    <br>
    <h3>a simple ticketing system .Manage all your customer</h3>
    <h3>messages in one place. Build better bonds automatically.</h3>
    <br>
    <br>
    <br>
    <h5>Team up in HelpDesk to smoothly resolve every problem</h5>
  </div>  
</div>
</div>
</template>
<script>
export default {
    name: 'MainHome',
    methods :{
     async tologin()
      {
        this.$router.push({name: "login"})
      },
      async tosignup()
      {
        this.$router.push({name: "signup"})
      }
    }
}
</script>
<style scoped lang="stylus">
* {
  padding: 0;
  margin: 0;
}
// Developed by http://grohit.com/


body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  font-family: Hack, monospace;
  background-color:#d0d6e0;
  height:100vh;
  justify-content:center;
  align-items:center;
}

div {
  color: #727272;
  text-align: center;
}

p {
  margin: 16px;
  font-size: 96px;
  color: #ccc;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 1s ease-in-out;
  position: relative;

  &::before {
    content: attr(data-item);
    transition: all 1s ease-in-out;
    color: #8254ff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0;
    overflow: hidden;
  }

  &:hover {
    &::before {
      width: 100%;
    }
  }
}

nav {
  margin: 25px;
  background: #f9f9f9;
  padding: 16px;
  .menuItems {
    list-style: none;
    display: flex;

    li {
      margin: 50px;

      a {
        text-decoration: none;
        color: #8f8f8f;
        font-size: 24px;
        font-weight: 400;
        transition: all 0.5s ease-in-out;
        position: relative;
        text-transform: uppercase;

        &::before {
          content: attr(data-item);
          transition: 0.5s;
          color: #8254ff;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 0;
          overflow: hidden;
        }

        &:hover {
          &::before {
            width: 100%;
            transition: all 0.5s ease-in-out;
          }
        }
      }
    }
  }
}
.button-div{
    position: absolute;
    margin-left: 1100px;
    margin-top: -50px;
    width:200px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:5px;
    padding:7px;
}

.signup-button{
    width:100%;
    height:55px;
    margin-right:7px;
    border:none;
    border-radius:5px;
    background-color:#e9ecf0;
    font-size:17px;
    font-weight:600;
    cursor:pointer;
}

.login-button{
    width:100%;
    height:55px;
    border:none;
    border-radius:5px;
    font-size:17px;
    font-weight:600;
    color:#fff;
    background-color:#1859c9;
    cursor:pointer;
}


.login-button:hover{
    
    background-color:#1859c9db;
}


.signup-button:hover{
    
    background-color:#e9ecf0d1;
}
</style>