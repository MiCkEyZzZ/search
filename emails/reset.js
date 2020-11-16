const keys = require('../keys')

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.FROM_EMAIL,
        subject: 'Change password',
        html: `
            <h1>Forgot your password? It happens to the best of us.</h1>
            <p>To reset your password, click the link below. The link will self-destruct after 3 hours.</p>
            <p><a href="${keys.BASE_URL}/recover/${token}">Reset Your Password</a></p>
            <p>If you do not want to change password or didn't request a reset, you can ignore and delete this email.</p>
            <hr />
            <a href="${keys.BASE_URL}">Sibedev</a>
        `
    }
}