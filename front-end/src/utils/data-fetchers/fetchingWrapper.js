export default function (fetcher, action) {
    let isCancelled = false;
    fetcher()
        .then(response => { if (!isCancelled) action(response); })
        .catch(error => { if (!isCancelled) console.log(error); })
    return () => { isCancelled = true }
}
