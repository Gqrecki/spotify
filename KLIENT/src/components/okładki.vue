<template>
    <div id="okładki">
      <div id="płyty">
      <template v-for="(item, i) in data.dirs" :v-key="i">
        <img :key="i" :src="'http://localhost:3000/static/mp3/'+item+'/cover.jpg'" alt="" :name="item" @click="klik()" />
      </template>
      </div>
    </div>
</template>

<script>
export default{
    computed:{
        data(){
            return this.$store.getters.sampleGetter
        },
    },
    methods: {
      klik(){
        setTimeout(function(){
        if(document.getElementById("right") != null){
        document.getElementById("right").id = "noright"}
        if(document.getElementById("left") != null){
        document.getElementById("left").id = "noleft"}
        },50)
        document.getElementById("audio").pause()
        setTimeout(function(){ document.getElementById('max').innerText = "0:00"; }, 50);
        setTimeout(function(){ document.getElementById('now').innerText = "0:00"; }, 50);
        var data = event.target.getAttribute('name');
        this.$store.dispatch('updateThissong', '')
        this.$store.dispatch("nextAction", data)
        this.$store.dispatch('updateCounter', 0)
        if(document.getElementById("played_stop") != null){
          document.getElementById("played_stop").id = ""
        }
        if(document.getElementById("played_start") != null){
          document.getElementById("played_start").id = ""
        }
        document.getElementById("center2").id = "center1"
      },
    }
}
</script>

<style>
#okładki{
  display: inline-block;
  width: 20%;
  height: 90vh;
  background-color: black;
  color: white;
  min-width: 100px;
}
#buttons{
  text-align: center;
  height: 100px;
  font-size: 30px;
  color: white;
  background-color: #000000;
}
#płyty{
  height: calc(100vh - 100px);
  overflow: scroll;
  overflow-x: hidden;
}
#płyty::-webkit-scrollbar {
  width: 10px;
}

#płyty::-webkit-scrollbar-track {
  background: #000000; 
}
 
#płyty::-webkit-scrollbar-thumb {
  background: #595959; 
}

#płyty::-webkit-scrollbar-thumb:hover {
  background: #9d9d9d; 
}
#płyty img{
  margin-top: 10px;
  width: 90%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
}
</style>
