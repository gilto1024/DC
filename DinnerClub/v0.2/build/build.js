({
    baseUrl: "../",
    paths: {
        "models":"../models"
    },

	optimize: "uglify2",
	optimizeCss: "standard",  //optimizeCss: "standard.keepLines",
    preserveLicenseComments: false,
    removeCombined: true,

    dir: "../PROD",

	modules: [
        {
            name: "scripts/main",
            exclude: "models/"
        }
	]
})