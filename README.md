# Streaker CLI

GitHub contribution streak/statistic tracking command line application with ASCII contribution graph

[![ci](https://github.com/jamieweavis/streaker-cli/workflows/ci/badge.svg)](https://github.com/jamieweavis/streaker-cli/actions)
[![downloads](https://img.shields.io/npm/dt/streaker-cli.svg)](https://npmjs.com/package/streaker-cli)
[![version](https://img.shields.io/npm/v/streaker.svg)](https://github.com/jamieweavis/streaker-cli/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/streaker-cli/blob/main/LICENSE)

<img width=593 alt="Screenshot" src="./.github/screenshot.png">

## Installation

```sh
npm install -g streaker
```

## Usage

Display streak & contribution stats for a user:
```sh
streaker <username>
```

Display ASCII GitHub contribution graph for a user:
```sh
streaker <username> --graph
```

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - Cross-platform GitHub contribution streak/statistic tracking menu bar application with reminder notification
- [Contribution](https://github.com/jamieweavis/contribution) - GitHub contribution graph parser - contribution streak & statistic calculator with zero dependencies

## Built With

- [Node.js](https://github.com/nodejs/node)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Commander.js](https://github.com/tj/commander.js)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
