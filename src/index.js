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
        isSuccessive: false,
        paused: true
    },
    methods: {
        buildSentence(item) {
            let str = '';
            item.words.forEach(word => {
                if (word.furigana) {
                    str += `<ruby>${word.moji}<rt>${word.furigana}</rt></ruby>`
                } else {
                    str += `<span>${word.moji}</span>`
                }
            })
            return str;
        },
        play(index) {
            if (!this.paused){
                this.pauseSentence();
            }
            this.speak(index);
        },
        toggleSuccessive(){
            this.isSuccessive = !this.isSuccessive;
        },
        isSpeaking(index) {
            return index === this.playIndex;
        },
        speak(index){
            index |= this.playIndex;
            this.paused = false;
            this.playIndex = index;
            if(this.isSuccessive){
                this.speakSuccessive();
            } else {
                speaker.speak(index === -1 ? this.title[0].content : this.content[index].content);
            }
        },
        speakSuccessive(){
            let self = this;
            console.log('speak all sentences !');

            speaker.speak(this.content[this.playIndex].content);
            speaker.onend(function () {
                if(self.paused){
                    // noop
                    return;
                }
                if (self.playIndex < self.content.length - 1) {
                    setTimeout(() => {
                        self.speakSuccessive()
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