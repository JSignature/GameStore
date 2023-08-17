const client = require('./client')
const util = require('util')

const REPLACE_ME = 'SELECT * FROM videoGames'

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    const { rows: videoGames } = await client.query(REPLACE_ME)
    return videoGames
  } catch (error) {
    throw new Error('Make sure you have replaced the REPLACE_ME placeholder.')
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    )
    console.log(videoGame)
    return videoGame
  } catch (error) {
    throw error
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  // LOGIC GOES HERE
  console.log(body)
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
    INSERT INTO videoGames(name, description, price, "inStock", "isPopular", "imgUrl")
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
      [
        body.name,
        body.description,
        body.price,
        body.inStock,
        body.isPopular,
        body.imgUrl,
      ]
    )
    return videoGame
  } catch (error) {
    throw error
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
      UPDATE videoGames

      SET name = $2,
          description = $3,
          price = $4,
          "inStock" = $5,
          "isPopular" = $6,
          "imgUrl" = $7


      WHERE id = $1

    RETURNING *;
    `,
      [
        id,
        fields.name,
        fields.description,
        fields.price,
        fields.inStock,
        fields.isPopular,
        fields.imgUrl,
      ]
    )
    return videoGame
  } catch (error) {
    throw error
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            DELETE FROM videoGames
            WHERE id = $1;
        `,
      [id]
    )

    return videoGame
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
}
