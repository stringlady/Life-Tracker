"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Exercise {
    static async add(creds) {
        const {userId, name, hours} = creds;
        const requiredCreds = ['userId', 'name', 'hours']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO exercise (
                userid,
                name, 
                hours 
            ) 
            VALUES ($1, $2, $3) 
            RETURNING 
                      userid,
                      name, 
                      hours, 
                      createdat
                      `,
            [userId, name, hours]
        )

        const exercise = result.rows;

        return exercise;
    }

    static async fetchByExerciseId(exerciseId) {
        const result = await db.query(
            `SELECT exerciseid,
                    userid,
                    name,
                    hours,
                    createdat
                FROM exercise
                WHERE exerciseid = $1`,
            [exerciseId]
        )
        const user = result.rows;

        return user;
    }

    static async fetchByUserId(userId) {
        const result = await db.query(
            `SELECT exerciseid,
                    userid,
                    name,
                    hours,
                    createdAt
                FROM exercise
                WHERE userid = $1`,
            [userId]
        )
        const user = result.rows;
        
        return user;
    }
}

module.exports = Exercise