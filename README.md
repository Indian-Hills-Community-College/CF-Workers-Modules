# Cloudflare Workers Modules

General modules that can be used for creating applications using Cloudflare Workers.  
You can add them all at once, or piecemeal.  

To include a module in your Worker, copy the file or module contents into a new file within your Worker project in the same directory (or sub-directory) of your project.  

Include the modules by adding `const module = require('moduleName')` or `const { functionsToInclude } = require('moduleName')` to include specific functions.  

### Contents

- Cloudflare Standard | cloudflareStd.js
- DOM Manipulation | DOM.js  
