const keys = require('../keys')

module.exports = function (email) {
    return {
        to: email,
        from: keys.FROM_EMAIL,
        subject: 'Congratulations, user is created.',
        html: `
            <h1>Welcome to Search system!</h1>
            <p>Congratulation your account is created - ${email}</p>
            <p>Thanks for signing up! To be able to search video, you need to verify your email address. Hit the link below and start Search.</p>
            <hr />
            <a href="${keys.BASE_URL}">Search System</a>
            <p>All the best,</p>
            <p>Search System</p>
            <p>© 2020 Search System</p>
        `
    }
}
