<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>看不清的名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">>>></el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'内容 ' + o }}</div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>看不清的名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">>>></el-button>
          </div>
          <div id="point-bank" class="echart"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>看不清的名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">>>></el-button>
          </div>
          <div id="tool-type" class="echart"></div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>看不清的名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">>>></el-button>
          </div>
          <div id="tool-online" class="echart"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>看不清的名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">>>></el-button>
          </div>
          <div id="point-type" class="echart"></div>
        </el-card>
      </el-col>
      <el-col :span="5" :offset="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>看不清的名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">>>></el-button>
          </div>
          <div id="tool-status" class="echart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.drawChart();
    this.drawToolTypeChart();
    this.drawPointTypeChart();
    this.drawToolOnlineChart();
    this.drawPointBankChart();
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("tool-status"));
      // 指定图表的配置项和数据
      let option = {
        // title: {
        //   text: "ECharts 入门示例"
        // },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      const that = this;
      window.addEventListener("resize", function() {
        that.myChart.resize();
      });
    },
    drawToolTypeChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("tool-type"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      const that = this;
      window.addEventListener("resize", function() {
        that.myChart.resize();
      });
    },
    drawPointTypeChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("point-type"));
      // 指定图表的配置项和数据
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "2015", "2016", "2017"],
          source: [
            {
              product: "Matcha Latte",
              "2015": 43.3,
              "2016": 85.8,
              "2017": 93.7
            },
            { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
            {
              product: "Cheese Cocoa",
              "2015": 86.4,
              "2016": 65.2,
              "2017": 82.5
            },
            {
              product: "Walnut Brownie",
              "2015": 72.4,
              "2016": 53.9,
              "2017": 39.1
            }
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      const that = this;
      window.addEventListener("resize", function() {
        that.myChart.resize();
      });
    },
    drawToolOnlineChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("tool-online"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["利润", "支出", "收入"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        series: [
          {
            name: "利润",
            type: "bar",
            label: {
              show: true,
              position: "inside"
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          },
          {
            name: "收入",
            type: "bar",
            stack: "总量",
            label: {
              show: true
            },
            data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            name: "支出",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "left"
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      const that = this;
      window.addEventListener("resize", function() {
        that.myChart.resize();
      });
    },
    drawPointBankChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("point-bank"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
      const that = this;
      window.addEventListener("resize", function() {
        that.myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
.el-card__header {
  padding: 5px 10px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 5px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 300px;
}
.echart {
  // position: absolute;
  // right: 0;
  // bottom: 0;
  width: 300px;
  height: 200px;
}
.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
