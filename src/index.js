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
            console.log('speak all');

            speaker.speak(this.content[this.playIndex].content);
            speaker.onend(function () {
                if (this.playIndex < this.content.length - 1) {
                    setTimeout(() => {
                        this.speakAll()
                    }, 500);
                }
                this.playIndex++
            })
        }
    }
});