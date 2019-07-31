const express = require('express');
const app = express();
const fetch = require('node-fetch');
const createError = require('http-errors');

const random = () => Math.round(Math.random());
const controller = async (req, res, next) => {
    try{
        const result = await service(req.params.client_id);
        res.status(200).send(result);
    }
    catch(err){
        return next(err);
    }
}

const service = async (client_id) => {
    const responseHttpClient404 = httpClient404.parse(
        httpClient404.check( await httpClient404.build() )
    );
    if(random()) throw new Error('Any unexpected internal error');
    if(random()) client_id.hello.world;
    const responseHttpClient500 = httpClient500.parse(
        httpClient404.check( await httpClient500.build())
    );
    return { ... responseHttpClient404, ...responseHttpClient500};
}

const httpClient404 = {
    build: () => {
        const url = `https://httpstat.us/${ random()? 200 : 404 }`;
        return fetch(url);
    },
    check: res => {
        console.log(`httpClient404: ${res.status}`);
        if(res.status  == 404) throw createError.NotFound();
        if(res.status  >= 500) throw createError.BadGateway();

    },
    parse: res => {
        return {
            httpClient404: 'OK'
        };
    }
}

const httpClient500 = {
    build: () => {
        const url = `https://httpstat.us/${ random()? 200 : 500 }`;
        return fetch(url);
    },
    check: res => {
        console.log(`httpClient500: ${res.status}`);
        if(res.status  == 404) throw createError.NotFound();
        if(res.status  >= 500) throw createError.BadGateway();
    },
    parse: res => {
        return {
            httpClient500: 'OK'
        };
    }
}

logErrors = (err, req, res, next) => {
    console.error(err.message);
    next(err);
}

errorHandler = (err, req, res, next) => {
    if(err.status){
        res.status(err.status).send(err.message);
    }
    else res.status(500).send('Internal Server Error');
};

app.get('/:client_id', controller);
app.use(logErrors);
app.use(errorHandler);
app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
