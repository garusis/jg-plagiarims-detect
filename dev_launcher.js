const watch = require("watch")
const {fork, spawn} = require("child_process")

watch.createMonitor('src', function (monitor) {
  let mainProcess

  function start() {
    spawn("yarn", ["run", "compile"], {stdio: "inherit"})
      .on("exit", function () {
        mainProcess = fork("./server/dist/index.js", {stdio: "inherit", env: process.env})
        mainProcess.on("exit", start)
      })
  }

  function restart(reason) {
    if (reason) {
      console.log(`\n\nRestarting by ${reason} files`)
    }
    mainProcess.kill()
  }

  monitor.on("created", () => restart("created new"))
  monitor.on("changed", () => restart("changed"))
  monitor.on("removed", () => restart("removed"))

  start()
})
