/**
 * dom.js
 * Module for creating UI (Bootstrap 5) applications with Cloudflare Workers
 */

// generate headcode for DOM
export function generateHeadCode (args) {
    return `<!DOCTYPE html>
    <html lang="en" data-bs-theme="dark">
        <head>
            <meta charset="utf8" />
            <title>WT Portal | ${args.title || 'Home'}</title>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="icon" type="image/x-icon" href="https://indianhills.edu/favicon.ico">

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css">
        <style>
            root {
                --ihcc-primary: #782F40;
                --ihcc-primary-filter: invert(22%) sepia(16%) saturate(3004%) hue-rotate(300deg) brightness(91%) contrast(88%);
                --ihcc-secondary: #FFA400;
                --ihcc-secondary-filter: invert(56%) sepia(98%) saturate(911%) hue-rotate(359deg) brightness(103%) contrast(106%);
                --ihcc-dark-grey: #776E64;	
                --ihcc-dark-grey-filter: invert(44%) sepia(2%) saturate(2281%) hue-rotate(351deg) brightness(97%) contrast(88%);
                --ihcc-light-grey: #f1f1f1;	
                --ihcc-light-grey-filter: invert(99%) sepia(1%) saturate(522%) hue-rotate(227deg) brightness(118%) contrast(89%);
                --ihcc-dark-gray: #776E64;
                --ihcc-dark-gray-filter: invert(44%) sepia(2%) saturate(2281%) hue-rotate(351deg) brightness(97%) contrast(88%);
                --ihcc-light-gray: #f1f1f1;	
                --ihcc-light-gray-filter: invert(99%) sepia(1%) saturate(522%) hue-rotate(227deg) brightness(118%) contrast(89%);
                --ihcc-sand: #FDF5E6;
                --ihcc-primary-rgb: 120,47,64;
                --ihcc-secondary-rgb: 255,164,0;
                --ihcc-dark-grey-rgb: 119,110,100;
                --ihcc-light-grey-rgb: 241,241,241;
                --ihcc-dark-gray-rgb: 119,110,100;
                --ihcc-light-gray-rgb: 241,241,241;
                --ihcc-sand-rgb: 253,254,230;
                --bs-primary-rgb: var(--ihcc-primary-rgb);
                --bs-secondary-rgb: var(--ihcc-secondary-rgb);
                --bs-emphasis-color-rgb: var(--bs-secondary-rgb);
                --bs-body-bg: var(--ihcc-light-gray);
                --bs-modal-bg: var(--ihcc-light-gray);
            }

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
	<div id='mainBody'>
		<nav class="navbar navbar-expand-lg ihcc-bg-primary sticky-top shadow-lg">
			<div class="col-10 container-fluid">
				<button class="my-1 navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<a id="navbar_banner_button" class="fs-5  navbar-brand hide-on-shrink" href="/">WT Admin Portal</a>
					<ul class="navbar-nav ms-auto">
                        <li id="navbar_admin" class="nav-item dropdown">
                            <a id="navbar_test_1" class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Test 1</a>  
                            <ul class="dropdown-menu">
                                <li><a class="border-top border-bottom dropdown-item" href="#">Test 3</a></li>
                                <li><a class="border-top border-bottom dropdown-item" href="#">Test 4</a></li>
                            </ul>
                        </li>
                        <li class="align-self-center nav-item dropdown">	
                            <a id="navbar_test_2" class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Test 2</a>  
                            <ul class="dropdown-menu">
                                <li><a class="border-top border-bottom dropdown-item" href="#">Test 5</a></li>
                                <li><a class="border-top border-bottom dropdown-item" href="#">Test 6</a></li>
                            </ul>
                        </li>
					</ul>
				</div>
			</div>
		</nav>
	</div>`
}

export function generateFootcode (args) {
    let footCode = `<div id="footer_motto" class="mx-auto ihcc-left-bar p-3 shadow-lg ihcc-sand text-center panel rounded-0" style="width:15%; min-width:10em; margin-bottom:10em;">
		<span class="fs-5 text-muted"><i>Life. Changing.</i></span>
	</div><footer id="mainFooter" class="border shadow-lg p-2 text-center text-muted ihcc-light-grey mx-auto sticky-footer">`
    if(args.copyright)
        footCode += `<span id="footerText">${new Date().getFullYear()} © ${args.copyright}</span>`
    return footCode + `
            </footer>	
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </body>
    </html`
}
