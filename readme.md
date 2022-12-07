![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square) 

# Yeti Design System

Yeti is a design pattern and component library. Its components are based on StencilJS.

# Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

Todo


## Naming Conventions

### HTML

All component names (i.e. custom HTML tags) need to be unique and prefixed with "yeti-": `<yeti-component></yeti-component>`. Use a single noun whenever possible for the name: `<yeti-widget></yeti-widget>` not `<yeti-fancy></yeti-fancy>` or `<yeti-widget-component></yeti-widget-component>`. Make exceptions when it makes sense.

### CSS

#### Prefix

For now, Yeti has a lot of competition for CSS, so all Yeti classes should be prefixed with `.yeti-`. We hope to remove this requirement later.

#### Pattern/Component Identifier

A unique, human-readable identifier should immediately follow the prefix. Again, use single nouns whenever possible, but if you have to use a short phrase then use an underscore (`_`) as a space. So `.yeti-button` and `.yeti-panel` and good, `.yeti-split_button` is acceptable, and `.yeti-split-button` is not acceptable.

#### Sub-patterns and modifiers

Most patterns and components will have sub-patterns. For example, a `.yeti-list` will probably have a `.yeti-list-item`. These should immediately follow the main identifier and be separated by a hyphen (`-`). They should also follow the single noun practice whenever possible.

Additionally, some classes will have more specific or otherwise distinguished sub-sections and modifiers, and these should follow the same rule. Some examples include `.yeti-margin-none` and `.yeti-padding-left-none`. If there are multiple sub-patterns and/or modifiers, first consider whether there's a better, more semantic name, but if not then order them with sub-patterns first, modifiers after that, and both in increasing order of detail. So `.yeti-table-actions-action-admin_only` rather than `.yeti-table-admin_only-actions-action` or `.yeti-table-actions-action-admin-only`. 

Err on the side of readability over brevity, though a few very limited abbreviations are acceptable if there's proper context (e.g. `.yeti-color-red-fg` is an acceptable abbreviation of `.yeti-color-red-foreground`).

#### States

Finally, if the class uniquely corresponds to a specific browser event or state that has a CSS pseudo-class (e.g. `:hover`, `:focus`, `:disabled`, etc.), then append the state as a suffix preceded by two underscores. A few examples: `.yeti-list-item-link__hover`, `.yeti-button__focus`, and `.yeti-input-text__disabled`. Use the sub-pattern/modifier approach for everything else: `.yeti-input-text-error` not `.yeti-input-text__error`. When in doubt, use the modifier method (`-`) over the state method (`__`).


## Syncing with Orchestrator

Yeti should be installed in a folder right next to its big brother Orchestrator.

To pull the latest from Orchestrator, update Orchestrator as usual, and then in Yeti run the Gulp task `gulp updateFromOrchestrator`. This will clean out Yeti's copy of Orchestrator's CSS, and replace it with a fresh set. Keep in mind that any changes to non-Yeti CSS should always be done in Orchestrator from a branch as usual, and then pulled into Yeti using the above command. Do not modify non-Yeti CSS in Yeti.

Documentation for pushing from Yeti to Orchestrator will be coming soon after finalizing some CSS implementation details.

