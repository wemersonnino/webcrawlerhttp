const { normalizeURL } = require('./crawl,js');
const { test, expect } =  require('@jest/globals');

/*
function de nivel superior que recebe como primeira entrada 
o nome do teste "normalizeURL", depois teremos uma function anonima 
e dentro desta function usaremos expect para realizar um teste
*/
test('normalizeURL strip protocol', ()=>{
    const input  = 'https://blog.boot.dev/path';//entrada
    const output = normalizeURL(input); //saida atual que a function normalizeURL forneceu 
    const expected = 'blog.boot.dev/path'; //saida que esperamos que seja 

    /*essa function recebe o valor de saida de normalizeURL, depois a function toEqual recebe
      a expected que e a saida que esperamos que seja  
    */
    expect(output).toEqual(expected);
})

test('normalizeURL strip trailing slash', ()=>{
    const input  = 'https://blog.boot.dev/path/';
    const output = normalizeURL(input); 
    const expected = 'blog.boot.dev/path'; 

    expect(output).toEqual(expected);
})

test('normalizeURL capitals', ()=>{
    const input  = 'https://BLOG.boot.dev/path/';
    const output = normalizeURL(input); 
    const expected = 'blog.boot.dev/path'; 

    expect(output).toEqual(expected);
})

test('normalizeURL strip http', ()=>{
    const input  = 'http://blog.boot.dev/path/';
    const output = normalizeURL(input); 
    const expected = 'blog.boot.dev/path'; 

    expect(output).toEqual(expected);
})
