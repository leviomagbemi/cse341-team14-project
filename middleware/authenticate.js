const ensureAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next();
    }
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: 'You do not have access.' });
    }
    next();
};

const ensureGithubOAuthConfigured = (req, res, next) => {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL } = process.env;
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !CALLBACK_URL) {
        return res.status(500).json({ message: 'GitHub OAuth is not configured.' });
    }
    next();
};

module.exports = {
    ensureAuthenticated,
    ensureGithubOAuthConfigured
};