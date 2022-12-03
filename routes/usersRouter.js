
const express = require('express');

const UserService = require('./../services/userService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { 
  updateUserSchema, 
  createUserSchema, 
  getUserSchema, 
  getUserByEmailSchema,
  loginUserSchema, 
} = require('./../schemas/userSchema');

const auth = require('./../authentication/index');

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

// Find a user by e-mail
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
      const newUser = await service.create(body);
      res.status(201).json(newUser);
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

// Update a user by ID with token
router.patch('/me/:id',
  validatorHandler(getUserSchema, 'params'),// /me/params:id
  validatorHandler(updateUserSchema, 'body'),// {	"role": "zzzzzzz24h-t2" }
  async (req, res, next) => {
    const token = req.headers['x-access-token'];
    // check if the token is in the headers
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: '(Error: userRouter 004) No token provided.',
      });
    }

    // Decode token to validate
    const decodedToken = await service.verifyToken(token);
    console.log('Decoded token? ::: '+ decodedToken);

    if (decodedToken != true ) {
      //console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      res.json({'token': '[userRouter /me/:id] ups this token in not valid.'});
      next();
    }

    // if token is validated, update the user:
    if (decodedToken) {
      try {
        const { id } = req.params;
        const body = req.body;
        const userUpdated = await service.updateOne(id, body);
        res.json(userUpdated);
      } catch (error) {
        next(error);
      }
    } else {
      // the token is not validate.
      //console.log('----token no validate');
      res.json({'token': false});
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

// login a user
router.post('/login',
  validatorHandler(loginUserSchema, 'body'),
  async(req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await service.findByEmail(email); 
      
      // generate token
      console.log('Creating token.......................');
      const token = await service.login(email, password);
      console.log('Created token: '+ token);

      res.json({auth: true, token});
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
