---
sidebar_position: 1
---

# REST API
There is only one endpoint: <strong><code>/api/rate</code></strong>.

## Params
#### Language (coming soon)
You can specify the language of the comments to be evaluated through the query paramater "lang". 
For now only available in English.

```
https://vibecheck.ouariachi.com/api/rate?lang=English
```

#### Comments
You have to send your comments in the body of the application. You can do this in two ways:

<strong>1. Array of strings.</strong>

_Request:_
```js
[ "This is a good comment.", "Is this a bad comment?" ]
```

_Response:_
```js
[
  {
    "comment": "This is a good comment.",
    "rating": 0.6
  },
  {
    "comment": "Is this a bad comment?",
    "rating": -0.6
  }
]
```

<strong>2. Array of objects</strong>

You can pass an array of objects. This is useful for identifying comments and not relying solely on the content. But, this method requires that your objects have a <code>content</code> property with the content of the comment.

_Request:_
```js
[ 
  {
    "content": "This is a good comment.",
    "user": "Bob",
    "id": 1
  },
  {
    "content": "Is this a bad comment?",
    "id": 2
  }
]
```

_Response:_
```js
[
  {
    "comment": {
      "content": "This is a good comment.",
      "user": "Bob",
      "id": 1
    },
    "rating": 0.6
  },
  {
    "comment": {
      "content": "Is this a bad comment?",
      "id": 2
    },
    "rating": -0.6
  }
]
```
