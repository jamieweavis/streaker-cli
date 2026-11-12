<div align="center">

# Streaker CLI

GitHub contribution streak and statistic tracking command line application with ASCII contribution graph

[![ci](https://github.com/jamieweavis/streaker-cli/workflows/ci/badge.svg)](https://github.com/jamieweavis/streaker-cli/actions)
[![downloads](https://img.shields.io/npm/dt/streaker.svg)](https://npmjs.com/package/streaker)
[![version](https://img.shields.io/npm/v/streaker.svg)](https://github.com/jamieweavis/streaker-cli/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/streaker-cli/blob/main/LICENSE)

[**Installation**](#installation) · [Usage](#usage) · [Options](#options) · [ASCII Graph](#ascii-graph) · [Related](#related)

</div>

## Installation

```sh
npm install -g streaker
```

## Usage

```sh
streaker <username> [options]
```

### Options

| Option                 | Description                                         | Default |
| ---------------------- | --------------------------------------------------- | ------- |
| `-a, --accent <color>` | Accent color for the icon, headings and graph       | `green` |
| `-g, --graph`          | Show the contribution graph instead of stats        |         |
| `-G, --graph-axis`     | Show the graph with month and day labels            |         |
| `--no-icon`            | Hide the octocat icon                               |         |
| `--no-streak`          | Hide streak stats                                   |         |
| `--no-contributions`   | Hide contribution stats                             |         |
| `-V, --version`        | Print the version                                   |         |
| `-h, --help`           | Show help                                           |         |

Accent colors: `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, a `bright-` variant of each (e.g. `bright-magenta`), or `rainbow` to cycle through them. Colors come from your terminal's own palette, so they follow your theme. Set `NO_COLOR=1` to disable color.

### Stats

Display the octocat, streak stats and contribution stats side by side:

```
$ streaker jamieweavis

   ██▄▄▄▄▄▄██     streak            contributions
  ███▀▀▀▀▀▀███    current      3    today      17
  ██  █  █  ██    best        35    most       52
   ▀▀▄▄▄▄▄▄▀▀     previous     8    total    2110
```

### Segments

Each segment is shown by default. Hide any of them with `--no-<segment>`:

```
$ streaker jamieweavis --no-icon --no-contributions

  streak
  current      3
  best        35
  previous     8
```

### Accent color

Pick from terminal colors: `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, a `bright-` variant of each (e.g. `bright-magenta`), or `rainbow`.

```sh
$ streaker jamieweavis --accent magenta
```

### ASCII Graph

Display the contribution graph for the past year:

> [!NOTE]
> In the terminal, each tile is shaded by contribution level, using the accent color at increasing opacity. GitHub markdown can't render that, so every tile looks the same in the examples below.

```
$ streaker jamieweavis --graph

                            ■                       ■ ■         ■ ■ ■ ■ ■     ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■     ■ ■ ■   ■ ■ ■     ■   ■ ■ ■ ■ ■ ■ ■   ■   ■   ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■   ■ ■ ■     ■ ■     ■ ■   ■ ■ ■ ■ ■ ■ ■   ■ ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■ ■   ■ ■ ■ ■ ■ ■ ■
■   ■ ■ ■ ■     ■ ■     ■ ■ ■ ■ ■ ■ ■ ■ ■   ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
■   ■ ■ ■ ■       ■     ■ ■ ■ ■ ■ ■ ■ ■       ■   ■ ■ ■ ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■   ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
    ■ ■   ■               ■ ■ ■ ■ ■ ■ ■     ■     ■ ■ ■     ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■ ■   ■ ■ ■ ■ ■ ■
                          ■     ■                   ■   ■       ■ ■ ■ ■ ■ ■ ■   ■ ■ ■ ■   ■ ■   ■ ■ ■ ■
```

Add month and day labels with `--graph-axis`:

```
$ streaker jamieweavis --graph-axis

      Nov     Dec     Jan     Feb     Mar       Apr     May       Jun     Jul     Aug       Sept    Oct     Nov
    ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────
Sun │                             ■                       ■ ■         ■ ■ ■ ■ ■     ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
Mon │ ■     ■ ■ ■   ■ ■ ■     ■   ■ ■ ■ ■ ■ ■ ■   ■   ■   ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
Tue │ ■   ■ ■ ■     ■ ■     ■ ■   ■ ■ ■ ■ ■ ■ ■   ■ ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■ ■   ■ ■ ■ ■ ■ ■ ■
Wed │ ■   ■ ■ ■ ■     ■ ■     ■ ■ ■ ■ ■ ■ ■ ■ ■   ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
Thu │ ■   ■ ■ ■ ■       ■     ■ ■ ■ ■ ■ ■ ■ ■       ■   ■ ■ ■ ■ ■   ■ ■ ■ ■ ■ ■ ■ ■ ■   ■   ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
Fri │     ■ ■   ■               ■ ■ ■ ■ ■ ■ ■     ■     ■ ■ ■     ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■   ■ ■   ■ ■ ■ ■ ■ ■
Sat │                           ■     ■                   ■   ■       ■ ■ ■ ■ ■ ■ ■   ■ ■ ■ ■   ■ ■   ■ ■ ■ ■
    └──────────────────────────────────────────────────────────────────────────────────────────────────────────
```

The accent applies to the graph too:

```sh
$ streaker jamieweavis --graph --accent blue
```

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - Cross-platform GitHub contribution streak and statistic tracking menu bar application with reminder notification
- [Contribution](https://github.com/jamieweavis/contribution) - GitHub contribution graph parser calculates contribution streak and commit statistics from a user's GitHub contribution graph page
