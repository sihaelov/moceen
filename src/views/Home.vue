<template>
  <div class="main">

    <header>
      <!--
      <div>
        <a href="#" class="twitter">
          <i class="fab fa-twitter"></i> Tweet
        </a>

        <a href="#" class="facebook">
          <i class="fab fa-facebook"></i> Share
        </a>
      </div>
      -->

      <a href="https://github.com/sihaelov/moceen" target="_blank" class="header__github">
        Github
      </a>
    </header>

    <div class="steps">
      <template v-for="(step, index) in stepList">

        <div :key="`step-${step.title}`" :class="stepClassObject(index)" @click="changeStep(index)">
          <i :class="step.icon"></i> {{step.title}}
        </div>

        <i
          v-if="index < stepList.length - 1"
          :key="`arrow-${step.title}`"
          class="el-icon-arrow-right"></i>

      </template>
    </div> <!-- ./steps -->

    <DeviceListScreen
      v-if="currentStep == 0"
      :sizeList="sizeList"
      v-on:select-device="selectDevice"
    />

    <UploadScreen
      v-if="currentStep == 1"
      :imageUrl.sync="imageUrl"
      v-on:handle-loaded-image="handleLoadedImage"
      v-on:handle-pasted-image-url="currentStep = 2"
    />

    <PreviewScreen
      v-if="currentStep == 2"
      :imageUrl="imageUrl"
      :currentDevice="currentDevice"
      :sizeList="sizeList"
    />

    <el-card class="email-form">

      <h2>Newsletter</h2>
      <p>We don't spam! Sign up to stay updated about new cool features and improvements.</p>

      <form
        action="https://netlify.us12.list-manage.com/subscribe/post?u=cfc1db907411753d1b2ac8fb5&amp;id=68d4d95445"
        method="post" target="_blank"
      >
        <el-input
          placeholder="Your email" :model="emailFormValue"
          name="EMAIL" type="email" required></el-input>

        <el-button type="primary" native-type="submit">Subscribe</el-button>
      </form>

      <p class="email-form__footer">
        Make sure to <a href="https://twitter.com/sihaelov" target="_blank">follow me on Twitter</a> too!
      </p>
    </el-card>

    <footer>
      <p>Made by Michael Sinov</p>
      <p class="social-links">
        <a href="https://twitter.com/sihaelov" target="_blank" class="twitter">
          <i class="fab fa-twitter-square"></i>
        </a>
        <a href="https://github.com/sihaelov" target="_blank" class="github">
          <i class="fab fa-github-square"></i>
        </a>
      </p>
      <p><a href="mailto:sihaelov@gmail.com">Hire me</a></p>
    </footer>

  </div> <!-- /.main -->
</template>

<script>
import DeviceListScreen from '@/components/DeviceListScreen.vue';
import UploadScreen from '@/components/UploadScreen.vue';
import PreviewScreen from '@/components/PreviewScreen.vue';

import Vue from 'vue';
import { Button, Card, Input, Loading, Notification } from 'element-ui';

Vue.use(Loading.directive);
Vue.prototype.$notify = Notification;

