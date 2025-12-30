export const login = (req, res) => {
    res.render("pages/login", { layout: false })
}

export const register = (req, res) => {
    res.render("pages/register", { layout: false })
}

export const createTemplate = (req, res) => {
    res.render("pages/template", { layout: true })

}

export const homePage = (req, res) => {
    const { name } = req.user
    console.log(req.user)
    res.render("pages/home", { layout: true, name})
}