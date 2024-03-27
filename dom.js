/**
 * dom.js
 * Module for creating UI (Bootstrap 5) applications with Cloudflare Workers
 */

export function generateNavbar(args){
    const generateDropdown = (args) => {
        const _args = {
            ...args
        }
        const text = _args.text || ''
        const links = _args.links || []
        let responseHtml = `
            <li class="nav-item dropdown">	
                <a id="navbar_dropdown_item" class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${text}</a>
                <ul class="dropdown-menu border shadow-lg">`
        for(const each of links)
            if(each.text == 'hr')
                responseHtml += `<hr style="color:#533; margin:0; padding:0;">`
            else
                responseHtml += `<li><a class="dropdown-item" target="${each.target || '_self'}" href="${each.link || '#'}">${each.text || ''}</a></li>`
        return responseHtml + `</ul>
            </li>`
    }
    const _args = {
        ...args
    }
    const brand = _args.brand || 'Bootstrap 5 Seed'
    const dropdowns = _args.nav || [{}]
    let dropDownHtml = ''
    for(const each of dropdowns)
        dropDownHtml += generateDropdown(each)
    return `
    <nav class="navbar navbar-expand-lg bg-primary bg-gradient sticky-top shadow-lg">
        <div class="col-10 container-fluid">
            <button class="my-1 navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <a id="navbar_banner_button" class="fs-5 navbar-brand hide-on-shrink" href="/">${brand}</a>
                <ul class="navbar-nav ms-auto">
                    ${dropDownHtml}
                </ul>
            </div>
        </div>
    </nav>
    `
}

// generate headcode for DOM
export function generateHeadCode(args){
    const _args = {
        ...args
    }
    const title = _args.title || 'Home'
    const navbar = _args.navbar || {}
    return `
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="utf8" />
    <title>WT Portal | ${title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="https://indianhills.edu/favicon.ico">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://parking.indianhills.edu/stylesheets/ihcc.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="/js/jQuery.dirty.js"></script>
    <script src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.13.4/b-2.3.6/b-html5-2.3.6/b-print-2.3.6/datatables.min.js"></script>
    <script src="https://kit.fontawesome.com/5496aaa581.js" crossorigin="anonymous"></script>
<head>
<body>
    <div id='mainBody'>
        ${generateNavbar(navbar)}
        `
}

export function generateFootcode(args){
    const _args = {
        ...args
    }
    const copyright = _args.copyright || 'Default Worker Seed'
    let footCode = `
        <div class="mx-auto">
            <div id="footer_motto" class="mx-auto ihcc-left-bar p-3 shadow-lg ihcc-sand bg-gradient text-center panel rounded-0" style="width:15%; min-width:10rem; margin-bottom:7.5rem;">
                <i>Life. Changing.</i>
            </div>
        </div>
    </div>
    <footer id="mainFooter" class="border shadow-lg p-2 text-center text-muted ihcc-light-grey bg-gradient mx-auto sticky-footer">`
if(_args.copyright)
    footCode += `<span id="footerText">${new Date().getFullYear()} © ${copyright}</span>`
return footCode + `
        </footer>	
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </body>
</html>`
}
