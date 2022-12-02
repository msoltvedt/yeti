import gulp from 'gulp';
const { src, dest, series, parallel, task, watch } = gulp;

import {deleteAsync} from 'del';

import less from 'gulp-less';

import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const settings = {
    orchestratorCSSDirectory: "../orchestrator/OrchestratorUI/src/main/webapp/css/",
    carbonCSS: "../orchestrator/OrchestratorUI/src/main/webapp/lib/carbon.10.56.0/carbon-components.min.css",
    yetiCopyOfOrchestratorCSSDirectory: "src/css/old/",
    yetiCSSDirectory: "src/css/"
}


/************* Tasks */

task(cleanOrchestratorCSS);
cleanOrchestratorCSS.description = 'Clean the directory containing the copies of Orchestrator\'s CSS';

task('updateFromOrchestrator', series(cleanOrchestratorCSS, copyFromOrchestrator));
task('updateFromOrchestrator').description = 'Clean up and update Yeti\'s copy of Orchestrator\'s CSS';

task('default', watcher);
task('watch', watcher);

task('cleanWWW', parallel(cleanWWWCSS, cleanWWWHTML, cleanWWWJS));

task('css', series(yetiCSS, docsOnlyCSS, mainCSS));

task('html', publishHTML);

task('docsJS', publishDocsJS);

task('startup', series(
    task('updateFromOrchestrator'),
    task('cleanWWW'),
    task('css'),
    task('html'),
    task('docsJS'),
    publishHTML,
    watcher
));


/************* Function Definitions */

function cleanOrchestratorCSS() {
    return deleteAsync( `${settings.yetiCopyOfOrchestratorCSSDirectory}**/*` );
}

function copyFromOrchestrator() {
    return src([ `${settings.orchestratorCSSDirectory}*.css`, settings.carbonCSS])
        .pipe( dest(settings.yetiCopyOfOrchestratorCSSDirectory) );
}

function pasteYetiToOrchestrator() {
    /* TODO */
}

function watcher(cb) {
    watch(['src/css/**/*.less', 'src/docs/css/yeti-docs-only.less'], series(/*cleanWWWCSS,*/ yetiCSS, docsOnlyCSS, mainCSS));
    watch('src/**/*.html', series(/*cleanWWWHTML,*/ publishHTML));
    watch(['src/docs/**/*.js', 'src/docs/**/*.mjs'], series(/*cleanWWWJS,*/ publishDocsJS))
    cb();
}

function yetiCSS(cb) {
    return gulp.src('src/css/yeti.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('www/css/'));
}

function docsOnlyCSS(cb) {
    return gulp.src('src/docs/css/yeti-docs-only.less')
    .pipe(less())
    .pipe(gulp.dest('src/docs/css/'))
    .pipe(gulp.dest('www/docs/css/'));
}

function mainCSS(cb) {
    return gulp.src('src/css/main.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('www/css/'));
}

function cleanWWWCSS(cb) {
    return deleteAsync( ['www/**/*.css'] );
}

function publishHTML(cb) {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('www/'));
}

function cleanWWWHTML(cb) {
    return deleteAsync( ['www/**/*.html'] );
}

function publishDocsJS(cb) {
    return gulp.src(['src/docs/**/*.js', 'src/docs/**/*.mjs'])
        .pipe(gulp.dest('www/docs/'));
} 

function cleanWWWJS(cb) {
    return deleteAsync( ['www/docs/**/*.js', 'www/docs/**/*.mjs'] );
}