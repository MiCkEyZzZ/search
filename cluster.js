const cluster = require('cluster')
const os = require('os')
const pid = process.pid

if (cluster.isMaster) {
    const cpusCount = os.cpus().length
    console.log(`CPUs: ${cpusCount}`)
    console.log(`Master has started. Pid ${pid}`)

    for (let i = 0; i < cpusCount-1; i++) {
        const app = cluster.fork()
        app.on('exit', () => {
            console.log(`App is died! ${app.process.pid}`)
            cluster.fork()
        })
    }
} else if (cluster.isWorker) {
    require('./app.js')
}
