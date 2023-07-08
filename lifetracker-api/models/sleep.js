"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Sleep {
    static async add(creds) {
        const {userId, name, startTime, endTime} = creds;
        const requiredCreds = ['userId', 'name', 'startTime', 'endTime']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO sleep (
                userid,
                name, 
                starttime,
                endtime 
            ) 
            VALUES ($1, $2, $3, $4) 
            RETURNING 
                      userid,
                      name, 
                      starttime,
                      endtime, 
                      createdat
                      `,
            [userId, name, startTime, endTime]
        )

        const nutrition = result.rows;

        return nutrition;
    }

    static async fetchBySleepId(sleepId) {
        const result = await db.query(
            `SELECT sleepid,
                    userid,
                    name,
                    starttime,
                    endtime,
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
                    starttime,
                    endtime,
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