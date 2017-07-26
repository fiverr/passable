# Passable params

| Name       | Optional? | type     | Description                                                               |
|------------|:---------:|:--------:|---------------------------------------------------------------------------|
| `name`     | No        | String   | A name for the group of tests. E.G - form name                            |
| `specific` | Yes       | Array    | Whitelist of tests to run. Can be completely ommitted                     |
| `passes`   | No        | Function | A function containing the actual validation logic.                        |
| `custom`   | Yes       | Object   | Custom rules to extend the basic ruleset with. Can be completely ommitted |

![alt tag](https://raw.githubusercontent.com/ealush/passable/gh-pages/passable-api.jpg)