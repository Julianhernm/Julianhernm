import { addExercise, destroyExercises } from "../repositories/exercises.repository.js";
import { createWorkoutSession, sessions, useTemplates } from "../repositories/workout.repository.js";
import { createTemplate, getDataTemplate } from "../repositories/template.js";

//create exercises
export const add = async (req, res) => {
    const { name } = req.body;
    try {
        const dateNow = new Date()
        const result = await addExercise(20, name, dateNow)
        res.status(200).json({ message: "successfully", result })
    } catch (error) {
        console.error(error)
        res.json({ message: "Server Error" })
    }
}

export const createSessionController = async (req, res) => {
    try {
        const { exercises } = req.body
        const { userId } = req.user

        const session = await createWorkoutSession(userId, exercises)

        res.status(201).json({ message: "session succesfully", session_id: session.id })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteExerciseController = async (req, res) => {
    const { id, name } = req.body;
    try {
        const result = await destroyExercises(id, name)

        if (!result) res.status(404).json({ message: "item not found" });

        res.status(200).json({ message: "Deleted successfully", data: { id, name } })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

export const newTemplate = async (req, res) => {
    const { name, exercises } = req.body;
    const userId = req.user.userId
    try {
        const result = await createTemplate(userId, name, exercises);

        res.json({ message: "created successfully", result })
        console.log(result)
    } catch (error) {
        console.error(error)
        res.json({ message: "error", error })
    }
}

export const showTemplate = async (req, res) => {
    const { userId } = req.user;

    try {
        const data = await getDataTemplate(userId)

        res.status(200).json(
            { message: "successfully", data }
        )
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const templateUsed = async (req, res) => {
    const idWorkout = req.params.id
    try {
        const result = await useTemplates(idWorkout)
        return res.status(200).json({ message: "successfully", result })
    } catch (error) {
        console.error(error);
        res.status(500).json(
            { message: "Server Error" }
        )
    }
}

export const showHistory = async (req, res) => {
    const { userId } = req.user;

    try {
        const data = await sessions(userId)
        return res.status(200).json({ message: "successfully", data })
    } catch (error) {
        console.error(error);
        res.status(500)(
            { message: "Server Error" }
        )
    }
}