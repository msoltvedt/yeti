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

2. Use the following subheader to denote a section:

        /************************************** Basic Table Styles ***/