// https://github.com/vuejs/vue/issues/1988
export default {
  name: 'home',
  components: {
    DeviceListScreen,
    UploadScreen,
    PreviewScreen,
    'el-button': Button,
    'el-card': Card,
    'el-input': Input,
  },
  data() {
    return {
      stepList: [
        {
          title: 'Select a device',
          icon: 'el-icon-edit',
        },
        {
          title: 'Upload your image',
          icon: 'el-icon-upload',
        },
        {
          title: 'Get a beautiful image',
          icon: 'el-icon-picture',
        },
      ],
      emailFormValue: null,
      currentStep: 0,
      currentDevice: null,
      imageUrl: null,
      sizeList: {
        browser: {
          top: '20px',
          bottom: '0%',
          left: '0%',
          right: '0%',
        },
        iphone_x: {
          top: '6.4%',
          bottom: '7.4%',
          left: '10%',
          right: '9.9%',
        },
        iphone_8_plus: {
          top: '13.1%',
          bottom: '14.1%',
          left: '12.2%',
          right: '12.2%',
        },
        galaxy_s8: {
          top: '8.8%',
          bottom: '9.7%',
          left: '6.1%',
          right: '6.1%',
        },
        iphone_se: {
          top: '16.4%',
          bottom: '17.3%',
          left: '11.8%',
          right: '11.8%',
        },
        imac: {
          top: '6.5%',
          bottom: '32.8%',
          left: '4%',
          right: '4%',
        },
        macbook_air: {
          top: '8.7%',
          bottom: '15.7%',
          left: '13.3%',
          right: '13.2%',
        },
        macbook_pro: {
          top: '7.6%',
          bottom: '14%',
          left: '11.9%',
          right: '11.6%',
        },
        ipad_air_2: {
          top: '10.6%',
          bottom: '11.6%',
          left: '8.6%',
          right: '8.6%',
        },
      }, // sizeList
    };
  }, // data
  methods: {
    selectDevice(device) {
      this.currentStep = 1;
      this.currentDevice = device;
    },
    handleLoadedImage(files) {
      if (files.length > 1) {
        return;
      }
      const file = files[0];

      if (!file.type.startsWith('image/')) {
        return;
      }

      this.imageUrl = window.URL.createObjectURL(file);
      this.currentStep = 2;
    },
    stepClassObject(step) {
      return {
        'is-process': this.currentStep === step,
        'is-finish': this.currentStep > step,
      };
    },
    changeStep(newStep) {
      if (this.currentStep > newStep) {
        this.currentStep = newStep;
      }
    },
  }, // methods
};
</script>

<style>

.main{
}

header{
  margin-left: 20px;
}

header a{
  color: rgba(0, 0, 0, 0.8);
}

header a:hover{
  color: rgba(0, 0, 0, 0.5);
}

.header__github{
  display: block;
  background-color: #000;
  transform: rotateZ(30deg);
  text-align: center;
  font-weight: 600;
  line-height: 30px;
  position: absolute;
  color: #fff;

  height: 30px;
  width: 200px;
  right: -30px;
  top: 20px;
}

.header__github:hover{
  color: rgba(255, 255, 255, 0.95);
}

header a.facebook{
  margin-left: 15px;
}

.facebook i.fab{
  color: #3b5998;
}

.twitter i.fab{
  color: #1da1f2;
}

.github i.fab{
  color: #000;
}

.steps{
  background: #eef1f6;
  padding: 13px 60px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: 40px auto 50px;
  font-size: 16px;
  line-height: 20px;
}

.steps > div{
  color: rgba(0, 0, 0, 0.25);
  position: relative;
}

.steps > div.is-finish:hover{
  cursor: pointer;
  color: #94989e;
}

.steps > i.el-icon-arrow-right{
  font-size: 20px;
  color: hsla(220, 11%, 65%, 1);
}

.steps > div i{
  margin-right: 5px;
}

.steps > div.is-process{
  font-weight: 700;
  color: #303133;
}

.steps > div.is-finish{
  font-weight: 700;
  color: rgba(0, 0, 0, 0.4);
}

.email-form{
  max-width: 400px;
  margin: auto;
  margin-top: 80px;
}

.email-form > .el-card__body{
  padding-bottom: 15px;
}

.email-form h2{
  margin: 0;
}

.email-form p{
  line-height: 21px;
  margin: 10px 0 20px;
}

p.email-form__footer{
  margin: 0;
  margin-top: 25px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
}

.email-form form{
  display: flex;
}

.email-form form input{
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.email-form form button{
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

footer{
  margin: 70px 0px 40px;
  text-align: center;
}

footer p{
  margin: 5px 0;
}

footer .social-links a{
  display: inline-block;
  margin: 0 5px;
  font-size: 30px;
}

footer .social-links a:hover{
  opacity: 0.7;
}

/* BASE */
.device__content__image{
  position: absolute;
}

.device__content__image img{
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}


.browser-mockup{
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.browser-mockup__header{
  background-color: #e8e8ea;
  display: flex;
  height: 20px;
  align-items: center;
  padding-left: 10px;

  background: linear-gradient(#e1e1e1, #d1d1d1);
}

.browser-mockup__header__button{
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
}

.browser-mockup__header__button:nth-child(1){
  background-color: #e8695e;
}

.browser-mockup__header__button:nth-child(2){
  background-color: #f1c630;
}

.browser-mockup__header__button:nth-child(3){
  background-color: #61ca47;
}

/* BASE */

</style>
