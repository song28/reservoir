/**
 * 说明：封装所有的地图服务，返回图层名称，单一图层则返回图层名称，多个图层返回对象
 */
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { XYZ, TileWMS, Vector as VectorSource } from 'ol/source.js';
import GeoJSON from 'ol/format/GeoJSON.js';

export default class mapServer {
  constructor(){

  }
  /**
   * 显示天地图矢量数据
   * @param {*} isshow  
   */
  tiandituVetorMap(isshow) {
    const map = this.map
    /**
    * 加载天地图的矢量图层
    */
    var TiandiMap_vec = new TileLayer({
      name: '天地图矢量图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f', //mapkey为天地图密钥
        wrapX: false,
        //设置crossOrigin
        crossOrigin: 'anonymous' 
      }),
    });
    map.addLayer(TiandiMap_vec);
    TiandiMap_vec.setZIndex(0)
    /**
     * 添加天地图适量的标注信息
     */
    var TiandiMap_cva = null
    if(isshow){
      TiandiMap_cva= new TileLayer({
        name: '天地图矢量注记图层',
        source: new XYZ({
          url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f', //mapkey为天地图密钥
          wrapX: false,
          crossOrigin: 'anonymous'
        }),
      });
      map.addLayer(TiandiMap_cva);
      TiandiMap_cva.setZIndex(0)
    }
    // 返回图层名称
    return {
      TiandiMap_vec
    }
  }
  
  /**
   * 添加天地图影像数据
   * @param {*} isShowCia 
   */
  tiandituImgMap(isShowCia) {
    const map = this.map
    var TiandiMap_img = new TileLayer({
      name: "天地图影像图层",
      source: new XYZ({
        url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f",//parent.TiandituKey()为天地图密钥
        wrapX: false,
        crossOrigin: 'anonymous'
      })
    });
    map.addLayer(TiandiMap_img);
    TiandiMap_img.setZIndex(0)

    var TiandiMap_cia = null
    if(isShowCia){
      TiandiMap_cia = new TileLayer({
        name: "天地图影像注记图层",
        source: new XYZ({
          url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f",//parent.TiandituKey()为天地图密钥
          wrapX: false,
          crossOrigin: 'anonymous'
        })
      });
    
      map.addLayer(TiandiMap_cia);
      TiandiMap_cia.setZIndex(1);
      console.log(map.getLayers())

    }
    // 返回图层名称
    return {
      TiandiMap_img, TiandiMap_cia
    }
  }
  /**
   * 
   * @param {*} url 
   * @param {*} params 
   */
  geoServeWMS(url, params) {
    if(!url){
      throw new Error("geoserver的地图服务地址不能为空");
      return false
    }
     
    const map  = this.map
    var wms = new TileLayer({
      source: new TileWMS({
        url: url,
        params: params,
      })
    });
    map.addLayer(wms)
    return wms;
  }
  /**
   * 显示高德地图
   */
  showGaodeMap() {
    const map  = this.map
    var gaode = new TileLayer({
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',//parent.TiandituKey()为天地图密钥
        wrapX: false,
        // projection: 'EPSG:3857',
      }),
      opacity: 0.4
    });
    // 添加到地图上
    map.addLayer(gaode);
  }
  /**
   * 显示arcgis在线cool地图
   * @param {} map 
   */
  showCoolMap() {
    const map = this.map
    var coolMap = new TileLayer({
      source: new XYZ({
        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',//parent.TiandituKey()为天地图密钥
        wrapX: false,
        // projection: 'EPSG:3857',
      }),
      // opacity: 0.4
    });
    // 添加到地图上
    map.addLayer(coolMap);
  }
  /**
   * 根据地址添加geojson数据
   * @param {*} url 
   * @param {*} styleFun 
   */
  showGeoJson(url,styleFun,layerID){
    if(!url){
      throw new Error("geoserver的地图服务地址不能为空");
      return false
    }
    
    const map = this.map
    var source = {
      source: new VectorSource({
        url: url,
        format: new GeoJSON(),
      }),
    }
    // 设置样式回调函数
    if(styleFun)
      source.style =styleFun 
    // 创建图层
    let layer = new VectorLayer(source);
    layer.layerID = layerID?layerID:""
    // 图层添加到地图上
    map.addLayer(layer)
    layer.setZIndex(3);
    return layer
  }

   /**
   * 更改底图的显示与隐藏
   * @param {*} layers 
   */
  changeBaseMap(layers,isShow=false){
    for(let item in layers){
        layers[item].setVisible(isShow);
    }
  }

}



