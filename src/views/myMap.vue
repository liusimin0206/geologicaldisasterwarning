<template>
  <div class="myMap">
    <div id="mapContainer" class="mapContainer"></div>
    <div class="map-info">
      <div class="search">
        <el-input
          class="input-with-select"
          v-model="searchItem.input"
          placeholder="请输入内容"
          @keyup.enter.native="onSearch"
        >
          <el-select
            v-model="searchItem.select"
            slot="prepend"
            placeholder="请选择"
            class="select-in-input"
          >
            <el-option
              v-for="(item, index) in pointDataKeys"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="onSearch"
          ></el-button>
        </el-input>
      </div>
      <div class="showSearchRes">
        <el-collapse class="collapseTit" v-model="searchItem.activeNames">
          <el-collapse-item
            v-for="(item, i) in searchRes"
            :key="i"
            :title="'检测点id:' + item.id"
            :name="String(i)"
            @click.native="moveToActivePoint(i)"
          >
            点位id: {{ item.id }},<br />
            是否危险: {{ item.isDangerous }},<br />预览图:<br /><img
              src="http://placehold.it/100x100"
              alt="预览图XX"
            />,<br />危险等级: {{ item.dangerLevel }},<br />设备名:
            {{ item.name }},<br />描述: {{ item.about }},<br />更新时间:
            {{ item.update }},<br />纬度:{{ item.latitude }}, 经度:{{
              item.longitude
            }}
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <div class="legend">
      <div class="item">
        <div class="icon safe"></div>
        <div class="title">安全</div>
      </div>
      <div class="item">
        <div class="icon danger"></div>
        <div class="title">危险</div>
      </div>
      <div class="item">
        <div class="icon warning"></div>
        <div class="title">预警</div>
      </div>
      <div class="item">
        <div class="icon res"></div>
        <div class="title">搜索结果</div>
      </div>
      <div class="item">
        <div class="icon active"></div>
        <div class="title">选中</div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
