const express = require('express')
const path = require('path');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.send('Hello World 2!')
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/home.html'));
})

function sleep(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`Slept for ${duration}s`), duration * 1000)
    })
}

app.get('/non-stream', async (req, res) => {
    const result = await sleep(5);
    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// credits: https://stackoverflow.com/a/57233050/1585523
app.get('/stream', function (req, res, next) {
    //when using text/plain it did not stream
    //without charset=utf-8, it only worked in Chrome, not Firefox
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    res.write("Thinking...");
    sendAndSleep(res, 1);
});


var sendAndSleep = function (response, counter) {
    if (counter > 5) {
        response.end();
    } else {
        response.write(" ;i=" + counter);
        counter++;
        setTimeout(function () {
            sendAndSleep(response, counter);
        }, 1000)
    };
};