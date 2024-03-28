/**
 * dom.js
 * Module for creating UI (Bootstrap 5) applications with Cloudflare Workers
 */

class Form {
    static getHtmlFromField = field => {
        const field_outer = args => {
            const _args = {...args}
            const id = _args.id || 'page_form'
            const content = _args.content || ''
            return `<div class="mb-3" id="${id}">${content}</div>`
        }

    //  field defined in constructor
        const field_types = {
            'select': field => {
                const id = field.id || ''
                const key = field.key || ''
                const label = field.label || ''
            //  options = {
            //      'key': 'value',
            //      'user_id': 'User ID'
            //  }
                const options = field.options || []
                let content = `<label class="border-0" id="${id}_label">${label}</label>
                    <select id="${id}_field" name="${key}" class="form-control border" style="cursor:auto;box-sizing:border-box;height:40.5px" type="select">`
                for(const {key, value} of options){
                    const isActive = key == placeholder ? ' active' : ''
                    content += `<option value="${key}"${isActive}>${value}</option>`
                }
                content += `</select>`
                return field_outer({id: id, content: content})
            },
            'input': field => {
                const id = field.id || ''
                const key = field.key || ''
                const input_type = field.input_type || ''
                const label = field.label || ''
                const placeholder = field.placeholder || ''
                const content = `
                        <label class="border-0" id="${id}_label">
                            ${label}
                        </label>
                        <input id="${id}_field" name="${key}" value="${placeholder}" class="page_form_displayName form-control border" style="cursor:auto;box-sizing:border-box;height:40.5px" type="${input_type}">
                    `
                return field_outer({id: id, content: content})
            },
            'textarea': field => {
                const id = field.id || ''
                const key = field.key || ''
                const label = field.label || ''
                const placeholder = field.placeholder || ''
                let content = `
                    <label class="border-0" id="${id}_label">${label}</label>
                    <textarea style="min-height:7.55rem;" rows="4" id="${id}_field" name="${key}" class="form-control border">${placeholder}</textarea>`
                return field_outer({id: id, content: content})
            },
        }
        return field_types[field.field_type]
    }
    constructor(args){
        this._args = {...args}
        this.form_html = ''
        this.field_length = this._args.fields ? this._args.fields.length : 0
        this.method = this._args.method || 'GET'
        this.action = this._args.action || '#'
    //  this.fields is an array of objects
    //      { id, type, label, placeholder, options }
        this.fields = this._args.fields || [] 
        delete this._args
    }
    addField = field => {
        return this.fields.push(field)
    }
    get html() {
        let form_html = `<form id="${this.id} class="mx-auto col-lg-9 col-md-11" action="${this.action}" method="${this.method}">`
        for(const each of this.fields)
            form_html += getHtmlFromField(each)
        return this.form_html = form_html + '</form>'
    }
}

export function generatePageCode(args){
    const _args = {...args}
    const title = _args.title || 'Home'
    const content = _args.content || 'No content to display...'
    const text_center = _args.text_center ? 'text-center' : 'text-start'
    const size = _args.size || { 
        external: _args.size_ext || 'col-lg-6 col-11',
        internal: _args.size_int || 'col-11',
    }
    const pageTypes = {
        'basic':
            `<div class="container my-5 py-3 ihcc-light-grey shadow-lg ihcc-left-bar ${size.external}">
                <div>
                    <div class="row">
                        <div class="mx-auto">
                            <div class="my-3 mx-auto ${size.internal}">
                                <div class="fs-3 ${text_center}">${title}</div>
                            </div>
                            <hr>
                            <div class="my-3 mx-auto ${size.internal}">
                                <div class="${text_center}">${content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `,
        'default':
            `<div class="container my-5 py-3 ihcc-light-grey shadow-lg ihcc-left-bar ${size.external}">
                <div>
                    <div class="row">
                        <div class="mx-auto">
                            <div class="my-3 mx-auto ${size.internal}">
                                <div class="${text_center}">${content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    }
    const type = _args.type && Object.keys(pageTypes).includes(_args.type) ? _args.type : 'default'
    return pageTypes[type]
}

export function generateNavbar(args){
    const generateDropdown = (args) => {
        const _args = {...args}
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
    const _args = {...args}
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
    const _args = {...args}
    const title = _args.title || 'Home'
    return `
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="utf8" />
    <title>${title}</title>
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
        `
}

export function generateFootcode(args){
    const _args = {...args}
    const copyright = _args.copyright ? `<span id="footerText">${new Date().getFullYear()} © ${_args.copyright}</span>` : 'Default Worker Seed'
    return `
        <div class="mx-auto">
            <div id="footer_motto" class="mx-auto ihcc-left-bar p-3 shadow-lg ihcc-sand bg-gradient text-center panel rounded-0" style="width:15%; min-width:10rem; margin-bottom:7.5rem;">
                <i>Life. Changing.</i>
            </div>
        </div>
    </div>
    <footer id="mainFooter" class="mx-auto shadow-lg p-2 text-center ihcc-light-grey bg-gradient sticky-footer">
        ${copyright}
    </footer>	
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </body>
</html>`
}

export function generateFullPage(args){
    const _args = {...args}
    const title = _args.title || {}
    const navbar = _args.navbar || {}
    const pageCode = _args.pageCode || {}
    const copyright = _args.copyright || {}
    const responseHtml = generateHeadCode({ title: title }) +
        generateNavbar(navbar) +
        generatePageCode(pageCode) +
        generateFootcode({ copyright: copyright })
    return responseHtml
}
