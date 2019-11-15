'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 查看所有数据
  router.get("/api/list",controller.home.list)
  // 删除数据
  router.get("/api/del",controller.home.del)
  // 添加数据
  router.post("/api/add",controller.home.add)
  // 修改数据
  router.post("/api/edit",controller.home.edit)
};
