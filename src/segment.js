import express from 'express';
import db from './db.js';
const router = express.Router();

router.post('/addNewSegment', (req, res) => {
  const {name} = req.body;

  if (!name) {
    return res.status(400).send('Name is required')
  }

  db.run('INSERT INTO segments (name) VALUES (?)', [name], function(err) {
    if (err) {
      res.status(500).send(err.message);
    }else {
      res.status(201).json({ id: this.lastID });
    }
  })
});

router.get('/getListSegment', (req, res) => {
  db.all('SELECT * FROM segments', [],  (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    }else {
      res.status(201).json(rows);
    }
  })
});

router.delete('/deleteSegment', (req, res) => {
  const { segmentId } = req.body;

  if (!segmentId) {
    return res.status(400).send('Id is required')
  }

  db.run('DELETE FROM segments WHERE id = ?', [segmentId], function(err) {
    if (err) {
      res.status(500).send(err.message);
    }else {
      res.status(200).json('Segment deleted successfully');
    }
  })
});

export default router;
/**
 * @swagger
 * /segments:
 *   post:
 *     summary: Создать новый сегмент.
 *     description: Создать новый сегмент в базе данных.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Segment'
 *     responses:
 *       '201':
 *         description: Сегмент успешно создан.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Segment'
 *       '400':
 *         description: Неверный запрос.
 */
