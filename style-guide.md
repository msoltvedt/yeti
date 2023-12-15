# Yeti Code Style Guide

Yeti does not use an automated code formatter, so this document should provide some guidelines on how to format code you contribute to this repo.

## Main Tenets

1. Prioritize human readability.
2. Use whitespace and comments liberally.
3. The following rules may be broken; use your best judgment.

## HTML

1. Indent child elements...

        <html>

          <head>
            ...
          </head>
      
        </html>

2. ...unless they're brief:

        <label><span class="required">Name *</span></label>

3. Put an empty line between a container tag and its contents...

        <html>

          <head>
            ...
          </head>
      
        </html>

4. ...unless the contents are simple:

        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>

5. Put two empty lines between sibling containers (containers are elements that contain other elements):

        <header>

          <img src="logo.gif">

          <nav class="primary">
            ...
          </nav>

        </header>


        <main>
          ...
        </main>

6. Comment the closing tag of containers with a lot of stuff:

        <div class="big_kahuna">
          ...
        </div><!-- /big_kahuna -->


## CSS/Less

1. Use the following header at the top of each file so we can debug compiled files:
   
        /************************************** table.less ***************************************

        Styles for Table

        *************************************** table.less **************************************/

2. Use the following subheader to denote a section (and precede it with three blank lines):

        /************************************** Basic Table Styles ***/

3. Use the following subheader to denote a subsection (and precede it with two blank lines):

        /*** Styles Common to Both Headings and Cells ***/

4. Use standard CSS formatting for most classes:

        .yeti-table-head {
          background-color: #e0e0e0;
          font-size: 0.875rem;
          letter-spacing: 0.01rem;
          line-height: 1.42857;
        }

5. You *can* use a single line for single property classes:

        .yeti-margin-top-none { margin-top: 0; }

6. You *should* use a single line for *related* single property classes (and line up the opening brases):

        .yeti-margin-top-none { margin-top: 0; }
        .yeti-margin-top-1    { margin-top: @u * 1; }
        .yeti-margin-top-2    { margin-top: @u * 2; }
        .yeti-margin-top-3    { margin-top: @u * 3; }

7. When multiple selectors share the same property set, put each selector on its own line:

        .yeti-table-heading:not(:has(.yeti-table-heading-compound)),
        .yeti-table-heading-compound .yeti-table-heading-button,
        .yeti-table-heading-compound-actual,
        .yeti-table-heading-filter,
        .yeti-table-cell {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          line-height: 1.28572;
        }

8. Put a single empty line between classes...

        .yeti-table-cell {
          padding-bottom: 0.8125rem;
          padding-top: 0.8125rem;
          height: 3rem;
        }

        .yeti-table-body .yeti-table-heading,
        .yeti-table-cell {
          vertical-align: middle;
        }

9. ...unless the second is closely related to the first (like a state or exception):

        .yeti-table__scrollable {
          width: 100%;
          overflow-x: auto;
        }
        .yeti-table__scrollable:focus {
          .yeti-mixin-focus-default();
        }

## JS/TS

1. Comment class properties and methods like this:

        /**
         * Fires when the selected value of the Menu Button becomes a different value.
         */
        @Event({ bubbles: true }) menuButtonChange: EventEmitter;

2. In classes, follow this order when possible:
      1. Properties
      2. State properties
      3. Events
      4. Event handlers
      5. Public methods
      6. Private methods
      7. (Stencil) lifecycle methods in chronological order (i.e. ComponentWillLoad comes before render)

3. Put three empty lines between methods and named functions.

4. Put one empty line on either side of control expressions (like if/else)...

        case "enter": {
        
          // Check to see if the menu is open.
          if (!this.isOpen) {
            
            ...
   
          }
          
          // Menu is already open, so the user just made a selection.
          else {
          
            ...
          
          }
          
          break;
        }

5. ...unless it's very complex (or the whole section won't fit on screen at the same time), in which case use two empty lines:

        if (isTellingUsToDoAllTehThings) {
        
          // ... All Teh Things
        
        }
        
        
        else {
        
          // ... Some of the things
        
        }

6. Put one empty line on either side of the variable initialization blocks at the top of functions:

        parseChildTags() {
        
          let options = this.el.querySelectorAll("yeti-menu-button-option");
          let buttonLabel = this.el.querySelector("yeti-menu-button-contents");
          
          // Something else
   
        }

7. TSX should follow the HTML style guidelines above when possible.
