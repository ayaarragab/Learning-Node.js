#!/usr/bin/env node

/* 1. First, we had to do that if we wanted to make some procedures 
that depends on each other, and each one should wait for the other*/

// Example: a timing function

const waitForSeconds = (time, f) => {
    setTimeout(() => {
        f();
    }, time)
}

const waitForImgDownload = (time, f) => {
    setTimeout(() => {
        f();
    }, time)
}

const waitForTxtDownload = (time, f) => {
    setTimeout(() => {
        f();
    }, time)
}

const waitForMetaDataDownload = (time, f) => {
    setTimeout(() => {
        f();
    }, time)
}

const waitForCSS = (time, f) => {
    setTimeout(() => {
        f();
    }, time)
}

waitForSeconds(3000, () => {  // wait you should also wait for downloading image
    waitForImgDownload(3000, () => { // wait you should also wait for downloading txt
        waitForTxtDownload(3000, () => { // wait you should also wait for downloading meta data
            waitForMetaDataDownload(3000, () => { // wait you should also wait for downloading css style
                waitForCSS(3000, () => {}) // Now, we are in the callback hell.
            }) 
        })
    })
})

/**
 * We are doing that because we need to first download CSS styles, when it is downloaded, 
 wait for meta data to be downloaded, then txt, then image, then wait for another seconds. And finally
 we have done what we want. 
 As the task getting more complex, as it will be harder to read or understand the code because
 of the many levels of nesting in code.
 */

// But promises have solved this nesting problem for us

// 2. same timing functions functionality but using promises

const waitForSeconds2 = (time) => {
    return Promise((resolve, reject) => {
        setTimeout(() => resolve, time);
    })
}

// new use with promises
const waitForImgDownload2 = (time) => {
    return Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

const waitForTxtDownload2 = (time) => {
    return Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

const waitForMetaDataDownload2 = (time) => {
    return Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

const waitForCSS2 = (time) => {
    return Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

waitForSeconds2(3000)
.then(waitForImgDownload2(3000))
.then(waitForTxtDownload2(3000))
.then(waitForMetaDataDownload2(3000))
.then(waitForCSS2(3000))


/**
 * Notice how the syntax became more relevant and making sense. But surprisengly, now you can write much easier
   syntax than that.
 */

// 3. Same timing functions functionalities with await
await waitForSeconds2(3000);
await waitForImgDownload2(3000);
await waitForTxtDownload2(3000);
await waitForMetaDataDownload2(3000);
await waitForCSS2(3000);
/**
 * This give you the feel that they are running synchronusly, while they are doing the same as the above syntaxes
   asyncronously
 */
// There is also much simple
