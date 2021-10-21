<template>
  <div class="menu-item"
       v-if="!item.hidden">
    <app-link v-if="item && item.meta"
              :to="resolvePath(item)">
      <item :icon="item.meta.icon"
            :title="item.meta.title" />
      <span v-if="item && item.meta">{{item.meta.title}}</span>
    </app-link>
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
  },
  methods: {
    resolvePath(route) {
      let routePath = route.path + '/' + route.children[0].path
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
