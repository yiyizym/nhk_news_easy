import Vue from 'vue';
import posts from './posts'
import { parse } from './parser'
import { build } from './builder'
import speaker from './speaker'

const vue = new Vue({
  el: '#app',
  template: '#template',
  data: {
    posts: parse(posts),
    currentPost: null,
    playIndex: 0,
    isSuccessive: false,
    paused: true,
    mode: 'list'
  },
  methods: {
    showPost(index) {
      this.currentPost = this.posts[index];
      console.log('currentPost: ', this.currentPost);
      
      this.mode = 'post';
    },
    backToList(){
      this.pauseSentence();
      this.currentPost = null;
      this.mode = 'list';
    },
    buildSentence(sentence) {
      return build(sentence);
    },
    play(index) {
      if (!this.paused) {
        this.pauseSentence();
      }
      this.speak(index);
    },
    toggleSuccessive() {
      this.isSuccessive = !this.isSuccessive;
    },
    isSpeaking(index) {
      return index === this.playIndex;
    },
    speak(index) {
      index = index || this.playIndex;
      this.paused = false;
      this.playIndex = index;
      let content = this.currentPost.content;
      if (this.isSuccessive) {
        this.speakSuccessive();
      } else {
        speaker.speak(content[index].text);
      }
    },
    speakSuccessive() {
      let self = this, content = this.currentPost.content;;

      speaker.speak(content[this.playIndex].text);
      speaker.onend(function () {
        if (self.paused) {
          // noop
          return;
        }
        if (self.playIndex < content.length - 1) {
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
    pauseSentence() {
      this.paused = true
      speaker.cancel();
    },
    continueSentence() {
      this.paused = false
      this.speakSuccessive();
    }
  }
});