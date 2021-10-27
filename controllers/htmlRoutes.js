const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { forceLogin, authenticate } = require("../utils/auth");

router.get("/", authenticate, async (req, res) => {
  try {
    const postInfo = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postInfo.map((info) => info.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postInfo) {
      const post = postInfo.get({ plain: true });

      res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/post/edit/:id", async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id);

    if (postInfo) {
      const post = postInfo.get({ plain: true });
      res.render("edit", {
        ...post,
        logged_in: true,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/post/delete/:id", async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id);

    if (postInfo) {
      const post = postInfo.get({ plain: true });
      res.render("delete", {
        ...post,
        logged_in: true,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/create", forceLogin, authenticate, async (req, res) => {
    try {
        const userData = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
            include: [{model: Post}],
        })

        const user = userData.get({ plain: true })

        res.render('create', {
            ...user,
            logged_in: true,
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/login', authenticate, (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile')
        return
    }

    res.render('login')
})

module.exports = router