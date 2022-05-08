<template>
  <div id="app">
    <piosenki />
    <okładki />
    <control />
  </div>
</template>

<script>
import piosenki from './components/piosenki.vue'
import okładki from './components/okładki.vue'
import control from './components/control.vue'

export default {
  components:{
    piosenki,
    okładki,
    control
  },
  computed:{
    atad(){
      return {countt: 0}
    }
  },
}

</script>

<style>
body{
  margin: 0px;
  background-color: #1a1a1a;
}
#app{
  display: block;
  overflow-x: auto;
  overflow-y: hidden;
  min-width: 840px;
}
#app::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  background: #232323; 
}
 
body::-webkit-scrollbar-thumb {
  background: #595959; 
}

body::-webkit-scrollbar-thumb:hover {
  background: #9d9d9d; 
}
</style>