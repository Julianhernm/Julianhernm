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
