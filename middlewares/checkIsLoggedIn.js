exports.isAuthenticated = (req, res, next) => {
    console.log("Session User:", req.session.user); // Debugging

    if (req.session && req.session.user) {
        return next();
    } else {
        console.log("Unauthorized access - Redirecting to /login");
        return res.redirect("/login");
    }
};