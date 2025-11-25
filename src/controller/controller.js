export const home = (req, res)=>{
    res.render("pages/login", {layout:false})
};

export const register = (req, res)=>{
    res.render("pages/register", {layout: false})
}

export const login = async (req, res)=>{
    const { email, password } = req.body;
    console.log(email, password)
    res.json({email, password})
}