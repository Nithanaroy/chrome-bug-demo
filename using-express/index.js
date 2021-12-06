const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
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
    if (counter > 10) {
        response.end();
    } else {
        response.write(" ;i=" + counter);
        counter++;
        setTimeout(function () {
            sendAndSleep(response, counter);
        }, 1000)
    };
};