Object.assign(window, passable);

setTimeout(() => {
    console.log(`All passable functions are exposed globally,
you can try passable in your console.`);

    console.log(`PASSABLE VERSION:`, passable.VERSION);

    console.table(Object.keys(passable).map((item) => [item, typeof passable[item]]));

    console.log(`You can try:

    const data = {
        useanme: 'example'
    };

    passable('FormName', () => {
        test('username', 'Must be at least 4 chars', () => {
            enforce(data.username).longerThanOrEquals(4);
        });
    });
`)
}, 1000);