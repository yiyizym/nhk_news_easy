import Vue from 'vue';
import data from './data'
import parser from './parser'
import speaker from './speaker'

const vue = new Vue({
    el: '#app',
    template: '#template',
    data: {
        title: parser(data.title),
        content: parser(data.content),
        playIndex: 0,
        paused: false
    },
    methods: {
        toggle(index) {
            if (speaker.isSpeaking()){
                console.log('speaking');

                if(speaker.isPaused()){
                    console.log('resume');
                    speaker.resume();
                } else {
                    console.log('pause');
                    speaker.pause();
                }
            } else {
                console.log('speak');
                speaker.speak(index === -1 ? this.title[0].content : this.content[index].content);
            }
        },
        speakAll(){
            let self = this;
            console.log('speak all');

            speaker.speak(this.content[this.playIndex].content);
            speaker.onend(function () {
                if(self.paused){
                    // noop
                    return;
                }
                if (self.playIndex < self.content.length - 1) {
                    setTimeout(() => {
                        self.speakAll()
                    }, 500);
                    self.playIndex++
                } else {
                    self.playIndex = 0
                    self.paused = false
                }
            })
        },
        pauseSentence(){
            this.paused = true
            speaker.cancel();
        },
        continueSentence(){
            this.paused = false
            this.speakAll();
        }
    }
});