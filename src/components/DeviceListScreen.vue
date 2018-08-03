<template>
  <div class="device-list-screen">

    <div class="device-list-screen__row">
      <h2>Responsive</h2>
      <el-card
        class="device-list-screen__device-preview"
        v-on:click.native="$emit('select-device', { slug: 'browser' })"
      >
        <div class="browser-mockup">
          <div class="browser-mockup__header">
            <div class="browser-mockup__header__button"></div>
            <div class="browser-mockup__header__button"></div>
            <div class="browser-mockup__header__button"></div>
          </div>
        </div>
      </el-card>
    </div> <!-- /.device-list-screen__row -->

    <div class="device-list-screen__row">
      <h2>Static</h2>
      <p>
        Note: all devices were created
        <a href="https://facebook.design/devices" target="_blank">by Facebook</a>
      </p>
      <el-card
        class="device-list-screen__device-preview"
        v-for="device in deviceList"
        :key="device.slug"
        v-on:click.native="$emit('select-device', device)"
        :title="device.image"
      >
        <img :src="require(`@/assets/devices/${device.type}/${device.image}`)" />
        <div class="device__content__image" :style="sizeList[device.slug]"></div>
      </el-card>
    </div> <!-- /.device-list-screen__row -->

  </div> <!-- /.device-list-screen -->
</template>

<script>

import { Card } from 'element-ui';

export default {
  name: 'DeviceListScreen',
  components: {
    'el-card': Card,
  },
  props: {
    sizeList: Object,
  },
  data() {
    return {
      deviceList: [
        {
          image: 'Apple iPhone X Space Grey.png',
          slug: 'iphone_x',
          type: 'phones',
        },
        {
          image: 'Apple iPhone 8 Plus Silver.png',
          slug: 'iphone_8_plus',
          type: 'phones',
        },
        {
          image: 'Samsung Galaxy S8 Arctic Silver.png',
          slug: 'galaxy_s8',
          type: 'phones',
        },
        {
          image: 'Apple iPhone SE Silver.png',
          slug: 'iphone_se',
          type: 'phones',
        },
        {
          image: 'Apple iMac.png',
          slug: 'imac',
          type: 'computers',
        },
        {
          image: 'Apple Macbook Air 13.png',
          slug: 'macbook_air',
          type: 'computers',
        },
        {
          image: 'Apple Macbook Pro 15.png',
          slug: 'macbook_pro',
          type: 'computers',
        },
        {
          image: 'Apple iPad Air 2 Silver.png',
          slug: 'ipad_air_2',
          type: 'tablets',
        },
      ], // deviceList
    };
  }, // data
};
</script>

<style>

.device-list-screen{
  max-width: 1100px;
  margin: auto;
}

.device-list-screen__row{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  justify-content: space-between;
}

.device-list-screen__row > h2{
  width: 100%;
  margin: 0;
  font-size: 24px;
}

.device-list-screen__row > p{
  width: 100%;
  margin-bottom: 0;
  margin-top: 10px;
}

.device-list-screen__device-preview{
  height: 300px;
  width: 250px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
}

.device-list-screen__device-preview .el-card__body{
  position: relative;
  padding: 0;
}

.device-list-screen__device-preview:hover{
  box-shadow: 0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12),
              0 5px 5px -3px rgba(0,0,0,0.2);
}

.device-list-screen__device-preview img{
  max-height: 250px;
  max-width: 200px;
  z-index: 2;
  position: relative;
}

.device-list-screen .device__content__image,
.device-list-screen .browser-mockup{
  background: #eee;
}

.device-list-screen .browser-mockup{
  height: 250px;
  width: 200px;
}

@media(max-width: 1170px){
  .device-list-screen{
    padding: 0 30px;
  }

  .device-list-screen__row{
    justify-content: center;
    text-align: center;
  }

  .device-list-screen__device-preview{
    width: 230px;
    height: 280px;
    margin-right: 8px;
    margin-left: 8px;
  }

  .device-list-screen__device-preview img{
    max-width: 180px;
    max-height: 230px;
  }
}


</style>
