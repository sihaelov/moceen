<template>
  <el-tabs class="upload-screen">

    <el-tab-pane label="Local Files">
      <el-card
        v-on:dragover.native.prevent="isDragOver = true"
        v-on:dragleave.native.prevent="isDragOver = false"
        v-on:drop.native.prevent="handleDrop($event)"
        :class="{ 'is-dragover': isDragOver }"
      >
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          style="display:none"
          v-on:change="$emit('handle-loaded-image', $event.target.files)"
        />
        <span><b>Drag & drop your image here</b></span>
        <p>or</p>
        <el-button type="primary" @click="$refs.fileInput.click()">Browse</el-button>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="Direct Link" disabled>
      <el-card>
        <el-input
          :value="imageUrl" placeholder="Paste your link to an image here..."
          @input="$emit('update:imageUrl', $event)"
        >
          <el-button slot="append" icon="el-icon-upload"
            @click="$emit('handle-pasted-image-url')" />
        </el-input>
      </el-card>
    </el-tab-pane>

    <el-card v-if="lastImageUrl" class="upload-screen__preview-last-image">
      <img :src="lastImageUrl" />
      <el-button type="primary" @click="$emit('handle-pasted-image-url')">Continue</el-button>
    </el-card>

    <div v-else class="upload-screen__example-image">
      <p>Or drag the sample image</p>
      <i class="far fa-hand-rock fa-2x"></i>
      <img src="/example.jpeg" title="Drag and drop me onto the widget" />
    </div>

  </el-tabs>
</template>

<script>

import { Card, Tabs, TabPane, Button, Input } from 'element-ui';

export default {
  name: 'UploadScreen',
  components: {
    'el-card': Card,
    'el-tabs': Tabs,
    'el-tab-pane': TabPane,
    'el-button': Button,
    'el-input': Input,
  },
  props: {
    imageUrl: String,
  },
  data() {
    return {
      lastImageUrl: this.imageUrl,
      isDragOver: false,
    };
  }, // data
  methods: {
    handleDrop($event) {
      this.isDragOver = false;

      const imageElement = $event.dataTransfer.getData('text/html');
      if (imageElement) {
        const re = /<img src="(.+\/example.jpeg)" .+>/;
        const reResult = re.exec(imageElement);
        if (reResult.length > 1) {
          const imageUrl = reResult[1];
          this.$emit('update:imageUrl', imageUrl);
          this.$emit('handle-pasted-image-url');
        }
      } else {
        const { files } = $event.dataTransfer;
        this.$emit('handle-loaded-image', files);
      }
    },
  }, // methods
};
</script>

<style>

.upload-screen{
  max-width: 400px;
  margin: auto;
  margin-bottom: 150px;
}

.upload-screen .is-dragover{
  transition: 0.1s;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.6);
}

.upload-screen .el-tabs__content{
  overflow: visible;
}

.upload-screen .el-tabs__content .el-card{
  text-align: center;
  padding: 5px 0;
}

.upload-screen__example-image{
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  color: rgba(0, 0, 0, 0.6);
}

.upload-screen__example-image p{
  color: rgba(0, 0, 0, 0.6);
  width: 100%;
  text-align: center;
}

.upload-screen__example-image img{
  width: 100px;
  cursor: pointer;
  margin-left: 20px;
}

.upload-screen__preview-last-image{
  margin-top: 30px;
}

.upload-screen__preview-last-image .el-card__body{
  padding-bottom: 10px;
}

.upload-screen__preview-last-image img{
  max-width: 100%;
}

.upload-screen__preview-last-image .el-button{
  display: block;
  margin: auto;
  margin-top: 10px;
}

@media(max-width: 450px){
  .upload-screen{
    padding: 0 10px;
  }
}

</style>
