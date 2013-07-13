({
    "appDir":"../",
    "baseUrl":"scripts",
    "mainConfigFile":"../scripts/main.js",

    "optimize":"uglify2",
    "optimizeCss":"standard",
    "preserveLicenseComments":false,
    "removeCombined":true,

    "dir":"../PROD",

    "modules":[
        {
            "name":"main",
            "include":[
                'text'
            ],
            "excludeShallow":[
                "text!models/questionsList.json",
                "text!models/restList.json",
                "text!models/story.json"
            ]
        },
        {
            "name":"about"
        }
    ]
})