import request from "@/utils/request";
const prod = process.env.VUE_APP_BASE_API_6;
export function getList() {
  return request({
    url: "role/getAllRoles",
    baseURL: prod,
    method: "get"
  });
}
export function seachByName(query) {
  return request({
    url: "role/getAllRolesByName",
    baseURL: prod,
    method: "post",
    data: query
  });
}

export function submitForm(query) {
  return request({
    url: "role/save",
    baseURL: prod,
    method: "post",
    data: query
  });
}

export function doDelete(query) {
  return request({
    url: "role/delete",
    baseURL: prod,
    method: "post",
    data: query
  });
}
export function doDeleteMultiple(query) {
  return request({
    url: "role/doDeleteMultiple",
    baseURL: prod,
    method: "post",
    data: query
  });
}
export function getRightTreeList(query) {
  return request({
    url: "menu/getRightTree",
    baseURL: prod,
    method: "get",
    params: query
  });
}
export function saveRight(query) {
  return request({
    url: "role/saveRight",
    baseURL: prod,
    method: "post",
    data: query
  });
}
export function getRolePermissions(id) {
  return request({
    url: "role/getRolePermissions/" + id,
    baseURL: prod,
    method: "get"
  });
}
export function getAllRoles(query) {
  return request({
    url: "role/getAllRoles",
    baseURL: prod,
    method: "get"
  });
}

// 加载组织机构树
export function orgTree(params) {
  return request({
    url: "/orgTree",
    baseURL: prod,
    method: "GET",
    params: params
  });
}
// /addRole 添加角色信息
export function addRole(query) {
  return request({
    url: "/addRole",
    method: "post",
    data: query,
    baseURL: prod
  });
}
// /updateRole  修改角色信息
export function updateRole(query) {
  return request({
    url: "/updateRole",
    method: "post",
    data: query,
    baseURL: prod
  });
}
//删除指定组织机构下角色信息 /delRole
export function delRole(query) {
  return request({
    url: "/delRole",
    method: "post",
    data: query,
    baseURL: prod
  });
}
// /roleSet  根据组织机构查询本级及下级机构用于角色集合

export function roleSet(query) {
  return request({
    url: "/roleSet",
    method: "get",
    params: query,
    baseURL: prod
  });
}
//   查询角色分页列表  /roleList4Page
export function roleList4Page(query) {
  return request({
    url: "/roleList4Page",
    method: "post",
    data: query,
    baseURL: prod
  });
}
//   绑定角色菜单权限 /bindRoleMenu
export function bindRoleMenu(query) {
  return request({
    url: "/bindRoleMenu",
    method: "post",
    data: query,
    baseURL: prod
  });
}

//  子系统信息列表
export function systemList4Page(params) {
  return request({
    url: "/systemList4Page",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// menuAndBtnTree
export function menuAndBtnTree(query) {
  return request({
    url: "/menuAndBtnTree",
    method: "get",
    params: query,
    baseURL: prod
  });
}
