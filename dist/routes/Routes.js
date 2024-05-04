"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const BusinessController_1 = require("../controller/BusinessController");
const AuthController_1 = require("../controller/AuthController");
const HotelController_1 = require("../controller/HotelController");
const SearchController_1 = require("../controller/SearchController");
const CategoryController_1 = require("../controller/CategoryController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const FileController_1 = require("../controller/FileController");
const uploadFile_1 = require("../middleware/uploadFile");
exports.Routes = [
    {
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Get all users
         *     description: Retrieve a list of all users.
         *     responses:
         *       200:
         *         description: A list of users.
         */
        method: "get",
        route: "/users",
        controller: AuthController_1.AuthController,
        middleware: authenticateToken_1.authenticateToken,
        action: "all"
    },
    {
        /**
         * @swagger
         * /auth/me:
         *   get:
         *     summary: Get authenticated user
         *     description: Retrieve information about the authenticated user.
         *     responses:
         *       200:
         *         description: Information about the authenticated user.
         *       401:
         *         description: Unauthorized access.
         */
        method: "get",
        route: "/auth/me",
        controller: AuthController_1.AuthController,
        middleware: authenticateToken_1.authenticateToken,
        action: "authMe"
    },
    {
        /**
         * @swagger
         * /auth/login:
         *   post:
         *     summary: User login
         *     description: Authenticate user and generate access token.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: Successful login, returns access token.
         *       401:
         *         description: Unauthorized login attempt.
         */
        method: "post",
        route: "/auth/login",
        controller: AuthController_1.AuthController,
        action: "login"
    },
    {
        /**
         * @swagger
         * /auth/register:
         *   post:
         *     summary: Register new user
         *     description: Register a new user with email and password.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *              firstName:
         *                type:string
         *              lastName:
         *                type:string
         *              email:
         *                 type: string
         *              password:
         *                 type: string
         *     responses:
         *       200:
         *         description: User successfully registered.
         *       400:
         *         description: Invalid registration data.
         */
        method: "post",
        route: "/auth/register",
        controller: AuthController_1.AuthController,
        action: "register"
    },
    {
        /**
         * @swagger
         * /users/{id}:
         *   delete:
         *     summary: Delete user
         *     description: Delete a user by ID.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *           description: User ID to delete.
         *     responses:
         *       200:
         *         description: User successfully deleted.
         *       404:
         *         description: User not found.
         */
        method: "delete",
        route: "/users/:id",
        controller: AuthController_1.AuthController,
        action: "remove"
    },
    {
        /**
         * @swagger
         * /parse-business:
         *   post:
         *     summary: Parse business data
         *     description: Parse business data from JSON and save it to the database.
         *     responses:
         *       200:
         *         description: Business data parsed and saved successfully.
         *       500:
         *         description: Internal server error.
         */
        method: "post",
        route: "/parse-business",
        controller: BusinessController_1.BusinessController,
        middleware: authenticateToken_1.authenticateToken,
        action: "parseBusiness"
    },
    {
        /**
         * @swagger
         * /business:
         *   get:
         *     summary: Get all businesses
         *     description: Retrieve a list of all businesses.
         *     responses:
         *       200:
         *         description: A list of businesses.
         *       500:
         *         description: Internal server error.
         */
        method: "get",
        route: "/business",
        controller: BusinessController_1.BusinessController,
        action: "getAll"
    },
    {
        /**
         * @swagger
         * /admin/business:
         *   get:
         *     summary: Get all businesses (admin)
         *     description: Retrieve a list of all businesses for admin purposes.
         *     responses:
         *       200:
         *         description: A list of businesses.
         *       500:
         *         description: Internal server error.
         */
        method: "get",
        route: "/admin/business",
        controller: BusinessController_1.BusinessController,
        action: "getAllAdmin"
    },
    {
        /**
         * @swagger
         * /business/{id}:
         *   put:
         *     summary: Update a business by ID
         *     description: Update a business by its ID.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *               description:
         *                 type: string
         *               image:
         *                 type: string
         *               url:
         *                 type: string
         *               categoryId:
         *                 type: integer
         *               hotelId:
         *                 type: integer
         *     responses:
         *       200:
         *         description: Business updated successfully.
         *       404:
         *         description: Business not found.
         */
        method: "put",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        middleware: authenticateToken_1.authenticateToken,
        action: "update"
    },
    {
        /**
         * @swagger
         * /business/{id}:
         *   delete:
         *     summary: Delete a business by ID
         *     description: Delete a business by its ID.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Business deleted successfully.
         *       404:
         *         description: Business not found.
         */
        method: "delete",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        action: "remove",
        middleware: authenticateToken_1.authenticateToken
    },
    {
        /**
         * @swagger
         * /business/{id}:
         *   get:
         *     summary: Get a business by ID
         *     description: Retrieve a business by its ID.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: The requested business.
         *       404:
         *         description: Business not found.
         */
        method: "get",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        action: "getOne"
    },
    {
        /**
         * @swagger
         * /business:
         *   post:
         *     summary: Create a new business
         *     description: Create a new business entity.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               title:
         *                 type: string
         *               description:
         *                 type: string
         *               url:
         *                 type: string
         *               categoryId:
         *                 type: number
         *               hotelId:
         *                 type: number
         *     responses:
         *       200:
         *         description: Business created successfully.
         *       400:
         *         description: Invalid request body.
         *       500:
         *         description: Internal server error.
         */
        method: "post",
        route: "/business",
        controller: BusinessController_1.BusinessController,
        middleware: authenticateToken_1.authenticateToken,
        action: "create"
    },
    {
        /**
         * @swagger
         * /upload:
         *   post:
         *     summary: Upload an image
         *     description: Upload an image file and optionally delete the old image file.
         *     requestBody:
         *       required: true
         *       content:
         *         multipart/form-data:
         *           schema:
         *             type: object
         *             properties:
         *               image:
         *                 type: string
         *                 format: binary
         *               oldImagePath:
         *                 type: string
         *                 description: The path of the old image file to be deleted (optional).
         *     responses:
         *       200:
         *         description: Image uploaded successfully.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 url:
         *                   type: string
         *                   description: The URL of the uploaded image file.
         *       400:
         *         description: No file uploaded.
         */
        method: "post",
        route: "/upload",
        controller: FileController_1.fileController,
        middleware: [authenticateToken_1.authenticateToken, uploadFile_1.upload],
        action: "uploadImage"
    },
    {
        /**
         * @swagger
         * /search:
         *   get:
         *     summary: Search by keywords
         *     description: Search for businesses by keywords.
         *     parameters:
         *       - in: query
         *         name: message
         *         required: true
         *         schema:
         *           type: string
         *           description: The search query message.
         *       - in: query
         *         name: keyBot
         *         required: false
         *         schema:
         *           type: string
         *           description: "The key of the hotel's chatbot (default: chatbot1)."
         *     responses:
         *       200:
         *         description: A list of businesses matching the search criteria.
         *       500:
         *         description: Internal server error.
         */
        method: "get",
        route: "/search",
        controller: SearchController_1.SearchController,
        action: "searchByKeywords"
    },
    {
        /**
         * @swagger
         * /keywords:
         *   get:
         *     summary: Get all search queries
         *     description: Retrieve a list of all search queries.
         *     responses:
         *       200:
         *         description: A list of search queries.
         */
        method: "get",
        route: "/keywords",
        controller: SearchController_1.SearchController,
        action: "getAll"
    },
    {
        /**
         * @swagger
         * /keywords/statistics:
         *   get:
         *     summary: Get search query statistics
         *     description: Retrieve statistics for search queries within a specified date range.
         *     parameters:
         *       - in: query
         *         name: startDate
         *         required: true
         *         schema:
         *           type: string
         *           format: date
         *           description: The start date of the search query statistics (YYYY-MM-DD).
         *       - in: query
         *         name: endDate
         *         required: true
         *         schema:
         *           type: string
         *           format: date
         *           description: The end date of the search query statistics (YYYY-MM-DD).
         *     responses:
         *       200:
         *         description: Statistics for search queries within the specified date range.
         *       404:
         *         description: No data found for the selected period.
         */
        method: "get",
        route: "/keywords/statistics",
        controller: SearchController_1.SearchController,
        action: "getSearchQueryStatistic"
    },
    {
        /**
         * @swagger
         * /hotel/{keyBot}:
         *   get:
         *     summary: Get one hotel
         *     description: Retrieve information about a specific hotel.
         *     parameters:
         *       - in: path
         *         name: keyBot
         *         required: true
         *         schema:
         *           type: string
         *           description: keyBot of the hotel to retrieve.
         *     responses:
         *       200:
         *         description: Information about the hotel.
         *       404:
         *         description: Hotel not found.
         *       500:
         *         description: Internal server error.
         */
        method: "get",
        route: "/hotel/:keyBot",
        controller: HotelController_1.HotelController,
        action: "one"
    },
    {
        /**
         * @swagger
         * /hotels:
         *   get:
         *     summary: Get all hotels
         *     description: Retrieve a list of all hotels.
         *     responses:
         *       200:
         *         description: A list of hotels.
         *       500:
         *         description: Internal server error.
         */
        method: "get",
        route: "/hotels",
        controller: HotelController_1.HotelController,
        action: "all"
    },
    {
        /**
         * @swagger
         * /categories:
         *   get:
         *     summary: Get all categories
         *     description: Retrieve a list of all categories.
         *     responses:
         *       200:
         *         description: A list of categories.
         *       500:
         *         description: Internal server error.
         */
        method: "get",
        route: "/categories",
        controller: CategoryController_1.CategoryController,
        action: "all"
    },
];
//# sourceMappingURL=Routes.js.map