import { getStatics } from "../repositories/statistics.exercises.js"

export const login = (req, res) => {
    res.render("pages/login", { layout: false })
}

export const register = (req, res) => {
    res.render("pages/register", { layout: false })
}

export const createTemplate = (req, res) => {
    const {name, email} = req.user
    res.render("pages/template", { layout: true, name, email })

}

export const homePage = (req, res) => {
    const { name, email } = req.user
    res.render("pages/home", { layout: true, name, email })
}

export const useTemplate = (req, res) => {
    const {name, email} = req.user
    res.render("pages/workout-session", { layout: true, name, email})
}
export const statics = async (req, res) =>{
    const {template_id} = req.params
    const result = await getStatics(template_id, 36)

    const data = result[1].WorkoutSets.map(e => e.Exercise.name)
    res.send(`<h1> ${data} </h1>`)
}