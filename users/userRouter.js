const express = require("express");

const db = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
	// do your magic!
});

router.get("/", (req, res) => {
	// do your magic!
});

// id routes
router.use("/:id", validateUserId);

router.post("/:id/posts", validatePost, (req, res) => {
	// do your magic!
});

router.get("/:id", (req, res) => {
	// do your magic!
});

router.get("/:id/posts", (req, res) => {
	// do your magic!
});

router.delete("/:id", (req, res) => {
	// do your magic!
});

router.put("/:id", validateUser, (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
	db.getById(req.params.id)
		.then((user) => {
			user ? next() : res.status(400).json({ message: "Invalid user id" });
		})
		.catch((err) =>
			res
				.status(500)
				.json({ errorMessage: "Error connecting to users database" })
		);
}

function validateUser(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		req.body.name
			? next()
			: res.status(400).json({ message: "Missing required name field" });
	} else {
		res.status(400).json({ message: "Missing user data" });
	}
}

function validatePost(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		req.body.text
			? next()
			: res.status(400).json({ message: "Missing required text field" });
	} else {
		res.status(400).json({ message: "Missing post data" });
	}
}

module.exports = router;
