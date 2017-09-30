# Passable params

| Name       | Optional? | type     | Description                                                               |
|------------|:---------:|:--------:|---------------------------------------------------------------------------|
| `name`     | No        | String   | A name for the group of tests. E.G - form name                            |
| `specific` | Yes       | Array    | Whitelist of tests to run. Can be completely omitted                     |
| `passes`   | No        | Function | A function containing the actual validation logic.                        |
| `custom`   | Yes       | Object   | Custom rules to extend the basic ruleset with. Can be completely omitted |

![alt tag](https://raw.githubusercontent.com/fiverr/passable/master/docs/assets/passable-api.jpg)