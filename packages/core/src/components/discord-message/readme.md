# discord-message

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                   | Type                     | Default      |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------ |
| `author`      | `author`      | The message author's username.                                                                                                | `string`                 | `'User'`     |
| `avatar`      | `avatar`      | The message author's avatar. Can be an avatar shortcut, relative path, or external link.                                      | `string`                 | `undefined`  |
| `bot`         | `bot`         | Whether the message author is a bot or not. Only works if `server` is `false` or `undefined`.                                 | `boolean`                | `false`      |
| `description` | `description` |                                                                                                                               | `string`                 | `undefined`  |
| `edited`      | `edited`      | Whether the message has been edited or not.                                                                                   | `boolean`                | `false`      |
| `ephemeral`   | `ephemeral`   | Whether to make this message ephemeral.                                                                                       | `boolean`                | `false`      |
| `highlight`   | `highlight`   | Whether to highlight this message.                                                                                            | `boolean`                | `false`      |
| `msgcount`    | `msgcount`    |                                                                                                                               | `number`                 | `undefined`  |
| `op`          | `op`          | Whether the author is the original poster.                                                                                    | `boolean`                | `false`      |
| `profile`     | `profile`     | The id of the profile data to use.                                                                                            | `string`                 | `undefined`  |
| `pronouns`    | `pronouns`    |                                                                                                                               | `string`                 | `undefined`  |
| `roleColor`   | `role-color`  | The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp). | `string`                 | `undefined`  |
| `roleIcon`    | `role-icon`   | The message author's role icon URL.                                                                                           | `string`                 | `undefined`  |
| `roleName`    | `role-name`   | The name of the role to use as alternative image text.                                                                        | `string`                 | `undefined`  |
| `roles`       | --            |                                                                                                                               | `any[]`                  | `undefined`  |
| `server`      | `server`      | Whether the message author is a server crosspost webhook or not. Only works if `bot` is `false` or `undefined`.               | `boolean`                | `false`      |
| `timestamp`   | `timestamp`   | The timestamp to use for the message date.                                                                                    | `Date \| null \| string` | `new Date()` |
| `twentyFour`  | `twenty-four` | Whether to use 24-hour format for the timestamp.                                                                              | `boolean`                | `false`      |
| `userid`      | `userid`      |                                                                                                                               | `number`                 | `undefined`  |
| `verified`    | `verified`    | Whether the bot is verified or not. Only works if `bot` is `true`                                                             | `boolean`                | `false`      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
