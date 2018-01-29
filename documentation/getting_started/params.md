# Passable Parameters

| Name       | Optional? | Type     | Description                                                               |
|------------|:---------:|:--------:|---------------------------------------------------------------------------|
| `name`     | No        | String   | A name for the group of tests. E.G - form name                            |
| `specific` | Yes       | Array    | Whitelist of tests to run.                 |
| `passes`   | No        | Function | A function containing the actual validation logic.                        |
| `custom`   | Yes       | Object   | Custom rules to extend the basic ruleset with. |

![api](../assets/img/passable-api.jpg)
