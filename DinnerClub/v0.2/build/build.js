({
    baseUrl:"../",
    paths:{
        "text":"scripts/libs/text",
        "dinnerclub":"scripts/dinnerclub",
        "rests":"scripts/rests",
        "questions":"scripts/questions",
        "story":"scripts/story",
        "view":"scripts/view",
        "history":"scripts/history",
        "requireJS":"scripts/libs/require"
    },

    optimize:"uglify2",
    optimizeCss:"standard", //optimizeCss: "standard.keepLines",
    preserveLicenseComments:false,
    removeCombined:true,

    dir:"../PROD",

    modules:[
        {
            name:"scripts/main",
            include:[
                'text',
                'requireJS'
            ],
            excludeShallow:[
                "text!models/questionsList.json",
                "text!models/restList.json",
                "text!models/story.json"
            ]
        }
    ]
})