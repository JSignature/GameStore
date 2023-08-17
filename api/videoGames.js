const express = require('express')
const router = express.Router()

// const REPLACE_ME = 1

const {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
} = require('../db/videoGames')

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
  try {
    const videoGames = await getAllVideoGames()
    console.log(videoGames)

    res.send(videoGames)
  } catch (error) {
    console.log('jom', error)
    next(error)
  }
})

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const videoGame = await getVideoGameById(req.params.id)
    res.send(videoGame)
  } catch (error) {
    next(error)
  }
})

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
  try {
    const newVideoGame = await createVideoGame(req.body)
    res.send(newVideoGame)
  } catch (error) {
    next(error)
  }
})

// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
  try {
    const putVideoGame = await updateVideoGame(req.params.id, req.body)
    res.send(putVideoGame)
  } catch (error) {
    next(error)
  }
})

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const videoGame = await deleteVideoGame(id)
    res.send(videoGame)
  } catch (error) {
    next(error)
  }
})

module.exports = router
