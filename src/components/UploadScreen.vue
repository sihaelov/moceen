<template>
  <el-tabs class="upload-screen">

    <el-tab-pane label="Local Files">
      <el-card
        v-on:dragenter.native="$event.preventDefault()"
        v-on:dragover.native="$event.preventDefault()"
        v-on:drop.native="handleDrop($event)"
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

    <el-tab-pane label="Direct Link">
      <el-card>
        <el-input
          :value="imageUrl" placeholder="Paste your link here..."
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
    };
  }, // data
  methods: {
    handleDrop($event) {
      $event.preventDefault();
      const { files } = $event.dataTransfer;
      this.$emit('handle-loaded-image', files);
    },
  }, // methods
};
</script>

<style>

.upload-screen{
  width: 400px;
  margin: auto;
  margin-bottom: 50px;
}

.upload-screen .el-tabs__content{
  overflow: visible;
}

.upload-screen .el-tabs__content .el-card{
  text-align: center;
  padding: 5px 0;
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

</style>
