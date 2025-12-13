import { addExercise } from "../repositories/exercises.repository.js";
import {createWorkoutSession } from "../repositories/workout.repository.js";

export const add = async (req, res) => {
    const { user_id, name, created_at } = req.body;

    try {
        const dateNow = new Date()
        const result = await addExercise(user_id, name, dateNow)
        res.status(200).json({ message: "succesfully", result })
    } catch (error) {
        console.error(error)
        res.json({ message: "Server Error" })
    }
}

export const createSessionController = async (req, res) => {
    try {
        const userId = 7;
        const { exercises } = req.body

        const session = await createWorkoutSession(userId, exercises)

        console.log(session)

        res.status(201).json({ message: "session succesfully", session_id: session.id})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}