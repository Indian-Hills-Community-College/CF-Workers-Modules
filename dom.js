/**
 * dom.js
 * Module for creating UI (Bootstrap 5) applications with Cloudflare Workers
 */

export function generateNavbar(args){
    const generateDropdown = (args) => {
        const _args = {
            ...args
        }
        const text = _args.text
        const links = _args.links
        let responseHtml = `
            <li class="nav-item dropdown">	
                <a id="navbar_dropdown_item" class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${text}</a>
                <ul class="dropdown-menu">`
        for(const each of links)
            responseHtml += `<li><a class="dropdown-item" href="${each.link}">${each.text}</a></li>`
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
    <nav class="navbar navbar-expand-lg bg-secondary bg-gradient sticky-top shadow-lg">
        <div class="col-10 container-fluid">
            <button class="my-1 navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <a id="navbar_banner_button" class="fs-5  navbar-brand hide-on-shrink" href="/">${brand}</a>
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
    const navbarObject = {
        brand: title,
        nav: [
            {
                text: 'Test 1',
                links:[{
                    text: 'Test 3',
                    link: '#',
                },{
                    text: 'Test 4',
                    link: '#',
                }],
            },
            {
                text: 'Test 2',
                links:[{
                    text: 'Test 5',
                    link: '#',
                },{
                    text: 'Test 6',
                    link: '#',
                }],
            }
        ]
    }
    return `
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="utf8" />
    <title>WT Portal | ${title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="https://indianhills.edu/favicon.ico">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="/js/jQuery.dirty.js"></script>
    <script src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.13.4/b-2.3.6/b-html5-2.3.6/b-print-2.3.6/datatables.min.js"></script>
    <script src="https://kit.fontawesome.com/5496aaa581.js" crossorigin="anonymous"></script>
    <style>
        .btn {
            font-weight: 700;
            font-size:15px;
            line-height:1.5;
            font-family: Roboto, -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Arial, Ubuntu, sans-serif;
        }

        .btn-primary {
            --bs-btn-color: #fff;
            --bs-btn-bg: hsla(352, 56%, 34.0%, 1);
            --bs-btn-border-color: hsla(352, 56%, 34.0%, 1);
            --bs-btn-hover-color: #fff;
            --bs-btn-hover-bg: hsla(39, 100%, 49.0%, 1);
            --bs-btn-hover-border-color: hsla(39, 100%, 49.0%, 1);
            --bs-btn-focus-shadow-rgb: 49,132,253;
            --bs-btn-active-color: #fff;
            --bs-btn-active-bg: hsla(352, 56%, 34.0%, 1);
            --bs-btn-active-border-color: hsla(352, 56%, 34.0%, 1);
            --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
            --bs-btn-disabled-color: #fff;
            --bs-btn-disabled-bg: #0d6efd;
            --bs-btn-disabled-border-color: #0d6efd;
        }
        
        a {
            --bs-link-color-rgb: var(--ihcc-primary-rgb);
        }

        a:hover {
            --bs-link-color-rgb: var(--ihcc-secondar-rgb);
        }

        .ihcc-center {
            margin-left: auto;
            margin-right: auto;
        }
        
        .ihcc-left-bar {
            border-left: 6px solid #ccc!important;
        }
        

        .sticky-header {
            position: fixed;
            top: 0;
            width: 100%
        }

        .sticky-footer {
            position: fixed;
            bottom: 0;
            width: 100%;
        }

        /* Color Schemes */
        
        .nav-link:hover {
            color:var(--ihcc-secondary)!important;	
        }
        
        .nav-link {
            color:var(--ihcc-light-grey)!important;	
        }
        
        td:hover {
            color:var(--ihcc-secondary)!important;	
        }
        
        .btn:hover {
            color:var(--ihcc-secondary)!important;	
        }
        
        .ihcc-bg-primary {
            --bs-bg-opacity: 1;
            background-color: rgba(var(--ihcc-primary-rgb),var(--bs-bg-opacity))!important
        }
        
        .ihcc-bg-secondary {
            --bs-bg-opacity: 1;
            background-color: rgba(var(--ihcc-secondary-rbg),var(--bs-bg-opacity))!important
        }
        
        .ihcc-primary, .ihcc-hover-primary:hover {
            color:#fff!important;
            background-color:rgb(var(--ihcc-primary-rgb))!important;
        }
        
        .ihcc-secondary, .ihcc-hover-secondary:hover {
            color:#333!important;
            background-color:rgb(var(--ihcc-secondary-rgb))!important;
        }
        
        .ihcc-maroon, .ihcc-hover-maroon:hover {
            color:#fff!important;
            background-color:rgb(var(--ihcc-primary-rgb))!important;
        }
        
        .ihcc-sand, .ihcc-hover-sand:hover {
            color:#333!important;
            background-color:rgb(var(--ihcc-sand-rgb))!important;
        }
        
        .ihcc-gold, .ihcc-hover-gold:hover {
            color:#333!important;
            background-color:rgb(var(--ihcc-secondary-rgb))!important;
        }
        
        .ihcc-dark-grey, .ihcc-hover-dark-grey:hover, .ihcc-dark-gray, .ihcc-hover-dark-gray:hover {
            color:#fff!important;
            background-color:rgb(var(--ihcc-dark-grey-rgb))!important;
        }
        
        .ihcc-light-grey, .ihcc-hover-light-grey:hover, .ihcc-light-gray, .ihcc-hover-light-gray:hover {
            color:#333!important;
            background-color:rgb(var(--ihcc-light-grey-rgb))!important;
        }
    </style>
<head>
<body>
    <div id='mainBody'>
        ${generateNavbar(navbarObject)}
    </div>`
}

export function generateFootcode(args){
    const _args = {
        ...args
    }
    const copyright = _args.copyright || 'Default Worker Seed'
    let footCode = `
        <div class="mx-auto">
            <div id="footer_motto" class="mx-auto ihcc-left-bar p-3 shadow-lg bg-dark bg-gradient text-center panel rounded-0" style="width:15%; min-width:10rem; margin-bottom:7.5rem;">
                <span class="fs-5 text-muted"><i>Life. Changing.</i></span>
            </div>
        </div>
        <footer id="mainFooter" class="border shadow-lg p-2 text-center text-muted bg-secondary bg-gradient mx-auto sticky-footer">`
    if(_args.copyright)
        footCode += `<span id="footerText">${new Date().getFullYear()} © ${copyright}</span>`
    return footCode + `
            </footer>	
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
    </html`
}
