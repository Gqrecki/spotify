<template>
  <div>
  <div id="control">
    <div id="piosenka">
          <p>{{piosenka}}</p>
      </div>
      <div id="block">
        <audio id="audio" controls @timeupdate="change()">
        <source src=""
                id="audio_src"
                type="audio/mp3" />
        </audio>
      <div id="noleft" v-on:click="prev">
      </div>
      <div id="center1" v-on:click="play">
      </div>
      <div id="noright" v-on:click="next">
      </div>
      </div>
      <div id="time">
        <p id="now">0:00</p>
        <div id="timer"></div>
        <p id="max">0:00</p>
        </div>
        <div>
          <input type="range" id="music" name="music"
          min="0" max="100" value="0" @input="music()">
        </div>
        <div>
          <img id="speaker" src="./icons/speaker.png">
          <input type="range" id="volume" name="volume"
          min="0" max="100" value="50" @input="volume()">
        </div>
    </div>
  </div>
</template>

<script>
export default{
  computed:{
    data(){
      return this.$store.getters.countGetter
    },
    piosenka(){
      return this.$store.getters.ThissongGetter
    },
    div(){
      return this.$store.getters.DivGetter
    }
  },
    methods: {
      music: function(){
       document.getElementById("audio").currentTime = (parseInt(document.getElementById("music").value)/100) * document.getElementById("audio").duration
      },
      volume: function(){
        document.getElementById("audio").volume = parseInt(document.getElementById("volume").value)/100
      },
      change: function(){
        document.getElementById("music").value = Math.round((document.getElementById("audio").currentTime / document.getElementById("audio").duration)*100)
        if(this.div.parentElement.nextSibling == null){
          if(document.getElementById("right") != null){
          document.getElementById("right").id = "noright"}
        }else{
          if(document.getElementById("noright") != null){
          document.getElementById("noright").id = "right"}
        }
        if(this.div.parentElement.previousSibling == null){
          if(document.getElementById("left") != null){
          document.getElementById("left").id = "noleft"}
        }else{
          if(document.getElementById("noleft") != null){
          document.getElementById("noleft").id = "left"}
        }
        var s = Math.floor(document.getElementById("audio").duration)
        document.getElementById('max').innerText = (s-(s%=60))/60+(9<s?':':':0')+s
        var s2 = Math.floor(document.getElementById("audio").currentTime)
        document.getElementById('now').innerText = (s2-(s2%=60))/60+(9<s2?':':':0')+s2
        if(this.div.parentElement.nextSibling != null){
        document.getElementById("audio").onended = this.next
        }else{
        document.getElementById("audio").onended = this.end
        }
      },
      play: function() {
        if(this.data != 0){
        if(event.target.id == "center1"){
        document.getElementById("audio").play()
        this.$store.dispatch('updateCounter', 1)
        document.getElementById("center1").id = "center2"
        document.getElementById("played_stop").id = "played_start"
        }else if(event.target.id == "center2"){
        document.getElementById("audio").pause()
        this.$store.dispatch('updateCounter', 2)
        document.getElementById("center2").id = "center1"
        document.getElementById("played_start").id = "played_stop"
        }
        }
      },
      prev: function(){
        if(this.data != 0){
        if(this.div.parentElement.previousSibling != null){
        var qwe = this.div.parentElement.previousSibling.firstChild
        this.$store.dispatch('updateDiv', qwe)
        this.$store.dispatch('updateThissong', qwe.parentElement.getAttribute('name'))
        if(document.getElementById("played_stop") != null){
          document.getElementById("played_stop").id = ""
        }
        if(document.getElementById("played_start") != null){
          document.getElementById("played_start").id = ""
        }
        document.getElementById("audio_src").src = "http://localhost:3000/static/mp3/" + this.$store.getters.sampleGetter.thisdir + "/" + qwe.parentElement.getAttribute('name')
        document.getElementById("audio").load();
        document.getElementById("audio").play()
        .then(qwe.id = "played_start")
        this.$store.dispatch('updateCounter', 2)
        if(document.getElementById("center1") != null){
        document.getElementById("center1").id = "center2"}
      }
      }
      },
      next: function(){
        if(this.data != 0){
        if(this.div.parentElement.nextSibling != null){
        var qwe = this.div.parentElement.nextSibling.firstChild
        this.$store.dispatch('updateDiv', qwe)
        this.$store.dispatch('updateThissong', qwe.parentElement.getAttribute('name'))
        if(document.getElementById("played_stop") != null){
          document.getElementById("played_stop").id = ""
        }
        if(document.getElementById("played_start") != null){
          document.getElementById("played_start").id = ""
        }
        document.getElementById("audio_src").src = "http://localhost:3000/static/mp3/" + this.$store.getters.sampleGetter.thisdir + "/" + qwe.parentElement.getAttribute('name')
        document.getElementById("audio").load();
        document.getElementById("audio").play()
        .then(qwe.id = "played_start")
        this.$store.dispatch('updateCounter', 2)
        if(document.getElementById("center1") != null){
        document.getElementById("center1").id = "center2"}
      }
      }
      },
      end: function(){
        setTimeout(function(){
        if(document.getElementById("right") != null){
        document.getElementById("right").id = "noright"}
        if(document.getElementById("left") != null){
        document.getElementById("left").id = "noleft"}
        },50)
        document.getElementById("audio").pause()
        setTimeout(function(){ document.getElementById('max').innerText = "0:00"; }, 50);
        setTimeout(function(){ document.getElementById('now').innerText = "0:00"; }, 50);
        this.$store.dispatch('updateThissong', '')
        this.$store.dispatch('updateCounter', 0)
        if(document.getElementById("played_stop") != null){
          document.getElementById("played_stop").id = ""
        }
        if(document.getElementById("played_start") != null){
          document.getElementById("played_start").id = ""
        }
        document.getElementById("center2").id = "center1"
      }
    }
}

