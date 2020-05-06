const express = require("express"),
    app = express(),
    request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");



// app.get("/", function(req, res) {

//     const sub = req.query.subreddit;
//     const pre = 'https://www.reddit.com/r/';
//     const post = '/hot.json';
//     //console.log(`${pre}${sub}${post}`);

//     request('https://www.reddit.com/r/nba/hot.json', function(error, response, body) {
//         if (!error && response.statusCode == 200) {

//             const child = JSON.parse(body);
//             //const childData = child.data;

//             // (childData.children).forEach(child => {
//             //     console.log(child.data.title);
//             // });

//             //console.log(child.data.children[0].data.title);
//             res.render("main.ejs", { child, sub: child, sub });
//         }
//     });

// });



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

            if (child.data.children.length == 0) {
                res.render("error");
            } else {
                res.render("results", { child: child });

            }

        }
    });

});

app.listen(3000, () => {
    console.log("Server working");
});