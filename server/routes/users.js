"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn, ensureAdmin, ensureAdminOrCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: login
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
//router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: admin or that user
 **/

router.get("/:username", ensureAdminOrCorrectUser, async function (req, res, next) {
//router.get("/:username", async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or that user
 **/

router.patch("/:username", ensureAdminOrCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or that user
 **/

router.delete("/:username", ensureAdminOrCorrectUser, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

router.get("/:username/likes", async function (req, res, next) {
  try {
    const likes = await User.getUserLikedPosts(req.params.username);
    return res.json({ likes });
  } catch (err) {
    return next(err);
  }
});

router.post("/:username/likes", async function (req, res, next) {
  try {
    const { username, post_id } = req.body;
    const like = await User.addLike(username, post_id);

    return res.json({ like });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:username/likes/:post_id", ensureAdminOrCorrectUser, async function (req, res, next) {
  try {
    console.log(req.params.username);
    console.log(req.params.post_id);
    await User.deleteLike(req.params.username, req.params.post_id);
    return res.json();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
