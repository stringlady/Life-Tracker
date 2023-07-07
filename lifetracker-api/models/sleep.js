"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Sleep {
    static async add(creds) {
        const {userId, name, hours} = creds;
        const requiredCreds = ['userId', 'name', 'hours']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO sleep (
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

        const nutrition = result.rows;

        return nutrition;
    }

    static async fetchBySleepId(sleepId) {
        const result = await db.query(
            `SELECT sleepid,
                    userid,
                    name,
                    hours,
                    createdat
                FROM sleep
                WHERE sleepid = $1`,
            [sleepId]
        )
        const user = result.rows;

        return user;
    }

    static async fetchByUserId(userId) {
        const result = await db.query(
            `SELECT sleepid,
                    userid,
                    name,
                    hours,
                    createdat
                FROM sleep
                WHERE userid = $1`,
            [userId]
        )
        const user = result.rows;
        
        return user;
    }
}

module.exports = Sleep