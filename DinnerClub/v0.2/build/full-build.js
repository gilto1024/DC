/**
 *  DinnerClub Build process
 *
 *  @author Yotam Barzilay
 *
 *  Build steps:
 *  ------------
 *
 *  0. Clean up - delete tmp & PROD folders
 *  1. Copy files to tmp folder
 *  2. Replace css filenames in tmp/index.html & tmp/scripts/about.js with sprite-css filenames
 *  3. Run RequireJS optimizer (r.js) from within tmp/build
 *  4. Run SmartSprites on tmp/PROD/style/*.css
 *  5. Delete unnecessary files //TODO
 *  6. copy tmp/PROD to parent folder // TODO
 *  7. delete tmp folder // TODO
 *  8. remove 'build' folder from PROD // TODO
 */


// modules

var wrench = require('wrench')
    , path = require('path')
    , fs = require('fs')
    , exec = require('child_process').exec
    , execFile = require('child_process').execFile
    ;


// Vars

var mainDir = path.join(__dirname, '../')
    , mainPROD = path.join(mainDir, 'PROD')
    , tmpDir = path.join(mainDir, '_tmp')
    , tmpBuild = path.join(tmpDir, 'build')
    , tmpPROD = path.join(tmpDir, 'PROD')
    , smartSpritesDir = path.join(__dirname, '../../../smartsprites')
    ;


/**
 * Build Flow
 */
cleanUp();
createTmpFolder();
replaceCssFilenames();
run_rjs(function() {
    runSmartSprites(function() {
        
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
        filter: /node_modules|PROD|_tmp|\.idea/img
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
 *  3. Run RequireJS optimizer (r.js) from within tmp/build // TODO
 */
function run_rjs(next) {
    console.log('\n*** RUN r.js ***');
    exec('node r.js -o build.js', {
        cwd:tmpBuild
    }, function(err) {
        if (err) {
            return console.log('- r.js build error:\n', arguments);
        }

        next();
    });
}


/**
 *  4. Run SmartSprites on tmp/PROD/style/*.css //TODO
 */
function runSmartSprites(next) {
    console.log('\n*** RUN SMART-SPRITES ***');

    var cssDirPath = path.resolve(path.join(tmpPROD, 'style'));
    //cssDirPath = path.relative(smartSpritesDir, cssDirPath);

    var params = [
        '--css-files',
        cssDirPath + path.sep + '*.css' //).replace(/\\/g, '/')
    ];

    execFile('smartsprites.cmd', params, {
        cwd:smartSpritesDir
    }, function(err, stdout) {
        if (err || (std.indexOf('WARN') != -1)) {
            return console.log('- Error running SmartSprites:\n', arguments);
        }

        next();
    });
}