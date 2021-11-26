function microTaskDone(num) {
  console.log(`MicroTask done`)
}

function taskDone() {
  console.log('Task done')
}

function done() {
  console.log('Start Done')
}

function start() {
  Promise.resolve().then(microTaskDone)

  setTimeout(() => {
    taskDone()
  })

  done()
}

start()
console.log('main done')