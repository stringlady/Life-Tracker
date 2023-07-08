"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Activity {
    static async addCals(creds) {
        const {userId, avgCals} = creds;
        const requiredCreds = ['userId', 'avgCals']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO activity (
                userid,
                avgcals
            ) 
            VALUES ($1, $2) 
            RETURNING 
                      userid,
                      avgcals
                      `,
            [userId, avgCals]
        )

        const cals = result.rows[0];

        return cals;
    }

    static async fetchAvgCals(userId) {
        const result = await db.query(
            `SELECT AVG(avgcals)
                FROM activity
                WHERE userid = $1 AND avgcals != 0 `,
            [userId]
        )
        //console.log(result.rows);
        const user = result.rows;
        
        return user;
    }

    static async addDur(creds) {
        const {userId, avgDur} = creds;
        const requiredCreds = ['userId', 'avgDur']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO activity (
                userid,
                avgdur
            ) 
            VALUES ($1, $2) 
            RETURNING 
                      userid,
                      avgdur
                      `,
            [userId, avgDur]
        )

        const dur = result.rows[0];

        return dur;
    }

    static async fetchAvgDur(userId) {
        const result = await db.query(
            `SELECT AVG(avgdur)
                FROM activity
                WHERE userid = $1 AND avgdur != 0`,
            [userId]
        )
        //console.log(result.rows);
        const user = result.rows;
        
        return user;
    }

    static async addHours(creds) {
        const {userId, avgHours} = creds;
        const requiredCreds = ['userId', 'avgHours']

        try {
            validateFields({ required: requiredCreds, obj: creds })
          } catch (err) {
            throw err
          }


        const result = await db.query(
            `INSERT INTO activity (
                userid,
                avghours
            ) 
            VALUES ($1, $2) 
            RETURNING 
                      userid,
                      avghours
                      `,
            [userId, avgHours]
        )

        const hours = result.rows[0];

        return hours;
    }

    static async fetchAvgHours(userId) {
        const result = await db.query(
            `SELECT AVG(avghours)
                FROM activity
                WHERE userid = $1 AND avghours != 0`,
            [userId]
        )
        //console.log(result.rows);
        const user = result.rows;
        
        return user;
    }
}

module.exports = Activity;