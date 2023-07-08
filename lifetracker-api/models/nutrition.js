"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Nutrition {
    static async add(creds) {
        const {userId, name, calories, category} = creds;
        const requiredCreds = ['userId', 'name', 'calories', 'category']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO nutrition (
                userid,
                name, 
                calories, 
                category
            ) 
            VALUES ($1, $2, $3, $4) 
            RETURNING 
                      userid,
                      name, 
                      calories, 
                      category, 
                      createdat
                      `,
            [userId, name, calories, category]
        )

        const nutrition = result.rows[0];

        return nutrition;
    }

    static async fetchByNutritionId(nutritionId) {
        const result = await db.query(
            `SELECT nutritionid,
                    userid,
                    name,
                    calories,
                    category,
                    createdat
                FROM nutrition
                WHERE nutritionid = $1`,
            [nutritionId]
        )
        const user = result.rows;

        return user;
    }

    static async fetchByUserId(userId) {
        const result = await db.query(
            `SELECT nutritionid,
                    userid,
                    name,
                    calories,
                    category,
                    createdat
                FROM nutrition
                WHERE userid = $1`,
            [userId]
        )
        //console.log(result.rows);
        const user = result.rows;
        
        return user;
    }
}

module.exports = Nutrition;