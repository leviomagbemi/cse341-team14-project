const express = require('express');
const { passport } = require('../middleware/passport');
const { ensureAuthenticated, ensureGithubOAuthConfigured } = require('../middleware/authenticate');
const {
    getSessionStatus,
    githubCallbackSuccess,
    githubLoginFailed,
    getCurrentUser,
    logout
} = require('../controllers/auth');

const router = express.Router();

router.get('/status',
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Get current authentication status'
    getSessionStatus
);

router.get(
    '/github',
    ensureGithubOAuthConfigured,
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Start GitHub OAuth login'
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
    '/github/callback',
    ensureGithubOAuthConfigured,
    passport.authenticate('github', {
        failureRedirect: '/auth/login-failed',
        session: true
    }),
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'GitHub OAuth callback'
    githubCallbackSuccess
);

router.get(
    '/login-failed',
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'GitHub OAuth failure handler'
    githubLoginFailed
);

router.get(
    '/me',
    ensureAuthenticated,
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Get current authenticated user'
    getCurrentUser
);

router.post(
    '/logout',
    ensureAuthenticated,
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Log out current user'
    logout
);

module.exports = router;