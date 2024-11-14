

onmessage = (e) => {
    console.log(e.data)
    postMessage(`Got ${e.data} command. Processing done! This is the final result.`)
}