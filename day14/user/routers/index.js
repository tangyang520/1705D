const router = require("koa-router")()

let user = require("./user")

router.use(user.routes(),user.allowedMethods())

module.exports = router;