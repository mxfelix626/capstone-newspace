"use strict";

/** Routes for posts. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureAdminOrCorrectUser, ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const Post = require("../models/post");
const postNewSchema = require("../schemas/postNew.json");
//const postUpdateSchema = require("../schemas/postUpdate.json");
//const postSearchSchema = require("../schemas/postSearch.json");

const router = express.Router({ mergeParams: true });


/** POST / { post } => { post }
 *
 * post should be { image_url, body, posted_at, posted_by }
 *
 * Returns { id, image_url, body, posted_at, posted_by  }
 *
 * Authorization required: 
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  console.log("okay well are we here atleast?")
  try {
    const validator = jsonschema.validate(req.body, postNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const post = await Post.create(req.body);
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", ensureAdminOrCorrectUser, async function (req, res, next) {
  try {
    await Post.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { posts: [ {  id, image_url, body, posted_at, posted_by  }, ...] }
 *
 * Can provide search filter in query:
 * -user
 * -posted_by

 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const p = req.query;
  console.log(p)

  try {
    const posts = await Post.findAll(p);
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

/** GET /[postId] => { post }
 *
 * Returns { id, image_url, body, posted_at, posted_by  }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const post = await Post.get(req.params.id);
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});



router.patch("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, postUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const post = await post.update(req.params.id, req.body);
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await Post.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
