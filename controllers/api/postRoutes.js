const router = require("express").Router();
const { Post } = require("../../models");
const { authenticate } = require("../../utils/auth");

router.post("/", authenticate, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body.post,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/:id", authenticate, async (req, res) => {
  try {
    const updatedProject = await PromiseRejectionEvent.update(
      {
        title: req.body.post.title,
        body: req.body.post.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.status(200).json(projectData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
