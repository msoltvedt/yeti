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
    crmCSSDirectory: "../creekside-crm/src/main/webapp/css/",
    crmJSDirectory: "../creekside-crm/src/main/webapp/js/yeti/",
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

task(cleanCrmJS);
cleanCrmJS.description = 'Clean the directory *in CRM* that contains Yeti JS files.';

task(pasteJSToCrm);
pasteJSToCrm.description = 'Paste Yeti\'s copy of its JS to CRM.';

task('updateFromOrchestrator', series(cleanCopyOfOrchestratorCSS, copyFromOrchestrator));
task('updateFromOrchestrator').description = 'Clean up and update Yeti\'s copy of Orchestrator\'s CSS';

task('refreshJSToOrchestrator', series(cleanOrchestratorJS, pasteJSToOrchestrator));
task('refreshJSToOrchestrator').description = 'Deletes all Yeti JS *in Orchestrator* and pastes a fresh copy there.';

task('updateToOrchestrator', series(cleanOrchestratorJS, pasteJSToOrchestrator, pasteCSSToOrchestrator, pasteFontsToOrchestrator));
task('updateToOrchestrator').description = 'Update Orchestrator\'s copy of Yeti\'s JS and CSS';

task('default', watcher);
task('default').description = 'The default task is watcher'
task('watch', watcher);
task('watch').description = 'Watches for any changes to the non-JS source code, updates any necessary files, and publishes them to the www directory'

task('pushToDocs', pushToDocs);
task('pushToDocs').description = 'Manually update the Docs folder.';

task(cleanWWW);
cleanWWW.description = 'Remove all Yeti stuff from WWW directory (leaving Stencil stuff)';

task(cleanWWWJS);
cleanWWW.description = 'Remove all Yeti JS from WWW directory';

task(cleanDocs);
cleanDocs.description = 'Remove everything from the GitHub Pages (/docs) directory';

task('css', series(yetiCSS, examplesOnlyCSS, pushOldOrchCSSCopiesToWWW, pushOrchThirdPartyCopiesToWWW, mainCSS)); // Note: the order is important, since mainCSS is expecting a file yetiCSS generates

task('html', publishHTML);

task('examplesJS', publishExamplesJS);

task('fonts', pasteFontsToWWW);

task('startup', series(
    task('updateFromOrchestrator'),
    task('cleanWWW'),
    task('css'),
    task('fonts'),
    task('html'),
    task('examplesJS'),
    watcher
));
task('startup').description = 'Cleans, sets up, and otherwise initilizes www directory; starts watcher';

// task(updateGitHubPages);
// updateGitHubPages.description = 'Updates the /docs folder in preparation for updating the GitHub Pages site';


/************* Function Definitions */

function cleanCopyOfOrchestratorCSS() {
    return deleteAsync([`${settings.yetiCopyOfOrchestratorCSSDirectory}**/*`, `!${settings.orchestratorCSSDirectory}/fonts/**/*`]);
}

function copyFromOrchestrator() {
    // return src([ `${settings.orchestratorCSSDirectory}*.css`, settings.carbonCSS])
    return src(`${settings.orchestratorCSSDirectory}/old/*.css`)
        .pipe( dest(settings.yetiCopyOfOrchestratorCSSDirectory) );
}

function pasteCSSToOrchestrator() {
    return src([`src/css/yeti.css`, 'src/css/main.css'])
        .pipe( dest(settings.orchestratorCSSDirectory) );
}

function pasteCSSToCrm() {
    return src([`src/css/yeti.css`, 'src/css/main.css'])
        .pipe( dest(settings.crmCSSDirectory) );
}

function pasteFontsToOrchestrator() {
    return src(`src/css/fonts/**/*`, { encoding: false })
        .pipe( dest(`${settings.orchestratorCSSDirectory}/fonts`) );
}

function pasteFontsToCrm() {
    return src(`src/css/fonts/**/*`, { encoding: false })
        .pipe( dest(`${settings.crmCSSDirectory}/fonts`) );
}

