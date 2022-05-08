<template>
    <div id="piosenki">
    <div id="header">
    <p>{{data.thisdir}}</p>
    </div>
    <div id="div">
    <div class="class" v-for="(item, i) in data.files" :key="i" :name="item.name">
        <div class="button" v-on:click="playthis"></div><p class="p1">{{item.name}}</p> <p class="p2">{{item.size}}</p>
    </div>
    </div>
    </div>
</template>

<script>
export default{
    computed:{
        data(){
            return this.$store.getters.sampleGetter
        },
        number(){
          return this.$store.getters.countGetter
        },
    },
    mounted() {
    this.$store.dispatch("sampleAction");
    },
    methods: {
      playthis: function() {
        if(event.target.id == "played_stop"){
            document.getElementById("audio").play();
            this.$store.dispatch('updateCounter', 1)
             document.getElementById("played_stop").id = ""
            event.target.id = "played_start"
            document.getElementById("center1").id = "center2"
        }else if(event.target.id == "played_start"){
            document.getElementById("audio").pause()
            this.$store.dispatch('updateCounter', 2)
            document.getElementById("played_start").id = ""
            event.target.id = "played_stop"
            document.getElementById("center2").id = "center1"
        }else{
        this.$store.dispatch('updateDiv', event.target)
        this.$store.dispatch('updateThissong', event.target.parentElement.getAttribute('name'))
        if(document.getElementById("played_stop") != null){
          document.getElementById("played_stop").id = ""
        }
        if(document.getElementById("played_start") != null){
          document.getElementById("played_start").id = ""
        }
        document.getElementById("audio_src").src = "http://localhost:3000/static/mp3/" + this.$store.getters.sampleGetter.thisdir + "/" + event.target.parentElement.getAttribute('name')
        document.getElementById("audio").load()
        document.getElementById("audio").play()
        .then(event.target.id = "played_start")
        this.$store.dispatch('updateCounter', 2)
        if(document.getElementById("center1") != null){
        document.getElementById("center1").id = "center2"}
      }
      },
    }
}
</script>

<style>
.class{
    background-color: #1a1a1a;
    color: #b7b7b7;
    height: 60px;
}
p{
    display: inline-block;
    position: relative;
}
.p1{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 19px;
    float: left;
    margin-left: 15vw;
    width: 30vw;
}
.p2{
    font-size: 19px;
    width: 100px;
    float: right;
    margin-right: 15vw;
}
#div{
    margin-left: 10px;
    overflow: scroll;
    overflow-x: hidden;
    height: calc(100vh - 200px);
    text-align: left;
}
#header{
    text-align: center;
    font-size: 30px;
    color: white;
    background-color: #232323;
    height: 100px;
}
#piosenki{
    width: 80%;
    height: 80%;
    float: right;
    min-width: 600px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a; 
}
 
::-webkit-scrollbar-thumb {
  background: #595959; 
}

::-webkit-scrollbar-thumb:hover {
  background: #9d9d9d; 
}
.class:hover {
  background-color: #3b3b3b;
  border-radius: 5px;
  color: white;
}
.class:hover .button{
  background-image: url('./icons/play.png');
}
.button{
  height: 20px;
  width: 20px;
  position: relative;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
}
#played_start{
  background-image: url('./icons/stop.png');
}
#played_stop{
  background-image: url('./icons/play.png');
}


</style>