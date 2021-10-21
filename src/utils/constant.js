/*
 * @Author: dang
 * @Date: 2021-04-14 09:58:54
 * @LastEditTime: 2021-04-14 15:51:19
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\utils\constant.js
 */
export function setConstant() {
  let constant = {
    // 循环周期
    loopPeriodList: [
      {
        value: "1",
        label: "年"
      },
      {
        value: "2",
        label: "周"
      },
      {
        value: "3",
        label: "季"
      },
      {
        value: "4",
        label: "日"
      }
    ],
    taskTypeList: [
      {
        label: "巡查任务",
        value: "1"
      },
      {
        label: "养护任务",
        value: "2"
      },
      {
        label: "操作任务",
        value: "3"
      }
    ]
  };
  sessionStorage.setItem("constant", JSON.stringify(constant));
}
