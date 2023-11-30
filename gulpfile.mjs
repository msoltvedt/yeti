import gulp from 'gulp';
const { src, dest, series, parallel, task, watch } = gulp;

import {deleteAsync} from 'del';

import less from 'gulp-less';

import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const settings = {
    orchestratorCSSDirectory: "../orchestrator/OrchestratorUI/src/main/webapp/css/",
    orchestratorJSDirectory: "../orchestrator/OrchestratorUI/src/main/webapp/js/yeti/",
    carbonCSS: "../orchestrator/OrchestratorUI/src/main/webapp/lib/carbon.10.56.0/carbon-components.min.css",
    yetiCopyOfOrchestratorCSSDirectory: "src/css/old/",
    yetiCSSDirectory: "src/css/"
}


/************* Tasks */

task(cleanCopyOfOrchestratorCSS);
cleanCopyOfOrchestratorCSS.description = 'Clean the directory containing Yeti\'s copies of Orchestrator\'s CSS';

task(cleanOrchestratorJS);
cleanOrchestratorJS.description = 'Clean the directory *in Orchestrator* that contains Yeti JS files.';

task(pasteJSToOrchestrator);
pasteJSToOrchestrator.description = 'Paste Yeti\'s copy of its JS to Orchestrator.';

task('updateFromOrchestrator', series(cleanCopyOfOrchestratorCSS, copyFromOrchestrator));
task('updateFromOrchestrator').description = 'Clean up and update Yeti\'s copy of Orchestrator\'s CSS';

task('refreshJSToOrchestrator', series(cleanOrchestratorJS, pasteJSToOrchestrator));
task('refreshJSToOrchestrator').description = 'Deletes all Yeti JS *in Orchestrator* and pastes a fresh copy there.';

task('updateToOrchestrator', series(cleanOrchestratorJS, pasteJSToOrchestrator, pasteCSSToOrchestrator));
task('updateToOrchestrator').description = 'Update Orchestrator\'s copy of Yeti\'s JS and CSS';

task('default', watcher);
task('default').description = 'The default task is watcher'
task('watch', watcher);
task('watch').description = 'Watches for any changes to the non-JS source code, updates any necessary files, and publishes them to the www directory'

task(cleanWWW);
cleanWWW.description = 'Remove all Yeti stuff from WWW directory (leaving Stencil stuff)';

task(cleanWWWJS);
cleanWWW.description = 'Remove all Yeti JS from WWW directory';

task(cleanDocs);
cleanDocs.description = 'Remove everything from the GitHub Pages (/docs) directory';

task('css', series(yetiCSS, examplesOnlyCSS, mainCSS)); // Note: the order is important, since mainCSS is expecting a file yetiCSS generates

task('html', publishHTML);

task('examplesJS', publishExamplesJS);

task('startup', series(
    task('updateFromOrchestrator'),
    task('cleanWWW'),
    task('css'),
    task('html'),
    task('examplesJS'),
    publishHTML,
    watcher
));
task('startup').description = 'Cleans, sets up, and otherwise initilizes www directory; starts watcher';

task('updateGitHubPages', series(
    task('cleanDocs'),
    pushToDocs
));
task('updateGitHubPages').description = 'Updates the /docs folder in preparation for updating the GitHub Pages site';


/************* Function Definitions */

function cleanCopyOfOrchestratorCSS() {
    return deleteAsync( `${settings.yetiCopyOfOrchestratorCSSDirectory}**/*` );
}

function copyFromOrchestrator() {
    return src([ `${settings.orchestratorCSSDirectory}*.css`, settings.carbonCSS])
        .pipe( dest(settings.yetiCopyOfOrchestratorCSSDirectory) );
}

function pasteCSSToOrchestrator() {
    return src(`src/css/yeti.css`)
        .pipe( dest(settings.orchestratorCSSDirectory) );
}

function cleanOrchestratorJS() {
    return deleteAsync([`${settings.orchestratorJSDirectory}**/*`, `!${settings.orchestratorJSDirectory}`], {force: true});
}

function pasteJSToOrchestrator() {
    return src(`dist/yeti/**/*`)
        .pipe( dest(settings.orchestratorJSDirectory) );
}

function watcher(cb) {
    watch(['src/css/**/*.less', 'src/examples/css/yeti-examples-only.less'], series(/*cleanWWWCSS,*/ yetiCSS, examplesOnlyCSS, mainCSS));
    watch('src/**/*.html', series(/*cleanWWWHTML,*/ publishHTML));
    watch(['src/examples/**/*.js', 'src/examples/**/*.mjs'], series(cleanWWWJS, publishExamplesJS))

    // Optionally update Orchestrator with dev mode on as well.
    watch(`dist/yeti/**/*`, series(cleanOrchestratorJS, pasteJSToOrchestrator));
    watch(`src/css/yeti.css`, pasteCSSToOrchestrator);
    cb();
}

function yetiCSS(cb) {
    return gulp.src('src/css/yeti.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('src/examples/css/'))
    .pipe(gulp.dest('www/examples/css/'));
}

function examplesOnlyCSS(cb) {
    return gulp.src('src/examples/css/yeti-examples-only.less')
    .pipe(less())
    .pipe(gulp.dest('src/examples/css/'))
    .pipe(gulp.dest('www/examples/css/'));
}

function mainCSS(cb) {
    return gulp.src('src/css/main.less')
    .pipe(less())
    .pipe(gulp.dest('src/examples/css/'))
    .pipe(gulp.dest('www/examples/css/'));
}

function cleanWWW(cb) {
    return deleteAsync( ['www/**/*', '!www/'] );
}

function cleanWWWJS(cb) {
    console.log("In cleanWWWJS");
    return deleteAsync( ['www/**/yeti/*.js*'])
}

function cleanDocs(cb) {
    return deleteAsync( ['docs/**/*', '!docs/'] );
}

function publishHTML(cb) {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('www/'));
}

function publishExamplesJS(cb) {
    return gulp.src(['src/examples/**/*.js', 'src/examples/**/*.mjs'])
        .pipe(gulp.dest('www/examples/'));
}

function pushToDocs(cb) {
    return gulp.src( ['www/examples/**/*'] )
        .pipe(gulp.dest('docs/'));
}