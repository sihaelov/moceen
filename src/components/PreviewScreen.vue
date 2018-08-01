<template>
  <div class="preview-screen">

    <div class="preview-screen__header">

      <div class="preview-screen__options">
        <el-radio-group v-model="imageScaleMode" :disabled="this.currentDevice.slug === 'browser'">
          <el-radio-button label="Resize"></el-radio-button>
          <el-radio-button label="Crop"></el-radio-button>
        </el-radio-group>

        <el-button type="primary" @click="download">Download</el-button>
      </div> <!-- /.preview-screen__options -->

      <div class="preview-screen__palette">
        <el-color-picker v-model="currentColor" @change="changeColor"></el-color-picker>

        <div
          v-for="color in colorList"
          :key="color"
          :style="{ backgroundColor: color }"
          :class="{ active: currentColor == color }"
          @click="currentColor = color;"
          ></div>
      </div> <!-- /.preview-screen__palette -->

    </div> <!-- /.preview-screen__header -->

    <div class="preview-screen__content-wrapper" ref="screen"
      :style="{ backgroundColor: currentColor }"
    >
      <div class="preview-screen__content">

        <div v-if="currentDevice.slug === 'browser' "
          class="browser-mockup preview-screen__content__mockup"
          :style="{ width: imageWidth + 'px', height: imageHeight + 20 + 'px' }"
        >
          <div class="browser-mockup__header">
            <div class="browser-mockup__header__button"></div>
            <div class="browser-mockup__header__button"></div>
            <div class="browser-mockup__header__button"></div>
          </div>
        </div>
        <img
          v-else
          class="preview-screen__content__mockup"
          :src="require(`@/assets/devices/${currentDevice.type}/${currentDevice.image}`)"
        />


        <div class="device__content__image" :style="sizeList[currentDevice.slug]">
          <img
            :src="imageUrl"
            :style="{ objectFit: imageScaleMode == 'Crop' ? 'cover' : 'fill' }"
            ref="contentImage" />
        </div>

      </div> <!-- /.preview-screen__content -->
    </div> <!-- /.preview-screen__content-wrapper -->

  </div> <!-- /.preview-screen -->
</template>

<script>

import { Button, RadioGroup, RadioButton, ColorPicker } from 'element-ui';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver/FileSaver';

export default {
  name: 'PreviewScreen',
  components: {
    'el-button': Button,
    'el-radio-group': RadioGroup,
    'el-radio-button': RadioButton,
    'el-color-picker': ColorPicker,
  },
  props: {
    imageUrl: String,
    currentDevice: Object,
    sizeList: Object,
  },
  data() {
    return {
      imageScaleMode: this.currentDevice.slug === 'browser' ? 'Resize' : 'Crop',
      currentColor: 'rgb(226, 243, 249)',
      colorList: [
        'rgb(226, 243, 249)',
        // 'rgb(26, 188, 156)',
        'rgb(46, 204, 113)',
        'rgb(52, 152, 219)',
        'rgb(155, 89, 182)',
        'rgb(52, 73, 94)',
        'rgb(241, 196, 15)',
        'rgb(230, 126, 34)',
        'rgb(231, 76, 60)',
      ],
      imageWidth: null,
      imageHeight: null,
    };
  }, // data
  methods: {
    download() {
      html2canvas(this.$refs.screen).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, 'screen.png');
        });
      });
    },
    changeColor(color) {
      this.colorList.pop();
      this.colorList.unshift(color);
    },
  }, // methods
  mounted() {
    if (this.currentDevice.slug === 'browser') {
      const { contentImage } = this.$refs;

      contentImage.onload = () => {
        const imageRatio = contentImage.naturalWidth / contentImage.naturalHeight;
        if (contentImage.naturalWidth >= contentImage.naturalHeight) {
          this.imageWidth = contentImage.naturalWidth < 700 ? contentImage.naturalWidth : 700;
          this.imageHeight = this.imageWidth / imageRatio;
        } else {
          this.imageHeight = contentImage.naturalHeight < 500 ? contentImage.naturalHeight : 500;
          this.imageWidth = imageRatio * this.imageHeight;
        }
      };
    }
  },
};
</script>

<style>

.preview-screen{
  text-align: center;
}

.preview-screen__header{
  width: 500px;
  margin: auto;
}

.preview-screen__options{
  margin: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.preview-screen__palette{
  display: flex;
  margin-bottom: 20px;
}

.preview-screen__palette > div{
  width: 53px;
  height: 53px;
  cursor: pointer;
  transition: 0.1s;
}

.preview-screen__palette > div.active{
  transform: scale(1.15);
  border-radius: 3px;
  z-index: 2;
}

.preview-screen__palette > div:not(.active):not(.el-color-picker):hover{
  transform: scale(0.9);
}

.preview-screen__palette .el-color-picker{
  margin-right: 23px;
}

.preview-screen__palette .el-color-picker:hover{
  background-color: #eee;
}

.preview-screen__palette .el-color-picker__trigger{
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
}

.preview-screen__palette .el-color-picker__color-inner{
  background: none !important;
}

.preview-screen__palette .el-color-picker__trigger .el-color-picker__icon::before{
  content: "+";
  font-size: 30px;
  color: #999;
}

.el-color-dropdown__link-btn{
  display: none;
}

.preview-screen__content-wrapper{
  text-align: center;
  margin: auto;

  /* height: 500px; */
  max-height: 700px;
  max-width: 700px;
  padding: 75px;
  display: inline-flex;

  justify-content: center;
  align-items: center;
}

.preview-screen__content{
  position: relative;
}

.preview-screen__content__mockup{
  max-height: 400px;
  max-width: 400px;
  z-index: 2;
  position: relative;
}

.browser-mockup.preview-screen__content__mockup{
  max-width: none;
  max-height: none;
}

</style>
