# Streaker CLI

GitHub contribution streak/statistic tracking command line application with ASCII contribution graph

[![ci](https://github.com/jamieweavis/streaker-cli/workflows/ci/badge.svg)](https://github.com/jamieweavis/streaker-cli/actions)
[![downloads](https://img.shields.io/npm/dt/streaker-cli.svg)](https://npmjs.com/package/streaker-cli)
[![version](https://img.shields.io/npm/v/streaker.svg)](https://github.com/jamieweavis/streaker-cli/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/streaker-cli/blob/main/LICENSE)

## Installation

```sh
npm install -g streaker
```

## Usage

### Statistics

Display streak & contribution stats for a user:

```sh
$ streaker jamieweavis

  Streak:
    Best     19
    Current  19
    Previous 13

  Contributions:
    Most  50
    Today 9
    Total 503
```

### Graph

Display ASCII GitHub contribution graph for a user:

```
$ streaker jamieweavis --graph

     AprMay Jun  Jul Aug Sept Oct Nov Dec  Jan Feb Mar  Apr
    ┌──────────────────────────────────────────────────────
Sun │                                           ▒     ░░▒░░
Mon │ ░                                        ░░  ░░░▒░▒░░
Tue │  ░             ░               ▒         ░   ▓  ░░▒░
Wed │  ░  ░                          ░         ░░░░░  ░ ░░
Thu │  ░       ░             ░                 ▒ ░   ░▒▒░░
Fri │ ░                                         ░    ▒░░░░
Sat │                                                █░░▓░
    └──────────────────────────────────────────────────────
```

## Built With

- [Node.js](https://github.com/nodejs/node)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Commander.js](https://github.com/tj/commander.js)

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - Cross-platform GitHub contribution streak/statistic tracking menu bar application with reminder notification
- [Contribution](https://github.com/jamieweavis/contribution) - GitHub contribution graph parser - contribution streak & statistic calculator with zero dependencies

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
