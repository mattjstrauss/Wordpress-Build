(function($) {

/*
*  new_map
*
*  This function will render a Google Map onto the selected jQuery element
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$el (jQuery element)
*  @return	n/a
*/

function new_map( $el ) {
	
	// var
	var $markers = $el.find('.marker');
	
	
	// vars
	var args = {
		zoom		: 16,
		center		: new google.maps.LatLng(0, 0),
		mapTypeId	: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		scrollwheel:  false,
		styles: [
		    {
		        "featureType": "all",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "saturation": 36
		            },
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 40
		            }
		        ]
		    },
		    {
		        "featureType": "all",
		        "elementType": "labels.text.stroke",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 16
		            }
		        ]
		    },
		    {
		        "featureType": "all",
		        "elementType": "labels.icon",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 20
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 17
		            },
		            {
		                "weight": 1.2
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 20
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 21
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 17
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 29
		            },
		            {
		                "weight": 0.2
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 18
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 16
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 19
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 17
		            }
		        ]
		    }
		]
	};
	
	
	// create map	        	
	var map = new google.maps.Map( $el[0], args);
	
	
	// add a markers reference
	map.markers = [];
	
	
	// add markers
	$markers.each(function(){
		
    	add_marker( $(this), map );
		
	});
	
	
	// center map
	center_map( map );
	
	
	// return
	return map;
	
}

/*
*  add_marker
*
*  This function will add a marker to the selected Google Map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$marker (jQuery element)
*  @param	map (Google Map object)
*  @return	n/a
*/

function add_marker( $marker, map ) {

	// var
	var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

	// create marker
	var image = '/wp-content/themes/blink-182/img/icons/marker.png';
	var marker = new google.maps.Marker({
		position	: latlng,
		map			: map,
		icon        : image
	});

	// add to array
	map.markers.push( marker );

	// if marker contains HTML, add it to an infoWindow
	if( $marker.html() )
	{
		// create info window
		var infowindow = new google.maps.InfoWindow({
			content		: $marker.html()
		});

		// show info window when marker is clicked
		google.maps.event.addListener(marker, 'click', function() {

			infowindow.open( map, marker );

		});
	}

}

/*
*  center_map
*
*  This function will center the map, showing all markers attached to this map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	map (Google Map object)
*  @return	n/a
*/

function center_map( map ) {

	// vars
	var bounds = new google.maps.LatLngBounds();

	// loop through all markers and create bounds
	$.each( map.markers, function( i, marker ){

		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

		bounds.extend( latlng );

	});

	// only 1 marker?
	if( map.markers.length == 1 )
	{
		// set center of map
	    map.setCenter( bounds.getCenter() );
	    map.setZoom( 14 );
	}
	else
	{
		// fit to bounds
		map.fitBounds( bounds );
	}

}

/*
*  document ready
*
*  This function will render each map when the document is ready (page has loaded)
*
*  @type	function
*  @date	8/11/2013
*  @since	5.0.0
*
*  @param	n/a
*  @return	n/a
*/
// global var
var map = null;

$(document).ready(function(){

	$('.acf-map').each(function(){

		// create map
		map = new_map( $(this) );

	});

});

})(jQuery);
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Barba", [], factory);
	else if(typeof exports === 'object')
		exports["Barba"] = factory();
	else
		root["Barba"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//Promise polyfill https://github.com/taylorhakes/promise-polyfill
	
	if (typeof Promise !== 'function') {
	 window.Promise = __webpack_require__(1);
	}
	
	var Barba = {
	  version: '1.0.0',
	  BaseTransition: __webpack_require__(4),
	  BaseView: __webpack_require__(6),
	  BaseCache: __webpack_require__(8),
	  Dispatcher: __webpack_require__(7),
	  HistoryManager: __webpack_require__(9),
	  Pjax: __webpack_require__(10),
	  Prefetch: __webpack_require__(13),
	  Utils: __webpack_require__(5)
	};
	
	module.exports = Barba;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {
	
	  // Store setTimeout reference so promise-polyfill will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var setTimeoutFunc = setTimeout;
	
	  function noop() {
	  }
	
	  // Use polyfill for setImmediate for performance gains
	  var asap = (typeof setImmediate === 'function' && setImmediate) ||
	    function (fn) {
	      setTimeoutFunc(fn, 0);
	    };
	
	  var onUnhandledRejection = function onUnhandledRejection(err) {
	    if (typeof console !== 'undefined' && console) {
	      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
	    }
	  };
	
	  // Polyfill for Function.prototype.bind
	  function bind(fn, thisArg) {
	    return function () {
	      fn.apply(thisArg, arguments);
	    };
	  }
	
	  function Promise(fn) {
	    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
	    if (typeof fn !== 'function') throw new TypeError('not a function');
	    this._state = 0;
	    this._handled = false;
	    this._value = undefined;
	    this._deferreds = [];
	
	    doResolve(fn, this);
	  }
	
	  function handle(self, deferred) {
	    while (self._state === 3) {
	      self = self._value;
	    }
	    if (self._state === 0) {
	      self._deferreds.push(deferred);
	      return;
	    }
	    self._handled = true;
	    asap(function () {
	      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
	      if (cb === null) {
	        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
	        return;
	      }
	      var ret;
	      try {
	        ret = cb(self._value);
	      } catch (e) {
	        reject(deferred.promise, e);
	        return;
	      }
	      resolve(deferred.promise, ret);
	    });
	  }
	
	  function resolve(self, newValue) {
	    try {
	      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
	      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	        var then = newValue.then;
	        if (newValue instanceof Promise) {
	          self._state = 3;
	          self._value = newValue;
	          finale(self);
	          return;
	        } else if (typeof then === 'function') {
	          doResolve(bind(then, newValue), self);
	          return;
	        }
	      }
	      self._state = 1;
	      self._value = newValue;
	      finale(self);
	    } catch (e) {
	      reject(self, e);
	    }
	  }
	
	  function reject(self, newValue) {
	    self._state = 2;
	    self._value = newValue;
	    finale(self);
	  }
	
	  function finale(self) {
	    if (self._state === 2 && self._deferreds.length === 0) {
	      asap(function() {
	        if (!self._handled) {
	          onUnhandledRejection(self._value);
	        }
	      });
	    }
	
	    for (var i = 0, len = self._deferreds.length; i < len; i++) {
	      handle(self, self._deferreds[i]);
	    }
	    self._deferreds = null;
	  }
	
	  function Handler(onFulfilled, onRejected, promise) {
	    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	    this.promise = promise;
	  }
	
	  /**
	   * Take a potentially misbehaving resolver function and make sure
	   * onFulfilled and onRejected are only called once.
	   *
	   * Makes no guarantees about asynchrony.
	   */
	  function doResolve(fn, self) {
	    var done = false;
	    try {
	      fn(function (value) {
	        if (done) return;
	        done = true;
	        resolve(self, value);
	      }, function (reason) {
	        if (done) return;
	        done = true;
	        reject(self, reason);
	      });
	    } catch (ex) {
	      if (done) return;
	      done = true;
	      reject(self, ex);
	    }
	  }
	
	  Promise.prototype['catch'] = function (onRejected) {
	    return this.then(null, onRejected);
	  };
	
	  Promise.prototype.then = function (onFulfilled, onRejected) {
	    var prom = new (this.constructor)(noop);
	
	    handle(this, new Handler(onFulfilled, onRejected, prom));
	    return prom;
	  };
	
	  Promise.all = function (arr) {
	    var args = Array.prototype.slice.call(arr);
	
	    return new Promise(function (resolve, reject) {
	      if (args.length === 0) return resolve([]);
	      var remaining = args.length;
	
	      function res(i, val) {
	        try {
	          if (val && (typeof val === 'object' || typeof val === 'function')) {
	            var then = val.then;
	            if (typeof then === 'function') {
	              then.call(val, function (val) {
	                res(i, val);
	              }, reject);
	              return;
	            }
	          }
	          args[i] = val;
	          if (--remaining === 0) {
	            resolve(args);
	          }
	        } catch (ex) {
	          reject(ex);
	        }
	      }
	
	      for (var i = 0; i < args.length; i++) {
	        res(i, args[i]);
	      }
	    });
	  };
	
	  Promise.resolve = function (value) {
	    if (value && typeof value === 'object' && value.constructor === Promise) {
	      return value;
	    }
	
	    return new Promise(function (resolve) {
	      resolve(value);
	    });
	  };
	
	  Promise.reject = function (value) {
	    return new Promise(function (resolve, reject) {
	      reject(value);
	    });
	  };
	
	  Promise.race = function (values) {
	    return new Promise(function (resolve, reject) {
	      for (var i = 0, len = values.length; i < len; i++) {
	        values[i].then(resolve, reject);
	      }
	    });
	  };
	
	  /**
	   * Set the immediate function to execute callbacks
	   * @param fn {function} Function to execute
	   * @private
	   */
	  Promise._setImmediateFn = function _setImmediateFn(fn) {
	    asap = fn;
	  };
	
	  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
	    onUnhandledRejection = fn;
	  };
	
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = Promise;
	  } else if (!root.Promise) {
	    root.Promise = Promise;
	  }
	
	})(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	
	/**
	 * BaseTransition to extend
	 *
	 * @namespace Barba.BaseTransition
	 * @type {Object}
	 */
	var BaseTransition = {
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {HTMLElement}
	   */
	  oldContainer: undefined,
	
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {HTMLElement}
	   */
	  newContainer: undefined,
	
	  /**
	   * @memberOf Barba.BaseTransition
	   * @type {Promise}
	   */
	  newContainerLoading: undefined,
	
	  /**
	   * Helper to extend the object
	   *
	   * @memberOf Barba.BaseTransition
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj){
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * This function is called from Pjax module to initialize
	   * the transition.
	   *
	   * @memberOf Barba.BaseTransition
	   * @private
	   * @param  {HTMLElement} oldContainer
	   * @param  {Promise} newContainer
	   * @return {Promise}
	   */
	  init: function(oldContainer, newContainer) {
	    var _this = this;
	
	    this.oldContainer = oldContainer;
	    this._newContainerPromise = newContainer;
	
	    this.deferred = Utils.deferred();
	    this.newContainerReady = Utils.deferred();
	    this.newContainerLoading = this.newContainerReady.promise;
	
	    this.start();
	
	    this._newContainerPromise.then(function(newContainer) {
	      _this.newContainer = newContainer;
	      _this.newContainerReady.resolve();
	    });
	
	    return this.deferred.promise;
	  },
	
	  /**
	   * This function needs to be called as soon the Transition is finished
	   *
	   * @memberOf Barba.BaseTransition
	   */
	  done: function() {
	    this.oldContainer.parentNode.removeChild(this.oldContainer);
	    this.newContainer.style.visibility = 'visible';
	    this.deferred.resolve();
	  },
	
	  /**
	   * Constructor for your Transition
	   *
	   * @memberOf Barba.BaseTransition
	   * @abstract
	   */
	  start: function() {},
	};
	
	module.exports = BaseTransition;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Just an object with some helpful functions
	 *
	 * @type {Object}
	 * @namespace Barba.Utils
	 */
	var Utils = {
	  /**
	   * Return the current url
	   *
	   * @memberOf Barba.Utils
	   * @return {String} currentUrl
	   */
	  getCurrentUrl: function() {
	    return window.location.protocol + '//' +
	           window.location.host +
	           window.location.pathname +
	           window.location.search;
	  },
	
	  /**
	   * Given an url, return it without the hash
	   *
	   * @memberOf Barba.Utils
	   * @private
	   * @param  {String} url
	   * @return {String} newCleanUrl
	   */
	  cleanLink: function(url) {
	    return url.replace(/#.*/, '');
	  },
	
	  /**
	   * Time in millisecond after the xhr request goes in timeout
	   *
	   * @memberOf Barba.Utils
	   * @type {Number}
	   * @default
	   */
	  xhrTimeout: 5000,
	
	  /**
	   * Start an XMLHttpRequest() and return a Promise
	   *
	   * @memberOf Barba.Utils
	   * @param  {String} url
	   * @return {Promise}
	   */
	  xhr: function(url) {
	    var deferred = this.deferred();
	    var req = new XMLHttpRequest();
	
	    req.onreadystatechange = function() {
	      if (req.readyState === 4) {
	        if (req.status === 200) {
	          return deferred.resolve(req.responseText);
	        } else {
	          return deferred.reject(new Error('xhr: HTTP code is not 200'));
	        }
	      }
	    };
	
	    req.ontimeout = function() {
	      return deferred.reject(new Error('xhr: Timeout exceeded'));
	    };
	
	    req.open('GET', url);
	    req.timeout = this.xhrTimeout;
	    req.setRequestHeader('x-barba', 'yes');
	    req.send();
	
	    return deferred.promise;
	  },
	
	  /**
	   * Get obj and props and return a new object with the property merged
	   *
	   * @memberOf Barba.Utils
	   * @param  {object} obj
	   * @param  {object} props
	   * @return {object}
	   */
	  extend: function(obj, props) {
	    var newObj = Object.create(obj);
	
	    for(var prop in props) {
	      if(props.hasOwnProperty(prop)) {
	        newObj[prop] = props[prop];
	      }
	    }
	
	    return newObj;
	  },
	
	  /**
	   * Return a new "Deferred" object
	   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
	   *
	   * @memberOf Barba.Utils
	   * @return {Deferred}
	   */
	  deferred: function() {
	    return new function() {
	      this.resolve = null;
	      this.reject = null;
	
	      this.promise = new Promise(function(resolve, reject) {
	        this.resolve = resolve;
	        this.reject = reject;
	      }.bind(this));
	    };
	  },
	
	  /**
	   * Return the port number normalized, eventually you can pass a string to be normalized.
	   *
	   * @memberOf Barba.Utils
	   * @private
	   * @param  {String} p
	   * @return {Int} port
	   */
	  getPort: function(p) {
	    var port = typeof p !== 'undefined' ? p : window.location.port;
	    var protocol = window.location.protocol;
	
	    if (port != '')
	      return parseInt(port);
	
	    if (protocol === 'http:')
	      return 80;
	
	    if (protocol === 'https:')
	      return 443;
	  }
	};
	
	module.exports = Utils;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(7);
	var Utils = __webpack_require__(5);
	
	/**
	 * BaseView to be extended
	 *
	 * @namespace Barba.BaseView
	 * @type {Object}
	 */
	var BaseView  = {
	  /**
	   * Namespace of the view.
	   * (need to be associated with the data-namespace of the container)
	   *
	   * @memberOf Barba.BaseView
	   * @type {String}
	   */
	  namespace: null,
	
	  /**
	   * Helper to extend the object
	   *
	   * @memberOf Barba.BaseView
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj){
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * Init the view.
	   * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
	   * in this way .onEnter() and .onEnterCompleted() will be fired for the current
	   * container when the page is loaded.
	   *
	   * @memberOf Barba.BaseView
	   */
	  init: function() {
	    var _this = this;
	
	    Dispatcher.on('initStateChange',
	      function(newStatus, oldStatus) {
	        if (oldStatus && oldStatus.namespace === _this.namespace)
	          _this.onLeave();
	      }
	    );
	
	    Dispatcher.on('newPageReady',
	      function(newStatus, oldStatus, container) {
	        _this.container = container;
	
	        if (newStatus.namespace === _this.namespace)
	          _this.onEnter();
	      }
	    );
	
	    Dispatcher.on('transitionCompleted',
	      function(newStatus, oldStatus) {
	        if (newStatus.namespace === _this.namespace)
	          _this.onEnterCompleted();
	
	        if (oldStatus && oldStatus.namespace === _this.namespace)
	          _this.onLeaveCompleted();
	      }
	    );
	  },
	
	 /**
	  * This function will be fired when the container
	  * is ready and attached to the DOM.
	  *
	  * @memberOf Barba.BaseView
	  * @abstract
	  */
	  onEnter: function() {},
	
	  /**
	   * This function will be fired when the transition
	   * to this container has just finished.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onEnterCompleted: function() {},
	
	  /**
	   * This function will be fired when the transition
	   * to a new container has just started.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onLeave: function() {},
	
	  /**
	   * This function will be fired when the container
	   * has just been removed from the DOM.
	   *
	   * @memberOf Barba.BaseView
	   * @abstract
	   */
	  onLeaveCompleted: function() {}
	}
	
	module.exports = BaseView;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Little Dispatcher inspired by MicroEvent.js
	 *
	 * @namespace Barba.Dispatcher
	 * @type {Object}
	 */
	var Dispatcher = {
	  /**
	   * Object that keeps all the events
	   *
	   * @memberOf Barba.Dispatcher
	   * @readOnly
	   * @type {Object}
	   */
	  events: {},
	
	  /**
	   * Bind a callback to an event
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {Function} function
	   */
	  on: function(e, f) {
	    this.events[e] = this.events[e] || [];
	    this.events[e].push(f);
	  },
	
	  /**
	   * Unbind event
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {Function} function
	   */
	  off: function(e, f) {
	    if(e in this.events === false)
	      return;
	
	    this.events[e].splice(this.events[e].indexOf(f), 1);
	  },
	
	  /**
	   * Fire the event running all the event associated to it
	   *
	   * @memberOf Barba.Dispatcher
	   * @param  {String} eventName
	   * @param  {...*} args
	   */
	  trigger: function(e) {//e, ...args
	    if (e in this.events === false)
	      return;
	
	    for(var i = 0; i < this.events[e].length; i++){
	      this.events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
	    }
	  }
	};
	
	module.exports = Dispatcher;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	
	/**
	 * BaseCache it's a simple static cache
	 *
	 * @namespace Barba.BaseCache
	 * @type {Object}
	 */
	var BaseCache = {
	  /**
	   * The Object that keeps all the key value information
	   *
	   * @memberOf Barba.BaseCache
	   * @type {Object}
	   */
	  data: {},
	
	  /**
	   * Helper to extend this object
	   *
	   * @memberOf Barba.BaseCache
	   * @private
	   * @param  {Object} newObject
	   * @return {Object} newInheritObject
	   */
	  extend: function(obj) {
	    return Utils.extend(this, obj);
	  },
	
	  /**
	   * Set a key and value data, mainly Barba is going to save promises
	   *
	   * @memberOf Barba.BaseCache
	   * @param {String} key
	   * @param {*} value
	   */
	  set: function(key, val) {
	    this.data[key] = val;
	  },
	
	  /**
	   * Retrieve the data using the key
	   *
	   * @memberOf Barba.BaseCache
	   * @param  {String} key
	   * @return {*}
	   */
	  get: function(key) {
	    return this.data[key];
	  },
	
	  /**
	   * Flush the cache
	   *
	   * @memberOf Barba.BaseCache
	   */
	  reset: function() {
	    this.data = {};
	  }
	};
	
	module.exports = BaseCache;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * HistoryManager helps to keep track of the navigation
	 *
	 * @namespace Barba.HistoryManager
	 * @type {Object}
	 */
	var HistoryManager = {
	  /**
	   * Keep track of the status in historic order
	   *
	   * @memberOf Barba.HistoryManager
	   * @readOnly
	   * @type {Array}
	   */
	  history: [],
	
	  /**
	   * Add a new set of url and namespace
	   *
	   * @memberOf Barba.HistoryManager
	   * @param {String} url
	   * @param {String} namespace
	   * @private
	   */
	  add: function(url, namespace) {
	    if (!namespace)
	      namespace = undefined;
	
	    this.history.push({
	      url: url,
	      namespace: namespace
	    });
	  },
	
	  /**
	   * Return information about the current status
	   *
	   * @memberOf Barba.HistoryManager
	   * @return {Object}
	   */
	  currentStatus: function() {
	    return this.history[this.history.length - 1];
	  },
	
	  /**
	   * Return information about the previous status
	   *
	   * @memberOf Barba.HistoryManager
	   * @return {Object}
	   */
	  prevStatus: function() {
	    var history = this.history;
	
	    if (history.length < 2)
	      return null;
	
	    return history[history.length - 2];
	  }
	};
	
	module.exports = HistoryManager;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	var Dispatcher = __webpack_require__(7);
	var HideShowTransition = __webpack_require__(11);
	var BaseCache = __webpack_require__(8);
	
	var HistoryManager = __webpack_require__(9);
	var Dom = __webpack_require__(12);
	
	/**
	 * Pjax is a static object with main function
	 *
	 * @namespace Barba.Pjax
	 * @borrows Dom as Dom
	 * @type {Object}
	 */
	var Pjax = {
	  Dom: Dom,
	  History: HistoryManager,
	  Cache: BaseCache,
	
	  /**
	   * Indicate wether or not use the cache
	   *
	   * @memberOf Barba.Pjax
	   * @type {Boolean}
	   * @default
	   */
	  cacheEnabled: true,
	
	  /**
	   * Indicate if there is an animation in progress
	   *
	   * @memberOf Barba.Pjax
	   * @readOnly
	   * @type {Boolean}
	   */
	  transitionProgress: false,
	
	  /**
	   * Class name used to ignore links
	   *
	   * @memberOf Barba.Pjax
	   * @type {String}
	   * @default
	   */
	  ignoreClassLink: 'no-barba',
	
	  /**
	   * Function to be called to start Pjax
	   *
	   * @memberOf Barba.Pjax
	   */
	  start: function() {
	    this.init();
	  },
	
	  /**
	   * Init the events
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  init: function() {
	    var container = this.Dom.getContainer();
	    var wrapper = this.Dom.getWrapper();
	
	    wrapper.setAttribute('aria-live', 'polite');
	
	    this.History.add(
	      this.getCurrentUrl(),
	      this.Dom.getNamespace(container)
	    );
	
	    //Fire for the current view.
	    Dispatcher.trigger('initStateChange', this.History.currentStatus());
	    Dispatcher.trigger('newPageReady',
	      this.History.currentStatus(),
	      {},
	      container,
	      this.Dom.currentHTML
	    );
	    Dispatcher.trigger('transitionCompleted', this.History.currentStatus());
	
	    this.bindEvents();
	  },
	
	  /**
	   * Attach the eventlisteners
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  bindEvents: function() {
	    document.addEventListener('click',
	      this.onLinkClick.bind(this)
	    );
	
	    window.addEventListener('popstate',
	      this.onStateChange.bind(this)
	    );
	  },
	
	  /**
	   * Return the currentURL cleaned
	   *
	   * @memberOf Barba.Pjax
	   * @return {String} currentUrl
	   */
	  getCurrentUrl: function() {
	    return Utils.cleanLink(
	      Utils.getCurrentUrl()
	    );
	  },
	
	  /**
	   * Change the URL with pushstate and trigger the state change
	   *
	   * @memberOf Barba.Pjax
	   * @param {String} newUrl
	   */
	  goTo: function(url) {
	    window.history.pushState(null, null, url);
	    this.onStateChange();
	  },
	
	  /**
	   * Force the browser to go to a certain url
	   *
	   * @memberOf Barba.Pjax
	   * @param {String} url
	   * @private
	   */
	  forceGoTo: function(url) {
	    window.location = url;
	  },
	
	  /**
	   * Load an url, will start an xhr request or load from the cache
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param  {String} url
	   * @return {Promise}
	   */
	  load: function(url) {
	    var deferred = Utils.deferred();
	    var _this = this;
	    var xhr;
	
	    xhr = this.Cache.get(url);
	
	    if (!xhr) {
	      xhr = Utils.xhr(url);
	      this.Cache.set(url, xhr);
	    }
	
	    xhr.then(
	      function(data) {
	        var container = _this.Dom.parseResponse(data);
	
	        _this.Dom.putContainer(container);
	
	        if (!_this.cacheEnabled)
	          _this.Cache.reset();
	
	        deferred.resolve(container);
	      },
	      function() {
	        //Something went wrong (timeout, 404, 505...)
	        _this.forceGoTo(url);
	
	        deferred.reject();
	      }
	    );
	
	    return deferred.promise;
	  },
	
	  /**
	   * Get the .href parameter out of an element
	   * and handle special cases (like xlink:href)
	   *
	   * @private
	   * @memberOf Barba.Pjax
	   * @param  {HTMLElement} el
	   * @return {String} href
	   */
	  getHref: function(el) {
	    if (!el) {
	      return undefined;
	    }
	
	    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
	      return el.getAttribute('xlink:href');
	    }
	
	    if (typeof el.href === 'string') {
	      return el.href;
	    }
	
	    return undefined;
	  },
	
	  /**
	   * Callback called from click event
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param {MouseEvent} evt
	   */
	  onLinkClick: function(evt) {
	    var el = evt.target;
	
	    //Go up in the nodelist until we
	    //find something with an href
	    while (el && !this.getHref(el)) {
	      el = el.parentNode;
	    }
	
	    if (this.preventCheck(evt, el)) {
	      evt.stopPropagation();
	      evt.preventDefault();
	
	      Dispatcher.trigger('linkClicked', el, evt);
	
	      var href = this.getHref(el);
	      this.goTo(href);
	    }
	  },
	
	  /**
	   * Determine if the link should be followed
	   *
	   * @memberOf Barba.Pjax
	   * @param  {MouseEvent} evt
	   * @param  {HTMLElement} element
	   * @return {Boolean}
	   */
	  preventCheck: function(evt, element) {
	    if (!window.history.pushState)
	      return false;
	
	    var href = this.getHref(element);
	
	    //User
	    if (!element || !href)
	      return false;
	
	    //Middle click, cmd click, and ctrl click
	    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey)
	      return false;
	
	    //Ignore target with _blank target
	    if (element.target && element.target === '_blank')
	      return false;
	
	    //Check if it's the same domain
	    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname)
	      return false;
	
	    //Check if the port is the same
	    if (Utils.getPort() !== Utils.getPort(element.port))
	      return false;
	
	    //Ignore case when a hash is being tacked on the current URL
	    if (href.indexOf('#') > -1)
	      return false;
	
	    //Ignore case where there is download attribute
	    if (element.getAttribute && typeof element.getAttribute('download') === 'string')
	      return false;
	
	    //In case you're trying to load the same page
	    if (Utils.cleanLink(href) == Utils.cleanLink(location.href))
	      return false;
	
	    if (element.classList.contains(this.ignoreClassLink))
	      return false;
	
	    return true;
	  },
	
	  /**
	   * Return a transition object
	   *
	   * @memberOf Barba.Pjax
	   * @return {Barba.Transition} Transition object
	   */
	  getTransition: function() {
	    //User customizable
	    return HideShowTransition;
	  },
	
	  /**
	   * Method called after a 'popstate' or from .goTo()
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  onStateChange: function() {
	    var newUrl = this.getCurrentUrl();
	
	    if (this.transitionProgress)
	      this.forceGoTo(newUrl);
	
	    if (this.History.currentStatus().url === newUrl)
	      return false;
	
	    this.History.add(newUrl);
	
	    var newContainer = this.load(newUrl);
	    var transition = Object.create(this.getTransition());
	
	    this.transitionProgress = true;
	
	    Dispatcher.trigger('initStateChange',
	      this.History.currentStatus(),
	      this.History.prevStatus()
	    );
	
	    var transitionInstance = transition.init(
	      this.Dom.getContainer(),
	      newContainer
	    );
	
	    newContainer.then(
	      this.onNewContainerLoaded.bind(this)
	    );
	
	    transitionInstance.then(
	      this.onTransitionEnd.bind(this)
	    );
	  },
	
	  /**
	   * Function called as soon the new container is ready
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   * @param {HTMLElement} container
	   */
	  onNewContainerLoaded: function(container) {
	    var currentStatus = this.History.currentStatus();
	    currentStatus.namespace = this.Dom.getNamespace(container);
	
	    Dispatcher.trigger('newPageReady',
	      this.History.currentStatus(),
	      this.History.prevStatus(),
	      container,
	      this.Dom.currentHTML
	    );
	  },
	
	  /**
	   * Function called as soon the transition is finished
	   *
	   * @memberOf Barba.Pjax
	   * @private
	   */
	  onTransitionEnd: function() {
	    this.transitionProgress = false;
	
	    Dispatcher.trigger('transitionCompleted',
	      this.History.currentStatus(),
	      this.History.prevStatus()
	    );
	  }
	};
	
	module.exports = Pjax;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var BaseTransition = __webpack_require__(4);
	
	/**
	 * Basic Transition object, wait for the new Container to be ready,
	 * scroll top, and finish the transition (removing the old container and displaying the new one)
	 *
	 * @private
	 * @namespace Barba.HideShowTransition
	 * @augments Barba.BaseTransition
	 */
	var HideShowTransition = BaseTransition.extend({
	  start: function() {
	    this.newContainerLoading.then(this.finish.bind(this));
	  },
	
	  finish: function() {
	    document.body.scrollTop = 0;
	    this.done();
	  }
	});
	
	module.exports = HideShowTransition;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Object that is going to deal with DOM parsing/manipulation
	 *
	 * @namespace Barba.Pjax.Dom
	 * @type {Object}
	 */
	var Dom = {
	  /**
	   * The name of the data attribute on the container
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  dataNamespace: 'namespace',
	
	  /**
	   * Id of the main wrapper
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  wrapperId: 'barba-wrapper',
	
	  /**
	   * Class name used to identify the containers
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   * @default
	   */
	  containerClass: 'barba-container',
	
	  /**
	   * Full HTML String of the current page.
	   * By default is the innerHTML of the initial loaded page.
	   *
	   * Each time a new page is loaded, the value is the response of the xhr call.
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @type {String}
	   */
	  currentHTML: document.documentElement.innerHTML,
	
	  /**
	   * Parse the responseText obtained from the xhr call
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {String} responseText
	   * @return {HTMLElement}
	   */
	  parseResponse: function(responseText) {
	    this.currentHTML = responseText;
	
	    var wrapper = document.createElement('div');
	    wrapper.innerHTML = responseText;
	
	    var titleEl = wrapper.querySelector('title');
	
	    if (titleEl)
	      document.title = titleEl.textContent;
	
	    return this.getContainer(wrapper);
	  },
	
	  /**
	   * Get the main barba wrapper by the ID `wrapperId`
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @return {HTMLElement} element
	   */
	  getWrapper: function() {
	    var wrapper = document.getElementById(this.wrapperId);
	
	    if (!wrapper)
	      throw new Error('Barba.js: wrapper not found!');
	
	    return wrapper;
	  },
	
	  /**
	   * Get the container on the current DOM,
	   * or from an HTMLElement passed via argument
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {HTMLElement}
	   */
	  getContainer: function(element) {
	    if (!element)
	      element = document.body;
	
	    if (!element)
	      throw new Error('Barba.js: DOM not ready!');
	
	    var container = this.parseContainer(element);
	
	    if (container && container.jquery)
	      container = container[0];
	
	    if (!container)
	      throw new Error('Barba.js: no container found');
	
	    return container;
	  },
	
	  /**
	   * Get the namespace of the container
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {String}
	   */
	  getNamespace: function(element) {
	    if (element && element.dataset) {
	      return element.dataset[this.dataNamespace];
	    } else if (element) {
	      return element.getAttribute('data-' + this.dataNamespace);
	    }
	
	    return null;
	  },
	
	  /**
	   * Put the container on the page
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   */
	  putContainer: function(element) {
	    element.style.visibility = 'hidden';
	
	    var wrapper = this.getWrapper();
	    wrapper.appendChild(element);
	  },
	
	  /**
	   * Get container selector
	   *
	   * @memberOf Barba.Pjax.Dom
	   * @private
	   * @param  {HTMLElement} element
	   * @return {HTMLElement} element
	   */
	  parseContainer: function(element) {
	    return element.querySelector('.' + this.containerClass);
	  }
	};
	
	module.exports = Dom;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(5);
	var Pjax = __webpack_require__(10);
	
	/**
	 * Prefetch
	 *
	 * @namespace Barba.Prefetch
	 * @type {Object}
	 */
	var Prefetch = {
	  /**
	   * Class name used to ignore prefetch on links
	   *
	   * @memberOf Barba.Prefetch
	   * @type {String}
	   * @default
	   */
	  ignoreClassLink: 'no-barba-prefetch',
	
	  /**
	   * Init the event listener on mouseover and touchstart
	   * for the prefetch
	   *
	   * @memberOf Barba.Prefetch
	   */
	  init: function() {
	    if (!window.history.pushState) {
	      return false;
	    }
	
	    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
	    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
	  },
	
	  /**
	   * Callback for the mousehover/touchstart
	   *
	   * @memberOf Barba.Prefetch
	   * @private
	   * @param  {Object} evt
	   */
	  onLinkEnter: function(evt) {
	    var el = evt.target;
	
	    while (el && !Pjax.getHref(el)) {
	      el = el.parentNode;
	    }
	
	    if (!el || el.classList.contains(this.ignoreClassLink)) {
	      return;
	    }
	
	    var url = Pjax.getHref(el);
	
	    //Check if the link is elegible for Pjax
	    if (Pjax.preventCheck(evt, el) && !Pjax.Cache.get(url)) {
	      var xhr = Utils.xhr(url);
	      Pjax.Cache.set(url, xhr);
	    }
	  }
	};
	
	module.exports = Prefetch;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=barba.js.map
var coverVid = function (elem, width, height) {

	// call sizeVideo on load
	sizeVideo();

	// debounce for resize function
	function debounce(fn, delay) {
		var timer = null;

		return function () {
			var context = this,
				args = arguments;

			window.clearTimeout(timer);

			timer = window.setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	}

	// call sizeVideo on resize
	window.addEventListener('resize', debounce(sizeVideo, 50));

	// Set necessary styles to position video "center center"
	elem.style.position = 'absolute';
	elem.style.top = '50%';
	elem.style.left = '50%';
	elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
	elem.style['-ms-transform'] = 'translate(-50%, -50%)';
	elem.style.transform = 'translate(-50%, -50%)';

	// Set overflow hidden on parent element
	elem.parentNode.style.overflow = 'hidden';

	// Get image defined on poster attribute of video
	var posterImage = elem.getAttribute('poster');

	// Remove poster to disable
	elem.removeAttribute('poster');

	// Set poster image as a background cover image on parent element
	elem.parentNode.style.backgroundImage = 'url(' + posterImage + ')';
	elem.parentNode.style.backgroundSize = 'cover';
	elem.parentNode.style.backgroundPosition = 'center center';

	// Define the attached selector
	function sizeVideo() {

		// Get parent element height and width
		var parentHeight = elem.parentNode.offsetHeight;
		var parentWidth = elem.parentNode.offsetWidth;

		// Get native video width and height
		var nativeWidth = width;
		var nativeHeight = height;

		// Get the scale factors
		var heightScaleFactor = parentHeight / nativeHeight;
		var widthScaleFactor = parentWidth / nativeWidth;

		// Based on highest scale factor set width and height
		if (widthScaleFactor > heightScaleFactor) {
			elem.style.height = 'auto';
			elem.style.width = parentWidth+'px';
		} else {
			elem.style.height = parentHeight+'px';
			elem.style.width = 'auto';
		}
	}

	// Check for video support
	var supportsVideo = (typeof(elem.canPlayType) != 'undefined') ? true : false;

	// Check if mobile
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
		isMobile = true;

	// Remove video if not supported or mobile
	if (!supportsVideo || isMobile) {
		elem && elem.parentNode && elem.parentNode.removeChild(elem);
	}
};

if (window.jQuery) {
	jQuery.fn.extend({
		'coverVid': function () {
			coverVid(this[0], arguments[0], arguments[1]);
			return this;
		}
	});
}

/*!
 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Headroom=b()}(this,function(){"use strict";function a(a){this.callback=a,this.ticking=!1}function b(a){return a&&"undefined"!=typeof window&&(a===window||a.nodeType)}function c(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var d,e,f=a||{};for(e=1;e<arguments.length;e++){var g=arguments[e]||{};for(d in g)"object"!=typeof f[d]||b(f[d])?f[d]=f[d]||g[d]:f[d]=c(f[d],g[d])}return f}function d(a){return a===Object(a)?a:{down:a,up:a}}function e(a,b){b=c(b,e.options),this.lastKnownScrollY=0,this.elem=a,this.tolerance=d(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop,this.onBottom=b.onBottom,this.onNotBottom=b.onNotBottom}var f={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};return window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,a.prototype={constructor:a,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},e.prototype={constructor:e,init:function(){return e.cutsTheMustard?(this.debouncer=new a(this.update.bind(this)),this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.notTop,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;!a.contains(b.pinned)&&a.contains(b.unpinned)||(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.bottom)||(a.add(b.bottom),a.remove(b.notBottom),this.onBottom&&this.onBottom.call(this))},notBottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notBottom)||(a.add(b.notBottom),a.remove(b.bottom),this.onNotBottom&&this.onNotBottom.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getElementPhysicalHeight:function(a){return Math.max(a.offsetHeight,a.clientHeight)},getScrollerPhysicalHeight:function(){return this.scroller===window||this.scroller===document.body?this.getViewportHeight():this.getElementPhysicalHeight(this.scroller)},getDocumentHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===window||this.scroller===document.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getScrollerPhysicalHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),a+this.getViewportHeight()>=this.getScrollerHeight()?this.bottom():this.notBottom(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},e.options={tolerance:{up:0,down:0},offset:0,scroller:window,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},e.cutsTheMustard="undefined"!=typeof f&&f.rAF&&f.bind&&f.classList,e});

(function($) {

  if(!$) {
    return;
  }

  ////////////
  // Plugin //
  ////////////

  $.fn.headroom = function(option) {
    return this.each(function() {
      var $this   = $(this),
        data      = $this.data('headroom'),
        options   = typeof option === 'object' && option;

      options = $.extend(true, {}, Headroom.options, options);

      if (!data) {
        data = new Headroom(this, options);
        data.init();
        $this.data('headroom', data);
      }
      if (typeof option === 'string') {
        data[option]();

        if(option === 'destroy'){
          $this.removeData('headroom');
        }
      }
    });
  };

  //////////////
  // Data API //
  //////////////

  $('[data-headroom]').each(function() {
    var $this = $(this);
    $this.headroom($this.data());
  });

}(window.Zepto || window.jQuery));
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=x.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?x.className.baseVal=n:x.className=n)}function i(e,n){return function(){return e.apply(n,arguments)}}function a(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?i(o,t||n):o);return!1}function l(e,n){return!!~(""+e).indexOf(n)}function f(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var e=n.body;return e||(e=f(_?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var s,i,a,l,u="modernizr",d=f("div"),c=p();if(parseInt(r,10))for(;r--;)a=f("div"),a.id=o?o[r]:u+(r+1),d.appendChild(a);return s=f("style"),s.type="text/css",s.id="s"+u,(c.fake?c:d).appendChild(s),c.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",l=x.style.overflow,x.style.overflow="hidden",x.appendChild(c)),i=t(d,e),c.fake?(c.parentNode.removeChild(c),x.style.overflow=l,x.offsetHeight):d.parentNode.removeChild(d),!!i}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+d(n[o])+":"+r+")");return s=s.join(" or "),c("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function h(e,n,o,s){function i(){d&&(delete z.style,delete z.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var a=m(e,o);if(!r(a,"undefined"))return a}for(var d,p,c,h,v,y=["modernizr","tspan","samp"];!z.style&&y.length;)d=!0,z.modElem=f(y.shift()),z.style=z.modElem.style;for(c=e.length,p=0;c>p;p++)if(h=e[p],v=z.style[h],l(h,"-")&&(h=u(h)),z.style[h]!==t){if(s||r(o,"undefined"))return i(),"pfx"==n?h:!0;try{z.style[h]=o}catch(g){}if(z.style[h]!=v)return i(),"pfx"==n?h:!0}return i(),!1}function v(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+b.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?h(l,n,o,s):(l=(e+" "+E.join(i+" ")+i).split(" "),a(l,n,t))}function y(e,n,r){return v(e,t,t,n,r)}var g=[],C=[],w={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var x=n.documentElement,_="svg"===x.nodeName.toLowerCase(),S="Moz O ms Webkit",b=w._config.usePrefixes?S.split(" "):[];w._cssomPrefixes=b;var E=w._config.usePrefixes?S.toLowerCase().split(" "):[];w._domPrefixes=E;var P={elem:f("modernizr")};Modernizr._q.push(function(){delete P.elem});var z={style:P.elem.style};Modernizr._q.unshift(function(){delete z.style}),w.testAllProps=v,w.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),o(),s(g),delete w.addTest,delete w.addAsyncTest;for(var N=0;N<Modernizr._q.length;N++)Modernizr._q[N]();e.Modernizr=Modernizr}(window,document);
function prism() {

	/* http://prismjs.com/download.html?themes=prism-twilight&languages=markup+css+clike+javascript+abap+actionscript+ada+apacheconf+apl+applescript+c+asciidoc+aspnet+autohotkey+autoit+bash+basic+batch+bison+brainfuck+bro+cpp+csharp+arduino+coffeescript+ruby+css-extras+d+dart+django+diff+docker+eiffel+elixir+erlang+fsharp+flow+fortran+gherkin+git+glsl+go+graphql+groovy+haml+handlebars+haskell+haxe+http+icon+inform7+ini+j+java+jolie+json+julia+keyman+kotlin+latex+less+livescript+lolcode+lua+makefile+markdown+matlab+mel+mizar+monkey+n4js+nasm+nginx+nim+nix+nsis+objectivec+ocaml+opencl+oz+parigp+parser+pascal+perl+php+php-extras+powershell+processing+prolog+properties+protobuf+pug+puppet+pure+python+q+qore+r+jsx+renpy+reason+rest+rip+roboconf+crystal+rust+sas+sass+scss+scala+scheme+smalltalk+smarty+sql+stylus+swift+tcl+textile+twig+typescript+vbnet+verilog+vhdl+vim+wiki+xojo+yaml */
	var _self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
		);

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 * MIT license http://www.opensource.org/licenses/mit-license.php/
	 * @author Lea Verou http://lea.verou.me
	 */

	var Prism = (function(){

	// Private helper vars
	var lang = /\blang(?:uage)?-(\w+)\b/i;
	var uniqueId = 0;

	var _ = _self.Prism = {
		manual: _self.Prism && _self.Prism.manual,
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
		util: {
			encode: function (tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
				} else if (_.util.type(tokens) === 'Array') {
					return tokens.map(_.util.encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			type: function (o) {
				return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
			},

			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			// Deep clone a language definition (e.g. to extend it)
			clone: function (o) {
				var type = _.util.type(o);

				switch (type) {
					case 'Object':
						var clone = {};

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = _.util.clone(o[key]);
							}
						}

						return clone;

					case 'Array':
						return o.map(function(v) { return _.util.clone(v); });
				}

				return o;
			}
		},

		languages: {
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Insert a token before another token in a language literal
			 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
			 * we cannot just provide an object, we need anobject and a key.
			 * @param inside The key (or language id) of the parent
			 * @param before The key to insert before. If not provided, the function appends instead.
			 * @param insert Object with the key/value pairs to insert
			 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];

				if (arguments.length == 2) {
					insert = arguments[1];

					for (var newToken in insert) {
						if (insert.hasOwnProperty(newToken)) {
							grammar[newToken] = insert[newToken];
						}
					}

					return grammar;
				}

				var ret = {};

				for (var token in grammar) {

					if (grammar.hasOwnProperty(token)) {

						if (token == before) {

							for (var newToken in insert) {

								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						ret[token] = grammar[token];
					}
				}

				// Update references in other language definitions
				_.languages.DFS(_.languages, function(key, value) {
					if (value === root[inside] && key != inside) {
						this[key] = ret;
					}
				});

				return root[inside] = ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function(o, callback, type, visited) {
				visited = visited || {};
				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, null, visited);
						}
						else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, i, visited);
						}
					}
				}
			}
		},
		plugins: {},

		highlightAll: function(async, callback) {
			var env = {
				callback: callback,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run("before-highlightall", env);

			var elements = env.elements || document.querySelectorAll(env.selector);

			for (var i=0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		highlightElement: function(element, async, callback) {
			// Find language
			var language, grammar, parent = element;

			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (parent.className.match(lang) || [,''])[1].toLowerCase();
				grammar = _.languages[language];
			}

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			if (element.parentNode) {
				// Set language on the parent, for styling
				parent = element.parentNode;

				if (/pre/i.test(parent.nodeName)) {
					parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
				}
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			_.hooks.run('before-sanity-check', env);

			if (!env.code || !env.grammar) {
				if (env.code) {
					_.hooks.run('before-highlight', env);
					env.element.textContent = env.code;
					_.hooks.run('after-highlight', env);
				}
				_.hooks.run('complete', env);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function(evt) {
					env.highlightedCode = evt.data;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(env.element);
					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			}
			else {
				env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(element);

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			}
		},

		highlight: function (text, grammar, language) {
			var tokens = _.tokenize(text, grammar);
			return Token.stringify(_.util.encode(tokens), language);
		},

		matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
			var Token = _.Token;

			for (var token in grammar) {
				if(!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				if (token == target) {
					return;
				}

				var patterns = grammar[token];
				patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					var pattern = patterns[j],
						inside = pattern.inside,
						lookbehind = !!pattern.lookbehind,
						greedy = !!pattern.greedy,
						lookbehindLength = 0,
						alias = pattern.alias;

					if (greedy && !pattern.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
						pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
					}

					pattern = pattern.pattern || pattern;

					// Don’t cache length as it changes during the loop
					for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

						var str = strarr[i];

						if (strarr.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							return;
						}

						if (str instanceof Token) {
							continue;
						}

						pattern.lastIndex = 0;

						var match = pattern.exec(str),
						    delNum = 1;

						// Greedy patterns can override/remove up to two previously matched tokens
						if (!match && greedy && i != strarr.length - 1) {
							pattern.lastIndex = pos;
							match = pattern.exec(text);
							if (!match) {
								break;
							}

							var from = match.index + (lookbehind ? match[1].length : 0),
							    to = match.index + match[0].length,
							    k = i,
							    p = pos;

							for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
								p += strarr[k].length;
								// Move the index i to the element in strarr that is closest to from
								if (from >= p) {
									++i;
									pos = p;
								}
							}

							/*
							 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
							 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
							 */
							if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
								continue;
							}

							// Number of tokens to delete and replace with the new match
							delNum = k - i;
							str = text.slice(pos, p);
							match.index -= pos;
						}

						if (!match) {
							if (oneshot) {
								break;
							}

							continue;
						}

						if(lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index + lookbehindLength,
						    match = match[0].slice(lookbehindLength),
						    to = from + match.length,
						    before = str.slice(0, from),
						    after = str.slice(to);

						var args = [i, delNum];

						if (before) {
							++i;
							pos += before.length;
							args.push(before);
						}

						var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);

						if (delNum != 1)
							_.matchGrammar(text, strarr, grammar, i, pos, true, token);

						if (oneshot)
							break;
					}
				}
			}
		},

		tokenize: function(text, grammar, language) {
			var strarr = [text];

			var rest = grammar.rest;

			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			_.matchGrammar(text, strarr, grammar, 0, 0, false);

			return strarr;
		},

		hooks: {
			all: {},

			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i=0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};

	var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || "").length|0;
		this.greedy = !!greedy;
	};

	Token.stringify = function(o, language, parent) {
		if (typeof o == 'string') {
			return o;
		}

		if (_.util.type(o) === 'Array') {
			return o.map(function(element) {
				return Token.stringify(element, language, o);
			}).join('');
		}

		var env = {
			type: o.type,
			content: Token.stringify(o.content, language, parent),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
			parent: parent
		};

		if (o.alias) {
			var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
			Array.prototype.push.apply(env.classes, aliases);
		}

		_.hooks.run('wrap', env);

		var attributes = Object.keys(env.attributes).map(function(name) {
			return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}).join(' ');

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

	};

	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _self.Prism;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data),
					lang = message.language,
					code = message.code,
					immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _self.Prism;
	}

	//Get current script and highlight
	var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

	if (script) {
		_.filename = script.src;

		if (!_.manual && !script.hasAttribute('data-manual')) {
			if(document.readyState !== "loading") {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(_.highlightAll);
				} else {
					window.setTimeout(_.highlightAll, 16);
				}
			}
			else {
				document.addEventListener('DOMContentLoaded', _.highlightAll);
			}
		}
	}

	return _self.Prism;

	})();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof global !== 'undefined') {
		global.Prism = Prism;
	}
	;
	Prism.languages.markup = {
		'comment': /<!--[\s\S]*?-->/,
		'prolog': /<\?[\s\S]+?\?>/,
		'doctype': /<!DOCTYPE[\s\S]+?>/i,
		'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/i,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'attr-value': {
					pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
					inside: {
						'punctuation': [
							/^=/,
							{
								pattern: /(^|[^\\])["']/,
								lookbehind: true
							}
						]
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': /&#?[\da-z]{1,8};/i
	};

	Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
		Prism.languages.markup['entity'];

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function(env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Prism.languages.xml = Prism.languages.markup;
	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
		'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
		'string': {
			pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
		'important': /\B!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'style': {
				pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
				lookbehind: true,
				inside: Prism.languages.css,
				alias: 'language-css'
			}
		});

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
				inside: {
					'attr-name': {
						pattern: /^\s*style/i,
						inside: Prism.languages.markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/i,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, Prism.languages.markup.tag);
	};
	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true
			}
		],
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
			lookbehind: true,
			inside: {
				punctuation: /[.\\]/
			}
		},
		'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
		'boolean': /\b(?:true|false)\b/,
		'function': /[a-z0-9_]+(?=\()/i,
		'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
		'punctuation': /[{}[\];(),.:]/
	};

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
		'number': /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
		'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
	});

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
			lookbehind: true,
			greedy: true
		},
		// This must be declared before keyword because we use "function" inside the look-forward
		'function-variable': {
			pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
			alias: 'function'
		}
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'template-string': {
			pattern: /`(?:\\[\s\S]|[^\\`])*`/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /\$\{[^}]+\}/,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		}
	});

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'script': {
				pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript,
				alias: 'language-javascript'
			}
		});
	}

	Prism.languages.js = Prism.languages.javascript;

	Prism.languages.abap = {
		'comment': /^\*.*/m,
		'string' : /(`|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
		'string-template': {
			pattern: /([|}])(?:\\.|[^\\|{\r\n])*(?=[|{])/,
			lookbehind: true,
			alias: 'string'
		},
		/* End Of Line comments should not interfere with strings when the  
		quote character occurs within them. We assume a string being highlighted
		inside an EOL comment is more acceptable than the opposite.
		*/
		'eol-comment': {
			pattern: /(^|\s)".*/m,
			lookbehind: true,
			alias: 'comment'
		},
		'keyword' : {
			pattern: /(\s|\.|^)(?:SCIENTIFIC_WITH_LEADING_ZERO|SCALE_PRESERVING_SCIENTIFIC|RMC_COMMUNICATION_FAILURE|END-ENHANCEMENT-SECTION|MULTIPLY-CORRESPONDING|SUBTRACT-CORRESPONDING|VERIFICATION-MESSAGE|DIVIDE-CORRESPONDING|ENHANCEMENT-SECTION|CURRENCY_CONVERSION|RMC_SYSTEM_FAILURE|START-OF-SELECTION|MOVE-CORRESPONDING|RMC_INVALID_STATUS|CUSTOMER-FUNCTION|END-OF-DEFINITION|ENHANCEMENT-POINT|SYSTEM-EXCEPTIONS|ADD-CORRESPONDING|SCALE_PRESERVING|SELECTION-SCREEN|CURSOR-SELECTION|END-OF-SELECTION|LOAD-OF-PROGRAM|SCROLL-BOUNDARY|SELECTION-TABLE|EXCEPTION-TABLE|IMPLEMENTATIONS|PARAMETER-TABLE|RIGHT-JUSTIFIED|UNIT_CONVERSION|AUTHORITY-CHECK|LIST-PROCESSING|SIGN_AS_POSTFIX|COL_BACKGROUND|IMPLEMENTATION|INTERFACE-POOL|TRANSFORMATION|IDENTIFICATION|ENDENHANCEMENT|LINE-SELECTION|INITIALIZATION|LEFT-JUSTIFIED|SELECT-OPTIONS|SELECTION-SETS|COMMUNICATION|CORRESPONDING|DECIMAL_SHIFT|PRINT-CONTROL|VALUE-REQUEST|CHAIN-REQUEST|FUNCTION-POOL|FIELD-SYMBOLS|FUNCTIONALITY|INVERTED-DATE|SELECTION-SET|CLASS-METHODS|OUTPUT-LENGTH|CLASS-CODING|COL_NEGATIVE|ERRORMESSAGE|FIELD-GROUPS|HELP-REQUEST|NO-EXTENSION|NO-TOPOFPAGE|REDEFINITION|DISPLAY-MODE|ENDINTERFACE|EXIT-COMMAND|FIELD-SYMBOL|NO-SCROLLING|SHORTDUMP-ID|ACCESSPOLICY|CLASS-EVENTS|COL_POSITIVE|DECLARATIONS|ENHANCEMENTS|FILTER-TABLE|SWITCHSTATES|SYNTAX-CHECK|TRANSPORTING|ASYNCHRONOUS|SYNTAX-TRACE|TOKENIZATION|USER-COMMAND|WITH-HEADING|ABAP-SOURCE|BREAK-POINT|CHAIN-INPUT|COMPRESSION|FIXED-POINT|NEW-SECTION|NON-UNICODE|OCCURRENCES|RESPONSIBLE|SYSTEM-CALL|TRACE-TABLE|ABBREVIATED|CHAR-TO-HEX|END-OF-FILE|ENDFUNCTION|ENVIRONMENT|ASSOCIATION|COL_HEADING|EDITOR-CALL|END-OF-PAGE|ENGINEERING|IMPLEMENTED|INTENSIFIED|RADIOBUTTON|SYSTEM-EXIT|TOP-OF-PAGE|TRANSACTION|APPLICATION|CONCATENATE|DESTINATION|ENHANCEMENT|IMMEDIATELY|NO-GROUPING|PRECOMPILED|REPLACEMENT|TITLE-LINES|ACTIVATION|BYTE-ORDER|CLASS-POOL|CONNECTION|CONVERSION|DEFINITION|DEPARTMENT|EXPIRATION|INHERITING|MESSAGE-ID|NO-HEADING|PERFORMING|QUEUE-ONLY|RIGHTSPACE|SCIENTIFIC|STATUSINFO|STRUCTURES|SYNCPOINTS|WITH-TITLE|ATTRIBUTES|BOUNDARIES|CLASS-DATA|COL_NORMAL|DD\/MM\/YYYY|DESCENDING|INTERFACES|LINE-COUNT|MM\/DD\/YYYY|NON-UNIQUE|PRESERVING|SELECTIONS|STATEMENTS|SUBROUTINE|TRUNCATION|TYPE-POOLS|ARITHMETIC|BACKGROUND|ENDPROVIDE|EXCEPTIONS|IDENTIFIER|INDEX-LINE|OBLIGATORY|PARAMETERS|PERCENTAGE|PUSHBUTTON|RESOLUTION|COMPONENTS|DEALLOCATE|DISCONNECT|DUPLICATES|FIRST-LINE|HEAD-LINES|NO-DISPLAY|OCCURRENCE|RESPECTING|RETURNCODE|SUBMATCHES|TRACE-FILE|ASCENDING|BYPASSING|ENDMODULE|EXCEPTION|EXCLUDING|EXPORTING|INCREMENT|MATCHCODE|PARAMETER|PARTIALLY|PREFERRED|REFERENCE|REPLACING|RETURNING|SELECTION|SEPARATED|SPECIFIED|STATEMENT|TIMESTAMP|TYPE-POOL|ACCEPTING|APPENDAGE|ASSIGNING|COL_GROUP|COMPARING|CONSTANTS|DANGEROUS|IMPORTING|INSTANCES|LEFTSPACE|LOG-POINT|QUICKINFO|READ-ONLY|SCROLLING|SQLSCRIPT|STEP-LOOP|TOP-LINES|TRANSLATE|APPENDING|AUTHORITY|CHARACTER|COMPONENT|CONDITION|DIRECTORY|DUPLICATE|MESSAGING|RECEIVING|SUBSCREEN|ACCORDING|COL_TOTAL|END-LINES|ENDMETHOD|ENDSELECT|EXPANDING|EXTENSION|INCLUDING|INFOTYPES|INTERFACE|INTERVALS|LINE-SIZE|PF-STATUS|PROCEDURE|PROTECTED|REQUESTED|RESUMABLE|RIGHTPLUS|SAP-SPOOL|SECONDARY|STRUCTURE|SUBSTRING|TABLEVIEW|NUMOFCHAR|ADJACENT|ANALYSIS|ASSIGNED|BACKWARD|CHANNELS|CHECKBOX|CONTINUE|CRITICAL|DATAINFO|DD\/MM\/YY|DURATION|ENCODING|ENDCLASS|FUNCTION|LEFTPLUS|LINEFEED|MM\/DD\/YY|OVERFLOW|RECEIVED|SKIPPING|SORTABLE|STANDARD|SUBTRACT|SUPPRESS|TABSTRIP|TITLEBAR|TRUNCATE|UNASSIGN|WHENEVER|ANALYZER|COALESCE|COMMENTS|CONDENSE|DECIMALS|DEFERRED|ENDWHILE|EXPLICIT|KEYWORDS|MESSAGES|POSITION|PRIORITY|RECEIVER|RENAMING|TIMEZONE|TRAILING|ALLOCATE|CENTERED|CIRCULAR|CONTROLS|CURRENCY|DELETING|DESCRIBE|DISTANCE|ENDCATCH|EXPONENT|EXTENDED|GENERATE|IGNORING|INCLUDES|INTERNAL|MAJOR-ID|MODIFIER|NEW-LINE|OPTIONAL|PROPERTY|ROLLBACK|STARTING|SUPPLIED|ABSTRACT|CHANGING|CONTEXTS|CREATING|CUSTOMER|DATABASE|DAYLIGHT|DEFINING|DISTINCT|DIVISION|ENABLING|ENDCHAIN|ESCAPING|HARMLESS|IMPLICIT|INACTIVE|LANGUAGE|MINOR-ID|MULTIPLY|NEW-PAGE|NO-TITLE|POS_HIGH|SEPARATE|TEXTPOOL|TRANSFER|SELECTOR|DBMAXLEN|ITERATOR|SELECTOR|ARCHIVE|BIT-XOR|BYTE-CO|COLLECT|COMMENT|CURRENT|DEFAULT|DISPLAY|ENDFORM|EXTRACT|LEADING|LISTBOX|LOCATOR|MEMBERS|METHODS|NESTING|POS_LOW|PROCESS|PROVIDE|RAISING|RESERVE|SECONDS|SUMMARY|VISIBLE|BETWEEN|BIT-AND|BYTE-CS|CLEANUP|COMPUTE|CONTROL|CONVERT|DATASET|ENDCASE|FORWARD|HEADERS|HOTSPOT|INCLUDE|INVERSE|KEEPING|NO-ZERO|OBJECTS|OVERLAY|PADDING|PATTERN|PROGRAM|REFRESH|SECTION|SUMMING|TESTING|VERSION|WINDOWS|WITHOUT|BIT-NOT|BYTE-CA|BYTE-NA|CASTING|CONTEXT|COUNTRY|DYNAMIC|ENABLED|ENDLOOP|EXECUTE|FRIENDS|HANDLER|HEADING|INITIAL|\*-INPUT|LOGFILE|MAXIMUM|MINIMUM|NO-GAPS|NO-SIGN|PRAGMAS|PRIMARY|PRIVATE|REDUCED|REPLACE|REQUEST|RESULTS|UNICODE|WARNING|ALIASES|BYTE-CN|BYTE-NS|CALLING|COL_KEY|COLUMNS|CONNECT|ENDEXEC|ENTRIES|EXCLUDE|FILTERS|FURTHER|HELP-ID|LOGICAL|MAPPING|MESSAGE|NAMETAB|OPTIONS|PACKAGE|PERFORM|RECEIVE|STATICS|VARYING|BINDING|CHARLEN|GREATER|XSTRLEN|ACCEPT|APPEND|DETAIL|ELSEIF|ENDING|ENDTRY|FORMAT|FRAMES|GIVING|HASHED|HEADER|IMPORT|INSERT|MARGIN|MODULE|NATIVE|OBJECT|OFFSET|REMOTE|RESUME|SAVING|SIMPLE|SUBMIT|TABBED|TOKENS|UNIQUE|UNPACK|UPDATE|WINDOW|YELLOW|ACTUAL|ASPECT|CENTER|CURSOR|DELETE|DIALOG|DIVIDE|DURING|ERRORS|EVENTS|EXTEND|FILTER|HANDLE|HAVING|IGNORE|LITTLE|MEMORY|NO-GAP|OCCURS|OPTION|PERSON|PLACES|PUBLIC|REDUCE|REPORT|RESULT|SINGLE|SORTED|SWITCH|SYNTAX|TARGET|VALUES|WRITER|ASSERT|BLOCKS|BOUNDS|BUFFER|CHANGE|COLUMN|COMMIT|CONCAT|COPIES|CREATE|DDMMYY|DEFINE|ENDIAN|ESCAPE|EXPAND|KERNEL|LAYOUT|LEGACY|LEVELS|MMDDYY|NUMBER|OUTPUT|RANGES|READER|RETURN|SCREEN|SEARCH|SELECT|SHARED|SOURCE|STABLE|STATIC|SUBKEY|SUFFIX|TABLES|UNWIND|YYMMDD|ASSIGN|BACKUP|BEFORE|BINARY|BIT-OR|BLANKS|CLIENT|CODING|COMMON|DEMAND|DYNPRO|EXCEPT|EXISTS|EXPORT|FIELDS|GLOBAL|GROUPS|LENGTH|LOCALE|MEDIUM|METHOD|MODIFY|NESTED|OTHERS|REJECT|SCROLL|SUPPLY|SYMBOL|ENDFOR|STRLEN|ALIGN|BEGIN|BOUND|ENDAT|ENTRY|EVENT|FINAL|FLUSH|GRANT|INNER|SHORT|USING|WRITE|AFTER|BLACK|BLOCK|CLOCK|COLOR|COUNT|DUMMY|EMPTY|ENDDO|ENDON|GREEN|INDEX|INOUT|LEAVE|LEVEL|LINES|MODIF|ORDER|OUTER|RANGE|RESET|RETRY|RIGHT|SMART|SPLIT|STYLE|TABLE|THROW|UNDER|UNTIL|UPPER|UTF-8|WHERE|ALIAS|BLANK|CLEAR|CLOSE|EXACT|FETCH|FIRST|FOUND|GROUP|LLANG|LOCAL|OTHER|REGEX|SPOOL|TITLE|TYPES|VALID|WHILE|ALPHA|BOXED|CATCH|CHAIN|CHECK|CLASS|COVER|ENDIF|EQUIV|FIELD|FLOOR|FRAME|INPUT|LOWER|MATCH|NODES|PAGES|PRINT|RAISE|ROUND|SHIFT|SPACE|SPOTS|STAMP|STATE|TASKS|TIMES|TRMAC|ULINE|UNION|VALUE|WIDTH|EQUAL|LOG10|TRUNC|BLOB|CASE|CEIL|CLOB|COND|EXIT|FILE|GAPS|HOLD|INCL|INTO|KEEP|KEYS|LAST|LINE|LONG|LPAD|MAIL|MODE|OPEN|PINK|READ|ROWS|TEST|THEN|ZERO|AREA|BACK|BADI|BYTE|CAST|EDIT|EXEC|FAIL|FIND|FKEQ|FONT|FREE|GKEQ|HIDE|INIT|ITNO|LATE|LOOP|MAIN|MARK|MOVE|NEXT|NULL|RISK|ROLE|UNIT|WAIT|ZONE|BASE|CALL|CODE|DATA|DATE|FKGE|GKGE|HIGH|KIND|LEFT|LIST|MASK|MESH|NAME|NODE|PACK|PAGE|POOL|SEND|SIGN|SIZE|SOME|STOP|TASK|TEXT|TIME|USER|VARY|WITH|WORD|BLUE|CONV|COPY|DEEP|ELSE|FORM|FROM|HINT|ICON|JOIN|LIKE|LOAD|ONLY|PART|SCAN|SKIP|SORT|TYPE|UNIX|VIEW|WHEN|WORK|ACOS|ASIN|ATAN|COSH|EACH|FRAC|LESS|RTTI|SINH|SQRT|TANH|AVG|BIT|DIV|ISO|LET|OUT|PAD|SQL|ALL|CI_|CPI|END|LOB|LPI|MAX|MIN|NEW|OLE|RUN|SET|\?TO|YES|ABS|ADD|AND|BIG|FOR|HDB|JOB|LOW|NOT|SAP|TRY|VIA|XML|ANY|GET|IDS|KEY|MOD|OFF|PUT|RAW|RED|REF|SUM|TAB|XSD|CNT|COS|EXP|LOG|SIN|TAN|XOR|AT|CO|CP|DO|GT|ID|IF|NS|OR|BT|CA|CS|GE|NA|NB|EQ|IN|LT|NE|NO|OF|ON|PF|TO|AS|BY|CN|IS|LE|NP|UP|E|I|M|O|Z|C|X)\b/i,
			lookbehind: true
		},
		/* Numbers can be only integers. Decimal or Hex appear only as strings */
		'number' : /\b\d+\b/,
		/* Operators must always be surrounded by whitespace, they cannot be put 
		adjacent to operands. 
		*/
		'operator' : {
			pattern: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[-+\/=])(?=\s)/,
			lookbehind: true
		},
		'string-operator' : {
			pattern: /(\s)&&?(?=\s)/,
			lookbehind: true,
			/* The official editor highlights */
			alias: "keyword"
		},
		'token-operator' : [{
			/* Special operators used to access structure components, class methods/attributes, etc. */
			pattern: /(\w)(?:->?|=>|[~|{}])(?=\w)/,
			lookbehind: true,
			alias: "punctuation"
		}, {
		    /* Special tokens used do delimit string templates */
		    pattern: /[|{}]/,
			alias: "punctuation"
		}],
		'punctuation' : /[,.:()]/
	};
	Prism.languages.actionscript = Prism.languages.extend('javascript',  {
		'keyword': /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
		'operator': /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
	});
	Prism.languages.actionscript['class-name'].alias = 'function';

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('actionscript', 'string', {
			'xml': {
				pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
				lookbehind: true,
				inside: {
					rest: Prism.languages.markup
				}
			}
		});
	};
	Prism.languages.ada = {
		'comment': /--.*/,
		'string': /"(?:""|[^"\r\f\n])*"/i,
		'number': [
			{
				pattern: /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i
			},
			{
				pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i
			}
		],
		'attr-name': /\b'\w+/i,
		'keyword': /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|new|return|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
		'boolean': /\b(?:true|false)\b/i,
		'operator': /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
		'punctuation': /\.\.?|[,;():]/,
		'char': /'.'/,
		'variable': /\b[a-z](?:[_a-z\d])*\b/i
	};
	Prism.languages.apacheconf = {
		'comment': /#.*/,
		'directive-inline': {
			pattern: /^(\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|AllowCONNECT|AllowEncodedSlashes|AllowMethods|AllowOverride|AllowOverrideList|Anonymous|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AsyncRequestWorkerFactor|AuthBasicAuthoritative|AuthBasicFake|AuthBasicProvider|AuthBasicUseDigestAlgorithm|AuthDBDUserPWQuery|AuthDBDUserRealmQuery|AuthDBMGroupFile|AuthDBMType|AuthDBMUserFile|AuthDigestAlgorithm|AuthDigestDomain|AuthDigestNonceLifetime|AuthDigestProvider|AuthDigestQop|AuthDigestShmemSize|AuthFormAuthoritative|AuthFormBody|AuthFormDisableNoStore|AuthFormFakeBasicAuth|AuthFormLocation|AuthFormLoginRequiredLocation|AuthFormLoginSuccessLocation|AuthFormLogoutLocation|AuthFormMethod|AuthFormMimetype|AuthFormPassword|AuthFormProvider|AuthFormSitePassphrase|AuthFormSize|AuthFormUsername|AuthGroupFile|AuthLDAPAuthorizePrefix|AuthLDAPBindAuthoritative|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPCompareAsUser|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPGroupAttribute|AuthLDAPGroupAttributeIsDN|AuthLDAPInitialBindAsUser|AuthLDAPInitialBindPattern|AuthLDAPMaxSubGroupDepth|AuthLDAPRemoteUserAttribute|AuthLDAPRemoteUserIsDN|AuthLDAPSearchAsUser|AuthLDAPSubGroupAttribute|AuthLDAPSubGroupClass|AuthLDAPUrl|AuthMerging|AuthName|AuthnCacheContext|AuthnCacheEnable|AuthnCacheProvideFor|AuthnCacheSOCache|AuthnCacheTimeout|AuthnzFcgiCheckAuthnProvider|AuthnzFcgiDefineProvider|AuthType|AuthUserFile|AuthzDBDLoginToReferer|AuthzDBDQuery|AuthzDBDRedirectQuery|AuthzDBMType|AuthzSendForbiddenOnFailure|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|CacheDefaultExpire|CacheDetailHeader|CacheDirLength|CacheDirLevels|CacheDisable|CacheEnable|CacheFile|CacheHeader|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheIgnoreQueryString|CacheIgnoreURLSessionIdentifiers|CacheKeyBaseURL|CacheLastModifiedFactor|CacheLock|CacheLockMaxAge|CacheLockPath|CacheMaxExpire|CacheMaxFileSize|CacheMinExpire|CacheMinFileSize|CacheNegotiatedDocs|CacheQuickHandler|CacheReadSize|CacheReadTime|CacheRoot|CacheSocache|CacheSocacheMaxSize|CacheSocacheMaxTime|CacheSocacheMinTime|CacheSocacheReadSize|CacheSocacheReadTime|CacheStaleOnError|CacheStoreExpired|CacheStoreNoStore|CacheStorePrivate|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|DeflateBufferSize|DeflateCompressionLevel|DeflateFilterNote|DeflateInflateLimitRequestBody|DeflateInflateRatioBurst|DeflateInflateRatioLimit|DeflateMemLevel|DeflateWindowSize|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|HeartbeatAddress|HeartbeatListen|HeartbeatMaxServers|HeartbeatStorage|HeartbeatStorage|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|IndexHeadInsert|IndexIgnore|IndexIgnoreReset|IndexOptions|IndexOrderDefault|IndexStyleSheet|InputSed|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPICacheFile|ISAPIFakeAsync|ISAPILogNotSupported|ISAPIReadAheadBuffer|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionPoolTTL|LDAPConnectionTimeout|LDAPLibraryDebug|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPReferralHopLimit|LDAPReferrals|LDAPRetries|LDAPRetryDelay|LDAPSharedCacheFile|LDAPSharedCacheSize|LDAPTimeout|LDAPTrustedClientCert|LDAPTrustedGlobalCert|LDAPTrustedMode|LDAPVerifyServerCert|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|LuaHookAccessChecker|LuaHookAuthChecker|LuaHookCheckUserID|LuaHookFixups|LuaHookInsertFilter|LuaHookLog|LuaHookMapToStorage|LuaHookTranslateName|LuaHookTypeChecker|LuaInherit|LuaInputFilter|LuaMapHandler|LuaOutputFilter|LuaPackageCPath|LuaPackagePath|LuaQuickHandler|LuaRoot|LuaScope|MaxConnectionsPerChild|MaxKeepAliveRequests|MaxMemFree|MaxRangeOverlaps|MaxRangeReversals|MaxRanges|MaxRequestWorkers|MaxSpareServers|MaxSpareThreads|MaxThreads|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|ProxyAddHeaders|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyExpressDBMFile|ProxyExpressDBMType|ProxyExpressEnable|ProxyFtpDirCharset|ProxyFtpEscapeWildcards|ProxyFtpListOnWildcard|ProxyHTMLBufSize|ProxyHTMLCharsetOut|ProxyHTMLDocType|ProxyHTMLEnable|ProxyHTMLEvents|ProxyHTMLExtended|ProxyHTMLFixups|ProxyHTMLInterp|ProxyHTMLLinks|ProxyHTMLMeta|ProxyHTMLStripComments|ProxyHTMLURLMap|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassInherit|ProxyPassInterpolateEnv|ProxyPassMatch|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxySCGIInternalRedirect|ProxySCGISendfile|ProxySet|ProxySourceAddress|ProxyStatus|ProxyTimeout|ProxyVia|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIPHeader|RemoteIPInternalProxy|RemoteIPInternalProxyList|RemoteIPProxiesHeader|RemoteIPTrustedProxy|RemoteIPTrustedProxyList|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|RewriteBase|RewriteCond|RewriteEngine|RewriteMap|RewriteOptions|RewriteRule|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptInterpreterSource|ScriptLog|ScriptLogBuffer|ScriptLogLength|ScriptSock|SecureListen|SeeRequestTail|SendBufferSize|ServerAdmin|ServerAlias|ServerLimit|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|Session|SessionCookieName|SessionCookieName2|SessionCookieRemove|SessionCryptoCipher|SessionCryptoDriver|SessionCryptoPassphrase|SessionCryptoPassphraseFile|SessionDBDCookieName|SessionDBDCookieName2|SessionDBDCookieRemove|SessionDBDDeleteLabel|SessionDBDInsertLabel|SessionDBDPerUser|SessionDBDSelectLabel|SessionDBDUpdateLabel|SessionEnv|SessionExclude|SessionHeader|SessionInclude|SessionMaxAge|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationCheck|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCompression|SSLCryptoDevice|SSLEngine|SSLFIPS|SSLHonorCipherOrder|SSLInsecureRenegotiation|SSLOCSPDefaultResponder|SSLOCSPEnable|SSLOCSPOverrideResponder|SSLOCSPResponderTimeout|SSLOCSPResponseMaxAge|SSLOCSPResponseTimeSkew|SSLOCSPUseRequestNonce|SSLOpenSSLConfCmd|SSLOptions|SSLPassPhraseDialog|SSLProtocol|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationCheck|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCheckPeerCN|SSLProxyCheckPeerExpire|SSLProxyCheckPeerName|SSLProxyCipherSuite|SSLProxyEngine|SSLProxyMachineCertificateChainFile|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLProxyVerify|SSLProxyVerifyDepth|SSLRandomSeed|SSLRenegBufferSize|SSLRequire|SSLRequireSSL|SSLSessionCache|SSLSessionCacheTimeout|SSLSessionTicketKeyFile|SSLSRPUnknownUserSeed|SSLSRPVerifierFile|SSLStaplingCache|SSLStaplingErrorCacheTimeout|SSLStaplingFakeTryLater|SSLStaplingForceURL|SSLStaplingResponderTimeout|SSLStaplingResponseMaxAge|SSLStaplingResponseTimeSkew|SSLStaplingReturnResponderErrors|SSLStaplingStandardCacheTimeout|SSLStrictSNIVHostCheck|SSLUserName|SSLUseStapling|SSLVerifyClient|SSLVerifyDepth|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/mi,
			lookbehind: true,
			alias: 'property'
		},
		'directive-block': {
			pattern: /<\/?\b(?:AuthnProviderAlias|AuthzProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|RequireAll|RequireAny|RequireNone|VirtualHost)\b *.*>/i,
			inside: {
				'directive-block': {
					pattern: /^<\/?\w+/,
					inside: {
						'punctuation': /^<\/?/
					},
					alias: 'tag'
				},
				'directive-block-parameter': {
					pattern: /.*[^>]/,
					inside: {
						'punctuation': /:/,
						'string': {
							pattern: /("|').*\1/,
							inside: {
								'variable': /[$%]\{?(?:\w\.?[-+:]?)+\}?/
							}
						}
					},
					alias: 'attr-value'
				},
				'punctuation': />/
			},
			alias: 'tag'
		},
		'directive-flags': {
			pattern: /\[(?:\w,?)+\]/,
			alias: 'keyword'
		},
		'string': {
			pattern: /("|').*\1/,
			inside: {
				'variable': /[$%]\{?(?:\w\.?[-+:]?)+\}?/
			}
		},
		'variable': /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
		'regex': /\^?.*\$|\^.*\$?/
	};

	Prism.languages.apl = {
		'comment': /(?:⍝|#[! ]).*$/m,
		'string': {
			pattern: /'(?:[^'\r\n]|'')*'/,
			greedy: true
		},
		'number': /¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞))?/i,
		'statement': /:[A-Z][a-z][A-Za-z]*\b/,
		'system-function': {
			pattern: /⎕[A-Z]+/i,
			alias: 'function'
		},
		'constant': /[⍬⌾#⎕⍞]/,
		'function': /[-+×÷⌈⌊∣|⍳⍸?*⍟○!⌹<≤=>≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→]/,
		'monadic-operator': {
			pattern: /[\\\/⌿⍀¨⍨⌶&∥]/,
			alias: 'operator'
		},
		'dyadic-operator': {
			pattern: /[.⍣⍠⍤∘⌸@⌺]/,
			alias: 'operator'
		},
		'assignment': {
			pattern: /←/,
			alias: 'keyword'
		},
		'punctuation': /[\[;\]()◇⋄]/,
		'dfn': {
			pattern: /[{}⍺⍵⍶⍹∇⍫:]/,
			alias: 'builtin'
		}
	};
	Prism.languages.applescript = {
		'comment': [
			// Allow one level of nesting
			/\(\*(?:\(\*[\s\S]*?\*\)|[\s\S])*?\*\)/,
			/--.+/,
			/#.+/
		],
		'string': /"(?:\\.|[^"\\\r\n])*"/,
		'number': /\b-?\d*\.?\d+([Ee]-?\d+)?\b/,
		'operator': [
			/[&=≠≤≥*+\-\/÷^]|[<>]=?/,
			/\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/
		],
		'keyword': /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
		'class': {
			pattern: /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/,
			alias: 'builtin'
		},
		'punctuation': /[{}():,¬«»《》]/
	};
	Prism.languages.c = Prism.languages.extend('clike', {
		'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
		'operator': /-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/]/,
		'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
	});

	Prism.languages.insertBefore('c', 'string', {
		'macro': {
			// allow for multiline macro definitions
			// spaces after the # character compile fine with gcc
			pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
			lookbehind: true,
			alias: 'property',
			inside: {
				// highlight the path of the include statement as a string
				'string': {
					pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
					lookbehind: true
				},
				// highlight macro directives as keywords
				'directive': {
					pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
					lookbehind: true,
					alias: 'keyword'
				}
			}
		},
		// highlight predefined macros as constants
		'constant': /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
	});

	delete Prism.languages.c['class-name'];
	delete Prism.languages.c['boolean'];

	(function (Prism) {

		var attributes = {
			pattern: /(^[ \t]*)\[(?!\[)(?:(["'$`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\]\\]|\\.)*\]|[^\]\\]|\\.)*\]/m,
			lookbehind: true,
			inside: {
				'quoted': {
					pattern: /([$`])(?:(?!\1)[^\\]|\\.)*\1/,
					inside: {
						'punctuation': /^[$`]|[$`]$/
					}
				},
				'interpreted': {
					pattern: /'(?:[^'\\]|\\.)*'/,
					inside: {
						'punctuation': /^'|'$/
						// See rest below
					}
				},
				'string': /"(?:[^"\\]|\\.)*"/,
				'variable': /\w+(?==)/,
				'punctuation': /^\[|\]$|,/,
				'operator': /=/,
				// The negative look-ahead prevents blank matches
				'attr-value': /(?!^\s+$).+/
			}
		};
		Prism.languages.asciidoc = {
			'comment-block': {
				pattern: /^(\/{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1/m,
				alias: 'comment'
			},
			'table': {
				pattern: /^\|={3,}(?:(?:\r?\n|\r).*)*?(?:\r?\n|\r)\|={3,}$/m,
				inside: {
					'specifiers': {
						pattern: /(?!\|)(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*])?(?:[<^>](?:\.[<^>])?|\.[<^>])?[a-z]*)(?=\|)/,
						alias: 'attr-value'
					},
					'punctuation': {
						pattern: /(^|[^\\])[|!]=*/,
						lookbehind: true
					}
					// See rest below
				}
			},

			'passthrough-block': {
				pattern: /^(\+{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
				inside: {
					'punctuation': /^\++|\++$/
					// See rest below
				}
			},
			// Literal blocks and listing blocks
			'literal-block': {
				pattern: /^(-{4,}|\.{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
				inside: {
					'punctuation': /^(?:-+|\.+)|(?:-+|\.+)$/
					// See rest below
				}
			},
			// Sidebar blocks, quote blocks, example blocks and open blocks
			'other-block': {
				pattern: /^(--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
				inside: {
					'punctuation': /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/
					// See rest below
				}
			},

			// list-punctuation and list-label must appear before indented-block
			'list-punctuation': {
				pattern: /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
				lookbehind: true,
				alias: 'punctuation'
			},
			'list-label': {
				pattern: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im,
				lookbehind: true,
				alias: 'symbol'
			},
			'indented-block': {
				pattern: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/,
				lookbehind: true
			},

			'comment': /^\/\/.*/m,
			'title': {
				pattern: /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} +.+|^\.(?![\s.]).*/m,
				alias: 'important',
				inside: {
					'punctuation': /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/
					// See rest below
				}
			},
			'attribute-entry': {
				pattern: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m,
				alias: 'tag'
			},
			'attributes': attributes,
			'hr': {
				pattern: /^'{3,}$/m,
				alias: 'punctuation'
			},
			'page-break': {
				pattern: /^<{3,}$/m,
				alias: 'punctuation'
			},
			'admonition': {
				pattern: /^(?:TIP|NOTE|IMPORTANT|WARNING|CAUTION):/m,
				alias: 'keyword'
			},
			'callout': [
				{
					pattern: /(^[ \t]*)<?\d*>/m,
					lookbehind: true,
					alias: 'symbol'
				},
				{
					pattern: /<\d+>/,
					alias: 'symbol'
				}
			],
			'macro': {
				pattern: /\b[a-z\d][a-z\d-]*::?(?:(?:\S+)??\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
				inside: {
					'function': /^[a-z\d-]+(?=:)/,
					'punctuation': /^::?/,
					'attributes': {
						pattern: /(?:\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
						inside: attributes.inside
					}
				}
			},
			'inline': {
				/*
				The initial look-behind prevents the highlighting of escaped quoted text.

				Quoted text can be multi-line but cannot span an empty line.
				All quoted text can have attributes before [foobar, 'foobar', baz="bar"].

				First, we handle the constrained quotes.
				Those must be bounded by non-word chars and cannot have spaces between the delimiter and the first char.
				They are, in order: _emphasis_, ``double quotes'', `single quotes', `monospace`, 'emphasis', *strong*, +monospace+ and #unquoted#

				Then we handle the unconstrained quotes.
				Those do not have the restrictions of the constrained quotes.
				They are, in order: __emphasis__, **strong**, ++monospace++, +++passthrough+++, ##unquoted##, $$passthrough$$, ~subscript~, ^superscript^, {attribute-reference}, [[anchor]], [[[bibliography anchor]]], <<xref>>, (((indexes))) and ((indexes))
				 */
				pattern: /(^|[^\\])(?:(?:\B\[(?:[^\]\\"]|(["'])(?:(?!\2)[^\\]|\\.)*\2|\\.)*\])?(?:\b_(?!\s)(?: _|[^_\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: _|[^_\\\r\n]|\\.)+)*_\b|\B``(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B`(?!\s)(?: ['`]|.)+?(?:(?:\r?\n|\r)(?: ['`]|.)+?)*['`]\B|\B(['*+#])(?!\s)(?: \3|(?!\3)[^\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: \3|(?!\3)[^\\\r\n]|\\.)+)*\3\B)|(?:\[(?:[^\]\\"]|(["'])(?:(?!\4)[^\\]|\\.)*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:(?:\r?\n|\r).+?)*\5|\{[^}\r\n]+\}|\[\[\[?.+?(?:(?:\r?\n|\r).+?)*\]?\]\]|<<.+?(?:(?:\r?\n|\r).+?)*>>|\(\(\(?.+?(?:(?:\r?\n|\r).+?)*\)?\)\)))/m,
				lookbehind: true,
				inside: {
					'attributes': attributes,
					'url': {
						pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
						inside: {
							'punctuation': /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/
						}
					},
					'attribute-ref': {
						pattern: /^\{.+\}$/,
						inside: {
							'variable': {
								pattern: /(^\{)[a-z\d,+_-]+/,
								lookbehind: true
							},
							'operator': /^[=?!#%@$]|!(?=[:}])/,
							'punctuation': /^\{|\}$|::?/
						}
					},
					'italic': {
						pattern: /^(['_])[\s\S]+\1$/,
						inside: {
							'punctuation': /^(?:''?|__?)|(?:''?|__?)$/
						}
					},
					'bold': {
						pattern: /^\*[\s\S]+\*$/,
						inside: {
							punctuation: /^\*\*?|\*\*?$/
						}
					},
					'punctuation': /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)?\)\))$/
				}
			},
			'replacement': {
				pattern: /\((?:C|TM|R)\)/,
				alias: 'builtin'
			},
			'entity': /&#?[\da-z]{1,8};/i,
			'line-continuation': {
				pattern: /(^| )\+$/m,
				lookbehind: true,
				alias: 'punctuation'
			}
		};


		// Allow some nesting. There is no recursion though, so cloning should not be needed.

		attributes.inside['interpreted'].inside.rest = {
			'macro': Prism.languages.asciidoc['macro'],
			'inline': Prism.languages.asciidoc['inline'],
			'replacement': Prism.languages.asciidoc['replacement'],
			'entity': Prism.languages.asciidoc['entity']
		};

		Prism.languages.asciidoc['passthrough-block'].inside.rest = {
			'macro': Prism.languages.asciidoc['macro']
		};

		Prism.languages.asciidoc['literal-block'].inside.rest = {
			'callout': Prism.languages.asciidoc['callout']
		};

		Prism.languages.asciidoc['table'].inside.rest = {
			'comment-block': Prism.languages.asciidoc['comment-block'],
			'passthrough-block': Prism.languages.asciidoc['passthrough-block'],
			'literal-block': Prism.languages.asciidoc['literal-block'],
			'other-block': Prism.languages.asciidoc['other-block'],
			'list-punctuation': Prism.languages.asciidoc['list-punctuation'],
			'indented-block': Prism.languages.asciidoc['indented-block'],
			'comment': Prism.languages.asciidoc['comment'],
			'title': Prism.languages.asciidoc['title'],
			'attribute-entry': Prism.languages.asciidoc['attribute-entry'],
			'attributes': Prism.languages.asciidoc['attributes'],
			'hr': Prism.languages.asciidoc['hr'],
			'page-break': Prism.languages.asciidoc['page-break'],
			'admonition': Prism.languages.asciidoc['admonition'],
			'list-label': Prism.languages.asciidoc['list-label'],
			'callout': Prism.languages.asciidoc['callout'],
			'macro': Prism.languages.asciidoc['macro'],
			'inline': Prism.languages.asciidoc['inline'],
			'replacement': Prism.languages.asciidoc['replacement'],
			'entity': Prism.languages.asciidoc['entity'],
			'line-continuation': Prism.languages.asciidoc['line-continuation']
		};

		Prism.languages.asciidoc['other-block'].inside.rest = {
			'table': Prism.languages.asciidoc['table'],
			'list-punctuation': Prism.languages.asciidoc['list-punctuation'],
			'indented-block': Prism.languages.asciidoc['indented-block'],
			'comment': Prism.languages.asciidoc['comment'],
			'attribute-entry': Prism.languages.asciidoc['attribute-entry'],
			'attributes': Prism.languages.asciidoc['attributes'],
			'hr': Prism.languages.asciidoc['hr'],
			'page-break': Prism.languages.asciidoc['page-break'],
			'admonition': Prism.languages.asciidoc['admonition'],
			'list-label': Prism.languages.asciidoc['list-label'],
			'macro': Prism.languages.asciidoc['macro'],
			'inline': Prism.languages.asciidoc['inline'],
			'replacement': Prism.languages.asciidoc['replacement'],
			'entity': Prism.languages.asciidoc['entity'],
			'line-continuation': Prism.languages.asciidoc['line-continuation']
		};

		Prism.languages.asciidoc['title'].inside.rest = {
			'macro': Prism.languages.asciidoc['macro'],
			'inline': Prism.languages.asciidoc['inline'],
			'replacement': Prism.languages.asciidoc['replacement'],
			'entity': Prism.languages.asciidoc['entity']
		};

		// Plugin to make entity title show the real entity, idea by Roman Komarov
		Prism.hooks.add('wrap', function(env) {
			if (env.type === 'entity') {
				env.attributes['title'] = env.content.replace(/&amp;/, '&');
			}
		});
	}(Prism));
	Prism.languages.aspnet = Prism.languages.extend('markup', {
		'page-directive tag': {
			pattern: /<%\s*@.*%>/i,
			inside: {
				'page-directive tag': /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
				rest: Prism.languages.markup.tag.inside
			}
		},
		'directive tag': {
			pattern: /<%.*%>/i,
			inside: {
				'directive tag': /<%\s*?[$=%#:]{0,2}|%>/i,
				rest: Prism.languages.csharp
			}
		}
	});
	// Regexp copied from prism-markup, with a negative look-ahead added
	Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;

	// match directives of attribute value foo="<% Bar %>"
	Prism.languages.insertBefore('inside', 'punctuation', {
		'directive tag': Prism.languages.aspnet['directive tag']
	}, Prism.languages.aspnet.tag.inside["attr-value"]);

	Prism.languages.insertBefore('aspnet', 'comment', {
		'asp comment': /<%--[\s\S]*?--%>/
	});

	// script runat="server" contains csharp, not javascript
	Prism.languages.insertBefore('aspnet', Prism.languages.javascript ? 'script' : 'tag', {
		'asp script': {
			pattern: /(<script(?=.*runat=['"]?server['"]?)[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.csharp || {}
		}
	});
	// NOTES - follows first-first highlight method, block is locked after highlight, different from SyntaxHl
	Prism.languages.autohotkey= {
		'comment': {
			pattern: /(^[^";\n]*("[^"\n]*?"[^"\n]*?)*)(?:;.*$|^\s*\/\*[\s\S]*\n\*\/)/m,
			lookbehind: true
		},
		'string': /"(?:[^"\n\r]|"")*"/m,
		'function': /[^(); \t,\n+*\-=?>:\\\/<&%\[\]]+?(?=\()/m,  //function - don't use .*\) in the end bcoz string locks it
		'tag': /^[ \t]*[^\s:]+?(?=:(?:[^:]|$))/m,  //labels
		'variable': /%\w+%/,
		'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
		'operator': /\?|\/\/?=?|:=|\|[=|]?|&[=&]?|\+[=+]?|-[=-]?|\*[=*]?|<(?:<=?|>|=)?|>>?=?|[.^!=~]=?|\b(?:AND|NOT|OR)\b/,
		'punctuation': /[{}[\]():,]/,
		'boolean': /\b(?:true|false)\b/,

		'selector': /\b(?:AutoTrim|BlockInput|Break|Click|ClipWait|Continue|Control|ControlClick|ControlFocus|ControlGet|ControlGetFocus|ControlGetPos|ControlGetText|ControlMove|ControlSend|ControlSendRaw|ControlSetText|CoordMode|Critical|DetectHiddenText|DetectHiddenWindows|Drive|DriveGet|DriveSpaceFree|EnvAdd|EnvDiv|EnvGet|EnvMult|EnvSet|EnvSub|EnvUpdate|Exit|ExitApp|FileAppend|FileCopy|FileCopyDir|FileCreateDir|FileCreateShortcut|FileDelete|FileEncoding|FileGetAttrib|FileGetShortcut|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileMoveDir|FileRead|FileReadLine|FileRecycle|FileRecycleEmpty|FileRemoveDir|FileSelectFile|FileSelectFolder|FileSetAttrib|FileSetTime|FormatTime|GetKeyState|Gosub|Goto|GroupActivate|GroupAdd|GroupClose|GroupDeactivate|Gui|GuiControl|GuiControlGet|Hotkey|ImageSearch|IniDelete|IniRead|IniWrite|Input|InputBox|KeyWait|ListHotkeys|ListLines|ListVars|Loop|Menu|MouseClick|MouseClickDrag|MouseGetPos|MouseMove|MsgBox|OnExit|OutputDebug|Pause|PixelGetColor|PixelSearch|PostMessage|Process|Progress|Random|RegDelete|RegRead|RegWrite|Reload|Repeat|Return|Run|RunAs|RunWait|Send|SendEvent|SendInput|SendMessage|SendMode|SendPlay|SendRaw|SetBatchLines|SetCapslockState|SetControlDelay|SetDefaultMouseSpeed|SetEnv|SetFormat|SetKeyDelay|SetMouseDelay|SetNumlockState|SetScrollLockState|SetStoreCapslockMode|SetTimer|SetTitleMatchMode|SetWinDelay|SetWorkingDir|Shutdown|Sleep|Sort|SoundBeep|SoundGet|SoundGetWaveVolume|SoundPlay|SoundSet|SoundSetWaveVolume|SplashImage|SplashTextOff|SplashTextOn|SplitPath|StatusBarGetText|StatusBarWait|StringCaseSense|StringGetPos|StringLeft|StringLen|StringLower|StringMid|StringReplace|StringRight|StringSplit|StringTrimLeft|StringTrimRight|StringUpper|Suspend|SysGet|Thread|ToolTip|Transform|TrayTip|URLDownloadToFile|WinActivate|WinActivateBottom|WinClose|WinGet|WinGetActiveStats|WinGetActiveTitle|WinGetClass|WinGetPos|WinGetText|WinGetTitle|WinHide|WinKill|WinMaximize|WinMenuSelectItem|WinMinimize|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinRestore|WinSet|WinSetTitle|WinShow|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive)\b/i,

		'constant': /\b(?:a_ahkpath|a_ahkversion|a_appdata|a_appdatacommon|a_autotrim|a_batchlines|a_caretx|a_carety|a_computername|a_controldelay|a_cursor|a_dd|a_ddd|a_dddd|a_defaultmousespeed|a_desktop|a_desktopcommon|a_detecthiddentext|a_detecthiddenwindows|a_endchar|a_eventinfo|a_exitreason|a_formatfloat|a_formatinteger|a_gui|a_guievent|a_guicontrol|a_guicontrolevent|a_guiheight|a_guiwidth|a_guix|a_guiy|a_hour|a_iconfile|a_iconhidden|a_iconnumber|a_icontip|a_index|a_ipaddress1|a_ipaddress2|a_ipaddress3|a_ipaddress4|a_isadmin|a_iscompiled|a_iscritical|a_ispaused|a_issuspended|a_isunicode|a_keydelay|a_language|a_lasterror|a_linefile|a_linenumber|a_loopfield|a_loopfileattrib|a_loopfiledir|a_loopfileext|a_loopfilefullpath|a_loopfilelongpath|a_loopfilename|a_loopfileshortname|a_loopfileshortpath|a_loopfilesize|a_loopfilesizekb|a_loopfilesizemb|a_loopfiletimeaccessed|a_loopfiletimecreated|a_loopfiletimemodified|a_loopreadline|a_loopregkey|a_loopregname|a_loopregsubkey|a_loopregtimemodified|a_loopregtype|a_mday|a_min|a_mm|a_mmm|a_mmmm|a_mon|a_mousedelay|a_msec|a_mydocuments|a_now|a_nowutc|a_numbatchlines|a_ostype|a_osversion|a_priorhotkey|programfiles|a_programfiles|a_programs|a_programscommon|a_screenheight|a_screenwidth|a_scriptdir|a_scriptfullpath|a_scriptname|a_sec|a_space|a_startmenu|a_startmenucommon|a_startup|a_startupcommon|a_stringcasesense|a_tab|a_temp|a_thisfunc|a_thishotkey|a_thislabel|a_thismenu|a_thismenuitem|a_thismenuitempos|a_tickcount|a_timeidle|a_timeidlephysical|a_timesincepriorhotkey|a_timesincethishotkey|a_titlematchmode|a_titlematchmodespeed|a_username|a_wday|a_windelay|a_windir|a_workingdir|a_yday|a_year|a_yweek|a_yyyy|clipboard|clipboardall|comspec|errorlevel)\b/i,

		'builtin': /\b(?:abs|acos|asc|asin|atan|ceil|chr|class|cos|dllcall|exp|fileexist|Fileopen|floor|il_add|il_create|il_destroy|instr|substr|isfunc|islabel|IsObject|ln|log|lv_add|lv_delete|lv_deletecol|lv_getcount|lv_getnext|lv_gettext|lv_insert|lv_insertcol|lv_modify|lv_modifycol|lv_setimagelist|mod|onmessage|numget|numput|registercallback|regexmatch|regexreplace|round|sin|tan|sqrt|strlen|sb_seticon|sb_setparts|sb_settext|strsplit|tv_add|tv_delete|tv_getchild|tv_getcount|tv_getnext|tv_get|tv_getparent|tv_getprev|tv_getselection|tv_gettext|tv_modify|varsetcapacity|winactive|winexist|__New|__Call|__Get|__Set)\b/i,

		'symbol': /\b(?:alt|altdown|altup|appskey|backspace|browser_back|browser_favorites|browser_forward|browser_home|browser_refresh|browser_search|browser_stop|bs|capslock|ctrl|ctrlbreak|ctrldown|ctrlup|del|delete|down|end|enter|esc|escape|f1|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f2|f20|f21|f22|f23|f24|f3|f4|f5|f6|f7|f8|f9|home|ins|insert|joy1|joy10|joy11|joy12|joy13|joy14|joy15|joy16|joy17|joy18|joy19|joy2|joy20|joy21|joy22|joy23|joy24|joy25|joy26|joy27|joy28|joy29|joy3|joy30|joy31|joy32|joy4|joy5|joy6|joy7|joy8|joy9|joyaxes|joybuttons|joyinfo|joyname|joypov|joyr|joyu|joyv|joyx|joyy|joyz|lalt|launch_app1|launch_app2|launch_mail|launch_media|lbutton|lcontrol|lctrl|left|lshift|lwin|lwindown|lwinup|mbutton|media_next|media_play_pause|media_prev|media_stop|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadadd|numpadclear|numpaddel|numpaddiv|numpaddot|numpaddown|numpadend|numpadenter|numpadhome|numpadins|numpadleft|numpadmult|numpadpgdn|numpadpgup|numpadright|numpadsub|numpadup|pgdn|pgup|printscreen|ralt|rbutton|rcontrol|rctrl|right|rshift|rwin|rwindown|rwinup|scrolllock|shift|shiftdown|shiftup|space|tab|up|volume_down|volume_mute|volume_up|wheeldown|wheelleft|wheelright|wheelup|xbutton1|xbutton2)\b/i,

		'important': /#\b(?:AllowSameLineComments|ClipboardTimeout|CommentFlag|ErrorStdOut|EscapeChar|HotkeyInterval|HotkeyModifierTimeout|Hotstring|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Include|IncludeAgain|InstallKeybdHook|InstallMouseHook|KeyHistory|LTrim|MaxHotkeysPerInterval|MaxMem|MaxThreads|MaxThreadsBuffer|MaxThreadsPerHotkey|NoEnv|NoTrayIcon|Persistent|SingleInstance|UseHook|WinActivateForce)\b/i,

		'keyword': /\b(?:Abort|AboveNormal|Add|ahk_class|ahk_group|ahk_id|ahk_pid|All|Alnum|Alpha|AltSubmit|AltTab|AltTabAndMenu|AltTabMenu|AltTabMenuDismiss|AlwaysOnTop|AutoSize|Background|BackgroundTrans|BelowNormal|between|BitAnd|BitNot|BitOr|BitShiftLeft|BitShiftRight|BitXOr|Bold|Border|Button|ByRef|Checkbox|Checked|CheckedGray|Choose|ChooseString|Close|Color|ComboBox|Contains|ControlList|Count|Date|DateTime|Days|DDL|Default|DeleteAll|Delimiter|Deref|Destroy|Digit|Disable|Disabled|DropDownList|Edit|Eject|Else|Enable|Enabled|Error|Exist|Expand|ExStyle|FileSystem|First|Flash|Float|FloatFast|Focus|Font|for|global|Grid|Group|GroupBox|GuiClose|GuiContextMenu|GuiDropFiles|GuiEscape|GuiSize|Hdr|Hidden|Hide|High|HKCC|HKCR|HKCU|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE|HKEY_USERS|HKLM|HKU|Hours|HScroll|Icon|IconSmall|ID|IDLast|If|IfEqual|IfExist|IfGreater|IfGreaterOrEqual|IfInString|IfLess|IfLessOrEqual|IfMsgBox|IfNotEqual|IfNotExist|IfNotInString|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Ignore|ImageList|in|Integer|IntegerFast|Interrupt|is|italic|Join|Label|LastFound|LastFoundExist|Limit|Lines|List|ListBox|ListView|local|Lock|Logoff|Low|Lower|Lowercase|MainWindow|Margin|Maximize|MaximizeBox|MaxSize|Minimize|MinimizeBox|MinMax|MinSize|Minutes|MonthCal|Mouse|Move|Multi|NA|No|NoActivate|NoDefault|NoHide|NoIcon|NoMainWindow|norm|Normal|NoSort|NoSortHdr|NoStandard|Not|NoTab|NoTimers|Number|Off|Ok|On|OwnDialogs|Owner|Parse|Password|Picture|Pixel|Pos|Pow|Priority|ProcessName|Radio|Range|Read|ReadOnly|Realtime|Redraw|REG_BINARY|REG_DWORD|REG_EXPAND_SZ|REG_MULTI_SZ|REG_SZ|Region|Relative|Rename|Report|Resize|Restore|Retry|RGB|Screen|Seconds|Section|Serial|SetLabel|ShiftAltTab|Show|Single|Slider|SortDesc|Standard|static|Status|StatusBar|StatusCD|strike|Style|Submit|SysMenu|Tab2|TabStop|Text|Theme|Tile|ToggleCheck|ToggleEnable|ToolWindow|Top|Topmost|TransColor|Transparent|Tray|TreeView|TryAgain|Type|UnCheck|underline|Unicode|Unlock|UpDown|Upper|Uppercase|UseErrorLevel|Vis|VisFirst|Visible|VScroll|Wait|WaitClose|WantCtrlA|WantF2|WantReturn|While|Wrap|Xdigit|xm|xp|xs|Yes|ym|yp|ys)\b/i
	};
	Prism.languages.autoit = {
		"comment": [
			/;.*/,
			{
				// The multi-line comments delimiters can actually be commented out with ";"
				pattern: /(^\s*)#(?:comments-start|cs)[\s\S]*?^\s*#(?:comments-end|ce)/m,
				lookbehind: true
			}
		],
		"url": {
			pattern: /(^\s*#include\s+)(?:<[^\r\n>]+>|"[^\r\n"]+")/m,
			lookbehind: true
		},
		"string": {
			pattern: /(["'])(?:\1\1|(?!\1)[^\r\n])*\1/,
			greedy: true,
			inside: {
				"variable": /([%$@])\w+\1/
			}
		},
		"directive": {
			pattern: /(^\s*)#\w+/m,
			lookbehind: true,
			alias: 'keyword'
		},
		"function": /\b\w+(?=\()/,
		// Variables and macros
		"variable": /[$@]\w+/,
		"keyword": /\b(?:Case|Const|Continue(?:Case|Loop)|Default|Dim|Do|Else(?:If)?|End(?:Func|If|Select|Switch|With)|Enum|Exit(?:Loop)?|For|Func|Global|If|In|Local|Next|Null|ReDim|Select|Static|Step|Switch|Then|To|Until|Volatile|WEnd|While|With)\b/i,
		"number": /\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
		"boolean": /\b(?:True|False)\b/i,
		"operator": /<[=>]?|[-+*\/=&>]=?|[?^]|\b(?:And|Or|Not)\b/i,
		"punctuation": /[\[\]().,:]/
	};
	(function(Prism) {
		var insideString = {
			variable: [
				// Arithmetic Environment
				{
					pattern: /\$?\(\([\s\S]+?\)\)/,
					inside: {
						// If there is a $ sign at the beginning highlight $(( and )) as variable
						variable: [{
								pattern: /(^\$\(\([\s\S]+)\)\)/,
								lookbehind: true
							},
							/^\$\(\(/
						],
						number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
						// Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
						operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
						// If there is no $ sign at the beginning highlight (( and )) as punctuation
						punctuation: /\(\(?|\)\)?|,|;/
					}
				},
				// Command Substitution
				{
					pattern: /\$\([^)]+\)|`[^`]+`/,
					inside: {
						variable: /^\$\(|^`|\)$|`$/
					}
				},
				/\$(?:[\w#?*!@]+|\{[^}]+\})/i
			]
		};

		Prism.languages.bash = {
			'shebang': {
				pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
				alias: 'important'
			},
			'comment': {
				pattern: /(^|[^"{\\])#.*/,
				lookbehind: true
			},
			'string': [
				//Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
				{
					pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
					lookbehind: true,
					greedy: true,
					inside: insideString
				},
				{
					pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
					greedy: true,
					inside: insideString
				}
			],
			'variable': insideString.variable,
			// Originally based on http://ss64.com/bash/
			'function': {
				pattern: /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
				lookbehind: true
			},
			'keyword': {
				pattern: /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
				lookbehind: true
			},
			'boolean': {
				pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
				lookbehind: true
			},
			'operator': /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
			'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
		};

		var inside = insideString.variable[1].inside;
		inside['function'] = Prism.languages.bash['function'];
		inside.keyword = Prism.languages.bash.keyword;
		inside.boolean = Prism.languages.bash.boolean;
		inside.operator = Prism.languages.bash.operator;
		inside.punctuation = Prism.languages.bash.punctuation;
	})(Prism);

	Prism.languages.basic = {
		'string': /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
		'comment': {
			pattern: /(?:!|REM\b).+/i,
			inside: {
				'keyword': /^REM/i
			}
		},
		'number': /(?:\b|\B[.-])(?:\d+\.?\d*)(?:E[+-]?\d+)?/i,
		'keyword': /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
		'function': /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
		'operator': /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
		'punctuation': /[,;:()]/
	};
	(function (Prism) {
		var variable = /%%?[~:\w]+%?|!\S+!/;
		var parameter = {
			pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
			alias: 'attr-name',
			inside: {
				'punctuation': /:/
			}
		};
		var string = /"[^"]*"/;
		var number = /(?:\b|-)\d+\b/;

		Prism.languages.batch = {
			'comment': [
				/^::.*/m,
				{
					pattern: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
					lookbehind: true
				}
			],
			'label': {
				pattern: /^:.*/m,
				alias: 'property'
			},
			'command': [
				{
					// FOR command
					pattern: /((?:^|[&(])[ \t]*)for(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* \S+ in \([^)]+\) do/im,
					lookbehind: true,
					inside: {
						'keyword': /^for\b|\b(?:in|do)\b/i,
						'string': string,
						'parameter': parameter,
						'variable': variable,
						'number': number,
						'punctuation': /[()',]/
					}
				},
				{
					// IF command
					pattern: /((?:^|[&(])[ \t]*)if(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|\S+)?(?:==| (?:equ|neq|lss|leq|gtr|geq) )(?:"[^"]*"|\S+))/im,
					lookbehind: true,
					inside: {
						'keyword': /^if\b|\b(?:not|cmdextversion|defined|errorlevel|exist)\b/i,
						'string': string,
						'parameter': parameter,
						'variable': variable,
						'number': number,
						'operator': /\^|==|\b(?:equ|neq|lss|leq|gtr|geq)\b/i
					}
				},
				{
					// ELSE command
					pattern: /((?:^|[&()])[ \t]*)else\b/im,
					lookbehind: true,
					inside: {
						'keyword': /^else\b/i
					}
				},
				{
					// SET command
					pattern: /((?:^|[&(])[ \t]*)set(?: ?\/[a-z](?:[ :](?:"[^"]*"|\S+))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
					lookbehind: true,
					inside: {
						'keyword': /^set\b/i,
						'string': string,
						'parameter': parameter,
						'variable': [
							variable,
							/\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/
						],
						'number': number,
						'operator': /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
						'punctuation': /[()',]/
					}
				},
				{
					// Other commands
					pattern: /((?:^|[&(])[ \t]*@?)\w+\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
					lookbehind: true,
					inside: {
						'keyword': /^\w+\b/i,
						'string': string,
						'parameter': parameter,
						'label': {
							pattern: /(^\s*):\S+/m,
							lookbehind: true,
							alias: 'property'
						},
						'variable': variable,
						'number': number,
						'operator': /\^/
					}
				}
			],
			'operator': /[&@]/,
			'punctuation': /[()']/
		};
	}(Prism));
	Prism.languages.bison = Prism.languages.extend('c', {});

	Prism.languages.insertBefore('bison', 'comment', {
		'bison': {
			// This should match all the beginning of the file
			// including the prologue(s), the bison declarations and
			// the grammar rules.
			pattern: /^[\s\S]*?%%[\s\S]*?%%/,
			inside: {
				'c': {
					// Allow for one level of nested braces
					pattern: /%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/,
					inside: {
						'delimiter': {
							pattern: /^%?\{|%?\}$/,
							alias: 'punctuation'
						},
						'bison-variable': {
							pattern: /[$@](?:<[^\s>]+>)?[\w$]+/,
							alias: 'variable',
							inside: {
								'punctuation': /<|>/
							}
						},
						rest: Prism.languages.c
					}
				},
				'comment': Prism.languages.c.comment,
				'string': Prism.languages.c.string,
				'property': /\S+(?=:)/,
				'keyword': /%\w+/,
				'number': {
					pattern: /(^|[^@])\b(?:0x[\da-f]+|\d+)/i,
					lookbehind: true
				},
				'punctuation': /%[%?]|[|:;\[\]<>]/
			}
		}
	});
	Prism.languages.brainfuck = {
		'pointer': {
			pattern: /<|>/,
			alias: 'keyword'
		},
		'increment': {
			pattern: /\+/,
			alias: 'inserted'
		},
		'decrement': {
			pattern: /-/,
			alias: 'deleted'
		},
		'branching': {
			pattern: /\[|\]/,
			alias: 'important'
		},
		'operator': /[.,]/,
		'comment': /\S+/
	};
	Prism.languages.bro = {

		'comment': {
			pattern: /(^|[^\\$])#.*/,
			lookbehind: true,
				inside: {
					'italic':  /\b(?:TODO|FIXME|XXX)\b/
			}
		},

		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},

		'boolean': /\b[TF]\b/,

		'function': {
			pattern: /(?:function|hook|event) \w+(?:::\w+)?/,
			inside: {
				keyword: /^(?:function|hook|event)/
			}
		},

		'variable':	{
			pattern: /(?:global|local) \w+/i,
			inside: {
				keyword: /(?:global|local)/
			}
		},

		'builtin': /(?:@(?:load(?:-(?:sigs|plugin))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FILENAME))|(?:&?(?:redef|priority|log|optional|default|add_func|delete_func|expire_func|read_expire|write_expire|create_expire|synchronized|persistent|rotate_interval|rotate_size|encrypt|raw_output|mergeable|group|error_handler|type_column))/,

		'constant': {
			pattern: /const \w+/i,
			inside: {
				keyword: /const/
			}
		},

		'keyword': /\b(?:break|next|continue|alarm|using|of|add|delete|export|print|return|schedule|when|timeout|addr|any|bool|count|double|enum|file|int|interval|pattern|opaque|port|record|set|string|subnet|table|time|vector|for|if|else|in|module|function)\b/,

		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&|\|\|?|\?|\*|\/|~|\^|%/,

		'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,

		'punctuation': /[{}[\];(),.:]/
	};

	Prism.languages.cpp = Prism.languages.extend('c', {
		'keyword': /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
		'boolean': /\b(?:true|false)\b/,
		'operator': /--?|\+\+?|!=?|<{1,2}=?|>{1,2}=?|->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|\|?|\?|\*|\/|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
	});

	Prism.languages.insertBefore('cpp', 'keyword', {
		'class-name': {
			pattern: /(class\s+)\w+/i,
			lookbehind: true
		}
	});
	Prism.languages.csharp = Prism.languages.extend('clike', {
		'keyword': /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
		'string': [
			{
				pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
				greedy: true
			},
			{
				pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
				greedy: true
			}
		],
		'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+f?)\b/i
	});

	Prism.languages.insertBefore('csharp', 'keyword', {
		'generic-method': {
			pattern: /[a-z0-9_]+\s*<[^>\r\n]+?>\s*(?=\()/i,
			alias: 'function',
			inside: {
				keyword: Prism.languages.csharp.keyword,
				punctuation: /[<>(),.:]/
			}
		},
		'preprocessor': {
			pattern: /(^\s*)#.*/m,
			lookbehind: true,
			alias: 'property',
			inside: {
				// highlight preprocessor directives as keywords
				'directive': {
					pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
					lookbehind: true,
					alias: 'keyword'
				}
			}
		}
	});

	Prism.languages.arduino = Prism.languages.extend('cpp', {
		'keyword': /\b(?:setup|if|else|while|do|for|return|in|instanceof|default|function|loop|goto|switch|case|new|try|throw|catch|finally|null|break|continue|boolean|bool|void|byte|word|string|String|array|int|long|integer|double)\b/,
		'builtin': /\b(?:KeyboardController|MouseController|SoftwareSerial|EthernetServer|EthernetClient|LiquidCrystal|LiquidCrystal_I2C|RobotControl|GSMVoiceCall|EthernetUDP|EsploraTFT|HttpClient|RobotMotor|WiFiClient|GSMScanner|FileSystem|Scheduler|GSMServer|YunClient|YunServer|IPAddress|GSMClient|GSMModem|Keyboard|Ethernet|Console|GSMBand|Esplora|Stepper|Process|WiFiUDP|GSM_SMS|Mailbox|USBHost|Firmata|PImage|Client|Server|GSMPIN|FileIO|Bridge|Serial|EEPROM|Stream|Mouse|Audio|Servo|File|Task|GPRS|WiFi|Wire|TFT|GSM|SPI|SD|runShellCommandAsynchronously|analogWriteResolution|retrieveCallingNumber|printFirmwareVersion|analogReadResolution|sendDigitalPortPair|noListenOnLocalhost|readJoystickButton|setFirmwareVersion|readJoystickSwitch|scrollDisplayRight|getVoiceCallStatus|scrollDisplayLeft|writeMicroseconds|delayMicroseconds|beginTransmission|getSignalStrength|runAsynchronously|getAsynchronously|listenOnLocalhost|getCurrentCarrier|readAccelerometer|messageAvailable|sendDigitalPorts|lineFollowConfig|countryNameWrite|runShellCommand|readStringUntil|rewindDirectory|readTemperature|setClockDivider|readLightSensor|endTransmission|analogReference|detachInterrupt|countryNameRead|attachInterrupt|encryptionType|readBytesUntil|robotNameWrite|readMicrophone|robotNameRead|cityNameWrite|userNameWrite|readJoystickY|readJoystickX|mouseReleased|openNextFile|scanNetworks|noInterrupts|digitalWrite|beginSpeaker|mousePressed|isActionDone|mouseDragged|displayLogos|noAutoscroll|addParameter|remoteNumber|getModifiers|keyboardRead|userNameRead|waitContinue|processInput|parseCommand|printVersion|readNetworks|writeMessage|blinkVersion|cityNameRead|readMessage|setDataMode|parsePacket|isListening|setBitOrder|beginPacket|isDirectory|motorsWrite|drawCompass|digitalRead|clearScreen|serialEvent|rightToLeft|setTextSize|leftToRight|requestFrom|keyReleased|compassRead|analogWrite|interrupts|WiFiServer|disconnect|playMelody|parseFloat|autoscroll|getPINUsed|setPINUsed|setTimeout|sendAnalog|readSlider|analogRead|beginWrite|createChar|motorsStop|keyPressed|tempoWrite|readButton|subnetMask|debugPrint|macAddress|writeGreen|randomSeed|attachGPRS|readString|sendString|remotePort|releaseAll|mouseMoved|background|getXChange|getYChange|answerCall|getResult|voiceCall|endPacket|constrain|getSocket|writeJSON|getButton|available|connected|findUntil|readBytes|exitValue|readGreen|writeBlue|startLoop|IPAddress|isPressed|sendSysex|pauseMode|gatewayIP|setCursor|getOemKey|tuneWrite|noDisplay|loadImage|switchPIN|onRequest|onReceive|changePIN|playFile|noBuffer|parseInt|overflow|checkPIN|knobRead|beginTFT|bitClear|updateIR|bitWrite|position|writeRGB|highByte|writeRed|setSpeed|readBlue|noStroke|remoteIP|transfer|shutdown|hangCall|beginSMS|endWrite|attached|maintain|noCursor|checkReg|checkPUK|shiftOut|isValid|shiftIn|pulseIn|connect|println|localIP|pinMode|getIMEI|display|noBlink|process|getBand|running|beginSD|drawBMP|lowByte|setBand|release|bitRead|prepare|pointTo|readRed|setMode|noFill|remove|listen|stroke|detach|attach|noTone|exists|buffer|height|bitSet|circle|config|cursor|random|IRread|setDNS|endSMS|getKey|micros|millis|begin|print|write|ready|flush|width|isPIN|blink|clear|press|mkdir|rmdir|close|point|yield|image|BSSID|click|delay|read|text|move|peek|beep|rect|line|open|seek|fill|size|turn|stop|home|find|step|tone|sqrt|RSSI|SSID|end|bit|tan|cos|sin|pow|map|abs|max|min|get|run|put)\b/,
		'constant': /\b(?:DIGITAL_MESSAGE|FIRMATA_STRING|ANALOG_MESSAGE|REPORT_DIGITAL|REPORT_ANALOG|INPUT_PULLUP|SET_PIN_MODE|INTERNAL2V56|SYSTEM_RESET|LED_BUILTIN|INTERNAL1V1|SYSEX_START|INTERNAL|EXTERNAL|DEFAULT|OUTPUT|INPUT|HIGH|LOW)\b/
	});

	(function(Prism) {

	// Ignore comments starting with { to privilege string interpolation highlighting
	var comment = /#(?!\{).+/,
	    interpolation = {
	    	pattern: /#\{[^}]+\}/,
	    	alias: 'variable'
	    };

	Prism.languages.coffeescript = Prism.languages.extend('javascript', {
		'comment': comment,
		'string': [

			// Strings are multiline
			{
				pattern: /'(?:\\[\s\S]|[^\\'])*'/,
				greedy: true
			},

			{
				// Strings are multiline
				pattern: /"(?:\\[\s\S]|[^\\"])*"/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			}
		],
		'keyword': /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
		'class-member': {
			pattern: /@(?!\d)\w+/,
			alias: 'variable'
		}
	});

	Prism.languages.insertBefore('coffeescript', 'comment', {
		'multiline-comment': {
			pattern: /###[\s\S]+?###/,
			alias: 'comment'
		},

		// Block regexp can contain comments and interpolation
		'block-regex': {
			pattern: /\/{3}[\s\S]*?\/{3}/,
			alias: 'regex',
			inside: {
				'comment': comment,
				'interpolation': interpolation
			}
		}
	});

	Prism.languages.insertBefore('coffeescript', 'string', {
		'inline-javascript': {
			pattern: /`(?:\\[\s\S]|[^\\`])*`/,
			inside: {
				'delimiter': {
					pattern: /^`|`$/,
					alias: 'punctuation'
				},
				rest: Prism.languages.javascript
			}
		},

		// Block strings
		'multiline-string': [
			{
				pattern: /'''[\s\S]*?'''/,
				greedy: true,
				alias: 'string'
			},
			{
				pattern: /"""[\s\S]*?"""/,
				greedy: true,
				alias: 'string',
				inside: {
					interpolation: interpolation
				}
			}
		]

	});

	Prism.languages.insertBefore('coffeescript', 'keyword', {
		// Object property
		'property': /(?!\d)\w+(?=\s*:(?!:))/
	});

	delete Prism.languages.coffeescript['template-string'];

	}(Prism));
	/**
	 * Original by Samuel Flores
	 *
	 * Adds the following new token classes:
	 * 		constant, builtin, variable, symbol, regex
	 */
	(function(Prism) {
		Prism.languages.ruby = Prism.languages.extend('clike', {
			'comment': [
				/#(?!\{[^\r\n]*?\}).*/,
				/^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m
			],
			'keyword': /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
		});

		var interpolation = {
			pattern: /#\{[^}]+\}/,
			inside: {
				'delimiter': {
					pattern: /^#\{|\}$/,
					alias: 'tag'
				},
				rest: Prism.util.clone(Prism.languages.ruby)
			}
		};

		Prism.languages.insertBefore('ruby', 'keyword', {
			'regex': [
				{
					pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					// Here we need to specifically allow interpolation
					pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
					greedy: true,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
					lookbehind: true,
					greedy: true
				}
			],
			'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
			'symbol': /:[a-zA-Z_]\w*(?:[?!]|\b)/
		});

		Prism.languages.insertBefore('ruby', 'number', {
			'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
			'constant': /\b[A-Z]\w*(?:[?!]|\b)/
		});

		Prism.languages.ruby.string = [
			{
				pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				// Here we need to specifically allow interpolation
				pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
				greedy: true,
				inside: {
					'interpolation': interpolation
				}
			}
		];
	}(Prism));
	Prism.languages.css.selector = {
		pattern: /[^{}\s][^{}]*(?=\s*\{)/,
		inside: {
			'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
			'pseudo-class': /:[-\w]+(?:\(.*\))?/,
			'class': /\.[-:.\w]+/,
			'id': /#[-:.\w]+/,
			'attribute': /\[[^\]]+\]/
		}
	};

	Prism.languages.insertBefore('css', 'function', {
		'hexcode': /#[\da-f]{3,8}/i,
		'entity': /\\[\da-f]{1,8}/i,
		'number': /[\d%.]+/
	});
	Prism.languages.d = Prism.languages.extend('clike', {
		'string': [
			// r"", x""
			/\b[rx]"(?:\\[\s\S]|[^\\"])*"[cwd]?/,
			// q"[]", q"()", q"<>", q"{}"
			/\bq"(?:\[[\s\S]*?\]|\([\s\S]*?\)|<[\s\S]*?>|\{[\s\S]*?\})"/,
			// q"IDENT
			// ...
			// IDENT"
			/\bq"([_a-zA-Z][_a-zA-Z\d]*)(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\1"/,
			// q"//", q"||", etc.
			/\bq"(.)[\s\S]*?\1"/,
			// Characters
			/'(?:\\'|\\?[^']+)'/,

			/(["`])(?:\\[\s\S]|(?!\1)[^\\])*\1[cwd]?/
		],

		'number': [
			// The lookbehind and the negative look-ahead try to prevent bad highlighting of the .. operator
			// Hexadecimal numbers must be handled separately to avoid problems with exponent "e"
			/\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]*/i,
			{
				pattern: /((?:\.\.)?)(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ulfi]*/i,
				lookbehind: true
			}
		],

		// In order: $, keywords and special tokens, globally defined symbols
		'keyword': /\$|\b(?:abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|inout|int|interface|invariant|ireal|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|public|pure|real|ref|return|scope|shared|short|static|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|__(?:(?:FILE|MODULE|LINE|FUNCTION|PRETTY_FUNCTION|DATE|EOF|TIME|TIMESTAMP|VENDOR|VERSION)__|gshared|traits|vector|parameters)|string|wstring|dstring|size_t|ptrdiff_t)\b/,
		'operator': /\|[|=]?|&[&=]?|\+[+=]?|-[-=]?|\.?\.\.|=[>=]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\b|(?:<[<>]?|>>?>?|\^\^|[*\/%^~])=?/
	});


	Prism.languages.d.comment = [
		// Shebang
		/^\s*#!.+/,
		// /+ +/
		{
			// Allow one level of nesting
			pattern: /(^|[^\\])\/\+(?:\/\+[\s\S]*?\+\/|[\s\S])*?\+\//,
			lookbehind: true
		}
	].concat(Prism.languages.d.comment);

	Prism.languages.insertBefore('d', 'comment', {
		'token-string': {
			// Allow one level of nesting
			pattern: /\bq\{(?:\{[^}]*\}|[^}])*\}/,
			alias: 'string'
		}
	});

	Prism.languages.insertBefore('d', 'keyword', {
		'property': /\B@\w*/
	});

	Prism.languages.insertBefore('d', 'function', {
		'register': {
			// Iasm registers
			pattern: /\b(?:[ABCD][LHX]|E[ABCD]X|E?(?:BP|SP|DI|SI)|[ECSDGF]S|CR[0234]|DR[012367]|TR[3-7]|X?MM[0-7]|R[ABCD]X|[BS]PL|R[BS]P|[DS]IL|R[DS]I|R(?:[89]|1[0-5])[BWD]?|XMM(?:[89]|1[0-5])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|\b)/,
			alias: 'variable'
		}
	});
	Prism.languages.dart = Prism.languages.extend('clike', {
		'string': [
			{
				pattern: /r?("""|''')[\s\S]*?\1/,
				greedy: true
			},
			{
				pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
				greedy: true
			}
		],
		'keyword': [
			/\b(?:async|sync|yield)\*/,
			/\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|default|deferred|do|dynamic|else|enum|export|external|extends|factory|final|finally|for|get|if|implements|import|in|library|new|null|operator|part|rethrow|return|set|static|super|switch|this|throw|try|typedef|var|void|while|with|yield)\b/
		],
		'operator': /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/
	});

	Prism.languages.insertBefore('dart','function',{
		'metadata': {
			pattern: /@\w+/,
			alias: 'symbol'
		}
	});
	// Django/Jinja2 syntax definition for Prism.js <http://prismjs.com> syntax highlighter.
	// Mostly it works OK but can paint code incorrectly on complex html/template tag combinations.

	var _django_template = {
		'property': {
			pattern: /(?:{{|{%)[\s\S]*?(?:%}|}})/g,
			greedy: true,
			inside: {
				'string': {
					pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
					greedy: true
				},
				'keyword': /\b(?:\||load|verbatim|widthratio|ssi|firstof|for|url|ifchanged|csrf_token|lorem|ifnotequal|autoescape|now|templatetag|debug|cycle|ifequal|regroup|comment|filter|endfilter|if|spaceless|with|extends|block|include|else|empty|endif|endfor|as|endblock|endautoescape|endverbatim|trans|endtrans|[Tt]rue|[Ff]alse|[Nn]one|in|is|static|macro|endmacro|call|endcall|set|endset|raw|endraw)\b/,
				'operator' : /[-+=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
				'function': /\b(?:_|abs|add|addslashes|attr|batch|callable|capfirst|capitalize|center|count|cut|d|date|default|default_if_none|defined|dictsort|dictsortreversed|divisibleby|e|equalto|escape|escaped|escapejs|even|filesizeformat|first|float|floatformat|force_escape|forceescape|format|get_digit|groupby|indent|int|iriencode|iterable|join|last|length|length_is|linebreaks|linebreaksbr|linenumbers|list|ljust|lower|make_list|map|mapping|number|odd|phone2numeric|pluralize|pprint|random|reject|rejectattr|removetags|replace|reverse|rjust|round|safe|safeseq|sameas|select|selectattr|sequence|slice|slugify|sort|string|stringformat|striptags|sum|time|timesince|timeuntil|title|trim|truncate|truncatechars|truncatechars_html|truncatewords|truncatewords_html|undefined|unordered_list|upper|urlencode|urlize|urlizetrunc|wordcount|wordwrap|xmlattr|yesno)\b/,
				'important': /\b-?\d+(?:\.\d+)?\b/,
				'variable': /\b\w+?\b/,
				'punctuation' : /[[\];(),.:]/
			}
		}
	};

	Prism.languages.django = Prism.languages.extend('markup', {'comment': /(?:<!--|{#)[\s\S]*?(?:#}|-->)/});
	// Updated html tag pattern to allow template tags inside html tags
	Prism.languages.django.tag.pattern = /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^>=]+))?)*\s*\/?>/i;
	Prism.languages.insertBefore('django', 'entity', _django_template);
	Prism.languages.insertBefore('inside', 'tag', _django_template, Prism.languages.django.tag);

	if (Prism.languages.javascript) {
		// Combine js code and template tags painting inside <script> blocks
		Prism.languages.insertBefore('inside', 'string', _django_template, Prism.languages.django.script);
		Prism.languages.django.script.inside.string.inside = _django_template;
	}
	if (Prism.languages.css) {
		// Combine css code and template tags painting inside <style> blocks
		Prism.languages.insertBefore('inside', 'atrule', {'tag': _django_template.property}, Prism.languages.django.style);
		Prism.languages.django.style.inside.string.inside = _django_template;
	}

	// Add an Jinja2 alias
	Prism.languages.jinja2 = Prism.languages.django;

	Prism.languages.diff = {
		'coord': [
			// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
			/^(?:\*{3}|-{3}|\+{3}).*$/m,
			// Match "@@ ... @@" coord lines in unified diff.
			/^@@.*@@$/m,
			// Match coord lines in normal diff (starts with a number).
			/^\d+.*$/m
		],

		// Match inserted and deleted lines. Support both +/- and >/< styles.
		'deleted': /^[-<].*$/m,
		'inserted': /^[+>].*$/m,

		// Match "different" lines (prefixed with "!") in context diff.
		'diff': {
			'pattern': /^!(?!!).+$/m,
			'alias': 'important'
		}
	};

	Prism.languages.docker = {
		'keyword': {
			pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/mi,
			lookbehind: true
		},
		'string': /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
		'comment': /#.*/,
		'punctuation': /---|\.\.\.|[:[\]{}\-,|>?]/
	};

	Prism.languages.dockerfile = Prism.languages.docker;

	Prism.languages.eiffel = {
		'comment': /--.*/,
		'string': [
			// Aligned-verbatim-strings
			{
				pattern: /"([^[]*)\[[\s\S]+?\]\1"/,
				greedy: true
			},
			// Non-aligned-verbatim-strings
			{
				pattern: /"([^{]*)\{[\s\S]+?\}\1"/,
				greedy: true
			},
			// Single-line string
			{
				pattern: /"(?:%\s+%|%.|[^%"\r\n])*"/,
				greedy: true
			}
		],
		// normal char | special char | char code
		'char': /'(?:%.|[^%'\r\n])+'/,
		'keyword': /\b(?:across|agent|alias|all|and|attached|as|assign|attribute|check|class|convert|create|Current|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|or|Precursor|redefine|rename|require|rescue|Result|retry|select|separate|some|then|undefine|until|variant|Void|when|xor)\b/i,
		'boolean': /\b(?:True|False)\b/i,
		// Convention: class-names are always all upper-case characters
		'class-name': {
			'pattern': /\b[A-Z][\dA-Z_]*\b/,
			'alias': 'builtin'
		},
		'number': [
			// hexa | octal | bin
			/\b0[xcb][\da-f](?:_*[\da-f])*\b/i,
			// Decimal
			/(?:\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?[eE][+-]?)?\d(?:_*\d)*|\d(?:_*\d)*\.?/
		],
		'punctuation': /:=|<<|>>|\(\||\|\)|->|\.(?=\w)|[{}[\];(),:?]/,
		'operator': /\\\\|\|\.\.\||\.\.|\/[~\/=]?|[><]=?|[-+*^=~]/
	};

	Prism.languages.elixir = {
		// Negative look-ahead is needed for string interpolation
		// Negative look-behind is needed to avoid highlighting markdown headers in
		// multi-line doc strings
		'comment': {
			pattern: /(^|[^#])#(?![{#]).*/m,
			lookbehind: true
		},
		// ~r"""foo""" (multi-line), ~r'''foo''' (multi-line), ~r/foo/, ~r|foo|, ~r"foo", ~r'foo', ~r(foo), ~r[foo], ~r{foo}, ~r<foo>
		'regex': /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
		'string': [
			{
				// ~s"""foo""" (multi-line), ~s'''foo''' (multi-line), ~s/foo/, ~s|foo|, ~s"foo", ~s'foo', ~s(foo), ~s[foo], ~s{foo} (with interpolation care), ~s<foo>
				pattern: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
				greedy: true,
				inside: {
					// See interpolation below
				}
			},
			{
				pattern: /("""|''')[\s\S]*?\1/,
				greedy: true,
				inside: {
					// See interpolation below
				}
			},
			{
				// Multi-line strings are allowed
				pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
				greedy: true,
				inside: {
					// See interpolation below
				}
			}
		],
		'atom': {
			// Look-behind prevents bad highlighting of the :: operator
			pattern: /(^|[^:]):\w+/,
			lookbehind: true,
			alias: 'symbol'
		},
		// Look-ahead prevents bad highlighting of the :: operator
		'attr-name': /\w+:(?!:)/,
		'capture': {
			// Look-behind prevents bad highlighting of the && operator
			pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
			lookbehind: true,
			alias: 'function'
		},
		'argument': {
			// Look-behind prevents bad highlighting of the && operator
			pattern: /(^|[^&])&\d+/,
			lookbehind: true,
			alias: 'variable'
		},
		'attribute': {
			pattern: /@[\S]+/,
			alias: 'variable'
		},
		'number': /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
		'keyword': /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
		'boolean': /\b(?:true|false|nil)\b/,
		'operator': [
			/\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
			{
				// We don't want to match <<
				pattern: /([^<])<(?!<)/,
				lookbehind: true
			},
			{
				// We don't want to match >>
				pattern: /([^>])>(?!>)/,
				lookbehind: true
			}
		],
		'punctuation': /<<|>>|[.,%\[\]{}()]/
	};

	Prism.languages.elixir.string.forEach(function(o) {
		o.inside = {
			'interpolation': {
				pattern: /#\{[^}]+\}/,
				inside: {
					'delimiter': {
						pattern: /^#\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.util.clone(Prism.languages.elixir)
				}
			}
		};
	});


	Prism.languages.erlang = {
		'comment': /%.+/,
		'string': {
			pattern: /"(?:\\.|[^\\"\r\n])*"/,
			greedy: true
		},
		'quoted-function': {
			pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
			alias: 'function'
		},
		'quoted-atom': {
			pattern: /'(?:\\.|[^\\'\r\n])+'/,
			alias: 'atom'
		},
		'boolean': /\b(?:true|false)\b/,
		'keyword': /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
		'number': [
			/\$\\?./,
			/\d+#[a-z0-9]+/i,
			/(?:\b|-)\d*\.?\d+([Ee][+-]?\d+)?\b/
		],
		'function': /\b[a-z][\w@]*(?=\()/,
		'variable': {
			// Look-behind is used to prevent wrong highlighting of atoms containing "@"
			pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
			lookbehind: true
		},
		'operator': [
			/[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
			{
				// We don't want to match <<
				pattern: /(^|[^<])<(?!<)/,
				lookbehind: true
			},
			{
				// We don't want to match >>
				pattern: /(^|[^>])>(?!>)/,
				lookbehind: true
			}
		],
		'atom': /\b[a-z][\w@]*/,
		'punctuation': /[()[\]{}:;,.#|]|<<|>>/

	};
	Prism.languages.fsharp = Prism.languages.extend('clike', {
		'comment': [
			{
				pattern: /(^|[^\\])\(\*[\s\S]*?\*\)/,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true
			}
		],
		'keyword': /\b(?:let|return|use|yield)(?:!\B|\b)|\b(abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
		'string': {
			pattern: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1)B?/,
			greedy: true
		},
		'number': [
			/\b-?0x[\da-fA-F]+(?:un|lf|LF)?\b/,
			/\b-?0b[01]+(?:y|uy)?\b/,
			/\b-?(?:\d*\.?\d+|\d+\.)(?:[fFmM]|[eE][+-]?\d+)?\b/,
			/\b-?\d+(?:y|uy|s|us|l|u|ul|L|UL|I)?\b/
		]
	});
	Prism.languages.insertBefore('fsharp', 'keyword', {
		'preprocessor': {
			pattern: /^[^\r\n\S]*#.*/m,
			alias: 'property',
			inside: {
				'directive': {
					pattern: /(\s*#)\b(?:else|endif|if|light|line|nowarn)\b/,
					lookbehind: true,
					alias: 'keyword'
				}
			}
		}
	});

	(function (Prism) {
		Prism.languages.flow = Prism.languages.extend('javascript', {});

		Prism.languages.insertBefore('flow', 'keyword', {
			'type': [
				{
					pattern: /\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/,
					alias: 'tag'
				}
			]
		});
		Prism.languages.flow['function-variable'].pattern = /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i;

		Prism.languages.insertBefore('flow', 'operator', {
			'flow-punctuation': {
				pattern: /\{\||\|\}/,
				alias: 'punctuation'
			}
		});

		if (Prism.util.type(Prism.languages.flow.keyword) !== 'Array') {
			Prism.languages.flow.keyword = [Prism.languages.flow.keyword];
		}
		Prism.languages.flow.keyword.unshift(
			{
				pattern: /(^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/,
				lookbehind: true
			},
			{
				pattern: /(^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype|Subtype|Enum)\b(?!\$)/,
				lookbehind: true
			}
		);
	}(Prism));
	Prism.languages.fortran = {
		'quoted-number': {
			pattern: /[BOZ](['"])[A-F0-9]+\1/i,
			alias: 'number'
		},
		'string': {
			pattern: /(?:\w+_)?(['"])(?:\1\1|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!\1).)*(?:\1|&)/,
			inside: {
				'comment': {
					pattern: /(&(?:\r\n?|\n)\s*)!.*/,
					lookbehind: true
				}
			}
		},
		'comment': /!.*/,
		'boolean': /\.(?:TRUE|FALSE)\.(?:_\w+)?/i,
		'number': /(?:\b|[+-])(?:\d+(?:\.\d*)?|\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i,
		'keyword': [
			// Types
			/\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i,
			// END statements
			/\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i,
			// Statements
			/\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i,
			// Others
			/\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i
		],
		'operator': [
			/\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NEQV)\.|\.[A-Z]+\./i,
			{
				// Use lookbehind to prevent confusion with (/ /)
				pattern: /(^|(?!\().)\/(?!\))/,
				lookbehind: true
			}
		],
		'punctuation': /\(\/|\/\)|[(),;:&]/
	};
	Prism.languages.gherkin = {
		'pystring': {
			pattern: /("""|''')[\s\S]+?\1/,
			alias: 'string'
		},
		'comment': {
			pattern: /((?:^|\r?\n|\r)[ \t]*)#.*/,
			lookbehind: true
		},
		'tag': {
			pattern: /((?:^|\r?\n|\r)[ \t]*)@\S*/,
			lookbehind: true
		},
		'feature': {
			pattern: /((?:^|\r?\n|\r)[ \t]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Característica|Egenskab|Egenskap|Eiginleiki|Feature|Fīča|Fitur|Fonctionnalité|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Funcţionalitate|Funcționalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalitāte|Funkcionalnost|Funkcja|Funksie|Funktionalität|Funktionalitéit|Funzionalità|Hwaet|Hwæt|Jellemző|Karakteristik|laH|Lastnost|Mak|Mogucnost|Mogućnost|Moznosti|Možnosti|OH HAI|Omadus|Ominaisuus|Osobina|Özellik|perbogh|poQbogh malja'|Potrzeba biznesowa|Požadavek|Požiadavka|Pretty much|Qap|Qu'meH 'ut|Savybė|Tính năng|Trajto|Vermoë|Vlastnosť|Właściwość|Značilnost|Δυνατότητα|Λειτουργία|Могућност|Мөмкинлек|Особина|Свойство|Үзенчәлеклелек|Функционал|Функционалност|Функция|Функціонал|תכונה|خاصية|خصوصیت|صلاحیت|کاروبار کی ضرورت|وِیژگی|रूप लेख|ਖਾਸੀਅਤ|ਨਕਸ਼ ਨੁਹਾਰ|ਮੁਹਾਂਦਰਾ|గుణము|ಹೆಚ್ಚಳ|ความต้องการทางธุรกิจ|ความสามารถ|โครงหลัก|기능|フィーチャ|功能|機能):(?:[^:]+(?:\r?\n|\r|$))*/,
			lookbehind: true,
			inside: {
				'important': {
					pattern: /(:)[^\r\n]+/,
					lookbehind: true
				},
				keyword: /[^:\r\n]+:/
			}
		},
		'scenario': {
			pattern: /((?:^|\r?\n|\r)[ \t]*)(?:Abstract Scenario|Abstrakt Scenario|Achtergrond|Aer|Ær|Agtergrond|All y'all|Antecedentes|Antecedents|Atburðarás|Atburðarásir|Awww, look mate|B4|Background|Baggrund|Bakgrund|Bakgrunn|Bakgrunnur|Beispiele|Beispiller|Bối cảnh|Cefndir|Cenario|Cenário|Cenario de Fundo|Cenário de Fundo|Cenarios|Cenários|Contesto|Context|Contexte|Contexto|Conto|Contoh|Contone|Dæmi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delineação do Cenário|Dis is what went down|Dữ liệu|Dyagram senaryo|Dyagram Senaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenari|Escenario|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cenário|Examples|EXAMPLZ|Exempel|Exemple|Exemples|Exemplos|First off|Fono|Forgatókönyv|Forgatókönyv vázlat|Fundo|Geçmiş|ghantoH|Grundlage|Hannergrond|Háttér|Heave to|Istorik|Juhtumid|Keadaan|Khung kịch bản|Khung tình huống|Kịch bản|Koncept|Konsep skenario|Kontèks|Kontekst|Kontekstas|Konteksts|Kontext|Konturo de la scenaro|Latar Belakang|lut|lut chovnatlh|lutmey|Lýsing Atburðarásar|Lýsing Dæma|Menggariskan Senario|MISHUN|MISHUN SRSLY|mo'|Náčrt Scenára|Náčrt Scénáře|Náčrt Scenáru|Oris scenarija|Örnekler|Osnova|Osnova Scenára|Osnova scénáře|Osnutek|Ozadje|Paraugs|Pavyzdžiai|Példák|Piemēri|Plan du scénario|Plan du Scénario|Plan senaryo|Plan Senaryo|Plang vum Szenario|Pozadí|Pozadie|Pozadina|Príklady|Příklady|Primer|Primeri|Primjeri|Przykłady|Raamstsenaarium|Reckon it's like|Rerefons|Scenár|Scénář|Scenarie|Scenarij|Scenarijai|Scenarijaus šablonas|Scenariji|Scenārijs|Scenārijs pēc parauga|Scenarijus|Scenario|Scénario|Scenario Amlinellol|Scenario Outline|Scenario Template|Scenariomal|Scenariomall|Scenarios|Scenariu|Scenariusz|Scenaro|Schema dello scenario|Se ðe|Se the|Se þe|Senario|Senaryo|Senaryo deskripsyon|Senaryo Deskripsyon|Senaryo taslağı|Shiver me timbers|Situācija|Situai|Situasie|Situasie Uiteensetting|Skenario|Skenario konsep|Skica|Structura scenariu|Structură scenariu|Struktura scenarija|Stsenaarium|Swa|Swa hwaer swa|Swa hwær swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Taust|Tausta|Template Keadaan|Template Senario|Template Situai|The thing of it is|Tình huống|Variantai|Voorbeelde|Voorbeelden|Wharrimean is|Yo\-ho\-ho|You'll wanna|Założenia|Παραδείγματα|Περιγραφή Σεναρίου|Σενάρια|Σενάριο|Υπόβαθρο|Кереш|Контекст|Концепт|Мисаллар|Мисоллар|Основа|Передумова|Позадина|Предистория|Предыстория|Приклади|Пример|Примери|Примеры|Рамка на сценарий|Скица|Структура сценарија|Структура сценария|Структура сценарію|Сценарий|Сценарий структураси|Сценарийның төзелеше|Сценарији|Сценарио|Сценарій|Тарих|Үрнәкләр|דוגמאות|רקע|תבנית תרחיש|תרחיש|الخلفية|الگوی سناریو|امثلة|پس منظر|زمینه|سناریو|سيناريو|سيناريو مخطط|مثالیں|منظر نامے کا خاکہ|منظرنامہ|نمونه ها|उदाहरण|परिदृश्य|परिदृश्य रूपरेखा|पृष्ठभूमि|ਉਦਾਹਰਨਾਂ|ਪਟਕਥਾ|ਪਟਕਥਾ ਢਾਂਚਾ|ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ|ਪਿਛੋਕੜ|ఉదాహరణలు|కథనం|నేపథ్యం|సన్నివేశం|ಉದಾಹರಣೆಗಳು|ಕಥಾಸಾರಾಂಶ|ವಿವರಣೆ|ಹಿನ್ನೆಲೆ|โครงสร้างของเหตุการณ์|ชุดของตัวอย่าง|ชุดของเหตุการณ์|แนวคิด|สรุปเหตุการณ์|เหตุการณ์|배경|시나리오|시나리오 개요|예|サンプル|シナリオ|シナリオアウトライン|シナリオテンプレ|シナリオテンプレート|テンプレ|例|例子|剧本|剧本大纲|劇本|劇本大綱|场景|场景大纲|場景|場景大綱|背景):[^:\r\n]*/,
			lookbehind: true,
			inside: {
				'important': {
					pattern: /(:)[^\r\n]*/,
					lookbehind: true
				},
				keyword: /[^:\r\n]+:/
			}
		},
		'table-body': {
			// Look-behind is used to skip the table head, which has the same format as any table row
			pattern: /((?:\r?\n|\r)[ \t]*\|.+\|[^\r\n]*)+/,
			lookbehind: true,
			inside: {
				'outline': {
					pattern: /<[^>]+?>/,
					alias: 'variable'
				},
				'td': {
					pattern: /\s*[^\s|][^|]*/,
					alias: 'string'
				},
				'punctuation': /\|/
			}
		},
		'table-head': {
			pattern: /(?:\r?\n|\r)[ \t]*\|.+\|[^\r\n]*/,
			inside: {
				'th': {
					pattern: /\s*[^\s|][^|]*/,
					alias: 'variable'
				},
				'punctuation': /\|/
			}
		},
		'atrule': {
			pattern: /((?:\r?\n|\r)[ \t]+)(?:'ach|'a|'ej|7|a|A také|A taktiež|A tiež|A zároveň|Aber|Ac|Adott|Akkor|Ak|Aleshores|Ale|Ali|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|Atès|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Biết|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|Când|Cando|Cand|Ce|Cuando|Če|Ða ðe|Ða|Dadas|Dada|Dados|Dado|DaH ghu' bejlu'|dann|Dann|Dano|Dan|Dar|Dat fiind|Data|Date fiind|Date|Dati fiind|Dati|Daţi fiind|Dați fiind|Dato|DEN|Den youse gotta|Dengan|De|Diberi|Diyelim ki|Donada|Donat|Donitaĵo|Do|Dun|Duota|Ðurh|Eeldades|Ef|Eğer ki|Entao|Então|Entón|Entonces|En|Epi|E|És|Etant donnée|Etant donné|Et|Étant données|Étant donnée|Étant donné|Etant données|Etant donnés|Étant donnés|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Given|Givet|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Jeśli|Jeżeli|Kadar|Kada|Kad|Kai|Kaj|Když|Keď|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid|Kui|Kun|Lan|latlh|Le sa a|Let go and haul|Le|Lè sa a|Lè|Logo|Lorsqu'<|Lorsque|mä|Maar|Mais|Mając|Majd|Maka|Manawa|Mas|Ma|Menawa|Men|Mutta|Nalikaning|Nalika|Nanging|Når|När|Nato|Nhưng|Niin|Njuk|O zaman|Og|Och|Oletetaan|Onda|Ond|Oraz|Pak|Pero|Però|Podano|Pokiaľ|Pokud|Potem|Potom|Privzeto|Pryd|qaSDI'|Quando|Quand|Quan|Så|Sed|Se|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|Şi|Și|Soit|Stel|Tada|Tad|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|Then y'all|Then|Thì|Thurh|Toda|Too right|ugeholl|Und|Un|Và|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|When y'all|When|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za předpokladu|Zadani|Zadano|Zadan|Zadate|Zadato|Zakładając|Zaradi|Zatati|Þa þe|Þa|Þá|Þegar|Þurh|Αλλά|Δεδομένου|Και|Όταν|Τότε|А також|Агар|Але|Али|Аммо|А|Әгәр|Әйтик|Әмма|Бирок|Ва|Вә|Дадено|Дано|Допустим|Если|Задате|Задати|Задато|И|І|К тому же|Када|Кад|Когато|Когда|Коли|Ләкин|Лекин|Нәтиҗәдә|Нехай|Но|Онда|Припустимо, що|Припустимо|Пусть|Также|Та|Тогда|Тоді|То|Унда|Һәм|Якщо|אבל|אזי|אז|בהינתן|וגם|כאשר|آنگاه|اذاً|اگر|اما|اور|با فرض|بالفرض|بفرض|پھر|تب|ثم|جب|عندما|فرض کیا|لكن|لیکن|متى|هنگامی|و|अगर|और|कदा|किन्तु|चूंकि|जब|तथा|तदा|तब|परन्तु|पर|यदि|ਅਤੇ|ਜਦੋਂ|ਜਿਵੇਂ ਕਿ|ਜੇਕਰ|ਤਦ|ਪਰ|అప్పుడు|ఈ పరిస్థితిలో|కాని|చెప్పబడినది|మరియు|ಆದರೆ|ನಂತರ|ನೀಡಿದ|ಮತ್ತು|ಸ್ಥಿತಿಯನ್ನು|กำหนดให้|ดังนั้น|แต่|เมื่อ|และ|그러면<|그리고<|단<|만약<|만일<|먼저<|조건<|하지만<|かつ<|しかし<|ただし<|ならば<|もし<|並且<|但し<|但是<|假如<|假定<|假設<|假设<|前提<|同时<|同時<|并且<|当<|當<|而且<|那么<|那麼<)(?=[ \t]+)/,
			lookbehind: true
		},
		'string': {
			pattern: /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/,
			inside: {
				'outline': {
					pattern: /<[^>]+?>/,
					alias: 'variable'
				}
			}
		},
		'outline': {
			pattern: /<[^>]+?>/,
			alias: 'variable'
		}
	};

	Prism.languages.git = {
		/*
		 * A simple one line comment like in a git status command
		 * For instance:
		 * $ git status
		 * # On branch infinite-scroll
		 * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
		 * # and have 1 and 2 different commits each, respectively.
		 * nothing to commit (working directory clean)
		 */
		'comment': /^#.*/m,

		/*
		 * Regexp to match the changed lines in a git diff output. Check the example below.
		 */
		'deleted': /^[-–].*/m,
		'inserted': /^\+.*/m,

		/*
		 * a string (double and simple quote)
		 */
		'string': /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,

		/*
		 * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
		 * For instance:
		 * $ git add file.txt
		 */
		'command': {
			pattern: /^.*\$ git .*$/m,
			inside: {
				/*
				 * A git command can contain a parameter starting by a single or a double dash followed by a string
				 * For instance:
				 * $ git diff --cached
				 * $ git log -p
				 */
				'parameter': /\s--?\w+/m
			}
		},

		/*
		 * Coordinates displayed in a git diff command
		 * For instance:
		 * $ git diff
		 * diff --git file.txt file.txt
		 * index 6214953..1d54a52 100644
		 * --- file.txt
		 * +++ file.txt
		 * @@ -1 +1,2 @@
		 * -Here's my tetx file
		 * +Here's my text file
		 * +And this is the second line
		 */
		'coord': /^@@.*@@$/m,

		/*
		 * Match a "commit [SHA1]" line in a git log output.
		 * For instance:
		 * $ git log
		 * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
		 * Author: lgiraudel
		 * Date:   Mon Feb 17 11:18:34 2014 +0100
		 *
		 *     Add of a new line
		 */
		'commit_sha1': /^commit \w{40}$/m
	};

	Prism.languages.glsl = Prism.languages.extend('clike', {
		'comment': [
			/\/\*[\s\S]*?\*\//,
			/\/\/(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/
		],
		'number': /\b(?:0x[\da-f]+|(?:\.\d+|\d+\.?\d*)(?:e[+-]?\d+)?)[ulf]*\b/i,
		'keyword': /\b(?:attribute|const|uniform|varying|buffer|shared|coherent|volatile|restrict|readonly|writeonly|atomic_uint|layout|centroid|flat|smooth|noperspective|patch|sample|break|continue|do|for|while|switch|case|default|if|else|subroutine|in|out|inout|float|double|int|void|bool|true|false|invariant|precise|discard|return|d?mat[234](?:x[234])?|[ibdu]?vec[234]|uint|lowp|mediump|highp|precision|[iu]?sampler[123]D|[iu]?samplerCube|sampler[12]DShadow|samplerCubeShadow|[iu]?sampler[12]DArray|sampler[12]DArrayShadow|[iu]?sampler2DRect|sampler2DRectShadow|[iu]?samplerBuffer|[iu]?sampler2DMS(?:Array)?|[iu]?samplerCubeArray|samplerCubeArrayShadow|[iu]?image[123]D|[iu]?image2DRect|[iu]?imageCube|[iu]?imageBuffer|[iu]?image[12]DArray|[iu]?imageCubeArray|[iu]?image2DMS(?:Array)?|struct|common|partition|active|asm|class|union|enum|typedef|template|this|resource|goto|inline|noinline|public|static|extern|external|interface|long|short|half|fixed|unsigned|superp|input|output|hvec[234]|fvec[234]|sampler3DRect|filter|sizeof|cast|namespace|using)\b/
	});

	Prism.languages.insertBefore('glsl', 'comment', {
		'preprocessor': {
			pattern: /(^[ \t]*)#(?:(?:define|undef|if|ifdef|ifndef|else|elif|endif|error|pragma|extension|version|line)\b)?/m,
			lookbehind: true,
			alias: 'builtin'
		}
	});
	Prism.languages.go = Prism.languages.extend('clike', {
		'keyword': /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
		'builtin': /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
		'boolean': /\b(?:_|iota|nil|true|false)\b/,
		'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
		'number': /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,
		'string': {
			pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/,
			greedy: true
		}
	});
	delete Prism.languages.go['class-name'];

	Prism.languages.graphql = {
		'comment': /#.*/,
		'string': {
			pattern: /"(?:\\.|[^\\"\r\n])*"/,
			greedy: true
		},
		'number': /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
		'boolean': /\b(?:true|false)\b/,
		'variable': /\$[a-z_]\w*/i,
		'directive': {
			pattern: /@[a-z_]\w*/i,
			alias: 'function'
		},
		'attr-name': /[a-z_]\w*(?=\s*:)/i,
		'keyword': [
			{
				pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.{3}\s*)on\b/,
				lookbehind: true
			},
			/\b(?:query|fragment|mutation)\b/
		],
		'operator': /!|=|\.{3}/,
		'punctuation': /[!(){}\[\]:=,]/
	};
	Prism.languages.groovy = Prism.languages.extend('clike', {
		'keyword': /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
		'string': [
			{
				pattern: /("""|''')[\s\S]*?\1|(?:\$\/)(?:\$\/\$|[\s\S])*?\/\$/,
				greedy: true
			},
			{
				pattern: /(["'\/])(?:\\.|(?!\1)[^\\\r\n])*\1/,
				greedy: true
			}
		],
		'number': /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
		'operator': {
			pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.{1,2}(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
			lookbehind: true
		},
		'punctuation': /\.+|[{}[\];(),:$]/
	});

	Prism.languages.insertBefore('groovy', 'string', {
		'shebang': {
			pattern: /#!.+/,
			alias: 'comment'
		}
	});

	Prism.languages.insertBefore('groovy', 'punctuation', {
		'spock-block': /\b(?:setup|given|when|then|and|cleanup|expect|where):/
	});

	Prism.languages.insertBefore('groovy', 'function', {
		'annotation': {
			alias: 'punctuation',
			pattern: /(^|[^.])@\w+/,
			lookbehind: true
		}
	});

	// Handle string interpolation
	Prism.hooks.add('wrap', function(env) {
		if (env.language === 'groovy' && env.type === 'string') {
			var delimiter = env.content[0];

			if (delimiter != "'") {
				var pattern = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/;
				if (delimiter === '$') {
					pattern = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/;
				}

				// To prevent double HTML-encoding we have to decode env.content first
				env.content = env.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');

				env.content = Prism.highlight(env.content, {
					'expression': {
						pattern: pattern,
						lookbehind: true,
						inside: Prism.languages.groovy
					}
				});

				env.classes.push(delimiter === '/' ? 'regex' : 'gstring');
			}
		}
	});

	/* TODO
		Handle multiline code after tag
		    %foo= some |
				multiline |
				code |
	*/

	(function(Prism) {

		Prism.languages.haml = {
			// Multiline stuff should appear before the rest

			'multiline-comment': {
				pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ]+.+)*/,
				lookbehind: true,
				alias: 'comment'
			},

			'multiline-code': [
				{
					pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ]+.+)/,
					lookbehind: true,
					inside: {
						rest: Prism.languages.ruby
					}
				},
				{
					pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*\|[\t ]*)*/,
					lookbehind: true,
					inside: {
						rest: Prism.languages.ruby
					}
				}
			],

			// See at the end of the file for known filters
			'filter': {
				pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/,
				lookbehind: true,
				inside: {
					'filter-name': {
						pattern: /^:[\w-]+/,
						alias: 'variable'
					}
				}
			},

			'markup': {
				pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
				lookbehind: true,
				inside: {
					rest: Prism.languages.markup
				}
			},
			'doctype': {
				pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
				lookbehind: true
			},
			'tag': {
				// Allows for one nested group of braces
				pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
				lookbehind: true,
				inside: {
					'attributes': [
						{
							// Lookbehind tries to prevent interpolations from breaking it all
							// Allows for one nested group of braces
							pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
							lookbehind: true,
							inside: {
								rest: Prism.languages.ruby
							}
						},
						{
							pattern: /\([^)]+\)/,
							inside: {
								'attr-value': {
									pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
									lookbehind: true
								},
								'attr-name': /[\w:-]+(?=\s*!?=|\s*[,)])/,
								'punctuation': /[=(),]/
							}
						},
						{
							pattern: /\[[^\]]+\]/,
							inside: {
								rest: Prism.languages.ruby
							}
						}
					],
					'punctuation': /[<>]/
				}
			},
			'code': {
				pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
				lookbehind: true,
				inside: {
					rest: Prism.languages.ruby
				}
			},
			// Interpolations in plain text
			'interpolation': {
				pattern: /#\{[^}]+\}/,
				inside: {
					'delimiter': {
						pattern: /^#\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.ruby
				}
			},
			'punctuation': {
				pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
				lookbehind: true
			}
		};

		var filter_pattern = '((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+';

		// Non exhaustive list of available filters and associated languages
		var filters = [
			'css',
			{filter:'coffee',language:'coffeescript'},
			'erb',
			'javascript',
			'less',
			'markdown',
			'ruby',
			'scss',
			'textile'
		];
		var all_filters = {};
		for (var i = 0, l = filters.length; i < l; i++) {
			var filter = filters[i];
			filter = typeof filter === 'string' ? {filter: filter, language: filter} : filter;
			if (Prism.languages[filter.language]) {
				all_filters['filter-' + filter.filter] = {
					pattern: RegExp(filter_pattern.replace('{{filter_name}}', filter.filter)),
					lookbehind: true,
					inside: {
						'filter-name': {
							pattern: /^:[\w-]+/,
							alias: 'variable'
						},
						rest: Prism.languages[filter.language]
					}
				}
			}
		}

		Prism.languages.insertBefore('haml', 'filter', all_filters);

	}(Prism));
	(function(Prism) {

		var handlebars_pattern = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/;

		Prism.languages.handlebars = Prism.languages.extend('markup', {
			'handlebars': {
				pattern: handlebars_pattern,
				inside: {
					'delimiter': {
						pattern: /^\{\{\{?|\}\}\}?$/i,
						alias: 'punctuation'
					},
					'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
					'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/,
					'boolean': /\b(?:true|false)\b/,
					'block': {
						pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
						lookbehind: true,
						alias: 'keyword'
					},
					'brackets': {
						pattern: /\[[^\]]+\]/,
						inside: {
							punctuation: /\[|\]/,
							variable: /[\s\S]+/
						}
					},
					'punctuation': /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
					'variable': /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/
				}
			}
		});

		// Comments are inserted at top so that they can
		// surround markup
		Prism.languages.insertBefore('handlebars', 'tag', {
			'handlebars-comment': {
				pattern: /\{\{![\s\S]*?\}\}/,
				alias: ['handlebars','comment']
			}
		});

		// Tokenize all inline Handlebars expressions that are wrapped in {{ }} or {{{ }}}
		// This allows for easy Handlebars + markup highlighting
		Prism.hooks.add('before-highlight', function(env) {
			if (env.language !== 'handlebars') {
				return;
			}

			env.tokenStack = [];

			env.backupCode = env.code;
			env.code = env.code.replace(handlebars_pattern, function(match) {
				var i = env.tokenStack.length;
				// Check for existing strings
				while (env.backupCode.indexOf('___HANDLEBARS' + i + '___') !== -1)
					++i;

				// Create a sparse array
				env.tokenStack[i] = match;

				return '___HANDLEBARS' + i + '___';
			});
		});

		// Restore env.code for other plugins (e.g. line-numbers)
		Prism.hooks.add('before-insert', function(env) {
			if (env.language === 'handlebars') {
				env.code = env.backupCode;
				delete env.backupCode;
			}
		});

		// Re-insert the tokens after highlighting
		// and highlight them with defined grammar
		Prism.hooks.add('after-highlight', function(env) {
			if (env.language !== 'handlebars') {
				return;
			}

			for (var i = 0, keys = Object.keys(env.tokenStack); i < keys.length; ++i) {
				var k = keys[i];
				var t = env.tokenStack[k];

				// The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
				env.highlightedCode = env.highlightedCode.replace('___HANDLEBARS' + k + '___', Prism.highlight(t, env.grammar, 'handlebars').replace(/\$/g, '$$$$'));
			}

			env.element.innerHTML = env.highlightedCode;
		});

	}(Prism));

	Prism.languages.haskell= {
		'comment': {
			pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
			lookbehind: true
		},
		'char': /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
		'string': {
			pattern: /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
			greedy: true
		},
		'keyword' : /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
		'import_statement' : {
			// The imported or hidden names are not included in this import
			// statement. This is because we want to highlight those exactly like
			// we do for the names in the program.
			pattern: /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
			lookbehind: true,
			inside: {
				'keyword': /\b(?:import|qualified|as|hiding)\b/
			}
		},
		// These are builtin variables only. Constructors are highlighted later as a constant.
		'builtin': /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
		// decimal integers and floating point numbers | octal integers | hexadecimal integers
		'number' : /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
		// Most of this is needed because of the meaning of a single '.'.
		// If it stands alone freely, it is the function composition.
		// It may also be a separator between a module name and an identifier => no
		// operator. If it comes together with other special characters it is an
		// operator too.
		'operator' : /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][\w']*\.)*[_a-z][\w']*`/,
		// In Haskell, nearly everything is a variable, do not highlight these.
		'hvariable': /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
		'constant': /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
		'punctuation' : /[{}[\];(),.:]/
	};

	Prism.languages.haxe = Prism.languages.extend('clike', {
		// Strings can be multi-line
		'string': {
			pattern: /(["'])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /(^|[^\\])\$(?:\w+|\{[^}]+\})/,
					lookbehind: true,
					inside: {
						'interpolation': {
							pattern: /^\$\w*/,
							alias: 'variable'
						}
						// See rest below
					}
				}
			}
		},
		// The final look-ahead prevents highlighting of keywords if expressions such as "haxe.macro.Expr"
		'keyword': /\bthis\b|\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynamic|else|enum|extends|extern|from|for|function|if|implements|import|in|inline|interface|macro|new|null|override|public|private|return|static|super|switch|throw|to|try|typedef|using|var|while)(?!\.)\b/,
		'operator': /\.{3}|\+\+?|-[->]?|[=!]=?|&&?|\|\|?|<[<=]?|>[>=]?|[*\/%~^]/
	});
	Prism.languages.insertBefore('haxe', 'class-name', {
		'regex': {
			pattern: /~\/(?:[^\/\\\r\n]|\\.)+\/[igmsu]*/,
			greedy: true
		}
	});
	Prism.languages.insertBefore('haxe', 'keyword', {
		'preprocessor': {
			pattern: /#\w+/,
			alias: 'builtin'
		},
		'metadata': {
			pattern: /@:?\w+/,
			alias: 'symbol'
		},
		'reification': {
			pattern: /\$(?:\w+|(?=\{))/,
			alias: 'variable'
		}
	});
	Prism.languages.haxe['string'].inside['interpolation'].inside.rest = Prism.util.clone(Prism.languages.haxe);
	delete Prism.languages.haxe['class-name'];
	Prism.languages.http = {
		'request-line': {
			pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
			inside: {
				// HTTP Verb
				property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
				// Path or query argument
				'attr-name': /:\w+/
			}
		},
		'response-status': {
			pattern: /^HTTP\/1.[01] \d+.*/m,
			inside: {
				// Status, e.g. 200 OK
				property: {
	                pattern: /(^HTTP\/1.[01] )\d+.*/i,
	                lookbehind: true
	            }
			}
		},
		// HTTP header name
		'header-name': {
	        pattern: /^[\w-]+:(?=.)/m,
	        alias: 'keyword'
	    }
	};

	// Create a mapping of Content-Type headers to language definitions
	var httpLanguages = {
		'application/json': Prism.languages.javascript,
		'application/xml': Prism.languages.markup,
		'text/xml': Prism.languages.markup,
		'text/html': Prism.languages.markup
	};

	// Insert each content type parser that has its associated language
	// currently loaded.
	for (var contentType in httpLanguages) {
		if (httpLanguages[contentType]) {
			var options = {};
			options[contentType] = {
				pattern: new RegExp('(content-type:\\s*' + contentType + '[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*', 'i'),
				lookbehind: true,
				inside: {
					rest: httpLanguages[contentType]
				}
			};
			Prism.languages.insertBefore('http', 'header-name', options);
		}
	}
	;
	Prism.languages.icon = {
		'comment': /#.*/,
		'string': {
			pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
			greedy: true
		},
		'number': /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
		'builtin-keyword': {
			pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
			alias: 'variable'
		},
		'directive': {
			pattern: /\$\w+/,
			alias: 'builtin'
		},
		'keyword': /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
		'function': /(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
		'operator': /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
		'punctuation': /[\[\](){},;]/
	};
	Prism.languages.inform7 = {
		'string': {
			pattern: /"[^"]*"/,
			inside: {
				'substitution': {
					pattern: /\[[^\]]+\]/,
					inside: {
						'delimiter': {
							pattern:/\[|\]/,
							alias: 'punctuation'
						}
						// See rest below
					}
				}
			}
		},
		'comment': {
			pattern: /\[[^\]]+\]/,
			greedy: true
		},
		'title': {
			pattern: /^[ \t]*(?:volume|book|part(?! of)|chapter|section|table)\b.+/im,
			alias: 'important'
		},
		'number': {
			pattern: /(^|[^-])(?:(?:\b|-)\d+(?:\.\d+)?(?:\^\d+)?\w*|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve))\b(?!-)/i,
			lookbehind: true
		},
		'verb': {
			pattern: /(^|[^-])\b(?:applying to|are|attacking|answering|asking|be(?:ing)?|burning|buying|called|carries|carry(?! out)|carrying|climbing|closing|conceal(?:s|ing)?|consulting|contain(?:s|ing)?|cutting|drinking|dropping|eating|enclos(?:es?|ing)|entering|examining|exiting|getting|giving|going|ha(?:ve|s|ving)|hold(?:s|ing)?|impl(?:y|ies)|incorporat(?:es?|ing)|inserting|is|jumping|kissing|listening|locking|looking|mean(?:s|ing)?|opening|provid(?:es?|ing)|pulling|pushing|putting|relat(?:es?|ing)|removing|searching|see(?:s|ing)?|setting|showing|singing|sleeping|smelling|squeezing|switching|support(?:s|ing)?|swearing|taking|tasting|telling|thinking|throwing|touching|turning|tying|unlock(?:s|ing)?|var(?:y|ies|ying)|waiting|waking|waving|wear(?:s|ing)?)\b(?!-)/i,
			lookbehind: true,
			alias: 'operator'
		},
		'keyword': {
			pattern: /(^|[^-])\b(?:after|before|carry out|check|continue the action|definition(?= *:)|do nothing|else|end (?:if|unless|the story)|every turn|if|include|instead(?: of)?|let|move|no|now|otherwise|repeat|report|resume the story|rule for|running through|say(?:ing)?|stop the action|test|try(?:ing)?|understand|unless|use|when|while|yes)\b(?!-)/i,
			lookbehind: true
		},
		'property': {
			pattern: /(^|[^-])\b(?:adjacent(?! to)|carried|closed|concealed|contained|dark|described|edible|empty|enclosed|enterable|even|female|fixed in place|full|handled|held|improper-named|incorporated|inedible|invisible|lighted|lit|lock(?:able|ed)|male|marked for listing|mentioned|negative|neuter|non-(?:empty|full|recurring)|odd|opaque|open(?:able)?|plural-named|portable|positive|privately-named|proper-named|provided|publically-named|pushable between rooms|recurring|related|rubbing|scenery|seen|singular-named|supported|swinging|switch(?:able|ed(?: on| off)?)|touch(?:able|ed)|transparent|unconcealed|undescribed|unlit|unlocked|unmarked for listing|unmentioned|unopenable|untouchable|unvisited|variable|visible|visited|wearable|worn)\b(?!-)/i,
			lookbehind: true,
			alias: 'symbol'
		},
		'position': {
			pattern: /(^|[^-])\b(?:above|adjacent to|back side of|below|between|down|east|everywhere|front side|here|in|inside(?: from)?|north(?:east|west)?|nowhere|on(?: top of)?|other side|outside(?: from)?|parts? of|regionally in|south(?:east|west)?|through|up|west|within)\b(?!-)/i,
			lookbehind: true,
			alias: 'keyword'
		},
		'type': {
			pattern: /(^|[^-])\b(?:actions?|activit(?:y|ies)|actors?|animals?|backdrops?|containers?|devices?|directions?|doors?|holders?|kinds?|lists?|m[ae]n|nobody|nothing|nouns?|numbers?|objects?|people|persons?|player(?:'s holdall)?|regions?|relations?|rooms?|rule(?:book)?s?|scenes?|someone|something|supporters?|tables?|texts?|things?|time|vehicles?|wom[ae]n)\b(?!-)/i,
			lookbehind: true,
			alias: 'variable'
		},
		'punctuation': /[.,:;(){}]/
	};

	Prism.languages.inform7['string'].inside['substitution'].inside.rest = Prism.util.clone(Prism.languages.inform7);
	// We don't want the remaining text in the substitution to be highlighted as the string.
	Prism.languages.inform7['string'].inside['substitution'].inside.rest.text = {
		pattern: /\S(?:\s*\S)*/,
		alias: 'comment'
	};
	Prism.languages.ini= {
		'comment': /^[ \t]*;.*$/m,
		'selector': /^[ \t]*\[.*?\]/m,
		'constant': /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
		'attr-value': {
			pattern: /=.*/,
			inside: {
				'punctuation': /^[=]/
			}
		}
	};
	Prism.languages.j = {
		'comment': /\bNB\..*/,
		'string': {
			pattern: /'(?:''|[^'\r\n])*'/,
			greedy: true
		},
		'keyword': /\b(?:(?:adverb|conjunction|CR|def|define|dyad|LF|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
		'verb': {
			// Negative look-ahead prevents bad highlighting
			// of ^: ;. =. =: !. !:
			pattern: /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_\/\\qsux]|_?\d):)/,
			alias: 'keyword'
		},
		'number': /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:[ejpx]|ad|ar)_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_(?!\.))/,
		'adverb': {
			pattern: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/,
			alias: 'builtin'
		},
		'operator': /[=a][.:]|_\./,
		'conjunction': {
			pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
			alias: 'variable'
		},
		'punctuation': /[()]/
	};
	Prism.languages.java = Prism.languages.extend('clike', {
		'keyword': /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
		'number': /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
		'operator': {
			pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
			lookbehind: true
		}
	});

	Prism.languages.insertBefore('java','function', {
		'annotation': {
			alias: 'punctuation',
			pattern: /(^|[^.])@\w+/,
			lookbehind: true
		}
	});

	Prism.languages.jolie = Prism.languages.extend('clike', {
		'keyword': /\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Protocol|Interfaces|RequestResponse|OneWay|type|interface|extender|throws|cset|csets|forward|Aggregates|Redirects|embedded|courier|execution|sequential|concurrent|single|scope|install|throw|comp|cH|default|global|linkIn|linkOut|synchronized|this|new|for|if|else|while|in|Jolie|Java|Javascript|nullProcess|spawn|constants|with|provide|until|exit|foreach|instanceof|over|service)\b/,
		'builtin': /\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/,
		'number': /\b\d*\.?\d+(?:e[+-]?\d+)?l?\b/i,
		'operator': /-[-=>]?|\+[+=]?|<[<=]?|[>=*!]=?|&&|\|\||[:?\/%^]/,
		'symbol': /[|;@]/,
		'punctuation': /[,.]/,
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		}
	});

	delete Prism.languages.jolie['class-name'];
	delete Prism.languages.jolie['function'];

	Prism.languages.insertBefore( 'jolie', 'keyword', {
		'function':
		{
			pattern: /((?:\b(?:outputPort|inputPort|in|service|courier)\b|@)\s*)\w+/,
			lookbehind: true
		},
		'aggregates': {
			pattern: /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/,
			lookbehind: true,
			inside: {
				'withExtension': {
					pattern: /\bwith\s+\w+/,
					inside: {
						'keyword' : /\bwith\b/
					}
				},
				'function': {
					pattern: /\w+/
				},
				'punctuation': {
					pattern: /,/
				}
			}
		},
		'redirects': {
			pattern: /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/,
			lookbehind: true,
			inside: {
				'punctuation': {
					pattern: /,/
				},
				'function': {
					pattern: /\w+/
				},
				'symbol': {
					pattern: /=>/
				}
			}
		}
	});
	Prism.languages.json = {
		'property': /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
		'string': {
			pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
			greedy: true
		},
		'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/,
		'punctuation': /[{}[\]);,]/,
		'operator': /:/g,
		'boolean': /\b(?:true|false)\b/i,
		'null': /\bnull\b/i
	};

	Prism.languages.jsonp = Prism.languages.json;

	Prism.languages.julia= {
		'comment': {
			pattern: /(^|[^\\])#.*/,
			lookbehind: true
		},
		'string': /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2/,
		'keyword' : /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|let|local|macro|module|print|println|quote|return|try|type|typealias|using|while)\b/,
		'boolean' : /\b(?:true|false)\b/,
		'number' : /\b-?(?:0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?\b/i,
		'operator': /[-+*^%÷&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/,
		'punctuation' : /[{}[\];(),.:]/
	};
	Prism.languages.keyman = {
		'comment': /\bc\s.*/i,
		'function': /\[\s*(?:(?:CTRL|SHIFT|ALT|LCTRL|RCTRL|LALT|RALT|CAPS|NCAPS)\s+)*(?:[TKU]_[\w?]+|".+?"|'.+?')\s*\]/i,  // virtual key
		'string': /("|').*?\1/,
		'bold': [   // header statements, system stores and variable system stores
			/&(?:baselayout|bitmap|capsononly|capsalwaysoff|shiftfreescaps|copyright|ethnologuecode|hotkey|includecodes|keyboardversion|kmw_embedcss|kmw_embedjs|kmw_helpfile|kmw_helptext|kmw_rtl|language|layer|layoutfile|message|mnemoniclayout|name|oldcharposmatching|platform|targets|version|visualkeyboard|windowslanguages)\b/i,
			/\b(?:bitmap|bitmaps|caps on only|caps always off|shift frees caps|copyright|hotkey|language|layout|message|name|version)\b/i
		],
		'keyword': /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|return|reset|save|set|store|use)\b/i,  // rule keywords
		'atrule': /\b(?:ansi|begin|unicode|group|using keys|match|nomatch)\b/i,   // structural keywords
		'number': /\b(?:U\+[\dA-F]+|d\d+|x[\da-f]+|\d+)\b/i, // U+####, x###, d### characters and numbers
		'operator': /[+>\\,()]/,
		'tag': /\$(?:keyman|kmfl|weaver|keymanweb|keymanonly):/i   // prefixes
	};
	(function (Prism) {
		Prism.languages.kotlin = Prism.languages.extend('clike', {
			'keyword': {
				// The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
				pattern: /(^|[^.])\b(?:abstract|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|else|enum|final|finally|for|fun|get|if|import|in|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|out|override|package|private|protected|public|reified|return|sealed|set|super|tailrec|this|throw|to|try|val|var|when|where|while)\b/,
				lookbehind: true
			},
			'function': [
				/\w+(?=\s*\()/,
				{
					pattern: /(\.)\w+(?=\s*\{)/,
					lookbehind: true
				}
			],
			'number': /\b(?:0[bx][\da-fA-F]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?[fFL]?)\b/,
			'operator': /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
		});

		delete Prism.languages.kotlin["class-name"];

		Prism.languages.insertBefore('kotlin', 'string', {
			'raw-string': {
				pattern: /("""|''')[\s\S]*?\1/,
				alias: 'string'
				// See interpolation below
			}
		});
		Prism.languages.insertBefore('kotlin', 'keyword', {
			'annotation': {
				pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
				alias: 'builtin'
			}
		});
		Prism.languages.insertBefore('kotlin', 'function', {
			'label': {
				pattern: /\w+@|@\w+/,
				alias: 'symbol'
			}
		});

		var interpolation = [
			{
				pattern: /\$\{[^}]+\}/,
				inside: {
					delimiter: {
						pattern: /^\$\{|\}$/,
						alias: 'variable'
					},
					rest: Prism.util.clone(Prism.languages.kotlin)
				}
			},
			{
				pattern: /\$\w+/,
				alias: 'variable'
			}
		];

		Prism.languages.kotlin['string'].inside = Prism.languages.kotlin['raw-string'].inside = {
			interpolation: interpolation
		};

	}(Prism));
	(function(Prism) {
		var funcPattern = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
		    insideEqu = {
			    'equation-command': {
				    pattern: funcPattern,
				    alias: 'regex'
			    }
		    };

		Prism.languages.latex = {
			'comment': /%.*/m,
			// the verbatim environment prints whitespace to the document
			'cdata':  {
				pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
				lookbehind: true
			},
			/*
			 * equations can be between $ $ or \( \) or \[ \]
			 * (all are multiline)
			 */
			'equation': [
				{
					pattern: /\$(?:\\[\s\S]|[^\\$])*\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
					inside: insideEqu,
					alias: 'string'
				},
				{
					pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
					lookbehind: true,
					inside: insideEqu,
					alias: 'string'
				}
			],
			/*
			 * arguments which are keywords or references are highlighted
			 * as keywords
			 */
			'keyword': {
				pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
				lookbehind: true
			},
			'url': {
				pattern: /(\\url\{)[^}]+(?=\})/,
				lookbehind: true
			},
			/*
			 * section or chapter headlines are highlighted as bold so that
			 * they stand out more
			 */
			'headline': {
				pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
				lookbehind: true,
				alias: 'class-name'
			},
			'function': {
				pattern: funcPattern,
				alias: 'selector'
			},
			'punctuation': /[[\]{}&]/
		};
	})(Prism);

	/* FIXME :
	 :extend() is not handled specifically : its highlighting is buggy.
	 Mixin usage must be inside a ruleset to be highlighted.
	 At-rules (e.g. import) containing interpolations are buggy.
	 Detached rulesets are highlighted as at-rules.
	 A comment before a mixin usage prevents the latter to be properly highlighted.
	 */

	Prism.languages.less = Prism.languages.extend('css', {
		'comment': [
			/\/\*[\s\S]*?\*\//,
			{
				pattern: /(^|[^\\])\/\/.*/,
				lookbehind: true
			}
		],
		'atrule': {
			pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
			inside: {
				'punctuation': /[:()]/
			}
		},
		// selectors and mixins are considered the same
		'selector': {
			pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
			inside: {
				// mixin parameters
				'variable': /@+[\w-]+/
			}
		},

		'property': /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
		'punctuation': /[{}();:,]/,
		'operator': /[+\-*\/]/
	});

	// Invert function and punctuation positions
	Prism.languages.insertBefore('less', 'punctuation', {
		'function': Prism.languages.less.function
	});

	Prism.languages.insertBefore('less', 'property', {
		'variable': [
			// Variable declaration (the colon must be consumed!)
			{
				pattern: /@[\w-]+\s*:/,
				inside: {
					"punctuation": /:/
				}
			},

			// Variable usage
			/@@?[\w-]+/
		],
		'mixin-usage': {
			pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
			lookbehind: true,
			alias: 'function'
		}
	});

	Prism.languages.livescript = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\])#.*/,
				lookbehind: true
			}
		],
		'interpolated-string': {
			/* Look-behind and look-ahead prevents wrong behavior of the greedy pattern
			* forcing it to match """-quoted string when it would otherwise match "-quoted first. */
			pattern: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/,
			lookbehind: true,
			greedy: true,
			inside: {
				'variable': {
					pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m,
					lookbehind: true
				},
				'interpolation': {
					pattern: /(^|[^\\])#\{[^}]+\}/m,
					lookbehind: true,
					inside: {
						'interpolation-punctuation': {
							pattern: /^#\{|\}$/,
							alias: 'variable'
						}
						// See rest below
					}
				},
				'string': /[\s\S]+/
			}
		},
		'string': [
			{
				pattern: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/,
				greedy: true
			},
			{
				pattern: /<\[[\s\S]*?\]>/,
				greedy: true
			},
			/\\[^\s,;\])}]+/
		],
		'regex': [
			{
				pattern: /\/\/(\[.+?]|\\.|(?!\/\/)[^\\])+\/\/[gimyu]{0,5}/,
				greedy: true,
				inside: {
					'comment': {
						pattern: /(^|[^\\])#.*/,
						lookbehind: true
					}
				}
			},
			{
				pattern: /\/(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}/,
				greedy: true
			}
		],
		'keyword': {
			pattern: /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m,
			lookbehind: true
		},
		'keyword-operator': {
			pattern: /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?:nt| not)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m,
			lookbehind: true,
			alias: 'operator'
		},
		'boolean': {
			pattern: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m,
			lookbehind: true
		},
		'argument': {
			// Don't match .&. nor &&
			pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m,
			lookbehind: true,
			alias: 'variable'
		},
		'number': /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
		'identifier': /[a-z_](?:-?[a-z]|[\d_])*/i,
		'operator': [
			// Spaced .
			{
				pattern: /( )\.(?= )/,
				lookbehind: true
			},
			// Full list, in order:
			// .= .~ .. ...
			// .&. .^. .<<. .>>. .>>>.
			// := :: ::=
			// &&
			// || |>
			// < << <<< <<<<
			// <- <-- <-! <--!
			// <~ <~~ <~! <~~!
			// <| <= <?
			// > >> >= >?
			// - -- -> -->
			// + ++
			// @ @@
			// % %%
			// * **
			// ! != !~=
			// !~> !~~>
			// !-> !-->
			// ~ ~> ~~> ~=
			// = ==
			// ^ ^^
			// / ?
			/\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?!?|[|=?])?|>[>=?]?|-(?:->?|>)?|\+\+?|@@?|%%?|\*\*?|!(?:~?=|--?>|~?~>)?|~(?:~?>|=)?|==?|\^\^?|[\/?]/
		],
		'punctuation': /[(){}\[\]|.,:;`]/
	};

	Prism.languages.livescript['interpolated-string'].inside['interpolation'].inside.rest = Prism.languages.livescript;
	Prism.languages.lolcode = {
		'comment': [
			/\bOBTW\s+[\s\S]*?\s+TLDR\b/,
			/\bBTW.+/
		],
		'string': {
			pattern: /"(?::.|[^"])*"/,
			inside: {
				'variable': /:\{[^}]+\}/,
				'symbol': [
					/:\([a-f\d]+\)/i,
					/:\[[^\]]+\]/,
					/:[)>o":]/
				]
			},
			greedy: true
		},
		'number': /(?:-|\b)\d*\.?\d+/,
		'symbol': {
			pattern: /(^|\s)(?:A )?(?:YARN|NUMBR|NUMBAR|TROOF|BUKKIT|NOOB)(?=\s|,|$)/,
			lookbehind: true,
			inside: {
				'keyword': /A(?=\s)/
			}
		},
		'label': {
			pattern: /((?:^|\s)(?:IM IN YR|IM OUTTA YR) )[a-zA-Z]\w*/,
			lookbehind: true,
			alias: 'string'
		},
		'function': {
			pattern: /((?:^|\s)(?:I IZ|HOW IZ I|IZ) )[a-zA-Z]\w*/,
			lookbehind: true
		},
		'keyword': [
			{
				pattern: /(^|\s)(?:O HAI IM|KTHX|HAI|KTHXBYE|I HAS A|ITZ(?: A)?|R|AN|MKAY|SMOOSH|MAEK|IS NOW(?: A)?|VISIBLE|GIMMEH|O RLY\?|YA RLY|NO WAI|OIC|MEBBE|WTF\?|OMG|OMGWTF|GTFO|IM IN YR|IM OUTTA YR|FOUND YR|YR|TIL|WILE|UPPIN|NERFIN|I IZ|HOW IZ I|IF U SAY SO|SRS|HAS A|LIEK(?: A)?|IZ)(?=\s|,|$)/,
				lookbehind: true
			},
			/'Z(?=\s|,|$)/
		],
		'boolean': {
			pattern: /(^|\s)(?:WIN|FAIL)(?=\s|,|$)/,
			lookbehind: true
		},
		'variable': {
			pattern: /(^|\s)IT(?=\s|,|$)/,
			lookbehind: true
		},
		'operator': {
			pattern: /(^|\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:SUM|DIFF|PRODUKT|QUOSHUNT|MOD|BIGGR|SMALLR|BOTH|EITHER|WON|ALL|ANY) OF)(?=\s|,|$)/,
			lookbehind: true
		},
		'punctuation': /\.{3}|…|,|!/
	};
	Prism.languages.lua = {
		'comment': /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
		// \z may be used to skip the following space
		'string': {
			pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
			greedy: true
		},
		'number': /\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
		'keyword': /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
		'function': /(?!\d)\w+(?=\s*(?:[({]))/,
		'operator': [
			/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
			{
				// Match ".." but don't break "..."
				pattern: /(^|[^.])\.\.(?!\.)/,
				lookbehind: true
			}
		],
		'punctuation': /[\[\](){},;]|\.+|:+/
	};
	Prism.languages.makefile = {
		'comment': {
			pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
			lookbehind: true
		},
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},

		// Built-in target names
		'builtin': /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,

		// Targets
		'symbol': {
			pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
			inside: {
				'variable': /\$+(?:[^(){}:#=\s]+|(?=[({]))/
			}
		},
		'variable': /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,

		'keyword': [
			// Directives
			/-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
			// Functions
			{
				pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
				lookbehind: true
			}
		],
		'operator': /(?:::|[?:+!])?=|[|@]/,
		'punctuation': /[:;(){}]/
	};
	Prism.languages.markdown = Prism.languages.extend('markup', {});
	Prism.languages.insertBefore('markdown', 'prolog', {
		'blockquote': {
			// > ...
			pattern: /^>(?:[\t ]*>)*/m,
			alias: 'punctuation'
		},
		'code': [
			{
				// Prefixed by 4 spaces or 1 tab
				pattern: /^(?: {4}|\t).+/m,
				alias: 'keyword'
			},
			{
				// `code`
				// ``code``
				pattern: /``.+?``|`[^`\n]+`/,
				alias: 'keyword'
			}
		],
		'title': [
			{
				// title 1
				// =======

				// title 2
				// -------
				pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
				alias: 'important',
				inside: {
					punctuation: /==+$|--+$/
				}
			},
			{
				// # title 1
				// ###### title 6
				pattern: /(^\s*)#+.+/m,
				lookbehind: true,
				alias: 'important',
				inside: {
					punctuation: /^#+|#+$/
				}
			}
		],
		'hr': {
			// ***
			// ---
			// * * *
			// -----------
			pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'list': {
			// * item
			// + item
			// - item
			// 1. item
			pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'url-reference': {
			// [id]: http://example.com "Optional title"
			// [id]: http://example.com 'Optional title'
			// [id]: http://example.com (Optional title)
			// [id]: <http://example.com> "Optional title"
			pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
			inside: {
				'variable': {
					pattern: /^(!?\[)[^\]]+/,
					lookbehind: true
				},
				'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
				'punctuation': /^[\[\]!:]|[<>]/
			},
			alias: 'url'
		},
		'bold': {
			// **strong**
			// __strong__

			// Allow only one line break
			pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
			lookbehind: true,
			inside: {
				'punctuation': /^\*\*|^__|\*\*$|__$/
			}
		},
		'italic': {
			// *em*
			// _em_

			// Allow only one line break
			pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
			lookbehind: true,
			inside: {
				'punctuation': /^[*_]|[*_]$/
			}
		},
		'url': {
			// [example](http://example.com "Optional title")
			// [example] [id]
			pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
			inside: {
				'variable': {
					pattern: /(!?\[)[^\]]+(?=\]$)/,
					lookbehind: true
				},
				'string': {
					pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
				}
			}
		}
	});

	Prism.languages.markdown['bold'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
	Prism.languages.markdown['italic'].inside['url'] = Prism.util.clone(Prism.languages.markdown['url']);
	Prism.languages.markdown['bold'].inside['italic'] = Prism.util.clone(Prism.languages.markdown['italic']);
	Prism.languages.markdown['italic'].inside['bold'] = Prism.util.clone(Prism.languages.markdown['bold']);
	Prism.languages.matlab = {
		'comment': [
			/%\{[\s\S]*?\}%/,
			/%.+/
		],
		'string': {
			pattern: /\B'(?:''|[^'\r\n])*'/,
			greedy: true
		},
		// FIXME We could handle imaginary numbers as a whole
		'number': /\b-?(?:\d*\.?\d+(?:[eE][+-]?\d+)?(?:[ij])?|[ij])\b/,
		'keyword': /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
		'function': /(?!\d)\w+(?=\s*\()/,
		'operator': /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
		'punctuation': /\.{3}|[.,;\[\](){}!]/
	};
	Prism.languages.mel = {
		'comment': /\/\/.*/,
		'code': {
			pattern: /`(?:\\.|[^\\`\r\n])*`/,
			greedy: true,
			alias: 'italic',
			inside: {
				'delimiter': {
					pattern: /^`|`$/,
					alias: 'punctuation'
				}
				// See rest below
			}
		},
		'string': {
			pattern: /"(?:\\.|[^\\"\r\n])*"/,
			greedy: true
		},
		'variable': /\$\w+/,
		'number': /(?:\b|-)(?:0x[\da-fA-F]+|\d+\.?\d*)/,
		'flag': {
			pattern: /-[^\d\W]\w*/,
			alias: 'operator'
		},
		'keyword': /\b(?:break|case|continue|default|do|else|float|for|global|if|in|int|matrix|proc|return|string|switch|vector|while)\b/,
		'function': /\w+(?=\()|\b(?:about|abs|addAttr|addAttributeEditorNodeHelp|addDynamic|addNewShelfTab|addPP|addPanelCategory|addPrefixToName|advanceToNextDrivenKey|affectedNet|affects|aimConstraint|air|alias|aliasAttr|align|alignCtx|alignCurve|alignSurface|allViewFit|ambientLight|angle|angleBetween|animCone|animCurveEditor|animDisplay|animView|annotate|appendStringArray|applicationName|applyAttrPreset|applyTake|arcLenDimContext|arcLengthDimension|arclen|arrayMapper|art3dPaintCtx|artAttrCtx|artAttrPaintVertexCtx|artAttrSkinPaintCtx|artAttrTool|artBuildPaintMenu|artFluidAttrCtx|artPuttyCtx|artSelectCtx|artSetPaintCtx|artUserPaintCtx|assignCommand|assignInputDevice|assignViewportFactories|attachCurve|attachDeviceAttr|attachSurface|attrColorSliderGrp|attrCompatibility|attrControlGrp|attrEnumOptionMenu|attrEnumOptionMenuGrp|attrFieldGrp|attrFieldSliderGrp|attrNavigationControlGrp|attrPresetEditWin|attributeExists|attributeInfo|attributeMenu|attributeQuery|autoKeyframe|autoPlace|bakeClip|bakeFluidShading|bakePartialHistory|bakeResults|bakeSimulation|basename|basenameEx|batchRender|bessel|bevel|bevelPlus|binMembership|bindSkin|blend2|blendShape|blendShapeEditor|blendShapePanel|blendTwoAttr|blindDataType|boneLattice|boundary|boxDollyCtx|boxZoomCtx|bufferCurve|buildBookmarkMenu|buildKeyframeMenu|button|buttonManip|CBG|cacheFile|cacheFileCombine|cacheFileMerge|cacheFileTrack|camera|cameraView|canCreateManip|canvas|capitalizeString|catch|catchQuiet|ceil|changeSubdivComponentDisplayLevel|changeSubdivRegion|channelBox|character|characterMap|characterOutlineEditor|characterize|chdir|checkBox|checkBoxGrp|checkDefaultRenderGlobals|choice|circle|circularFillet|clamp|clear|clearCache|clip|clipEditor|clipEditorCurrentTimeCtx|clipSchedule|clipSchedulerOutliner|clipTrimBefore|closeCurve|closeSurface|cluster|cmdFileOutput|cmdScrollFieldExecuter|cmdScrollFieldReporter|cmdShell|coarsenSubdivSelectionList|collision|color|colorAtPoint|colorEditor|colorIndex|colorIndexSliderGrp|colorSliderButtonGrp|colorSliderGrp|columnLayout|commandEcho|commandLine|commandPort|compactHairSystem|componentEditor|compositingInterop|computePolysetVolume|condition|cone|confirmDialog|connectAttr|connectControl|connectDynamic|connectJoint|connectionInfo|constrain|constrainValue|constructionHistory|container|containsMultibyte|contextInfo|control|convertFromOldLayers|convertIffToPsd|convertLightmap|convertSolidTx|convertTessellation|convertUnit|copyArray|copyFlexor|copyKey|copySkinWeights|cos|cpButton|cpCache|cpClothSet|cpCollision|cpConstraint|cpConvClothToMesh|cpForces|cpGetSolverAttr|cpPanel|cpProperty|cpRigidCollisionFilter|cpSeam|cpSetEdit|cpSetSolverAttr|cpSolver|cpSolverTypes|cpTool|cpUpdateClothUVs|createDisplayLayer|createDrawCtx|createEditor|createLayeredPsdFile|createMotionField|createNewShelf|createNode|createRenderLayer|createSubdivRegion|cross|crossProduct|ctxAbort|ctxCompletion|ctxEditMode|ctxTraverse|currentCtx|currentTime|currentTimeCtx|currentUnit|curve|curveAddPtCtx|curveCVCtx|curveEPCtx|curveEditorCtx|curveIntersect|curveMoveEPCtx|curveOnSurface|curveSketchCtx|cutKey|cycleCheck|cylinder|dagPose|date|defaultLightListCheckBox|defaultNavigation|defineDataServer|defineVirtualDevice|deformer|deg_to_rad|delete|deleteAttr|deleteShadingGroupsAndMaterials|deleteShelfTab|deleteUI|deleteUnusedBrushes|delrandstr|detachCurve|detachDeviceAttr|detachSurface|deviceEditor|devicePanel|dgInfo|dgdirty|dgeval|dgtimer|dimWhen|directKeyCtx|directionalLight|dirmap|dirname|disable|disconnectAttr|disconnectJoint|diskCache|displacementToPoly|displayAffected|displayColor|displayCull|displayLevelOfDetail|displayPref|displayRGBColor|displaySmoothness|displayStats|displayString|displaySurface|distanceDimContext|distanceDimension|doBlur|dolly|dollyCtx|dopeSheetEditor|dot|dotProduct|doubleProfileBirailSurface|drag|dragAttrContext|draggerContext|dropoffLocator|duplicate|duplicateCurve|duplicateSurface|dynCache|dynControl|dynExport|dynExpression|dynGlobals|dynPaintEditor|dynParticleCtx|dynPref|dynRelEdPanel|dynRelEditor|dynamicLoad|editAttrLimits|editDisplayLayerGlobals|editDisplayLayerMembers|editRenderLayerAdjustment|editRenderLayerGlobals|editRenderLayerMembers|editor|editorTemplate|effector|emit|emitter|enableDevice|encodeString|endString|endsWith|env|equivalent|equivalentTol|erf|error|eval|evalDeferred|evalEcho|event|exactWorldBoundingBox|exclusiveLightCheckBox|exec|executeForEachObject|exists|exp|expression|expressionEditorListen|extendCurve|extendSurface|extrude|fcheck|fclose|feof|fflush|fgetline|fgetword|file|fileBrowserDialog|fileDialog|fileExtension|fileInfo|filetest|filletCurve|filter|filterCurve|filterExpand|filterStudioImport|findAllIntersections|findAnimCurves|findKeyframe|findMenuItem|findRelatedSkinCluster|finder|firstParentOf|fitBspline|flexor|floatEq|floatField|floatFieldGrp|floatScrollBar|floatSlider|floatSlider2|floatSliderButtonGrp|floatSliderGrp|floor|flow|fluidCacheInfo|fluidEmitter|fluidVoxelInfo|flushUndo|fmod|fontDialog|fopen|formLayout|format|fprint|frameLayout|fread|freeFormFillet|frewind|fromNativePath|fwrite|gamma|gauss|geometryConstraint|getApplicationVersionAsFloat|getAttr|getClassification|getDefaultBrush|getFileList|getFluidAttr|getInputDeviceRange|getMayaPanelTypes|getModifiers|getPanel|getParticleAttr|getPluginResource|getenv|getpid|glRender|glRenderEditor|globalStitch|gmatch|goal|gotoBindPose|grabColor|gradientControl|gradientControlNoAttr|graphDollyCtx|graphSelectContext|graphTrackCtx|gravity|grid|gridLayout|group|groupObjectsByName|HfAddAttractorToAS|HfAssignAS|HfBuildEqualMap|HfBuildFurFiles|HfBuildFurImages|HfCancelAFR|HfConnectASToHF|HfCreateAttractor|HfDeleteAS|HfEditAS|HfPerformCreateAS|HfRemoveAttractorFromAS|HfSelectAttached|HfSelectAttractors|HfUnAssignAS|hardenPointCurve|hardware|hardwareRenderPanel|headsUpDisplay|headsUpMessage|help|helpLine|hermite|hide|hilite|hitTest|hotBox|hotkey|hotkeyCheck|hsv_to_rgb|hudButton|hudSlider|hudSliderButton|hwReflectionMap|hwRender|hwRenderLoad|hyperGraph|hyperPanel|hyperShade|hypot|iconTextButton|iconTextCheckBox|iconTextRadioButton|iconTextRadioCollection|iconTextScrollList|iconTextStaticLabel|ikHandle|ikHandleCtx|ikHandleDisplayScale|ikSolver|ikSplineHandleCtx|ikSystem|ikSystemInfo|ikfkDisplayMethod|illustratorCurves|image|imfPlugins|inheritTransform|insertJoint|insertJointCtx|insertKeyCtx|insertKnotCurve|insertKnotSurface|instance|instanceable|instancer|intField|intFieldGrp|intScrollBar|intSlider|intSliderGrp|interToUI|internalVar|intersect|iprEngine|isAnimCurve|isConnected|isDirty|isParentOf|isSameObject|isTrue|isValidObjectName|isValidString|isValidUiName|isolateSelect|itemFilter|itemFilterAttr|itemFilterRender|itemFilterType|joint|jointCluster|jointCtx|jointDisplayScale|jointLattice|keyTangent|keyframe|keyframeOutliner|keyframeRegionCurrentTimeCtx|keyframeRegionDirectKeyCtx|keyframeRegionDollyCtx|keyframeRegionInsertKeyCtx|keyframeRegionMoveKeyCtx|keyframeRegionScaleKeyCtx|keyframeRegionSelectKeyCtx|keyframeRegionSetKeyCtx|keyframeRegionTrackCtx|keyframeStats|lassoContext|lattice|latticeDeformKeyCtx|launch|launchImageEditor|layerButton|layeredShaderPort|layeredTexturePort|layout|layoutDialog|lightList|lightListEditor|lightListPanel|lightlink|lineIntersection|linearPrecision|linstep|listAnimatable|listAttr|listCameras|listConnections|listDeviceAttachments|listHistory|listInputDeviceAxes|listInputDeviceButtons|listInputDevices|listMenuAnnotation|listNodeTypes|listPanelCategories|listRelatives|listSets|listTransforms|listUnselected|listerEditor|loadFluid|loadNewShelf|loadPlugin|loadPluginLanguageResources|loadPrefObjects|localizedPanelLabel|lockNode|loft|log|longNameOf|lookThru|ls|lsThroughFilter|lsType|lsUI|Mayatomr|mag|makeIdentity|makeLive|makePaintable|makeRoll|makeSingleSurface|makeTubeOn|makebot|manipMoveContext|manipMoveLimitsCtx|manipOptions|manipRotateContext|manipRotateLimitsCtx|manipScaleContext|manipScaleLimitsCtx|marker|match|max|memory|menu|menuBarLayout|menuEditor|menuItem|menuItemToShelf|menuSet|menuSetPref|messageLine|min|minimizeApp|mirrorJoint|modelCurrentTimeCtx|modelEditor|modelPanel|mouse|movIn|movOut|move|moveIKtoFK|moveKeyCtx|moveVertexAlongDirection|multiProfileBirailSurface|mute|nParticle|nameCommand|nameField|namespace|namespaceInfo|newPanelItems|newton|nodeCast|nodeIconButton|nodeOutliner|nodePreset|nodeType|noise|nonLinear|normalConstraint|normalize|nurbsBoolean|nurbsCopyUVSet|nurbsCube|nurbsEditUV|nurbsPlane|nurbsSelect|nurbsSquare|nurbsToPoly|nurbsToPolygonsPref|nurbsToSubdiv|nurbsToSubdivPref|nurbsUVSet|nurbsViewDirectionVector|objExists|objectCenter|objectLayer|objectType|objectTypeUI|obsoleteProc|oceanNurbsPreviewPlane|offsetCurve|offsetCurveOnSurface|offsetSurface|openGLExtension|openMayaPref|optionMenu|optionMenuGrp|optionVar|orbit|orbitCtx|orientConstraint|outlinerEditor|outlinerPanel|overrideModifier|paintEffectsDisplay|pairBlend|palettePort|paneLayout|panel|panelConfiguration|panelHistory|paramDimContext|paramDimension|paramLocator|parent|parentConstraint|particle|particleExists|particleInstancer|particleRenderInfo|partition|pasteKey|pathAnimation|pause|pclose|percent|performanceOptions|pfxstrokes|pickWalk|picture|pixelMove|planarSrf|plane|play|playbackOptions|playblast|plugAttr|plugNode|pluginInfo|pluginResourceUtil|pointConstraint|pointCurveConstraint|pointLight|pointMatrixMult|pointOnCurve|pointOnSurface|pointPosition|poleVectorConstraint|polyAppend|polyAppendFacetCtx|polyAppendVertex|polyAutoProjection|polyAverageNormal|polyAverageVertex|polyBevel|polyBlendColor|polyBlindData|polyBoolOp|polyBridgeEdge|polyCacheMonitor|polyCheck|polyChipOff|polyClipboard|polyCloseBorder|polyCollapseEdge|polyCollapseFacet|polyColorBlindData|polyColorDel|polyColorPerVertex|polyColorSet|polyCompare|polyCone|polyCopyUV|polyCrease|polyCreaseCtx|polyCreateFacet|polyCreateFacetCtx|polyCube|polyCut|polyCutCtx|polyCylinder|polyCylindricalProjection|polyDelEdge|polyDelFacet|polyDelVertex|polyDuplicateAndConnect|polyDuplicateEdge|polyEditUV|polyEditUVShell|polyEvaluate|polyExtrudeEdge|polyExtrudeFacet|polyExtrudeVertex|polyFlipEdge|polyFlipUV|polyForceUV|polyGeoSampler|polyHelix|polyInfo|polyInstallAction|polyLayoutUV|polyListComponentConversion|polyMapCut|polyMapDel|polyMapSew|polyMapSewMove|polyMergeEdge|polyMergeEdgeCtx|polyMergeFacet|polyMergeFacetCtx|polyMergeUV|polyMergeVertex|polyMirrorFace|polyMoveEdge|polyMoveFacet|polyMoveFacetUV|polyMoveUV|polyMoveVertex|polyNormal|polyNormalPerVertex|polyNormalizeUV|polyOptUvs|polyOptions|polyOutput|polyPipe|polyPlanarProjection|polyPlane|polyPlatonicSolid|polyPoke|polyPrimitive|polyPrism|polyProjection|polyPyramid|polyQuad|polyQueryBlindData|polyReduce|polySelect|polySelectConstraint|polySelectConstraintMonitor|polySelectCtx|polySelectEditCtx|polySeparate|polySetToFaceNormal|polySewEdge|polyShortestPathCtx|polySmooth|polySoftEdge|polySphere|polySphericalProjection|polySplit|polySplitCtx|polySplitEdge|polySplitRing|polySplitVertex|polyStraightenUVBorder|polySubdivideEdge|polySubdivideFacet|polyToSubdiv|polyTorus|polyTransfer|polyTriangulate|polyUVSet|polyUnite|polyWedgeFace|popen|popupMenu|pose|pow|preloadRefEd|print|progressBar|progressWindow|projFileViewer|projectCurve|projectTangent|projectionContext|projectionManip|promptDialog|propModCtx|propMove|psdChannelOutliner|psdEditTextureFile|psdExport|psdTextureFile|putenv|pwd|python|querySubdiv|quit|rad_to_deg|radial|radioButton|radioButtonGrp|radioCollection|radioMenuItemCollection|rampColorPort|rand|randomizeFollicles|randstate|rangeControl|readTake|rebuildCurve|rebuildSurface|recordAttr|recordDevice|redo|reference|referenceEdit|referenceQuery|refineSubdivSelectionList|refresh|refreshAE|registerPluginResource|rehash|reloadImage|removeJoint|removeMultiInstance|removePanelCategory|rename|renameAttr|renameSelectionList|renameUI|render|renderGlobalsNode|renderInfo|renderLayerButton|renderLayerParent|renderLayerPostProcess|renderLayerUnparent|renderManip|renderPartition|renderQualityNode|renderSettings|renderThumbnailUpdate|renderWindowEditor|renderWindowSelectContext|renderer|reorder|reorderDeformers|requires|reroot|resampleFluid|resetAE|resetPfxToPolyCamera|resetTool|resolutionNode|retarget|reverseCurve|reverseSurface|revolve|rgb_to_hsv|rigidBody|rigidSolver|roll|rollCtx|rootOf|rot|rotate|rotationInterpolation|roundConstantRadius|rowColumnLayout|rowLayout|runTimeCommand|runup|sampleImage|saveAllShelves|saveAttrPreset|saveFluid|saveImage|saveInitialState|saveMenu|savePrefObjects|savePrefs|saveShelf|saveToolSettings|scale|scaleBrushBrightness|scaleComponents|scaleConstraint|scaleKey|scaleKeyCtx|sceneEditor|sceneUIReplacement|scmh|scriptCtx|scriptEditorInfo|scriptJob|scriptNode|scriptTable|scriptToShelf|scriptedPanel|scriptedPanelType|scrollField|scrollLayout|sculpt|searchPathArray|seed|selLoadSettings|select|selectContext|selectCurveCV|selectKey|selectKeyCtx|selectKeyframeRegionCtx|selectMode|selectPref|selectPriority|selectType|selectedNodes|selectionConnection|separator|setAttr|setAttrEnumResource|setAttrMapping|setAttrNiceNameResource|setConstraintRestPosition|setDefaultShadingGroup|setDrivenKeyframe|setDynamic|setEditCtx|setEditor|setFluidAttr|setFocus|setInfinity|setInputDeviceMapping|setKeyCtx|setKeyPath|setKeyframe|setKeyframeBlendshapeTargetWts|setMenuMode|setNodeNiceNameResource|setNodeTypeFlag|setParent|setParticleAttr|setPfxToPolyCamera|setPluginResource|setProject|setStampDensity|setStartupMessage|setState|setToolTo|setUITemplate|setXformManip|sets|shadingConnection|shadingGeometryRelCtx|shadingLightRelCtx|shadingNetworkCompare|shadingNode|shapeCompare|shelfButton|shelfLayout|shelfTabLayout|shellField|shortNameOf|showHelp|showHidden|showManipCtx|showSelectionInTitle|showShadingGroupAttrEditor|showWindow|sign|simplify|sin|singleProfileBirailSurface|size|sizeBytes|skinCluster|skinPercent|smoothCurve|smoothTangentSurface|smoothstep|snap2to2|snapKey|snapMode|snapTogetherCtx|snapshot|soft|softMod|softModCtx|sort|sound|soundControl|source|spaceLocator|sphere|sphrand|spotLight|spotLightPreviewPort|spreadSheetEditor|spring|sqrt|squareSurface|srtContext|stackTrace|startString|startsWith|stitchAndExplodeShell|stitchSurface|stitchSurfacePoints|strcmp|stringArrayCatenate|stringArrayContains|stringArrayCount|stringArrayInsertAtIndex|stringArrayIntersector|stringArrayRemove|stringArrayRemoveAtIndex|stringArrayRemoveDuplicates|stringArrayRemoveExact|stringArrayToString|stringToStringArray|strip|stripPrefixFromName|stroke|subdAutoProjection|subdCleanTopology|subdCollapse|subdDuplicateAndConnect|subdEditUV|subdListComponentConversion|subdMapCut|subdMapSewMove|subdMatchTopology|subdMirror|subdToBlind|subdToPoly|subdTransferUVsToCache|subdiv|subdivCrease|subdivDisplaySmoothness|substitute|substituteAllString|substituteGeometry|substring|surface|surfaceSampler|surfaceShaderList|swatchDisplayPort|switchTable|symbolButton|symbolCheckBox|sysFile|system|tabLayout|tan|tangentConstraint|texLatticeDeformContext|texManipContext|texMoveContext|texMoveUVShellContext|texRotateContext|texScaleContext|texSelectContext|texSelectShortestPathCtx|texSmudgeUVContext|texWinToolCtx|text|textCurves|textField|textFieldButtonGrp|textFieldGrp|textManip|textScrollList|textToShelf|textureDisplacePlane|textureHairColor|texturePlacementContext|textureWindow|threadCount|threePointArcCtx|timeControl|timePort|timerX|toNativePath|toggle|toggleAxis|toggleWindowVisibility|tokenize|tokenizeList|tolerance|tolower|toolButton|toolCollection|toolDropped|toolHasOptions|toolPropertyWindow|torus|toupper|trace|track|trackCtx|transferAttributes|transformCompare|transformLimits|translator|trim|trunc|truncateFluidCache|truncateHairCache|tumble|tumbleCtx|turbulence|twoPointArcCtx|uiRes|uiTemplate|unassignInputDevice|undo|undoInfo|ungroup|uniform|unit|unloadPlugin|untangleUV|untitledFileName|untrim|upAxis|updateAE|userCtx|uvLink|uvSnapshot|validateShelfName|vectorize|view2dToolCtx|viewCamera|viewClipPlane|viewFit|viewHeadOn|viewLookAt|viewManip|viewPlace|viewSet|visor|volumeAxis|vortex|waitCursor|warning|webBrowser|webBrowserPrefs|whatIs|window|windowPref|wire|wireContext|workspace|wrinkle|wrinkleContext|writeTake|xbmLangPathList|xform)\b/,
		
		'operator': [
			/\+[+=]?|-[-=]?|&&|\|\||[<>]=|[*\/!=]=?|[%^]/,
			{
				// We don't want to match <<
				pattern: /(^|[^<])<(?!<)/,
				lookbehind: true
			},
			{
				// We don't want to match >>
				pattern: /(^|[^>])>(?!>)/,
				lookbehind: true
			}
		],
		'punctuation': /<<|>>|[.,:;?\[\](){}]/
	};
	Prism.languages.mel['code'].inside.rest = Prism.util.clone(Prism.languages.mel);
	Prism.languages.mizar = {
		'comment': /::.+/,
		'keyword': /@proof\b|\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|asymmetry|attr|be|begin|being|by|canceled|case|cases|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|equals|end|environ|ex|exactly|existence|for|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|non|not|notations?|now|of|or|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|symmetry|synonym|take|that|the|then|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:y|ies)|when|where|with|wrt)\b/,
		'parameter': {
			pattern: /\$(?:10|\d)/,
			alias: 'variable'
		},
		'variable': /\w+(?=:)/,
		'number': /(?:\b|-)\d+\b/,
		'operator': /\.\.\.|->|&|\.?=/,
		'punctuation': /\(#|#\)|[,:;\[\](){}]/
	};
	Prism.languages.monkey = {
		'string': /"[^"\r\n]*"/,
		'comment': [
			/^#Rem\s+[\s\S]*?^#End/im,
			/'.+/
		],
		'preprocessor': {
			pattern: /(^[ \t]*)#.+/m,
			lookbehind: true,
			alias: 'comment'
		},
		'function': /\w+(?=\()/,
		'type-char': {
			pattern: /(\w)[?%#$]/,
			lookbehind: true,
			alias: 'variable'
		},
		'number': {
			pattern: /((?:\.\.)?)(?:(?:\b|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[\da-f]+)/i,
			lookbehind: true
		},
		'keyword': /\b(?:Void|Strict|Public|Private|Property|Bool|Int|Float|String|Array|Object|Continue|Exit|Import|Extern|New|Self|Super|Try|Catch|Eachin|True|False|Extends|Abstract|Final|Select|Case|Default|Const|Local|Global|Field|Method|Function|Class|End|If|Then|Else|ElseIf|EndIf|While|Wend|Repeat|Until|Forever|For|To|Step|Next|Return|Module|Interface|Implements|Inline|Throw|Null)\b/i,
		'operator': /\.\.|<[=>]?|>=?|:?=|(?:[+\-*\/&~|]|\b(?:Mod|Shl|Shr)\b)=?|\b(?:And|Not|Or)\b/i,
		'punctuation': /[.,:;()\[\]]/
	};
	Prism.languages.n4js = Prism.languages.extend('javascript', {
		// Keywords from N4JS language spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html
		'keyword': /\b(?:any|Array|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/
	});

	Prism.languages.insertBefore('n4js', 'function', {
		// Annotations in N4JS spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html#_annotations
		'annotation': {
			pattern: /@+\w+/,
			alias: 'operator'
		}
	});

	Prism.languages.n4jsd=Prism.languages.n4js;

	Prism.languages.nasm = {
		'comment': /;.*$/m,
		'string': /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
		'label': {
			pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,
			lookbehind: true,
			alias: 'function'
		},
		'keyword': [
			/\[?BITS (?:16|32|64)\]?/,
			{
				pattern: /(^\s*)section\s*[a-zA-Z.]+:?/im,
				lookbehind: true
			},
			/(?:extern|global)[^;\r\n]*/i,
			/(?:CPU|FLOAT|DEFAULT).*$/m
		],
		'register': {
			pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|sp|si|di)|[cdefgs]s)\b/i,
			alias: 'variable'
		},
		'number': /(?:\b|-|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|\d*\.?\d+(?:\.?e[+-]?\d+)?[dt]?)\b/i,
		'operator': /[\[\]*+\-\/%<>=&|$!]/
	};

	Prism.languages.nginx = Prism.languages.extend('clike', {
	        'comment': {
	                pattern: /(^|[^"{\\])#.*/,
	                lookbehind: true
	        },
	        'keyword': /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i
	});

	Prism.languages.insertBefore('nginx', 'keyword', {
	        'variable': /\$[a-z_]+/i
	});
	Prism.languages.nim = {
		'comment': /#.*/,
		// Double-quoted strings can be prefixed by an identifier (Generalized raw string literals)
		// Character literals are handled specifically to prevent issues with numeric type suffixes
		'string': {
			pattern: /(?:(?:\b(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+)?(?:"""[\s\S]*?"""(?!")|"(?:\\[\s\S]|""|[^"\\])*")|'(?:\\(?:\d+|x[\da-fA-F]{2}|.)|[^'])')/,
			greedy: true
		},
		// The negative look ahead prevents wrong highlighting of the .. operator
		'number': /\b(?:0[xXoObB][\da-fA-F_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:'?[iuf]\d*)?/,
		'keyword': /\b(?:addr|as|asm|atomic|bind|block|break|case|cast|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/,
		'function': {
			pattern: /(?:(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+|`[^`\r\n]+`)\*?(?:\[[^\]]+\])?(?=\s*\()/,
			inside: {
				'operator': /\*$/
			}
		},
		// We don't want to highlight operators inside backticks
		'ignore': {
			pattern: /`[^`\r\n]+`/,
			inside: {
				'punctuation': /`/
			}
		},
		'operator': {
			// Look behind and look ahead prevent wrong highlighting of punctuations [. .] {. .} (. .)
			// but allow the slice operator .. to take precedence over them
			// One can define his own operators in Nim so all combination of operators might be an operator.
			pattern: /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[=+\-*\/<>@$~&%|!?^:\\]|\.\.|\.(?![)}\]]))+|\b(?:and|div|of|or|in|is|isnot|mod|not|notin|shl|shr|xor)\b)/m,
			lookbehind: true
		},
		'punctuation': /[({\[]\.|\.[)}\]]|[`(){}\[\],:]/
	};
	Prism.languages.nix = {
		'comment': /\/\*[\s\S]*?\*\/|#.*/,
		'string': {
			pattern: /"(?:[^"\\]|\\[\s\S])*"|''(?:(?!'')[\s\S]|''(?:'|\\|\$\{))*''/,
			greedy: true,
			inside: {
				'interpolation': {
					// The lookbehind ensures the ${} is not preceded by \ or ''
					pattern: /(^|(?:^|(?!'').)[^\\])\$\{(?:[^}]|\{[^}]*\})*}/,
					lookbehind: true,
					inside: {
						'antiquotation': {
							pattern: /^\$(?=\{)/,
							alias: 'variable'
						}
						// See rest below
					}
				}
			}
		},
		'url': [
			/\b(?:[a-z]{3,7}:\/\/)[\w\-+%~\/.:#=?&]+/,
			{
				pattern: /([^\/])(?:[\w\-+%~.:#=?&]*(?!\/\/)[\w\-+%~\/.:#=?&])?(?!\/\/)\/[\w\-+%~\/.:#=?&]*/,
				lookbehind: true
			}
		],
		'antiquotation': {
			pattern: /\$(?=\{)/,
			alias: 'variable'
		},
		'number': /\b\d+\b/,
		'keyword': /\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/,
		'function': /\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLists|currentSystem|deepSeq|derivation|dirOf|div|elem(?:At)?|fetch(?:url|Tarball)|filter(?:Source)?|fromJSON|genList|getAttr|getEnv|hasAttr|hashString|head|import|intersectAttrs|is(?:Attrs|Bool|Function|Int|List|Null|String)|length|lessThan|listToAttrs|map|mul|parseDrvName|pathExists|read(?:Dir|File)|removeAttrs|replaceStrings|seq|sort|stringLength|sub(?:string)?|tail|throw|to(?:File|JSON|Path|String|XML)|trace|typeOf)\b|\bfoldl'\B/,
		'boolean': /\b(?:true|false)\b/,
		'operator': /[=!<>]=?|\+\+?|\|\||&&|\/\/|->?|[?@]/,
		'punctuation': /[{}()[\].,:;]/
	};

	Prism.languages.nix.string.inside.interpolation.inside.rest = Prism.util.clone(Prism.languages.nix);
	/**
	 * Original by Jan T. Sott (http://github.com/idleberg)
	 *
	 * Includes all commands and plug-ins shipped with NSIS 3.02
	 */
	 Prism.languages.nsis = {
		'comment': {
			pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|[#;].*)/,
			lookbehind: true
		},
		'string': {
			pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'keyword': {
			pattern: /(^\s*)(?:Abort|Add(?:BrandingImage|Size)|AdvSplash|Allow(?:RootDirInstall|SkipFiles)|AutoCloseWindow|Banner|BG(?:Font|Gradient|Image)|BrandingText|BringToFront|Call(?:InstDLL)?|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|Create(?:Directory|Font|ShortCut)|Delete(?:INISec|INIStr|RegKey|RegValue)?|Detail(?:Print|sButtonText)|Dialer|Dir(?:Text|Var|Verify)|EnableWindow|Enum(?:RegKey|RegValue)|Exch|Exec(?:Shell(?:Wait)?|Wait)?|ExpandEnvStrings|File(?:BufSize|Close|ErrorText|Open|Read|ReadByte|ReadUTF16LE|ReadWord|WriteUTF16LE|Seek|Write|WriteByte|WriteWord)?|Find(?:Close|First|Next|Window)|FlushINI|Get(?:CurInstType|CurrentAddress|DlgItem|DLLVersion(?:Local)?|ErrorLevel|FileTime(?:Local)?|FullPathName|Function(?:Address|End)?|InstDirError|LabelAddress|TempFileName)|Goto|HideWindow|Icon|If(?:Abort|Errors|FileExists|RebootFlag|Silent)|InitPluginsDir|Install(?:ButtonText|Colors|Dir(?:RegKey)?)|InstProgressFlags|Inst(?:Type(?:GetText|SetText)?)|Int(?:CmpU?|Fmt|Op)|IsWindow|Lang(?:DLL|String)|License(?:BkColor|Data|ForceSelection|LangString|Text)|LoadLanguageFile|LockWindow|Log(?:Set|Text)|Manifest(?:DPIAware|SupportedOS)|Math|MessageBox|MiscButtonText|Name|Nop|ns(?:Dialogs|Exec)|NSISdl|OutFile|Page(?:Callbacks)?|Pop|Push|Quit|Read(?:EnvStr|INIStr|RegDWORD|RegStr)|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|Section(?:End|GetFlags|GetInstTypes|GetSize|GetText|Group|In|SetFlags|SetInstTypes|SetSize|SetText)?|SendMessage|Set(?:AutoClose|BrandingImage|Compress|Compressor(?:DictSize)?|CtlColors|CurInstType|DatablockOptimize|DateSave|Details(?:Print|View)|ErrorLevel|Errors|FileAttributes|Font|OutPath|Overwrite|RebootFlag|RegView|ShellVarContext|Silent)|Show(?:InstDetails|UninstDetails|Window)|Silent(?:Install|UnInstall)|Sleep|SpaceTexts|Splash|StartMenu|Str(?:CmpS?|Cpy|Len)|SubCaption|System|Unicode|Uninstall(?:ButtonText|Caption|Icon|SubCaption|Text)|UninstPage|UnRegDLL|UserInfo|Var|VI(?:AddVersionKey|FileVersion|ProductVersion)|VPatch|WindowIcon|Write(?:INIStr|Reg(?:Bin|DWORD|ExpandStr|MultiStr|None|Str)|Uninstaller)|XPStyle)\b/m,
			lookbehind: true
		},
		'property': /\b(?:admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user|ARCHIVE|FILE_(ATTRIBUTE_ARCHIVE|ATTRIBUTE_NORMAL|ATTRIBUTE_OFFLINE|ATTRIBUTE_READONLY|ATTRIBUTE_SYSTEM|ATTRIBUTE_TEMPORARY)|HK((CR|CU|LM)(32|64)?|DD|PD|U)|HKEY_(CLASSES_ROOT|CURRENT_CONFIG|CURRENT_USER|DYN_DATA|LOCAL_MACHINE|PERFORMANCE_DATA|USERS)|ID(ABORT|CANCEL|IGNORE|NO|OK|RETRY|YES)|MB_(ABORTRETRYIGNORE|DEFBUTTON1|DEFBUTTON2|DEFBUTTON3|DEFBUTTON4|ICONEXCLAMATION|ICONINFORMATION|ICONQUESTION|ICONSTOP|OK|OKCANCEL|RETRYCANCEL|RIGHT|RTLREADING|SETFOREGROUND|TOPMOST|USERICON|YESNO)|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)\b/,
		'constant': /\${[\w\.:\^-]+}|\$\([\w\.:\^-]+\)/i,
		'variable': /\$\w+/i,
		'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
		'operator': /--?|\+\+?|<=?|>=?|==?=?|&&?|\|\|?|[?*\/~^%]/,
		'punctuation': /[{}[\];(),.:]/,
		'important': {
			pattern: /(^\s*)!(?:addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|pragma|searchparse|searchreplace|tempfile|undef|verbose|warning)\b/mi,
			lookbehind: true
		}
	};

	Prism.languages.objectivec = Prism.languages.extend('c', {
		'keyword': /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
		'string': /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		'operator': /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
	});

	Prism.languages.ocaml = {
		'comment': /\(\*[\s\S]*?\*\)/,
		'string': [
			{
				pattern: /"(?:\\.|[^\\\r\n"])*"/,
				greedy: true
			},
			{
				pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
				greedy: true
			}
		],
		'number': /\b-?(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
		'type': {
			pattern: /\B['`]\w*/,
			alias: 'variable'
		},
		'directive': {
			pattern: /\B#\w+/,
			alias: 'function'
		},
		'keyword': /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|prefix|private|rec|then|sig|struct|to|try|type|val|value|virtual|where|while|with)\b/,
		'boolean': /\b(?:false|true)\b/,
		// Custom operators are allowed
		'operator': /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lxor|lsl|lsr|mod|nor|or)\b/,
		'punctuation': /[(){}\[\]|_.,:;]/
	};
	(function (Prism) {
		/* OpenCL kernel language */
		Prism.languages.opencl = Prism.languages.extend('c', {
			// Extracted from the official specs (2.0) and http://streamcomputing.eu/downloads/?opencl.lang (opencl-keywords, opencl-types) and http://sourceforge.net/tracker/?func=detail&aid=2957794&group_id=95717&atid=612384 (Words2, partly Words3)
			'keyword': /\b(?:__attribute__|(?:__)?(?:constant|global|kernel|local|private|read_only|read_write|write_only)|_cl_(?:command_queue|context|device_id|event|kernel|mem|platform_id|program|sampler)|auto|break|case|cl_(?:image_format|mem_fence_flags)|clk_event_t|complex|const|continue|default|do|(?:float|double)(?:16(?:x(?:1|16|2|4|8))?|1x(?:1|16|2|4|8)|2(?:x(?:1|16|2|4|8))?|3|4(?:x(?:1|16|2|4|8))?|8(?:x(?:1|16|2|4|8))?)?|else|enum|event_t|extern|for|goto|(?:u?(?:char|short|int|long)|half|quad|bool)(?:2|3|4|8|16)?|if|image(?:1d_(?:array_|buffer_)?t|2d_(?:array_(?:depth_|msaa_depth_|msaa_)?|depth_|msaa_depth_|msaa_)?t|3d_t)|imaginary|inline|intptr_t|ndrange_t|packed|pipe|ptrdiff_t|queue_t|register|reserve_id_t|restrict|return|sampler_t|signed|size_t|sizeof|static|struct|switch|typedef|uintptr_t|uniform|union|unsigned|void|volatile|while)\b/,
			// Extracted from http://streamcomputing.eu/downloads/?opencl.lang (global-vars, opencl-dev)
			'function-opencl-kernel': {
				pattern: /\b(?:abs(?:_diff)?|a?(?:cos|sin)(?:h|pi)?|add_sat|aligned|all|and|any|async(?:_work_group_copy|_work_group_strided_copy)?|atan(?:2?(?:pi)?|h)?|atom_(?:add|and|cmpxchg|dec|inc|max|min|or|sub|xchg|xor)|barrier|bitselect|cbrt|ceil|clamp|clz|copies|copysign|cross|degrees|distance|dot|endian|erf|erfc|exp(?:2|10)?|expm1|fabs|fast_(?:distance|length|normalize)|fdim|floor|fma|fmax|fmin|fract|frexp|fro|from|get_(?:global_(?:id|offset|size)|group_id|image_(?:channel_data_type|channel_order|depth|dim|height|width)|local(?:_id|_size)|num_groups|work_dim)|hadd|(?:half|native)_(?:cos|divide|exp(?:2|10)?|log(?:2|10)?|powr|recip|r?sqrt|sin|tan)|hypot|ilogb|is(?:equal|finite|greater(?:equal)?|inf|less(?:equal|greater)?|nan|normal|notequal|(?:un)?ordered)|ldexp|length|lgamma|lgamma_r|log(?:b|1p|2|10)?|mad(?:24|_hi|_sat)?|max|mem(?:_fence)?|min|mix|modf|mul24|mul_hi|nan|nextafter|normalize|pow[nr]?|prefetch|radians|read_(?:image)(?:f|h|u?i)|read_mem_fence|remainder|remquo|reqd_work_group_size|rhadd|rint|rootn|rotate|round|rsqrt|select|shuffle2?|sign|signbit|sincos|smoothstep|sqrt|step|sub_sat|tan|tanh|tanpi|tgamma|to|trunc|upsample|vec_(?:step|type_hint)|v(?:load|store)(?:_half)?(?:2|3|4|8|16)?|v(?:loada_half|storea?(?:_half)?)(?:2|3|4|8|16)?(?:_(?:rte|rtn|rtp|rtz))?|wait_group_events|work_group_size_hint|write_image(?:f|h|u?i)|write_mem_fence)\b/,
				alias: 'function'
			},
			// Extracted from http://streamcomputing.eu/downloads/?opencl.lang (opencl-const)
			'constant-opencl-kernel': {
				pattern: /\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FILTER_(?:LINEAR|NEAREST)|(?:LOCAL|GLOBAL)_MEM_FENCE|NORMALIZED_COORDS_(?:FALSE|TRUE))|CL_(?:BGRA|(?:HALF_)?FLOAT|INTENSITY|LUMINANCE|A?R?G?B?[Ax]?|(?:(?:UN)?SIGNED|[US]NORM)_(?:INT(?:8|16|32))|UNORM_(?:INT_101010|SHORT_(?:555|565)))|(?:DBL|FLT)_(?:DIG|EPSILON|MANT_DIG|(?:MIN|MAX)(?:(?:_10)?_EXP)?)|FLT_RADIX|HUGE_VALF|INFINITY|(?:INT|LONG|SCHAR|SHRT|UCHAR|UINT|ULONG)_(?:MAX|MIN)|MAXFLOAT|M_(?:[12]_PI|2_SQRTPI|E|LN(?:2|10)|LOG(?:10|2)E?|PI[24]?|SQRT(?:1_2|2))|NAN)\b/,
				alias: 'constant'
			}
		});

		var attributes = {
			// Extracted from http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-types and opencl-host)
			'type-opencl-host': {
				pattern: /\b(?:cl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|build_status|channel_(?:order|type)|(?:u?(?:char|short|int|long)|float|double)(?:2|3|4|8|16)?|command_(?:queue(?:_info|_properties)?|type)|context(?:_info|_properties)?|device_(?:exec_capabilities|fp_config|id|info|local_mem_type|mem_cache_type|type)|(?:event|sampler)(?:_info)?|filter_mode|half|image_info|kernel(?:_info|_work_group_info)?|map_flags|mem(?:_flags|_info|_object_type)?|platform_(?:id|info)|profiling_info|program(?:_build_info|_info)?))\b/,
				alias: 'keyword'
			},
			'boolean-opencl-host': {
				pattern: /\bCL_(?:TRUE|FALSE)\b/,
				alias: 'boolean'
			},
			// Extracted from cl.h (2.0) and http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-const)
			'constant-opencl-host': {
				pattern: /\bCL_(?:A|ABGR|ADDRESS_(?:CLAMP(?:_TO_EDGE)?|MIRRORED_REPEAT|NONE|REPEAT)|ARGB|BGRA|BLOCKING|BUFFER_CREATE_TYPE_REGION|BUILD_(?:ERROR|IN_PROGRESS|NONE|PROGRAM_FAILURE|SUCCESS)|COMMAND_(?:ACQUIRE_GL_OBJECTS|BARRIER|COPY_(?:BUFFER(?:_RECT|_TO_IMAGE)?|IMAGE(?:_TO_BUFFER)?)|FILL_(?:BUFFER|IMAGE)|MAP(?:_BUFFER|_IMAGE)|MARKER|MIGRATE(?:_SVM)?_MEM_OBJECTS|NATIVE_KERNEL|NDRANGE_KERNEL|READ_(?:BUFFER(?:_RECT)?|IMAGE)|RELEASE_GL_OBJECTS|SVM_(?:FREE|MAP|MEMCPY|MEMFILL|UNMAP)|TASK|UNMAP_MEM_OBJECT|USER|WRITE_(?:BUFFER(?:_RECT)?|IMAGE))|COMPILER_NOT_AVAILABLE|COMPILE_PROGRAM_FAILURE|COMPLETE|CONTEXT_(?:DEVICES|INTEROP_USER_SYNC|NUM_DEVICES|PLATFORM|PROPERTIES|REFERENCE_COUNT)|DEPTH(?:_STENCIL)?|DEVICE_(?:ADDRESS_BITS|AFFINITY_DOMAIN_(?:L[1-4]_CACHE|NEXT_PARTITIONABLE|NUMA)|AVAILABLE|BUILT_IN_KERNELS|COMPILER_AVAILABLE|DOUBLE_FP_CONFIG|ENDIAN_LITTLE|ERROR_CORRECTION_SUPPORT|EXECUTION_CAPABILITIES|EXTENSIONS|GLOBAL_(?:MEM_(?:CACHELINE_SIZE|CACHE_SIZE|CACHE_TYPE|SIZE)|VARIABLE_PREFERRED_TOTAL_SIZE)|HOST_UNIFIED_MEMORY|IL_VERSION|IMAGE(?:2D_MAX_(?:HEIGHT|WIDTH)|3D_MAX_(?:DEPTH|HEIGHT|WIDTH)|_BASE_ADDRESS_ALIGNMENT|_MAX_ARRAY_SIZE|_MAX_BUFFER_SIZE|_PITCH_ALIGNMENT|_SUPPORT)|LINKER_AVAILABLE|LOCAL_MEM_SIZE|LOCAL_MEM_TYPE|MAX_(?:CLOCK_FREQUENCY|COMPUTE_UNITS|CONSTANT_ARGS|CONSTANT_BUFFER_SIZE|GLOBAL_VARIABLE_SIZE|MEM_ALLOC_SIZE|NUM_SUB_GROUPS|ON_DEVICE_(?:EVENTS|QUEUES)|PARAMETER_SIZE|PIPE_ARGS|READ_IMAGE_ARGS|READ_WRITE_IMAGE_ARGS|SAMPLERS|WORK_GROUP_SIZE|WORK_ITEM_DIMENSIONS|WORK_ITEM_SIZES|WRITE_IMAGE_ARGS)|MEM_BASE_ADDR_ALIGN|MIN_DATA_TYPE_ALIGN_SIZE|NAME|NATIVE_VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT)|NOT_(?:AVAILABLE|FOUND)|OPENCL_C_VERSION|PARENT_DEVICE|PARTITION_(?:AFFINITY_DOMAIN|BY_AFFINITY_DOMAIN|BY_COUNTS|BY_COUNTS_LIST_END|EQUALLY|FAILED|MAX_SUB_DEVICES|PROPERTIES|TYPE)|PIPE_MAX_(?:ACTIVE_RESERVATIONS|PACKET_SIZE)|PLATFORM|PREFERRED_(?:GLOBAL_ATOMIC_ALIGNMENT|INTEROP_USER_SYNC|LOCAL_ATOMIC_ALIGNMENT|PLATFORM_ATOMIC_ALIGNMENT|VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT))|PRINTF_BUFFER_SIZE|PROFILE|PROFILING_TIMER_RESOLUTION|QUEUE_(?:ON_(?:DEVICE_(?:MAX_SIZE|PREFERRED_SIZE|PROPERTIES)|HOST_PROPERTIES)|PROPERTIES)|REFERENCE_COUNT|SINGLE_FP_CONFIG|SUB_GROUP_INDEPENDENT_FORWARD_PROGRESS|SVM_(?:ATOMICS|CAPABILITIES|COARSE_GRAIN_BUFFER|FINE_GRAIN_BUFFER|FINE_GRAIN_SYSTEM)|TYPE(?:_ACCELERATOR|_ALL|_CPU|_CUSTOM|_DEFAULT|_GPU)?|VENDOR(?:_ID)?|VERSION)|DRIVER_VERSION|EVENT_(?:COMMAND_(?:EXECUTION_STATUS|QUEUE|TYPE)|CONTEXT|REFERENCE_COUNT)|EXEC_(?:KERNEL|NATIVE_KERNEL|STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST)|FILTER_(?:LINEAR|NEAREST)|FLOAT|FP_(?:CORRECTLY_ROUNDED_DIVIDE_SQRT|DENORM|FMA|INF_NAN|ROUND_TO_INF|ROUND_TO_NEAREST|ROUND_TO_ZERO|SOFT_FLOAT)|GLOBAL|HALF_FLOAT|IMAGE_(?:ARRAY_SIZE|BUFFER|DEPTH|ELEMENT_SIZE|FORMAT|FORMAT_MISMATCH|FORMAT_NOT_SUPPORTED|HEIGHT|NUM_MIP_LEVELS|NUM_SAMPLES|ROW_PITCH|SLICE_PITCH|WIDTH)|INTENSITY|INVALID_(?:ARG_INDEX|ARG_SIZE|ARG_VALUE|BINARY|BUFFER_SIZE|BUILD_OPTIONS|COMMAND_QUEUE|COMPILER_OPTIONS|CONTEXT|DEVICE|DEVICE_PARTITION_COUNT|DEVICE_QUEUE|DEVICE_TYPE|EVENT|EVENT_WAIT_LIST|GLOBAL_OFFSET|GLOBAL_WORK_SIZE|GL_OBJECT|HOST_PTR|IMAGE_DESCRIPTOR|IMAGE_FORMAT_DESCRIPTOR|IMAGE_SIZE|KERNEL|KERNEL_ARGS|KERNEL_DEFINITION|KERNEL_NAME|LINKER_OPTIONS|MEM_OBJECT|MIP_LEVEL|OPERATION|PIPE_SIZE|PLATFORM|PROGRAM|PROGRAM_EXECUTABLE|PROPERTY|QUEUE_PROPERTIES|SAMPLER|VALUE|WORK_DIMENSION|WORK_GROUP_SIZE|WORK_ITEM_SIZE)|KERNEL_(?:ARG_(?:ACCESS_(?:NONE|QUALIFIER|READ_ONLY|READ_WRITE|WRITE_ONLY)|ADDRESS_(?:CONSTANT|GLOBAL|LOCAL|PRIVATE|QUALIFIER)|INFO_NOT_AVAILABLE|NAME|TYPE_(?:CONST|NAME|NONE|PIPE|QUALIFIER|RESTRICT|VOLATILE))|ATTRIBUTES|COMPILE_NUM_SUB_GROUPS|COMPILE_WORK_GROUP_SIZE|CONTEXT|EXEC_INFO_SVM_FINE_GRAIN_SYSTEM|EXEC_INFO_SVM_PTRS|FUNCTION_NAME|GLOBAL_WORK_SIZE|LOCAL_MEM_SIZE|LOCAL_SIZE_FOR_SUB_GROUP_COUNT|MAX_NUM_SUB_GROUPS|MAX_SUB_GROUP_SIZE_FOR_NDRANGE|NUM_ARGS|PREFERRED_WORK_GROUP_SIZE_MULTIPLE|PRIVATE_MEM_SIZE|PROGRAM|REFERENCE_COUNT|SUB_GROUP_COUNT_FOR_NDRANGE|WORK_GROUP_SIZE)|LINKER_NOT_AVAILABLE|LINK_PROGRAM_FAILURE|LOCAL|LUMINANCE|MAP_(?:FAILURE|READ|WRITE|WRITE_INVALIDATE_REGION)|MEM_(?:ALLOC_HOST_PTR|ASSOCIATED_MEMOBJECT|CONTEXT|COPY_HOST_PTR|COPY_OVERLAP|FLAGS|HOST_NO_ACCESS|HOST_PTR|HOST_READ_ONLY|HOST_WRITE_ONLY|KERNEL_READ_AND_WRITE|MAP_COUNT|OBJECT_(?:ALLOCATION_FAILURE|BUFFER|IMAGE1D|IMAGE1D_ARRAY|IMAGE1D_BUFFER|IMAGE2D|IMAGE2D_ARRAY|IMAGE3D|PIPE)|OFFSET|READ_ONLY|READ_WRITE|REFERENCE_COUNT|SIZE|SVM_ATOMICS|SVM_FINE_GRAIN_BUFFER|TYPE|USES_SVM_POINTER|USE_HOST_PTR|WRITE_ONLY)|MIGRATE_MEM_OBJECT_(?:CONTENT_UNDEFINED|HOST)|MISALIGNED_SUB_BUFFER_OFFSET|NONE|NON_BLOCKING|OUT_OF_(?:HOST_MEMORY|RESOURCES)|PIPE_(?:MAX_PACKETS|PACKET_SIZE)|PLATFORM_(?:EXTENSIONS|HOST_TIMER_RESOLUTION|NAME|PROFILE|VENDOR|VERSION)|PROFILING_(?:COMMAND_(?:COMPLETE|END|QUEUED|START|SUBMIT)|INFO_NOT_AVAILABLE)|PROGRAM_(?:BINARIES|BINARY_SIZES|BINARY_TYPE(?:_COMPILED_OBJECT|_EXECUTABLE|_LIBRARY|_NONE)?|BUILD_(?:GLOBAL_VARIABLE_TOTAL_SIZE|LOG|OPTIONS|STATUS)|CONTEXT|DEVICES|IL|KERNEL_NAMES|NUM_DEVICES|NUM_KERNELS|REFERENCE_COUNT|SOURCE)|QUEUED|QUEUE_(?:CONTEXT|DEVICE|DEVICE_DEFAULT|ON_DEVICE|ON_DEVICE_DEFAULT|OUT_OF_ORDER_EXEC_MODE_ENABLE|PROFILING_ENABLE|PROPERTIES|REFERENCE_COUNT|SIZE)|R|RA|READ_(?:ONLY|WRITE)_CACHE|RG|RGB|RGBA|RGBx|RGx|RUNNING|Rx|SAMPLER_(?:ADDRESSING_MODE|CONTEXT|FILTER_MODE|LOD_MAX|LOD_MIN|MIP_FILTER_MODE|NORMALIZED_COORDS|REFERENCE_COUNT)|(?:UN)?SIGNED_INT(?:8|16|32)|SNORM_INT(?:8|16)|SUBMITTED|SUCCESS|UNORM_INT(?:16|24|8|_101010|_101010_2)|UNORM_SHORT_(?:555|565)|VERSION_(?:1_0|1_1|1_2|2_0|2_1)|sBGRA|sRGB|sRGBA|sRGBx)\b/,
				alias: 'constant'
			},
			// Extracted from cl.h (2.0) and http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-host)
			'function-opencl-host': {
				pattern: /\bcl(?:BuildProgram|CloneKernel|CompileProgram|Create(?:Buffer|CommandQueue(?:WithProperties)?|Context|ContextFromType|Image|Image2D|Image3D|Kernel|KernelsInProgram|Pipe|ProgramWith(?:Binary|BuiltInKernels|IL|Source)|Sampler|SamplerWithProperties|SubBuffer|SubDevices|UserEvent)|Enqueue(?:(?:Barrier|Marker)(?:WithWaitList)?|Copy(?:Buffer(?:Rect|ToImage)?|Image(?:ToBuffer)?)|(?:Fill|Map)(?:Buffer|Image)|MigrateMemObjects|NDRangeKernel|NativeKernel|(?:Read|Write)(?:Buffer(?:Rect)?|Image)|SVM(?:Free|Map|MemFill|Memcpy|MigrateMem|Unmap)|Task|UnmapMemObject|WaitForEvents)|Finish|Flush|Get(?:CommandQueueInfo|ContextInfo|Device(?:AndHostTimer|IDs|Info)|Event(?:Profiling)?Info|ExtensionFunctionAddress(?:ForPlatform)?|HostTimer|ImageInfo|Kernel(?:ArgInfo|Info|SubGroupInfo|WorkGroupInfo)|MemObjectInfo|PipeInfo|Platform(?:IDs|Info)|Program(?:Build)?Info|SamplerInfo|SupportedImageFormats)|LinkProgram|(?:Release|Retain)(?:CommandQueue|Context|Device|Event|Kernel|MemObject|Program|Sampler)|SVM(?:Alloc|Free)|Set(?:CommandQueueProperty|DefaultDeviceCommandQueue|EventCallback|Kernel(?:Arg(?:SVMPointer)?|ExecInfo)|Kernel|MemObjectDestructorCallback|UserEventStatus)|Unload(?:Platform)?Compiler|WaitForEvents)\b/,
				alias: 'function'
			}
		};

		/* OpenCL host API */
		Prism.languages.insertBefore('c', 'keyword', attributes);
		// Extracted from doxygen class list http://github.khronos.org/OpenCL-CLHPP/annotated.html
		attributes['type-opencl-host-c++'] = {
			pattern: /\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQueue|EnqueueArgs|Event|Image|Image1D|Image1DArray|Image1DBuffer|Image2D|Image2DArray|Image2DGL|Image3D|Image3DGL|ImageFormat|ImageGL|Kernel|KernelFunctor|LocalSpaceArg|Memory|NDRange|Pipe|Platform|Program|Sampler|SVMAllocator|SVMTraitAtomic|SVMTraitCoarse|SVMTraitFine|SVMTraitReadOnly|SVMTraitReadWrite|SVMTraitWriteOnly|UserEvent)\b/,
			alias: 'keyword'
		};
		// C++ includes everything from the OpenCL C host API plus the classes defined in cl2.h
		Prism.languages.insertBefore('cpp', 'keyword', attributes);
	}(Prism));

	Prism.languages.oz = {
		'comment': /\/\*[\s\S]*?\*\/|%.*/,
		'string': {
			pattern: /"(?:[^"\\]|\\[\s\S])*"/,
			greedy: true
		},
		'atom': {
			pattern: /'(?:[^'\\]|\\[\s\S])*'/,
			greedy: true,
			alias: 'builtin'
		},
		'keyword': /[$_]|\[\]|\b(?:at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|proc|prop|raise|require|self|skip|then|thread|true|try|unit)\b/,
		'function': [
			/[a-z][A-Za-z\d]*(?=\()/,
			{
				pattern: /(\{)[A-Z][A-Za-z\d]*/,
				lookbehind: true
			}
		],
		'number': /\b(?:0[bx][\da-f]+|\d+\.?\d*(?:e~?\d+)?\b)|&(?:[^\\]|\\(?:\d{3}|.))/i,
		'variable': /\b[A-Z][A-Za-z\d]*|`(?:[^`\\]|\\.)+`/,
		'attr-name': /\w+(?=:)/,
		'operator': /:(?:=|::?)|<[-:=]?|=(?:=|<?:?)|>=?:?|\\=:?|!!?|[|#+\-*\/,~^@]|\b(?:andthen|div|mod|orelse)\b/,
		'punctuation': /[\[\](){}.:;?]/
	};
	Prism.languages.parigp = {
		'comment': /\/\*[\s\S]*?\*\/|\\\\.*/,
		'string': {
			pattern: /"(?:[^"\\\r\n]|\\.)*"/,
			greedy: true
		},
		// PARI/GP does not care about white spaces at all
		// so let's process the keywords to build an appropriate regexp
		// (e.g. "b *r *e *a *k", etc.)
		'keyword': (function () {
			var keywords = [
				'breakpoint', 'break', 'dbg_down', 'dbg_err', 'dbg_up', 'dbg_x',
				'forcomposite', 'fordiv', 'forell', 'forpart', 'forprime',
				'forstep', 'forsubgroup', 'forvec', 'for', 'iferr', 'if',
				'local', 'my', 'next', 'return', 'until', 'while'
			];
			keywords = keywords.map(function (keyword) {
				return keyword.split('').join(' *');
			}).join('|');
			return RegExp('\\b(?:' + keywords + ')\\b');
		}()),
		'function': /\w[\w ]*?(?= *\()/,
		'number': {
			// The lookbehind and the negative lookahead prevent from breaking the .. operator
			pattern: /((?:\. *\. *)?)(?:\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *e *[+-]? *\d(?: *\d)*)?/i,
			lookbehind: true
		},
		'operator': /\. *\.|[*\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?:(?: *<)?(?: *=)?| *>)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||['#~^]/,
		'punctuation': /[\[\]{}().,:;|]/
	};
	Prism.languages.parser = Prism.languages.extend('markup', {
		'keyword': {
			pattern: /(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/,
			lookbehind: true
		},
		'variable': {
			pattern: /(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
			lookbehind: true,
			inside: {
				'punctuation': /\.|:+/
			}
		},
		'function': {
			pattern: /(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
			lookbehind: true,
			inside: {
				'keyword': {
					pattern: /(^@)(?:GET_|SET_)/,
					lookbehind: true
				},
				'punctuation': /\.|:+/
			}
		},
		'escape': {
			pattern: /\^(?:[$^;@()\[\]{}"':]|#[a-f\d]*)/i,
			alias: 'builtin'
		},
		'punctuation': /[\[\](){};]/
	});
	Prism.languages.insertBefore('parser', 'keyword', {
		'parser-comment': {
			pattern: /(\s)#.*/,
			lookbehind: true,
			alias: 'comment'
		},
		'expression': {
			// Allow for 3 levels of depth
			pattern: /(^|[^^])\((?:[^()]|\((?:[^()]|\((?:[^()])*\))*\))*\)/,
			greedy: true,
			lookbehind: true,
			inside: {
				'string': {
					pattern: /(^|[^^])(["'])(?:(?!\2)[^^]|\^[\s\S])*\2/,
					lookbehind: true
				},
				'keyword': Prism.languages.parser.keyword,
				'variable': Prism.languages.parser.variable,
				'function': Prism.languages.parser.function,
				'boolean': /\b(?:true|false)\b/,
				'number': /\b(?:0x[a-f\d]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/i,
				'escape': Prism.languages.parser.escape,
				'operator': /[~+*\/\\%]|!(?:\|\|?|=)?|&&?|\|\|?|==|<[<=]?|>[>=]?|-[fd]?|\b(?:def|eq|ge|gt|in|is|le|lt|ne)\b/,
				'punctuation': Prism.languages.parser.punctuation
			}
		}
	});
	Prism.languages.insertBefore('inside', 'punctuation', {
		'expression': Prism.languages.parser.expression,
		'keyword': Prism.languages.parser.keyword,
		'variable': Prism.languages.parser.variable,
		'function': Prism.languages.parser.function,
		'escape': Prism.languages.parser.escape,
		'parser-punctuation': {
			pattern: Prism.languages.parser.punctuation,
			alias: 'punctuation'
		}
	}, Prism.languages.parser['tag'].inside['attr-value']);
	// Based on Free Pascal

	/* TODO
		Support inline asm ?
	*/

	Prism.languages.pascal = {
		'comment': [
			/\(\*[\s\S]+?\*\)/,
			/\{[\s\S]+?\}/,
			/\/\/.*/
		],
		'string': {
			pattern: /(?:'(?:''|[^'\r\n])*'|#[&$%]?[a-f\d]+)+|\^[a-z]/i,
			greedy: true
		},
		'keyword': [
			{
				// Turbo Pascal
				pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
				lookbehind: true
			},
			{
				// Free Pascal
				pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i,
				lookbehind: true
			},
			{
				// Object Pascal
				pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
				lookbehind: true
			},
			{
				// Modifiers
				pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
				lookbehind: true
			}
		],
		'number': [
			// Hexadecimal, octal and binary
			/[+-]?(?:[&%]\d+|\$[a-f\d]+)/i,
			// Decimal
			/([+-]|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?/i
		],
		'operator': [
			/\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i,
			{
				pattern: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/,
				lookbehind: true
			}
		],
		'punctuation': /\(\.|\.\)|[()\[\]:;,.]/
	};
	Prism.languages.perl = {
		'comment': [
			{
				// POD
				pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\$])#.*/,
				lookbehind: true
			}
		],
		// TODO Could be nice to handle Heredoc too.
		'string': [
			// q/.../
			{
				pattern: /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
				greedy: true
			},
		
			// q a...a
			{
				pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
				greedy: true
			},
		
			// q(...)
			{
				pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/,
				greedy: true
			},
		
			// q{...}
			{
				pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/,
				greedy: true
			},
		
			// q[...]
			{
				pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/,
				greedy: true
			},
		
			// q<...>
			{
				pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/,
				greedy: true
			},

			// "...", `...`
			{
				pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,
				greedy: true
			},

			// '...'
			// FIXME Multi-line single-quoted strings are not supported as they would break variables containing '
			{
				pattern: /'(?:[^'\\\r\n]|\\.)*'/,
				greedy: true
			}
		],
		'regex': [
			// m/.../
			{
				pattern: /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
				greedy: true
			},
		
			// m a...a
			{
				pattern: /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
				greedy: true
			},
		
			// m(...)
			{
				pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
				greedy: true
			},
		
			// m{...}
			{
				pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
				greedy: true
			},
		
			// m[...]
			{
				pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
				greedy: true
			},
		
			// m<...>
			{
				pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
				greedy: true
			},

			// The lookbehinds prevent -s from breaking
			// FIXME We don't handle change of separator like s(...)[...]
			// s/.../.../
			{
				pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
				lookbehind: true,
				greedy: true
			},
		
			// s a...a...a
			{
				pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
				lookbehind: true,
				greedy: true
			},
		
			// s(...)(...)
			{
				pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
				lookbehind: true,
				greedy: true
			},
		
			// s{...}{...}
			{
				pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
				lookbehind: true,
				greedy: true
			},
		
			// s[...][...]
			{
				pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
				lookbehind: true,
				greedy: true
			},
		
			// s<...><...>
			{
				pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
				lookbehind: true,
				greedy: true
			},
		
			// /.../
			// The look-ahead tries to prevent two divisions on
			// the same line from being highlighted as regex.
			// This does not support multi-line regex.
			{
				pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
				greedy: true
			}
		],

		// FIXME Not sure about the handling of ::, ', and #
		'variable': [
			// ${^POSTMATCH}
			/[&*$@%]\{\^[A-Z]+\}/,
			// $^V
			/[&*$@%]\^[A-Z_]/,
			// ${...}
			/[&*$@%]#?(?=\{)/,
			// $foo
			/[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
			// $1
			/[&*$@%]\d+/,
			// $_, @_, %!
			// The negative lookahead prevents from breaking the %= operator
			/(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/
		],
		'filehandle': {
			// <>, <FOO>, _
			pattern: /<(?![<=])\S*>|\b_\b/,
			alias: 'symbol'
		},
		'vstring': {
			// v1.2, 1.2.3
			pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
			alias: 'string'
		},
		'function': {
			pattern: /sub [a-z0-9_]+/i,
			inside: {
				keyword: /sub/
			}
		},
		'keyword': /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
		'number': /\b-?(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
		'operator': /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
		'punctuation': /[{}[\];(),:]/
	};

	/**
	 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
	 * Modified by Miles Johnson: http://milesj.me
	 *
	 * Supports the following:
	 * 		- Extends clike syntax
	 * 		- Support for PHP 5.3+ (namespaces, traits, generators, etc)
	 * 		- Smarter constant and function matching
	 *
	 * Adds the following new token classes:
	 * 		constant, delimiter, variable, function, package
	 */

	Prism.languages.php = Prism.languages.extend('clike', {
		'keyword': /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
		'constant': /\b[A-Z0-9_]{2,}\b/,
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: true
		}
	});

	// Shell-like comments are matched after strings, because they are less
	// common than strings containing hashes...
	Prism.languages.insertBefore('php', 'class-name', {
		'shell-comment': {
			pattern: /(^|[^\\])#.*/,
			lookbehind: true,
			alias: 'comment'
		}
	});

	Prism.languages.insertBefore('php', 'keyword', {
		'delimiter': {
			pattern: /\?>|<\?(?:php|=)?/i,
			alias: 'important'
		},
		'variable': /\$\w+\b/i,
		'package': {
			pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
			lookbehind: true,
			inside: {
				punctuation: /\\/
			}
		}
	});

	// Must be defined after the function pattern
	Prism.languages.insertBefore('php', 'operator', {
		'property': {
			pattern: /(->)[\w]+/,
			lookbehind: true
		}
	});

	// Add HTML support if the markup language exists
	if (Prism.languages.markup) {

		// Tokenize all inline PHP blocks that are wrapped in <?php ?>
		// This allows for easy PHP + markup highlighting
		Prism.hooks.add('before-highlight', function(env) {
			if (env.language !== 'php' || !/(?:<\?php|<\?)/ig.test(env.code)) {
				return;
			}

			env.tokenStack = [];

			env.backupCode = env.code;
			env.code = env.code.replace(/(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/ig, function(match) {
				var i = env.tokenStack.length;
				// Check for existing strings
				while (env.backupCode.indexOf('___PHP' + i + '___') !== -1)
					++i;

				// Create a sparse array
				env.tokenStack[i] = match;

				return '___PHP' + i + '___';
			});

			// Switch the grammar to markup
			env.grammar = Prism.languages.markup;
		});

		// Restore env.code for other plugins (e.g. line-numbers)
		Prism.hooks.add('before-insert', function(env) {
			if (env.language === 'php' && env.backupCode) {
				env.code = env.backupCode;
				delete env.backupCode;
			}
		});

		// Re-insert the tokens after highlighting
		Prism.hooks.add('after-highlight', function(env) {
			if (env.language !== 'php' || !env.tokenStack) {
				return;
			}

			// Switch the grammar back
			env.grammar = Prism.languages.php;

			for (var i = 0, keys = Object.keys(env.tokenStack); i < keys.length; ++i) {
				var k = keys[i];
				var t = env.tokenStack[k];

				// The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
				env.highlightedCode = env.highlightedCode.replace('___PHP' + k + '___',
						"<span class=\"token php language-php\">" +
						Prism.highlight(t, env.grammar, 'php').replace(/\$/g, '$$$$') +
						"</span>");
			}

			env.element.innerHTML = env.highlightedCode;
		});
	}
	;
	Prism.languages.insertBefore('php', 'variable', {
		'this': /\$this\b/,
		'global': /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
		'scope': {
			pattern: /\b[\w\\]+::/,
			inside: {
				keyword: /static|self|parent/,
				punctuation: /::|\\/
			}
		}
	});
	Prism.languages.powershell = {
		'comment': [
			{
				pattern: /(^|[^`])<#[\s\S]*?#>/,
				lookbehind: true
			},
			{
				pattern: /(^|[^`])#.*/,
				lookbehind: true
			}
		],
		'string': [
			{
				pattern: /"(?:`[\s\S]|[^`"])*"/,
				greedy: true,
				inside: {
					'function': {
						pattern: /[^`]\$\(.*?\)/,
						// Populated at end of file
						inside: {}
					}
				}
			},
			{
				pattern: /'(?:[^']|'')*'/,
				greedy: true
			}
		],
		// Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
		'namespace': /\[[a-z][\s\S]*?\]/i,
		'boolean': /\$(?:true|false)\b/i,
		'variable': /\$\w+\b/i,
		// Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
		// Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
		// Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
		'function': [
			/\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i,
			/\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
		],
		// per http://technet.microsoft.com/en-us/library/hh847744.aspx
		'keyword': /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
		'operator': {
			pattern: /(\W?)(?:!|-(eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
			lookbehind: true
		},
		'punctuation': /[|{}[\];(),.]/
	};

	// Variable interpolation inside strings, and nested expressions
	Prism.languages.powershell.string[0].inside.boolean = Prism.languages.powershell.boolean;
	Prism.languages.powershell.string[0].inside.variable = Prism.languages.powershell.variable;
	Prism.languages.powershell.string[0].inside.function.inside = Prism.util.clone(Prism.languages.powershell);

	Prism.languages.processing = Prism.languages.extend('clike', {
		'keyword': /\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
		'operator': /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/
	});
	Prism.languages.insertBefore('processing', 'number', {
		// Special case: XML is a type
		'constant': /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
		'type': {
			pattern: /\b(?:boolean|byte|char|color|double|float|int|XML|[A-Z]\w*)\b/,
			alias: 'variable'
		}
	});

	// Spaces are allowed between function name and parenthesis
	Prism.languages.processing['function'].pattern = /\w+(?=\s*\()/;

	// Class-names is not styled by default
	Prism.languages.processing['class-name'].alias = 'variable';
	Prism.languages.prolog = {
		// Syntax depends on the implementation
		'comment': [
			/%.+/,
			/\/\*[\s\S]*?\*\//
		],
		// Depending on the implementation, strings may allow escaped newlines and quote-escape
		'string': {
			pattern: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'builtin': /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
		'variable': /\b[A-Z_]\w*/,
		// FIXME: Should we list all null-ary predicates (not followed by a parenthesis) like halt, trace, etc.?
		'function': /\b[a-z]\w*(?:(?=\()|\/\d+)/,
		'number': /\b\d+\.?\d*/,
		// Custom operators are allowed
		'operator': /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
		'punctuation': /[(){}\[\],]/
	};
	Prism.languages.properties = {
		'comment': /^[ \t]*[#!].*$/m,
		'attr-value': {
			pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
			lookbehind: true
		},
		'attr-name': /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m,
		'punctuation': /[=:]/
	};
	Prism.languages.protobuf = Prism.languages.extend('clike', {
		keyword: /\b(?:package|import|message|enum)\b/,
		builtin: /\b(?:required|repeated|optional|reserved)\b/,
		primitive: {
			pattern: /\b(?:double|float|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|bool|string|bytes)\b/,
			alias: 'symbol'
		}
	});

	(function(Prism) {
		// TODO:
		// - Add CSS highlighting inside <style> tags
		// - Add support for multi-line code blocks
		// - Add support for interpolation #{} and !{}
		// - Add support for tag interpolation #[]
		// - Add explicit support for plain text using |
		// - Add support for markup embedded in plain text

		Prism.languages.pug = {

			// Multiline stuff should appear before the rest

			// This handles both single-line and multi-line comments
			'comment': {
				pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
				lookbehind: true
			},

			// All the tag-related part is in lookbehind
			// so that it can be highlighted by the "tag" pattern
			'multiline-script': {
				pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
				lookbehind: true,
				inside: {
					rest: Prism.languages.javascript
				}
			},

			// See at the end of the file for known filters
			'filter': {
				pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
				lookbehind: true,
				inside: {
					'filter-name': {
						pattern: /^:[\w-]+/,
						alias: 'variable'
					}
				}
			},

			'multiline-plain-text': {
				pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
				lookbehind: true
			},
			'markup': {
				pattern: /(^[\t ]*)<.+/m,
				lookbehind: true,
				inside: {
					rest: Prism.languages.markup
				}
			},
			'doctype': {
				pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/,
				lookbehind: true
			},

			// This handle all conditional and loop keywords
			'flow-control': {
				pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
				lookbehind: true,
				inside: {
					'each': {
						pattern: /^each .+? in\b/,
						inside: {
							'keyword': /\b(?:each|in)\b/,
							'punctuation': /,/
						}
					},
					'branch': {
						pattern: /^(?:if|unless|else|case|when|default|while)\b/,
						alias: 'keyword'
					},
					rest: Prism.languages.javascript
				}
			},
			'keyword': {
				pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
				lookbehind: true
			},
			'mixin': [
				// Declaration
				{
					pattern: /(^[\t ]*)mixin .+/m,
					lookbehind: true,
					inside: {
						'keyword': /^mixin/,
						'function': /\w+(?=\s*\(|\s*$)/,
						'punctuation': /[(),.]/
					}
				},
				// Usage
				{
					pattern: /(^[\t ]*)\+.+/m,
					lookbehind: true,
					inside: {
						'name': {
							pattern: /^\+\w+/,
							alias: 'function'
						},
						'rest': Prism.languages.javascript
					}
				}
			],
			'script': {
				pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
				lookbehind: true,
				inside: {
					rest: Prism.languages.javascript
				}
			},

			'plain-text': {
				pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
				lookbehind: true
			},
			'tag': {
				pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
				lookbehind: true,
				inside: {
					'attributes': [
						{
							pattern: /&[^(]+\([^)]+\)/,
							inside: {
								rest: Prism.languages.javascript
							}
						},
						{
							pattern: /\([^)]+\)/,
							inside: {
								'attr-value': {
									pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
									lookbehind: true,
									inside: {
										rest: Prism.languages.javascript
									}
								},
								'attr-name': /[\w-]+(?=\s*!?=|\s*[,)])/,
								'punctuation': /[!=(),]+/
							}
						}
					],
					'punctuation': /:/
				}
			},
			'code': [
				{
					pattern: /(^[\t ]*(?:-|!?=)).+/m,
					lookbehind: true,
					inside: {
						rest: Prism.languages.javascript
					}
				}
			],
			'punctuation': /[.\-!=|]+/
		};

		var filter_pattern = '(^([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+';

		// Non exhaustive list of available filters and associated languages
		var filters = [
			{filter:'atpl',language:'twig'},
			{filter:'coffee',language:'coffeescript'},
			'ejs',
			'handlebars',
			'hogan',
			'less',
			'livescript',
			'markdown',
			'mustache',
			'plates',
			{filter:'sass',language:'scss'},
			'stylus',
			'swig'

		];
		var all_filters = {};
		for (var i = 0, l = filters.length; i < l; i++) {
			var filter = filters[i];
			filter = typeof filter === 'string' ? {filter: filter, language: filter} : filter;
			if (Prism.languages[filter.language]) {
				all_filters['filter-' + filter.filter] = {
					pattern: RegExp(filter_pattern.replace('{{filter_name}}', filter.filter), 'm'),
					lookbehind: true,
					inside: {
						'filter-name': {
							pattern: /^:[\w-]+/,
							alias: 'variable'
						},
						rest: Prism.languages[filter.language]
					}
				}
			}
		}

		Prism.languages.insertBefore('pug', 'filter', all_filters);

	}(Prism));

	(function (Prism) {
		Prism.languages.puppet = {
			'heredoc': [
				// Matches the content of a quoted heredoc string (subject to interpolation)
				{
					pattern: /(@\("([^"\r\n\/):]+)"(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t]*\|?[ \t]*-?[ \t]*\2/,
					lookbehind: true,
					alias: 'string',
					inside: {
						// Matches the end tag
						'punctuation': /(?=\S).*\S(?= *$)/
						// See interpolation below
					}
				},
				// Matches the content of an unquoted heredoc string (no interpolation)
				{
					pattern: /(@\(([^"\r\n\/):]+)(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t]*\|?[ \t]*-?[ \t]*\2/,
					lookbehind: true,
					alias: 'string',
					inside: {
						// Matches the end tag
						'punctuation': /(?=\S).*\S(?= *$)/
					}
				},
				// Matches the start tag of heredoc strings
				{
					pattern: /@\("?(?:[^"\r\n\/):]+)"?(?:\/[nrts$uL]*)?\)/,
					alias: 'string',
					inside: {
						'punctuation': {
							pattern: /(\().+?(?=\))/,
							lookbehind: true
						}
					}
				}
			],
			'multiline-comment': {
				pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
				lookbehind: true,
				alias: 'comment'
			},
			'regex': {
				// Must be prefixed with the keyword "node" or a non-word char
				pattern: /((?:\bnode\s+|[~=\(\[\{,]\s*|[=+]>\s*|^\s*))\/(?:[^\/\\]|\\[\s\S])+\/(?:[imx]+\b|\B)/,
				lookbehind: true,
				inside: {
					// Extended regexes must have the x flag. They can contain single-line comments.
					'extended-regex': {
						pattern: /^\/(?:[^\/\\]|\\[\s\S])+\/[im]*x[im]*$/,
						inside: {
							'comment': /#.*/
						}
					}
				}
			},
			'comment': {
				pattern: /(^|[^\\])#.*/,
				lookbehind: true
			},
			'string': {
				// Allow for one nested level of double quotes inside interpolation
				pattern: /(["'])(?:\$\{(?:[^'"}]|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}|(?!\1)[^\\]|\\[\s\S])*\1/,
				inside: {
					'double-quoted': {
						pattern: /^"[\s\S]*"$/,
						inside: {
							// See interpolation below
						}
					}
				}
			},
			'variable': {
				pattern: /\$(?:::)?\w+(?:::\w+)*/,
				inside: {
					'punctuation': /::/
				}
			},
			'attr-name': /(?:\w+|\*)(?=\s*=>)/,
			'function': [
				{
					pattern: /(\.)(?!\d)\w+/,
					lookbehind: true
				},
				/\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/
			],
			'number': /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i,
			'boolean': /\b(?:true|false)\b/,
			// Includes words reserved for future use
			'keyword': /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/,
			'datatype': {
				pattern: /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/,
				alias: 'symbol'
			},
			'operator': /=[=~>]?|![=~]?|<(?:<\|?|[=~|-])?|>[>=]?|->?|~>|\|>?>?|[*\/%+?]|\b(?:and|in|or)\b/,
			'punctuation': /[\[\]{}().,;]|:+/
		};

		var interpolation = [
			{
				// Allow for one nested level of braces inside interpolation
				pattern: /(^|[^\\])\$\{(?:[^'"{}]|\{[^}]*\}|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}/,
				lookbehind: true,
				inside: {
					'short-variable': {
						// Negative look-ahead prevent wrong highlighting of functions
						pattern: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/,
						lookbehind: true,
						alias: 'variable',
						inside: {
							'punctuation': /::/
						}
					},
					'delimiter': {
						pattern: /^\$/,
						alias: 'variable'
					},
					rest: Prism.util.clone(Prism.languages.puppet)
				}
			},
			{
				pattern: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/,
				lookbehind: true,
				alias: 'variable',
				inside: {
					'punctuation': /::/
				}
			}
		];
		Prism.languages.puppet['heredoc'][0].inside.interpolation = interpolation;
		Prism.languages.puppet['string'].inside['double-quoted'].inside.interpolation = interpolation;
	}(Prism));
	(function (Prism) {
		Prism.languages.pure = {
			'comment': [
				{
					pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
					lookbehind: true
				},
				{
					pattern: /(^|[^\\:])\/\/.*/,
					lookbehind: true
				},
				/#!.+/
			],
			'inline-lang': {
				pattern: /%<[\s\S]+?%>/,
				greedy: true,
				inside: {
					'lang': {
						pattern: /(^%< *)-\*-.+?-\*-/,
						lookbehind: true,
						alias: 'comment'
					},
					'delimiter': {
						pattern: /^%<.*|%>$/,
						alias: 'punctuation'
					}
				}
			},
			'string': {
				pattern: /"(?:\\.|[^"\\\r\n])*"/,
				greedy: true
			},
			'number': {
				// The look-behind prevents wrong highlighting of the .. operator
				pattern: /((?:\.\.)?)(?:\b(?:inf|nan)\b|\b0x[\da-f]+|(?:\b(?:0b)?\d+(?:\.\d)?|\B\.\d)\d*(?:e[+-]?\d+)?L?)/i,
				lookbehind: true
			},
			'keyword': /\b(?:ans|break|bt|case|catch|cd|clear|const|def|del|dump|else|end|exit|extern|false|force|help|if|infix[lr]?|interface|let|ls|mem|namespace|nonfix|NULL|of|otherwise|outfix|override|postfix|prefix|private|public|pwd|quit|run|save|show|stats|then|throw|trace|true|type|underride|using|when|with)\b/,
			'function': /\b(?:abs|add_(?:(?:fundef|interface|macdef|typedef)(?:_at)?|addr|constdef|vardef)|all|any|applp?|arity|bigintp?|blob(?:_crc|_size|p)?|boolp?|byte_(?:matrix|pointer)|byte_c?string(?:_pointer)?|calloc|cat|catmap|ceil|char[ps]?|check_ptrtag|chr|clear_sentry|clearsym|closurep?|cmatrixp?|cols?|colcat(?:map)?|colmap|colrev|colvector(?:p|seq)?|complex(?:_float_(?:matrix|pointer)|_matrix(?:_view)?|_pointer|p)?|conj|cookedp?|cst|cstring(?:_(?:dup|list|vector))?|curry3?|cyclen?|del_(?:constdef|fundef|interface|macdef|typedef|vardef)|delete|diag(?:mat)?|dim|dmatrixp?|do|double(?:_matrix(?:_view)?|_pointer|p)?|dowith3?|drop|dropwhile|eval(?:cmd)?|exactp|filter|fix|fixity|flip|float(?:_matrix|_pointer)|floor|fold[lr]1?|frac|free|funp?|functionp?|gcd|get(?:_(?:byte|constdef|double|float|fundef|int(?:64)?|interface(?:_typedef)?|long|macdef|pointer|ptrtag|short|sentry|string|typedef|vardef))?|globsym|hash|head|id|im|imatrixp?|index|inexactp|infp|init|insert|int(?:_matrix(?:_view)?|_pointer|p)?|int64_(?:matrix|pointer)|integerp?|iteraten?|iterwhile|join|keys?|lambdap?|last(?:err(?:pos)?)?|lcd|list[2p]?|listmap|make_ptrtag|malloc|map|matcat|matrixp?|max|member|min|nanp|nargs|nmatrixp?|null|numberp?|ord|pack(?:ed)?|pointer(?:_cast|_tag|_type|p)?|pow|pred|ptrtag|put(?:_(?:byte|double|float|int(?:64)?|long|pointer|short|string))?|rationalp?|re|realp?|realloc|recordp?|redim|reduce(?:_with)?|refp?|repeatn?|reverse|rlistp?|round|rows?|rowcat(?:map)?|rowmap|rowrev|rowvector(?:p|seq)?|same|scan[lr]1?|sentry|sgn|short_(?:matrix|pointer)|slice|smatrixp?|sort|split|str|strcat|stream|stride|string(?:_(?:dup|list|vector)|p)?|subdiag(?:mat)?|submat|subseq2?|substr|succ|supdiag(?:mat)?|symbolp?|tail|take|takewhile|thunkp?|transpose|trunc|tuplep?|typep|ubyte|uint(?:64)?|ulong|uncurry3?|unref|unzip3?|update|ushort|vals?|varp?|vector(?:p|seq)?|void|zip3?|zipwith3?)\b/,
			'special': {
				pattern: /\b__[a-z]+__\b/i,
				alias: 'builtin'
			},
			// Any combination of operator chars can be an operator
			'operator': /(?=\b_|[^_])[!"#$%&'*+,\-.\/:<=>?@\\^_`|~\u00a1-\u00bf\u00d7-\u00f7\u20d0-\u2bff]+|\b(?:and|div|mod|not|or)\b/,
			// FIXME: How can we prevent | and , to be highlighted as operator when they are used alone?
			'punctuation': /[(){}\[\];,|]/
		};

		var inlineLanguages = [
			'c',
			{ lang: 'c++', alias: 'cpp' },
			'fortran',
			'ats',
			'dsp'
		];
		var inlineLanguageRe = '%< *-\\*- *{lang}\\d* *-\\*-[\\s\\S]+?%>';

		inlineLanguages.forEach(function (lang) {
			var alias = lang;
			if (typeof lang !== 'string') {
				alias = lang.alias;
				lang = lang.lang;
			}
			if (Prism.languages[alias]) {
				var o = {};
				o['inline-lang-' + alias] = {
					pattern: RegExp(inlineLanguageRe.replace('{lang}', lang.replace(/([.+*?\/\\(){}\[\]])/g,'\\$1')), 'i'),
					inside: Prism.util.clone(Prism.languages.pure['inline-lang'].inside)
				};
				o['inline-lang-' + alias].inside.rest = Prism.util.clone(Prism.languages[alias]);
				Prism.languages.insertBefore('pure', 'inline-lang', o);
			}
		});

		// C is the default inline language
		if (Prism.languages.c) {
			Prism.languages.pure['inline-lang'].inside.rest = Prism.util.clone(Prism.languages.c);
		}

	}(Prism));
	Prism.languages.python = {
		'comment': {
			pattern: /(^|[^\\])#.*/,
			lookbehind: true
		},
		'triple-quoted-string': {
			pattern: /("""|''')[\s\S]+?\1/,
			greedy: true,
			alias: 'string'
		},
		'string': {
			pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'function': {
			pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
			lookbehind: true
		},
		'class-name': {
			pattern: /(\bclass\s+)\w+/i,
			lookbehind: true
		},
		'keyword': /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
		'builtin':/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
		'boolean': /\b(?:True|False|None)\b/,
		'number': /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
		'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
		'punctuation': /[{}[\];(),.:]/
	};

	Prism.languages.q = {
		'string': /"(?:\\.|[^"\\\r\n])*"/,
		'comment': [
			// From http://code.kx.com/wiki/Reference/Slash:
			// When / is following a space (or a right parenthesis, bracket, or brace), it is ignored with the rest of the line.
			{

				pattern: /([\t )\]}])\/.*/,
				lookbehind: true
			},
			// From http://code.kx.com/wiki/Reference/Slash:
			// A line which has / as its first character and contains at least one other non-whitespace character is a whole-line comment and is ignored entirely.
			// A / on a line by itself begins a multiline comment which is terminated by the next \ on a line by itself.
			// If a / is not matched by a \, the multiline comment is unterminated and continues to end of file.
			// The / and \ must be the first char on the line, but may be followed by any amount of whitespace.
			{
				pattern: /(^|\r?\n|\r)\/[\t ]*(?:(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?(?:\\(?=[\t ]*(?:\r?\n|\r))|$)|\S.*)/,
				lookbehind: true
			},
			// From http://code.kx.com/wiki/Reference/Slash:
			// A \ on a line by itself with no preceding matching / will comment to end of file.
			/^\\[\t ]*(?:\r?\n|\r)[\s\S]+/m,

			/^#!.+/m
		],
		'symbol': /`(?::\S+|[\w.]*)/,
		'datetime': {
			pattern: /0N[mdzuvt]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d\d)?)?)?)?)?[dz]?)|\d\d:\d\d(?::\d\d(?:[.:]\d\d\d)?)?[uvt]?/,
			alias: 'number'
		},
		// The negative look-ahead prevents bad highlighting
		// of verbs 0: and 1:
		'number': /\b-?(?![01]:)(?:0[wn]|0W[hj]?|0N[hje]?|0x[\da-fA-F]+|\d+\.?\d*(?:e[+-]?\d+)?[hjfeb]?)/,
		'keyword': /\\\w+\b|\b(?:abs|acos|aj0?|all|and|any|asc|asin|asof|atan|attr|avgs?|binr?|by|ceiling|cols|cor|cos|count|cov|cross|csv|cut|delete|deltas|desc|dev|differ|distinct|div|do|dsave|ej|enlist|eval|except|exec|exit|exp|fby|fills|first|fkeys|flip|floor|from|get|getenv|group|gtime|hclose|hcount|hdel|hopen|hsym|iasc|identity|idesc|if|ij|in|insert|inter|inv|keys?|last|like|list|ljf?|load|log|lower|lsq|ltime|ltrim|mavg|maxs?|mcount|md5|mdev|med|meta|mins?|mmax|mmin|mmu|mod|msum|neg|next|not|null|or|over|parse|peach|pj|plist|prds?|prev|prior|rand|rank|ratios|raze|read0|read1|reciprocal|reval|reverse|rload|rotate|rsave|rtrim|save|scan|scov|sdev|select|set|setenv|show|signum|sin|sqrt|ssr?|string|sublist|sums?|sv|svar|system|tables|tan|til|trim|txf|type|uj|ungroup|union|update|upper|upsert|value|var|views?|vs|wavg|where|while|within|wj1?|wsum|ww|xasc|xbar|xcols?|xdesc|xexp|xgroup|xkey|xlog|xprev|xrank)\b/,
		'adverb': {
			pattern: /['\/\\]:?|\beach\b/,
			alias: 'function'
		},
		'verb': {
			pattern: /(?:\B\.\B|\b[01]:|<[=>]?|>=?|[:+\-*%,!?_~=|$&#@^]):?/,
			alias: 'operator'
		},
		'punctuation': /[(){}\[\];.]/
	};
	Prism.languages.qore = Prism.languages.extend('clike', {
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/|#).*)/,
			lookbehind: true
		},
		// Overridden to allow unescaped multi-line strings
		'string': {
			pattern: /("|')(\\[\s\S]|(?!\1)[^\\])*\1/,
			greedy: true
		},
		'variable': /\$(?!\d)\w+\b/,
		'keyword': /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:int|float|number|bool|string|date|list)|static|strictfp|string|sub|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
		'number': /\b(?:0b[01]+|0x[\da-f]*\.?[\da-fp\-]+|\d*\.?\d+e?\d*[df]|\d*\.?\d+)\b/i,
		'boolean': /\b(?:true|false)\b/i,
		'operator': {
			pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:==?|~)?|>>?=?|<(?:=>?|<=?)?|&[&=]?|\|[|=]?|[*\/%^]=?|[~?])/,
			lookbehind: true
		},
		'function': /\$?\b(?!\d)\w+(?=\()/
	});
	Prism.languages.r = {
		'comment': /#.*/,
		'string': {
			pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'percent-operator': {
			// Includes user-defined operators
			// and %%, %*%, %/%, %in%, %o%, %x%
			pattern: /%[^%\s]*%/,
			alias: 'operator'
		},
		'boolean': /\b(?:TRUE|FALSE)\b/,
		'ellipsis': /\.\.(?:\.|\d+)/,
		'number': [
			/\b(?:NaN|Inf)\b/,
			/\b(?:0x[\dA-Fa-f]+(?:\.\d*)?|\d*\.?\d+)(?:[EePp][+-]?\d+)?[iL]?\b/
		],
		'keyword': /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
		'operator': /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
		'punctuation': /[(){}\[\],;]/
	};
	(function(Prism) {

	var javascript = Prism.util.clone(Prism.languages.javascript);

	Prism.languages.jsx = Prism.languages.extend('markup', javascript);
	Prism.languages.jsx.tag.pattern= /<\/?[\w.:-]+\s*(?:\s+(?:[\w\.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+|(?:\{[^}]*\})))?|\{\.{3}\w+\}))*\s*\/?>/i;

	Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i;

	Prism.languages.insertBefore('inside', 'attr-name', {
		'spread': {
			pattern: /\{\.{3}\w+\}/,
			inside: {
				'punctuation': /[{}]|\.{3}/,
				'attr-value': /\w+/
			}
		}
	}, Prism.languages.jsx.tag);

	var jsxExpression = Prism.util.clone(Prism.languages.jsx);

	delete jsxExpression.punctuation;

	jsxExpression = Prism.languages.insertBefore('jsx', 'operator', {
	  'punctuation': /=(?={)|[{}[\];(),.:]/
	}, { jsx: jsxExpression });

	Prism.languages.insertBefore('inside', 'attr-value',{
		'script': {
			// Allow for one level of nesting
			pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
			inside: jsxExpression,
			'alias': 'language-javascript'
		}
	}, Prism.languages.jsx.tag);

	}(Prism));

	Prism.languages.renpy= {
		// TODO Write tests.

		'comment': {
			pattern: /(^|[^\\])#.+/,
			lookbehind: true
		},

		'string': {
			pattern: /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2|(?:^#?(?:(?:[0-9a-fA-F]{2}){3}|(?:[0-9a-fA-F]){3})$)/m,
			greedy: true
		},

		'function' : /[a-z_]\w*(?=\()/i,

		'property': /\b(?:insensitive|idle|hover|selected_idle|selected_hover|background|position|alt|xpos|ypos|pos|xanchor|yanchor|anchor|xalign|yalign|align|xcenter|ycenter|xofsset|yoffset|ymaximum|maximum|xmaximum|xminimum|yminimum|minimum|xsize|ysizexysize|xfill|yfill|area|antialias|black_color|bold|caret|color|first_indent|font|size|italic|justify|kerning|language|layout|line_leading|line_overlap_split|line_spacing|min_width|newline_indent|outlines|rest_indent|ruby_style|slow_cps|slow_cps_multiplier|strikethrough|text_align|underline|hyperlink_functions|vertical|hinting|foreground|left_margin|xmargin|top_margin|bottom_margin|ymargin|left_padding|right_padding|xpadding|top_padding|bottom_padding|ypadding|size_group|child|hover_sound|activate_sound|mouse|focus_mask|keyboard_focus|bar_vertical|bar_invert|bar_resizing|left_gutter|right_gutter|top_gutter|bottom_gutter|left_bar|right_bar|top_bar|bottom_bar|thumb|thumb_shadow|thumb_offset|unscrollable|spacing|first_spacing|box_reverse|box_wrap|order_reverse|fit_first|ysize|thumbnail_width|thumbnail_height|help|text_ypos|text_xpos|idle_color|hover_color|selected_idle_color|selected_hover_color|insensitive_color|alpha|insensitive_background|hover_background|zorder|value|width|xadjustment|xanchoraround|xaround|xinitial|xoffset|xzoom|yadjustment|yanchoraround|yaround|yinitial|yzoom|zoom|ground|height|text_style|text_y_fudge|selected_insensitive|has_sound|has_music|has_voice|focus|hovered|image_style|length|minwidth|mousewheel|offset|prefix|radius|range|right_margin|rotate|rotate_pad|developer|screen_width|screen_height|window_title|name|version|windows_icon|default_fullscreen|default_text_cps|default_afm_time|main_menu_music|sample_sound|enter_sound|exit_sound|save_directory|enter_transition|exit_transition|intra_transition|main_game_transition|game_main_transition|end_splash_transition|end_game_transition|after_load_transition|window_show_transition|window_hide_transition|adv_nvl_transition|nvl_adv_transition|enter_yesno_transition|exit_yesno_transition|enter_replay_transition|exit_replay_transition|say_attribute_transition|directory_name|executable_name|include_update|window_icon|modal|google_play_key|google_play_salt|drag_name|drag_handle|draggable|dragged|droppable|dropped|narrator_menu|action|default_afm_enable|version_name|version_tuple|inside|fadeout|fadein|layers|layer_clipping|linear|scrollbars|side_xpos|side_ypos|side_spacing|edgescroll|drag_joined|drag_raise|drop_shadow|drop_shadow_color|subpixel|easein|easeout|time|crop|auto|update|get_installed_packages|can_update|UpdateVersion|Update|overlay_functions|translations|window_left_padding|show_side_image|show_two_window)\b/,

		'tag': /\b(?:label|image|menu|[hv]box|frame|text|imagemap|imagebutton|bar|vbar|screen|textbutton|buttoscreenn|fixed|grid|input|key|mousearea|side|timer|viewport|window|hotspot|hotbar|self|button|drag|draggroup|tag|mm_menu_frame|nvl|block|parallel)\b|\$/,

		'keyword' : /\b(?:as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|yield|adjustment|alignaround|allow|angle|around|box_layout|cache|changed|child_size|clicked|clipping|corner1|corner2|default|delay|exclude|scope|slow|slow_abortable|slow_done|sound|style_group|substitute|suffix|transform_anchor|transpose|unhovered|config|theme|mm_root|gm_root|rounded_window|build|disabled_text|disabled|widget_selected|widget_text|widget_hover|widget|updater|behind|call|expression|hide|init|jump|onlayer|python|renpy|scene|set|show|transform|play|queue|stop|pause|define|window|repeat|contains|choice|on|function|event|animation|clockwise|counterclockwise|circles|knot|null|None|random|has|add|use|fade|dissolve|style|store|id|voice|center|left|right|less_rounded|music|movie|clear|persistent|ui)\b/,

		'boolean' : /\b(?:[Tt]rue|[Ff]alse)\b/,

		'number' : /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,

		'operator' : /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not|with|at)\b/,

		'punctuation' : /[{}[\];(),.:]/
	};

	Prism.languages.reason = Prism.languages.extend('clike', {
		'comment': {
			pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
			lookbehind: true
		},
		'string': {
			pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
			greedy: true
		},
		// 'class-name' must be matched *after* 'constructor' defined below
		'class-name': /\b[A-Z]\w*/,
		'keyword': /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
		'operator': /\.{3}|:[:=]|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/
	});
	Prism.languages.insertBefore('reason', 'class-name', {
		'character': {
			pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
			alias: 'string'
		},
		'constructor': {
			// Negative look-ahead prevents from matching things like String.capitalize
			pattern: /\b[A-Z]\w*\b(?!\s*\.)/,
			alias: 'variable'
		},
		'label': {
			pattern: /\b[a-z]\w*(?=::)/,
			alias: 'symbol'
		}
	});

	// We can't match functions property, so let's not even try.
	delete Prism.languages.reason.function;
	Prism.languages.rest = {
		'table': [
			{
				pattern: /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1(?:[+|].+)+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/,
				lookbehind: true,
				inside: {
					'punctuation': /\||(?:\+[=-]+)+\+/
				}
			},
			{
				pattern: /(\s*)(?:=+ +)+=+(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1(?:=+ +)+=+(?=(?:\r?\n|\r){2}|\s*$)/,
				lookbehind: true,
				inside: {
					'punctuation': /[=-]+/
				}
			}
		],

		// Directive-like patterns

		'substitution-def': {
			pattern: /(^\s*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
			lookbehind: true,
			inside: {
				'substitution': {
					pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
					alias: 'attr-value',
					inside: {
						'punctuation': /^\||\|$/
					}
				},
				'directive': {
					pattern: /( +)[^:]+::/,
					lookbehind: true,
					alias: 'function',
					inside: {
						'punctuation': /::$/
					}
				}
			}
		},
		'link-target': [
			{
				pattern: /(^\s*\.\. )\[[^\]]+\]/m,
				lookbehind: true,
				alias: 'string',
				inside: {
					'punctuation': /^\[|\]$/
				}
			},
			{
				pattern: /(^\s*\.\. )_(?:`[^`]+`|(?:[^:\\]|\\.)+):/m,
				lookbehind: true,
				alias: 'string',
				inside: {
					'punctuation': /^_|:$/
				}
			}
		],
		'directive': {
			pattern: /(^\s*\.\. )[^:]+::/m,
			lookbehind: true,
			alias: 'function',
			inside: {
				'punctuation': /::$/
			}
		},
		'comment': {
			// The two alternatives try to prevent highlighting of blank comments
			pattern: /(^\s*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m,
			lookbehind: true
		},

		'title': [
			// Overlined and underlined
			{
				pattern: /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
				inside: {
					'punctuation': /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
					'important': /.+/
				}
			},

			// Underlined only
			{
				pattern: /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+(?=\r?\n|\r|$)/,
				lookbehind: true,
				inside: {
					'punctuation': /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
					'important': /.+/
				}
			}
		],
		'hr': {
			pattern: /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2{3,}(?=(?:\r?\n|\r){2})/,
			lookbehind: true,
			alias: 'punctuation'
		},
		'field': {
			pattern: /(^\s*):[^:\r\n]+:(?= )/m,
			lookbehind: true,
			alias: 'attr-name'
		},
		'command-line-option': {
			pattern: /(^\s*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im,
			lookbehind: true,
			alias: 'symbol'
		},
		'literal-block': {
			pattern: /::(?:\r?\n|\r){2}([ \t]+).+(?:(?:\r?\n|\r)\1.+)*/,
			inside: {
				'literal-block-punctuation': {
					pattern: /^::/,
					alias: 'punctuation'
				}
			}
		},
		'quoted-literal-block': {
			pattern: /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
			inside: {
				'literal-block-punctuation': {
					pattern: /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\1*)/m,
					alias: 'punctuation'
				}
			}
		},
		'list-bullet': {
			pattern: /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
			lookbehind: true,
			alias: 'punctuation'
		},
		'doctest-block': {
			pattern: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m,
			lookbehind: true,
			inside: {
				'punctuation': /^>>>/
			}
		},

		'inline': [
			{
				pattern: /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s).*?[^\s]\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
				lookbehind: true,
				inside: {
					'bold': {
						pattern: /(^\*\*).+(?=\*\*$)/,
						lookbehind: true
					},
					'italic': {
						pattern: /(^\*).+(?=\*$)/,
						lookbehind: true
					},
					'inline-literal': {
						pattern: /(^``).+(?=``$)/,
						lookbehind: true,
						alias: 'symbol'
					},
					'role': {
						pattern: /^:[^:]+:|:[^:]+:$/,
						alias: 'function',
						inside: {
							'punctuation': /^:|:$/
						}
					},
					'interpreted-text': {
						pattern: /(^`).+(?=`$)/,
						lookbehind: true,
						alias: 'attr-value'
					},
					'substitution': {
						pattern: /(^\|).+(?=\|$)/,
						lookbehind: true,
						alias: 'attr-value'
					},
					'punctuation': /\*\*?|``?|\|/
				}
			}
		],

		'link': [
			{
				pattern: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/,
				alias: 'string',
				inside: {
					'punctuation': /^\[|\]_$/
				}
			},
			{
				pattern: /(?:\b[a-z\d](?:[_.:+]?[a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i,
				alias: 'string',
				inside: {
					'punctuation': /^_?`|`$|`?_?_$/
				}
			}
		],

		// Line block start,
		// quote attribution,
		// explicit markup start,
		// and anonymous hyperlink target shortcut (__)
		'punctuation': {
			pattern: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
			lookbehind: true
		}
	};
	Prism.languages.rip = {
		'comment': /#.*/,

		'keyword': /(?:=>|->)|\b(?:class|if|else|switch|case|return|exit|try|catch|finally|raise)\b/,

		'builtin': /@|\bSystem\b/,

		'boolean': /\b(?:true|false)\b/,

		'date': /\b\d{4}-\d{2}-\d{2}\b/,
		'time': /\b\d{2}:\d{2}:\d{2}\b/,
		'datetime': /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/,

		'character': /\B`[^\s`'",.:;#\/\\()<>\[\]{}]\b/,

		'regex': {
			pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/(?=\s*($|[\r\n,.;})]))/,
			lookbehind: true,
			greedy: true
		},

		'symbol': /:[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,
		'string': {
			pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'number': /[+-]?(?:(?:\d+\.\d+)|(?:\d+))/,

		'punctuation': /(?:\.{2,3})|[`,.:;=\/\\()<>\[\]{}]/,

		'reference': /[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/
	};

	Prism.languages.roboconf = {
		'comment': /#.*/,
		'keyword': {
			'pattern': /(^|\s)(?:(?:facet|instance of)(?=[ \t]+[\w-]+[ \t]*\{)|(?:external|import)\b)/,
			lookbehind: true
		},
		'component': {
			pattern: /[\w-]+(?=[ \t]*\{)/,
			alias: 'variable'
		},
		'property': /[\w.-]+(?=[ \t]*:)/,
		'value': {
			pattern: /(=[ \t]*)[^,;]+/,
			lookbehind: true,
			alias: 'attr-value'
		},
		'optional': {
			pattern: /\(optional\)/,
			alias: 'builtin'
		},
		'wildcard': {
			pattern: /(\.)\*/,
			lookbehind: true,
			alias: 'operator'
		},
		'punctuation': /[{},.;:=]/
	};
	(function(Prism) {
		Prism.languages.crystal = Prism.languages.extend('ruby', {
			keyword: [
				/\b(?:abstract|alias|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|rescue|return|require|select|self|sizeof|struct|super|then|type|typeof|uninitialized|union|unless|until|when|while|with|yield|__DIR__|__END_LINE__|__FILE__|__LINE__)\b/,
				{
					pattern: /(\.\s*)(?:is_a|responds_to)\?/,
					lookbehind: true
				}
			],

			number: /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[0-9a-fA-F_]*[0-9a-fA-F]|(?:\d(?:[0-9_]*\d)?)(?:\.[0-9_]*\d)?(?:[eE][+-]?[0-9_]*\d)?)(?:_(?:[uif](?:8|16|32|64))?)?\b/
		});

		var rest = Prism.util.clone(Prism.languages.crystal);

		Prism.languages.insertBefore('crystal', 'string', {
			attribute: {
				pattern: /@\[.+?\]/,
				alias: 'attr-name',
				inside: {
					delimiter: {
						pattern: /^@\[|\]$/,
						alias: 'tag'
					},
					rest: rest
				}
			},

			expansion: [
			{
				pattern: /\{\{.+?\}\}/,
				inside: {
					delimiter: {
						pattern: /^\{\{|\}\}$/,
						alias: 'tag'
					},
					rest: rest
				}
			},
			{
				pattern: /\{%.+?%\}/,
				inside: {
					delimiter: {
						pattern: /^\{%|%\}$/,
						alias: 'tag'
					},
					rest: rest
				}
			}
			]
		});

	}(Prism));

	/* TODO
		Add support for Markdown notation inside doc comments
		Add support for nested block comments...
		Match closure params even when not followed by dash or brace
		Add better support for macro definition
	*/

	Prism.languages.rust = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true
			}
		],
		'string': [
			{
				pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/,
				greedy: true
			},
			{
				pattern: /b?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
				greedy: true
			}
		],
		'keyword': /\b(?:abstract|alignof|as|be|box|break|const|continue|crate|do|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|struct|super|true|trait|type|typeof|unsafe|unsized|use|virtual|where|while|yield)\b/,

		'attribute': {
			pattern: /#!?\[.+?\]/,
			greedy: true,
			alias: 'attr-name'
		},

		'function': [
			/\w+(?=\s*\()/,
			// Macros can use parens or brackets
			/\w+!(?=\s*\(|\[)/
		],
		'macro-rules': {
			pattern: /\w+!/,
			alias: 'function'
		},

		// Hex, oct, bin, dec numbers with visual separators and type suffix
		'number': /\b-?(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,

		// Closure params should not be confused with bitwise OR |
		'closure-params': {
			pattern: /\|[^|]*\|(?=\s*[{-])/,
			inside: {
				'punctuation': /[|:,]/,
				'operator': /[&*]/
			}
		},
		'punctuation': /[{}[\];(),:]|\.+|->/,
		'operator': /[-+*\/%!^=]=?|@|&[&=]?|\|[|=]?|<<?=?|>>?=?/
	};
	Prism.languages.sas = {
		'datalines': {
			pattern: /^\s*(?:(?:data)?lines|cards);[\s\S]+?(?:\r?\n|\r);/im,
			alias: 'string',
			inside: {
				'keyword': {
					pattern: /^(\s*)(?:(?:data)?lines|cards)/i,
					lookbehind: true
				},
				'punctuation': /;/
			}
		},
		'comment': [
			{
				pattern: /(^\s*|;\s*)\*.*;/m,
				lookbehind: true
			},
			/\/\*[\s\S]+?\*\//
		],
		'datetime': {
			// '1jan2013'd, '9:25:19pm't, '18jan2003:9:27:05am'dt
			pattern: /'[^']+'(?:dt?|t)\b/i,
			alias: 'number'
		},
		'string': {
			pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/,
			greedy: true
		},
		'keyword': /\b(?:data|else|format|if|input|proc\s\w+|quit|run|then)\b/i,
		// Decimal (1.2e23), hexadecimal (0c1x)
		'number': /(?:\B-|\b)(?:[\da-f]+x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i,
		'operator': /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?|\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,
		'punctuation': /[$%@.(){}\[\];,\\]/
	};

	(function(Prism) {
		Prism.languages.sass = Prism.languages.extend('css', {
			// Sass comments don't need to be closed, only indented
			'comment': {
				pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
				lookbehind: true
			}
		});

		Prism.languages.insertBefore('sass', 'atrule', {
			// We want to consume the whole line
			'atrule-line': {
				// Includes support for = and + shortcuts
				pattern: /^(?:[ \t]*)[@+=].+/m,
				inside: {
					'atrule': /(?:@[\w-]+|[+=])/m
				}
			}
		});
		delete Prism.languages.sass.atrule;


		var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
		var operator = [
			/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
			{
				pattern: /(\s+)-(?=\s)/,
				lookbehind: true
			}
		];

		Prism.languages.insertBefore('sass', 'property', {
			// We want to consume the whole line
			'variable-line': {
				pattern: /^[ \t]*\$.+/m,
				inside: {
					'punctuation': /:/,
					'variable': variable,
					'operator': operator
				}
			},
			// We want to consume the whole line
			'property-line': {
				pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
				inside: {
					'property': [
						/[^:\s]+(?=\s*:)/,
						{
							pattern: /(:)[^:\s]+/,
							lookbehind: true
						}
					],
					'punctuation': /:/,
					'variable': variable,
					'operator': operator,
					'important': Prism.languages.sass.important
				}
			}
		});
		delete Prism.languages.sass.property;
		delete Prism.languages.sass.important;

		// Now that whole lines for other patterns are consumed,
		// what's left should be selectors
		delete Prism.languages.sass.selector;
		Prism.languages.insertBefore('sass', 'punctuation', {
			'selector': {
				pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
				lookbehind: true
			}
		});

	}(Prism));
	Prism.languages.scss = Prism.languages.extend('css', {
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
			lookbehind: true
		},
		'atrule': {
			pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		// url, compassified
		'url': /(?:[-a-z]+-)*url(?=\()/i,
		// CSS selector regex is not appropriate for Sass
		// since there can be lot more things (var, @ directive, nesting..)
		// a selector must start at the end of a property or after a brace (end of other rules or nesting)
		// it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
		// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
		// can "pass" as a selector- e.g: proper#{$erty})
		// this one was hard to do, so please be careful if you edit this one :)
		'selector': {
			// Initial look-ahead is used to prevent matching of blank selectors
			pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
			inside: {
				'parent': {
					pattern: /&/,
					alias: 'important'
				},
				'placeholder': /%[-\w]+/,
				'variable': /\$[-\w]+|#\{\$[-\w]+\}/
			}
		}
	});

	Prism.languages.insertBefore('scss', 'atrule', {
		'keyword': [
			/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
			{
				pattern: /( +)(?:from|through)(?= )/,
				lookbehind: true
			}
		]
	});

	Prism.languages.scss.property = {
		pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
		inside: {
			'variable': /\$[-\w]+|#\{\$[-\w]+\}/
		}
	};

	Prism.languages.insertBefore('scss', 'important', {
		// var and interpolated vars
		'variable': /\$[-\w]+|#\{\$[-\w]+\}/
	});

	Prism.languages.insertBefore('scss', 'function', {
		'placeholder': {
			pattern: /%[-\w]+/,
			alias: 'selector'
		},
		'statement': {
			pattern: /\B!(?:default|optional)\b/i,
			alias: 'keyword'
		},
		'boolean': /\b(?:true|false)\b/,
		'null': /\bnull\b/,
		'operator': {
			pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
			lookbehind: true
		}
	});

	Prism.languages.scss['atrule'].inside.rest = Prism.util.clone(Prism.languages.scss);
	Prism.languages.scala = Prism.languages.extend('java', {
		'keyword': /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
		'string': [
			{
				pattern: /"""[\s\S]*?"""/,
				greedy: true
			},
			{
				pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
				greedy: true
			}
		],
		'builtin': /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
		'number': /\b(?:0x[\da-f]*\.?[\da-f]+|\d*\.?\d+e?\d*[dfl]?)\b/i,
		'symbol': /'[^\d\s\\]\w*/
	});
	delete Prism.languages.scala['class-name'];
	delete Prism.languages.scala['function'];

	Prism.languages.scheme = {
		'comment' : /;.*/,
		'string' :  {
			pattern: /"(?:[^"\\\r\n]|\\.)*"|'[^('\s]*/,
			greedy: true
		},
		'keyword' : {
			pattern : /(\()(?:define(?:-syntax|-library|-values)?|(?:case-)?lambda|let(?:\*|rec)?(?:-values)?|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-rules)/,
			lookbehind : true
		},
		'builtin' : {
			pattern :  /(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)/,
			lookbehind : true
		},
		'number' : {
			pattern: /(\s|\))[-+]?\d*\.?\d+(?:\s*[-+]\s*\d*\.?\d+i)?\b/,
			lookbehind: true
		},
		'boolean' : /#[tf]/,
		'operator': {
			pattern: /(\()(?:[-+*%\/]|[<>]=?|=>?)/,
			lookbehind: true
		},
		'function' : {
			pattern : /(\()[^\s()]*(?=\s)/,
			lookbehind : true
		},
		'punctuation' : /[()]/
	};
	Prism.languages.smalltalk = {
		'comment': /"(?:""|[^"])+"/,
		'string': /'(?:''|[^'])+'/,
		'symbol': /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
		'block-arguments': {
			pattern: /(\[\s*):[^\[|]*\|/,
			lookbehind: true,
			inside: {
				'variable': /:[\da-z]+/i,
				'punctuation': /\|/
			}
		},
		'temporary-variables': {
			pattern: /\|[^|]+\|/,
			inside: {
				'variable': /[\da-z]+/i,
				'punctuation': /\|/
			}
		},
		'keyword': /\b(?:nil|true|false|self|super|new)\b/,
		'character': {
			pattern: /\$./,
			alias: 'string'
		},
		'number': [
			/\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/,
			/(?:\B-|\b)\d+(?:\.\d+)?(?:e-?\d+)?/
		],
		'operator': /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
		'punctuation': /[.;:?\[\](){}]/
	};
	/* TODO
		Add support for variables inside double quoted strings
		Add support for {php}
	*/

	(function(Prism) {

		var smarty_pattern = /\{\*[\s\S]+?\*\}|\{[\s\S]+?\}/g;
		var smarty_litteral_start = '{literal}';
		var smarty_litteral_end = '{/literal}';
		var smarty_litteral_mode = false;

		Prism.languages.smarty = Prism.languages.extend('markup', {
			'smarty': {
				pattern: smarty_pattern,
				inside: {
					'delimiter': {
						pattern: /^\{|\}$/i,
						alias: 'punctuation'
					},
					'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
					'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][-+]?\d+)?)\b/,
					'variable': [
						/\$(?!\d)\w+/,
						/#(?!\d)\w+#/,
						{
							pattern: /(\.|->)(?!\d)\w+/,
							lookbehind: true
						},
						{
							pattern: /(\[)(?!\d)\w+(?=\])/,
							lookbehind: true
						}
					],
					'function': [
						{
							pattern: /(\|\s*)@?(?!\d)\w+/,
							lookbehind: true
						},
						/^\/?(?!\d)\w+/,
						/(?!\d)\w+(?=\()/
					],
					'attr-name': {
						// Value is made optional because it may have already been tokenized
						pattern: /\w+\s*=\s*(?:(?!\d)\w+)?/,
						inside: {
							"variable": {
								pattern: /(=\s*)(?!\d)\w+/,
								lookbehind: true
							},
							"operator": /=/
						}
					},
					'punctuation': [
						/[\[\]().,:`]|->/
					],
					'operator': [
						/[+\-*\/%]|==?=?|[!<>]=?|&&|\|\|?/,
						/\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
						/\b(?:eq|neq?|gt|lt|gt?e|lt?e|not|mod|or|and)\b/
					],
					'keyword': /\b(?:false|off|on|no|true|yes)\b/
				}
			}
		});

		// Comments are inserted at top so that they can
		// surround markup
		Prism.languages.insertBefore('smarty', 'tag', {
			'smarty-comment': {
				pattern: /\{\*[\s\S]*?\*\}/,
				alias: ['smarty','comment']
			}
		});

		// Tokenize all inline Smarty expressions
		Prism.hooks.add('before-highlight', function(env) {
			if (env.language !== 'smarty') {
				return;
			}

			env.tokenStack = [];

			env.backupCode = env.code;
			env.code = env.code.replace(smarty_pattern, function(match) {

				// Smarty tags inside {literal} block are ignored
				if(match === smarty_litteral_end) {
					smarty_litteral_mode = false;
				}

				if(!smarty_litteral_mode) {
					if(match === smarty_litteral_start) {
						smarty_litteral_mode = true;
					}

					var i = env.tokenStack.length;
					// Check for existing strings
					while (env.backupCode.indexOf('___SMARTY' + i + '___') !== -1)
						++i;

					// Create a sparse array
					env.tokenStack[i] = match;

					return '___SMARTY' + i + '___';
				}
				return match;
			});
		});

		// Restore env.code for other plugins (e.g. line-numbers)
		Prism.hooks.add('before-insert', function(env) {
			if (env.language === 'smarty') {
				env.code = env.backupCode;
				delete env.backupCode;
			}
		});

		// Re-insert the tokens after highlighting
		// and highlight them with defined grammar
		Prism.hooks.add('after-highlight', function(env) {
			if (env.language !== 'smarty') {
				return;
			}

			for (var i = 0, keys = Object.keys(env.tokenStack); i < keys.length; ++i) {
				var k = keys[i];
				var t = env.tokenStack[k];

				// The replace prevents $$, $&, $`, $', $n, $nn from being interpreted as special patterns
				env.highlightedCode = env.highlightedCode.replace('___SMARTY' + k + '___', Prism.highlight(t, env.grammar, 'smarty').replace(/\$/g, '$$$$'));
			}

			env.element.innerHTML = env.highlightedCode;
		});

	}(Prism));
	Prism.languages.sql= {
		'comment': {
			pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
			lookbehind: true
		},
		'string' : {
			pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\])*\2/,
			greedy: true,
			lookbehind: true
		},
		'variable': /@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
		'function': /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i, // Should we highlight user defined functions too?
		'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATE(?:TIME)?|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITER(?:S)?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
		'boolean': /\b(?:TRUE|FALSE|NULL)\b/i,
		'number': /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
		'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
		'punctuation': /[;[\]()`,.]/
	};
	(function (Prism) {
		var inside = {
			'url': /url\((["']?).*?\1\)/i,
			'string': {
				pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
				greedy: true
			},
			'interpolation': null, // See below
			'func': null, // See below
			'important': /\B!(?:important|optional)\b/i,
			'keyword': {
				pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
				lookbehind: true
			},
			'hexcode': /#[\da-f]{3,6}/i,
			'number': /\b\d+(?:\.\d+)?%?/,
			'boolean': /\b(?:true|false)\b/,
			'operator': [
				// We want non-word chars around "-" because it is
				// accepted in property names.
				/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
			],
			'punctuation': /[{}()\[\];:,]/
		};

		inside['interpolation'] = {
			pattern: /\{[^\r\n}:]+\}/,
			alias: 'variable',
			inside: Prism.util.clone(inside)
		};
		inside['func'] = {
			pattern: /[\w-]+\([^)]*\).*/,
			inside: {
				'function': /^[^(]+/,
				rest: Prism.util.clone(inside)
			}
		};

		Prism.languages.stylus = {
			'comment': {
				pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/,
				lookbehind: true
			},
			'atrule-declaration': {
				pattern: /(^\s*)@.+/m,
				lookbehind: true,
				inside: {
					'atrule': /^@[\w-]+/,
					rest: inside
				}
			},
			'variable-declaration': {
				pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
				lookbehind: true,
				inside: {
					'variable': /^\S+/,
					rest: inside
				}
			},

			'statement': {
				pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
				lookbehind: true,
				inside: {
					keyword: /^\S+/,
					rest: inside
				}
			},

			// A property/value pair cannot end with a comma or a brace
			// It cannot have indented content unless it ended with a semicolon
			'property-declaration': {
				pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,
				lookbehind: true,
				inside: {
					'property': {
						pattern: /^[^\s:]+/,
						inside: {
							'interpolation': inside.interpolation
						}
					},
					rest: inside
				}
			},



			// A selector can contain parentheses only as part of a pseudo-element
			// It can span multiple lines.
			// It must end with a comma or an accolade or have indented content.
			'selector': {
				pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
				lookbehind: true,
				inside: {
					'interpolation': inside.interpolation,
					'punctuation': /[{},]/
				}
			},

			'func': inside.func,
			'string': inside.string,
			'interpolation': inside.interpolation,
			'punctuation': /[{}()\[\];:.]/
		};
	}(Prism));
	// issues: nested multiline comments
	Prism.languages.swift = Prism.languages.extend('clike', {
		'string': {
			pattern: /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
					inside: {
						delimiter: {
							pattern: /^\\\(|\)$/,
							alias: 'variable'
						}
						// See rest below
					}
				}
			}
		},
		'keyword': /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|Protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
		'number': /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
		'constant': /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
		'atrule': /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
		'builtin': /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/
	});
	Prism.languages.swift['string'].inside['interpolation'].inside.rest = Prism.util.clone(Prism.languages.swift);
	Prism.languages.tcl = {
		'comment': {
			pattern: /(^|[^\\])#.*/,
			lookbehind: true
		},
		'string': {
			pattern: /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"/,
			greedy: true
		},
		'variable': [
			{
				pattern: /(\$)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/,
				lookbehind: true
			},
			{
				pattern: /(\$){[^}]+}/,
				lookbehind: true
			},
			{
				pattern: /(^\s*set[ \t]+)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/m,
				lookbehind: true
			}
		],
		'function': {
			pattern: /(^\s*proc[ \t]+)[^\s]+/m,
			lookbehind: true
		},
		'builtin': [
			{
				pattern: /(^\s*)(?:proc|return|class|error|eval|exit|for|foreach|if|switch|while|break|continue)\b/m,
				lookbehind: true
			},
			/\b(?:elseif|else)\b/
		],
		'scope': {
			pattern: /(^\s*)(?:global|upvar|variable)\b/m,
			lookbehind: true,
			alias: 'constant'
		},
		'keyword': {
			pattern: /(^\s*|\[)(?:after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|lappend|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|lset|lsort|math(?:func|op)|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|Safe_Base|scan|seek|set|socket|source|split|string|subst|Tcl|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|wordBreak(?:After|Before)|test|vars)|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m,
			lookbehind: true
		},
		'operator': /!=?|\*\*?|==|&&?|\|\|?|<[=<]?|>[=>]?|[-+~\/%?^]|\b(?:eq|ne|in|ni)\b/,
		'punctuation': /[{}()\[\]]/
	};

	(function(Prism) {
		// We don't allow for pipes inside parentheses
		// to not break table pattern |(. foo |). bar |
		var modifierRegex = '(?:\\([^|)]+\\)|\\[[^\\]]+\\]|\\{[^}]+\\})+';
		var modifierTokens = {
			'css': {
				pattern: /\{[^}]+\}/,
				inside: {
					rest: Prism.languages.css
				}
			},
			'class-id': {
				pattern: /(\()[^)]+(?=\))/,
				lookbehind: true,
				alias: 'attr-value'
			},
			'lang': {
				pattern: /(\[)[^\]]+(?=\])/,
				lookbehind: true,
				alias: 'attr-value'
			},
			// Anything else is punctuation (the first pattern is for row/col spans inside tables)
			'punctuation': /[\\\/]\d+|\S/
		};


		Prism.languages.textile = Prism.languages.extend('markup', {
			'phrase': {
				pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
				lookbehind: true,
				inside: {

					// h1. Header 1
					'block-tag': {
						pattern: RegExp('^[a-z]\\w*(?:' + modifierRegex + '|[<>=()])*\\.'),
						inside: {
							'modifier': {
								pattern: RegExp('(^[a-z]\\w*)(?:' + modifierRegex + '|[<>=()])+(?=\\.)'),
								lookbehind: true,
								inside: Prism.util.clone(modifierTokens)
							},
							'tag': /^[a-z]\w*/,
							'punctuation': /\.$/
						}
					},

					// # List item
					// * List item
					'list': {
						pattern: RegExp('^[*#]+(?:' + modifierRegex + ')?\\s+.+', 'm'),
						inside: {
							'modifier': {
								pattern: RegExp('(^[*#]+)' + modifierRegex),
								lookbehind: true,
								inside: Prism.util.clone(modifierTokens)
							},
							'punctuation': /^[*#]+/
						}
					},

					// | cell | cell | cell |
					'table': {
						// Modifiers can be applied to the row: {color:red}.|1|2|3|
						// or the cell: |{color:red}.1|2|3|
						pattern: RegExp('^(?:(?:' + modifierRegex + '|[<>=()^~])+\\.\\s*)?(?:\\|(?:(?:' + modifierRegex + '|[<>=()^~_]|[\\\\/]\\d+)+\\.)?[^|]*)+\\|', 'm'),
						inside: {
							'modifier': {
								// Modifiers for rows after the first one are
								// preceded by a pipe and a line feed
								pattern: RegExp('(^|\\|(?:\\r?\\n|\\r)?)(?:' + modifierRegex + '|[<>=()^~_]|[\\\\/]\\d+)+(?=\\.)'),
								lookbehind: true,
								inside: Prism.util.clone(modifierTokens)
							},
							'punctuation': /\||^\./
						}
					},

					'inline': {
						pattern: RegExp('(\\*\\*|__|\\?\\?|[*_%@+\\-^~])(?:' + modifierRegex + ')?.+?\\1'),
						inside: {
							// Note: superscripts and subscripts are not handled specifically

							// *bold*, **bold**
							'bold': {
								pattern: RegExp('(^(\\*\\*?)(?:' + modifierRegex + ')?).+?(?=\\2)'),
								lookbehind: true
							},

							// _italic_, __italic__
							'italic': {
								pattern: RegExp('(^(__?)(?:' + modifierRegex + ')?).+?(?=\\2)'),
								lookbehind: true
							},

							// ??cite??
							'cite': {
								pattern: RegExp('(^\\?\\?(?:' + modifierRegex + ')?).+?(?=\\?\\?)'),
								lookbehind: true,
								alias: 'string'
							},

							// @code@
							'code': {
								pattern: RegExp('(^@(?:' + modifierRegex + ')?).+?(?=@)'),
								lookbehind: true,
								alias: 'keyword'
							},

							// +inserted+
							'inserted': {
								pattern: RegExp('(^\\+(?:' + modifierRegex + ')?).+?(?=\\+)'),
								lookbehind: true
							},

							// -deleted-
							'deleted': {
								pattern: RegExp('(^-(?:' + modifierRegex + ')?).+?(?=-)'),
								lookbehind: true
							},

							// %span%
							'span': {
								pattern: RegExp('(^%(?:' + modifierRegex + ')?).+?(?=%)'),
								lookbehind: true
							},

							'modifier': {
								pattern: RegExp('(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])' + modifierRegex),
								lookbehind: true,
								inside: Prism.util.clone(modifierTokens)
							},
							'punctuation': /[*_%?@+\-^~]+/
						}
					},

					// [alias]http://example.com
					'link-ref': {
						pattern: /^\[[^\]]+\]\S+$/m,
						inside: {
							'string': {
								pattern: /(\[)[^\]]+(?=\])/,
								lookbehind: true
							},
							'url': {
								pattern: /(\])\S+$/,
								lookbehind: true
							},
							'punctuation': /[\[\]]/
						}
					},

					// "text":http://example.com
					// "text":link-ref
					'link': {
						pattern: RegExp('"(?:' + modifierRegex + ')?[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'),
						inside: {
							'text': {
								pattern: RegExp('(^"(?:' + modifierRegex + ')?)[^"]+(?=")'),
								lookbehind: true
							},
							'modifier': {
								pattern: RegExp('(^")' + modifierRegex),
								lookbehind: true,
								inside: Prism.util.clone(modifierTokens)
							},
							'url': {
								pattern: /(:).+/,
								lookbehind: true
							},
							'punctuation': /[":]/
						}
					},

					// !image.jpg!
					// !image.jpg(Title)!:http://example.com
					'image': {
						pattern: RegExp('!(?:' + modifierRegex + '|[<>=()])*[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?'),
						inside: {
							'source': {
								pattern: RegExp('(^!(?:' + modifierRegex + '|[<>=()])*)[^!\\s()]+(?:\\([^)]+\\))?(?=!)'),
								lookbehind: true,
								alias: 'url'
							},
							'modifier': {
								pattern: RegExp('(^!)(?:' + modifierRegex + '|[<>=()])+'),
								lookbehind: true,
								inside: Prism.util.clone(modifierTokens)
							},
							'url': {
								pattern: /(:).+/,
								lookbehind: true
							},
							'punctuation': /[!:]/
						}
					},

					// Footnote[1]
					'footnote': {
						pattern: /\b\[\d+\]/,
						alias: 'comment',
						inside: {
							'punctuation': /\[|\]/
						}
					},

					// CSS(Cascading Style Sheet)
					'acronym': {
						pattern: /\b[A-Z\d]+\([^)]+\)/,
						inside: {
							'comment': {
								pattern: /(\()[^)]+(?=\))/,
								lookbehind: true
							},
							'punctuation': /[()]/
						}
					},

					// Prism(C)
					'mark': {
						pattern: /\b\((?:TM|R|C)\)/,
						alias: 'comment',
						inside: {
							'punctuation':/[()]/
						}
					}
				}
			}
		});

		var nestedPatterns = {
			'inline': Prism.util.clone(Prism.languages.textile['phrase'].inside['inline']),
			'link': Prism.util.clone(Prism.languages.textile['phrase'].inside['link']),
			'image': Prism.util.clone(Prism.languages.textile['phrase'].inside['image']),
			'footnote': Prism.util.clone(Prism.languages.textile['phrase'].inside['footnote']),
			'acronym': Prism.util.clone(Prism.languages.textile['phrase'].inside['acronym']),
			'mark': Prism.util.clone(Prism.languages.textile['phrase'].inside['mark'])
		};

		// Only allow alpha-numeric HTML tags, not XML tags
		Prism.languages.textile.tag.pattern = /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;

		// Allow some nesting
		Prism.languages.textile['phrase'].inside['inline'].inside['bold'].inside = nestedPatterns;
		Prism.languages.textile['phrase'].inside['inline'].inside['italic'].inside = nestedPatterns;
		Prism.languages.textile['phrase'].inside['inline'].inside['inserted'].inside = nestedPatterns;
		Prism.languages.textile['phrase'].inside['inline'].inside['deleted'].inside = nestedPatterns;
		Prism.languages.textile['phrase'].inside['inline'].inside['span'].inside = nestedPatterns;

		// Allow some styles inside table cells
		Prism.languages.textile['phrase'].inside['table'].inside['inline'] = nestedPatterns['inline'];
		Prism.languages.textile['phrase'].inside['table'].inside['link'] = nestedPatterns['link'];
		Prism.languages.textile['phrase'].inside['table'].inside['image'] = nestedPatterns['image'];
		Prism.languages.textile['phrase'].inside['table'].inside['footnote'] = nestedPatterns['footnote'];
		Prism.languages.textile['phrase'].inside['table'].inside['acronym'] = nestedPatterns['acronym'];
		Prism.languages.textile['phrase'].inside['table'].inside['mark'] = nestedPatterns['mark'];

	}(Prism));
	Prism.languages.twig = {
		'comment': /\{#[\s\S]*?#\}/,
		'tag': {
			pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
			inside: {
				'ld': {
					pattern: /^(?:\{\{-?|\{%-?\s*\w+)/,
					inside: {
						'punctuation': /^(?:\{\{|\{%)-?/,
						'keyword': /\w+/
					}
				},
				'rd': {
					pattern: /-?(?:%\}|\}\})$/,
					inside: {
						'punctuation': /.*/
					}
				},
				'string': {
					pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
					inside: {
						'punctuation': /^['"]|['"]$/
					}
				},
				'keyword': /\b(?:even|if|odd)\b/,
				'boolean': /\b(?:true|false|null)\b/,
				'number': /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][-+]?\d+)?)\b/,
				'operator': [
					{
						pattern: /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
						lookbehind: true
					},
					/[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/
				],
				'property': /\b[a-zA-Z_]\w*\b/,
				'punctuation': /[()\[\]{}:.,]/
			}
		},

		// The rest can be parsed as HTML
		'other': {
			// We want non-blank matches
			pattern: /\S(?:[\s\S]*\S)?/,
			inside: Prism.languages.markup
		}
	};

	Prism.languages.typescript = Prism.languages.extend('javascript', {
		// From JavaScript Prism keyword list and TypeScript language spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#221-reserved-words
		'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|false|true|module|declare|constructor|string|Function|any|number|boolean|Array|symbol|namespace|abstract|require|type)\b/
	});

	Prism.languages.ts = Prism.languages.typescript;
	Prism.languages.vbnet = Prism.languages.extend("basic", {
		'keyword': /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDEC|CDBL|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEFAULT|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LINE INPUT|LET|LIB|LIKE|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPERATOR|OPEN|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHORT|SINGLE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SYNCLOCK|SWAP|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
		'comment': [
			{
				pattern: /(?:!|REM\b).+/i,
				inside: {
					'keyword': /^REM/i
				}
			},
			{
				pattern: /(^|[^\\:])'.*/,
				lookbehind: true
			}
		]
	});

	Prism.languages.verilog = {
	  'comment': /\/\/.*|\/\*[\s\S]*?\*\//,
	  'string': {
	    pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
	    greedy: true
	  },
	  // support for any kernel function (ex: $display())
	  'property': /\B\$\w+\b/,
	  // support for user defined constants (ex: `define)
	  'constant': /\B`\w+\b/,
	  'function': /\w+(?=\()/,
	  // support for verilog and system verilog keywords
	  'keyword': /\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|class|case|casex|casez|cell|chandle|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endspecify|endsequence|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/,
	  // bold highlighting for all verilog and system verilog logic blocks
	  'important': /\b(?:always_latch|always_comb|always_ff|always)\b ?@?/,
	  // support for time ticks, vectors, and real numbers
	  'number': /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b\d*[._]?\d+(?:e[-+]?\d+)?/i,
	  'operator': /[-+{}^~%*\/?=!<>&|]+/,
	  'punctuation': /[[\];(),.:]/
	};
	Prism.languages.vhdl = {
		'comment': /--.+/,
		// support for all logic vectors
		'vhdl-vectors': {
			'pattern': /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i,
			'alias': 'number'
		},
		// support for operator overloading included
		'quoted-function': {
			pattern: /"\S+?"(?=\()/,
			alias: 'function'
		},
		'string': /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
		'constant': /\b(?:use|library)\b/i,
		// support for predefined attributes included
		'keyword': /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
		'boolean': /\b(?:true|false)\b/i,
		'function': /\w+(?=\()/,
		// decimal, based, physical, and exponential numbers supported
		'number': /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
		'operator': /[<>]=?|:=|[-+*/&=]|\b(?:abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|xnor|xor|nor)\b/i,
		'punctuation': /[{}[\];(),.:]/
	};

	Prism.languages.vim = {
		'string': /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
		'comment': /".*/,
		'function': /\w+(?=\()/,
		'keyword': /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
		'builtin': /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
		'number': /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
		'operator': /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
		'punctuation': /[{}[\](),;:]/
	};
	Prism.languages.wiki = Prism.languages.extend('markup', {
		'block-comment': {
			pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
			lookbehind: true,
			alias: 'comment'
		},
		'heading': {
			pattern: /^(=+).+?\1/m,
			inside: {
				'punctuation': /^=+|=+$/,
				'important': /.+/
			}
		},
		'emphasis': {
			// TODO Multi-line
			pattern: /('{2,5}).+?\1/,
			inside: {
				'bold italic': {
					pattern: /(''''').+?(?=\1)/,
					lookbehind: true
				},
				'bold': {
					pattern: /(''')[^'](?:.*?[^'])?(?=\1)/,
					lookbehind: true
				},
				'italic': {
					pattern: /('')[^'](?:.*?[^'])?(?=\1)/,
					lookbehind: true
				},
				'punctuation': /^''+|''+$/
			}
		},
		'hr': {
			pattern: /^-{4,}/m,
			alias: 'punctuation'
		},
		'url': [
			/ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:RFC|PMID) +\d+/i,
			/\[\[.+?\]\]|\[.+?\]/
		],
		'variable': [
			/__[A-Z]+__/,
			// FIXME Nested structures should be handled
			// {{formatnum:{{#expr:{{{3}}}}}}}
			/\{{3}.+?\}{3}/,
			/\{\{.+?\}\}/
		],
		'symbol': [
			/^#redirect/im,
			/~{3,5}/
		],
		// Handle table attrs:
		// {|
		// ! style="text-align:left;"| Item
		// |}
		'table-tag': {
			pattern: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m,
			lookbehind: true,
			inside: {
				'table-bar': {
					pattern: /\|$/,
					alias: 'punctuation'
				},
				rest: Prism.languages.markup['tag'].inside
			}
		},
		'punctuation': /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m
	});

	Prism.languages.insertBefore('wiki', 'tag', {
		// Prevent highlighting inside <nowiki>, <source> and <pre> tags
		'nowiki': {
			pattern: /<(nowiki|pre|source)\b[\s\S]*?>[\s\S]*?<\/\1>/i,
			inside: {
				'tag': {
					pattern: /<(?:nowiki|pre|source)\b[\s\S]*?>|<\/(?:nowiki|pre|source)>/i,
					inside: Prism.languages.markup['tag'].inside
				}
			}
		}
	});

	Prism.languages.xojo = {
		'comment': {
			pattern: /(?:'|\/\/|Rem\b).+/i,
			inside: {
				'keyword': /^Rem/i
			}
		},
		'string': {
			pattern: /"(?:""|[^"])*"/,
			greedy: true
		},
		'number': [
			/(?:\b|\B[.-])(?:\d+\.?\d*)(?:E[+-]?\d+)?/i,
			/&[bchou][a-z\d]+/i
		],
		'symbol': /#(?:If|Else|ElseIf|Endif|Pragma)\b/i,
		'keyword': /\b(?:AddHandler|App|Array|As(?:signs)?|By(?:Ref|Val)|Break|Call|Case|Catch|Const|Continue|CurrentMethodName|Declare|Dim|Do(?:wnTo)?|Each|Else(?:If)?|End|Exit|Extends|False|Finally|For|Global|If|In|Lib|Loop|Me|Next|Nil|Optional|ParamArray|Raise(?:Event)?|ReDim|Rem|RemoveHandler|Return|Select|Self|Soft|Static|Step|Super|Then|To|True|Try|Ubound|Until|Using|Wend|While)\b/i,
		'operator': /<[=>]?|>=?|[+\-*\/\\^=]|\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|Xor|WeakAddressOf)\b/i,
		'punctuation': /[.,;:()]/
	};
	Prism.languages.yaml = {
		'scalar': {
			pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
			lookbehind: true,
			alias: 'string'
		},
		'comment': /#.*/,
		'key': {
			pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
			lookbehind: true,
			alias: 'atrule'
		},
		'directive': {
			pattern: /(^[ \t]*)%.+/m,
			lookbehind: true,
			alias: 'important'
		},
		'datetime': {
			pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
			lookbehind: true,
			alias: 'number'
		},
		'boolean': {
			pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
			lookbehind: true,
			alias: 'important'
		},
		'null': {
			pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
			lookbehind: true,
			alias: 'important'
		},
		'string': {
			pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}))/m,
			lookbehind: true,
			greedy: true
		},
		'number': {
			pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+\-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
			lookbehind: true
		},
		'tag': /![^\s]+/,
		'important': /[&*][\w]+/,
		'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
	};
}

// Scroll to links that don't have URL

function scrollToLinks () {
	
	$('a[href*=\\#]:not([href=\\#])').on("click", function(e) {
		
		e.preventDefault();
		
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				// window.location.hash=$(this).attr('href');
			}
		}

	});

}
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/**
 * @license
 * Video.js 5.19.2 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.videojs=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-big-play-button"},b.prototype.handleClick=function(a){this.player_.play();var b=this.player_.getChild("controlBar"),c=b&&b.getChild("playToggle");if(!c)return void this.player_.focus();this.setTimeout(function(){c.focus()},1)},b}(i["default"]);l.prototype.controlText_="Play Video",k["default"].registerComponent("BigPlayButton",l),c["default"]=l},{2:2,5:5}],2:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=a(86),m=d(l),n=a(88),o=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"button",b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};b=(0,n.assign)({className:this.buildCSSClass()},b),"button"!==a&&(m["default"].warn("Creating a Button with an HTML element of "+a+" is deprecated; use ClickableComponent instead."),b=(0,n.assign)({tabIndex:0},b),c=(0,n.assign)({role:"button"},c)),c=(0,n.assign)({type:"button","aria-live":"polite"},c);var d=k["default"].prototype.createEl.call(this,a,b,c);return this.createControlTextEl(d),d},b.prototype.addChild=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=this.constructor.name;return m["default"].warn("Adding an actionable (user controllable) child to a Button ("+c+") is not supported; use a ClickableComponent instead."),k["default"].prototype.addChild.call(this,a,b)},b.prototype.enable=function(){a.prototype.enable.call(this),this.el_.removeAttribute("disabled")},b.prototype.disable=function(){a.prototype.disable.call(this),this.el_.setAttribute("disabled","disabled")},b.prototype.handleKeyPress=function(b){32!==b.which&&13!==b.which&&a.prototype.handleKeyPress.call(this,b)},b}(i["default"]);k["default"].registerComponent("Button",o),c["default"]=o},{3:3,5:5,86:86,88:88}],3:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(82),n=d(m),o=a(83),p=d(o),q=a(86),r=e(q),s=a(94),t=e(s),u=a(88),v=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.emitTapEvents(),e.enable(),e}return h(b,a),b.prototype.createEl=function(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};c=(0,u.assign)({className:this.buildCSSClass(),tabIndex:0},c),"button"===b&&r["default"].error("Creating a ClickableComponent with an HTML element of "+b+" is not supported; use a Button instead."),d=(0,u.assign)({role:"button","aria-live":"polite"},d),this.tabIndex_=c.tabIndex;var e=a.prototype.createEl.call(this,b,c,d);return this.createControlTextEl(e),e},b.prototype.createControlTextEl=function(a){return this.controlTextEl_=l.createEl("span",{className:"vjs-control-text"}),a&&a.appendChild(this.controlTextEl_),this.controlText(this.controlText_,a),this.controlTextEl_},b.prototype.controlText=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.el();if(!a)return this.controlText_||"Need Text";var c=this.localize(a);return this.controlText_=a,this.controlTextEl_.innerHTML=c,this.nonIconControl||b.setAttribute("title",c),this},b.prototype.buildCSSClass=function(){return"vjs-control vjs-button "+a.prototype.buildCSSClass.call(this)},b.prototype.enable=function(){return this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),"undefined"!=typeof this.tabIndex_&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on("tap",this.handleClick),this.on("click",this.handleClick),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur),this},b.prototype.disable=function(){return this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),"undefined"!=typeof this.tabIndex_&&this.el_.removeAttribute("tabIndex"),this.off("tap",this.handleClick),this.off("click",this.handleClick),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur),this},b.prototype.handleClick=function(a){},b.prototype.handleFocus=function(a){n.on(t["default"],"keydown",p.bind(this,this.handleKeyPress))},b.prototype.handleKeyPress=function(b){32===b.which||13===b.which?(b.preventDefault(),this.handleClick(b)):a.prototype.handleKeyPress&&a.prototype.handleKeyPress.call(this,b)},b.prototype.handleBlur=function(a){n.off(t["default"],"keydown",p.bind(this,this.handleKeyPress))},b}(j["default"]);j["default"].registerComponent("ClickableComponent",v),c["default"]=v},{5:5,81:81,82:82,83:83,86:86,88:88,94:94}],4:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.controlText(d&&d.controlText||g.localize("Close")),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-close-button "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.trigger({type:"close",bubbles:!1})},b}(i["default"]);k["default"].registerComponent("CloseButton",l),c["default"]=l},{2:2,5:5}],5:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(95),h=e(g),i=a(81),j=d(i),k=a(83),l=d(k),m=a(85),n=d(m),o=a(82),p=d(o),q=a(86),r=e(q),s=a(91),t=e(s),u=a(87),v=e(u),w=function(){function a(b,c,d){if(f(this,a),!b&&this.play?this.player_=b=this:this.player_=b,this.options_=(0,v["default"])({},this.options_),c=this.options_=(0,v["default"])(this.options_,c),this.id_=c.id||c.el&&c.el.id,!this.id_){var e=b&&b.id&&b.id()||"no_player";this.id_=e+"_component_"+n.newGUID()}this.name_=c.name||null,c.el?this.el_=c.el:c.createEl!==!1&&(this.el_=this.createEl()),this.children_=[],this.childIndex_={},this.childNameIndex_={},c.initChildren!==!1&&this.initChildren(),this.ready(d),c.reportTouchActivity!==!1&&this.enableTouchActivity()}return a.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var a=this.children_.length-1;a>=0;a--)this.children_[a].dispose&&this.children_[a].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.off(),this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),j.removeElData(this.el_),this.el_=null},a.prototype.player=function(){return this.player_},a.prototype.options=function(a){return r["default"].warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),a?(this.options_=(0,v["default"])(this.options_,a),this.options_):this.options_},a.prototype.el=function(){return this.el_},a.prototype.createEl=function(a,b,c){return j.createEl(a,b,c)},a.prototype.localize=function(a){var b=this.player_.language&&this.player_.language(),c=this.player_.languages&&this.player_.languages();if(!b||!c)return a;var d=c[b];if(d&&d[a])return d[a];var e=b.split("-")[0],f=c[e];return f&&f[a]?f[a]:a},a.prototype.contentEl=function(){return this.contentEl_||this.el_},a.prototype.id=function(){return this.id_},a.prototype.name=function(){return this.name_},a.prototype.children=function(){return this.children_},a.prototype.getChildById=function(a){return this.childIndex_[a]},a.prototype.getChild=function(a){if(a)return a=(0,t["default"])(a),this.childNameIndex_[a]},a.prototype.addChild=function(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.children_.length,e=void 0,f=void 0;if("string"==typeof b){f=(0,t["default"])(b),c||(c={}),c===!0&&(r["default"].warn("Initializing a child component with `true` is deprecated.Children should be defined in an array when possible, but if necessary use an object instead of `true`."),c={});var g=c.componentClass||f;c.name=f;var h=a.getComponent(g);if(!h)throw new Error("Component "+g+" does not exist");if("function"!=typeof h)return null;e=new h(this.player_||this,c)}else e=b;if(this.children_.splice(d,0,e),"function"==typeof e.id&&(this.childIndex_[e.id()]=e),f=f||e.name&&(0,t["default"])(e.name()),f&&(this.childNameIndex_[f]=e),"function"==typeof e.el&&e.el()){var i=this.contentEl().children,j=i[d]||null;this.contentEl().insertBefore(e.el(),j)}return e},a.prototype.removeChild=function(a){if("string"==typeof a&&(a=this.getChild(a)),a&&this.children_){for(var b=!1,c=this.children_.length-1;c>=0;c--)if(this.children_[c]===a){b=!0,this.children_.splice(c,1);break}if(b){this.childIndex_[a.id()]=null,this.childNameIndex_[a.name()]=null;var d=a.el();d&&d.parentNode===this.contentEl()&&this.contentEl().removeChild(a.el())}}},a.prototype.initChildren=function(){var b=this,c=this.options_.children;if(c){var d=this.options_,e=function(a){var c=a.name,e=a.opts;if(void 0!==d[c]&&(e=d[c]),e!==!1){e===!0&&(e={}),e.playerOptions=b.options_.playerOptions;var f=b.addChild(c,e);f&&(b[c]=f)}},f=void 0,g=a.getComponent("Tech");f=Array.isArray(c)?c:Object.keys(c),f.concat(Object.keys(this.options_).filter(function(a){return!f.some(function(b){return"string"==typeof b?a===b:a===b.name})})).map(function(a){var d=void 0,e=void 0;return"string"==typeof a?(d=a,e=c[d]||b.options_[d]||{}):(d=a.name,e=a),{name:d,opts:e}}).filter(function(b){var c=a.getComponent(b.opts.componentClass||(0,t["default"])(b.name));return c&&!g.isTech(c)}).forEach(e)}},a.prototype.buildCSSClass=function(){return""},a.prototype.on=function(a,b,c){var d=this;if("string"==typeof a||Array.isArray(a))p.on(this.el_,a,l.bind(this,b));else{var e=a,f=b,g=l.bind(this,c),h=function(){return d.off(e,f,g)};h.guid=g.guid,this.on("dispose",h);var i=function(){return d.off("dispose",h)};i.guid=g.guid,a.nodeName?(p.on(e,f,g),p.on(e,"dispose",i)):"function"==typeof a.on&&(e.on(f,g),e.on("dispose",i))}return this},a.prototype.off=function(a,b,c){if(!a||"string"==typeof a||Array.isArray(a))p.off(this.el_,a,b);else{var d=a,e=b,f=l.bind(this,c);this.off("dispose",f),a.nodeName?(p.off(d,e,f),p.off(d,"dispose",f)):(d.off(e,f),d.off("dispose",f))}return this},a.prototype.one=function(a,b,c){var d=this,e=arguments;if("string"==typeof a||Array.isArray(a))p.one(this.el_,a,l.bind(this,b));else{var f=a,g=b,h=l.bind(this,c),i=function j(){d.off(f,g,j),h.apply(null,e)};i.guid=h.guid,this.on(f,g,i)}return this},a.prototype.trigger=function(a,b){return p.trigger(this.el_,a,b),this},a.prototype.ready=function(a){var b=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a&&(this.isReady_?b?a.call(this):this.setTimeout(a,1):(this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(a))),this},a.prototype.triggerReady=function(){this.isReady_=!0,this.setTimeout(function(){var a=this.readyQueue_;this.readyQueue_=[],a&&a.length>0&&a.forEach(function(a){a.call(this)},this),this.trigger("ready")},1)},a.prototype.$=function(a,b){return j.$(a,b||this.contentEl())},a.prototype.$$=function(a,b){return j.$$(a,b||this.contentEl())},a.prototype.hasClass=function(a){return j.hasElClass(this.el_,a)},a.prototype.addClass=function(a){return j.addElClass(this.el_,a),this},a.prototype.removeClass=function(a){return j.removeElClass(this.el_,a),this},a.prototype.toggleClass=function(a,b){return j.toggleElClass(this.el_,a,b),this},a.prototype.show=function(){return this.removeClass("vjs-hidden"),this},a.prototype.hide=function(){return this.addClass("vjs-hidden"),this},a.prototype.lockShowing=function(){return this.addClass("vjs-lock-showing"),this},a.prototype.unlockShowing=function(){return this.removeClass("vjs-lock-showing"),this},a.prototype.getAttribute=function(a){return j.getAttribute(this.el_,a)},a.prototype.setAttribute=function(a,b){return j.setAttribute(this.el_,a,b),this},a.prototype.removeAttribute=function(a){return j.removeAttribute(this.el_,a),this},a.prototype.width=function(a,b){return this.dimension("width",a,b)},a.prototype.height=function(a,b){return this.dimension("height",a,b)},a.prototype.dimensions=function(a,b){return this.width(a,!0).height(b)},a.prototype.dimension=function(a,b,c){if(void 0!==b)return null!==b&&b===b||(b=0),(""+b).indexOf("%")!==-1||(""+b).indexOf("px")!==-1?this.el_.style[a]=b:this.el_.style[a]="auto"===b?"":b+"px",c||this.trigger("resize"),this;if(!this.el_)return 0;var d=this.el_.style[a],e=d.indexOf("px");return e!==-1?parseInt(d.slice(0,e),10):parseInt(this.el_["offset"+(0,t["default"])(a)],10)},a.prototype.currentDimension=function(a){var b=0;if("width"!==a&&"height"!==a)throw new Error("currentDimension only accepts width or height value");if("function"==typeof h["default"].getComputedStyle){var c=h["default"].getComputedStyle(this.el_);b=c.getPropertyValue(a)||c[a]}if(b=parseFloat(b),0===b){var d="offset"+(0,t["default"])(a);b=this.el_[d]}return b},a.prototype.currentDimensions=function(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}},a.prototype.currentWidth=function(){return this.currentDimension("width")},a.prototype.currentHeight=function(){return this.currentDimension("height")},a.prototype.focus=function(){this.el_.focus()},a.prototype.blur=function(){this.el_.blur()},a.prototype.emitTapEvents=function(){var a=0,b=null,c=void 0;this.on("touchstart",function(d){1===d.touches.length&&(b={pageX:d.touches[0].pageX,pageY:d.touches[0].pageY},a=(new Date).getTime(),c=!0)}),this.on("touchmove",function(a){if(a.touches.length>1)c=!1;else if(b){var d=a.touches[0].pageX-b.pageX,e=a.touches[0].pageY-b.pageY,f=Math.sqrt(d*d+e*e);f>10&&(c=!1)}});var d=function(){c=!1};this.on("touchleave",d),this.on("touchcancel",d),this.on("touchend",function(d){if(b=null,c===!0){(new Date).getTime()-a<200&&(d.preventDefault(),this.trigger("tap"))}})},a.prototype.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var a=l.bind(this.player(),this.player().reportUserActivity),b=void 0;this.on("touchstart",function(){a(),this.clearInterval(b),b=this.setInterval(a,250)});var c=function(c){a(),this.clearInterval(b)};this.on("touchmove",a),this.on("touchend",c),this.on("touchcancel",c)}},a.prototype.setTimeout=function(a,b){a=l.bind(this,a);var c=h["default"].setTimeout(a,b),d=function(){this.clearTimeout(c)};return d.guid="vjs-timeout-"+c,this.on("dispose",d),c},a.prototype.clearTimeout=function(a){h["default"].clearTimeout(a);var b=function(){};return b.guid="vjs-timeout-"+a,this.off("dispose",b),a},a.prototype.setInterval=function(a,b){a=l.bind(this,a);var c=h["default"].setInterval(a,b),d=function(){this.clearInterval(c)};return d.guid="vjs-interval-"+c,this.on("dispose",d),c},a.prototype.clearInterval=function(a){h["default"].clearInterval(a);var b=function(){};return b.guid="vjs-interval-"+a,this.off("dispose",b),a},a.registerComponent=function(b,c){if(b){if(b=(0,t["default"])(b),a.components_||(a.components_={}),"Player"===b&&a.components_[b]){var d=a.components_[b];if(d.players&&Object.keys(d.players).length>0&&Object.keys(d.players).map(function(a){return d.players[a]}).every(Boolean))throw new Error("Can not register Player component after player has been created")}return a.components_[b]=c,c}},a.getComponent=function(b){if(b)return b=(0,t["default"])(b),a.components_&&a.components_[b]?a.components_[b]:h["default"]&&h["default"].videojs&&h["default"].videojs[b]?(r["default"].warn("The "+b+" component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"),h["default"].videojs[b]):void 0},a.extend=function(b){b=b||{},r["default"].warn("Component.extend({}) has been deprecated,  use videojs.extend(Component, {}) instead");var c=b.init||b.init||this.prototype.init||this.prototype.init||function(){},d=function(){c.apply(this,arguments)};d.prototype=Object.create(this.prototype),d.prototype.constructor=d,d.extend=a.extend;for(var e in b)b.hasOwnProperty(e)&&(d.prototype[e]=b[e]);return d},a}();w.registerComponent("Component",w),c["default"]=w},{81:81,82:82,83:83,85:85,86:86,87:87,91:91,95:95}],6:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(36),i=d(h),j=a(5),k=d(j),l=a(7),m=d(l),n=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(this,b),d.tracks=c.audioTracks&&c.audioTracks();var g=f(this,a.call(this,c,d));return g.el_.setAttribute("aria-label","Audio Menu"),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-audio-button "+a.prototype.buildCSSClass.call(this)},b.prototype.createItems=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.hideThreshold_=1;var b=this.player_.audioTracks&&this.player_.audioTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];a.push(new m["default"](this.player_,{track:d,selectable:!0}))}return a},b}(i["default"]);n.prototype.controlText_="Audio Track",k["default"].registerComponent("AudioTrackButton",n),c["default"]=n},{36:36,5:5,7:7}],7:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(48),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.track,h=c.audioTracks();d.label=e.label||e.language||"Unknown",d.selected=e.enabled;var i=g(this,a.call(this,c,d));if(i.track=e,h){var j=n.bind(i,i.handleTracksChange);h.addEventListener("change",j),i.on("dispose",function(){h.removeEventListener("change",j)})}return i}return h(b,a),b.prototype.handleClick=function(b){var c=this.player_.audioTracks();if(a.prototype.handleClick.call(this,b),c)for(var d=0;d<c.length;d++){var e=c[d];e.enabled=e===this.track}},b.prototype.handleTracksChange=function(a){this.selected(this.track.enabled)},b}(j["default"]);l["default"].registerComponent("AudioTrackMenuItem",o),c["default"]=o},{48:48,5:5,83:83}],8:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(12),a(32),a(33),a(35),a(34),a(10),a(18),a(9),a(38),a(40),a(11),a(25),a(27),a(29),a(24),a(6),a(13),a(21);var j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-control-bar",dir:"ltr"},{role:"group"})},b}(i["default"]);j.prototype.options_={children:["playToggle","volumeMenuButton","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subtitlesButton","captionsButton","audioTrackButton","fullscreenToggle"]},i["default"].registerComponent("ControlBar",j),c["default"]=j},{10:10,11:11,12:12,13:13,18:18,21:21,24:24,25:25,27:27,29:29,32:32,33:33,34:34,35:35,38:38,40:40,5:5,6:6,9:9}],9:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"fullscreenchange",g.handleFullscreenChange),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleFullscreenChange=function(a){this.player_.isFullscreen()?this.controlText("Non-Fullscreen"):this.controlText("Fullscreen")},b.prototype.handleClick=function(a){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()},b}(i["default"]);l.prototype.controlText_="Fullscreen",k["default"].registerComponent("FullscreenToggle",l),c["default"]=l},{2:2,5:5}],10:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateShowing(),e.on(e.player(),"durationchange",e.updateShowing),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE")},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateShowing=function(a){this.player().duration()===1/0?this.show():this.hide()},b}(j["default"]);j["default"].registerComponent("LiveDisplay",m),c["default"]=m},{5:5,81:81}],11:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(2),j=e(i),k=a(5),l=e(k),m=a(81),n=d(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"volumechange",e.update),c.tech_&&c.tech_.featuresVolumeControl===!1&&e.addClass("vjs-hidden"),e.on(c,"loadstart",function(){this.update(),c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}),e}return h(b,a),b.prototype.buildCSSClass=function(){return"vjs-mute-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.player_.muted(!this.player_.muted())},b.prototype.update=function(a){var b=this.player_.volume(),c=3;0===b||this.player_.muted()?c=0:b<.33?c=1:b<.67&&(c=2);var d=this.player_.muted()?"Unmute":"Mute";this.controlText()!==d&&this.controlText(d);for(var e=0;e<4;e++)n.removeElClass(this.el_,"vjs-vol-"+e);n.addElClass(this.el_,"vjs-vol-"+c)},b}(j["default"]);o.prototype.controlText_="Mute",l["default"].registerComponent("MuteToggle",o),c["default"]=o},{2:2,5:5,81:81}],12:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(2),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"play",g.handlePlay),g.on(c,"pause",g.handlePause),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-play-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.player_.paused()?this.player_.play():this.player_.pause()},b.prototype.handlePlay=function(a){this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.controlText("Pause")},b.prototype.handlePause=function(a){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.controlText("Play")},b}(i["default"]);l.prototype.controlText_="Play",k["default"].registerComponent("PlayToggle",l),c["default"]=l},{2:2,5:5}],13:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(47),j=e(i),k=a(49),l=e(k),m=a(14),n=e(m),o=a(5),p=e(o),q=a(81),r=d(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateVisibility(),e.updateLabel(),e.on(c,"loadstart",e.updateVisibility),e.on(c,"ratechange",e.updateLabel),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this);return this.labelEl_=r.createEl("div",{className:"vjs-playback-rate-value",innerHTML:1}),b.appendChild(this.labelEl_),b},b.prototype.buildCSSClass=function(){return"vjs-playback-rate "+a.prototype.buildCSSClass.call(this)},b.prototype.createMenu=function(){var a=new l["default"](this.player()),b=this.playbackRates()
;if(b)for(var c=b.length-1;c>=0;c--)a.addChild(new n["default"](this.player(),{rate:b[c]+"x"}));return a},b.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},b.prototype.handleClick=function(a){for(var b=this.player().playbackRate(),c=this.playbackRates(),d=c[0],e=0;e<c.length;e++)if(c[e]>b){d=c[e];break}this.player().playbackRate(d)},b.prototype.playbackRates=function(){return this.options_.playbackRates||this.options_.playerOptions&&this.options_.playerOptions.playbackRates},b.prototype.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0},b.prototype.updateVisibility=function(a){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},b.prototype.updateLabel=function(a){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},b}(j["default"]);s.prototype.controlText_="Playback Rate",p["default"].registerComponent("PlaybackRateMenuButton",s),c["default"]=s},{14:14,47:47,49:49,5:5,81:81}],14:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(48),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b);var g=d.rate,h=parseFloat(g,10);d.label=g,d.selected=1===h,d.selectable=!0;var i=f(this,a.call(this,c,d));return i.label=g,i.rate=h,i.on(c,"ratechange",i.update),i}return g(b,a),b.prototype.handleClick=function(b){a.prototype.handleClick.call(this),this.player().playbackRate(this.rate)},b.prototype.update=function(a){this.selected(this.player().playbackRate()===this.rate)},b}(i["default"]);l.prototype.contentElType="button",k["default"].registerComponent("PlaybackRateMenuItem",l),c["default"]=l},{48:48,5:5}],15:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.partEls_=[],e.on(c,"progress",e.update),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},b.prototype.update=function(a){var b=this.player_.buffered(),c=this.player_.duration(),d=this.player_.bufferedEnd(),e=this.partEls_,f=function(a,b){var c=a/b||0;return 100*(c>=1?1:c)+"%"};this.el_.style.width=f(d,c);for(var g=0;g<b.length;g++){var h=b.start(g),i=b.end(g),j=e[g];j||(j=this.el_.appendChild(l.createEl()),e[g]=j),j.style.left=f(h,d),j.style.width=f(i-h,d)}for(var k=e.length;k>b.length;k--)this.el_.removeChild(e[k-1]);e.length=b.length},b}(j["default"]);j["default"].registerComponent("LoadProgressBar",m),c["default"]=m},{5:5,81:81}],16:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(84),p=e(o),q=a(80),r=e(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&(e.tooltip=l.createEl("div",{className:"vjs-time-tooltip"}),e.el().appendChild(e.tooltip),e.addClass("vjs-keep-tooltips-inside")),e.update(0,0),c.on("ready",function(){e.on(c.controlBar.progressControl.el(),"mousemove",n.throttle(n.bind(e,e.handleMouseMove),25))}),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})},b.prototype.handleMouseMove=function(a){var b=this.player_.duration(),c=this.calculateDistance(a)*b,d=a.pageX-l.findElPosition(this.el().parentNode).left;this.update(c,d)},b.prototype.update=function(a,b){var c=(0,p["default"])(a,this.player_.duration());if(this.el().style.left=b+"px",this.el().setAttribute("data-current-time",c),this.keepTooltipsInside){var d=this.clampPosition_(b),e=b-d+1,f=parseFloat((0,r["default"])(this.tooltip,"width")),g=f/2;this.tooltip.innerHTML=c,this.tooltip.style.right="-"+(g-e)+"px"}},b.prototype.calculateDistance=function(a){return l.getPointerPosition(this.el().parentNode,a).x},b.prototype.clampPosition_=function(a){if(!this.keepTooltipsInside)return a;var b=parseFloat((0,r["default"])(this.player().el(),"width")),c=parseFloat((0,r["default"])(this.tooltip,"width")),d=c/2,e=a;return a<d?e=Math.ceil(d):a>b-d&&(e=Math.floor(b-d)),e},b}(j["default"]);j["default"].registerComponent("MouseTimeDisplay",s),c["default"]=s},{5:5,80:80,81:81,83:83,84:84}],17:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(83),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateDataAttr(),e.on(c,"timeupdate",e.updateDataAttr),c.ready(l.bind(e,e.updateDataAttr)),d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&e.addClass("vjs-keep-tooltips-inside"),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},b.prototype.updateDataAttr=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.setAttribute("data-current-time",(0,n["default"])(b,this.player_.duration()))},b}(j["default"]);j["default"].registerComponent("PlayProgressBar",o),c["default"]=o},{5:5,83:83,84:84}],18:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(19),a(16);var j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},b}(i["default"]);j.prototype.options_={children:["seekBar"]},i["default"].registerComponent("ProgressControl",j),c["default"]=j},{16:16,19:19,5:5}],19:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(57),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=a(84),p=e(o),q=a(80),r=e(q);a(15),a(17),a(20);var s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateProgress),e.on(c,"ended",e.updateProgress),c.ready(n.bind(e,e.updateProgress)),d.playerOptions&&d.playerOptions.controlBar&&d.playerOptions.controlBar.progressControl&&d.playerOptions.controlBar.progressControl.keepTooltipsInside&&(e.keepTooltipsInside=d.playerOptions.controlBar.progressControl.keepTooltipsInside),e.keepTooltipsInside&&(e.tooltipProgressBar=e.addChild("TooltipProgressBar")),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":"progress bar"})},b.prototype.updateProgress=function(a){if(this.updateAriaAttributes(this.el_),this.keepTooltipsInside){this.updateAriaAttributes(this.tooltipProgressBar.el_),this.tooltipProgressBar.el_.style.width=this.bar.el_.style.width;var b=parseFloat((0,r["default"])(this.player().el(),"width")),c=parseFloat((0,r["default"])(this.tooltipProgressBar.tooltip,"width")),d=this.tooltipProgressBar.el().style;d.maxWidth=Math.floor(b-c/2)+"px",d.minWidth=Math.ceil(c/2)+"px",d.right="-"+c/2+"px"}},b.prototype.updateAriaAttributes=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();a.setAttribute("aria-valuenow",(100*this.getPercent()).toFixed(2)),a.setAttribute("aria-valuetext",(0,p["default"])(b,this.player_.duration()))},b.prototype.getPercent=function(){var a=this.player_.currentTime()/this.player_.duration();return a>=1?1:a},b.prototype.handleMouseDown=function(b){this.player_.scrubbing(!0),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),a.prototype.handleMouseDown.call(this,b)},b.prototype.handleMouseMove=function(a){var b=this.calculateDistance(a)*this.player_.duration();b===this.player_.duration()&&(b-=.1),this.player_.currentTime(b)},b.prototype.handleMouseUp=function(b){a.prototype.handleMouseUp.call(this,b),this.player_.scrubbing(!1),this.videoWasPlaying&&this.player_.play()},b.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},b.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},b}(j["default"]);s.prototype.options_={children:["loadProgressBar","mouseTimeDisplay","playProgressBar"],barName:"playProgressBar"},s.prototype.playerEvent="timeupdate",l["default"].registerComponent("SeekBar",s),c["default"]=s},{15:15,17:17,20:20,5:5,57:57,80:80,83:83,84:84}],20:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(83),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.updateDataAttr(),e.on(c,"timeupdate",e.updateDataAttr),c.ready(l.bind(e,e.updateDataAttr)),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-tooltip-progress-bar vjs-slider-bar",innerHTML:'<div class="vjs-time-tooltip"></div>\n        <span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"});return this.tooltip=b.querySelector(".vjs-time-tooltip"),b},b.prototype.updateDataAttr=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),c=(0,n["default"])(b,this.player_.duration());this.el_.setAttribute("data-current-time",c),this.tooltip.innerHTML=c},b}(j["default"]);j["default"].registerComponent("TooltipProgressBar",o),c["default"]=o},{5:5,83:83,84:84}],21:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(22),i=d(h),j=a(5),k=d(j),l=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-custom-control-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,{className:this.buildCSSClass()});return b.innerHTML="&nbsp;",b},b}(i["default"]);k["default"].registerComponent("CustomControlSpacer",l),c["default"]=l},{22:22,5:5}],22:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b}(i["default"]);i["default"].registerComponent("Spacer",j),c["default"]=j},{5:5}],23:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(31),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b),d.track={player:c,kind:d.kind,label:d.kind+" settings",selectable:!1,"default":!1,mode:"disabled"},d.selectable=!1;var g=f(this,a.call(this,c,d));return g.addClass("vjs-texttrack-settings"),g.controlText(", opens "+d.kind+" settings dialog"),g}return g(b,a),b.prototype.handleClick=function(a){this.player().getChild("textTrackSettings").show(),this.player().getChild("textTrackSettings").el_.focus()},b}(i["default"]);k["default"].registerComponent("CaptionSettingsMenuItem",l),c["default"]=l},{31:31,5:5}],24:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=a(23),m=d(l),n=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Captions Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-captions-button "+a.prototype.buildCSSClass.call(this)},b.prototype.createItems=function(){var b=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||(b.push(new m["default"](this.player_,{kind:this.kind_})),this.hideThreshold_+=1),a.prototype.createItems.call(this,b)},b}(i["default"]);n.prototype.kind_="captions",n.prototype.controlText_="Captions",k["default"].registerComponent("CaptionsButton",n),c["default"]=n},{23:23,30:30,5:5}],25:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=a(26),m=d(l),n=a(91),o=d(n),p=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Chapters Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-chapters-button "+a.prototype.buildCSSClass.call(this)},b.prototype.update=function(b){this.track_&&(!b||"addtrack"!==b.type&&"removetrack"!==b.type)||this.setTrack(this.findChaptersTrack()),a.prototype.update.call(this)},b.prototype.setTrack=function(a){if(this.track_!==a){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){var b=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);b&&b.removeEventListener("load",this.updateHandler_),this.track_=null}if(this.track_=a,this.track_){this.track_.mode="hidden";var c=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);c&&c.addEventListener("load",this.updateHandler_)}}},b.prototype.findChaptersTrack=function(){for(var a=this.player_.textTracks()||[],b=a.length-1;b>=0;b--){var c=a[b];if(c.kind===this.kind_)return c}},b.prototype.getMenuCaption=function(){return this.track_&&this.track_.label?this.track_.label:this.localize((0,o["default"])(this.kind_))},b.prototype.createMenu=function(){return this.options_.title=this.getMenuCaption(),a.prototype.createMenu.call(this)},b.prototype.createItems=function(){var a=[];if(!this.track_)return a;var b=this.track_.cues;if(!b)return a;for(var c=0,d=b.length;c<d;c++){var e=b[c],f=new m["default"](this.player_,{track:this.track_,cue:e});a.push(f)}return a},b}(i["default"]);p.prototype.kind_="chapters",p.prototype.controlText_="Chapters",k["default"].registerComponent("ChaptersButton",p),c["default"]=p},{26:26,30:30,5:5,91:91}],26:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(48),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.track,h=d.cue,i=c.currentTime();d.selectable=!0,d.label=h.text,d.selected=h.startTime<=i&&i<h.endTime;var j=g(this,a.call(this,c,d));return j.track=e,j.cue=h,e.addEventListener("cuechange",n.bind(j,j.update)),j}return h(b,a),b.prototype.handleClick=function(b){a.prototype.handleClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},b.prototype.update=function(a){var b=this.cue,c=this.player_.currentTime();this.selected(b.startTime<=c&&c<b.endTime)},b}(j["default"]);l["default"].registerComponent("ChaptersTrackMenuItem",o),c["default"]=o},{48:48,5:5,83:83}],27:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(30),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d,e){f(this,b);var h=g(this,a.call(this,c,d,e));h.el_.setAttribute("aria-label","Descriptions Menu");var i=c.textTracks();if(i){var j=n.bind(h,h.handleTracksChange);i.addEventListener("change",j),h.on("dispose",function(){i.removeEventListener("change",j)})}return h}return h(b,a),b.prototype.handleTracksChange=function(a){for(var b=this.player().textTracks(),c=!1,d=0,e=b.length;d<e;d++){var f=b[d];if(f.kind!==this.kind_&&"showing"===f.mode){c=!0;break}}c?this.disable():this.enable()},b.prototype.buildCSSClass=function(){return"vjs-descriptions-button "+a.prototype.buildCSSClass.call(this)},b}(j["default"]);o.prototype.kind_="descriptions",o.prototype.controlText_="Descriptions",l["default"].registerComponent("DescriptionsButton",o),c["default"]=o},{30:30,5:5,83:83}],28:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(31),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d){e(this,b),d.track={player:c,kind:d.kind,label:d.kind+" off","default":!1,mode:"disabled"},d.selectable=!0;var g=f(this,a.call(this,c,d));return g.selected(!0),g}return g(b,a),b.prototype.handleTracksChange=function(a){for(var b=this.player().textTracks(),c=!0,d=0,e=b.length;d<e;d++){var f=b[d];if(f.kind===this.track.kind&&"showing"===f.mode){c=!1;break}}this.selected(c)},b}(i["default"]);k["default"].registerComponent("OffTextTrackMenuItem",l),c["default"]=l},{31:31,5:5}],29:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(30),i=d(h),j=a(5),k=d(j),l=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));return h.el_.setAttribute("aria-label","Subtitles Menu"),h}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-subtitles-button "+a.prototype.buildCSSClass.call(this)},b}(i["default"]);l.prototype.kind_="subtitles",l.prototype.controlText_="Subtitles",k["default"].registerComponent("SubtitlesButton",l),c["default"]=l},{30:30,5:5}],30:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(36),i=d(h),j=a(5),k=d(j),l=a(31),m=d(l),n=a(28),o=d(n),p=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e(this,b),d.tracks=c.textTracks(),f(this,a.call(this,c,d))}return g(b,a),b.prototype.createItems=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];a.push(new o["default"](this.player_,{kind:this.kind_})),this.hideThreshold_+=1;var b=this.player_.textTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];d.kind===this.kind_&&a.push(new m["default"](this.player_,{track:d,selectable:!0}))}return a},b}(i["default"]);k["default"].registerComponent("TextTrackButton",p),c["default"]=p},{28:28,31:31,36:36,5:5}],31:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},j=a(48),k=e(j),l=a(5),m=e(l),n=a(83),o=d(n),p=a(95),q=e(p),r=a(94),s=e(r),t=function(a){function b(c,d){f(this,b);var e=d.track,h=c.textTracks();d.label=e.label||e.language||"Unknown",d.selected=e["default"]||"showing"===e.mode;var j=g(this,a.call(this,c,d));if(j.track=e,h){var k=o.bind(j,j.handleTracksChange);c.on(["loadstart","texttrackchange"],k),h.addEventListener("change",k),j.on("dispose",function(){h.removeEventListener("change",k)})}if(h&&void 0===h.onchange){var l=void 0;j.on(["tap","click"],function(){if("object"!==i(q["default"].Event))try{l=new q["default"].Event("change")}catch(a){}l||(l=s["default"].createEvent("Event"),l.initEvent("change",!0,!0)),h.dispatchEvent(l)})}return j}return h(b,a),b.prototype.handleClick=function(b){var c=this.track.kind,d=this.player_.textTracks();if(a.prototype.handleClick.call(this,b),d)for(var e=0;e<d.length;e++){var f=d[e];f.kind===c&&(f===this.track?f.mode="showing":f.mode="disabled")}},b.prototype.handleTracksChange=function(a){this.selected("showing"===this.track.mode)},b}(k["default"]);m["default"].registerComponent("TextTrackMenuItem",t),c["default"]=t},{48:48,5:5,83:83,94:94,95:95}],32:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{
constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-current-time vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){var b=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),c=this.localize("Current Time"),d=(0,n["default"])(b,this.player_.duration());d!==this.formattedTime_&&(this.formattedTime_=d,this.contentEl_.innerHTML='<span class="vjs-control-text">'+c+"</span> "+d)},b}(j["default"]);j["default"].registerComponent("CurrentTimeDisplay",o),c["default"]=o},{5:5,81:81,84:84}],33:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"durationchange",e.updateContent),e.on(c,"timeupdate",e.updateContent),e.on(c,"loadedmetadata",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-duration vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> 0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){var b=this.player_.duration();if(b&&this.duration_!==b){this.duration_=b;var c=this.localize("Duration Time"),d=(0,n["default"])(b);this.contentEl_.innerHTML='<span class="vjs-control-text">'+c+"</span> "+d}},b}(j["default"]);j["default"].registerComponent("DurationDisplay",o),c["default"]=o},{5:5,81:81,84:84}],34:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(84),n=e(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"timeupdate",e.updateContent),e.on(c,"durationchange",e.updateContent),e}return h(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-remaining-time vjs-time-control vjs-control"});return this.contentEl_=l.createEl("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(a){if(this.player_.duration()){var b=this.localize("Remaining Time"),c=(0,n["default"])(this.player_.remainingTime());c!==this.formattedTime_&&(this.formattedTime_=c,this.contentEl_.innerHTML='<span class="vjs-control-text">'+b+"</span> -"+c)}},b}(j["default"]);j["default"].registerComponent("RemainingTimeDisplay",o),c["default"]=o},{5:5,81:81,84:84}],35:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},b}(i["default"]);i["default"].registerComponent("TimeDivider",j),c["default"]=j},{5:5}],36:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(47),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=function(a){function b(c,d){f(this,b);var e=d.tracks,h=g(this,a.call(this,c,d));if(h.items.length<=1&&h.hide(),!e)return g(h);var i=n.bind(h,h.update);return e.addEventListener("removetrack",i),e.addEventListener("addtrack",i),h.player_.on("dispose",function(){e.removeEventListener("removetrack",i),e.removeEventListener("addtrack",i)}),h}return h(b,a),b}(j["default"]);l["default"].registerComponent("TrackButton",o),c["default"]=o},{47:47,5:5,83:83}],37:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(57),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m);a(39);var o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.on(c,"volumechange",e.updateARIAAttributes),c.ready(n.bind(e,e.updateARIAAttributes)),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":"volume level"})},b.prototype.handleMouseMove=function(a){this.checkMuted(),this.player_.volume(this.calculateDistance(a))},b.prototype.checkMuted=function(){this.player_.muted()&&this.player_.muted(!1)},b.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},b.prototype.stepForward=function(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)},b.prototype.stepBack=function(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)},b.prototype.updateARIAAttributes=function(a){var b=(100*this.player_.volume()).toFixed(2);this.el_.setAttribute("aria-valuenow",b),this.el_.setAttribute("aria-valuetext",b+"%")},b}(j["default"]);o.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},o.prototype.playerEvent="volumechange",l["default"].registerComponent("VolumeBar",o),c["default"]=o},{39:39,5:5,57:57,83:83}],38:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h);a(37);var j=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return c.tech_&&c.tech_.featuresVolumeControl===!1&&g.addClass("vjs-hidden"),g.on(c,"loadstart",function(){c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}),g}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control"})},b}(i["default"]);j.prototype.options_={children:["volumeBar"]},i["default"].registerComponent("VolumeControl",j),c["default"]=j},{37:37,5:5}],39:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},b}(i["default"]);i["default"].registerComponent("VolumeLevel",j),c["default"]=j},{5:5}],40:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(83),j=e(i),k=a(5),l=d(k),m=a(54),n=d(m),o=a(53),p=d(o),q=a(11),r=d(q),s=a(37),t=d(s),u=function(a){function b(c){function d(){c.tech_&&c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,b),void 0===e.inline&&(e.inline=!0),void 0===e.vertical&&(e.inline?e.vertical=!1:e.vertical=!0),e.volumeBar=e.volumeBar||{},e.volumeBar.vertical=!!e.vertical;var h=g(this,a.call(this,c,e));return h.on(c,"volumechange",h.volumeUpdate),h.on(c,"loadstart",h.volumeUpdate),d.call(h),h.on(c,"loadstart",d),h.on(h.volumeBar,["slideractive","focus"],function(){this.addClass("vjs-slider-active")}),h.on(h.volumeBar,["sliderinactive","blur"],function(){this.removeClass("vjs-slider-active")}),h.on(h.volumeBar,["focus"],function(){this.addClass("vjs-lock-showing")}),h.on(h.volumeBar,["blur"],function(){this.removeClass("vjs-lock-showing")}),h}return h(b,a),b.prototype.buildCSSClass=function(){var b="";return b=this.options_.vertical?"vjs-volume-menu-button-vertical":"vjs-volume-menu-button-horizontal","vjs-volume-menu-button "+a.prototype.buildCSSClass.call(this)+" "+b},b.prototype.createPopup=function(){var a=new n["default"](this.player_,{contentElType:"div"}),b=new t["default"](this.player_,this.options_.volumeBar);return a.addChild(b),this.menuContent=a,this.volumeBar=b,this.attachVolumeBarEvents(),a},b.prototype.handleClick=function(b){r["default"].prototype.handleClick.call(this),a.prototype.handleClick.call(this)},b.prototype.attachVolumeBarEvents=function(){this.menuContent.on(["mousedown","touchdown"],j.bind(this,this.handleMouseDown))},b.prototype.handleMouseDown=function(a){this.on(["mousemove","touchmove"],j.bind(this.volumeBar,this.volumeBar.handleMouseMove)),this.on(this.el_.ownerDocument,["mouseup","touchend"],this.handleMouseUp)},b.prototype.handleMouseUp=function(a){this.off(["mousemove","touchmove"],j.bind(this.volumeBar,this.volumeBar.handleMouseMove))},b}(p["default"]);u.prototype.volumeUpdate=r["default"].prototype.update,u.prototype.controlText_="Mute",l["default"].registerComponent("VolumeMenuButton",u),c["default"]=u},{11:11,37:37,5:5,53:53,54:54,83:83}],41:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=a(50),k=d(j),l=a(87),m=d(l),n=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.on(c,"error",g.open),g}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-error-display "+a.prototype.buildCSSClass.call(this)},b.prototype.content=function(){var a=this.player().error();return a?this.localize(a.message):""},b}(k["default"]);n.prototype.options_=(0,m["default"])(k["default"].prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),i["default"].registerComponent("ErrorDisplay",n),c["default"]=n},{5:5,50:50,87:87}],42:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0;var e=a(82),f=d(e),g=function(){};g.prototype.allowedEvents_={},g.prototype.on=function(a,b){var c=this.addEventListener;this.addEventListener=function(){},f.on(this,a,b),this.addEventListener=c},g.prototype.addEventListener=g.prototype.on,g.prototype.off=function(a,b){f.off(this,a,b)},g.prototype.removeEventListener=g.prototype.off,g.prototype.one=function(a,b){var c=this.addEventListener;this.addEventListener=function(){},f.one(this,a,b),this.addEventListener=c},g.prototype.trigger=function(a){var b=a.type||a;"string"==typeof a&&(a={type:b}),a=f.fixEvent(a),this.allowedEvents_[b]&&this["on"+b]&&this["on"+b](a),f.trigger(this,a)},g.prototype.dispatchEvent=g.prototype.trigger,c["default"]=g},{82:82}],43:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f=a(86),g=d(f),h=a(88),i=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+(void 0===b?"undefined":e(b)));a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(a.super_=b)},j=function(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=function(){a.apply(this,arguments)},d={};(0,h.isObject)(b)?("function"==typeof b.init&&(g["default"].warn("Constructor logic via init() is deprecated; please use constructor() instead."),b.constructor=b.init),b.constructor!==Object.prototype.constructor&&(c=b.constructor),d=b):"function"==typeof b&&(c=b),i(c,a);for(var e in d)d.hasOwnProperty(e)&&(c.prototype[e]=d[e]);return c};c["default"]=j},{86:86,88:88}],44:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;for(var e=a(94),f=d(e),g={},h=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],i=h[0],j=void 0,k=0;k<h.length;k++)if(h[k][1]in f["default"]){j=h[k];break}if(j)for(var l=0;l<j.length;l++)g[i[l]]=j[l];c["default"]=g},{94:94}],45:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=function(a){function b(){return e(this,b),f(this,a.apply(this,arguments))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner",dir:"ltr"})},b}(i["default"]);i["default"].registerComponent("LoadingSpinner",j),c["default"]=j},{5:5}],46:[function(a,b,c){"use strict";function d(a){if(a instanceof d)return a;"number"==typeof a?this.code=a:"string"==typeof a?this.message=a:(0,e.isObject)(a)&&("number"==typeof a.code&&(this.code=a.code),(0,e.assign)(this,a)),this.message||(this.message=d.defaultMessages[this.code]||"")}c.__esModule=!0;var e=a(88);d.prototype.code=0,d.prototype.message="",d.prototype.status=null,d.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],d.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(var f=0;f<d.errorTypes.length;f++)d[d.errorTypes[f]]=f,d.prototype[d.errorTypes[f]]=f;c["default"]=d},{88:88}],47:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(3),j=e(i),k=a(5),l=e(k),m=a(49),n=e(m),o=a(81),p=d(o),q=a(83),r=d(q),s=a(91),t=e(s),u=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f(this,b);var e=g(this,a.call(this,c,d));return e.update(),e.enabled_=!0,e.el_.setAttribute("aria-haspopup","true"),e.el_.setAttribute("role","menuitem"),e.on("keydown",e.handleSubmenuKeyPress),e}return h(b,a),b.prototype.update=function(){var a=this.createMenu();this.menu&&this.removeChild(this.menu),this.menu=a,this.addChild(a),this.buttonPressed_=!1,this.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?this.hide():this.show()},b.prototype.createMenu=function(){var a=new n["default"](this.player_);if(this.hideThreshold_=0,this.options_.title){var b=p.createEl("li",{className:"vjs-menu-title",innerHTML:(0,t["default"])(this.options_.title),tabIndex:-1});this.hideThreshold_+=1,a.children_.unshift(b),p.insertElFirst(b,a.contentEl())}if(this.items=this.createItems(),this.items)for(var c=0;c<this.items.length;c++)a.addItem(this.items[c]);return a},b.prototype.createItems=function(){},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b.prototype.buildCSSClass=function(){var b="vjs-menu-button";return b+=this.options_.inline===!0?"-inline":"-popup","vjs-menu-button "+b+" "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(a){this.one(this.menu.contentEl(),"mouseleave",r.bind(this,function(a){this.unpressButton(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},b.prototype.handleKeyPress=function(b){27===b.which||9===b.which?(this.buttonPressed_&&this.unpressButton(),9!==b.which&&b.preventDefault()):38===b.which||40===b.which?this.buttonPressed_||(this.pressButton(),b.preventDefault()):a.prototype.handleKeyPress.call(this,b)},b.prototype.handleSubmenuKeyPress=function(a){27!==a.which&&9!==a.which||(this.buttonPressed_&&this.unpressButton(),9!==a.which&&a.preventDefault())},b.prototype.pressButton=function(){this.enabled_&&(this.buttonPressed_=!0,this.menu.lockShowing(),this.el_.setAttribute("aria-expanded","true"),this.menu.focus())},b.prototype.unpressButton=function(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-expanded","false"),this.el_.focus())},b.prototype.disable=function(){return this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-expanded","false"),this.enabled_=!1,a.prototype.disable.call(this)},b.prototype.enable=function(){return this.enabled_=!0,a.prototype.enable.call(this)},b}(j["default"]);l["default"].registerComponent("MenuButton",u),c["default"]=u},{3:3,49:49,5:5,81:81,83:83,91:91}],48:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=a(88),m=function(a){function b(c,d){e(this,b);var g=f(this,a.call(this,c,d));return g.selectable=d.selectable,g.selected(d.selected),g.selectable?g.el_.setAttribute("role","menuitemcheckbox"):g.el_.setAttribute("role","menuitem"),g}return g(b,a),b.prototype.createEl=function(b,c,d){return this.nonIconControl=!0,a.prototype.createEl.call(this,"li",(0,l.assign)({className:"vjs-menu-item",innerHTML:this.localize(this.options_.label),tabIndex:-1},c),d)},b.prototype.handleClick=function(a){this.selected(!0)},b.prototype.selected=function(a){this.selectable&&(a?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected")):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(" ")))},b}(i["default"]);k["default"].registerComponent("MenuItem",m),c["default"]=m},{3:3,5:5,88:88}],49:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(82),p=d(o),q=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.focusedChild_=-1,e.on("keydown",e.handleKeyPress),e}return h(b,a),b.prototype.addItem=function(a){this.addChild(a),a.on("click",n.bind(this,function(a){this.unlockShowing()}))},b.prototype.createEl=function(){var b=this.options_.contentElType||"ul";this.contentEl_=l.createEl(b,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");var c=a.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return c.setAttribute("role","presentation"),c.appendChild(this.contentEl_),p.on(c,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),c},b.prototype.handleKeyPress=function(a){37===a.which||40===a.which?(a.preventDefault(),this.stepForward()):38!==a.which&&39!==a.which||(a.preventDefault(),this.stepBack())},b.prototype.stepForward=function(){var a=0;void 0!==this.focusedChild_&&(a=this.focusedChild_+1),this.focus(a)},b.prototype.stepBack=function(){var a=0;void 0!==this.focusedChild_&&(a=this.focusedChild_-1),this.focus(a)},b.prototype.focus=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,b=this.children().slice();b.length&&b[0].className&&/vjs-menu-title/.test(b[0].className)&&b.shift(),b.length>0&&(a<0?a=0:a>=b.length&&(a=b.length-1),this.focusedChild_=a,b[a].el_.focus())},b}(j["default"]);j["default"].registerComponent("Menu",q),c["default"]=q},{5:5,81:81,82:82,83:83}],50:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(81),j=e(i),k=a(83),l=e(k),m=a(5),n=d(m),o=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.opened_=e.hasBeenOpened_=e.hasBeenFilled_=!1,e.closeable(!e.options_.uncloseable),e.content(e.options_.content),e.contentEl_=j.createEl("div",{className:"vjs-modal-dialog-content"},{role:"document"}),e.descEl_=j.createEl("p",{className:"vjs-modal-dialog-description vjs-offscreen",id:e.el().getAttribute("aria-describedby")}),j.textContent(e.descEl_,e.description()),e.el_.appendChild(e.descEl_),e.el_.appendChild(e.contentEl_),e}return h(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":this.id()+"_description","aria-hidden":"true","aria-label":this.label(),role:"dialog"})},b.prototype.buildCSSClass=function(){return"vjs-modal-dialog vjs-hidden "+a.prototype.buildCSSClass.call(this)},b.prototype.handleKeyPress=function(a){27===a.which&&this.closeable()&&this.close()},b.prototype.label=function(){return this.options_.label||this.localize("Modal Window")},b.prototype.description=function(){var a=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(a+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),a},b.prototype.open=function(){if(!this.opened_){var a=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!a.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&a.pause(),this.closeable()&&this.on(this.el_.ownerDocument,"keydown",l.bind(this,this.handleKeyPress)),a.controls(!1),this.show(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}return this},b.prototype.opened=function(a){return"boolean"==typeof a&&this[a?"open":"close"](),this.opened_},b.prototype.close=function(){if(this.opened_){var a=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&a.play(),this.closeable()&&this.off(this.el_.ownerDocument,"keydown",l.bind(this,this.handleKeyPress)),a.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.options_.temporary&&this.dispose()}return this},b.prototype.closeable=function c(a){if("boolean"==typeof a){var c=this.closeable_=!!a,b=this.getChild("closeButton");if(c&&!b){var d=this.contentEl_;this.contentEl_=this.el_,b=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=d,this.on(b,"close",this.close)}!c&&b&&(this.off(b,"close",this.close),this.removeChild(b),b.dispose())}return this.closeable_},b.prototype.fill=function(){return this.fillWith(this.content())},b.prototype.fillWith=function(a){
var b=this.contentEl(),c=b.parentNode,d=b.nextSibling;return this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,c.removeChild(b),this.empty(),j.insertContent(b,a),this.trigger("modalfill"),d?c.insertBefore(b,d):c.appendChild(b),this},b.prototype.empty=function(){return this.trigger("beforemodalempty"),j.emptyEl(this.contentEl()),this.trigger("modalempty"),this},b.prototype.content=function(a){return void 0!==a&&(this.content_=a),this.content_},b}(n["default"]);o.prototype.options_={pauseOnOpen:!0,temporary:!0},n["default"].registerComponent("ModalDialog",o),c["default"]=o},{5:5,81:81,83:83}],51:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(94),l=e(k),m=a(95),n=e(m),o=a(82),p=d(o),q=a(81),r=d(q),s=a(83),t=d(s),u=a(85),v=d(u),w=a(78),x=d(w),y=a(86),z=e(y),A=a(91),B=e(A),C=a(90),D=a(79),E=a(89),F=d(E),G=a(44),H=e(G),I=a(46),J=e(I),K=a(97),L=e(K),M=a(88),N=a(87),O=e(N),P=a(69),Q=e(P),R=a(50),S=e(R),T=a(62),U=e(T),V=a(63),W=e(V),X=a(76),Y=e(X);a(61),a(59),a(55),a(68),a(45),a(1),a(4),a(8),a(41),a(71),a(60);var Z=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","ratechange","volumechange","texttrackchange"],$=function(a){function b(c,d,e){if(f(this,b),c.id=c.id||"vjs_video_"+v.newGUID(),d=(0,M.assign)(b.getTagSettings(c),d),d.initChildren=!1,d.createEl=!1,d.reportTouchActivity=!1,!d.language)if("function"==typeof c.closest){var h=c.closest("[lang]");h&&(d.language=h.getAttribute("lang"))}else for(var i=c;i&&1===i.nodeType;){if(r.getElAttributes(i).hasOwnProperty("lang")){d.language=i.getAttribute("lang");break}i=i.parentNode}var j=g(this,a.call(this,null,d,e));if(!j.options_||!j.options_.techOrder||!j.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(j.tag=c,j.tagAttributes=c&&r.getElAttributes(c),j.language(j.options_.language),d.languages){var k={};Object.getOwnPropertyNames(d.languages).forEach(function(a){k[a.toLowerCase()]=d.languages[a]}),j.languages_=k}else j.languages_=b.prototype.options_.languages;j.cache_={},j.poster_=d.poster||"",j.controls_=!!d.controls,c.controls=!1,j.scrubbing_=!1,j.el_=j.createEl();var l=(0,O["default"])(j.options_);if(d.plugins){var m=d.plugins;Object.getOwnPropertyNames(m).forEach(function(a){"function"==typeof this[a]?this[a](m[a]):z["default"].error("Unable to find plugin:",a)},j)}return j.options_.playerOptions=l,j.initChildren(),j.isAudio("audio"===c.nodeName.toLowerCase()),j.controls()?j.addClass("vjs-controls-enabled"):j.addClass("vjs-controls-disabled"),j.el_.setAttribute("role","region"),j.isAudio()?j.el_.setAttribute("aria-label","audio player"):j.el_.setAttribute("aria-label","video player"),j.isAudio()&&j.addClass("vjs-audio"),j.flexNotSupported_()&&j.addClass("vjs-no-flex"),x.IS_IOS||j.addClass("vjs-workinghover"),b.players[j.id_]=j,j.userActive(!0),j.reportUserActivity(),j.listenForUserActivity_(),j.on("fullscreenchange",j.handleFullscreenChange_),j.on("stageclick",j.handleStageClick_),j}return h(b,a),b.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),this.styleEl_&&this.styleEl_.parentNode&&this.styleEl_.parentNode.removeChild(this.styleEl_),b.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&this.tech_.dispose(),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var b=this.tag,c=void 0,d=this.playerElIngest_=b.parentNode&&b.parentNode.hasAttribute&&b.parentNode.hasAttribute("data-vjs-player");c=this.el_=d?b.parentNode:a.prototype.createEl.call(this,"div"),b.setAttribute("tabindex","-1"),b.removeAttribute("width"),b.removeAttribute("height");var e=r.getElAttributes(b);if(Object.getOwnPropertyNames(e).forEach(function(a){"class"===a?c.className+=" "+e[a]:c.setAttribute(a,e[a])}),b.playerId=b.id,b.id+="_html5_api",b.className="vjs-tech",b.player=c.player=this,this.addClass("vjs-paused"),n["default"].VIDEOJS_NO_DYNAMIC_STYLE!==!0){this.styleEl_=F.createStyleElement("vjs-styles-dimensions");var f=r.$(".vjs-styles-defaults"),g=r.$("head");g.insertBefore(this.styleEl_,f?f.nextSibling:g.firstChild)}this.width(this.options_.width),this.height(this.options_.height),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio);for(var h=b.getElementsByTagName("a"),i=0;i<h.length;i++){var j=h.item(i);r.addElClass(j,"vjs-hidden"),j.setAttribute("hidden","hidden")}return b.initNetworkState_=b.networkState,b.parentNode&&!d&&b.parentNode.insertBefore(c,b),r.insertElFirst(b,c),this.children_.unshift(b),this.el_=c,c},b.prototype.width=function(a){return this.dimension("width",a)},b.prototype.height=function(a){return this.dimension("height",a)},b.prototype.dimension=function(a,b){var c=a+"_";if(void 0===b)return this[c]||0;if(""===b)this[c]=void 0;else{var d=parseFloat(b);if(isNaN(d))return z["default"].error('Improper value "'+b+'" supplied for for '+a),this;this[c]=d}return this.updateStyleEl_(),this},b.prototype.fluid=function(a){if(void 0===a)return!!this.fluid_;this.fluid_=!!a,a?this.addClass("vjs-fluid"):this.removeClass("vjs-fluid"),this.updateStyleEl_()},b.prototype.aspectRatio=function(a){if(void 0===a)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(a))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=a,this.fluid(!0),this.updateStyleEl_()},b.prototype.updateStyleEl_=function(){if(n["default"].VIDEOJS_NO_DYNAMIC_STYLE===!0){var a="number"==typeof this.width_?this.width_:this.options_.width,b="number"==typeof this.height_?this.height_:this.options_.height,c=this.tech_&&this.tech_.el();return void(c&&(a>=0&&(c.width=a),b>=0&&(c.height=b)))}var d=void 0,e=void 0,f=void 0,g=void 0;f=void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:this.videoWidth()>0?this.videoWidth()+":"+this.videoHeight():"16:9";var h=f.split(":"),i=h[1]/h[0];d=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/i:this.videoWidth()||300,e=void 0!==this.height_?this.height_:d*i,g=/^[^a-zA-Z]/.test(this.id())?"dimensions-"+this.id():this.id()+"-dimensions",this.addClass(g),F.setTextContent(this.styleEl_,"\n      ."+g+" {\n        width: "+d+"px;\n        height: "+e+"px;\n      }\n\n      ."+g+".vjs-fluid {\n        padding-top: "+100*i+"%;\n      }\n    ")},b.prototype.loadTech_=function(a,b){var c=this;this.tech_&&this.unloadTech_(),"Html5"!==a&&this.tag&&(U["default"].getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=a,this.isReady_=!1;var d=(0,M.assign)({source:b,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:this.id()+"_"+a+"_api",videoTracks:this.videoTracks_,textTracks:this.textTracks_,audioTracks:this.audioTracks_,autoplay:this.options_.autoplay,preload:this.options_.preload,loop:this.options_.loop,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"]},this.options_[a.toLowerCase()]);this.tag&&(d.tag=this.tag),b&&(this.currentType_=b.type,b.src===this.cache_.src&&this.cache_.currentTime>0&&(d.startTime=this.cache_.currentTime),this.cache_.sources=null,this.cache_.source=b,this.cache_.src=b.src);var e=U["default"].getTech(a);e||(e=j["default"].getComponent(a)),this.tech_=new e(d),this.tech_.ready(t.bind(this,this.handleTechReady_),!0),Q["default"].jsonToTextTracks(this.textTracksJson_||[],this.tech_),Z.forEach(function(a){c.on(c.tech_,a,c["handleTech"+(0,B["default"])(a)+"_"])}),this.on(this.tech_,"loadstart",this.handleTechLoadStart_),this.on(this.tech_,"waiting",this.handleTechWaiting_),this.on(this.tech_,"canplay",this.handleTechCanPlay_),this.on(this.tech_,"canplaythrough",this.handleTechCanPlayThrough_),this.on(this.tech_,"playing",this.handleTechPlaying_),this.on(this.tech_,"ended",this.handleTechEnded_),this.on(this.tech_,"seeking",this.handleTechSeeking_),this.on(this.tech_,"seeked",this.handleTechSeeked_),this.on(this.tech_,"play",this.handleTechPlay_),this.on(this.tech_,"firstplay",this.handleTechFirstPlay_),this.on(this.tech_,"pause",this.handleTechPause_),this.on(this.tech_,"durationchange",this.handleTechDurationChange_),this.on(this.tech_,"fullscreenchange",this.handleTechFullscreenChange_),this.on(this.tech_,"error",this.handleTechError_),this.on(this.tech_,"loadedmetadata",this.updateStyleEl_),this.on(this.tech_,"posterchange",this.handleTechPosterChange_),this.on(this.tech_,"textdata",this.handleTechTextData_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode===this.el()||"Html5"===a&&this.tag||r.insertElFirst(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)},b.prototype.unloadTech_=function(){this.videoTracks_=this.videoTracks(),this.textTracks_=this.textTracks(),this.audioTracks_=this.audioTracks(),this.textTracksJson_=Q["default"].textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1},b.prototype.tech=function(a){if(a&&a.IWillNotUseThisInPlugins)return this.tech_;var b="\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ";throw n["default"].alert(b),new Error(b)},b.prototype.addTechControlsListeners_=function(){this.removeTechControlsListeners_(),this.on(this.tech_,"mousedown",this.handleTechClick_),this.on(this.tech_,"touchstart",this.handleTechTouchStart_),this.on(this.tech_,"touchmove",this.handleTechTouchMove_),this.on(this.tech_,"touchend",this.handleTechTouchEnd_),this.on(this.tech_,"tap",this.handleTechTap_)},b.prototype.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.handleTechTap_),this.off(this.tech_,"touchstart",this.handleTechTouchStart_),this.off(this.tech_,"touchmove",this.handleTechTouchMove_),this.off(this.tech_,"touchend",this.handleTechTouchEnd_),this.off(this.tech_,"mousedown",this.handleTechClick_)},b.prototype.handleTechReady_=function(){if(this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_(),(this.src()||this.currentSrc())&&this.tag&&this.options_.autoplay&&this.paused()){try{delete this.tag.poster}catch(a){(0,z["default"])("deleting tag.poster throws in some browsers",a)}this.play()}},b.prototype.handleTechLoadStart_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-seeking"),this.error(null),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):(this.trigger("loadstart"),this.trigger("firstplay"))},b.prototype.hasStarted=function(a){return void 0!==a?(this.hasStarted_!==a&&(this.hasStarted_=a,a?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started")),this):!!this.hasStarted_},b.prototype.handleTechPlay_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")},b.prototype.handleTechWaiting_=function(){var a=this;this.addClass("vjs-waiting"),this.trigger("waiting"),this.one("timeupdate",function(){return a.removeClass("vjs-waiting")})},b.prototype.handleTechCanPlay_=function(){this.removeClass("vjs-waiting"),this.trigger("canplay")},b.prototype.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")},b.prototype.handleTechPlaying_=function(){this.removeClass("vjs-waiting"),this.trigger("playing")},b.prototype.handleTechSeeking_=function(){this.addClass("vjs-seeking"),this.trigger("seeking")},b.prototype.handleTechSeeked_=function(){this.removeClass("vjs-seeking"),this.trigger("seeked")},b.prototype.handleTechFirstPlay_=function(){this.options_.starttime&&(z["default"].warn("Passing the `starttime` option to the player will be deprecated in 6.0"),this.currentTime(this.options_.starttime)),this.addClass("vjs-has-started"),this.trigger("firstplay")},b.prototype.handleTechPause_=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")},b.prototype.handleTechEnded_=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")},b.prototype.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))},b.prototype.handleTechClick_=function(a){0===a.button&&this.controls()&&(this.paused()?this.play():this.pause())},b.prototype.handleTechTap_=function(){this.userActive(!this.userActive())},b.prototype.handleTechTouchStart_=function(){this.userWasActive=this.userActive()},b.prototype.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()},b.prototype.handleTechTouchEnd_=function(a){a.preventDefault()},b.prototype.handleFullscreenChange_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},b.prototype.handleStageClick_=function(){this.reportUserActivity()},b.prototype.handleTechFullscreenChange_=function(a,b){b&&this.isFullscreen(b.isFullscreen),this.trigger("fullscreenchange")},b.prototype.handleTechError_=function(){var a=this.tech_.error();this.error(a)},b.prototype.handleTechTextData_=function(){var a=null;arguments.length>1&&(a=arguments[1]),this.trigger("textdata",a)},b.prototype.getCache=function(){return this.cache_},b.prototype.techCall_=function(a,b){if(this.tech_&&!this.tech_.isReady_)this.tech_.ready(function(){this[a](b)},!0);else try{this.tech_&&this.tech_[a](b)}catch(c){throw(0,z["default"])(c),c}},b.prototype.techGet_=function(a){if(this.tech_&&this.tech_.isReady_)try{return this.tech_[a]()}catch(b){throw void 0===this.tech_[a]?(0,z["default"])("Video.js: "+a+" method not defined for "+this.techName_+" playback technology.",b):"TypeError"===b.name?((0,z["default"])("Video.js: "+a+" unavailable on "+this.techName_+" playback technology element.",b),this.tech_.isReady_=!1):(0,z["default"])(b),b}},b.prototype.play=function(){return this.src()||this.currentSrc()?this.techCall_("play"):this.tech_.one("loadstart",function(){this.play()}),this},b.prototype.pause=function(){return this.techCall_("pause"),this},b.prototype.paused=function(){return this.techGet_("paused")!==!1},b.prototype.scrubbing=function(a){return void 0!==a?(this.scrubbing_=!!a,a?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing"),this):this.scrubbing_},b.prototype.currentTime=function(a){return void 0!==a?(this.techCall_("setCurrentTime",a),this):(this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime)},b.prototype.duration=function(a){return void 0===a?this.cache_.duration||0:(a=parseFloat(a)||0,a<0&&(a=1/0),a!==this.cache_.duration&&(this.cache_.duration=a,a===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),this.trigger("durationchange")),this)},b.prototype.remainingTime=function(){return this.duration()-this.currentTime()},b.prototype.buffered=function c(){var c=this.techGet_("buffered");return c&&c.length||(c=(0,C.createTimeRange)(0,0)),c},b.prototype.bufferedPercent=function(){return(0,D.bufferedPercent)(this.buffered(),this.duration())},b.prototype.bufferedEnd=function(){var a=this.buffered(),b=this.duration(),c=a.end(a.length-1);return c>b&&(c=b),c},b.prototype.volume=function(a){var b=void 0;return void 0!==a?(b=Math.max(0,Math.min(1,parseFloat(a))),this.cache_.volume=b,this.techCall_("setVolume",b),this):(b=parseFloat(this.techGet_("volume")),isNaN(b)?1:b)},b.prototype.muted=function(a){return void 0!==a?(this.techCall_("setMuted",a),this):this.techGet_("muted")||!1},b.prototype.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1},b.prototype.isFullscreen=function(a){return void 0!==a?(this.isFullscreen_=!!a,this):!!this.isFullscreen_},b.prototype.requestFullscreen=function(){var a=H["default"];return this.isFullscreen(!0),a.requestFullscreen?(p.on(l["default"],a.fullscreenchange,t.bind(this,function b(c){this.isFullscreen(l["default"][a.fullscreenElement]),this.isFullscreen()===!1&&p.off(l["default"],a.fullscreenchange,b),this.trigger("fullscreenchange")})),this.el_[a.requestFullscreen]()):this.tech_.supportsFullScreen()?this.techCall_("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.exitFullscreen=function(){var a=H["default"];return this.isFullscreen(!1),a.requestFullscreen?l["default"][a.exitFullscreen]():this.tech_.supportsFullScreen()?this.techCall_("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=l["default"].documentElement.style.overflow,p.on(l["default"],"keydown",t.bind(this,this.fullWindowOnEscKey)),l["default"].documentElement.style.overflow="hidden",r.addElClass(l["default"].body,"vjs-full-window"),this.trigger("enterFullWindow")},b.prototype.fullWindowOnEscKey=function(a){27===a.keyCode&&(this.isFullscreen()===!0?this.exitFullscreen():this.exitFullWindow())},b.prototype.exitFullWindow=function(){this.isFullWindow=!1,p.off(l["default"],"keydown",this.fullWindowOnEscKey),l["default"].documentElement.style.overflow=this.docOrigOverflow,r.removeElClass(l["default"].body,"vjs-full-window"),this.trigger("exitFullWindow")},b.prototype.canPlayType=function(a){for(var b=void 0,c=0,d=this.options_.techOrder;c<d.length;c++){var e=(0,B["default"])(d[c]),f=U["default"].getTech(e);if(f||(f=j["default"].getComponent(e)),f){if(f.isSupported()&&(b=f.canPlayType(a)))return b}else z["default"].error('The "'+e+'" tech is undefined. Skipped browser support check for that tech.')}return""},b.prototype.selectSource=function(a){var b=this,c=this.options_.techOrder.map(B["default"]).map(function(a){return[a,U["default"].getTech(a)||j["default"].getComponent(a)]}).filter(function(a){var b=a[0],c=a[1];return c?c.isSupported():(z["default"].error('The "'+b+'" tech is undefined. Skipped browser support check for that tech.'),!1)}),d=function(a,b,c){var d=void 0;return a.some(function(a){return b.some(function(b){if(d=c(a,b))return!0})}),d},e=void 0,f=function(a){return function(b,c){return a(c,b)}},g=function(a,c){var d=a[0];if(a[1].canPlaySource(c,b.options_[d.toLowerCase()]))return{source:c,tech:d}};return e=this.options_.sourceOrder?d(a,c,f(g)):d(c,a,g),e||!1},b.prototype.src=function(a){if(void 0===a)return this.techGet_("src");var b=U["default"].getTech(this.techName_);return b||(b=j["default"].getComponent(this.techName_)),Array.isArray(a)?this.sourceList_(a):"string"==typeof a?this.src({src:a}):a instanceof Object&&(a.type&&!b.canPlaySource(a,this.options_[this.techName_.toLowerCase()])?this.sourceList_([a]):(this.cache_.sources=null,this.cache_.source=a,this.cache_.src=a.src,this.currentType_=a.type||"",this.ready(function(){b.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",a):this.techCall_("src",a.src),"auto"===this.options_.preload&&this.load(),this.options_.autoplay&&this.play()},!0))),this},b.prototype.sourceList_=function(a){var b=this.selectSource(a);b?(b.tech===this.techName_?this.src(b.source):this.loadTech_(b.tech,b.source),this.cache_.sources=a):(this.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0),this.triggerReady())},b.prototype.load=function(){return this.techCall_("load"),this},b.prototype.reset=function(){return this.loadTech_((0,B["default"])(this.options_.techOrder[0]),null),this.techCall_("reset"),this},b.prototype.currentSources=function(){var a=this.currentSource(),b=[];return 0!==Object.keys(a).length&&b.push(a),this.cache_.sources||b},b.prototype.currentSource=function(){var a={},b=this.currentSrc();return b&&(a.src=b),this.cache_.source||a},b.prototype.currentSrc=function(){return this.techGet_("currentSrc")||this.cache_.src||""},b.prototype.currentType=function(){return this.currentType_||""},b.prototype.preload=function(a){return void 0!==a?(this.techCall_("setPreload",a),this.options_.preload=a,this):this.techGet_("preload")},b.prototype.autoplay=function(a){return void 0!==a?(this.techCall_("setAutoplay",a),this.options_.autoplay=a,this):this.techGet_("autoplay",a)},b.prototype.loop=function(a){return void 0!==a?(this.techCall_("setLoop",a),this.options_.loop=a,this):this.techGet_("loop")},b.prototype.poster=function(a){return void 0===a?this.poster_:(a||(a=""),this.poster_=a,this.techCall_("setPoster",a),this.trigger("posterchange"),this)},b.prototype.handleTechPosterChange_=function(){!this.poster_&&this.tech_&&this.tech_.poster&&(this.poster_=this.tech_.poster()||"",this.trigger("posterchange"))},b.prototype.controls=function(a){return void 0!==a?(a=!!a,this.controls_!==a&&(this.controls_=a,this.usingNativeControls()&&this.techCall_("setControls",a),a?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_())),this):!!this.controls_},b.prototype.usingNativeControls=function(a){return void 0!==a?(a=!!a,this.usingNativeControls_!==a&&(this.usingNativeControls_=a,a?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols"))),this):!!this.usingNativeControls_},b.prototype.error=function(a){return void 0===a?this.error_||null:null===a?(this.error_=a,this.removeClass("vjs-error"),this.errorDisplay&&this.errorDisplay.close(),this):(this.error_=new J["default"](a),this.addClass("vjs-error"),z["default"].error("(CODE:"+this.error_.code+" "+J["default"].errorTypes[this.error_.code]+")",this.error_.message,this.error_),this.trigger("error"),this)},b.prototype.reportUserActivity=function(a){this.userActivity_=!0},b.prototype.userActive=function(a){return void 0!==a?(a=!!a,a!==this.userActive_&&(this.userActive_=a,a?(this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive")):(this.userActivity_=!1,this.tech_&&this.tech_.one("mousemove",function(a){a.stopPropagation(),a.preventDefault()}),this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive"))),this):this.userActive_},b.prototype.listenForUserActivity_=function(){var a=void 0,b=void 0,c=void 0,d=t.bind(this,this.reportUserActivity),e=function(a){a.screenX===b&&a.screenY===c||(b=a.screenX,c=a.screenY,d())},f=function(){d(),this.clearInterval(a),a=this.setInterval(d,250)},g=function(b){d(),this.clearInterval(a)};this.on("mousedown",f),this.on("mousemove",e),this.on("mouseup",g),this.on("keydown",d),this.on("keyup",d);var h=void 0;this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(h);var a=this.options_.inactivityTimeout;a>0&&(h=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},a))}},250)},b.prototype.playbackRate=function(a){return void 0!==a?(this.techCall_("setPlaybackRate",a),this):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("playbackRate"):1},b.prototype.isAudio=function(a){return void 0!==a?(this.isAudio_=!!a,this):!!this.isAudio_},b.prototype.videoTracks=function(){return this.tech_?this.tech_.videoTracks():(this.videoTracks_=this.videoTracks_||new Y["default"],this.videoTracks_)},b.prototype.audioTracks=function(){return this.tech_?this.tech_.audioTracks():(this.audioTracks_=this.audioTracks_||new W["default"],this.audioTracks_)},b.prototype.textTracks=function(){if(this.tech_)return this.tech_.textTracks()},b.prototype.remoteTextTracks=function(){if(this.tech_)return this.tech_.remoteTextTracks()},b.prototype.remoteTextTrackEls=function(){if(this.tech_)return this.tech_.remoteTextTrackEls()},b.prototype.addTextTrack=function(a,b,c){if(this.tech_)return this.tech_.addTextTrack(a,b,c)},b.prototype.addRemoteTextTrack=function(a,b){if(this.tech_)return this.tech_.addRemoteTextTrack(a,b)},b.prototype.removeRemoteTextTrack=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=a.track,c=void 0===b?arguments[0]:b;if(this.tech_)return this.tech_.removeRemoteTextTrack(c)},b.prototype.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0},b.prototype.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0},b.prototype.language=function(a){return void 0===a?this.language_:(this.language_=String(a).toLowerCase(),this)},b.prototype.languages=function(){return(0,O["default"])(b.prototype.options_.languages,this.languages_)},b.prototype.toJSON=function(){var a=(0,O["default"])(this.options_),b=a.tracks;a.tracks=[];for(var c=0;c<b.length;c++){var d=b[c];d=(0,O["default"])(d),d.player=void 0,a.tracks[c]=d}return a},b.prototype.createModal=function(a,b){var c=this;b=b||{},b.content=a||"";var d=new S["default"](this,b);return this.addChild(d),d.on("dispose",function(){c.removeChild(d)}),d.open()},b.getTagSettings=function(a){var b={sources:[],tracks:[]},c=r.getElAttributes(a),d=c["data-setup"];if(r.hasElClass(a,"vjs-fluid")&&(c.fluid=!0),null!==d){var e=(0,L["default"])(d||"{}"),f=e[0],g=e[1];f&&z["default"].error(f),(0,M.assign)(c,g)}if((0,M.assign)(b,c),a.hasChildNodes())for(var h=a.childNodes,i=0,j=h.length;i<j;i++){var k=h[i],l=k.nodeName.toLowerCase();"source"===l?b.sources.push(r.getElAttributes(k)):"track"===l&&b.tracks.push(r.getElAttributes(k))}return b},b.prototype.flexNotSupported_=function(){var a=l["default"].createElement("i");return!("flexBasis"in a.style||"webkitFlexBasis"in a.style||"mozFlexBasis"in a.style||"msFlexBasis"in a.style||"msFlexOrder"in a.style)},b}(j["default"]);$.players={};var _=n["default"].navigator;$.prototype.options_={techOrder:["html5","flash"],html5:{},flash:{},defaultVolume:0,inactivityTimeout:2e3,playbackRates:[],children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],language:_&&(_.languages&&_.languages[0]||_.userLanguage||_.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media."},["ended","seeking","seekable","networkState","readyState"].forEach(function(a){$.prototype[a]=function(){return this.techGet_(a)}}),Z.forEach(function(a){$.prototype["handleTech"+(0,B["default"])(a)+"_"]=function(){return this.trigger(a)}}),j["default"].registerComponent("Player",$),c["default"]=$},{1:1,4:4,41:41,44:44,45:45,46:46,5:5,50:50,55:55,59:59,60:60,61:61,62:62,63:63,68:68,69:69,71:71,76:76,78:78,79:79,8:8,81:81,82:82,83:83,85:85,86:86,87:87,88:88,89:89,90:90,91:91,94:94,95:95,97:97}],52:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a(51),f=d(e),g=function(a,b){f["default"].prototype[a]=b};c["default"]=g},{51:51}],53:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(3),i=d(h),j=a(5),k=d(j),l=function(a){function b(c){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e(this,b);var g=f(this,a.call(this,c,d));return g.update(),g}return g(b,a),b.prototype.update=function(){var a=this.createPopup();this.popup&&this.removeChild(this.popup),this.popup=a,this.addChild(a),this.items&&0===this.items.length?this.hide():this.items&&this.items.length>1&&this.show()},b.prototype.createPopup=function(){},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b.prototype.buildCSSClass=function(){var b="vjs-menu-button";return b+=this.options_.inline===!0?"-inline":"-popup","vjs-menu-button "+b+" "+a.prototype.buildCSSClass.call(this)},b}(i["default"]);k["default"].registerComponent("PopupButton",l),c["default"]=l},{3:3,5:5}],54:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(83),n=d(m),o=a(82),p=d(o),q=function(a){function b(){return f(this,b),g(this,a.apply(this,arguments))}return h(b,a),b.prototype.addItem=function(a){this.addChild(a),a.on("click",n.bind(this,function(){this.unlockShowing()}))},b.prototype.createEl=function(){var b=this.options_.contentElType||"ul";this.contentEl_=l.createEl(b,{className:"vjs-menu-content"});var c=a.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return c.appendChild(this.contentEl_),p.on(c,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),c},b}(j["default"]);j["default"].registerComponent("Popup",q),c["default"]=q},{5:5,81:81,82:82,83:83}],55:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(3),j=e(i),k=a(5),l=e(k),m=a(83),n=d(m),o=a(81),p=d(o),q=a(78),r=d(q),s=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d))
;return e.update(),c.on("posterchange",n.bind(e,e.update)),e}return h(b,a),b.prototype.dispose=function(){this.player().off("posterchange",this.update),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=p.createEl("div",{className:"vjs-poster",tabIndex:-1});return r.BACKGROUND_SIZE_SUPPORTED||(this.fallbackImg_=p.createEl("img"),a.appendChild(this.fallbackImg_)),a},b.prototype.update=function(a){var b=this.player().poster();this.setSrc(b),b?this.show():this.hide()},b.prototype.setSrc=function(a){if(this.fallbackImg_)this.fallbackImg_.src=a;else{var b="";a&&(b='url("'+a+'")'),this.el_.style.backgroundImage=b}},b.prototype.handleClick=function(a){this.player_.controls()&&(this.player_.paused()?this.player_.play():this.player_.pause())},b}(j["default"]);l["default"].registerComponent("PosterImage",s),c["default"]=s},{3:3,5:5,78:78,81:81,83:83}],56:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){b&&(p=b),n["default"].setTimeout(q,a)}c.__esModule=!0,c.hasLoaded=c.autoSetupTimeout=c.autoSetup=void 0;var g=a(81),h=e(g),i=a(82),j=e(i),k=a(94),l=d(k),m=a(95),n=d(m),o=!1,p=void 0,q=function(){if(h.isReal()){var a=l["default"].getElementsByTagName("video"),b=l["default"].getElementsByTagName("audio"),c=[];if(a&&a.length>0)for(var d=0,e=a.length;d<e;d++)c.push(a[d]);if(b&&b.length>0)for(var g=0,i=b.length;g<i;g++)c.push(b[g]);if(c&&c.length>0)for(var j=0,k=c.length;j<k;j++){var m=c[j];if(!m||!m.getAttribute){f(1);break}if(void 0===m.player){var n=m.getAttribute("data-setup");null!==n&&p(m)}}else o||f(1)}};h.isReal()&&"complete"===l["default"].readyState?o=!0:j.one(n["default"],"load",function(){o=!0});var r=function(){return o};c.autoSetup=q,c.autoSetupTimeout=f,c.hasLoaded=r},{81:81,82:82,94:94,95:95}],57:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(5),j=e(i),k=a(81),l=d(k),m=a(88),n=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.bar=e.getChild(e.options_.barName),e.vertical(!!e.options_.vertical),e.on("mousedown",e.handleMouseDown),e.on("touchstart",e.handleMouseDown),e.on("focus",e.handleFocus),e.on("blur",e.handleBlur),e.on("click",e.handleClick),e.on(c,"controlsvisible",e.update),e.on(c,e.playerEvent,e.update),e}return h(b,a),b.prototype.createEl=function(b){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return c.className=c.className+" vjs-slider",c=(0,m.assign)({tabIndex:0},c),d=(0,m.assign)({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},d),a.prototype.createEl.call(this,b,c,d)},b.prototype.handleMouseDown=function(a){var b=this.bar.el_.ownerDocument;a.preventDefault(),l.blockTextSelection(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(b,"mousemove",this.handleMouseMove),this.on(b,"mouseup",this.handleMouseUp),this.on(b,"touchmove",this.handleMouseMove),this.on(b,"touchend",this.handleMouseUp),this.handleMouseMove(a)},b.prototype.handleMouseMove=function(a){},b.prototype.handleMouseUp=function(){var a=this.bar.el_.ownerDocument;l.unblockTextSelection(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(a,"mousemove",this.handleMouseMove),this.off(a,"mouseup",this.handleMouseUp),this.off(a,"touchmove",this.handleMouseMove),this.off(a,"touchend",this.handleMouseUp),this.update()},b.prototype.update=function(){if(this.el_){var a=this.getPercent(),b=this.bar;if(b){("number"!=typeof a||a!==a||a<0||a===1/0)&&(a=0);var c=(100*a).toFixed(2)+"%";this.vertical()?b.el().style.height=c:b.el().style.width=c}}},b.prototype.calculateDistance=function(a){var b=l.getPointerPosition(this.el_,a);return this.vertical()?b.y:b.x},b.prototype.handleFocus=function(){this.on(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},b.prototype.handleKeyPress=function(a){37===a.which||40===a.which?(a.preventDefault(),this.stepBack()):38!==a.which&&39!==a.which||(a.preventDefault(),this.stepForward())},b.prototype.handleBlur=function(){this.off(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},b.prototype.handleClick=function(a){a.stopImmediatePropagation(),a.preventDefault()},b.prototype.vertical=function(a){return void 0===a?this.vertical_||!1:(this.vertical_=!!a,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal"),this)},b}(j["default"]);j["default"].registerComponent("Slider",n),c["default"]=n},{5:5,81:81,88:88}],58:[function(a,b,c){"use strict";function d(a){return a.streamingFormats={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},a.streamFromParts=function(a,b){return a+"&"+b},a.streamToParts=function(a){var b={connection:"",stream:""};if(!a)return b;var c=a.search(/&(?!\w+=)/),d=void 0;return c!==-1?d=c+1:(c=d=a.lastIndexOf("/")+1,0===c&&(c=d=a.length)),b.connection=a.substring(0,c),b.stream=a.substring(d,a.length),b},a.isStreamingType=function(b){return b in a.streamingFormats},a.RTMP_RE=/^rtmp[set]?:\/\//i,a.isStreamingSrc=function(b){return a.RTMP_RE.test(b)},a.rtmpSourceHandler={},a.rtmpSourceHandler.canPlayType=function(b){return a.isStreamingType(b)?"maybe":""},a.rtmpSourceHandler.canHandleSource=function(b,c){var d=a.rtmpSourceHandler.canPlayType(b.type);return d?d:a.isStreamingSrc(b.src)?"maybe":""},a.rtmpSourceHandler.handleSource=function(b,c,d){var e=a.streamToParts(b.src);c.setRtmpConnection(e.connection),c.setRtmpStream(e.stream)},a.registerSourceHandler(a.rtmpSourceHandler),a}c.__esModule=!0,c["default"]=d},{}],59:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a){A["set"+(a.charAt(0).toUpperCase()+a.slice(1))]=function(b){return this.el_.vjs_setProperty(a,b)}}function j(a){A[a]=function(){return this.el_.vjs_getProperty(a)}}c.__esModule=!0;for(var k=a(62),l=e(k),m=a(81),n=d(m),o=a(92),p=d(o),q=a(90),r=a(58),s=e(r),t=a(5),u=e(t),v=a(95),w=e(v),x=a(88),y=w["default"].navigator,z=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return c.source&&e.ready(function(){this.setSource(c.source)},!0),c.startTime&&e.ready(function(){this.load(),this.play(),this.currentTime(c.startTime)},!0),w["default"].videojs=w["default"].videojs||{},w["default"].videojs.Flash=w["default"].videojs.Flash||{},w["default"].videojs.Flash.onReady=b.onReady,w["default"].videojs.Flash.onEvent=b.onEvent,w["default"].videojs.Flash.onError=b.onError,e.on("seeked",function(){this.lastSeekTarget_=void 0}),e}return h(b,a),b.prototype.createEl=function(){var a=this.options_;if(!a.swf){a.swf="//vjs.zencdn.net/swf/5.3.0/video-js.swf"}var c=a.techId,d=(0,x.assign)({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.preload,loop:a.loop,muted:a.muted},a.flashVars),e=(0,x.assign)({wmode:"opaque",bgcolor:"#000000"},a.params),f=(0,x.assign)({id:c,name:c,"class":"vjs-tech"},a.attributes);return this.el_=b.embed(a.swf,d,e,f),this.el_.tech=this,this.el_},b.prototype.play=function(){this.ended()&&this.setCurrentTime(0),this.el_.vjs_play()},b.prototype.pause=function(){this.el_.vjs_pause()},b.prototype.src=function(a){return void 0===a?this.currentSrc():this.setSrc(a)},b.prototype.setSrc=function(a){var b=this;a=p.getAbsoluteURL(a),this.el_.vjs_src(a),this.autoplay()&&this.setTimeout(function(){return b.play()},0)},b.prototype.seeking=function(){return void 0!==this.lastSeekTarget_},b.prototype.setCurrentTime=function(b){var c=this.seekable();c.length&&(b=b>c.start(0)?b:c.start(0),b=b<c.end(c.length-1)?b:c.end(c.length-1),this.lastSeekTarget_=b,this.trigger("seeking"),this.el_.vjs_setProperty("currentTime",b),a.prototype.setCurrentTime.call(this))},b.prototype.currentTime=function(){return this.seeking()?this.lastSeekTarget_||0:this.el_.vjs_getProperty("currentTime")},b.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.vjs_getProperty("currentSrc")},b.prototype.duration=function c(){if(0===this.readyState())return NaN;var c=this.el_.vjs_getProperty("duration");return c>=0?c:1/0},b.prototype.load=function(){this.el_.vjs_load()},b.prototype.poster=function(){this.el_.vjs_getProperty("poster")},b.prototype.setPoster=function(){},b.prototype.seekable=function(){var a=this.duration();return 0===a?(0,q.createTimeRange)():(0,q.createTimeRange)(0,a)},b.prototype.buffered=function(){var a=this.el_.vjs_getProperty("buffered");return 0===a.length?(0,q.createTimeRange)():(0,q.createTimeRange)(a[0][0],a[0][1])},b.prototype.supportsFullScreen=function(){return!1},b.prototype.enterFullScreen=function(){return!1},b}(l["default"]),A=z.prototype,B="rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),C="networkState,readyState,initialTime,startOffsetTime,paused,ended,videoWidth,videoHeight".split(","),D=0;D<B.length;D++)j(B[D]),i(B[D]);for(var E=0;E<C.length;E++)j(C[E]);z.isSupported=function(){return z.version()[0]>=10},l["default"].withSourceHandlers(z),z.nativeSourceHandler={},z.nativeSourceHandler.canPlayType=function(a){return a in z.formats?"maybe":""},z.nativeSourceHandler.canHandleSource=function(a,b){function c(a){var b=p.getFileExtension(a);return b?"video/"+b:""}var d=void 0;return d=a.type?a.type.replace(/;.*/,"").toLowerCase():c(a.src),z.nativeSourceHandler.canPlayType(d)},z.nativeSourceHandler.handleSource=function(a,b,c){b.setSrc(a.src)},z.nativeSourceHandler.dispose=function(){},z.registerSourceHandler(z.nativeSourceHandler),z.formats={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},z.onReady=function(a){var b=n.getEl(a),c=b&&b.tech;c&&c.el()&&z.checkReady(c)},z.checkReady=function(a){a.el()&&(a.el().vjs_getProperty?a.triggerReady():this.setTimeout(function(){z.checkReady(a)},50))},z.onEvent=function(a,b){var c=n.getEl(a).tech,d=Array.prototype.slice.call(arguments,2);c.setTimeout(function(){c.trigger(b,d)},1)},z.onError=function(a,b){var c=n.getEl(a).tech;if("srcnotfound"===b)return c.error(4);c.error("FLASH: "+b)},z.version=function(){var a="0,0,0";try{a=new w["default"].ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(b){try{y.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(y.plugins["Shockwave Flash 2.0"]||y.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(c){}}return a.split(",")},z.embed=function(a,b,c,d){var e=z.getEmbedCode(a,b,c,d);return n.createEl("div",{innerHTML:e}).childNodes[0]},z.getEmbedCode=function(a,b,c,d){var e="",f="",g="";return b&&Object.getOwnPropertyNames(b).forEach(function(a){e+=a+"="+b[a]+"&amp;"}),c=(0,x.assign)({movie:a,flashvars:e,allowScriptAccess:"always",allowNetworking:"all"},c),Object.getOwnPropertyNames(c).forEach(function(a){f+='<param name="'+a+'" value="'+c[a]+'" />'}),d=(0,x.assign)({data:a,width:"100%",height:"100%"},d),Object.getOwnPropertyNames(d).forEach(function(a){g+=a+'="'+d[a]+'" '}),'<object type="application/x-shockwave-flash" '+g+">"+f+"</object>"},(0,s["default"])(z),u["default"].registerComponent("Flash",z),l["default"].registerTech("Flash",z),c["default"]=z},{5:5,58:58,62:62,81:81,88:88,90:90,92:92,95:95}],60:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){return a.raw=b,a}function g(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function h(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function i(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var j=f(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."],["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),k=a(62),l=e(k),m=a(5),n=e(m),o=a(81),p=d(o),q=a(92),r=d(q),s=a(83),t=d(s),u=a(86),v=e(u),w=a(98),x=e(w),y=a(78),z=d(y),A=a(94),B=e(A),C=a(95),D=e(C),E=a(88),F=a(87),G=e(F),H=a(91),I=e(H),J=function(a){function b(c,d){g(this,b);var e=h(this,a.call(this,c,d)),f=c.source,i=!1;if(f&&(e.el_.currentSrc!==f.src||c.tag&&3===c.tag.initNetworkState_)?e.setSource(f):e.handleLateInit_(e.el_),e.el_.hasChildNodes()){for(var k=e.el_.childNodes,l=k.length,m=[];l--;){var n=k[l];"track"===n.nodeName.toLowerCase()&&(e.featuresNativeTextTracks?(e.remoteTextTrackEls().addTrackElement_(n),e.remoteTextTracks().addTrack_(n.track),i||e.el_.hasAttribute("crossorigin")||!r.isCrossOrigin(n.src)||(i=!0)):m.push(n))}for(var o=0;o<m.length;o++)e.el_.removeChild(m[o])}return["audio","video"].forEach(function(a){var b=e.el()[a+"Tracks"],c=e[a+"Tracks"](),d=(0,I["default"])(a);e["featuresNative"+d+"Tracks"]&&b&&b.addEventListener&&(e["handle"+d+"TrackChange_"]=function(a){c.trigger({type:"change",target:c,currentTarget:c,srcElement:c})},e["handle"+d+"TrackAdd_"]=function(a){return c.addTrack(a.track)},e["handle"+d+"TrackRemove_"]=function(a){return c.removeTrack(a.track)},b.addEventListener("change",e["handle"+d+"TrackChange_"]),b.addEventListener("addtrack",e["handle"+d+"TrackAdd_"]),b.addEventListener("removetrack",e["handle"+d+"TrackRemove_"]),e["removeOld"+d+"Tracks_"]=function(a){return e.removeOldTracks_(c,b)},e.on("loadstart",e["removeOld"+d+"Tracks_"]))}),e.featuresNativeTextTracks&&(i&&v["default"].warn((0,x["default"])(j)),e.handleTextTrackChange_=t.bind(e,e.handleTextTrackChange),e.handleTextTrackAdd_=t.bind(e,e.handleTextTrackAdd),e.handleTextTrackRemove_=t.bind(e,e.handleTextTrackRemove),e.proxyNativeTextTracks_()),(z.TOUCH_ENABLED||z.IS_IPHONE||z.IS_NATIVE_ANDROID)&&c.nativeControlsForTouch===!0&&e.setControls(!0),e.proxyWebkitFullscreen_(),e.triggerReady(),e}return i(b,a),b.prototype.dispose=function(){var c=this;["audio","video","text"].forEach(function(a){var b=(0,I["default"])(a),d=c.el_[a+"Tracks"];d&&d.removeEventListener&&(d.removeEventListener("change",c["handle"+b+"TrackChange_"]),d.removeEventListener("addtrack",c["handle"+b+"TrackAdd_"]),d.removeEventListener("removetrack",c["handle"+b+"TrackRemove_"])),d&&c.off("loadstart",c["removeOld"+b+"Tracks_"])}),b.disposeMediaElement(this.el_),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=this.options_.tag;if(!a||!this.options_.playerElIngest&&!this.movingMediaElementInDOM){if(a){var c=a.cloneNode(!0);a.parentNode&&a.parentNode.insertBefore(c,a),b.disposeMediaElement(a),a=c}else{a=B["default"].createElement("video");var d=this.options_.tag&&p.getElAttributes(this.options_.tag),e=(0,G["default"])({},d);z.TOUCH_ENABLED&&this.options_.nativeControlsForTouch===!0||delete e.controls,p.setElAttributes(a,(0,E.assign)(e,{id:this.options_.techId,"class":"vjs-tech"}))}a.playerId=this.options_.playerId}for(var f=["autoplay","preload","loop","muted"],g=f.length-1;g>=0;g--){var h=f[g],i={};"undefined"!=typeof this.options_[h]&&(i[h]=this.options_[h]),p.setElAttributes(a,i)}return a},b.prototype.handleLateInit_=function(a){if(0!==a.networkState&&3!==a.networkState){if(0===a.readyState){var b=!1,c=function(){b=!0};this.on("loadstart",c);var d=function(){b||this.trigger("loadstart")};return this.on("loadedmetadata",d),void this.ready(function(){this.off("loadstart",c),this.off("loadedmetadata",d),b||this.trigger("loadstart")})}var e=["loadstart"];e.push("loadedmetadata"),a.readyState>=2&&e.push("loadeddata"),a.readyState>=3&&e.push("canplay"),a.readyState>=4&&e.push("canplaythrough"),this.ready(function(){e.forEach(function(a){this.trigger(a)},this)})}},b.prototype.proxyNativeTextTracks_=function(){var a=this.el().textTracks;if(a){for(var b=0;b<a.length;b++)this.textTracks().addTrack_(a[b]);a.addEventListener&&(a.addEventListener("change",this.handleTextTrackChange_),a.addEventListener("addtrack",this.handleTextTrackAdd_),a.addEventListener("removetrack",this.handleTextTrackRemove_)),this.on("loadstart",this.removeOldTextTracks_)}},b.prototype.handleTextTrackChange=function(a){var b=this.textTracks();this.textTracks().trigger({type:"change",target:b,currentTarget:b,srcElement:b})},b.prototype.handleTextTrackAdd=function(a){this.textTracks().addTrack_(a.track)},b.prototype.handleTextTrackRemove=function(a){this.textTracks().removeTrack_(a.track)},b.prototype.removeOldTracks_=function(a,b){var c=[];if(b){for(var d=0;d<a.length;d++){for(var e=a[d],f=!1,g=0;g<b.length;g++)if(b[g]===e){f=!0;break}f||c.push(e)}for(var h=0;h<c.length;h++){var i=c[h];a.removeTrack_(i)}}},b.prototype.removeOldTextTracks_=function(a){var b=this.textTracks(),c=this.el().textTracks;this.removeOldTracks_(b,c)},b.prototype.play=function(){var a=this.el_.play();void 0!==a&&"function"==typeof a.then&&a.then(null,function(a){})},b.prototype.setCurrentTime=function(a){try{this.el_.currentTime=a}catch(b){(0,v["default"])(b,"Video is not ready. (Video.js)")}},b.prototype.duration=function(){var a=this;if(this.el_.duration===1/0&&z.IS_ANDROID&&z.IS_CHROME&&0===this.el_.currentTime){var b=function c(){a.el_.currentTime>0&&(a.el_.duration===1/0&&a.trigger("durationchange"),a.off("timeupdate",c))};return this.on("timeupdate",b),NaN}return this.el_.duration||NaN},b.prototype.width=function(){return this.el_.offsetWidth},b.prototype.height=function(){return this.el_.offsetHeight},b.prototype.proxyWebkitFullscreen_=function(){var a=this;if("webkitDisplayingFullscreen"in this.el_){var b=function(){this.trigger("fullscreenchange",{isFullscreen:!1})},c=function(){this.one("webkitendfullscreen",b),this.trigger("fullscreenchange",{isFullscreen:!0})};this.on("webkitbeginfullscreen",c),this.on("dispose",function(){a.off("webkitbeginfullscreen",c),a.off("webkitendfullscreen",b)})}},b.prototype.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var a=D["default"].navigator&&D["default"].navigator.userAgent||"";if(/Android/.test(a)||!/Chrome|Mac OS X 10.5/.test(a))return!0}return!1},b.prototype.enterFullScreen=function(){var a=this.el_;a.paused&&a.networkState<=a.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){a.pause(),a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()},b.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},b.prototype.src=function(a){if(void 0===a)return this.el_.src;this.setSrc(a)},b.prototype.reset=function(){b.resetMediaElement(this.el_)},b.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc},b.prototype.setControls=function(a){this.el_.controls=!!a},b.prototype.addTextTrack=function(b,c,d){return this.featuresNativeTextTracks?this.el_.addTextTrack(b,c,d):a.prototype.addTextTrack.call(this,b,c,d)},b.prototype.createRemoteTextTrack=function(b){if(!this.featuresNativeTextTracks)return a.prototype.createRemoteTextTrack.call(this,b);var c=B["default"].createElement("track");return b.kind&&(c.kind=b.kind),b.label&&(c.label=b.label),(b.language||b.srclang)&&(c.srclang=b.language||b.srclang),b["default"]&&(c["default"]=b["default"]),b.id&&(c.id=b.id),b.src&&(c.src=b.src),c},b.prototype.addRemoteTextTrack=function(b,c){var d=a.prototype.addRemoteTextTrack.call(this,b,c);return this.featuresNativeTextTracks&&this.el().appendChild(d),d},b.prototype.removeRemoteTextTrack=function(b){if(a.prototype.removeRemoteTextTrack.call(this,b),this.featuresNativeTextTracks)for(var c=this.$$("track"),d=c.length;d--;)b!==c[d]&&b!==c[d].track||this.el().removeChild(c[d])},b}(l["default"]);if(p.isReal()){J.TEST_VID=B["default"].createElement("video");var K=B["default"].createElement("track");K.kind="captions",K.srclang="en",K.label="English",J.TEST_VID.appendChild(K)}J.isSupported=function(){try{J.TEST_VID.volume=.5}catch(a){return!1}return!(!J.TEST_VID||!J.TEST_VID.canPlayType)},J.canControlVolume=function(){try{var a=J.TEST_VID.volume;return J.TEST_VID.volume=a/2+.1,a!==J.TEST_VID.volume}catch(b){return!1}},J.canControlPlaybackRate=function(){if(z.IS_ANDROID&&z.IS_CHROME)return!1;try{var a=J.TEST_VID.playbackRate;return J.TEST_VID.playbackRate=a/2+.1,a!==J.TEST_VID.playbackRate}catch(b){return!1}},J.supportsNativeTextTracks=function(){return z.IS_ANY_SAFARI},J.supportsNativeVideoTracks=function(){return!(!J.TEST_VID||!J.TEST_VID.videoTracks)},J.supportsNativeAudioTracks=function(){return!(!J.TEST_VID||!J.TEST_VID.audioTracks)},J.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","volumechange"],J.prototype.featuresVolumeControl=J.canControlVolume(),J.prototype.featuresPlaybackRate=J.canControlPlaybackRate(),J.prototype.movingMediaElementInDOM=!z.IS_IOS,J.prototype.featuresFullscreenResize=!0,J.prototype.featuresProgressEvents=!0,J.prototype.featuresTimeupdateEvents=!0,J.prototype.featuresNativeTextTracks=J.supportsNativeTextTracks(),J.prototype.featuresNativeVideoTracks=J.supportsNativeVideoTracks(),J.prototype.featuresNativeAudioTracks=J.supportsNativeAudioTracks();var L=J.TEST_VID&&J.TEST_VID.constructor.prototype.canPlayType,M=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,N=/^video\/mp4/i;J.patchCanPlayType=function(){z.ANDROID_VERSION>=4&&!z.IS_FIREFOX?J.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&M.test(a)?"maybe":L.call(this,a)}:z.IS_OLD_ANDROID&&(J.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&N.test(a)?"maybe":L.call(this,a)})},J.unpatchCanPlayType=function(){var a=J.TEST_VID.constructor.prototype.canPlayType;return J.TEST_VID.constructor.prototype.canPlayType=L,a},J.patchCanPlayType(),J.disposeMediaElement=function(a){if(a){for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src"),"function"==typeof a.load&&function(){try{a.load()}catch(b){}}()}},J.resetMediaElement=function(a){if(a){for(var b=a.querySelectorAll("source"),c=b.length;c--;)a.removeChild(b[c]);a.removeAttribute("src"),"function"==typeof a.load&&function(){try{a.load()}catch(b){}}()}},["paused","currentTime","buffered","volume","muted","poster","preload","autoplay","controls","loop","error","seeking","seekable","ended","defaultMuted","playbackRate","played","networkState","readyState","videoWidth","videoHeight"].forEach(function(a){J.prototype[a]=function(){return this.el_[a]}}),["volume","muted","src","poster","preload","autoplay","loop","playbackRate"].forEach(function(a){J.prototype["set"+(0,I["default"])(a)]=function(b){this.el_[a]=b}}),["pause","load"].forEach(function(a){J.prototype[a]=function(){return this.el_[a]()}}),l["default"].withSourceHandlers(J),J.nativeSourceHandler={},J.nativeSourceHandler.canPlayType=function(a){try{return J.TEST_VID.canPlayType(a)}catch(b){return""}},J.nativeSourceHandler.canHandleSource=function(a,b){if(a.type)return J.nativeSourceHandler.canPlayType(a.type);if(a.src){var c=r.getFileExtension(a.src);return J.nativeSourceHandler.canPlayType("video/"+c)}return""},J.nativeSourceHandler.handleSource=function(a,b,c){b.setSrc(a.src)},J.nativeSourceHandler.dispose=function(){},J.registerSourceHandler(J.nativeSourceHandler),n["default"].registerComponent("Html5",J),l["default"].registerTech("Html5",J),c["default"]=J},{5:5,62:62,78:78,81:81,83:83,86:86,87:87,88:88,91:91,92:92,94:94,95:95,98:98}],61:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a(5),i=d(h),j=a(62),k=d(j),l=a(91),m=d(l),n=function(a){function b(c,d,g){e(this,b);var h=f(this,a.call(this,c,d,g));if(d.playerOptions.sources&&0!==d.playerOptions.sources.length)c.src(d.playerOptions.sources);else for(var j=0,l=d.playerOptions.techOrder;j<l.length;j++){var n=(0,m["default"])(l[j]),o=k["default"].getTech(n);if(n||(o=i["default"].getComponent(n)),o&&o.isSupported()){c.loadTech_(n);break}}return h}return g(b,a),b}(i["default"]);i["default"].registerComponent("MediaLoader",n),c["default"]=n},{5:5,62:62,91:91}],62:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b,c,d){var e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},f=a.textTracks();e.kind=b,c&&(e.label=c),d&&(e.language=d),e.tech=a;var g=new s["default"](e);return f.addTrack_(g),g}c.__esModule=!0;var j=a(5),k=e(j),l=a(66),m=e(l),n=a(65),o=e(n),p=a(87),q=e(p),r=a(72),s=e(r),t=a(70),u=e(t),v=a(76),w=e(v),x=a(63),y=e(x),z=a(83),A=d(z),B=a(86),C=e(B),D=a(90),E=a(79),F=a(46),G=e(F),H=a(95),I=e(H),J=a(94),K=e(J),L=a(88),M=function(b){function c(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};f(this,c),a.reportTouchActivity=!1;var e=g(this,b.call(this,null,a,d));return e.hasStarted_=!1,e.on("playing",function(){this.hasStarted_=!0}),e.on("loadstart",function(){this.hasStarted_=!1}),e.textTracks_=a.textTracks,e.videoTracks_=a.videoTracks,e.audioTracks_=a.audioTracks,e.featuresProgressEvents||e.manualProgressOn(),e.featuresTimeupdateEvents||e.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(function(b){a["native"+b+"Tracks"]===!1&&(e["featuresNative"+b+"Tracks"]=!1)}),a.nativeCaptions===!1&&(e.featuresNativeTextTracks=!1),e.featuresNativeTextTracks||e.emulateTextTracks(),e.autoRemoteTextTracks_=new u["default"],e.initTextTrackListeners(),e.initTrackListeners(),a.nativeControlsForTouch||e.emitTapEvents(),e.constructor&&(e.name_=e.constructor.name||"Unknown Tech"),e}return h(c,b),c.prototype.manualProgressOn=function(){this.on("durationchange",this.onDurationChange),this.manualProgress=!0,this.one("ready",this.trackProgress)},c.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange)},c.prototype.trackProgress=function(a){this.stopTrackingProgress(),this.progressInterval=this.setInterval(A.bind(this,function(){var a=this.bufferedPercent();this.bufferedPercent_!==a&&this.trigger("progress"),this.bufferedPercent_=a,1===a&&this.stopTrackingProgress()}),500)},c.prototype.onDurationChange=function(a){this.duration_=this.duration()},c.prototype.buffered=function(){return(0,D.createTimeRange)(0,0)},c.prototype.bufferedPercent=function(){return(0,E.bufferedPercent)(this.buffered(),this.duration_)},c.prototype.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},c.prototype.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime)},c.prototype.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},c.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)},c.prototype.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},c.prototype.dispose=function(){this.clearTracks(["audio","video","text"]),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),b.prototype.dispose.call(this)},c.prototype.clearTracks=function(a){var b=this;a=[].concat(a),a.forEach(function(a){for(var c=b[a+"Tracks"]()||[],d=c.length;d--;){var e=c[d];"text"===a&&b.removeRemoteTextTrack(e),c.removeTrack_(e)}})},c.prototype.cleanupAutoTextTracks=function(){for(var a=this.autoRemoteTextTracks_||[],b=a.length;b--;){var c=a[b];this.removeRemoteTextTrack(c)}},c.prototype.reset=function(){},c.prototype.error=function(a){return void 0!==a&&(this.error_=new G["default"](a),this.trigger("error")),this.error_},c.prototype.played=function(){return this.hasStarted_?(0,D.createTimeRange)(0,0):(0,D.createTimeRange)()},c.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},c.prototype.initTextTrackListeners=function(){var a=A.bind(this,function(){this.trigger("texttrackchange")}),b=this.textTracks();b&&(b.addEventListener("removetrack",a),b.addEventListener("addtrack",a),this.on("dispose",A.bind(this,function(){b.removeEventListener("removetrack",a),b.removeEventListener("addtrack",a)})))},c.prototype.initTrackListeners=function(){var a=this;["video","audio"].forEach(function(b){var c=function(){a.trigger(b+"trackchange")},d=a[b+"Tracks"]();d.addEventListener("removetrack",c),
d.addEventListener("addtrack",c),a.on("dispose",function(){d.removeEventListener("removetrack",c),d.removeEventListener("addtrack",c)})})},c.prototype.addWebVttScript_=function(){var b=this;if(!I["default"].WebVTT)if(K["default"].body.contains(this.el())){var c=a(105);if(!this.options_["vtt.js"]&&(0,L.isPlain)(c)&&Object.keys(c).length>0)return void this.trigger("vttjsloaded");var d=K["default"].createElement("script");d.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.12.3/vtt.min.js",d.onload=function(){b.trigger("vttjsloaded")},d.onerror=function(){b.trigger("vttjserror")},this.on("dispose",function(){d.onload=null,d.onerror=null}),I["default"].WebVTT=!0,this.el().parentNode.appendChild(d)}else this.ready(this.addWebVttScript_)},c.prototype.emulateTextTracks=function(){var a=this,b=this.textTracks();if(b){var c=this.remoteTextTracks(),d=function(a){return b.addTrack_(a.track)},e=function(a){return b.removeTrack_(a.track)};c.on("addtrack",d),c.on("removetrack",e),this.addWebVttScript_();var f=function(){return a.trigger("texttrackchange")},g=function(){f();for(var a=0;a<b.length;a++){var c=b[a];c.removeEventListener("cuechange",f),"showing"===c.mode&&c.addEventListener("cuechange",f)}};g(),b.addEventListener("change",g),b.addEventListener("addtrack",g),b.addEventListener("removetrack",g),this.on("dispose",function(){c.off("addtrack",d),c.off("removetrack",e),b.removeEventListener("change",g),b.removeEventListener("addtrack",g),b.removeEventListener("removetrack",g);for(var a=0;a<b.length;a++){b[a].removeEventListener("cuechange",f)}})}},c.prototype.videoTracks=function(){return this.videoTracks_=this.videoTracks_||new w["default"],this.videoTracks_},c.prototype.audioTracks=function(){return this.audioTracks_=this.audioTracks_||new y["default"],this.audioTracks_},c.prototype.textTracks=function(){return this.textTracks_=this.textTracks_||new u["default"],this.textTracks_},c.prototype.remoteTextTracks=function(){return this.remoteTextTracks_=this.remoteTextTracks_||new u["default"],this.remoteTextTracks_},c.prototype.remoteTextTrackEls=function(){return this.remoteTextTrackEls_=this.remoteTextTrackEls_||new o["default"],this.remoteTextTrackEls_},c.prototype.addTextTrack=function(a,b,c){if(!a)throw new Error("TextTrack kind is required but was not provided");return i(this,a,b,c)},c.prototype.createRemoteTextTrack=function(a){var b=(0,q["default"])(a,{tech:this});return new m["default"](b)},c.prototype.addRemoteTextTrack=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=arguments[1],c=this.createRemoteTextTrack(a);return b!==!0&&b!==!1&&(C["default"].warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'),b=!0),this.remoteTextTrackEls().addTrackElement_(c),this.remoteTextTracks().addTrack_(c.track),b!==!0&&this.autoRemoteTextTracks_.addTrack_(c.track),c},c.prototype.removeRemoteTextTrack=function(a){var b=this.remoteTextTrackEls().getTrackElementByTrack_(a);this.remoteTextTrackEls().removeTrackElement_(b),this.remoteTextTracks().removeTrack_(a),this.autoRemoteTextTracks_.removeTrack_(a)},c.prototype.setPoster=function(){},c.prototype.canPlayType=function(){return""},c.isTech=function(a){return a.prototype instanceof c||a instanceof c||a===c},c.registerTech=function(a,b){if(c.techs_||(c.techs_={}),!c.isTech(b))throw new Error("Tech "+a+" must be a Tech");return c.techs_[a]=b,b},c.getTech=function(a){return c.techs_&&c.techs_[a]?c.techs_[a]:I["default"]&&I["default"].videojs&&I["default"].videojs[a]?(C["default"].warn("The "+a+" tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"),I["default"].videojs[a]):void 0},c}(k["default"]);M.prototype.textTracks_,M.prototype.audioTracks_,M.prototype.videoTracks_,M.prototype.featuresVolumeControl=!0,M.prototype.featuresFullscreenResize=!1,M.prototype.featuresPlaybackRate=!1,M.prototype.featuresProgressEvents=!1,M.prototype.featuresTimeupdateEvents=!1,M.prototype.featuresNativeTextTracks=!1,M.withSourceHandlers=function(a){a.registerSourceHandler=function(b,c){var d=a.sourceHandlers;d||(d=a.sourceHandlers=[]),void 0===c&&(c=d.length),d.splice(c,0,b)},a.canPlayType=function(b){for(var c=a.sourceHandlers||[],d=void 0,e=0;e<c.length;e++)if(d=c[e].canPlayType(b))return d;return""},a.selectSourceHandler=function(b,c){for(var d=a.sourceHandlers||[],e=0;e<d.length;e++)if(d[e].canHandleSource(b,c))return d[e];return null},a.canPlaySource=function(b,c){var d=a.selectSourceHandler(b,c);return d?d.canHandleSource(b,c):""},["seekable","duration"].forEach(function(a){var b=this[a];"function"==typeof b&&(this[a]=function(){return this.sourceHandler_&&this.sourceHandler_[a]?this.sourceHandler_[a].apply(this.sourceHandler_,arguments):b.apply(this,arguments)})},a.prototype),a.prototype.setSource=function(b){var c=a.selectSourceHandler(b,this.options_);return c||(a.nativeSourceHandler?c=a.nativeSourceHandler:C["default"].error("No source hander found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),c!==a.nativeSourceHandler&&(this.currentSource_=b,this.off(this.el_,"loadstart",a.prototype.firstLoadStartListener_),this.off(this.el_,"loadstart",a.prototype.successiveLoadStartListener_),this.one(this.el_,"loadstart",a.prototype.firstLoadStartListener_)),this.sourceHandler_=c.handleSource(b,this,this.options_),this.on("dispose",this.disposeSourceHandler),this},a.prototype.firstLoadStartListener_=function(){this.one(this.el_,"loadstart",a.prototype.successiveLoadStartListener_)},a.prototype.successiveLoadStartListener_=function(){this.disposeSourceHandler(),this.one(this.el_,"loadstart",a.prototype.successiveLoadStartListener_)},a.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.off(this.el_,"loadstart",a.prototype.firstLoadStartListener_),this.off(this.el_,"loadstart",a.prototype.successiveLoadStartListener_),this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},k["default"].registerComponent("Tech",M),k["default"].registerComponent("MediaTechController",M),M.registerTech("Tech",M),c["default"]=M},{105:105,46:46,5:5,63:63,65:65,66:66,70:70,72:72,76:76,79:79,83:83,86:86,87:87,88:88,90:90,94:94,95:95}],63:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a,b){for(var c=0;c<a.length;c++)b.id!==a[c].id&&(a[c].enabled=!1)},p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);for(var h=void 0,i=e.length-1;i>=0;i--)if(e[i].enabled){o(e,e[i]);break}if(l.IS_IE8){h=n["default"].createElement("custom");for(var k in j["default"].prototype)"constructor"!==k&&(h[k]=j["default"].prototype[k]);for(var m in b.prototype)"constructor"!==m&&(h[m]=b.prototype[m])}return h=c=g(this,a.call(this,e,h)),h.changing_=!1,d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){var c=this;b.enabled&&o(this,b),a.prototype.addTrack_.call(this,b),b.addEventListener&&b.addEventListener("enabledchange",function(){c.changing_||(c.changing_=!0,o(c,b),c.changing_=!1,c.trigger("change"))})},b.prototype.addTrack=function(a){this.addTrack_(a)},b.prototype.removeTrack=function(b){a.prototype.removeTrack_.call(this,b)},b}(j["default"]);c["default"]=p},{74:74,78:78,94:94}],64:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(73),j=a(75),k=e(j),l=a(87),m=e(l),n=a(78),o=d(n),p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var h=(0,m["default"])(e,{kind:i.AudioTrackKind[e.kind]||""}),j=c=g(this,a.call(this,h)),k=!1;if(o.IS_IE8)for(var l in b.prototype)"constructor"!==l&&(j[l]=b.prototype[l]);return Object.defineProperty(j,"enabled",{get:function(){return k},set:function(a){"boolean"==typeof a&&a!==k&&(k=a,this.trigger("enabledchange"))}}),h.enabled&&(j.enabled=h.enabled),j.loaded_=!0,d=j,g(c,d)}return h(b,a),b}(k["default"]);c["default"]=p},{73:73,75:75,78:78,87:87}],65:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(78),h=e(g),i=a(94),j=d(i),k=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,a);var c=this;if(h.IS_IE8){c=j["default"].createElement("custom");for(var d in a.prototype)"constructor"!==d&&(c[d]=a.prototype[d])}c.trackElements_=[],Object.defineProperty(c,"length",{get:function(){return this.trackElements_.length}});for(var e=0,g=b.length;e<g;e++)c.addTrackElement_(b[e]);if(h.IS_IE8)return c}return a.prototype.addTrackElement_=function(a){var b=this.trackElements_.length;""+b in this||Object.defineProperty(this,b,{get:function(){return this.trackElements_[b]}}),this.trackElements_.indexOf(a)===-1&&this.trackElements_.push(a)},a.prototype.getTrackElementByTrack_=function(a){for(var b=void 0,c=0,d=this.trackElements_.length;c<d;c++)if(a===this.trackElements_[c].track){b=this.trackElements_[c];break}return b},a.prototype.removeTrackElement_=function(a){for(var b=0,c=this.trackElements_.length;b<c;b++)if(a===this.trackElements_[b]){this.trackElements_.splice(b,1);break}},a}();c["default"]=k},{78:78,94:94}],66:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(78),j=e(i),k=a(94),l=d(k),m=a(42),n=d(m),o=a(72),p=d(o),q=function(a){function b(){var c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var d=g(this,a.call(this)),e=void 0,h=d;if(j.IS_IE8){h=l["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(h[i]=b.prototype[i])}var k=new p["default"](c);if(h.kind=k.kind,h.src=k.src,h.srclang=k.language,h.label=k.label,h["default"]=k["default"],Object.defineProperty(h,"readyState",{get:function(){return e}}),Object.defineProperty(h,"track",{get:function(){return k}}),e=0,k.addEventListener("loadeddata",function(){e=2,h.trigger({type:"load",target:h})}),j.IS_IE8){var m;return m=h,g(d,m)}return d}return h(b,a),b}(n["default"]);q.prototype.allowedEvents_={load:"load"},q.NONE=0,q.LOADING=1,q.LOADED=2,q.ERROR=3,c["default"]=q},{42:42,72:72,78:78,94:94}],67:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a(78),h=e(g),i=a(94),j=d(i),k=function(){function a(b){f(this,a);var c=this;if(h.IS_IE8){c=j["default"].createElement("custom");for(var d in a.prototype)"constructor"!==d&&(c[d]=a.prototype[d])}if(a.prototype.setCues_.call(c,b),Object.defineProperty(c,"length",{get:function(){return this.length_}}),h.IS_IE8)return c}return a.prototype.setCues_=function(a){var b=this.length||0,c=0,d=a.length;this.cues_=a,this.length_=a.length;var e=function(a){""+a in this||Object.defineProperty(this,""+a,{get:function(){return this.cues_[a]}})};if(b<d)for(c=b;c<d;c++)e.call(this,c)},a.prototype.getCueById=function(a){for(var b=null,c=0,d=this.length;c<d;c++){var e=this[c];if(e.id===a){b=e;break}}return b},a}();c["default"]=k},{78:78,94:94}],68:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b){return"rgba("+parseInt(a[1]+a[1],16)+","+parseInt(a[2]+a[2],16)+","+parseInt(a[3]+a[3],16)+","+b+")"}function j(a,b,c){try{a.style[b]=c}catch(d){return}}c.__esModule=!0;var k=a(5),l=e(k),m=a(83),n=d(m),o=a(95),p=e(o),q={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'},r=function(a){function b(c,d,e){f(this,b);var h=g(this,a.call(this,c,d,e));return c.on("loadstart",n.bind(h,h.toggleDisplay)),c.on("texttrackchange",n.bind(h,h.updateDisplay)),c.ready(n.bind(h,function(){if(c.tech_&&c.tech_.featuresNativeTextTracks)return void this.hide();c.on("fullscreenchange",n.bind(this,this.updateDisplay));for(var a=this.options_.playerOptions.tracks||[],b=0;b<a.length;b++)this.player_.addRemoteTextTrack(a[b],!0);var d={captions:1,subtitles:1},e=this.player_.textTracks(),f=void 0,g=void 0;if(e){for(var h=0;h<e.length;h++){var i=e[h];i["default"]&&("descriptions"!==i.kind||f?i.kind in d&&!g&&(g=i):f=i)}g?g.mode="showing":f&&(f.mode="showing")}})),h}return h(b,a),b.prototype.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"},{"aria-live":"off","aria-atomic":"true"})},b.prototype.clearDisplay=function(){"function"==typeof p["default"].WebVTT&&p["default"].WebVTT.processCues(p["default"],[],this.el_)},b.prototype.updateDisplay=function(){var a=this.player_.textTracks();if(this.clearDisplay(),a){for(var b=null,c=null,d=a.length;d--;){var e=a[d];"showing"===e.mode&&("descriptions"===e.kind?b=e:c=e)}c?("off"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","off"),this.updateForTrack(c)):b&&("assertive"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","assertive"),this.updateForTrack(b))}},b.prototype.updateForTrack=function(a){if("function"==typeof p["default"].WebVTT&&a.activeCues){for(var b=this.player_.textTrackSettings.getValues(),c=[],d=0;d<a.activeCues.length;d++)c.push(a.activeCues[d]);p["default"].WebVTT.processCues(p["default"],c,this.el_);for(var e=c.length;e--;){var f=c[e];if(f){var g=f.displayState;if(b.color&&(g.firstChild.style.color=b.color),b.textOpacity&&j(g.firstChild,"color",i(b.color||"#fff",b.textOpacity)),b.backgroundColor&&(g.firstChild.style.backgroundColor=b.backgroundColor),b.backgroundOpacity&&j(g.firstChild,"backgroundColor",i(b.backgroundColor||"#000",b.backgroundOpacity)),b.windowColor&&(b.windowOpacity?j(g,"backgroundColor",i(b.windowColor,b.windowOpacity)):g.style.backgroundColor=b.windowColor),b.edgeStyle&&("dropshadow"===b.edgeStyle?g.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222":"raised"===b.edgeStyle?g.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px #222":"depressed"===b.edgeStyle?g.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222":"uniform"===b.edgeStyle&&(g.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")),b.fontPercent&&1!==b.fontPercent){var h=p["default"].parseFloat(g.style.fontSize);g.style.fontSize=h*b.fontPercent+"px",g.style.height="auto",g.style.top="auto",g.style.bottom="2px"}b.fontFamily&&"default"!==b.fontFamily&&("small-caps"===b.fontFamily?g.firstChild.style.fontVariant="small-caps":g.firstChild.style.fontFamily=q[b.fontFamily])}}}},b}(l["default"]);l["default"].registerComponent("TextTrackDisplay",r),c["default"]=r},{5:5,83:83,95:95}],69:[function(a,b,c){"use strict";c.__esModule=!0;var d=function(a){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce(function(b,c,d){return a[c]&&(b[c]=a[c]),b},{cues:a.cues&&Array.prototype.map.call(a.cues,function(a){return{startTime:a.startTime,endTime:a.endTime,text:a.text,id:a.id}})})},e=function(a){var b=a.$$("track"),c=Array.prototype.map.call(b,function(a){return a.track});return Array.prototype.map.call(b,function(a){var b=d(a.track);return a.src&&(b.src=a.src),b}).concat(Array.prototype.filter.call(a.textTracks(),function(a){return c.indexOf(a)===-1}).map(d))},f=function(a,b){return a.forEach(function(a){var c=b.addRemoteTextTrack(a).track;!a.src&&a.cues&&a.cues.forEach(function(a){return c.addCue(a)})}),b.textTracks()};c["default"]={textTracksToJson:e,jsonToTextTracks:f,trackToJson_:d}},{}],70:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(83),l=d(k),m=a(78),n=d(m),o=a(94),p=e(o),q=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);var h=void 0;if(n.IS_IE8){h=p["default"].createElement("custom");for(var i in j["default"].prototype)"constructor"!==i&&(h[i]=j["default"].prototype[i]);for(var k in b.prototype)"constructor"!==k&&(h[k]=b.prototype[k])}return h=c=g(this,a.call(this,e,h)),d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){a.prototype.addTrack_.call(this,b),b.addEventListener("modechange",l.bind(this,function(){this.trigger("change")}))},b}(j["default"]);c["default"]=q},{74:74,78:78,83:83,94:94}],71:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function i(a,b){if(b&&(a=b(a)),a&&"none"!==a)return a}function j(a,b){return i(a.options[a.options.selectedIndex].value,b)}function k(a,b,c){if(b)for(var d=0;d<a.options.length;d++)if(i(a.options[d].value,c)===b){a.selectedIndex=d;break}}c.__esModule=!0;var l=a(95),m=e(l),n=a(5),o=e(n),p=a(81),q=a(83),r=d(q),s=a(88),t=d(s),u=a(86),v=e(u),w=["#000","Black"],x=["#00F","Blue"],y=["#0FF","Cyan"],z=["#0F0","Green"],A=["#F0F","Magenta"],B=["#F00","Red"],C=["#FFF","White"],D=["#FF0","Yellow"],E=["1","Opaque"],F=["0.5","Semi-Transparent"],G=["0","Transparent"],H={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[w,C,B,z,x,D,A,y]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Transparency",options:[E,F,G]},color:{selector:".vjs-fg-color > select",id:"captions-foreground-color-%s",label:"Color",options:[C,w,B,z,x,D,A,y]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Dropshadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],"default":2,parser:function(a){return"1.00"===a?null:Number(a)}},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Transparency",options:[E,F]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Transparency",options:[G,F,E]}};H.windowColor.options=H.backgroundColor.options;var I=function(a){function b(c,d){f(this,b);var e=g(this,a.call(this,c,d));return e.setDefaults(),e.hide(),e.updateDisplay=r.bind(e,e.updateDisplay),void 0===d.persistTextTrackSettings&&(e.options_.persistTextTrackSettings=e.options_.playerOptions.persistTextTrackSettings),e.on(e.$(".vjs-done-button"),"click",function(){e.saveSettings(),e.hide()}),e.on(e.$(".vjs-default-button"),"click",function(){e.setDefaults(),e.updateDisplay()}),t.each(H,function(a){e.on(e.$(a.selector),"change",e.updateDisplay)}),e.options_.persistTextTrackSettings&&e.restoreSettings(),e}return h(b,a),b.prototype.createElSelect_=function(a){var b=this,c=H[a],d=c.id.replace("%s",this.id_);return[(0,p.createEl)("label",{className:"vjs-label",textContent:c.label},{"for":d}),(0,p.createEl)("select",{id:d},void 0,c.options.map(function(a){return(0,p.createEl)("option",{textContent:b.localize(a[1]),value:a[0]})}))]},b.prototype.createElFgColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Text")}),b=this.createElSelect_("color"),c=(0,p.createEl)("span",{className:"vjs-text-opacity vjs-opacity"},void 0,this.createElSelect_("textOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-fg-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElBgColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Background")}),b=this.createElSelect_("backgroundColor"),c=(0,p.createEl)("span",{className:"vjs-bg-opacity vjs-opacity"},void 0,this.createElSelect_("backgroundOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-bg-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElWinColor_=function(){var a=(0,p.createEl)("legend",{textContent:this.localize("Window")}),b=this.createElSelect_("windowColor"),c=(0,p.createEl)("span",{className:"vjs-window-opacity vjs-opacity"},void 0,this.createElSelect_("windowOpacity"));return(0,p.createEl)("fieldset",{className:"vjs-window-color vjs-tracksetting"},void 0,[a].concat(b,c))},b.prototype.createElColors_=function(){return(0,p.createEl)("div",{className:"vjs-tracksettings-colors"},void 0,[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()])},b.prototype.createElFont_=function(){var a=(0,p.createEl)("div",{className:"vjs-font-percent vjs-tracksetting"},void 0,this.createElSelect_("fontPercent")),b=(0,p.createEl)("div",{className:"vjs-edge-style vjs-tracksetting"},void 0,this.createElSelect_("edgeStyle")),c=(0,p.createEl)("div",{className:"vjs-font-family vjs-tracksetting"},void 0,this.createElSelect_("fontFamily"));return(0,p.createEl)("div",{className:"vjs-tracksettings-font"},void 0,[a,b,c])},b.prototype.createElControls_=function(){var a=(0,p.createEl)("button",{className:"vjs-default-button",textContent:this.localize("Defaults")}),b=(0,p.createEl)("button",{className:"vjs-done-button",textContent:"Done"});return(0,p.createEl)("div",{className:"vjs-tracksettings-controls"},void 0,[a,b])},b.prototype.createEl=function(){var a=(0,p.createEl)("div",{className:"vjs-tracksettings"},void 0,[this.createElColors_(),this.createElFont_(),this.createElControls_()]),b=(0,p.createEl)("div",{className:"vjs-control-text",id:"TTsettingsDialogLabel-"+this.id_,textContent:"Caption Settings Dialog"},{"aria-level":"1",role:"heading"}),c=(0,p.createEl)("div",{className:"vjs-control-text",id:"TTsettingsDialogDescription-"+this.id_,textContent:"Beginning of dialog window. Escape will cancel and close the window."}),d=(0,p.createEl)("div",void 0,{role:"document"},[b,c,a]);return(0,p.createEl)("div",{className:"vjs-caption-settings vjs-modal-overlay",tabIndex:-1},{role:"dialog","aria-labelledby":b.id,"aria-describedby":c.id},d)},b.prototype.getValues=function(){var a=this;return t.reduce(H,function(b,c,d){var e=j(a.$(c.selector),c.parser);return void 0!==e&&(b[d]=e),b},{})},b.prototype.setValues=function(a){var b=this;t.each(H,function(c,d){k(b.$(c.selector),a[d],c.parser)})},b.prototype.setDefaults=function(){var a=this;t.each(H,function(b){var c=b.hasOwnProperty("default")?b["default"]:0;a.$(b.selector).selectedIndex=c})},b.prototype.restoreSettings=function(){var a=void 0;try{a=JSON.parse(m["default"].localStorage.getItem("vjs-text-track-settings"))}catch(b){v["default"].warn(b)}a&&this.setValues(a)},b.prototype.saveSettings=function(){if(this.options_.persistTextTrackSettings){var a=this.getValues();try{Object.keys(a).length?m["default"].localStorage.setItem("vjs-text-track-settings",JSON.stringify(a)):m["default"].localStorage.removeItem("vjs-text-track-settings")}catch(b){v["default"].warn(b)}}},b.prototype.updateDisplay=function(){var a=this.player_.getChild("textTrackDisplay");a&&a.updateDisplay()},b}(o["default"]);o["default"].registerComponent("TextTrackSettings",I),c["default"]=I},{5:5,81:81,83:83,86:86,88:88,95:95}],72:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(67),j=e(i),k=a(83),l=d(k),m=a(73),n=a(86),o=e(n),p=a(95),q=e(p),r=a(75),s=e(r),t=a(92),u=a(99),v=e(u),w=a(87),x=e(w),y=a(78),z=d(y),A=function(a,b){var c=new q["default"].WebVTT.Parser(q["default"],q["default"].vttjs,q["default"].WebVTT.StringDecoder()),d=[];c.oncue=function(a){b.addCue(a)},c.onparsingerror=function(a){d.push(a)},c.onflush=function(){b.trigger({type:"loadeddata",target:b})},c.parse(a),d.length>0&&(q["default"].console&&q["default"].console.groupCollapsed&&q["default"].console.groupCollapsed("Text Track parsing errors for "+b.src),d.forEach(function(a){return o["default"].error(a)}),q["default"].console&&q["default"].console.groupEnd&&q["default"].console.groupEnd()),c.flush()},B=function(a,b){var c={uri:a},d=(0,t.isCrossOrigin)(a);d&&(c.cors=d),(0,v["default"])(c,l.bind(this,function(a,c,d){if(a)return o["default"].error(a,c);if(b.loaded_=!0,"function"!=typeof q["default"].WebVTT){if(b.tech_){var e=function(){return A(d,b)};b.tech_.on("vttjsloaded",e),b.tech_.on("vttjserror",function(){o["default"].error("vttjs failed to load, stopping trying to process "+b.src),b.tech_.off("vttjsloaded",e)})}}else A(d,b)}))},C=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(f(this,b),!e.tech)throw new Error("A tech was not provided.");var h=(0,x["default"])(e,{kind:m.TextTrackKind[e.kind]||"subtitles",language:e.language||e.srclang||""}),i=m.TextTrackMode[h.mode]||"disabled",k=h["default"];"metadata"!==h.kind&&"chapters"!==h.kind||(i="hidden");var n=c=g(this,a.call(this,h));if(n.tech_=h.tech,z.IS_IE8)for(var o in b.prototype)"constructor"!==o&&(n[o]=b.prototype[o]);n.cues_=[],n.activeCues_=[];var p=new j["default"](n.cues_),q=new j["default"](n.activeCues_),r=!1,s=l.bind(n,function(){this.activeCues,r&&(this.trigger("cuechange"),r=!1)});return"disabled"!==i&&n.tech_.ready(function(){n.tech_.on("timeupdate",s)},!0),Object.defineProperty(n,"default",{get:function(){return k},set:function(){}}),Object.defineProperty(n,"mode",{get:function(){return i},set:function(a){var b=this;m.TextTrackMode[a]&&(i=a,"showing"===i&&this.tech_.ready(function(){b.tech_.on("timeupdate",s)},!0),this.trigger("modechange"))}}),Object.defineProperty(n,"cues",{get:function(){return this.loaded_?p:null},set:function(){}}),Object.defineProperty(n,"activeCues",{get:function(){if(!this.loaded_)return null;if(0===this.cues.length)return q;for(var a=this.tech_.currentTime(),b=[],c=0,d=this.cues.length;c<d;c++){
var e=this.cues[c];e.startTime<=a&&e.endTime>=a?b.push(e):e.startTime===e.endTime&&e.startTime<=a&&e.startTime+.5>=a&&b.push(e)}if(r=!1,b.length!==this.activeCues_.length)r=!0;else for(var f=0;f<b.length;f++)this.activeCues_.indexOf(b[f])===-1&&(r=!0);return this.activeCues_=b,q.setCues_(this.activeCues_),q},set:function(){}}),h.src?(n.src=h.src,B(h.src,n)):n.loaded_=!0,d=n,g(c,d)}return h(b,a),b.prototype.addCue=function(a){var b=a;if(q["default"].vttjs&&!(a instanceof q["default"].vttjs.VTTCue)){b=new q["default"].vttjs.VTTCue(a.startTime,a.endTime,a.text);for(var c in a)c in b||(b[c]=a[c]);b.id=a.id,b.originalCue_=a}var d=this.tech_.textTracks();if(d)for(var e=0;e<d.length;e++)d[e]!==this&&d[e].removeCue(b);this.cues_.push(b),this.cues.setCues_(this.cues_)},b.prototype.removeCue=function(a){for(var b=this.cues_.length;b--;){var c=this.cues_[b];if(c===a||c.originalCue_&&c.originalCue_===a){this.cues_.splice(b,1),this.cues.setCues_(this.cues_);break}}},b}(s["default"]);C.prototype.allowedEvents_={cuechange:"cuechange"},c["default"]=C},{67:67,73:73,75:75,78:78,83:83,86:86,87:87,92:92,95:95,99:99}],73:[function(a,b,c){"use strict";c.__esModule=!0;c.VideoTrackKind={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},c.AudioTrackKind={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},c.TextTrackKind={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},c.TextTrackMode={disabled:"disabled",hidden:"hidden",showing:"showing"}},{}],74:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(42),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a){function b(){var c,d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;f(this,b);var h=g(this,a.call(this));if(!e&&(e=h,l.IS_IE8)){e=n["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(e[i]=b.prototype[i])}e.tracks_=[],Object.defineProperty(e,"length",{get:function(){return this.tracks_.length}});for(var j=0;j<d.length;j++)e.addTrack_(d[j]);return c=e,g(h,c)}return h(b,a),b.prototype.addTrack_=function(a){var b=this.tracks_.length;""+b in this||Object.defineProperty(this,b,{get:function(){return this.tracks_[b]}}),this.tracks_.indexOf(a)===-1&&(this.tracks_.push(a),this.trigger({track:a,type:"addtrack"}))},b.prototype.removeTrack_=function(a){for(var b=void 0,c=0,d=this.length;c<d;c++)if(this[c]===a){b=this[c],b.off&&b.off(),this.tracks_.splice(c,1);break}b&&this.trigger({track:b,type:"removetrack"})},b.prototype.getTrackById=function(a){for(var b=null,c=0,d=this.length;c<d;c++){var e=this[c];if(e.id===a){b=e;break}}return b},b}(j["default"]);o.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"};for(var p in o.prototype.allowedEvents_)o.prototype["on"+p]=null;c["default"]=o},{42:42,78:78,94:94}],75:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(78),j=e(i),k=a(94),l=d(k),m=a(85),n=e(m),o=a(42),p=d(o),q=function(a){function b(){var c,d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var e=g(this,a.call(this)),h=e;if(j.IS_IE8){h=l["default"].createElement("custom");for(var i in b.prototype)"constructor"!==i&&(h[i]=b.prototype[i])}var k={id:d.id||"vjs_track_"+n.newGUID(),kind:d.kind||"",label:d.label||"",language:d.language||""},m=function(a){Object.defineProperty(h,a,{get:function(){return k[a]},set:function(){}})};for(var o in k)m(o);return c=h,g(e,c)}return h(b,a),b}(p["default"]);c["default"]=q},{42:42,78:78,85:85,94:94}],76:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(74),j=e(i),k=a(78),l=d(k),m=a(94),n=e(m),o=function(a,b){for(var c=0;c<a.length;c++)b.id!==a[c].id&&(a[c].selected=!1)},p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];f(this,b);for(var h=void 0,i=e.length-1;i>=0;i--)if(e[i].selected){o(e,e[i]);break}if(l.IS_IE8){h=n["default"].createElement("custom");for(var k in j["default"].prototype)"constructor"!==k&&(h[k]=j["default"].prototype[k]);for(var m in b.prototype)"constructor"!==m&&(h[m]=b.prototype[m])}return h=c=g(this,a.call(this,e,h)),h.changing_=!1,Object.defineProperty(h,"selectedIndex",{get:function(){for(var a=0;a<this.length;a++)if(this[a].selected)return a;return-1},set:function(){}}),d=h,g(c,d)}return h(b,a),b.prototype.addTrack_=function(b){var c=this;b.selected&&o(this,b),a.prototype.addTrack_.call(this,b),b.addEventListener&&b.addEventListener("selectedchange",function(){c.changing_||(c.changing_=!0,o(c,b),c.changing_=!1,c.trigger("change"))})},b.prototype.addTrack=function(a){this.addTrack_(a)},b.prototype.removeTrack=function(b){a.prototype.removeTrack_.call(this,b)},b}(j["default"]);c["default"]=p},{74:74,78:78,94:94}],77:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function h(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var i=a(73),j=a(75),k=e(j),l=a(87),m=e(l),n=a(78),o=d(n),p=function(a){function b(){var c,d,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};f(this,b);var h=(0,m["default"])(e,{kind:i.VideoTrackKind[e.kind]||""}),j=c=g(this,a.call(this,h)),k=!1;if(o.IS_IE8)for(var l in b.prototype)"constructor"!==l&&(j[l]=b.prototype[l]);return Object.defineProperty(j,"selected",{get:function(){return k},set:function(a){"boolean"==typeof a&&a!==k&&(k=a,this.trigger("selectedchange"))}}),h.selected&&(j.selected=h.selected),d=j,g(c,d)}return h(b,a),b}(k["default"]);c["default"]=p},{73:73,75:75,78:78,87:87}],78:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0,c.BACKGROUND_SIZE_SUPPORTED=c.TOUCH_ENABLED=c.IS_ANY_SAFARI=c.IS_SAFARI=c.IE_VERSION=c.IS_IE8=c.IS_CHROME=c.IS_EDGE=c.IS_FIREFOX=c.IS_NATIVE_ANDROID=c.IS_OLD_ANDROID=c.ANDROID_VERSION=c.IS_ANDROID=c.IOS_VERSION=c.IS_IOS=c.IS_IPOD=c.IS_IPHONE=c.IS_IPAD=void 0;var f=a(81),g=e(f),h=a(95),i=d(h),j=i["default"].navigator&&i["default"].navigator.userAgent||"",k=/AppleWebKit\/([\d.]+)/i.exec(j),l=k?parseFloat(k.pop()):null,m=c.IS_IPAD=/iPad/i.test(j),n=c.IS_IPHONE=/iPhone/i.test(j)&&!m,o=c.IS_IPOD=/iPod/i.test(j),p=c.IS_IOS=n||m||o,q=(c.IOS_VERSION=function(){var a=j.match(/OS (\d+)_/i);return a&&a[1]?a[1]:null}(),c.IS_ANDROID=/Android/i.test(j)),r=c.ANDROID_VERSION=function(){var a=j.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!a)return null;var b=a[1]&&parseFloat(a[1]),c=a[2]&&parseFloat(a[2]);return b&&c?parseFloat(a[1]+"."+a[2]):b?b:null}(),s=(c.IS_OLD_ANDROID=q&&/webkit/i.test(j)&&r<2.3,c.IS_NATIVE_ANDROID=q&&r<5&&l<537,c.IS_FIREFOX=/Firefox/i.test(j),c.IS_EDGE=/Edge/i.test(j)),t=c.IS_CHROME=!s&&/Chrome/i.test(j),u=(c.IS_IE8=/MSIE\s8\.0/.test(j),c.IE_VERSION=function(){var a=/MSIE\s(\d+)\.\d/.exec(j),b=a&&parseFloat(a[1]);return!b&&/Trident\/7.0/i.test(j)&&/rv:11.0/.test(j)&&(b=11),b}(),c.IS_SAFARI=/Safari/i.test(j)&&!t&&!q&&!s);c.IS_ANY_SAFARI=u||p,c.TOUCH_ENABLED=g.isReal()&&("ontouchstart"in i["default"]||i["default"].DocumentTouch&&i["default"].document instanceof i["default"].DocumentTouch),c.BACKGROUND_SIZE_SUPPORTED=g.isReal()&&"backgroundSize"in i["default"].document.createElement("video").style},{81:81,95:95}],79:[function(a,b,c){"use strict";function d(a,b){var c=0,d=void 0,f=void 0;if(!b)return 0;a&&a.length||(a=(0,e.createTimeRange)(0,0));for(var g=0;g<a.length;g++)d=a.start(g),f=a.end(g),f>b&&(f=b),c+=f-d;return c/b}c.__esModule=!0,c.bufferedPercent=d;var e=a(90)},{90:90}],80:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!a||!b)return"";if("function"==typeof g["default"].getComputedStyle){var c=g["default"].getComputedStyle(a);return c?c[b]:""}return a.currentStyle[b]||""}c.__esModule=!0,c["default"]=e;var f=a(95),g=d(f)},{95:95}],81:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){return a.raw=b,a}function g(a){return"string"==typeof a&&/\S/.test(a)}function h(a){if(/\s/.test(a))throw new Error("class has illegal whitespace characters")}function i(a){return new RegExp("(^|\\s)"+a+"($|\\s)")}function j(){return N["default"]===P["default"].document&&"undefined"!=typeof N["default"].createElement}function k(a){return(0,W.isObject)(a)&&1===a.nodeType}function l(a){return function(b,c){if(!g(b))return N["default"][a](null);g(c)&&(c=N["default"].querySelector(c));var d=k(c)?c:N["default"];return d[a]&&d[a](b)}}function m(a){return 0===a.indexOf("#")&&(a=a.slice(1)),N["default"].getElementById(a)}function n(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},d=arguments[3],e=N["default"].createElement(a);return Object.getOwnPropertyNames(b).forEach(function(a){var c=b[a];a.indexOf("aria-")!==-1||"role"===a||"type"===a?(T["default"].warn((0,V["default"])(L,a,c)),e.setAttribute(a,c)):"textContent"===a?o(e,c):e[a]=c}),Object.getOwnPropertyNames(c).forEach(function(a){e.setAttribute(a,c[a])}),d&&J(e,d),e}function o(a,b){return"undefined"==typeof a.textContent?a.innerText=b:a.textContent=b,a}function p(a,b){b.firstChild?b.insertBefore(a,b.firstChild):b.appendChild(a)}function q(a){var b=a[Y];return b||(b=a[Y]=R.newGUID()),X[b]||(X[b]={}),X[b]}function r(a){var b=a[Y];return!!b&&!!Object.getOwnPropertyNames(X[b]).length}function s(a){var b=a[Y];if(b){delete X[b];try{delete a[Y]}catch(c){a.removeAttribute?a.removeAttribute(Y):a[Y]=null}}}function t(a,b){return h(b),a.classList?a.classList.contains(b):i(b).test(a.className)}function u(a,b){return a.classList?a.classList.add(b):t(a,b)||(a.className=(a.className+" "+b).trim()),a}function v(a,b){return a.classList?a.classList.remove(b):(h(b),a.className=a.className.split(/\s+/).filter(function(a){return a!==b}).join(" ")),a}function w(a,b,c){var d=t(a,b);if("function"==typeof c&&(c=c(a,b)),"boolean"!=typeof c&&(c=!d),c!==d)return c?u(a,b):v(a,b),a}function x(a,b){Object.getOwnPropertyNames(b).forEach(function(c){var d=b[c];null===d||void 0===d||d===!1?a.removeAttribute(c):a.setAttribute(c,d===!0?"":d)})}function y(a){var b={};if(a&&a.attributes&&a.attributes.length>0)for(var c=a.attributes,d=c.length-1;d>=0;d--){var e=c[d].name,f=c[d].value;"boolean"!=typeof a[e]&&",autoplay,controls,loop,muted,default,".indexOf(","+e+",")===-1||(f=null!==f),b[e]=f}return b}function z(a,b){return a.getAttribute(b)}function A(a,b,c){a.setAttribute(b,c)}function B(a,b){a.removeAttribute(b)}function C(){N["default"].body.focus(),N["default"].onselectstart=function(){return!1}}function D(){N["default"].onselectstart=function(){return!0}}function E(a){var b=void 0;if(a.getBoundingClientRect&&a.parentNode&&(b=a.getBoundingClientRect()),!b)return{left:0,top:0};var c=N["default"].documentElement,d=N["default"].body,e=c.clientLeft||d.clientLeft||0,f=P["default"].pageXOffset||d.scrollLeft,g=b.left+f-e,h=c.clientTop||d.clientTop||0,i=P["default"].pageYOffset||d.scrollTop,j=b.top+i-h;return{left:Math.round(g),top:Math.round(j)}}function F(a,b){var c={},d=E(a),e=a.offsetWidth,f=a.offsetHeight,g=d.top,h=d.left,i=b.pageY,j=b.pageX;return b.changedTouches&&(j=b.changedTouches[0].pageX,i=b.changedTouches[0].pageY),c.y=Math.max(0,Math.min(1,(g-i+f)/f)),c.x=Math.max(0,Math.min(1,(j-h)/e)),c}function G(a){return(0,W.isObject)(a)&&3===a.nodeType}function H(a){for(;a.firstChild;)a.removeChild(a.firstChild);return a}function I(a){return"function"==typeof a&&(a=a()),(Array.isArray(a)?a:[a]).map(function(a){return"function"==typeof a&&(a=a()),k(a)||G(a)?a:"string"==typeof a&&/\S/.test(a)?N["default"].createTextNode(a):void 0}).filter(function(a){return a})}function J(a,b){return I(b).forEach(function(b){return a.appendChild(b)}),a}function K(a,b){return J(H(a),b)}c.__esModule=!0,c.$$=c.$=void 0;var L=f(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."],["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."]);c.isReal=j,c.isEl=k,c.getEl=m,c.createEl=n,c.textContent=o,c.insertElFirst=p,c.getElData=q,c.hasElData=r,c.removeElData=s,c.hasElClass=t,c.addElClass=u,c.removeElClass=v,c.toggleElClass=w,c.setElAttributes=x,c.getElAttributes=y,c.getAttribute=z,c.setAttribute=A,c.removeAttribute=B,c.blockTextSelection=C,c.unblockTextSelection=D,c.findElPosition=E,c.getPointerPosition=F,c.isTextNode=G,c.emptyEl=H,c.normalizeContent=I,c.appendContent=J,c.insertContent=K;var M=a(94),N=e(M),O=a(95),P=e(O),Q=a(85),R=d(Q),S=a(86),T=e(S),U=a(98),V=e(U),W=a(88),X={},Y="vdata"+(new Date).getTime();c.$=l("querySelector"),c.$$=l("querySelectorAll")},{85:85,86:86,88:88,94:94,95:95,98:98}],82:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b){var c=n.getElData(a);0===c.handlers[b].length&&(delete c.handlers[b],a.removeEventListener?a.removeEventListener(b,c.dispatcher,!1):a.detachEvent&&a.detachEvent("on"+b,c.dispatcher)),Object.getOwnPropertyNames(c.handlers).length<=0&&(delete c.handlers,delete c.dispatcher,delete c.disabled),0===Object.getOwnPropertyNames(c).length&&n.removeElData(a)}function g(a,b,c,d){c.forEach(function(c){a(b,c,d)})}function h(a){function b(){return!0}function c(){return!1}if(!a||!a.isPropagationStopped){var d=a||t["default"].event;a={};for(var e in d)"layerX"!==e&&"layerY"!==e&&"keyLocation"!==e&&"webkitMovementX"!==e&&"webkitMovementY"!==e&&("returnValue"===e&&d.preventDefault||(a[e]=d[e]));if(a.target||(a.target=a.srcElement||v["default"]),a.relatedTarget||(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement),a.preventDefault=function(){d.preventDefault&&d.preventDefault(),a.returnValue=!1,d.returnValue=!1,a.defaultPrevented=!0},a.defaultPrevented=!1,a.stopPropagation=function(){d.stopPropagation&&d.stopPropagation(),a.cancelBubble=!0,d.cancelBubble=!0,a.isPropagationStopped=b},a.isPropagationStopped=c,a.stopImmediatePropagation=function(){d.stopImmediatePropagation&&d.stopImmediatePropagation(),a.isImmediatePropagationStopped=b,a.stopPropagation()},a.isImmediatePropagationStopped=c,null!==a.clientX&&void 0!==a.clientX){var f=v["default"].documentElement,g=v["default"].body;a.pageX=a.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=a.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)}a.which=a.charCode||a.keyCode,null!==a.button&&void 0!==a.button&&(a.button=1&a.button?0:4&a.button?1:2&a.button?2:0)}return a}function i(a,b,c){if(Array.isArray(b))return g(i,a,b,c);var d=n.getElData(a);d.handlers||(d.handlers={}),d.handlers[b]||(d.handlers[b]=[]),c.guid||(c.guid=p.newGUID()),d.handlers[b].push(c),d.dispatcher||(d.disabled=!1,d.dispatcher=function(b,c){if(!d.disabled){b=h(b);var e=d.handlers[b.type];if(e)for(var f=e.slice(0),g=0,i=f.length;g<i&&!b.isImmediatePropagationStopped();g++)try{f[g].call(a,b,c)}catch(j){r["default"].error(j)}}}),1===d.handlers[b].length&&(a.addEventListener?a.addEventListener(b,d.dispatcher,!1):a.attachEvent&&a.attachEvent("on"+b,d.dispatcher))}function j(a,b,c){if(n.hasElData(a)){var d=n.getElData(a);if(d.handlers){if(Array.isArray(b))return g(j,a,b,c);var e=function(b){d.handlers[b]=[],f(a,b)};if(b){var h=d.handlers[b];if(h){if(!c)return void e(b);if(c.guid)for(var i=0;i<h.length;i++)h[i].guid===c.guid&&h.splice(i--,1);f(a,b)}}else for(var k in d.handlers)e(k)}}}function k(a,b,c){var d=n.hasElData(a)?n.getElData(a):{},e=a.parentNode||a.ownerDocument;if("string"==typeof b&&(b={type:b,target:a}),b=h(b),d.dispatcher&&d.dispatcher.call(a,b,c),e&&!b.isPropagationStopped()&&b.bubbles===!0)k.call(null,e,b,c);else if(!e&&!b.defaultPrevented){var f=n.getElData(b.target);b.target[b.type]&&(f.disabled=!0,"function"==typeof b.target[b.type]&&b.target[b.type](),f.disabled=!1)}return!b.defaultPrevented}function l(a,b,c){if(Array.isArray(b))return g(l,a,b,c);var d=function e(){j(a,b,e),c.apply(this,arguments)};d.guid=c.guid=c.guid||p.newGUID(),i(a,b,d)}c.__esModule=!0,c.fixEvent=h,c.on=i,c.off=j,c.trigger=k,c.one=l;var m=a(81),n=e(m),o=a(85),p=e(o),q=a(86),r=d(q),s=a(95),t=d(s),u=a(94),v=d(u)},{81:81,85:85,86:86,94:94,95:95}],83:[function(a,b,c){"use strict";c.__esModule=!0,c.throttle=c.bind=void 0;var d=a(85);c.bind=function(a,b,c){b.guid||(b.guid=(0,d.newGUID)());var e=function(){return b.apply(a,arguments)};return e.guid=c?c+"_"+b.guid:b.guid,e},c.throttle=function(a,b){var c=Date.now();return function(){var d=Date.now();d-c>=b&&(a.apply(void 0,arguments),c=d)}}},{85:85}],84:[function(a,b,c){"use strict";function d(a){var b=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;a=a<0?0:a;var c=Math.floor(a%60),d=Math.floor(a/60%60),e=Math.floor(a/3600),f=Math.floor(b/60%60),g=Math.floor(b/3600);return(isNaN(a)||a===1/0)&&(e=d=c="-"),e=e>0||g>0?e+":":"",d=((e||f>=10)&&d<10?"0"+d:d)+":",c=c<10?"0"+c:c,e+d+c}c.__esModule=!0,c["default"]=d},{}],85:[function(a,b,c){"use strict";function d(){return e++}c.__esModule=!0,c.newGUID=d;var e=1},{}],86:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.logByType=void 0;var e=a(95),f=d(e),g=a(78),h=a(88),i=void 0,j=c.logByType=function(a,b){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:!!g.IE_VERSION&&g.IE_VERSION<11;"log"!==a&&b.unshift(a.toUpperCase()+":"),i.history.push(b),b.unshift("VIDEOJS:");var d=f["default"].console&&f["default"].console[a];d&&(c&&(b=b.map(function(a){if((0,h.isObject)(a)||Array.isArray(a))try{return JSON.stringify(a)}catch(b){return String(a)}return String(a)}).join(" ")),d.apply?d[Array.isArray(b)?"apply":"call"](f["default"].console,b):d(b))};i=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];j("log",b)},i.history=[],i.error=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return j("error",b)},i.warn=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return j("warn",b)},c["default"]=i},{78:78,88:88,95:95}],87:[function(a,b,c){"use strict";function d(){for(var a={},b=arguments.length,c=Array(b),f=0;f<b;f++)c[f]=arguments[f];return c.forEach(function(b){b&&(0,e.each)(b,function(b,c){if(!(0,e.isPlain)(b))return void(a[c]=b);(0,e.isPlain)(a[c])||(a[c]={}),a[c]=d(a[c],b)})}),a}c.__esModule=!0,c["default"]=d;var e=a(88)},{88:88}],88:[function(a,b,c){"use strict";function d(a,b){k(a).forEach(function(c){return b(a[c],c)})}function e(a,b){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return k(a).reduce(function(c,d){return b(c,a[d],d)},c)}function f(a){for(var b=arguments.length,c=Array(b>1?b-1:0),e=1;e<b;e++)c[e-1]=arguments[e];return Object.assign?Object.assign.apply(Object,[a].concat(c)):(c.forEach(function(b){b&&d(b,function(b,c){a[c]=b})}),a)}function g(a){return!!a&&"object"===(void 0===a?"undefined":i(a))}function h(a){return g(a)&&"[object Object]"===j.call(a)&&a.constructor===Object}c.__esModule=!0;var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};c.each=d,c.reduce=e,c.assign=f,c.isObject=g,c.isPlain=h;var j=Object.prototype.toString,k=function(a){return g(a)?Object.keys(a):[]}},{}],89:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.setTextContent=c.createStyleElement=void 0;var e=a(94),f=d(e);c.createStyleElement=function(a){var b=f["default"].createElement("style");return b.className=a,b},c.setTextContent=function(a,b){a.styleSheet?a.styleSheet.cssText=b:a.textContent=b}},{94:94}],90:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b,c){if(b<0||b>c)throw new Error("Failed to execute '"+a+"' on 'TimeRanges': The index provided ("+b+") is greater than or equal to the maximum bound ("+c+").")}function f(a,b,c,d){return void 0===d&&(j["default"].warn("DEPRECATED: Function '"+a+"' on 'TimeRanges' called without an index argument."),d=0),e(a,d,c.length-1),c[d][b]}function g(a){return void 0===a||0===a.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:a.length,start:f.bind(null,"start",0,a),end:f.bind(null,"end",1,a)}}function h(a,b){return Array.isArray(a)?g(a):void 0===a||void 0===b?g():g([[a,b]])}c.__esModule=!0,c.createTimeRange=void 0,c.createTimeRanges=h;var i=a(86),j=d(i);c.createTimeRange=h},{86:86}],91:[function(a,b,c){"use strict";function d(a){return"string"!=typeof a?a:a.charAt(0).toUpperCase()+a.slice(1)}c.__esModule=!0,c["default"]=d},{}],92:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0,c.isCrossOrigin=c.getFileExtension=c.getAbsoluteURL=c.parseUrl=void 0;var e=a(94),f=d(e),g=a(95),h=d(g),i=c.parseUrl=function(a){var b=["protocol","hostname","port","pathname","search","hash","host"],c=f["default"].createElement("a");c.href=a;var d=""===c.host&&"file:"!==c.protocol,e=void 0;d&&(e=f["default"].createElement("div"),e.innerHTML='<a href="'+a+'"></a>',c=e.firstChild,e.setAttribute("style","display:none; position:absolute;"),f["default"].body.appendChild(e));for(var g={},h=0;h<b.length;h++)g[b[h]]=c[b[h]];return"http:"===g.protocol&&(g.host=g.host.replace(/:80$/,"")),"https:"===g.protocol&&(g.host=g.host.replace(/:443$/,"")),d&&f["default"].body.removeChild(e),g};c.getAbsoluteURL=function(a){if(!a.match(/^https?:\/\//)){var b=f["default"].createElement("div");b.innerHTML='<a href="'+a+'">x</a>',a=b.firstChild.href}return a},c.getFileExtension=function(a){if("string"==typeof a){var b=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,c=b.exec(a);if(c)return c.pop().toLowerCase()}return""},c.isCrossOrigin=function(a){var b=h["default"].location,c=i(a);return(":"===c.protocol?b.protocol:c.protocol)+c.host!==b.protocol+b.host}},{94:94,95:95}],93:[function(b,c,d){"use strict";function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a){return a&&a.__esModule?a:{"default":a}}function g(a,b,c){var d=void 0;if("string"==typeof a){if(0===a.indexOf("#")&&(a=a.slice(1)),g.getPlayers()[a])return b&&O["default"].warn('Player "'+a+'" is already initialised. Options will not be applied.'),c&&g.getPlayers()[a].ready(c),g.getPlayers()[a];d=Q.getEl(a)}else d=a;if(!d||!d.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");if(d.player||x["default"].players[d.playerId])return d.player||x["default"].players[d.playerId];b=b||{},g.hooks("beforesetup").forEach(function(a){var c=a(d,(0,B["default"])(b));if(!(0,V.isObject)(c)||Array.isArray(c))return void O["default"].error("please return an object in beforesetup hooks");b=(0,B["default"])(b,c)});var e=r["default"].getComponent("Player"),f=new e(d,b,c);return g.hooks("setup").forEach(function(a){return a(f)}),f}d.__esModule=!0;var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},i=b(95),j=f(i),k=b(94),l=f(k),m=b(56),n=e(m),o=b(89),p=e(o),q=b(5),r=f(q),s=b(42),t=f(s),u=b(82),v=e(u),w=b(51),x=f(w),y=b(52),z=f(y),A=b(87),B=f(A),C=b(83),D=e(C),E=b(72),F=f(E),G=b(64),H=f(G),I=b(77),J=f(I),K=b(90),L=b(84),M=f(L),N=b(86),O=f(N),P=b(81),Q=e(P),R=b(78),S=e(R),T=b(92),U=e(T),V=b(88),W=b(80),X=f(W),Y=b(43),Z=f(Y),$=b(99),_=f($),aa=b(62),ba=f(aa);if("undefined"==typeof HTMLVideoElement&&Q.isReal()&&(l["default"].createElement("video"),l["default"].createElement("audio"),l["default"].createElement("track")),g.hooks_={},g.hooks=function(a,b){return g.hooks_[a]=g.hooks_[a]||[],b&&(g.hooks_[a]=g.hooks_[a].concat(b)),g.hooks_[a]},g.hook=function(a,b){g.hooks(a,b)},g.removeHook=function(a,b){var c=g.hooks(a).indexOf(b);return!(c<=-1)&&(g.hooks_[a]=g.hooks_[a].slice(),g.hooks_[a].splice(c,1),!0)},j["default"].VIDEOJS_NO_DYNAMIC_STYLE!==!0&&Q.isReal()){var ca=Q.$(".vjs-styles-defaults");if(!ca){ca=p.createStyleElement("vjs-styles-defaults");var da=Q.$("head");da&&da.insertBefore(ca,da.firstChild),p.setTextContent(ca,"\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")}}n.autoSetupTimeout(1,g),g.VERSION="5.19.2",g.options=x["default"].prototype.options_,g.getPlayers=function(){return x["default"].players},g.players=x["default"].players,g.getComponent=r["default"].getComponent,g.registerComponent=function(a,b){ba["default"].isTech(b)&&O["default"].warn("The "+a+" tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),r["default"].registerComponent.call(r["default"],a,b)},g.getTech=ba["default"].getTech,g.registerTech=ba["default"].registerTech,g.browser=S,g.TOUCH_ENABLED=S.TOUCH_ENABLED,g.extend=Z["default"],g.mergeOptions=B["default"],g.bind=D.bind,g.plugin=z["default"],g.addLanguage=function(a,b){var c;return a=(""+a).toLowerCase(),g.options.languages=(0,B["default"])(g.options.languages,(c={},c[a]=b,c)),g.options.languages[a]},g.log=O["default"],g.createTimeRange=g.createTimeRanges=K.createTimeRanges,g.formatTime=M["default"],g.parseUrl=U.parseUrl,g.isCrossOrigin=U.isCrossOrigin,g.EventTarget=t["default"],g.on=v.on,g.one=v.one,g.off=v.off,g.trigger=v.trigger,g.xhr=_["default"],g.TextTrack=F["default"],g.AudioTrack=H["default"],g.VideoTrack=J["default"],g.isEl=Q.isEl,g.isTextNode=Q.isTextNode,g.createEl=Q.createEl,g.hasClass=Q.hasElClass,g.addClass=Q.addElClass,g.removeClass=Q.removeElClass,g.toggleClass=Q.toggleElClass,g.setAttributes=Q.setElAttributes,g.getAttributes=Q.getElAttributes,g.emptyEl=Q.emptyEl,g.appendContent=Q.appendContent,g.insertContent=Q.insertContent,g.computedStyle=X["default"],"function"==typeof a&&a.amd?a("videojs",[],function(){return g}):"object"===(void 0===d?"undefined":h(d))&&"object"===(void 0===c?"undefined":h(c))&&(c.exports=g),d["default"]=g},{42:42,43:43,5:5,51:51,52:52,56:56,62:62,64:64,72:72,77:77,78:78,80:80,81:81,82:82,83:83,84:84,86:86,87:87,88:88,89:89,90:90,92:92,94:94,95:95,99:99}],94:[function(a,b,c){(function(c){var d=void 0!==c?c:"undefined"!=typeof window?window:{},e=a(96);if("undefined"!=typeof document)b.exports=document;else{var f=d["__GLOBAL_DOCUMENT_CACHE@4"];f||(f=d["__GLOBAL_DOCUMENT_CACHE@4"]=e),b.exports=f}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{96:96}],95:[function(a,b,c){(function(a){"undefined"!=typeof window?b.exports=window:void 0!==a?b.exports=a:"undefined"!=typeof self?b.exports=self:b.exports={}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],96:[function(a,b,c){},{}],97:[function(a,b,c){function d(a,b){var c,d=null;try{c=JSON.parse(a,b)}catch(e){d=e}return[d,c]}b.exports=d},{}],98:[function(a,b,c){function d(a){return a.replace(/\n\r?\s*/g,"")}b.exports=function(a){for(var b="",c=0;c<arguments.length;c++)b+=d(a[c])+(arguments[c+1]||"");return b}},{}],99:[function(a,b,c){"use strict";function d(a,b){for(var c=0;c<a.length;c++)b(a[c])}function e(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function f(a,b,c){var d=a;return l(b)?(c=b,"string"==typeof a&&(d={uri:a})):d=n(b,{uri:a}),d.callback=c,d}function g(a,b,c){return b=f(a,b,c),h(b)}function h(a){function b(){4===k.readyState&&setTimeout(f,0)}function c(){var a=void 0;if(a=k.response?k.response:k.responseText||i(k),u)try{a=JSON.parse(a)}catch(b){}return a}function d(a){return clearTimeout(o),a instanceof Error||(a=new Error(""+(a||"Unknown XMLHttpRequest Error"))),a.statusCode=0,j(a,v)}function f(){if(!n){var b;clearTimeout(o),b=a.useXDR&&void 0===k.status?200:1223===k.status?204:k.status;var d=v,e=null;return 0!==b?(d={body:c(),statusCode:b,method:q,headers:{},url:p,rawRequest:k},k.getAllResponseHeaders&&(d.headers=m(k.getAllResponseHeaders()))):e=new Error("Internal XMLHttpRequest Error"),j(e,d,d.body)}}
if("undefined"==typeof a.callback)throw new Error("callback argument missing");var h=!1,j=function(b,c,d){h||(h=!0,a.callback(b,c,d))},k=a.xhr||null;k||(k=a.cors||a.useXDR?new g.XDomainRequest:new g.XMLHttpRequest);var l,n,o,p=k.url=a.uri||a.url,q=k.method=a.method||"GET",r=a.body||a.data,s=k.headers=a.headers||{},t=!!a.sync,u=!1,v={body:void 0,headers:{},statusCode:0,method:q,url:p,rawRequest:k};if("json"in a&&a.json!==!1&&(u=!0,s.accept||s.Accept||(s.Accept="application/json"),"GET"!==q&&"HEAD"!==q&&(s["content-type"]||s["Content-Type"]||(s["Content-Type"]="application/json"),r=JSON.stringify(a.json===!0?r:a.json))),k.onreadystatechange=b,k.onload=f,k.onerror=d,k.onprogress=function(){},k.onabort=function(){n=!0},k.ontimeout=d,k.open(q,p,!t,a.username,a.password),t||(k.withCredentials=!!a.withCredentials),!t&&a.timeout>0&&(o=setTimeout(function(){if(!n){n=!0,k.abort("timeout");var a=new Error("XMLHttpRequest timeout");a.code="ETIMEDOUT",d(a)}},a.timeout)),k.setRequestHeader)for(l in s)s.hasOwnProperty(l)&&k.setRequestHeader(l,s[l]);else if(a.headers&&!e(a.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in a&&(k.responseType=a.responseType),"beforeSend"in a&&"function"==typeof a.beforeSend&&a.beforeSend(k),k.send(r||null),k}function i(a){if("document"===a.responseType)return a.responseXML;var b=a.responseXML&&"parsererror"===a.responseXML.documentElement.nodeName;return""!==a.responseType||b?null:a.responseXML}function j(){}var k=a(95),l=a(100),m=a(103),n=a(104);b.exports=g,g.XMLHttpRequest=k.XMLHttpRequest||j,g.XDomainRequest="withCredentials"in new g.XMLHttpRequest?g.XMLHttpRequest:k.XDomainRequest,d(["get","put","post","patch","head","delete"],function(a){g["delete"===a?"del":a]=function(b,c,d){return c=f(b,c,d),c.method=a.toUpperCase(),h(c)}})},{100:100,103:103,104:104,95:95}],100:[function(a,b,c){function d(a){var b=e.call(a);return"[object Function]"===b||"function"==typeof a&&"[object RegExp]"!==b||"undefined"!=typeof window&&(a===window.setTimeout||a===window.alert||a===window.confirm||a===window.prompt)}b.exports=d;var e=Object.prototype.toString},{}],101:[function(a,b,c){function d(a,b,c){if(!h(b))throw new TypeError("iterator must be a function");arguments.length<3&&(c=this),"[object Array]"===i.call(a)?e(a,b,c):"string"==typeof a?f(a,b,c):g(a,b,c)}function e(a,b,c){for(var d=0,e=a.length;d<e;d++)j.call(a,d)&&b.call(c,a[d],d,a)}function f(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c,a.charAt(d),d,a)}function g(a,b,c){for(var d in a)j.call(a,d)&&b.call(c,a[d],d,a)}var h=a(100);b.exports=d;var i=Object.prototype.toString,j=Object.prototype.hasOwnProperty},{100:100}],102:[function(a,b,c){function d(a){return a.replace(/^\s*|\s*$/g,"")}c=b.exports=d,c.left=function(a){return a.replace(/^\s*/,"")},c.right=function(a){return a.replace(/\s*$/,"")}},{}],103:[function(a,b,c){var d=a(102),e=a(101),f=function(a){return"[object Array]"===Object.prototype.toString.call(a)};b.exports=function(a){if(!a)return{};var b={};return e(d(a).split("\n"),function(a){var c=a.indexOf(":"),e=d(a.slice(0,c)).toLowerCase(),g=d(a.slice(c+1));"undefined"==typeof b[e]?b[e]=g:f(b[e])?b[e].push(g):b[e]=[b[e],g]}),b}},{101:101,102:102}],104:[function(a,b,c){function d(){for(var a={},b=0;b<arguments.length;b++){var c=arguments[b];for(var d in c)e.call(c,d)&&(a[d]=c[d])}return a}b.exports=d;var e=Object.prototype.hasOwnProperty},{}],105:[function(a,b,c){var d=a(109),e=b.exports={WebVTT:a(106).WebVTT,VTTCue:a(107).VTTCue,VTTRegion:a(108).VTTRegion};d.vttjs=e,d.WebVTT=e.WebVTT;var f=e.VTTCue,g=e.VTTRegion,h=d.VTTCue,i=d.VTTRegion;e.shim=function(){d.VTTCue=f,d.VTTRegion=g},e.restore=function(){d.VTTCue=h,d.VTTRegion=i},d.VTTCue||e.shim()},{106:106,107:107,108:108,109:109}],106:[function(a,b,c){!function(a){function b(a,b){this.name="ParsingError",this.code=a.code,this.message=b||a.message}function c(a){function b(a,b,c,d){return 3600*(0|a)+60*(0|b)+(0|c)+(0|d)/1e3}var c=a.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return c?c[3]?b(c[1],c[2],c[3].replace(":",""),c[4]):c[1]>59?b(c[1],c[2],0,c[4]):b(0,c[1],c[2],c[4]):null}function d(){this.values=p(null)}function e(a,b,c,d){var e=d?a.split(d):[a];for(var f in e)if("string"==typeof e[f]){var g=e[f].split(c);if(2===g.length){var h=g[0],i=g[1];b(h,i)}}}function f(a,f,g){function h(){var d=c(a);if(null===d)throw new b(b.Errors.BadTimeStamp,"Malformed timestamp: "+k);return a=a.replace(/^[^\sa-zA-Z-]+/,""),d}function i(a,b){var c=new d;e(a,function(a,b){switch(a){case"region":for(var d=g.length-1;d>=0;d--)if(g[d].id===b){c.set(a,g[d].region);break}break;case"vertical":c.alt(a,b,["rl","lr"]);break;case"line":var e=b.split(","),f=e[0];c.integer(a,f),c.percent(a,f)&&c.set("snapToLines",!1),c.alt(a,f,["auto"]),2===e.length&&c.alt("lineAlign",e[1],["start","middle","end"]);break;case"position":e=b.split(","),c.percent(a,e[0]),2===e.length&&c.alt("positionAlign",e[1],["start","middle","end"]);break;case"size":c.percent(a,b);break;case"align":c.alt(a,b,["start","middle","end","left","right"])}},/:/,/\s/),b.region=c.get("region",null),b.vertical=c.get("vertical",""),b.line=c.get("line","auto"),b.lineAlign=c.get("lineAlign","start"),b.snapToLines=c.get("snapToLines",!0),b.size=c.get("size",100),b.align=c.get("align","middle"),b.position=c.get("position",{start:0,left:0,middle:50,end:100,right:100},b.align),b.positionAlign=c.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},b.align)}function j(){a=a.replace(/^\s+/,"")}var k=a;if(j(),f.startTime=h(),j(),"-->"!==a.substr(0,3))throw new b(b.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+k);a=a.substr(3),j(),f.endTime=h(),j(),i(a,f)}function g(a,b){function d(){function a(a){return b=b.substr(a.length),a}if(!b)return null;var c=b.match(/^([^<]*)(<[^>]+>?)?/);return a(c[1]?c[1]:c[2])}function e(a){return q[a]}function f(a){for(;o=a.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)a=a.replace(o[0],e);return a}function g(a,b){return!t[b.localName]||t[b.localName]===a.localName}function h(b,c){var d=r[b];if(!d)return null;var e=a.document.createElement(d);e.localName=d;var f=s[b];return f&&c&&(e[f]=c.trim()),e}for(var i,j=a.document.createElement("div"),k=j,l=[];null!==(i=d());)if("<"!==i[0])k.appendChild(a.document.createTextNode(f(i)));else{if("/"===i[1]){l.length&&l[l.length-1]===i.substr(2).replace(">","")&&(l.pop(),k=k.parentNode);continue}var m,n=c(i.substr(1,i.length-2));if(n){m=a.document.createProcessingInstruction("timestamp",n),k.appendChild(m);continue}var o=i.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!o)continue;if(m=h(o[1],o[3]),!m)continue;if(!g(k,m))continue;o[2]&&(m.className=o[2].substr(1).replace("."," ")),l.push(o[1]),k.appendChild(m),k=m}return j}function h(a){for(var b=0;b<u.length;b++){var c=u[b];if(a>=c[0]&&a<=c[1])return!0}return!1}function i(a){function b(a,b){for(var c=b.childNodes.length-1;c>=0;c--)a.push(b.childNodes[c])}function c(a){if(!a||!a.length)return null;var d=a.pop(),e=d.textContent||d.innerText;if(e){var f=e.match(/^.*(\n|\r)/);return f?(a.length=0,f[0]):e}return"ruby"===d.tagName?c(a):d.childNodes?(b(a,d),c(a)):void 0}var d,e=[],f="";if(!a||!a.childNodes)return"ltr";for(b(e,a);f=c(e);)for(var g=0;g<f.length;g++)if(d=f.charCodeAt(g),h(d))return"rtl";return"ltr"}function j(a){if("number"==typeof a.line&&(a.snapToLines||a.line>=0&&a.line<=100))return a.line;if(!a.track||!a.track.textTrackList||!a.track.textTrackList.mediaElement)return-1;for(var b=a.track,c=b.textTrackList,d=0,e=0;e<c.length&&c[e]!==b;e++)"showing"===c[e].mode&&d++;return++d*-1}function k(){}function l(a,b,c){var d=/MSIE\s8\.0/.test(navigator.userAgent),e="rgba(255, 255, 255, 1)",f="rgba(0, 0, 0, 0.8)";d&&(e="rgb(255, 255, 255)",f="rgb(0, 0, 0)"),k.call(this),this.cue=b,this.cueDiv=g(a,b.text);var h={color:e,backgroundColor:f,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};d||(h.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl",h.unicodeBidi="plaintext"),this.applyStyles(h,this.cueDiv),this.div=a.document.createElement("div"),h={textAlign:"middle"===b.align?"center":b.align,font:c.font,whiteSpace:"pre-line",position:"absolute"},d||(h.direction=i(this.cueDiv),h.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(h),this.div.appendChild(this.cueDiv);var j=0;switch(b.positionAlign){case"start":j=b.position;break;case"middle":j=b.position-b.size/2;break;case"end":j=b.position-b.size}""===b.vertical?this.applyStyles({left:this.formatStyle(j,"%"),width:this.formatStyle(b.size,"%")}):this.applyStyles({top:this.formatStyle(j,"%"),height:this.formatStyle(b.size,"%")}),this.move=function(a){this.applyStyles({top:this.formatStyle(a.top,"px"),bottom:this.formatStyle(a.bottom,"px"),left:this.formatStyle(a.left,"px"),right:this.formatStyle(a.right,"px"),height:this.formatStyle(a.height,"px"),width:this.formatStyle(a.width,"px")})}}function m(a){var b,c,d,e,f=/MSIE\s8\.0/.test(navigator.userAgent);if(a.div){c=a.div.offsetHeight,d=a.div.offsetWidth,e=a.div.offsetTop;var g=(g=a.div.childNodes)&&(g=g[0])&&g.getClientRects&&g.getClientRects();a=a.div.getBoundingClientRect(),b=g?Math.max(g[0]&&g[0].height||0,a.height/g.length):0}this.left=a.left,this.right=a.right,this.top=a.top||e,this.height=a.height||c,this.bottom=a.bottom||e+(a.height||c),this.width=a.width||d,this.lineHeight=void 0!==b?b:a.lineHeight,f&&!this.lineHeight&&(this.lineHeight=13)}function n(a,b,c,d){function e(a,b){for(var e,f=new m(a),g=1,h=0;h<b.length;h++){for(;a.overlapsOppositeAxis(c,b[h])||a.within(c)&&a.overlapsAny(d);)a.move(b[h]);if(a.within(c))return a;var i=a.intersectPercentage(c);g>i&&(e=new m(a),g=i),a=new m(f)}return e||f}var f=new m(b),g=b.cue,h=j(g),i=[];if(g.snapToLines){var k;switch(g.vertical){case"":i=["+y","-y"],k="height";break;case"rl":i=["+x","-x"],k="width";break;case"lr":i=["-x","+x"],k="width"}var l=f.lineHeight,n=l*Math.round(h),o=c[k]+l,p=i[0];Math.abs(n)>o&&(n=n<0?-1:1,n*=Math.ceil(o/l)*l),h<0&&(n+=""===g.vertical?c.height:c.width,i=i.reverse()),f.move(p,n)}else{var q=f.lineHeight/c.height*100;switch(g.lineAlign){case"middle":h-=q/2;break;case"end":h-=q}switch(g.vertical){case"":b.applyStyles({top:b.formatStyle(h,"%")});break;case"rl":b.applyStyles({left:b.formatStyle(h,"%")});break;case"lr":b.applyStyles({right:b.formatStyle(h,"%")})}i=["+y","-x","+x","-y"],f=new m(b)}var r=e(f,i);b.move(r.toCSSCompatValues(c))}function o(){}var p=Object.create||function(){function a(){}return function(b){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return a.prototype=b,new a}}();b.prototype=p(Error.prototype),b.prototype.constructor=b,b.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},d.prototype={set:function(a,b){this.get(a)||""===b||(this.values[a]=b)},get:function(a,b,c){return c?this.has(a)?this.values[a]:b[c]:this.has(a)?this.values[a]:b},has:function(a){return a in this.values},alt:function(a,b,c){for(var d=0;d<c.length;++d)if(b===c[d]){this.set(a,b);break}},integer:function(a,b){/^-?\d+$/.test(b)&&this.set(a,parseInt(b,10))},percent:function(a,b){return!!(b.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(b=parseFloat(b),b>=0&&b<=100))&&(this.set(a,b),!0)}};var q={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},r={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},s={v:"title",lang:"lang"},t={rt:"ruby"},u=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];k.prototype.applyStyles=function(a,b){b=b||this.div;for(var c in a)a.hasOwnProperty(c)&&(b.style[c]=a[c])},k.prototype.formatStyle=function(a,b){return 0===a?0:a+b},l.prototype=p(k.prototype),l.prototype.constructor=l,m.prototype.move=function(a,b){switch(b=void 0!==b?b:this.lineHeight,a){case"+x":this.left+=b,this.right+=b;break;case"-x":this.left-=b,this.right-=b;break;case"+y":this.top+=b,this.bottom+=b;break;case"-y":this.top-=b,this.bottom-=b}},m.prototype.overlaps=function(a){return this.left<a.right&&this.right>a.left&&this.top<a.bottom&&this.bottom>a.top},m.prototype.overlapsAny=function(a){for(var b=0;b<a.length;b++)if(this.overlaps(a[b]))return!0;return!1},m.prototype.within=function(a){return this.top>=a.top&&this.bottom<=a.bottom&&this.left>=a.left&&this.right<=a.right},m.prototype.overlapsOppositeAxis=function(a,b){switch(b){case"+x":return this.left<a.left;case"-x":return this.right>a.right;case"+y":return this.top<a.top;case"-y":return this.bottom>a.bottom}},m.prototype.intersectPercentage=function(a){return Math.max(0,Math.min(this.right,a.right)-Math.max(this.left,a.left))*Math.max(0,Math.min(this.bottom,a.bottom)-Math.max(this.top,a.top))/(this.height*this.width)},m.prototype.toCSSCompatValues=function(a){return{top:this.top-a.top,bottom:a.bottom-this.bottom,left:this.left-a.left,right:a.right-this.right,height:this.height,width:this.width}},m.getSimpleBoxPosition=function(a){var b=a.div?a.div.offsetHeight:a.tagName?a.offsetHeight:0,c=a.div?a.div.offsetWidth:a.tagName?a.offsetWidth:0,d=a.div?a.div.offsetTop:a.tagName?a.offsetTop:0;return a=a.div?a.div.getBoundingClientRect():a.tagName?a.getBoundingClientRect():a,{left:a.left,right:a.right,top:a.top||d,height:a.height||b,bottom:a.bottom||d+(a.height||b),width:a.width||c}},o.StringDecoder=function(){return{decode:function(a){if(!a)return"";if("string"!=typeof a)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(a))}}},o.convertCueToDOMTree=function(a,b){return a&&b?g(a,b):null};o.processCues=function(a,b,c){function d(a){for(var b=0;b<a.length;b++)if(a[b].hasBeenReset||!a[b].displayState)return!0;return!1}if(!a||!b||!c)return null;for(;c.firstChild;)c.removeChild(c.firstChild);var e=a.document.createElement("div");if(e.style.position="absolute",e.style.left="0",e.style.right="0",e.style.top="0",e.style.bottom="0",e.style.margin="1.5%",c.appendChild(e),d(b)){var f=[],g=m.getSimpleBoxPosition(e),h=Math.round(.05*g.height*100)/100,i={font:h+"px sans-serif"};!function(){for(var c,d,h=0;h<b.length;h++)d=b[h],c=new l(a,d,i),e.appendChild(c.div),n(a,c,g,f),d.displayState=c.div,f.push(m.getSimpleBoxPosition(c))}()}else for(var j=0;j<b.length;j++)e.appendChild(b[j].displayState)},o.Parser=function(a,b,c){c||(c=b,b={}),b||(b={}),this.window=a,this.vttjs=b,this.state="INITIAL",this.buffer="",this.decoder=c||new TextDecoder("utf8"),this.regionList=[]},o.Parser.prototype={reportOrThrowError:function(a){if(!(a instanceof b))throw a;this.onparsingerror&&this.onparsingerror(a)},parse:function(a){function g(){for(var a=k.buffer,b=0;b<a.length&&"\r"!==a[b]&&"\n"!==a[b];)++b;var c=a.substr(0,b);return"\r"===a[b]&&++b,"\n"===a[b]&&++b,k.buffer=a.substr(b),c}function h(a){var b=new d;if(e(a,function(a,c){switch(a){case"id":b.set(a,c);break;case"width":b.percent(a,c);break;case"lines":b.integer(a,c);break;case"regionanchor":case"viewportanchor":var e=c.split(",");if(2!==e.length)break;var f=new d;if(f.percent("x",e[0]),f.percent("y",e[1]),!f.has("x")||!f.has("y"))break;b.set(a+"X",f.get("x")),b.set(a+"Y",f.get("y"));break;case"scroll":b.alt(a,c,["up"])}},/=/,/\s/),b.has("id")){var c=new(k.vttjs.VTTRegion||k.window.VTTRegion);c.width=b.get("width",100),c.lines=b.get("lines",3),c.regionAnchorX=b.get("regionanchorX",0),c.regionAnchorY=b.get("regionanchorY",100),c.viewportAnchorX=b.get("viewportanchorX",0),c.viewportAnchorY=b.get("viewportanchorY",100),c.scroll=b.get("scroll",""),k.onregion&&k.onregion(c),k.regionList.push({id:b.get("id"),region:c})}}function i(a){var b=new d;e(a,function(a,d){switch(a){case"MPEGT":b.integer(a+"S",d);break;case"LOCA":b.set(a+"L",c(d))}},/[^\d]:/,/,/),k.ontimestampmap&&k.ontimestampmap({MPEGTS:b.get("MPEGTS"),LOCAL:b.get("LOCAL")})}function j(a){a.match(/X-TIMESTAMP-MAP/)?e(a,function(a,b){switch(a){case"X-TIMESTAMP-MAP":i(b)}},/=/):e(a,function(a,b){switch(a){case"Region":h(b)}},/:/)}var k=this;a&&(k.buffer+=k.decoder.decode(a,{stream:!0}));try{var l;if("INITIAL"===k.state){if(!/\r\n|\n/.test(k.buffer))return this;l=g();var m=l.match(/^WEBVTT([ \t].*)?$/);if(!m||!m[0])throw new b(b.Errors.BadSignature);k.state="HEADER"}for(var n=!1;k.buffer;){if(!/\r\n|\n/.test(k.buffer))return this;switch(n?n=!1:l=g(),k.state){case"HEADER":/:/.test(l)?j(l):l||(k.state="ID");continue;case"NOTE":l||(k.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(l)){k.state="NOTE";break}if(!l)continue;if(k.cue=new(k.vttjs.VTTCue||k.window.VTTCue)(0,0,""),k.state="CUE",l.indexOf("-->")===-1){k.cue.id=l;continue}case"CUE":try{f(l,k.cue,k.regionList)}catch(o){k.reportOrThrowError(o),k.cue=null,k.state="BADCUE";continue}k.state="CUETEXT";continue;case"CUETEXT":var p=l.indexOf("-->")!==-1;if(!l||p&&(n=!0)){k.oncue&&k.oncue(k.cue),k.cue=null,k.state="ID";continue}k.cue.text&&(k.cue.text+="\n"),k.cue.text+=l;continue;case"BADCUE":l||(k.state="ID");continue}}}catch(o){k.reportOrThrowError(o),"CUETEXT"===k.state&&k.cue&&k.oncue&&k.oncue(k.cue),k.cue=null,k.state="INITIAL"===k.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var a=this;try{if(a.buffer+=a.decoder.decode(),(a.cue||"HEADER"===a.state)&&(a.buffer+="\n\n",a.parse()),"INITIAL"===a.state)throw new b(b.Errors.BadSignature)}catch(c){a.reportOrThrowError(c)}return a.onflush&&a.onflush(),this}},a.WebVTT=o}(this,this.vttjs)},{}],107:[function(a,b,c){!function(a,b){function c(a){return"string"==typeof a&&(!!g[a.toLowerCase()]&&a.toLowerCase())}function d(a){return"string"==typeof a&&(!!h[a.toLowerCase()]&&a.toLowerCase())}function e(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]=c[d]}return a}function f(a,b,f){var g=this,h=/MSIE\s8\.0/.test(navigator.userAgent),i={};h?g=document.createElement("custom"):i.enumerable=!0,g.hasBeenReset=!1;var j="",k=!1,l=a,m=b,n=f,o=null,p="",q=!0,r="auto",s="start",t=50,u="middle",v=50,w="middle";if(Object.defineProperty(g,"id",e({},i,{get:function(){return j},set:function(a){j=""+a}})),Object.defineProperty(g,"pauseOnExit",e({},i,{get:function(){return k},set:function(a){k=!!a}})),Object.defineProperty(g,"startTime",e({},i,{get:function(){return l},set:function(a){if("number"!=typeof a)throw new TypeError("Start time must be set to a number.");l=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"endTime",e({},i,{get:function(){return m},set:function(a){if("number"!=typeof a)throw new TypeError("End time must be set to a number.");m=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"text",e({},i,{get:function(){return n},set:function(a){n=""+a,this.hasBeenReset=!0}})),Object.defineProperty(g,"region",e({},i,{get:function(){return o},set:function(a){o=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"vertical",e({},i,{get:function(){return p},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");p=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"snapToLines",e({},i,{get:function(){return q},set:function(a){q=!!a,this.hasBeenReset=!0}})),Object.defineProperty(g,"line",e({},i,{get:function(){return r},set:function(a){if("number"!=typeof a&&"auto"!==a)throw new SyntaxError("An invalid number or illegal string was specified.");r=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"lineAlign",e({},i,{get:function(){return s},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");s=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"position",e({},i,{get:function(){return t},set:function(a){if(a<0||a>100)throw new Error("Position must be between 0 and 100.");t=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"positionAlign",e({},i,{get:function(){return u},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");u=b,this.hasBeenReset=!0}})),Object.defineProperty(g,"size",e({},i,{get:function(){return v},set:function(a){if(a<0||a>100)throw new Error("Size must be between 0 and 100.");v=a,this.hasBeenReset=!0}})),Object.defineProperty(g,"align",e({},i,{get:function(){return w},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");w=b,this.hasBeenReset=!0}})),g.displayState=void 0,h)return g}var g={"":!0,lr:!0,rl:!0},h={start:!0,middle:!0,end:!0,left:!0,right:!0};f.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},a.VTTCue=a.VTTCue||f,b.VTTCue=f}(this,this.vttjs||{})},{}],108:[function(a,b,c){!function(a,b){function c(a){return"string"==typeof a&&(!!f[a.toLowerCase()]&&a.toLowerCase())}function d(a){return"number"==typeof a&&a>=0&&a<=100}function e(){var a=100,b=3,e=0,f=100,g=0,h=100,i="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return a},set:function(b){if(!d(b))throw new Error("Width must be between 0 and 100.");a=b}},lines:{enumerable:!0,get:function(){return b},set:function(a){if("number"!=typeof a)throw new TypeError("Lines must be set to a number.");b=a}},regionAnchorY:{enumerable:!0,get:function(){return f},set:function(a){if(!d(a))throw new Error("RegionAnchorX must be between 0 and 100.");f=a}},regionAnchorX:{enumerable:!0,get:function(){return e},set:function(a){if(!d(a))throw new Error("RegionAnchorY must be between 0 and 100.");e=a}},viewportAnchorY:{enumerable:!0,get:function(){return h},set:function(a){if(!d(a))throw new Error("ViewportAnchorY must be between 0 and 100.");h=a}},viewportAnchorX:{enumerable:!0,get:function(){return g},set:function(a){if(!d(a))throw new Error("ViewportAnchorX must be between 0 and 100.");g=a}},scroll:{enumerable:!0,get:function(){return i},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");i=b}}})}var f={"":!0,up:!0};a.VTTRegion=a.VTTRegion||e,b.VTTRegion=e}(this,this.vttjs||{})},{}],109:[function(a,b,c){arguments[4][95][0].apply(c,arguments)},{95:95}]},{},[93])(93)});
!function(){!function(a){var b=a&&a.videojs;if(b){b.CDN_VERSION="5.19.2";var c="https:"===a.location.protocol?"https://":"http://";b.options.flash.swf=c+"vjs.zencdn.net/swf/5.3.0/video-js.swf"}}(window),function(a,b,c,d,e,f,g){b&&b.HELP_IMPROVE_VIDEOJS!==!1&&(e.random()>.01||(f=b.location,g=b.videojs||{},a.src="//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-3&utmn=1&utmhn="+d(f.hostname)+"&utmsr="+b.screen.availWidth+"x"+b.screen.availHeight+"&utmul="+(c.language||c.userLanguage||"").toLowerCase()+"&utmr="+d(f.href)+"&utmp="+d(f.hostname+f.pathname)+"&utmcc=__utma%3D1."+e.floor(1e10*e.random())+".1.1.1.1%3B&utme=8(vjsv*cdnv)9("+g.VERSION+"*"+g.CDN_VERSION+")"))}(new Image,window,navigator,encodeURIComponent,Math)}();
//# sourceMappingURL=maps/plugins.js.map
