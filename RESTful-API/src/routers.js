import Router from "express";

const router = Router();

/**
 * users routes
 */

router.route('/users')
.get()
.post()
.put()
.delete()


router.route('/users/:id')
.get()
.post()
.put()
.delete()

/**
 * applications routes
 */

router.route('/appliactions')
.get()
.post()
.put()
.delete()


router.route('/appliaction/:id')
.get()
.post()
.put()
.delete()


router.route(':userId/appliactions/')
.get()
.post()
.put()
.delete()


/**
 * jobs routes
 */

router.route('/jobs')
.get()
.post()
.put()
.delete()


router.route('/job/:id')
.get()
.post()
.put()
.delete()


router.get('/job/:id/employees')
.get()
.post()
.put()
.delete()

export default router;
