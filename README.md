twink
=====

One-shot task runner and condition checker

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/twink.svg)](https://npmjs.org/package/twink)
[![Downloads/week](https://img.shields.io/npm/dw/twink.svg)](https://npmjs.org/package/twink)
[![License](https://img.shields.io/npm/l/twink.svg)](https://github.com/austindebruyn/twink/blob/master/package.json)

<!-- toc -->
# Usage

`twink` is an experimental swiss-army knife for checking the output of short-lived tasks.

## Twinking HTTP

```sh
# Exits successfully if a 200 is returned.
$ twink https://website.com
```

```sh
# Exits successfully if a 404 is returned.
$ twink https://website.com -e 404
```

```sh
# Exits successfully if the string "Hocus Pocus" appears in the HTTP response
$ twink https://website.com -e "Hocus Pocus"
```

## Twinking commands

```sh
# Exits successfully if the `file` command exits successfully
$ twink "file filename.mp3"
```

```sh
# Exits successfully if the `file` if the string "JPEG image data, Exif standard" appears
$ twink "file filename.mp3" -e "JPEG image data, Exif standard"
```

# Future work

## Ideas for uses

1. Health checking a number of endpoints
2. Multiple quick expectations in automated testing
3. More to come...

## Ideas for future runners

```sh
# See if the given port is open
$ twink 192.168.0.0:443
```
