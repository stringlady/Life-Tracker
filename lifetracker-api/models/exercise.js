"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Exercise {
    static async add(creds) {
        const {userId, name, duration, intensity} = creds;
        const requiredCreds = ['userId', 'name', 'duration', 'intensity']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO exercise (
                userid,
                name, 
                duration,
                intensity 
            ) 
            VALUES ($1, $2, $3, $4) 
            RETURNING 
                      userid,
                      name, 
                      duration,
                      intensity, 
                      createdat
                      `,
            [userId, name, duration, intensity]
        )

        const exercise = result.rows[0];

        return exercise;
    }

    static async fetchByExerciseId(exerciseId) {
        const result = await db.query(
            `SELECT exerciseid,
                    userid,
                    name,
                    duration,
                    intensity,
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
                    duration,
                    intensity,
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