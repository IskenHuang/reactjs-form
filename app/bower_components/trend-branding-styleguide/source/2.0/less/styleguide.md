# Welcome to Trend Micro Styleguide
<div style="background: transparent url(public/banner.png) no-repeat center center; background-size: cover; height: 160px;"></div>

<div class="trendmicro size128" style="display:none;">
  <div class="round">
    <div class="gloss"></div>
    <div class="hook-outer">
      <div class="hook"></div>
      <div class="hook-s"></div>
    </div>
    <div class="t">t</div>
    <div class="t2">c</div>
    <div class="gloss-bottom"></div>
  </div>
  <div class="round-shadow"></div>
  <div class="wording-trend">TREND</div>
  <div class="wording-micro">MICRO</div>
  <div class="trademark">™</div>
</div>

Trend Micro Branding Styleguide is used for all of company relative products.
It is good for UI Designers, Visual Designers, Front End Developers and all Trenders.
You could reference this document to help you to think about your design or leverage the existing UI elements without creating everything from scratch.

# How to use

## Use CSS

1. You could use `<link>` tag from HTML document or `@import` CSS files.
2. You could find the output css file under `dist` folder.

## Use Less (Preprocessor)

1. You should have a node.js environment. (http://www.nodejs.org)
2. You should install bower, running this command `npm install -g bower` after installing node.js
3. Please run `bower install` to install relative dependencies like lesshat.
4. Right now you could use import to use any packages you want to use.
5. The default bower installation path would be `bower_components`.

# How to contribute

Visit [Trend Branding StyleGuide](https://gitlab.tw.trendnet.org/randy_lien/trend-branding-styleguide)

## For Developers

# Coding Style

1. Use soft-tabs with a *4 space indent*.
2. *Put spaces after : in property declarations*.
3. *Put spaces before { in rule declarations*.
4. Use *hex color codes* #000 unless using *rgba*.
5. Use *// for comment blocks* (instead of /* */).
6. Document styles with *KSS*.
7. Please reference to CSS guideline to know more details.

```
// This is a good example!
.styleguide-format {
  border: 1px solid #0f0;
  color: #000;
  background: rgba(0,0,0,0.5);
}
```

# Specification

The text from here on is mostly taken from the [KSS specification](https://github.com/kneath/kss/blob/master/SPEC.md).

Unlike TomDoc, not every CSS rule should be documented. You should document a rule declaration when the rule can accurately describe a visual UI element in the styleguide. Each element should have one documentation block describing that particular UI element's various states.

KSS documentation is hierarchical in nature — any documentation blocks at any point within the styleguide hierarchy apply to the documentation blocks beneath that level. This means that documentation for 2.1 applies to documentation for 2.1.3.

## Format

The basic format for KSS documentation can be best explained in an example:

```css
/*
A button suitable for giving stars to someone.

:hover             - Subtle hover highlight.
.stars-given       - A highlight indicating you've already given a star.
.stars-given:hover - Subtle hover highlight on top of stars-given styling.
.disabled          - Dims the button to indicate it cannot be used.

Styleguide 2.1.3.
*/
a.button.star{
  ...
}
a.button.star.stars-given{
  ...
}
a.button.star.disabled{
  ...
}
```

When using a preprocessor that supports the functionality, use `//` to prefix your comment sections (SCSS example):

```less
// A button suitable for giving stars to someone.
//
// :hover             - Subtle hover highlight.
// .stars-given       - A highlight indicating you've already given a star.
// .stars-given:hover - Subtle hover highlight on top of stars-given styling.
// .disabled          - Dims the button to indicate it cannot be used.
//
// Styleguide 2.1.3.
a.button.star{
  ...
  &.star-given{
    ...
  }
  &.disabled{
    ...
  }
}
```

Each KSS documentation block consists of three parts: a description of what the element does or looks like, a list of modifier classes or pseudo-classes and how they modify the element, and a reference to the element's position in the styleguide.

## Style Documentation

The description should be plain sentences of what the CSS rule or hierarchy does and looks like. A good description gives guidance toward the application of elements the CSS rules style.

CSS rules that depend on specific HTML structures should describe those structures using `<element#id.class:pseudo>` notation. For example:

```less
// A feed of activity items. Within each <section.feed>, there should be many
// <article>s which are the  feed items.
```

To describe the status of a set of rules, you should prefix the description with **Experimental** or **Deprecated**.

**Experimental** indicates CSS rules that apply to experimental styling. This can be useful when testing out new designs before they launch (staff only), alternative layouts in A/B tests, or beta features.

```less
// Experimental: An alternative signup button styling used in AB Test #195.
```

**Deprecated** indicates that the rule is slated for removal. Rules that are deprecated should not be used in future development. This description should explain what developers should do when encountering this style.

```less
// Deprecated: Styling for legacy wikis. We'll drop support for these wikis on
// July 13, 2007.
```

## The modifiers section

If the UI element you are documenting has multiple states or styles depending on added classes or pseudo-classes, you should document them in the modifiers section.

```less
// :hover             - Subtle hover highlight.
// .stars-given       - A highlight indicating you've already given a star.
// .stars-given:hover - Subtle hover highlight on top of stars-given styling.
// .disabled          - Dims the button to indicate it cannot be used.
```

## The styleguide section

If the UI element you are documenting has an example in the styleguide, you should reference it using the "Styleguide [ref]" syntax.

```less
// Styleguide 2.1.3.
```

References should be integer sections separated by periods. Each period denotes a hierarchy of the styleguide. Styleguide references can point to entire sections, a portion of the section, or a specific example.

If there is no example, then you must note that there is no reference.

```less
// No styleguide reference.
```

## The markup section

*Note: This section is unofficial, and only implemented in `kss-node`.*

If you wish to include example HTML for the UI element you are documenting, you should include an additional paragraph with sample markup and prefix it with `Markup:`. You should also note the placement of modifier classes with `{$modifiers}`, like so:

```less
// Buttons
//
// :hover - Highlight the button when hovering.
//
// Markup:
// <a href="#" class="button {$modifiers}">Link</a>
// <button class="button {$modifiers}">Button</button>
//
// Styleguide 2.1.3.
```

If you're using the `kss-node` module or CLI, make sure not to include any double line-breaks, as only the first paragraph prefixed with `Markup:` will be included.

# Preprocessor Helper Documentation

If you use a CSS preprocessor like SCSS or LESS, you should document all helper functions (sometimes called mixins).

```less
// Creates a linear gradient background, from top to bottom.
//
// $start - The color hex at the top.
// $end   - The color hex at the bottom.
//
// Compatible in IE6+, Firefox 2+, Safari 4+.
@mixin gradient($start, $end){
  ...
}
```

Each documentation block should have a description section, parameters section, and compatibility section.  The description section follows the same guidelines as style documentation.

## The parameters section

If the mixin takes parameters, you should document each parameter and describe what sort of input it expects (hex, number, etc).

```less
// $start - The color hex at the top.
// $end   - The color hex at the bottom.
```

## The compatibility section

You must list out what browsers this helper method is compatible in.

```less
// Compatible in IE6+, Firefox 2+, Safari 4+.
```

If you do not know the compatibility, you should state as such.

```less
// Compatibility untested.
```

# Styleguide

In order to fully take advantage of KSS, you should create a living styleguide. A living styleguide is a *part of your application* and should include all of the CSS, Javascript, and layout the rest of your application does.

To get started quickly use the CLI tool, which supports custom templates too. If you're feeling game you can (and should) build it up from scratch using the module's API.

Overall, keep in mind that styleguides should adapt to the application they are referencing and be easy to maintain and as automatic as possible.

## Organization

The styleguide should be organized by numbered sections. These sections can go as deep as you like. Every element should have a numbered section to refer to. For example:

    1. Buttons
      1.1 Form Buttons
        1.1.1 Generic form button
        1.1.2 Special form button
      1.2 Social buttons
      1.3 Miscelaneous buttons
    2. Form elements
      2.1 Text fields
      2.2 Radio and checkboxes
    3. Text styling
    4. Tables
      4.1 Number tables
      4.2 Diagram tables

The goal here is to create an organizational structure that is flexible, but  rigid enough to be machine processed and referenced inside of documentation.