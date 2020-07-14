<template>
  <v-container>
    <transition-group @enter="enter" @leave="leave" :css="false">
      <v-card v-for="(d,i) in cards" :key="d.id" :id="d.id" outlined>
        <v-card-text>
          <p>{{d.content}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItem(i)">删除</v-btn>
        </v-card-actions>
      </v-card>
    </transition-group>
  </v-container>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      cards: [
        {
          id: "a",
          content: "haha"
        },
        {
          id: "b",
          content: "hehe"
        }
      ]
    };
  },
  methods: {
    deleteItem(index) {
      this.cards.splice(index, 1);
    },
    enter(el, done) {
      gsap.from(`#${el.id}`, {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        onComplete: done
      });
    },
    leave(el, done) {
      gsap.to(`#${el.id}`, {
        y: 50,
        opacity: 0,
        stagger: {
          from: "end",
          amount: 0.15
        },
        duration: 0.45,
        onComplete: done
      });
    }
  }
};
</script>

<style scoped>
</style>