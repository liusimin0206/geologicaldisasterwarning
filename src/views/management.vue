<template>
  <div class="management">
    <el-table
      border
      height="100%"
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="isDangerous" label="IsDangerous"></el-table-column>
      <el-table-column prop="picture" label="Picture">
        <template slot-scope="scope">
          <el-popover placement="top-start" title trigger="hover">
            <img
              :src="scope.row.picture"
              alt
              style="width: 150px;height: 150px"
            />
            <img
              slot="reference"
              :src="scope.row.picture"
              style="width: 30px;height: 30px"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="dangerLevel" label="DangerLevel"></el-table-column>
      <el-table-column prop="color" label="Color"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="about" label="About" width="400"></el-table-column>
      <el-table-column prop="update" label="Update"></el-table-column>
      <el-table-column prop="latitude" label="Latitude"></el-table-column>
      <el-table-column prop="longitude" label="Longitude"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pointsData } from "../assets/data/pointsData";

export default {
  mounted: function() {
    for (var i = 0; i < this.tableData.length; i++) {
      this.tableData[i].isDangerous = this.tableData[i].isDangerous + "";
    }
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.dangerLevel >= 5) {
        return "warning-row";
      } else if (row.dangerLevel <= 4) {
        return "success-row";
      }
      return "";
    }
  },
  data() {
    return {
      tableData: pointsData
    };
  }
};
</script>

<style lang="less" scoped>
.el-table /deep/ .warning-row {
  background: oldlace;
}

.el-table /deep/ .success-row {
  background: #f0f9eb;
}
.management {
  box-sizing: border-box;
  padding-top: 61px;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  min-width: 1150px;
}
</style>
