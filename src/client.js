import express from 'express';
import db from './db.js';
const router = express.Router();

router.post('/addNewClient', (req, res) => {
  const {name} = req.body;

  if (!name) {
    return res.status(400).send('Name is required')
  }

  db.run('INSERT INTO users (name) VALUES (?)', [name], function(err) {
    if (err) {
      res.status(500).send(err.message);
    }else {
      res.status(201).json({ id: this.lastID });
    }
  })
});

router.post('/addClientToSegment', (req, res) => {
  const { userId, segmentId } = req.body

  if (!userId || !segmentId) {
    return res.status(400).send('User id or sefment id are required')
  }

  db.run('INSERT INTO user_segments (user_id, segment_id) VALUES (?,?)', [userId, segmentId], function(err){
    if (err) {
      res.status(500).send(err.message)
    }else {
      res.status(200).send('User added to segment')
    }
  })
});

router.get('/userSegments/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT s.id, s.name
    FROM segments s
    JOIN user_segments us ON s.id = us.segment_id
    WHERE us.user_id = ?
  `;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get('/userSegmentList', (req, res) => {

  db.all('SELECT * FROM users', [],  (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    }else {
      res.status(201).json(rows);
    }
  })
});

router.delete('/removeClientFromSegment', (req, res) => {
  const { userId, segmentId } = req.body;

  if (!userId || !segmentId) {
    return res.status(400).send('User ID and Segment ID are required');
  }

  db.run('DELETE FROM user_segments WHERE user_id = ? AND segment_id = ?', [userId, segmentId], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send('Segment removed from user successfully');
    }
  });
});

router.delete('/removeClient', (req, res) => {
  const { userId} = req.body;

  if (!userId) {
    return res.status(400).send('User ID are required');
  }

  db.run('DELETE FROM users WHERE user_id = ?', [userId], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send('User removed successfully');
    }
  });
});

export default router;
