#Chapter 3 focuses on explaining Modularizing and Asynchronous programming techniques of NodeJs

##Modularizing
There are several concepts to remember for modularizing NodeJs code.
1. Scoping fro NodeJS modules
   NodeJs modules do not expose properties or functionality through the Global Scope.
   It allows a calling module to reuse code through the use of the exports or module.exports call.
   exports is a reference that is set to module.exports. When the caller requires the use of module code,
   it typically does it using the following calls:
        * Reusing functionality exposed through  `exports.reusefunction = function() {};` 
            ```javascript
            var reusablemodule = require('./reusablemodule');
            reusablemodule.reusefunction();
            ```
        This will make a synchronous call that through require and assign the exports (module.exports) object to reusablemodule.
        It is typically use to expose properties directly to be use on the exports object. A sample of doing this can be seen in
        currency.js and test-currency.js

        * Reusing functionality exposed through  `modules.exports.constructorfunction = function() {}; `
            ```javascript
            var reusableclassmodule = require('./reusablemodule');
            var instance = new reusableclassmodule();
            instance.reusefunction();
            ```
        This will make a synchronous call that through require and assign the exports (module.exports) constructor object to instance.
        It is typically use to expose a constructor function to be use on the exports object. A sample of doing this can be seen in
        currencyClass.js and test-currencyClass.js
        
        Do take note that assigning constructor objects to exports will not work as that will override the reference from exports to modules.exports
        this causes the contract between require and Nodejs to be broken. This following code will not work
            * Code in shared module
            ```javascript
            var ReusableModule = function() {};
            ReusableModule.prototype.method1 = function() {};
            exports = ReusableModule;            
            ```        
            
            * Code in calling module
            ```javascript
            var ReusableModule = require('./reusablemodule');
            var instance = new ReusableModule();
            instance.method1
            ();
            ```        
2. Search paths for NodeJs modules
3. Entry point for NodeJs modules