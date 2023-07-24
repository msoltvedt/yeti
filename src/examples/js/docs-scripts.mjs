import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';

// function that finds demo blocks, adds the sample code and escapes it, and finally calls Highlight on each
/* OLD
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
    }

    // Turn Highlight.js loose
    hljs.configure({
        ignoreUnescapedHTML: true
    })
    hljs.highlightAll();

})(); */


/********************* NEW */
// function that finds demo blocks, adds the sample code and escapes it, and finally calls Highlight on each
(function formatDemoes() {

    // Find all the demoes.
    let demoes = document.getElementsByClassName('ydoc-code_sample');

    for (let demo of demoes) {
        formatDemo(demo);
    }

    function formatDemo(demo) {

        // Create an HTML element that will hold the escaped HTML that Highlight.js will, uh, highlight.
        let preElement = document.createElement('pre');
        let codeSection = document.createElement('div');
        let demoActualWrapper = document.createElement('div');
        let demoHTML = demo.innerHTML;
        let demoContent = demo.childNodes;
        let codeSectionHTML;
        let newContent = [];

        demoActualWrapper.classList.add("ydoc-demo-actual");
        for (let node of demoContent) {
            newContent.push(node);
        }
        for (let i=0; i<newContent.length; i++) {
            demoActualWrapper.append( newContent[i] );
        }
        demo.insertAdjacentElement("afterbegin", demoActualWrapper);
        //demo.innerHTML = `<div class="ydoc-demo-actual">${originalHTML}</div>`;

        demo.classList.add('ydoc-demo__code_expanded');
        codeSection.classList.add('ydoc-demo-code');
        preElement.classList.add('ydoc-demo-pre');

        demoHTML = demoHTML.replace(/\n/, '');
        demoHTML = demoHTML.replace(/</gi, '&lt;');
        demoHTML = demoHTML.replace(/>/gi, '&gt;');
        demoHTML = demoHTML.trim();

        codeSectionHTML =

            `<div class="ydoc-demo-code-title_bar">
                <div class="ydoc-demo-code-title_bar-title">HTML</div>
                <ul class="ydoc-demo-code-title_bar-actions">
                    <li><button class="ydoc-demo-code-title_bar-action ydoc-demo-code-title_bar-action-collapse"><yeti-icon type="unfold_less" alt="collapse code block"></yeti-icon></button></li>
                    <li><button class="ydoc-demo-code-title_bar-action ydoc-demo-code-title_bar-action-expand"><yeti-icon type="unfold_more" alt="expand code block"></yeti-icon></button></li>
                    <li><button class="ydoc-demo-code-title_bar-action ydoc-demo-code-title_bar-action-collapse_all"><yeti-icon type="unfold_less_double" alt="collapse all code blocks"></yeti-icon></button></li>
                    <li><button class="ydoc-demo-code-title_bar-action ydoc-demo-code-title_bar-action-expand_all"><yeti-icon type="unfold_more_double" alt="expand all code blocks"></yeti-icon></button></li>
                </ul>
            </div>

            <div class="ydoc-demo-code-actual">
                <pre class="ydoc-demo-pre"><code class="ydoc-demo-code language-html">${demoHTML}</code></pre>
            </div>`

        ;

        // Attach event listeners to the title bar action buttons
        codeSection.innerHTML = codeSectionHTML;
        
        // collapse
        codeSection.getElementsByClassName("ydoc-demo-code-title_bar-action-collapse")[0].addEventListener("click", () => {demo.classList.remove("ydoc-demo__code_expanded")});

        // expand
        codeSection.getElementsByClassName("ydoc-demo-code-title_bar-action-expand")[0].addEventListener("click", () => {demo.classList.add("ydoc-demo__code_expanded")});

        // collapse all
        codeSection.getElementsByClassName("ydoc-demo-code-title_bar-action-collapse_all")[0].addEventListener("click", () => {
            for (let demo of demoes) {
                demo.classList.remove("ydoc-demo__code_expanded");
            }
        });

        // expand all
        codeSection.getElementsByClassName("ydoc-demo-code-title_bar-action-expand_all")[0].addEventListener("click", () => {
            for (let demo of demoes) {
                demo.classList.add("ydoc-demo__code_expanded");
            }
        });

        preElement.insertAdjacentHTML('afterbegin', `<code class="ydoc-demo-code language-html">${demoHTML}</code>`);

        // Make a copy of the HTML in the demo...

        // ...and escape it.

        // Append the escaped code to the previously created HTML code element for Highlight.js
        demo.insertAdjacentElement('beforeend', codeSection);
    }

    // Turn Highlight.js loose
    hljs.configure({
        ignoreUnescapedHTML: true
    })
    hljs.highlightAll();

    function toggleCodeBlockExpansion() {
        demo.classList.toggle("ydoc-demo__code_expanded");
    }

})();