import { addExercise, destroyExercises } from "../repositories/exercises.repository.js";
import {createWorkoutSession } from "../repositories/workout.repository.js";
import { createTemplate } from "../repositories/template.js";

export const add = async (req, res) => {
    const { name } = req.body;

    try {
        const dateNow = new Date()
        const result = await addExercise(   20, name, dateNow)
        res.status(200).json({ message: "successfully", result })
    } catch (error) {
        console.error(error)
        res.json({ message: "Server Error" })
    }
}

export const createSessionController = async (req, res) => {
    try {
        const userId =9;
        const { exercises } = req.body

        const session = await createWorkoutSession(userId, exercises)

        console.log(session)

        res.status(201).json({ message: "session succesfully", session_id: session.id})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteExerciseController = async (req, res)=>{
    const {id, name} = req.body;
     try {
        const result = await destroyExercises(id, name)
        
        if(!result) res.status(404).json({message: "item not found"});

        res.status(200).json({message: "Deleted successfully", data:{id, name}})

     } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})
     }
}

export const newTemplate = async (req, res)=>{
    const {name,exercises} = req.body;

    try {
        const result = await createTemplate(21,name, exercises);

        console.log(result)
        
        res.json({message: "created successfully", result})
    } catch (error) {
        console.error(error)
        res.json({message: "error", error})
    }
}