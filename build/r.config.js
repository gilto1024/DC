({
    "appDir":"../_tmp/",
    "baseUrl":"scripts",
    "mainConfigFile":"../_tmp/scripts/main.js",

    "optimize":"uglify2",
    "optimizeCss":"standard.keepComments.keepLines",
    "preserveLicenseComments":false,
    "removeCombined":true,

    "dir":"../_tmp/PROD",

    "pragmas":{
        "suppressLogs":true
    },

    "modules":[
        {
            "name":"utils",
            "exclude":[
                "text"
            ]
        },
        {
            "name":"main",
            "include":[
                'text'
            ],
            "exclude":[
                "utils",
                "text"
            ],
            "excludeShallow":[
                "text!models/questionsList.json.txt",
                "text!models/restList.json.txt",
                "text!models/story.json.txt"
            ]
        },
        {
            "name":"about",
            "exclude":[
                "utils",
                "text"
            ]
        }
    ]
})