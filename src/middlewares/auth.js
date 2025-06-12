const adminAuth =  (req, res, next)=>{
    console.log("Admin authorization is being checked!");
    const token  = "anni-mishra";
    const isAdminAuthorized = token === "anni-mishra";
    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized Admin, Access denied.");
    } else{
        next();
    }
};


module.exports = {
    adminAuth
};