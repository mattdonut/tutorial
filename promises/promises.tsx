const usingThisArg = true
// Most common usage
returnsAPromise(usingThisArg).then(value => {
    doSomethingWith(value)
})

// Some sample definitions of those functiona
function returnsAPromise(usingThisArg: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (usingThisArg) {
            resolve(usingThisArg)
        }
        else {
            reject(new Error('You supplied a falsy argument!'))
        }
    })
}

function doSomethingWith(value: boolean) {
    console.log('This should always end up being true:', value)
}

// This version seems to do nothing...
returnsAPromise(false).then(value => {
    doSomethingWith(value)
})

// This is because we didn't add a rejection handler, and with a falsy argument we reject our promise

function doSomethingWithError(err: Error) {
    console.log('we are logging an error!' ,err)
}

// We can handle this in two ways
returnsAPromise(false).then(value => {
    doSomethingWith(value)
}, err => {
    doSomethingWithError(err)
}
)

// How many promises are involved here?
returnsAPromise(true).then(value => doSomethingWith(value)).catch(err => doSomethingWithError(err)).finally(() => console.log('cleanup'))
// It's four! How many chains? One!

// Timing!!!

returnsAPromise(true) // This runs right away, and _begins_ the work to be done
.then(value => {
    // This code will only run once the promise settles and we have a value!!
    // It will *never* run in the same event that contains the call to .then()
    doSomethingWith(value)
})
