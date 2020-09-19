<template>
  <div class="myMap">
    <div id="mapContainer" class="mapContainer"></div>
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import { pointData } from "../assets/data/pointData";

export default {
  data() {
    return {
      map: {},
      dangerpointLayer: [],
      safepointLayer: [],
      icons: {},
      infoWindow: {},
      currentPoint: {},
      currentPointDom: {}
    };
  },
  computed: {
    dangerpointData() {
      return pointData.filter(function(item) {
        return item.isDangerous == true;
      });
    },
    safepointData() {
      return pointData.filter(function(item) {
        return item.isDangerous == false;
      });
    }
  },
  methods: {
    init() {
      this.createMap();
      this.initIcons("danger");
      this.initIcons("safe");
      this.initIcons("warning");
      this.initInfoWindow();

      this.creatMarkerPointLayer(
        this.dangerpointData,
        this.dangerpointLayer,
        "danger"
      );
      this.creatMarkerPointLayer(
        this.safepointData,
        this.safepointLayer,
        "safe"
      );
      this.initInfoWindowDom();
    },
    // 初始化地图
    createMap() {
      this.map = new AMap.Map("mapContainer", {
        center: [pointData[0].longitude, pointData[0].latitude],
        layers: [
          //使用多个图层
          new AMap.TileLayer.Satellite()
          // new AMap.TileLayer.RoadNet({
          //   opacity: 0.5
          // })
        ],
        resizeEnable: true,
        zooms: [4, 14], //设置地图级别范围
        zoom: 14
      });
    },
    // 初始化图标
    initIcons(name) {
      this.icons[name] = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(40, 40),
        // 图标的取图地址
        image: require(`../assets/img/${name}.png`),
        // 图标所用图片大小
        imageSize: new AMap.Size(40, 40)
      });
    },
    // 初始化信息弹框
    initInfoWindow() {
      this.infoWindow = new AMap.InfoWindow({
        //信息窗体锚点
        anchor: "middle-left",
        //信息窗体显示位置偏移量
        offset: new AMap.Pixel(15, -15),
        //信息窗体关闭时，是否将其Dom元素从页面中移除，默认为false
        retainWhenClose: true,
        // size: new AMap.Size(66, 66),
        //控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
        closeWhenClickMap: false
      });
    },
    // 初始化信息弹框的dom对象,否则第一次点击无法绑定事件
    initInfoWindowDom() {
      // this.infoWindow.setContent(this.dangerpointLayer[0].content);
      this.infoWindow.open(this.map, this.dangerpointLayer[0].getPosition());
      this.infoWindow.close();
      // setTimeout(() => {
      //   this.infoWindow.close();
      // }, 0);
    },
    // 创建pointdata的点图层
    creatMarkerPointLayer(pointdata, layer, iconName) {
      for (let i = 0; i < pointdata.length; i++) {
        let marker = new AMap.Marker({
          position: [pointdata[i].longitude, pointdata[i].latitude],
          map: this.map,
          icon: this.icons[iconName]
        });
        let tempString = "disabled";
        if (iconName == "danger") {
          marker.setAnimation("AMAP_ANIMATION_BOUNCE");
          marker.alarmisdisable = true;
          tempString = "";
        }

        marker.content = ` <div class="infoWindow">点位id: ${pointdata[i].id},<br />是否危险: false,<br />预览图:<br /><img src="http://placehold.it/100x100" alt="预览图XX" />,<br />危险等级: 7,<br />设备名: "Phillips Mcclure",<br />描述: "5f64a 13e074 28299b8ec125d",<br />更新时间: "2016-08-16T03:07:44 -08:00",<br />纬度: 24.697974, 经度: 108.078387<br /><button ${tempString} type="button" class="alarm">预警</button></div>`;
        // 可用来加文字;
        // marker.setLabel({
        //   offset: new AMap.Pixel(0, -4), //设置文本标注偏移量
        //   content: "<div class='info'>" + pointdata[i].name + "</div>", //设置文本标注内容
        //   direction: "bottom" //设置文本标注方位
        // });
        marker.on("click", this.markerClick);

        layer.push(marker);
      }
    },
    //  点击marker触发的回调函数
    markerClick(e) {
      this.currentPoint = e.target;
      this.infoWindow.open(this.map, e.target.getPosition());
      this.infoWindow.setContent(e.target.content);
      this.currentPointDom = document.querySelector(".alarm");
      this.currentPointDom.addEventListener("click", this.handleAlarm);
    },
    // 处理点击预警按钮事件
    handleAlarm() {
      this.$message({
        message: "预警发送成功",
        type: "success"
      });
      this.currentPoint.setIcon(this.icons.warning);
      this.currentPoint.setAnimation();
      this.currentPointDom.setAttribute("disabled", "disabled");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.myMap {
  height: calc(100% - 61px);
  .mapContainer {
    height: 100%;
  }
  /deep/ .infoWindow {
    padding: 10px;
    line-height: 20px;
    .alarm {
      display: block;
      margin-top: 10px;
      font-weight: 400;
      white-space: nowrap;
      text-align: center;
      background-image: none;
      border: 1px solid transparent;
      cursor: pointer;
      height: 32px;
      padding: 0 15px;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #d81e06;
      border-color: #ff5a44;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    }
    .alarm[disabled] {
      pointer-events: none;
      cursor: not-allowed;
      filter: alpha(opacity=65);
      -webkit-box-shadow: none;
      box-shadow: none;
      opacity: 0.65;
    }
  }
}
</style>
