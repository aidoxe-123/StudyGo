export const logMsg = async (msg) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            msg: msg
        })
    }
    return (await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/debug', requestOption)).json();
}