---
sidebar_position: 2
---

# Client library
## Installation
You can install the VibeCheck client library by executing the next command:

```shell
npm install vibecheck-client
```

## Comment structure
A comment can be a string or an object with the "content" property. This "content" property must be a string.

```js
const comment = "This is a comment";

const commentTwo = {
  content: "This is also a comment",
  commentId: 1
}
```

## Functions
You have three functions available. All three functions will return the comments as you passed them in the first place, keeping all the data from the original comment and adding a new "rating" parameter, except, if the comment was a string, in that case it will return an object with the original string in the "content" property.

### 1. Rate
This function is asynchronous.

#### Parameters
a. comment: A comment with the structure explained before.
b. scale: The scale on which the rating percentage will be. By default it is 10, which means that 0.1 will be 1%.

```js
  rate({ content: "This is a good comment", id: 1 }) 
  
  // returns
  {
    comment: {
      conent: "This is a good comment",
      id: 1
    }, 
    rating: 0.6
  }

  
  rate("This is a bad comment")
  
  // returns
  {
    comment: "This is a bad comment",
    rating: -0.6
  }
  
  
  rate("This is a bad comment", 100) 

  // returns
  {
    comment: "This is a bad comment",
    rating: -6
  }
```

### 2. Bulk Rate
This function is asynchronous.

#### Parameters
a. comment: A array of comments.
b. scale: The scale on which the rating percentage will be. By default it is 10.

```js
  bulkRate(["This is a good comment", "This is a bad comment"])

  //returns 
  [
    {
      comment: "This is a good comment",
      rating: 0.6
    }, 
    {
      comment: "This is a bad comment",
      rating: -0.6
    }
  ]
```

### 3. Rating Scale
Scales the comment rating to the specified value. The default scale value is 10.

```js
  ratingScale([...comments], 100)
  ratingScale([...comments], 10)
```