</script>

<style>
#piosenka {
  position: absolute;
  left: 5%;
  font-size: 20px;
  top: 5px;

}
#piosenka p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30vw;
}

#control{
  position: relative;
  width: 100%;
  height: 100px;
  background-color: #232323;
  color: white;
  position: fixed;
  left: 0;
  bottom: 0;
}
#block{
  text-align: center;
}
#left{
  margin-bottom: 10px;
  display:inline-block;
  height: 20px;
  width: 20px;
  background-image: url('./icons/next_left.png');
}
#noleft{
  margin-bottom: 10px;
  display:inline-block;
  height: 20px;
  width: 20px;
  background-image: url('./icons/next_left.png');
}
#right{
  margin-bottom: 10px;
  display:inline-block;
  height: 20px;
  width: 20px;
  background-image: url('./icons/next_right.png');
}
#noright{
  margin-bottom: 10px;
  display:inline-block;
  height: 20px;
  width: 20px;
  background-image: url('./icons/next_right.png');
}
#left:hover{
  background-image: url('./icons/next_left_press.png');
}
#right:hover{
  background-image: url('./icons/next_right_press.png');
}
#center1{
  display:inline-block;
  margin-top: 15px;
  margin-right: 10px;
  margin-left: 10px;
  height: 40px;
  width: 40px;
  background-image: url('./icons/big_play.png');
}
#center2{
  display:inline-block;
  margin-top: 15px;
  margin-right: 10px;
  margin-left: 10px;
  height: 40px;
  width: 40px;
  background-image: url('./icons/big_stop.png');
}
#audio{
  display: none;
}
#timer{
  position: absolute;
  width: 298px;
  height: 7px;
  background-color: #535353;
  left: 50%;
  top: 70%;
  transform: translateX(-50%);
  border-radius: 5px;
}
#now{
  color: #c2c2c2;
  left: calc(50% - 190px);
  bottom: 10px;
}
#max{
  color: #c2c2c2;
  left: calc(50% + 130px);
  bottom: 10px;
}
#music {
  position: absolute;
  left: 50%;
  top: 68%;
  transform: translateX(-51%);
  width: 300px;
  height: 7px;
  -webkit-appearance: none;
  background: #696969;
  outline: none;
  border-radius: 7px;
  overflow: hidden;
}
#music::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c2c2c2;
  cursor: pointer;
  box-shadow: -404px 0 0 400px #c2c2c2;
}
#volume {
  position: absolute;
  left: calc(95% - 120px);
  top: 30px;
  width: 120px;
  height: 7px;
  -webkit-appearance: none;
  background: #696969;
  outline: none;
  border-radius: 7px;
  overflow: hidden;
}
#volume::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c2c2c2;
  cursor: pointer;
  box-shadow: -404px 0 0 400px #c2c2c2;
}
#speaker{
  position: absolute;
  left: calc(95% - 150px);
  top: 25px;
  width: 20px;
  height: 20px;
}

</style>
