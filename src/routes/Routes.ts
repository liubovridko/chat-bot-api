import { BusinessController } from "../controller/BusinessController";
import { AuthController } from "../controller/AuthController";
import { HotelController } from "../controller/HotelController";
import { SearchController } from "../controller/SearchController";
import { CategoryController } from "../controller/CategoryController";
import { ReviewController } from "../controller/ReviewController";
import { HotelAmenitiesController } from "../controller/HotelAmenitiesController"; 
import { authenticateToken } from '../middleware/authenticateToken';
import { fileController } from '../controller/FileController';
import { upload } from '../middleware/uploadFile';


export const Routes = [
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
    controller: AuthController,
    middleware: authenticateToken,
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
    controller: AuthController,
    middleware: authenticateToken,
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
    controller: AuthController,
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
    controller: AuthController,
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
    controller: AuthController,
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
    controller: BusinessController,
    middleware: authenticateToken,
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
    controller: BusinessController,
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
    controller: BusinessController,
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
    controller: BusinessController,
    middleware: authenticateToken,
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
    controller: BusinessController,
    middleware: authenticateToken,
    action: "remove"
    
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
    controller: BusinessController,
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
    controller: BusinessController,
    middleware: authenticateToken,
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
    controller: fileController,
    middleware: [authenticateToken, upload],
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
    controller: SearchController,
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
    controller: SearchController,
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
    controller: SearchController,
    action: "getSearchQueryStatistic"
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
    controller: HotelController,
    action: "all"
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
    controller: HotelController,
    action: "one"
},
{
    /**
     * @swagger
     * /hotels:
     *   post:
     *     summary: Create a new hotel
     *     description: Create a new hotel entity.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               url:
     *                 type: string
     *               wifi_name:
     *                 type: string
     *               wifi_password:
     *                 type: string
     *               front_desk_number:
     *                 type: string
     *               check_in_time:
     *                 type: string
     *               check_out_time:
     *                 type: string
     *               chatBot_key:
     *                 type: string
     *     responses:
     *       200:
     *         description: Hotel created successfully.
     *       400:
     *         description: Invalid request body.
     *       500:
     *         description: Internal server error.
     */
    method: "post",
    route: "/hotels",
    controller: HotelController,
    middleware: authenticateToken,
    action: "create"
},
{
    /**
     * @swagger
     * /hotel/{id}:
     *   put:
     *     summary: Update a hotel by ID
     *     description: Update a hotel by its ID.
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
     *               url:
     *                 type: string
     *               wifi_name:
     *                 type: string
     *               wifi_password:
     *                 type: string
     *               front_desk_number:
     *                 type: string
     *               check_in_time:
     *                 type: string
     *               check_out_time:
     *                 type: string
     *               chatBot_key:
     *                 type: string
     *     responses:
     *       200:
     *         description: Information about the hotel.
     *       404:
     *         description: Hotel not found.
     *       500:
     *         description: Internal server error.
     */
    method: "put",
    route: "/hotels/:id",
    controller: HotelController,
    middleware: authenticateToken,
    action: "update"
},
{
    /**
     * @swagger
     * /hotels/{id}:
     *   delete:
     *     summary: Delete a hotel by ID
     *     description: Delete a hotel by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Hotel deleted successfully.
     *       404:
     *         description: Hotel not found.
     */
    method: "delete",
    route: "/hotels/:id",
    controller: HotelController,
    middleware: authenticateToken,
    action: "remove"
    
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
    controller: CategoryController,
    action: "all"
},
{
    /**
     * @swagger
     * /reviews:
     *   get:
     *     summary: Get all reviews
     *     description: Retrieve a list of all reviews.
     *     responses:
     *       200:
     *         description: A list of reviews.
     */
    method: "get",
    route: "/reviews",
    controller: ReviewController,
    middleware: authenticateToken,
    action: "all"
},
{
    /**
     * @swagger
     * /hotels:
     *   post:
     *     summary: Create a new review
     *     description: Create a new review entity.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               rating:
     *                 type: number
     *               userName:
     *                 type: string
     *               textReview:
     *                 type: string
     *     responses:
     *       200:
     *         description: Review created successfully.
     *       400:
     *         description: Invalid request body.
     *       500:
     *         description: Internal server error.
     */
    method: "post",
    route: "/add-review/:keyBot",
    controller: ReviewController,
    action: "create"
},
{
    /**
     * @swagger
     * /hotels/amenities:
     *   get:
     *     summary: Get all hotel amenities
     *     description: Retrieve a list of all amenities.
     *     responses:
     *       200:
     *         description: A list of amenities.
     */
    method: "get",
    route: "/hotels/amenities",
    controller: HotelAmenitiesController,
    middleware: authenticateToken,
    action: "getAll"
},
{
    /**
     * @swagger
     * /hotels/amenities/{id}:
     *   get:
     *     summary: Get one amenity
     *     description: Retrieve information about a specific amenity.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           description: id of the amenity to retrieve.
     *     responses:
     *       200:
     *         description: Information about the amenity.
     *       404:
     *         description: Amenity not found.
     *       500:
     *         description: Internal server error.
     */
    method: "get",
    route: "/hotels/amenities/:id",
    controller: HotelAmenitiesController,
    middleware: authenticateToken,
    action: "getOne"
},
{
    /**
     * @swagger
     * /hotels/amenities:
     *   post:
     *     summary: Create a new amenities
     *     description: Create a new amenities entity.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               amenity_type:
     *                 type: string
     *               available:
     *                 type: boolean
     *               hours:
     *                 type: string
     *               hotelId:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Amenities created successfully.
     *       400:
     *         description: Invalid request body.
     *       500:
     *         description: Internal server error.
     */
    method: "post",
    route: "/hotels/amenities",
    controller: HotelAmenitiesController,
    middleware: authenticateToken,
    action: "create"
},
{
    /**
     * @swagger
     * /hotels/amenities/{id}:
     *   put:
     *     summary: Update an amenity by ID
     *     description: Update an amenity by its ID.
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
     *               amenity_type:
     *                 type: string
     *               available:
     *                 type: boolean
     *               hours:
     *                 type: string
     *               hotelId:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Information about the amenity.
     *       404:
     *         description: Amenity not found.
     *       500:
     *         description: Internal server error.
     */
    method: "put",
    route: "/hotels/amenities/:id",
    controller: HotelAmenitiesController,
    middleware: authenticateToken,
    action: "update"
},
{
    /**
     * @swagger
     * /hotels/amenities/{id}:
     *   delete:
     *     summary: Delete an amenity by ID
     *     description: Delete an amenity by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Hotel amenity has been removed.
     *       404:
     *         description: Hotel amenity not found.
     */
    method: "delete",
    route: "/hotels/amenities/:id",
    controller: HotelAmenitiesController,
    middleware: authenticateToken,
    action: "remove"  
},
]
 