import { pointsData } from "../assets/data/pointsData";
import { en2cn, cn2en } from "../assets/data/cn&enConversion";
export default {
  data() {
    return {
      map: {},
      pointDataKeys: [],
      pointsDataMarkers: [],
      selectedpointLayer: [],
      currentActiveResLayer: [],
      icons: {},
      infoWindow: {},
      currentPoint: {},
      currentPointDom: {},
      searchItem: {
        input: "",
        select: "编号",
        activeNames: []
      },
      searchRes: [],
      currentActiveRes: []
    };
  },
  computed: {},
  methods: {
    init() {
      this.initData();
      this.createMap();
      this.initIcons("danger");
      this.initIcons("safe");
      this.initIcons("warning");
      this.initIcons("selected", 50);
      this.initIcons("active", 50);
      this.initInfoWindow();

      this.creatMarkerPointLayer(pointsData, this.pointsDataMarkers);

      this.initInfoWindowDom();
    },
    // 初始化数据
    initData() {
      this.pointDataKeys = Object.keys(pointsData[0]).map(item => {
        return en2cn[item];
      });
    },
    // 初始化地图
    createMap() {
      this.map = new AMap.Map("mapContainer", {
        center: [pointsData[0].longitude, pointsData[0].latitude],
        layers: [
          //使用多个图层
          new AMap.TileLayer.Satellite()
          // new AMap.TileLayer.RoadNet({
          //   opacity: 0.5
          // })
        ],
        resizeEnable: true,
        zooms: [4, 15], //设置地图级别范围
        zoom: 13
      });
      this.map.on("click", () => {
        if (this.infoWindow.getIsOpen()) {
          this.infoWindow.close();
        }
      });
    },
    // 初始化图标
    initIcons(name, size = 40) {
      this.icons[name] = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(size, size),
        // 图标的取图地址
        image: require(`../assets/img/${name}.png`),
        // 图标所用图片大小
        imageSize: new AMap.Size(size, size)
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
      this.infoWindow.open(this.map, this.pointsDataMarkers[0].getPosition());
      this.infoWindow.close();
      // setTimeout(() => {
      //   this.infoWindow.close();
      // }, 0);
    },
    // 创建pointData的点图层
    creatMarkerPointLayer(pointsdata, layer, iconName, zIndex = 100) {
      for (let i = 0; i < pointsdata.length; i++) {
        let marker = new AMap.Marker({
          position: [pointsdata[i].longitude, pointsdata[i].latitude],
          map: this.map,
          anchor: "center",
          zIndex: zIndex
        });

        marker.pointData = pointsdata[i];
        this.modifyMarker(marker, iconName);

        // 可用来加文字;
        // marker.setLabel({
        //   offset: new AMap.Pixel(0, -4), //设置文本标注偏移量
        //   content: "<div class='info'>" + pointData[i].name + "</div>", //设置文本标注内容
        //   direction: "bottom" //设置文本标注方位
        // });
        if (iconName != "active" && iconName != "selected") {
          marker.on("click", this.markerClick);
        }

        layer.push(marker);
      }
    },
    // 修改marker的相关数据
    setMarkerIcon(marker, iconName) {
      if (iconName) {
        marker.setIcon(this.icons[iconName]);
      } else {
        if (marker.pointData.isDangerous == false) {
          marker.setIcon(this.icons.safe);
        } else {
          if (marker.pointData.isWarning == false) {
            marker.setIcon(this.icons.danger);
          } else {
            marker.setIcon(this.icons.warning);
          }
        }
      }
    },

    setMarkerContent(marker) {
      let tempString = "disabled";

      if (
        marker.pointData.isDangerous == true &&
        marker.pointData.isWarning == false
      ) {
        // marker.setAnimation("AMAP_ANIMATION_BOUNCE");
        tempString = "";
      }
      let picture;
      // picture = `${marker.pointData.picture}`;
      picture = "http://placehold.it/100x100";
      marker.content = `<div class="infoWindow">${en2cn.id}: ${marker.pointData.id},<br />${en2cn.isDangerous}: ${marker.pointData.isDangerous},<br />${en2cn.isWarning}: ${marker.pointData.isWarning},<br />
      ${en2cn.picture}:<br /><img src="${picture}" alt="预览图XX" />,<br />${en2cn.dangerLevel}: ${marker.pointData.dangerLevel},<br />${en2cn.name}: ${marker.pointData.name},<br />
      ${en2cn.about}: ${marker.pointData.about},<br />${en2cn.update}: ${marker.pointData.update},<br />${en2cn.latitude}: ${marker.pointData.latitude}, ${en2cn.longitude}: ${marker.pointData.longitude}<br /><button ${tempString} type="button" class="alarm">预警</button></div>`;
    },
    modifyMarker(marker, iconName) {
      this.setMarkerIcon(marker, iconName);
      this.setMarkerContent(marker);
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
      this.currentPoint.pointData.isWarning = true;
      this.modifyMarker(this.currentPoint);
      this.infoWindow.setContent(this.currentPoint.content);
      // this.currentPoint.setAnimation();
    },
    onSearch() {
      this.searchItem.activeNames = [];
      this.queryData(this.searchItem);
    },
    // 查询数据{input: "11",select: "isDangerous"}
    queryData(searchItem) {
      this.searchRes = [];
      while (this.selectedpointLayer.length > 0) {
        this.selectedpointLayer.pop().setMap(null);
      }
      for (let i = 0; i < this.currentActiveResLayer.length; i++) {
        while (this.currentActiveResLayer[i].length > 0) {
          this.currentActiveResLayer[i].pop().setMap(null);
        }
      }

      // 查询
      for (let i = 0; i < pointsData.length; i++) {
        if (
          String(pointsData[i][cn2en[searchItem.select]]) == searchItem.input
        ) {
          this.searchRes.push(pointsData[i]);
        }
      }
      // 查询结束
      this.creatMarkerPointLayer(
        this.searchRes,
        this.selectedpointLayer,
        "selected",
        80
      );

      this.map.setFitView(
        this.selectedpointLayer,
        false,
        [100, 100, 100, 100],
        14
      );
    },
    moveToActivePoint(i) {
      let isClose = this.searchItem.activeNames.indexOf(String(i)) == -1;
      if (!isClose) {
        this.currentActiveRes = [this.searchRes[i]];
        this.currentActiveResLayer[i] = [];
        this.creatMarkerPointLayer(
          this.currentActiveRes,
          this.currentActiveResLayer[i],
          "active",
          80
        );

        this.map.setFitView(
          this.currentActiveResLayer[i],
          false,
          [100, 100, 100, 100],
          14
        );
      } else {
        while (this.currentActiveResLayer[i].length > 0) {
          this.currentActiveResLayer[i].pop().setMap(null);
        }
      }
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
  .map-info {
    position: fixed;
    top: 70px;
    left: 70px;
    width: 400px;
    .search {
      width: 100%;
      display: flex;
      .input-with-select {
        padding: 0;
        &::v-deep .el-input-group__prepend {
          background-color: #fff;
          width: 100px;
        }
      }
    }
    .showSearchRes {
      background-color: #fff;
      .collapseTit {
        /deep/ .el-collapse-item__header {
          padding: 0 30px;
        }
        /deep/ .el-collapse-item__wrap {
          border-top: 2px solid rgba(233, 233, 233, 0.5);
          padding: 0 30px;
          background-color: #eee;
        }
      }
    }
  }
  .legend {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 150px;
    height: 225px;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .item {
      flex: 1;
      display: flex;
      border-bottom: 1px solid #888;
      .title {
        line-height: 45px;
      }
      .icon {
        width: 30px;
        height: 30px;
        margin: 0 10px;
        margin-top: 10px;
      }
      .safe {
        background-image: url("../assets/img/safe.png");
        background-size: 100% auto;
      }
      .danger {
        background-image: url("../assets/img/danger.png");
        background-size: 100% auto;
      }
      .warning {
        background-image: url("../assets/img/warning.png");
        background-size: 100% auto;
      }
      .res {
        background-image: url("../assets/img/selected.png");
        background-size: 100% auto;
      }
      .active {
        background-image: url("../assets/img/active.png");
        background-size: 100% auto;
      }
    }
  }
}
</style>
