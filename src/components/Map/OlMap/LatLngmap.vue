<template>
  <div class="containerLat">
    <div id="mapLng" class="mapLat"></div>
    <!-- 左侧tool -->
  </div>
</template>
<script>
// 映入css文件、
//import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
//引入图例
//引入弹框组件popHiddenPoint
import "ol/ol.css";
import { Map, View, ol } from "ol";
import TileLayer from "ol/layer/Tile";
import { Image as ImageLayer } from "ol/layer";
//网页端
import XYZSource from "ol/source/XYZ";
//移动端
import OSMSource from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
//添加标记物
import Vectors from "ol/layer/Vector.js";
import Cluster from "ol/source/Cluster";
import { WMTS, Vector, ImageArcGISRest } from "ol/source.js";
import Feature from "ol/Feature";
import OlGeomPoint from "ol/geom/Point";
import OlStyleStyle from "ol/style/Style";
import Circle from "ol/style/Circle";

import OlStyleIcon from "ol/style/Icon";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { toSize } from "ol/size";
import GeoJSON from "ol/format/GeoJSON";
import WebGLPointsLayer from "ol/layer/WebGLPoints";
//线段
import { Point, Polygon, LineString, MultiPolygon } from "ol/geom";
import ImageWMS from "ol/source/ImageWMS";
import TileWMS from "ol/source/TileWMS";

//添加标记物的点击事件
import Overlay from "ol/Overlay.js";
//删除点
//自适应点
import SimpleGeometry from "ol/geom/SimpleGeometry";
import extent from "ol/extent";
//边界数据
import { defaults as defaultControls, OverviewMap } from "ol/control";
import MousePosition from "ol/control/MousePosition";
//---------------------------------------------------------------------
//添加雷达图片
import Static from "ol/source/ImageStatic";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { transform } from "ol/proj";
import { getCenter } from "ol/extent";
//隐患点定位弹框
import "ol-ext/control/Permalink.css";
import "ol-ext/control/Search.css";
import "ol-ext/control/Swipe.css";
import "ol-ext/control/Permalink.css";
import "ol-ext/control/Search.css";
import "ol-ext/control/LayerSwitcherImage.css";
import "ol-ext/control/Bar.css";

import LayerSwitcherImage from "ol-ext/control/LayerSwitcherImage";
import Bar from "ol-ext/control/Bar";
import Button from "ol-ext/control/Button";
import Toggle from "ol-ext/control/Toggle";
import Select from "ol/interaction/Select";
import OverlayPopup from "ol-ext/overlay/Popup";

import areaGeo from "../../../../public/浏阳市.json";
//添加拖拽功能
import { Draw, Modify, Snap } from "ol/interaction";

