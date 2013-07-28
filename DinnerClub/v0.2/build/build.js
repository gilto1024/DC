({
    "appDir":"../",
    "baseUrl":"scripts",
    "mainConfigFile":"../scripts/main.js",

    "optimize":"uglify2",
    "optimizeCss":"standard",
    "preserveLicenseComments":false,
    "removeCombined":true,

    "dir":"../PROD",

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