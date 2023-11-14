/**
 * @swagger
 * components:
 *   schemas:
 *     Segment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *
 * /segments:
 *   post:
 *     summary: Create a new segment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Segment'
 *     responses:
 *       '201':
 *         description: Segment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Segment'
 *       '400':
 *         description: Bad request.
 *
 * /segments/{segmentId}:
 *   get:
 *     summary: Get a segment by ID.
 *     parameters:
 *       - in: path
 *         name: segmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Segment ID.
 *     responses:
 *       '200':
 *         description: Segment retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Segment'
 *       '404':
 *         description: Segment not found.
 */

