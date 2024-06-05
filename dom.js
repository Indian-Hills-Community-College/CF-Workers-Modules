/**
 * dom.js
 * Module for creating UI (Bootstrap 5) applications with Cloudflare Workers
 */

String.prototype.capitalizeFirstChar = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

class HtmlElement {
    constructor(args) {
        this.tag = args.tag || ''
        this.attributes = args.attributes || {}
        this.content = args.content || ''
        this.parent = args.parent || {}
        this.children = args.children || []
    }
    set tag(tag) {
        const htmlTags = ["!--...--", "!DOCTYPE", "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "search", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]
        this._tag = htmlTags.includes(tag) ? tag : 'div'
    }
    get tag() {
        return this._tag
    }
    set attributes(attr) {
        this._attributes = attr
    }
    get attributes() {
        let output = ''
        for (const [key, value] of Object.entries(this._attributes))
            output = ` ${key}="${value}"`
        return output
    }
    set content(content) {
        this._content = content
    }
    get content() {
        return this._content
    }
    set parent(parent) {
        this._parent = parent
    }
    get parent() {
        return this._parent
    }
    addChild(child) {
        if (!this._children.includes(child))
            this._children.push(child)
    }
    set children(children) {
        this._children = children
    }
    get children() {
        return this._children
    }
    renderChildren() {
        let output = ''
        for (const each of this._children) {
            output += each
        }
        return output
    }
    render() {
        return `<${this.tag}${this.attributes}>${this.content}</${this.tag}>`
    }
}

class FormInput extends HtmlElement {
    static fieldWrapper = args => {
        const _args = { ...args }
        const id = _args.id || 'page_form'
        const content = _args.content || ''
        return `<div class="mb-3" id="${id}">${content}</div>`
    }
    constructor(args) {
        super(args)
        this.key = args.key || ''
        this.type = args.type || 'input'
        this.label = args.label || 'Field'
        this.options = args.options || []
        this.value = args.value || ''
        this.placeholder = args.placeholder || ''
    }
    set key(key) {
        this._key = key
    }
    get key() {
        return this._key
    }
    set type(type) {
        const typeList = ['select', 'input', 'textarea']
        const reformattedType = type.trim().toLowerCase()
        this._type = typeList.includes(reformattedType) ? type : "input"
    }
    get type() {
        return this._type
    }
    set label(label) {
        this.formattedLabel = label.trim().capitalizeFirstChar()
        this._label = label
    }
    get label() {
        return 0
    }
    render() {
        const fieldTypes = {
            'select': () => {
                const id = this.id
                const key = this.key
                const label = this.label
                //  options = {
                //      'key': 'value',
                //      'user_id': 'User ID'
                //  }
                const options = this.options
                let content = `<label class="border-0" id="${id}_label">${label}</label>
                    <select id="${id}_field" name="${key}" class="form-control border" style="cursor:auto;box-sizing:border-box;height:40.5px" type="select">`
                for (const { key, value } of options) {
                    const isActive = value == this.value ? ' active' : ''
                    content += `<option value="${key}"${isActive}>${value}</option>`
                }
                content += `</select>`
                return fieldWrapper({ id: id, content: content })
            },
            'textarea': () => {
                const id = this.id || ''
                const key = this.key || ''
                const label = this.label || ''
                const placeholder = this.placeholder || ''
                let content = `
                    <label class="border-0" id="${id}_label">${label}</label>
                    <textarea style="min-height:7.55rem;" rows="4" id="${id}_field" name="${key}" class="form-control border">${placeholder}</textarea>`
                return fieldWrapper({ id: id, content: content })
            },
            'input': () => {
                return 0
            }
        }
        return fieldTypes[this.type]
    }
}

class Form extends HtmlElement {
    static getHtmlFromField = field => {
        const field_outer = args => {
            const _args = { ...args }
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
                for (const { key, value } of options) {
                    const isActive = key == placeholder ? ' active' : ''
                    content += `<option value="${key}"${isActive}>${value}</option>`
                }
                content += `</select>`
                return field_outer({ id: id, content: content })
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
                return field_outer({ id: id, content: content })
            },
            'textarea': field => {
                const id = field.id || ''
                const key = field.key || ''
                const label = field.label || ''
                const placeholder = field.placeholder || ''
                let content = `
                    <label class="border-0" id="${id}_label">${label}</label>
                    <textarea style="min-height:7.55rem;" rows="4" id="${id}_field" name="${key}" class="form-control border">${placeholder}</textarea>`
                return field_outer({ id: id, content: content })
            },
        }
        return field_types[field.field_type]
    }
    constructor(args) {
        super(args)
        this._args = { ...args }
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
        for (const each of this.fields)
            form_html += getHtmlFromField(each)
        return this.form_html = form_html + '</form>'
    }
}

