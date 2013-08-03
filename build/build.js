/**
 *  DinnerClub Build process
 *
 *  @author Yotam Barzilay
 *
 *
 *  Build steps:
 *  ------------
 *
 *  0. Clean up - delete tmp & PROD folders
 *  1. Copy files to _tmp folder
 *  2. Replace css filenames in _tmp/index.html & _tmp/scripts/about.js with sprite-css filenames
 *  3. Run RequireJS optimizer (r.js)
 *  4. Run SmartSprites on _tmp/PROD/style/*.css
 *  5. Delete unnecessary files //TODO
 *  6. copy _tmp/PROD to parent folder
 *  7. delete tmp folder
 *
 *
 *  TODO
 *  ----
 *  - Remove unnecessary files from the build (non-sprite assets, unused scripts (text, view console))
 *  - minify models JSONs
 *
 */


// modules

var wrench = require('wrench')
    , path = require('path')
    , fs = require('fs')
    , exec = require('child_process').exec
    , execFile = require('child_process').execFile
    ;


// Vars

var mainDir = path.join(__dirname, '../DinnerClub/v0.2/')
    , mainPROD = path.join(__dirname, '../PROD')
    , tmpDir = path.join('..', '_tmp')
    , tmpPROD = path.join(tmpDir, 'PROD')
    , smartSpritesDir = path.join(__dirname, '../smartsprites')
    ;


/**
 * Build Flow
 */
cleanUp();
createTmpFolder();
replaceCssFilenames();
run_rjs(function() {
    runSmartSprites(function() {
        movePRODfromTmp();
        deleteTmpDir();
    });
});


/**
 * 0. Clean up - delete tmp & PROD folders
 */
function cleanUp() {
    console.log('\n*** CLEAN UP ***');

    console.log('- Delete tmp folder: ', path.resolve(tmpDir));
    wrench.rmdirSyncRecursive(tmpDir, true);

    console.log('- Delete PROD folder: ', path.resolve(mainPROD));
    wrench.rmdirSyncRecursive(mainPROD, true);
}


/**
 *  1. Copy files to tmp folder
 */
function createTmpFolder() {
    console.log('\n*** CREATING TEMP FOLDER ***');

    console.log('- Copying files into: ', path.resolve(tmpDir));
    wrench.copyDirSyncRecursive(mainDir, tmpDir, {
        filter: /\.idea/img
    });
}


/**
 * 2. Replace css filenames in tmp/index.html & tmp/scripts/about.js with sprite-css filenames
 */
function replaceCssFilenameInFile(filePath, oldCssFilename, newCssFilename) {
    console.log('- [' + filePath + ']: Replacing "' + oldCssFilename + '" > "' + newCssFilename + '"');
    var fileContent = fs.readFileSync(filePath, "utf8");
    fileContent = fileContent.replace(new RegExp(oldCssFilename, 'img'), newCssFilename);
    fs.writeFileSync(filePath, fileContent);
}


function replaceCssFilenames() {
    console.log('\n*** REPLACE CSS FILENAMES ***');
    replaceCssFilenameInFile(path.join(tmpDir, 'index.html'), 'style.css', 'style-sprite.css');
    replaceCssFilenameInFile(path.join(tmpDir, 'scripts/about.js'), 'about.css', 'about-sprite.css');
}


/**
 *  3. Run RequireJS optimizer (r.js)
 */
function run_rjs(next) {
    console.log('\n*** RUN r.js ***');

    var cmdline = [
        'node',
        'r.js -o r.config.js'/*,
        'dir="' + tmpPROD + '"',
        'appDir="' + tmpDir + '"',
        'mainConfigFile="' + path.join(tmpDir, 'scripts/main.js') + '"'*/
    ].join(' ');
    console.log('- > ' + cmdline)


    exec(cmdline, function(err) {
        if (err) {
            return console.log('- r.js build error:\n', arguments);
        }

        next();
    });
}


/**
 *  4. Run SmartSprites on tmp/PROD/style/*.css
 */
function runSmartSprites(next) {
    console.log('\n*** RUN SMART-SPRITES ***');

    var cssDirPath = path.resolve(path.join(tmpPROD, 'style'));
    
    var params = [
        '--css-files',
        cssDirPath + path.sep + '*.css' //).replace(/\\/g, '/')
    ];

    execFile('smartsprites.cmd', params, {
        cwd:smartSpritesDir
    }, function(err, stdout) {
        if (err || (stdout.indexOf('WARN') != -1)) {
            return console.log('- Error running SmartSprites:\n', arguments);
        }

        next();
    });
}


/**
 *  6. copy _tmp/PROD to parent folder
 */
function movePRODfromTmp() {
    console.log('\n*** COPYING PROD DIR ***');

    console.log('- ' + tmpPROD + ' > ' + mainPROD);
    wrench.copyDirSyncRecursive(tmpPROD, mainPROD);
}


/**
 *  7. delete tmp folder
 */
function deleteTmpDir() {
    console.log('\n*** DELETING TMP DIR ***');

    console.log('- ' + tmpDir);
    wrench.rmdirSyncRecursive(tmpDir);
}