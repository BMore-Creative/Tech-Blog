const router = require("express").Router();
const { Comment } = require("../../models");
const { authenticate } = require("../../utils/auth");

router.post("/", authenticate, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body.comment,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
