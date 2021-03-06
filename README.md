Lorax
===
[![Build Status](https://img.shields.io/travis/adrianlee44/lorax/master.svg?style=flat-square)](https://travis-ci.org/adrianlee44/lorax)
[![Coverage Status](https://img.shields.io/coveralls/adrianlee44/lorax/master.svg?style=flat-square)](https://coveralls.io/github/adrianlee44/lorax?branch=master)
[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](https://github.com/adrianlee44/lorax/blob/master/LICENSE-MIT)
[![NPM](https://img.shields.io/npm/v/lorax.svg?style=flat-square)](https://www.npmjs.org/package/lorax)

[![Dependencies](https://img.shields.io/david/adrianlee44/lorax.svg?style=flat-square)](https://david-dm.org/adrianlee44/lorax#info=dependencies&view=table)
[![devDependencies](https://img.shields.io/david/dev/adrianlee44/lorax.svg?style=flat-square)](https://david-dm.org/adrianlee44/lorax#info=devDependencies&view=table)

<img align="right" height="200" src="http://4.bp.blogspot.com/-nIhDGmiP2Vc/T1MD0BbiWxI/AAAAAAAABeQ/3DMn5DYC3YY/s1600/lorax1.png">

Lorax is a simple node package to generate changelog by parsing formatted git commits. One of the problems people run into when working with an open-sourced project is having trouble knowing what have been fixed, updated or created. Some people solve this problem by reading through the git log while other might ask on Github issue or Stackoverflow.

Lorax tries to solve this problem by automating the changelog generation process. Lorax will read through all the commits between tags and gerate a beautiful and easy to read markdown changelog.

[View Lorax's changelog as an example](https://github.com/adrianlee44/lorax/blob/master/changelog.md)

## Example
Using Lorax git commit log as an example

```
commit 76adc163ab03e7e6faf553f3e9ef86b4ab1e31b7
Author: Adrian Lee <adrianlee44@gmail.com>
Date:   Wed Dec 11 02:11:24 2013 -0800

    chore(lorax.json): Switched to use https

commit 997fe15d42e5f59264edc7e8291c97785d5988f0
Author: Adrian Lee <adrianlee44@gmail.com>
Date:   Wed Dec 11 02:11:07 2013 -0800

    feature(git): Updated getLog function so read all logs when no tag is provided

commit c1cffd76f985bf267bb1983002ab368129a11735
Author: Adrian Lee <adrianlee44@gmail.com>
Date:   Fri Dec 6 09:26:45 2013 -0800

    feature(all): Initial commit
```

Lorax will generate a changelog
```markdown
# v0.1.0 (2013/12/13)
## Features
- **all:** Initial commit
  ([c1cffd76](https://github.com/adrianlee44/lorax/commit/c1cffd76f985bf267bb1983002ab368129a11735))
- **git:** Updated getLog function so read all logs when no tag is provided
  ([997fe15d](https://github.com/adrianlee44/lorax/commit/997fe15d42e5f59264edc7e8291c97785d5988f0))
```

## Installation
```bash
$ npm install -g lorax
```

## Usage

```bash
Usage: lorax -t [tag] [options]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -F, --file [FILE]  Name of the file to write to [changelog.md]
    -s, --since [tag]  Starting tag version
    -t, --tag [tag]    Tag of the upcoming release [1.1.0]
```

To generate the changelog
```bash
$ lorax -t v0.1.0 -F changelog.md
```

## Git commit format
```
type(component): commit message
detailed message

BREAKING CHANGES
- Nothing really

Fixes #123
```

Example
```
feature(lorax): Hello World

Close #321
```

## Configurations
Project can add `lorax.json` in root directory to override default settings
```js
{
  issue: "/issues/%s",
  commit: "/commit/%s",
  type: ["^fix", "^feature", "^refactor", "BREAKING"],
  display: {
    fix: "Bug Fixes",
    feature: "Features",
    breaking: "Breaking Changes",
    refactor: "Optimizations"
  },
  url: "https://github.com/adrianlee44/lorax"
}
```
key | description | Default
--- | --- | ---
issue | Partial URL for issues | `issues/%s`
commit | Partial URL for commits | `/commit/%s`
type | Type of commit message to parse. Items in this array are joined into a string and used for searching commit messages | `["^fix", "^feature", "^refactor", "BREAKING"]`
display | Display name for each commit message type | See next section
url | URL of the Github repo | ''

### Display name default
key | display name
--- | ---
fix | Bug Fixes
feature | Features
breaking | Breaking Changes
refactor | Optimizations