class Page extends HtmlElement {
    static headerDef = ''
    static footerDef = ''
    static setDefs(args) {
        if (args.header)
            Page.setHeaderDef(args.header)
        if (args.footer)
            Page.setFooterDef(args.footer)
    }
    static setHeaderDef(_headerDef) {
        Page.headerDef = _headerDef
    }
    static setFooterDef(_headerDef) {
        Page.footerDef = _footerDef
    }
    constructor(args) {
        super(args)
        this.header = args.title || ''
        this.navbar = args.navbar || [{}]
        this.body = args.body || ''
        this.footer = args.footer || Page.footerDef
        this.parent = args.parent || {}
        this.children = args.children || []
        this.tag = 'html'
    }
    set header(title) {
        this._header = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8" />
        <title>${title}</title>
        ${Page.headerDef}
    </head>`
    }
    get header() {
        return this._header
    }
    set navbar(args) {
        this._navbar = args
    }
    get navbar() {
        return ''
    }
    set body(content) {
        this.content = content
        const body = `
    <body>
    		<div class="main">
            ${this.navbar}
            <div class="container my-5 py-3 ihcc-light-grey shadow-lg ihcc-left-bar col-lg-6 col-11">
                <div class="row">
                    <div class="mx-auto">
                        ${content}
                        ${this.renderChildren()}
                    </div>
                </div>
            </div>
        </div>`
        this._body = body
    }
    get body() {
        return this._body
    }
    set footer(content) {
        this._footer = content
    }
    get footer() {
        return `${this._footer}
    </body>
 </html>`
    }
    render() {
        return this.header + this.navbar + this.body + this.footer
    }
}

const _headerDef = `<meta name = "viewport" content = "width=device-width,initial-scale=1"/>
    <link rel="icon" type="image/x-icon" href="https://indianhills.edu/favicon.ico">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://parking.indianhills.edu/stylesheets/ihcc.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"><\/script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"><\/script>
    <script src="/js/jQuery.dirty.js"><=/script>
    <script src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.13.4/b-2.3.6/b-html5-2.3.6/b-print-2.3.6/datatables.min.js"><=/script>
    <script src="https://kit.fontawesome.com/5496aaa581.js" crossorigin="anonymous"><=/script>
    `

const copyright = `<span id = "footerText">${new Date().getFullYear()} © Indian Hills Community College</span>`
const _footerDef = `<div class="mx-auto">
        <div id="footer_motto" class="mx-auto ihcc-left-bar p-3 shadow-lg ihcc-sand bg-gradient text-center panel rounded-0" style="width:15%; min-width:10rem; margin-bottom:7.5rem;">
            <i>Life. Changing.</i>
        </div>
        </div >
    </div >
    <footer id="mainFooter" class="mx-auto shadow-lg p-2 text-center ihcc-light-grey bg-gradient sticky-footer">
        ${copyright}
    </footer>	
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"><\/script>`

Page.setDefs({ header: _headerDef, footer: _footerDef })
const page = new Page({ title: 'test' })
console.log(page.render())