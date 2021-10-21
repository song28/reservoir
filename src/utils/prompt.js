import {Message, MessageBox, Notification} from 'element-ui'

export const prompt = {
  message: {
    success: function(msg) {
      Message({
        message: msg,
        type: 'success'
      })
    },
    warning: function(msg) {
      Message({
        message: msg,
        type: 'warning'
      })
    },
    error: function(msg) {
      Message.error(msg)
    },
    info: function(msg) {
      Message.info(msg)
    }
  },
  messageBox: {
    confirm: function(msg, type, callback) {
      MessageBox.confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type ? type : 'warning'
      }).then(() => {
        callback(true)
      }).catch(() => {
        callback(false)
      })
    }
  },
  notify: {
    success: function(msg, title) {
      Notification({
        title: title ? title : '成功',
        message: msg,
        type: 'success'
      })
    },
    warning: function(msg, title) {
      Notification({
        title: title ? title : '警告',
        message: msg,
        type: 'warning'
      })
    },
    error: function(msg, title) {
      Notification.error({
        title: title ? title : '错误',
        message: msg
      })
    },
    info: function(msg, title) {
      Notification.info({
        title: title ? title : '消息',
        message: msg
      })
    }
  }
}
