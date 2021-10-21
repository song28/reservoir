<!--
 * @Author: dang
 * @Date: 2021-04-08 16:16:03
 * @LastEditTime: 2021-04-26 11:02:52
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\layout\components\LeftSidebar\SidebarItem.vue
-->
<template>
  <div class="menu-item"
       v-if="!item.hidden">
    <app-link v-if="item && item.meta"
              :to="resolvePath(item)">
      <item :icon="item.meta.icon"
            :title="item.meta.title" />
      <span v-if="item && item.meta">{{item.meta.title}}</span>
    </app-link>
    <!-- <app-link v-if="item && item.meta" :to="resolvePath(item)">
      <i class="iconfont icon-caidanzhuangshi-"></i>
      <i
        class="iconfont "
        :class="item.meta.icon"
        style="fontWeight:500;fontSize:0.23rem;color:#FFF;"
      ></i>
      <svg data-v-c8a70580="" aria-hidden="true" class="svg-icon"><use data-v-c8a70580="" xlink:href="#icon-tp-zhjs"></use></svg>
      <span v-if="item && item.meta">{{item.meta.title}}</span>
      {{item.meta.icon}}
    </app-link> -->
    <!-- <app-link>
        <el-menu-item  v-if="item && item.meta" :to="resolvePath(item)">
           <item :icon="item.meta.icon" :title="item.meta.title" />
        </el-menu-item>
      </app-link> -->
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
    parentPath: {
      type: String,
      default: '',
    },
  },
  methods: {
    resolvePath(item) {
      let routePath = this.parentPath + '/' + item.path
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
  },
}
</script>
