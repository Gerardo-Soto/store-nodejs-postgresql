
const express = require('express');

const UserService = require('./../services/userService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { updateUserSchema, createUserSchema, getUserSchema, getUserByEmailSchema } = require('./../schemas/userSchema');

const router = express.Router();
// router: /users

const service = new UserService();

// Find all users registered:
router.get('/', async (req, res, next) => {
  try {
    const users = await service.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


// Find a user by ID
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      // Get the ID from the URL:
      const { id } = req.params;
      // Get the user with our service findOne
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/e/:email',
  validatorHandler(getUserByEmailSchema, 'params'),
  async (req, res, next) => {
    try {
      // Get the ID from the URL:
      const { email } = req.params;
      // Get the user with our service findOne
      const user = await service.findByEmail(email);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
)

// Create a new user
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  //validatorHandler(isUnique, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

// Update a user by ID
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.updateOne(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

// Delete a user by ID
router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteOne(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);




module.exports = router;