function cleanOrchestratorJS() {
    return deleteAsync([`${settings.orchestratorJSDirectory}**/*`, `!${settings.orchestratorJSDirectory}`], {force: true});
}

function pasteJSToOrchestrator() {
    return src(`dist/yeti/**/*`)
        .pipe( dest(settings.orchestratorJSDirectory) );
}

function cleanCrmJS() {
    return deleteAsync([`${settings.crmJSDirectory}**/*`, `!${settings.crmJSDirectory}`], {force: true});
}

function pasteJSToCrm() {
    return src(`dist/yeti/**/*`)
        .pipe( dest(settings.crmJSDirectory) );
}

function cleanOrchestratorFonts() {
    return deleteAsync([`${settings.orchestratorCSSDirectory}/fonts/**/*`, `!${settings.orchestratorCSSDirectory}/fonts`], {force: true})
}

function cleanCRMFonts() {
    return deleteAsync([`${settings.crmCSSDirectory}/fonts/**/*`, `!${settings.crmCSSDirectory}/fonts`], {force: true})
}

function watcher(cb) {
    watch(['src/css/**/*.less', 'src/examples/css/yeti-examples-only.less', 'src/css/old/**/*.css', 'src/css/third-party/**/*.css'], series(/*cleanWWWCSS,*/ yetiCSS, examplesOnlyCSS, mainCSS, pushOldOrchCSSCopiesToWWW, pushOrchThirdPartyCopiesToWWW));
    watch('src/**/*.html', series(publishHTML, cleanDocs, pushToDocs));
    watch(['src/examples/**/*.js', 'src/examples/**/*.mjs'], series(cleanWWWJS, publishExamplesJS));
    watch('src/css/third-party/carbon-components.min.css', parallel(pushCarbonCSSToCRM, pushCarbonCSSToOrchestrator));
    watch('src/css/fonts/**/*', series(cleanWWWFonts, pasteFontsToWWW));

    // Optionally update Orchestrator and CRM as well.
    // watch(`dist/yeti/**/*`, series(cleanOrchestratorJS, pasteJSToOrchestrator, cleanCrmJS, pasteJSToCrm));
    watch([`src/css/yeti.css`, 'src/css/main.css'], parallel(pasteCSSToOrchestrator, pasteCSSToCrm));
    // watch(`src/css/fonts/**/*`, series(cleanOrchestratorFonts, cleanCRMFonts, pasteFontsToOrchestrator, pasteFontsToCrm));
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
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('src/examples/css/'))
    .pipe(gulp.dest('www/examples/css/'));
}

function pushOldOrchCSSCopiesToWWW(cb) {
    return gulp.src(['src/css/old/**/*'])
        .pipe(gulp.dest('www/examples/css/old'));
}

function pushOrchThirdPartyCopiesToWWW(cb) {
    return gulp.src(['src/css/third-party/**/*'])
        .pipe(gulp.dest('www/examples/css/third-party'));
}

function pushCarbonCSSToCRM(cb) {
    return gulp.src('src/css/third-party/carbon-components.min.css')
        .pipe(gulp.dest(`${settings.crmCSSDirectory}third-party/`));
}

function pushCarbonCSSToOrchestrator(cb) {
    return gulp.src('src/css/third-party/carbon-components.min.css')
        .pipe(gulp.dest(`${settings.orchestratorCSSDirectory}third-party/`));
}

function cleanWWW(cb) {
    return deleteAsync( ['www/**/*', '!www/'] );
}

function cleanWWWJS(cb) {
    return deleteAsync( ['www/**/yeti/*.js*']);
}

function cleanWWWFonts(cb) {
    return deleteAsync( ['www/**/css/fonts/**/*']);
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
    return gulp.src( ['www/examples/**/*'], { encoding: false })
        .pipe(gulp.dest('docs/'));
}

function pasteFontsToWWW(cb) {
    return gulp.src('src/css/fonts/**/*', { encoding: false })
        .pipe(gulp.dest('www/examples/css/fonts'));
}