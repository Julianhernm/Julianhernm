
export const login = (req, res)=>{
    res.render("pages/login", {layout:false})
};

export const register = (req, res)=>{
    res.render("pages/register", {layout: false})
}