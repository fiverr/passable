// @flow
let root;

// credit https://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
try {
  root = (() => {}).constructor('return this')();
} catch(e) {
  root = window;
}

export default root;
