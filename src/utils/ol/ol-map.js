import Map from "ol/Map.js";
import View from "ol/View.js";

import {defaults} from "ol/control"

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { XYZ, TileWMS, Vector as VectorSource, Cluster } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style.js';
import {Point} from "ol/geom"
import Feature from "ol/Feature"
import olMapServer from "./ol-mapServer"
import Overlay from 'ol/Overlay.js';
/**
 * 说明：创建地图对象类
 */
class ZMap extends olMapServer {
    constructor(option){
        super()
        this.fillStyle = new Fill({
            color: 'rgba(255, 255, 255, 0.8)'
        })
        // 边界样式
        this.strokeStyle = new Stroke({
            color: '#ffcc33',
            width: 2
        })
        // 形状原型样式
        this.imageCircle = new CircleStyle({
            radius: 17,
            fill: new Fill({
                color: '#ffcc33'
            })
        })
        this.icon_style = {
            anchor: [0.5, 1],
            offset:[0,1],
            //图标缩放比例
            scale:0.8,
            //透明度
            opacity: 1,
            //图标的url
            src:"../skins/default/images/StationImages/yc_pp.png" //注意这里使用绝对路径传参
        }
        this.style = new Style({
            //填充色
            fill: this.fillStyle,
            //边线颜色
            stroke:this.strokeStyle ,
            //形状
            image: this.imageCircle
        })

        if(!option)
            return
        var target = option.target?option.target:'map'
        var zoom = option.zoom?option.zoom:this.zoom
        var center = option.center?option.center:this.center
        var baseMap = option.baseMap?option.baseMap:true
        var olMap = new Map({
            target: target,
            view: new View({
                projection: 'EPSG:4326',
                center:center ,
                zoom: zoom
            }),
            controls: defaults({
                zoom: false,
                rotate: false,
                attribution: false
            })
        });
        this.map = olMap
         /**
         *鼠标移动到要素上面的时候变成小手
         */
        olMap.on('pointermove', function (e) {
            var pixel =olMap.getEventPixel(e.originalEvent);
            var hit =olMap.hasFeatureAtPixel(pixel);
            olMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });
        // if(baseMap)
        //     var vetorLayers = this.tiandituVetorMap(olMap)
        // return olMap
    }
    /**
     * 说明：添加点
     * @param {*} option 参数
     * points：对象，坐标点，
     * {
     *      center:坐标信息,
            imgUrl:图标地址,
            title：标注文本信息标题头,
            element：自定义提示框写html
     * }
     * layerId：图层名称
     * label： 布尔值，是否显示标注文本信息
     * name：显示内容的名称
     * key:是每一个点含有的一个数值key值
     * divPop:全自定pop,不使用模板
     * 示例：
     * {
            points: [{
                center: [114.6727, 35.5028],
                imgUrl:"images/StationImages/maker/压力计.png",
                name:"水质",
                title:"123",
                element:"<div>3333333</div>"
            }],
            layerId:"222",
            label:true,
            name:"性别",
            key:"name",
        }
     */
    addPoint(option){
        var that = this
        if(option.points&&option.points.length<1)
            return false
        let overlayes= []
        //创建一个点
        let points = []
        
        option.points.map(function (item,index) {
            let point_ = new Feature({
                geometry: new Point(item.center),
            });
            point_.data = item;
            point_.layerId =  option.layerId? option.layerId:""

            let style_ = new Style({
                //形状
                image:new Icon({
                    offset:[0,1],
                    //图标缩放比例
                    scale:item.scale? item.scale:0.8,
                    //透明度
                    opacity: 1,
                    //图标的url
                    src:item.imgUrl? item.imgUrl:"images/StationImages/marker.png" //注意这里使用绝对路径传参
                })
            })
            //设置点1的样式信息
            point_.setStyle( style_);
            points.push(point_)
            
            // 显示标签
            if(option.label){
                var point_div = document.createElement('div');
               
                if(option.divPop){
                    if(item.element){
                        point_div.innerHTML = item.element
                    }else{
                        if(option.name){
                            point_div.innerHTML = `<div class="point-info-header">${option.name}：${option.key?item[option.key]:""}</div>`
                        }else{
                            point_div.innerHTML = `<div class="point-info-header">${option.key?item[option.key]:""}</div>`
                        }
                    }
                }else{
                    let html = `<div class="point-info-box">`
                    // 默认标签样式
                    if(item.element){
                        html +=`<div class="point-info-header">${item.title?item.title:"信息"}</div>
                                <div class="point-info-content">${item.element?item.element:""}</div>`
                    }else{
                        html += ` <div class="point-info-header">${item.title?item.title:"信息"}</div>`
                        if(option.name){
                            html += `<div class="point-info-content">${option.name}：${option.key?item[option.key]:""}</div>`
                        }else{
                            html += `<div class="point-info-content">${option.key?item[option.key]:""}</div>`
                        }
                    } 
                    html += `</div>`  
                    point_div.innerHTML = html
                }

                let pointOver = new Overlay({
                    position:  item.center,//默认空
                    positioning: 'center-bottom',
                    element: point_div,//绑定上面添加的元素
                    offset: [0, 10]//图片偏移量
                });
                that.map.addOverlay(pointOver);
                overlayes.push(pointOver)
            } 
        })
        //实例化一个矢量图层Vector作为绘制层
        var source = new VectorSource({
            features: points
        });
        //创建一个图层
        var vector = new VectorLayer({
            source: source
        });
        vector.layerId = option.layerId
        //将绘制层添加到地图容器中
        this.map.addLayer(vector);
        vector.setZIndex(3);
        return {
            layer:vector,
            overLayer:overlayes
        } ;
    }
    /**
     * 移除添加的点图层
     * @param {*} layer 
     */
    removeLayer(layer){
        if(layer&&layer.layer){
            this.map.removeLayer(layer.layer)
        }
        if(layer&&layer.overLayer){
            layer.overLayer.map((item,index)=>{
                this.map.removeOverlay(item)
            })
        }
    }
    /**
     * 添加闪烁标注信息
     * @param {*} option 
     */
    addAnimatePoint(option){
        let makers =[]
       
        if(option.points&&option.points.length>0){
            option.points.map((item,index)=>{
                // 定义默认的图标
                let icon = "iconjingbaoxinxi-"
                var point_div = document.createElement('div');
                if(item.icon)
                    icon = item.icon
                let html = `<div class="commodity-sign-wrap" style="cursor: pointer;">
                                    <div class="circle"><i class="iconfont ${icon} "></i></div>
                                    <div class="circle_bottom animation "></div>
                                    <div class="circle_bottom2 animation2 "></div>
                            </div>  `
                point_div.innerHTML = html
                // 创建图层
                let point = new Overlay({
                    position:  item.center?item.center:[0,0],//默认空
                    positioning: 'center-bottom',
                    element: point_div,//绑定上面添加的元素
                    offset: [0, 0]//图片偏移量
                });
                // 和地图关联
                this.map.addOverlay(point);
                makers.push(point)
                
                // 绑定点击事件
                point_div.onclick=function(){
                    if(option.click) option.click(item)
                }
            })  
        }
        return {
            overLayer:makers
        }
    }
    /**
     * 重置地图
     * @param {*} map 
     * @param {*} params 
     */
    restMap(params){
      let view = this.map.getView()
      if(params&&params.center)
        view.setCenter(params.center)
      if(params&&params.zoom)
        view.setZoom(params.zoom)
    }
}

export default ZMap



