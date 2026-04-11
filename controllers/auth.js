const getSessionStatus = (req, res) => {
    return res.status(200).json({
        authenticated: req.isAuthenticated ? req.isAuthenticated() : false,
        user: req.user || null
    });
};

const githubCallbackSuccess = (req, res) => {
    return res.redirect('/');
};

const githubLoginFailed = (req, res) => {
    return res.status(401).json({ message: 'GitHub authentication failed' });
};

const getCurrentUser = (req, res) => {
    return res.status(200).json({ user: req.user });
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json({ message: 'Logged out successfully' });
    });
};

module.exports = {
    getSessionStatus,
    githubCallbackSuccess,
    githubLoginFailed,
    getCurrentUser,
    logout
};