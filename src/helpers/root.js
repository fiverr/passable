// @flow
let root: object;

// credit https://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
try {
    root = (() => undefined).constructor('return this')();
} catch (e) {
    root = window;
}

export default root;
