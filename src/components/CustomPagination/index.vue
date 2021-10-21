<template>
  <div class="custom-pagination">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSizes"
      :layout="layout"
      :page-size="pageSize"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  export default {
    props: {
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 20
      },
      pageSizes: {
        type: Array,
        default() {
          return [20, 50, 100, 500, 1000]
        }
      },
      layout: {
        type: String,
        default: 'prev, pager, next'
      },
      background: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      currentPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      },
      pageSize: {
        get() {
          return this.limit
        },
        set(val) {
          this.$emit('update:limit', val)
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('pagination', {page: this.currentPage, size: val})
      },
      handleCurrentChange(val) {
        this.$emit('pagination', {page: val, size: this.pageSize})
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import "~@/styles/variables";

  .custom-pagination {
    width: 100%;
    height: 100%;
    .el-pagination {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      margin: 0;
      padding: 0;
      button {
        width: max-content;
        border: 0;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          flex: 1;
          font-size: 0.14rem;
          line-height: normal;
          height: max-content;
          color: #2C3E50;
        }
      }
      .el-pager {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;

        .number {
          padding: 0 0.1rem;
          color: #666666;
          border-radius: 0;
        }
        .number.active {
          background-color: $blue;
          color: #fff;
        }
      }
      button:disabled {
        border: none !important;
        span {
          color: #C0C4CC !important;
        }
      }
    }

  }
</style>
