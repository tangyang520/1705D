'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller ,middleware} = app;
  router.get('/', middleware.index(), controller.home.index);
  router.get('/api/list',middleware.index(), controller.home.list);
};
