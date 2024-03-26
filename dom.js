/**
 * dom.js
 * Module for creating UI (Bootstrap 5) applications with Cloudflare Workers
 */

// generate headcode for DOM
const generateHeadCode = title => {
    return `<!DOCTYPE html>
    <html lang="en" data-bs-theme="dark">
        <head>
            <meta charset="utf8" />
            <title>WT Portal</title>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="icon" type="image/x-icon" href="https://indianhills.edu/favicon.ico">

            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css">
        <style>
            root {
            --bs-primary: #003b6f;
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
        </style>`
}

module.exports = {
    generateHeadCode: generateHeadCode,
}