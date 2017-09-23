/*
How to use:

var Person = Class.extend({
    name: '',
    init: function (name) {
        this.name = name;
    },
    test: function () {
        console.log('This is a Test');
    }
});

var Ninja = Person.extend({
    test: function () {
        this._super();
    }
});

var p = new Person('Bob');
*/

(function(global) {
    'use strict';

    if (!Object.create) {
        Object.create = (function(){
            function F(){}
            return function(o){
                if (arguments.length != 1) {
                    throw new Error('Object.create implementation only accepts one parameter.');
                }
                F.prototype = o;
                return new F()
            }
        })()
    }

    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    /**
     * A BaseClass you can extend for new classes
     * var newClass = Class.extend({
     *     init: function () {
     *     }
     * });
     *
     * @constructor
     */
    function BaseClass(){}
    BaseClass.extend = function(props) {
        var _super = this.prototype;
        var proto = Object.create(_super);

        for (var name in props) {
            proto[name] = typeof props[name] === "function" && typeof _super[name] == "function" && fnTest.test(props[name])
                ? (function(name, fn){
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, props[name])
                : props[name];
        }

        var newClass = typeof proto.init === "function"
            ? proto.hasOwnProperty("init") ? proto.init : function SubClass(){ _super.init.apply(this, arguments); }
            : function EmptyClass(){};

        newClass.prototype = proto;
        proto.constructor = newClass;
        newClass.extend = BaseClass.extend;

        return newClass;
    };

    global.Class = BaseClass;
})(window);