export default {
  props: ["gjData"],
  data() {
    return {
      nameChoose: "",
      context_name: "",
      tabName: "first",
      lineWidth: 2.08333,
      curIndex: 0,
      closeDialogMapData: "",
      radarList: [],
      playBtn: false,
      cur: 1,
      activeNames: ["1"],
      dialogData: false,
      content: "",
      popContent: "",
      closer: "", //地图关闭id
      container: "", //弹框id
      overlay: "", //关闭弹框id
      titlecloser: "", //标题
      layer: null,
      features: [],
      activeIndex: "1",
      marketlist: [],
      map: null,
      layerType: {},
      mapChangeData: {},
      mapClick: {},
      markert: [],
      markertMore: [],
      imageExtent: null,
      imageLayer: null,
      imageSmoothing: null,
      imgStaticFirst: "",
      time: "",
      weatherRadarCloudData: [],
      mPopup: null,
      clickWeatherBtn: false
    };
  },
  mounted() {
    this.loadMap();
    this.addArea(areaGeo);
  },
  created() {},
  methods: {
    //加载图层
    loadMap() {
      var self = this;
      var satelliteLabelLayer = new TileLayer({
        //天地图影像 http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        visible: true,
        source: new XYZSource({
          url:
            "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=2e089c2bb3c79e23cb1038ca8112cb37",
          crossOrigin: "anonymous"
        }),
        name: "tianmap"
      });

      var streetLayer = new TileLayer({
        //arcgis街道图
        visible: false,
        source: new XYZSource({
          url:
            "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
          crossOrigin: "anonymous"
        }),
        name: "tianStreetmap"
      });
      proj4.defs(
        "EPSG:27700",
        "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 " +
          "+x_0=400000 +y_0=-100000 +ellps=airy " +
          "+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 " +
          "+units=m +no_defs"
      );
      register(proj4);
      let imageExtent = [
        65.9796331669,
        10.7451916711,
        140.1812559169,
        58.4673388687
      ];
      let imageLayer = new ImageLayer();
      this.imageExtent = imageExtent;
      this.imageLayer = imageLayer;
      // let Three = new ImageLayer({
      //   source: new ImageArcGISRest({
      //     ratio: 1,
      //     params: {},
      //     url:
      //       "http://hsfx.bjdclw.com:8060/arcgis/rest/services/YNDongChuan/SlopFlow/MapServer"
      //   })
      // });
      var layers = [streetLayer, satelliteLabelLayer, imageLayer];
      self.map = new Map({
        target: "mapLng",
        layers: layers,
        view: new View({
          center: [113.64312, 28.16375], //地图中心点坐标
          //center: transform(getCenter(imageExtent), "EPSG:27700", "EPSG:3857"),
          zoom: 10,
          maxZoom: 18,
          projection: "EPSG:4326"
          // projection: "EPSG:3857"
        })
      });
    },
    makeLine(data){
      // var coordinates = [
      //   [166.2, 34.5],
      //   [118.5, 38.5]
      // ];
      var source = new Vector();
      //矢量图层
      var vector_line = new Vectors({
        source: source,
        style: new OlStyleStyle({
          fill: new Fill({
            color: "#55caba"
          }),
          stroke: new Stroke({
            // lineDash: [1, 6],
            //地图连线的样式
            color: "red", //颜色
            width: 2 //宽度
          }),
          image: new Circle({
            radius: 2,
            fill: new Fill({
              color: "#55caba"
            })
          })
        })
      });
      var feature = new Feature({
        geometry: new LineString(JSON.parse(data))
      });
      source.addFeature(feature);
      this.map.addLayer(vector_line);
      this.map.getView().setCenter(JSON.parse(data)[0]);
      this.map.getView().setZoom(20);
    },
    // 设置区域
    addArea(geo = []) {
      let that = this;
      if (geo.length == 0) {
        return false;
      }
      let features = [];
      geo.forEach(g => {
        let lineData = g.features[0];
        let routeFeature = "";
        if (lineData.geometry.type == "MultiPolygon") {
          routeFeature = new Feature({
            geometry: new MultiPolygon(lineData.geometry.coordinates)
          });
        }
        routeFeature.setStyle(
          new OlStyleStyle({
            fill: new Fill({
              color: "transparent" //填充颜色
            }),
            stroke: new Stroke({
              width: 3, //边界宽度
              color: "#337fe5" //边界颜色
            })
          })
        );
        features.push(routeFeature);
      });
      // 设置图层
      let routeLayer = new Vectors({
        source: new Vector({
          features: features
        })
      });
      // 添加图层
      // 添加图层
      //   setTimeout(() => {
      that.map.addLayer(routeLayer);
      //   }, 200);
    }
  },
  watch: {
    // hpPositin: {
    //   handler(newV, oldV) {
    //     //弹框
    //     //直接定位（有些问题）
    //     if (this.rightType == "warning") {
    //       this.handleRenderOverlay(newV, newV);
    //     } else {
    //       this.handleRenderOverlay(newV.data, newV);
    //     }
    //   }
    // },
    // commonData: {
    //   handler(newV, oldV) {
    //     //弹框
    //     //直接定位（有些问题）
    //   },
    //   immediate: true
    // },
    gjData: {
      handler(val) {
        // var coordinates = [
        //   [106.2, 34.5],
        //   [118.5, 38.5],
        //   [108.6, 38.5]
        // ];
        console.log(val.length, "222");
        console.log(JSON.stringify(val), "gj-atatsd---");
        if (val.length > 0) {
          this.$nextTick(() => {
            this.makeLine(JSON.stringify(val));
          });
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style  lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
>>> .ol-mouse-position {
  top: 8px;
  right: 8px;
  font-size: 18px !important;
  position: absolute;
  color: #fff !important;
}
.containerLat {
  width: 100%;
  height: 100%;
  .mapLat {
    width: 100%;
    height: 100%;
  }
}
</style>


