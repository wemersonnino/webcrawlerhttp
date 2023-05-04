
const { url } = require('inspector');
const { JSDOM } = require('jsdom')


async function crawlPage(currentURL){
    console.log(`actively crawling: ${currentURL}`);
    try {
        const resp = await fetch(currentURL);
        
        if (resp.status > 399) {
            console.log(`Error in fetch with status code: ${resp.status} , on page ${currentURL}`);
            return
        }

        const contentType = resp.headers.get("content-Type");
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType} , on page ${currentURL}`);
            return
        }
        console.log(await resp.text());

    } catch (error) {
        console.log(`error in fetch: ${error.message}, on page ${currentURL}`)    
    }
    
}

/**
 * 
 * @param htmlBody para capturar o corpo html em formato string
 * @param baseURL  ira representar a URL que estamos rastrando
 * essa function retorn um array  com representacoes das URLs que encontrar
 */
function getURLsFromHTML(htmlBody, baseURL){
    const URLs = [];
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        //console.log(linkElement.href);
        if (linkElement.href.slice(0,1) === '/') {
            //relative
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                URLs.push(urlObj.href)
            } catch(err){
                console.log(`Error with relative url: ${err.message}`)
            }
        }
        else{
            //absolute
            try {
                const urlObj = new URL(linkElement.href)
                URLs.push(urlObj.href)
            } catch (error) {
                console.log(`Error with absolute url: ${error.message}`)
            }
        }
        //URLs.push(linkElement.href)
    }


    return URLs

}

/*
    function realized test using jest.
    pego a class URL para usar os seus metodos para editar toda url
    que a function receber.
*/

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    /*
        se hostPath tiver alguma coisa e o ultimo caracter for = a uma /
        entao return a string toda ate o ultimo caracter o menos (-1) do slice captura o ultimo caracater
    */
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}