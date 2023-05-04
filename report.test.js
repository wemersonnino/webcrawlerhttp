const { sortPages } = require('./report');
const { test, expect } =  require('@jest/globals');

test('sortPages 2 pages', ()=>{
    const input  = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/': 3
    };
    const output = sortPages(input); //saida atual que a function sortPages forneceu 
    const expected = [
        ['https://wagslane.dev/',3],
        ['https://wagslane.dev/path',1]
    ]; //saida que esperamos que seja 

    expect(output).toEqual(expected);
});

test('sortPages 5 pages', ()=>{
    const input  = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/': 3,
        'https://wagslane.dev/path2': 5,
        'https://wagslane.dev/path3': 2,
        'https://wagslane.dev/path4': 9,
    };
    const output = sortPages(input); //saida atual que a function sortPages forneceu 
    const expected = [
        ['https://wagslane.dev/path4',9],
        ['https://wagslane.dev/path2',5],
        ['https://wagslane.dev/',3],
        ['https://wagslane.dev/path3',2],
        ['https://wagslane.dev/path',1]
    ]; //saida que esperamos que seja 

    expect(output).toEqual(expected);
});