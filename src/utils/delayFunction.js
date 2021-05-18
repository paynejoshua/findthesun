export default function RunWithDelay(workPromise, delayMs = 1000) {
    const awaitedPromise = new Promise((resolve, reject) => {
        // Resolve the delay promise after a timeout.
        const delayPromise = new Promise((delayResolve) =>
            setTimeout(delayResolve, delayMs)
        );

        // Wait for both the work and the delay to complete before resolving.
        Promise.all([workPromise, delayPromise])
            .then((results) => { 
                // Resolve with the results of the work.
                resolve(results[0]);
            })
            .catch((error) => {
                reject(error);
            });
    })

    return awaitedPromise;

};