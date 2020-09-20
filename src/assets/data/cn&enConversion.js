let en2cn = {
  id: "编号",
  isDangerous: "是否危险",
  isWarning: "是否已预警",
  picture: "预览图",
  dangerLevel: "危险等级",
  color: "颜色",
  name: "设备名",
  about: "描述",
  update: "更新时间",
  latitude: "纬度",
  longitude: "经度"
};
let cn2en = {};
for (let key in en2cn) {
  cn2en[en2cn[key]] = key;
}

export { en2cn, cn2en };
