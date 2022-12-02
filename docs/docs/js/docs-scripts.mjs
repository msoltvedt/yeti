import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';

// function that finds demo blocks, adds the sample code and escapes it, and finally calls Highlight on each
(function formatDemoBlocks() {

    // Find all the demo blocks.
    let demoes = document.getElementsByClassName('ydoc-code_sample');

    for (let demo of demoes) {
        formatDemo(demo);
    }

    function formatDemo(demo) {

        // Create an HTML element that will hold the escaped HTML that Highlight.js will, uh, highlight.
        let preElement = document.createElement('pre');
        let demoHTML = demo.innerHTML;

        preElement.classList.add('ydoc-code_sample-pre');

        demoHTML = demoHTML.replace(/\n/, '');
        demoHTML = demoHTML.replace(/</gi, '&lt;');
        demoHTML = demoHTML.replace(/>/gi, '&gt;');
        demoHTML = demoHTML.trim();

        preElement.insertAdjacentHTML('afterbegin', `<code class="ydoc-code_sample-code language-html">${demoHTML}</code>`);

        // Make a copy of the HTML in the demo...

        // ...and escape it.

        // Append the escaped code to the previously created HTML code element for Highlight.js
        demo.insertAdjacentElement('beforeend', preElement);

        // Turn Highlight.js loose
        hljs.highlightAll();
    }

})();