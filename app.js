const express = require("express"),
    app = express(),
    request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");



/*

FIRST ROUTE : "/" ROUTE.
It does following things:
-> Acts as first page.
-> Serves as search page for subreddits a.k.a communities on reddit
->It renders home.ejs which has a form which renders on "/results" route.
(Refer comments on home route for more info).

*/

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/results", (req, res) => {


    const pre = 'https://www.reddit.com/search.json?q=';
    const subreddit = req.query.sub;
    const post = '&type=sr';



    request(`${pre}${subreddit}${post}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const child = JSON.parse(body);

            // console.log(child);

            if (child.data.children.length == 0) {
                res.redirect("/error");
            } else {
                res.render("results", { child: child });
            }

        }
    });


});

app.get("/hot", (req, res) => {
    //console.log(req.query.kid);
    const pre = "https://www.reddit.com";
    const sub = req.query.kid;
    const post = "hot.json"
        // console.log(`${pre}${sub}${post}`);
    request(`${pre}${sub}${post}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const child = JSON.parse(body);

            res.render("pages/hot", { child: child });
        }
    });
});


app.get("/top", (req, res) => {
    //console.log(req.query.kid);
    const pre = "https://www.reddit.com";
    const sub = req.query.kid;
    const post = "top.json"
        //console.log(`${pre}${sub}${post}`);
    request(`${pre}${sub}${post}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const child = JSON.parse(body);

            res.render("pages/top", { child: child });
        }
    });
});


app.get("/rising", (req, res) => {
    //console.log(req.query.kid);
    const pre = "https://www.reddit.com";
    const sub = req.query.kid;
    const post = "rising.json"
        //console.log(`${pre}${sub}${post}`);
    request(`${pre}${sub}${post}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const child = JSON.parse(body);

            res.render("pages/rising", { child: child });
        }
    });
});



app.get("/new", (req, res) => {
    //console.log(req.query.kid);
    const pre = "https://www.reddit.com";
    const sub = req.query.kid;
    const post = "new.json"
        //console.log(`${pre}${sub}${post}`);
    request(`${pre}${sub}${post}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const child = JSON.parse(body);

            res.render("pages/new", { child: child });
        }
    });
});



app.get("/error", (req, res) => {
    res.render("error");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server working");
});







// "https://www.reddit.com <%= kid.data.url %>"