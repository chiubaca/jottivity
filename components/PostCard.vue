<template>
  <div class="post">
    {{ index }}
    <h1>{{ post.title }}</h1>
    Date: {{ post.createdAt }}

    <button @click="$emit('delete-post', { index, postId: post.postId })">
      Delete Post
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { JPost } from "@/types";

@Component
export default class PostCard extends Vue {
  @Prop({ required: true }) readonly post!: JPost;
  @Prop({ required: true }) readonly index!: JPost;
}
</script>

<style scoped>
.post {
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
}
</style>
