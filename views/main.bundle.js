webpackJsonp([0,4],{

/***/ 1057:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(454);


/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_parse_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthManager; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthManager = (function () {
    function AuthManager(router, tokenService) {
        this.router = router;
        this.tokenService = tokenService;
        this.errMsg = '';
    }
    AuthManager.prototype.canActivate = function (next, state) {
        if (next.url[0].path == 'login') {
            if (window.localStorage.getItem('auth_key')) {
                this.errMsg = 'You are already logged in! ';
                console.log(this.errMsg);
                // alert(this.errMsg + 'Please Logout');
                switch (this.tokenService.getRole()) {
                    case "1":
                        this.router.navigate(['/admin']);
                        break;
                    case "2":
                        this.router.navigate(['/supervisor']);
                        break;
                    case "3":
                        this.router.navigate(['/employee']);
                }
                return false;
            }
            else {
                return true;
            }
        }
        //todo check role from auth_key
        if (window.localStorage.getItem('auth_key')) {
            return true;
        }
        console.log('You must be logged in');
        this.router.navigate(['/login']);
        return false;
    };
    AuthManager = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */]) === 'function' && _b) || Object])
    ], AuthManager);
    return AuthManager;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/authmanager.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globals__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__navbar_navbar_component__ = __webpack_require__(249);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogOutService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LogOutService = (function () {
    function LogOutService(router, http) {
        this.router = router;
        this.http = http;
    }
    LogOutService.prototype.logout = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
        var body = 'token=' + window.localStorage.getItem('auth_key');
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise(function (resolve) {
            _this.http.post(__WEBPACK_IMPORTED_MODULE_3__globals__["a" /* Globals */].BASE_API_URL + '/offline', body, { headers: headers }).subscribe(function (data) {
                resolve(data.json().msg);
            });
        }).then(function (res) {
            console.log(res);
            window.localStorage.removeItem('auth_key');
            __WEBPACK_IMPORTED_MODULE_4__navbar_navbar_component__["a" /* NavbarComponent */].returned.next(false);
            _this.router.navigate(['/login']);
        });
    };
    LogOutService.prototype.logoutSync = function () {
        var xhr = new XMLHttpRequest();
        var body = 'token=' + window.localStorage.getItem('auth_key');
        xhr.open("POST", __WEBPACK_IMPORTED_MODULE_3__globals__["a" /* Globals */].BASE_API_URL + '/offline', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // work only in firefox
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // window.localStorage.removeItem('auth_key');
                // this.router.navigate(['/login']);
                console.log(xhr.responseText);
            }
        };
        xhr.send(body);
    };
    LogOutService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === 'function' && _b) || Object])
    ], LogOutService);
    return LogOutService;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/log-out.service.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_parse_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authmanager__ = __webpack_require__(175);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavbarComponent = (function () {
    function NavbarComponent(router, tokenService, authManager) {
        var _this = this;
        this.router = router;
        this.tokenService = tokenService;
        this.authManager = authManager;
        NavbarComponent.returned.subscribe(function (res) {
            _this.ngOnInit();
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.userName = ['', ''];
        this.userRole = '';
        if (window.localStorage.getItem('auth_key')) {
            this.userName = this.tokenService.getFullName();
            this.userRole = this.tokenService.getRole();
        }
        // this.authError = !!this.authManager.errMsg
    };
    NavbarComponent.prototype.addUser = function () {
        this.router.navigate(['/adduser']);
    };
    NavbarComponent.prototype.editSkills = function () {
        if (this.userRole == "1") {
            this.router.navigate(['/editskills']);
        }
        else {
            this.router.navigate(['/sveditskills']);
        }
    };
    NavbarComponent.prototype.goHome = function () {
        if (this.userRole == "1") {
            this.router.navigate(['/admin']);
        }
        else if (this.userRole == "2") {
            this.router.navigate(['/supervisor']);
        }
    };
    NavbarComponent.prototype.listAllUsers = function () {
        if (this.userRole == "1") {
            this.router.navigate(['/listall']);
        }
        else {
            this.router.navigate(['/svlistall']);
        }
    };
    // private authError: boolean = false;
    NavbarComponent.returned = new __WEBPACK_IMPORTED_MODULE_3_rxjs__["Subject"]();
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(784),
            styles: [__webpack_require__(757)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__authmanager__["a" /* AuthManager */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__authmanager__["a" /* AuthManager */]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/navbar.component.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_parse_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminGuard = (function () {
    function AdminGuard(location, tokenParse) {
        this.location = location;
        this.tokenParse = tokenParse;
        this.errMsg = '';
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        //check role from auth_key
        if (this.tokenParse.getRole() == '1') {
            return true;
        }
        //console.log('token => ', window.localStorage.getItem('auth_key'));
        console.log('Access denied! Permission mismatch');
        alert('Access denied! Permission mismatch');
        this.location.back();
        return false;
    };
    AdminGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */]) === 'function' && _b) || Object])
    ], AdminGuard);
    return AdminGuard;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/admin-guard.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminListsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminListsComponent = (function () {
    function AdminListsComponent() {
    }
    AdminListsComponent.prototype.ngOnInit = function () {
    };
    AdminListsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-lists',
            template: __webpack_require__(772),
            styles: [__webpack_require__(745)]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminListsComponent);
    return AdminListsComponent;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/admin-lists.component.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminSkillsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminSkillsComponent = (function () {
    function AdminSkillsComponent() {
    }
    AdminSkillsComponent.prototype.ngOnInit = function () {
    };
    AdminSkillsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-skills',
            template: __webpack_require__(773),
            styles: [__webpack_require__(746)]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminSkillsComponent);
    return AdminSkillsComponent;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/admin-skills.component.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminComponent = (function () {
    function AdminComponent(router) {
        this.router = router;
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent.prototype.addUser = function () {
        this.router.navigate(['/adduser']);
    };
    AdminComponent.prototype.editSkills = function () {
        this.router.navigate(['/editskills']);
    };
    AdminComponent.prototype.listAllUsers = function () {
        this.router.navigate(['/listall']);
    };
    AdminComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(774),
            styles: [__webpack_require__(747)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], AdminComponent);
    return AdminComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/admin.component.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_out_service__ = __webpack_require__(248);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(logOutService) {
        this.logOutService = logOutService;
    }
    AppComponent.prototype.beforeUnloadHander = function (event) {
        this.logOutService.logoutSync();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:beforeunload', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "beforeUnloadHander", null);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(775),
            styles: [__webpack_require__(748)],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__log_out_service__["a" /* LogOutService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__log_out_service__["a" /* LogOutService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/app.component.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditSvComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditSvComponent = (function () {
    function EditSvComponent(route, location, restService) {
        this.route = route;
        this.location = location;
        this.restService = restService;
        this.resMsg = '';
        this.user = {
            id: 0,
            f_name: '',
            l_name: '',
            email: '',
            password: ''
        };
    }
    EditSvComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.user_id = +params["id"];
        });
        console.log('this.user_id => ', this.user_id);
        var body = 'user_id=' + this.user_id;
        this.restService.send('post', '/svinfo', body)
            .then(function (res) {
            //console.log(res);
            var response = res[0];
            if (response.success) {
                _this.currentSv = response.data;
                //console.log('this.currentSv => ', this.currentSv);
                _this.user = {
                    id: _this.user_id,
                    f_name: _this.currentSv.first_name,
                    l_name: _this.currentSv.last_name,
                    email: _this.currentSv.email,
                    password: _this.currentSv.password
                };
            }
            else {
                _this.errMsg = response.msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    };
    EditSvComponent.prototype.goBack = function () {
        this.location.back();
    };
    EditSvComponent.prototype.save = function (user, isValid) {
        var _this = this;
        console.log('isValid => ', isValid);
        if (isValid) {
            user.id = this.user_id;
            //console.log(user);
            var body = "user=" + JSON.stringify(user);
            this.restService.send('put', '/updatesv', body)
                .then(function (res) {
                //console.log(res);
                var response = res[0];
                _this.resMsg = response.msg;
                if (response.success) {
                    /*this.user.f_name = '';
                     this.user.l_name = '';
                     this.user.email = '';
                     this.user.password = '';*/
                    setTimeout(function () {
                        _this.goBack();
                    }, 2000);
                }
                setTimeout(function () {
                    _this.resMsg = '';
                }, 5000);
            })
                .catch(function (ex) {
                console.log('error.statusText -> ', ex);
                _this.errMsg = ex;
            });
        }
    };
    ;
    EditSvComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-sv',
            template: __webpack_require__(778),
            styles: [__webpack_require__(751)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */]) === 'function' && _c) || Object])
    ], EditSvComponent);
    return EditSvComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/edit-sv.component.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__token_parse_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditUserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditUserComponent = (function () {
    function EditUserComponent(route, location, tokenParse, restService) {
        this.route = route;
        this.location = location;
        this.tokenParse = tokenParse;
        this.restService = restService;
        this.resMsg = '';
        this.teams = [];
        this.tasks = [];
        this.tasksMap = {};
        this.checkedTasks = [];
        this.user = {
            id: 0,
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            team: 0,
            skill_set: []
        };
    }
    EditUserComponent.prototype.goBack = function () {
        this.location.back();
    };
    ;
    EditUserComponent.prototype.updateCheckbox = function (skill, event) {
        this.tasksMap[skill.id] = event.target.checked;
    };
    ;
    EditUserComponent.prototype.updateTasks = function () {
        for (var x in this.tasksMap) {
            if (this.tasksMap[x]) {
                this.checkedTasks.push(x);
            }
        }
    };
    ;
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAdmin = this.tokenParse.getRole() == '1';
        // console.log('this.isAdmin => ', this.isAdmin);
        //getting info about editing user
        this.route.params.subscribe(function (params) {
            _this.user_id = +params["id"];
        });
        // console.log('this.user_id => ', this.user_id);
        var body = 'user_id=' + this.user_id;
        this.restService.send('post', '/userinfo', body).then(function (res) {
            //console.log(res);
            var response = res[0].allData;
            if (res[0].success) {
                _this.currentUser = response.data;
                _this.currentUserSkills = response.skills;
                _this.currentUserTeam = _this.currentUser.team;
                _this.user = {
                    id: _this.user_id,
                    f_name: _this.currentUser.first_name,
                    l_name: _this.currentUser.last_name,
                    email: _this.currentUser.email,
                    password: _this.currentUser.password
                };
                _this.restService.send('get', '/getdata').then(function (res) {
                    //console.log('res => ', res);
                    var result = res[0].allData;
                    if (res[0].success) {
                        _this.teams = result.teams;
                        for (var index in _this.teams) {
                            var i = Number(index);
                            if (_this.teams[i].id == _this.currentUserTeam) {
                                _this.splicedTeam = _this.teams.splice(i, 1)[0];
                                _this.teams.unshift(_this.splicedTeam);
                                break;
                            }
                        }
                        //setting default value for select
                        _this.user.team = _this.teams[0].id;
                        _this.tasks = result.tasks;
                        //checking checkboxes with user skills
                        for (var _i = 0, _a = _this.currentUserSkills; _i < _a.length; _i++) {
                            var skill = _a[_i];
                            _this.tasksMap[skill.id] = true;
                        }
                    }
                    else {
                        _this.errMsg = res[0].msg;
                    }
                }).catch(function (ex) {
                    console.log('error.statusText -> ', ex);
                    _this.errMsg = ex;
                });
            }
            else {
                _this.errMsg = res[0].msg;
            }
        }).catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    }; //onInit();
    EditUserComponent.prototype.save = function (user, isValid) {
        // console.log('isValid => ', isValid);
        var _this = this;
        if (isValid) {
            this.updateTasks();
            user.skill_set = this.checkedTasks;
            this.checkedTasks = [];
            // this.isAdmin ? user.team = +user.team : user.team = this.user.team;
            user.team = this.isAdmin ? +user.team : this.user.team;
            user.id = this.user_id;
            var body = "user=" + JSON.stringify(user);
            this.restService.send('put', '/updateuser', body).then(function (res) {
                var response = res[0];
                _this.resMsg = response.msg;
                if (response.success) {
                    setTimeout(function () {
                        _this.goBack();
                    }, 2000);
                }
                setTimeout(function () {
                    _this.resMsg = '';
                }, 5000);
            }).catch(function (ex) {
                console.log('error.statusText -> ', ex);
                _this.errMsg = ex;
            });
        }
    };
    ;
    EditUserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-user',
            template: __webpack_require__(779),
            styles: [__webpack_require__(752)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__token_parse_service__["a" /* TokenParseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__token_parse_service__["a" /* TokenParseService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__rest_service__["a" /* RestService */]) === 'function' && _d) || Object])
    ], EditUserComponent);
    return EditUserComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/edit-user.component.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployeeComponent = (function () {
    function EmployeeComponent(restService) {
        this.restService = restService;
        this.dis = false;
        this.logsTime = [];
    }
    EmployeeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var body = 'token=' + window.localStorage.getItem('auth_key');
        this.restService.send('post', '/skill', body)
            .then(function (res) {
            var response = res[0];
            if (response.success) {
                _this.userSkills = response.allData.skills;
                _this.currentStatus = _this.userSkills[0];
                _this.logsTime = response.allData.logs;
                console.log('this.logsTime => ', _this.logsTime);
                // Rest satus id = 1, default after log-in
                _this.logStatus(1);
            }
            else {
                _this.dis = true;
                console.log(response.msg);
                _this.errMsg = response.msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    };
    EmployeeComponent.prototype.logStatus = function (task_id) {
        var _this = this;
        var token = window.localStorage.getItem('auth_key');
        var body = "token=" + token + "&task=" + task_id;
        this.restService.send('post', '/log', body)
            .then(function (res) {
            //console.log(res);
            var response = res[0];
            if (response.success) {
                _this.resMsg = response.msg;
                _this.statusMsg = 'Your current status is => ' + _this.currentStatus.title;
                var curTime = Date.now() / 1000;
                _this.logsTime.push({
                    created_at: curTime,
                    task_id: task_id,
                    title: _this.currentStatus.title
                });
                console.log('this.logsTime => ', _this.logsTime);
            }
            else if (!response.success) {
                _this.errMsg = response.msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    };
    EmployeeComponent.prototype.onChange = function (skill) {
        this.currentStatus = skill;
    };
    EmployeeComponent.prototype.confirm = function () {
        this.logStatus(this.currentStatus.id);
    };
    EmployeeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-employee',
            template: __webpack_require__(780),
            styles: [__webpack_require__(753)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */]) === 'function' && _a) || Object])
    ], EmployeeComponent);
    return EmployeeComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/employee.component.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Globals; });
var Globals = Object.freeze({
    BASE_API_URL: 'http://localhost:3333'
});
// 192.168.1.150 ihor
// 192.168.1.165 evan
// 'http://localhost:3333' 
//# sourceMappingURL=/home/evan/projects/my-board/src/globals.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cookies_ng2_cookies__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_cookies_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_cookies_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rest_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__navbar_navbar_component__ = __webpack_require__(249);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogInComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LogInComponent = (function () {
    function LogInComponent(router, fb, restService) {
        this.router = router;
        this.fb = fb;
        this.restService = restService;
    }
    LogInComponent.prototype.ngOnInit = function () {
        this.userMail = this.fb.control(__WEBPACK_IMPORTED_MODULE_3_ng2_cookies_ng2_cookies__["Cookie"].get('mailCookie'));
        this.userPassword = this.fb.control(__WEBPACK_IMPORTED_MODULE_3_ng2_cookies_ng2_cookies__["Cookie"].get('passwordCookie'));
        this.userRemember = this.fb.control(false);
        this.userForm = this.fb.group({
            mail: this.userMail,
            password: this.userPassword,
            remember: this.userRemember,
        });
    };
    LogInComponent.prototype.login = function () {
        var _this = this;
        if (this.userForm.value.remember)
            this.makeCookie();
        var body = "mail=" + encodeURIComponent(this.userForm.value.mail) + "&password=" + encodeURIComponent(this.userForm.value.password);
        this.restService.send('post', '/authenticate', body)
            .then(function (res) {
            //console.log(res);
            var response = res[0];
            if (response.success) {
                window.localStorage.setItem('auth_key', response.token);
                switch (response.role) {
                    case 1:
                        _this.router.navigate(['/admin']);
                        __WEBPACK_IMPORTED_MODULE_5__navbar_navbar_component__["a" /* NavbarComponent */].returned.next(false);
                        break;
                    case 2:
                        _this.router.navigate(['/supervisor']);
                        __WEBPACK_IMPORTED_MODULE_5__navbar_navbar_component__["a" /* NavbarComponent */].returned.next(false);
                        break;
                    case 3:
                        _this.router.navigate(['/employee']);
                        __WEBPACK_IMPORTED_MODULE_5__navbar_navbar_component__["a" /* NavbarComponent */].returned.next(false);
                        break;
                }
            }
            else if (!response.success) {
                _this.errMsg = response.msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    };
    LogInComponent.prototype.makeCookie = function () {
        __WEBPACK_IMPORTED_MODULE_3_ng2_cookies_ng2_cookies__["Cookie"].set('mailCookie', this.userForm.value.mail, 3);
        __WEBPACK_IMPORTED_MODULE_3_ng2_cookies_ng2_cookies__["Cookie"].set('passwordCookie', this.userForm.value.password, 3);
    };
    LogInComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-log-in',
            template: __webpack_require__(782),
            styles: [__webpack_require__(755)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__rest_service__["a" /* RestService */]) === 'function' && _c) || Object])
    ], LogInComponent);
    return LogInComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/log-in.component.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupervisorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SupervisorComponent = (function () {
    function SupervisorComponent() {
    }
    SupervisorComponent.prototype.ngOnInit = function () {
    };
    SupervisorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-supervisor',
            template: __webpack_require__(787),
            styles: [__webpack_require__(760)]
        }), 
        __metadata('design:paramtypes', [])
    ], SupervisorComponent);
    return SupervisorComponent;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/supervisor.component.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_parse_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SvGuard = (function () {
    function SvGuard(location, tokenParse) {
        this.location = location;
        this.tokenParse = tokenParse;
        this.errMsg = '';
    }
    SvGuard.prototype.canActivate = function (next, state) {
        //check role from auth_key
        if (this.tokenParse.getRole() == '2') {
            return true;
        }
        console.log('Access denied! Permission mismatch');
        alert('Access denied! Permission mismatch');
        this.location.back();
        return false;
    };
    SvGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */]) === 'function' && _b) || Object])
    ], SvGuard);
    return SvGuard;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/sv-guard.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvListsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SvListsComponent = (function () {
    function SvListsComponent(router, location) {
        this.router = router;
        this.location = location;
    }
    SvListsComponent.prototype.ngOnInit = function () {
    };
    SvListsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sv-lists',
            template: __webpack_require__(789),
            styles: [__webpack_require__(762)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */]) === 'function' && _b) || Object])
    ], SvListsComponent);
    return SvListsComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/sv-lists.component.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvSkillsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SvSkillsComponent = (function () {
    function SvSkillsComponent(router, location) {
        this.router = router;
        this.location = location;
    }
    SvSkillsComponent.prototype.ngOnInit = function () {
    };
    SvSkillsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sv-skills',
            template: __webpack_require__(790),
            styles: [__webpack_require__(763)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* Location */]) === 'function' && _b) || Object])
    ], SvSkillsComponent);
    return SvSkillsComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/sv-skills.component.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserFormComponent = (function () {
    function UserFormComponent(restService, location) {
        this.restService = restService;
        this.location = location;
        this.user = {
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            role: 0,
            team: 0,
            skill_set: []
        };
        this.resMsg = '';
        this.tasksMap = {};
        this.checkedTasks = [];
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restService.send('get', '/getdata')
            .then(function (res) {
            //console.log('res => ', res);
            var result = res[0].allData;
            if (res[0].success) {
                _this.roles = result.roles.reverse();
                _this.teams = result.teams;
                _this.tasks = result.tasks;
                for (var _i = 0, _a = _this.tasks; _i < _a.length; _i++) {
                    var task = _a[_i];
                    _this.tasksMap[task.id] = false;
                }
                _this.user = {
                    f_name: '',
                    l_name: '',
                    email: '',
                    password: '',
                    role: _this.roles[0].id,
                    team: _this.teams[0].id,
                    skill_set: _this.tasks
                };
                if (_this.user.role == 3)
                    _this.isEmployee = true;
            }
            else {
                _this.errMsg = res[0].msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    };
    UserFormComponent.prototype.onClick = function (role) {
        //role.id == 3 --> role.id == Employee
        role.id == 3 ? this.isEmployee = true : this.isEmployee = false;
    };
    UserFormComponent.prototype.updateCheckbox = function (skill, event) {
        this.tasksMap[skill.id] = event.target.checked;
    };
    UserFormComponent.prototype.updateTasks = function () {
        for (var x in this.tasksMap) {
            if (this.tasksMap[x]) {
                this.checkedTasks.push(x);
            }
        }
    };
    UserFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    UserFormComponent.prototype.save = function (user, isValid) {
        var _this = this;
        console.log('isValid => ', isValid);
        if (isValid) {
            if (this.isEmployee) {
                this.updateTasks();
                user.skill_set = this.checkedTasks;
                this.checkedTasks = [];
                for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
                    var task = _a[_i];
                    if (task.spec_id == 1)
                        user.skill_set.push(task.id.toString());
                }
                user.team = +user.team;
            }
            console.log(user);
            var token = window.localStorage.getItem('auth_key');
            var body = "token=" + token + "&user=" + JSON.stringify(user);
            this.restService.send('post', '/adduser', body)
                .then(function (res) {
                //console.log(res);
                var response = res[0];
                if (response.success) {
                    _this.resMsg = response.msg;
                    setTimeout(function () {
                        //noinspection TypeScriptUnresolvedFunction
                        window.location.reload();
                    }, 1000);
                }
                else if (!response.success) {
                    _this.errMsg = response.msg;
                }
                setTimeout(function () {
                    _this.resMsg = '';
                }, 5000);
            })
                .catch(function (ex) {
                console.log('error.statusText -> ', ex);
                _this.errMsg = ex;
            });
        }
    };
    ;
    UserFormComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-form',
            template: __webpack_require__(791),
            styles: [__webpack_require__(764)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__rest_service__["a" /* RestService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */]) === 'function' && _b) || Object])
    ], UserFormComponent);
    return UserFormComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/user-form.component.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_parse_service__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserGuard = (function () {
    function UserGuard(location, tokenParse) {
        this.location = location;
        this.tokenParse = tokenParse;
        this.errMsg = '';
    }
    UserGuard.prototype.canActivate = function (next, state) {
        //check role from auth_key
        if (this.tokenParse.getRole() == '3') {
            return true;
        }
        console.log('Access denied! Permission mismatch');
        alert('Access denied! Permission mismatch');
        this.location.back();
        return false;
    };
    UserGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* Location */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */]) === 'function' && _b) || Object])
    ], UserGuard);
    return UserGuard;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/user-guard.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globals__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RestService = (function () {
    function RestService(http) {
        this.http = http;
    }
    RestService.prototype.send = function (req_method, req_path, req_body, content_type) {
        var _this = this;
        if (!content_type)
            content_type = 'application/X-www-form-urlencoded';
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', content_type);
        return new Promise(function (resolve, reject) {
            switch (req_method) {
                case 'get': {
                    _this.http.get(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* Globals */].BASE_API_URL + req_path).subscribe(function (data) {
                        resolve([data.json()]);
                    }, function (error) {
                        console.log(error.toString());
                        reject(error.statusText);
                    });
                    break;
                }
                case 'post': {
                    _this.http.post(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* Globals */].BASE_API_URL + req_path, req_body, { headers: headers }).subscribe(function (data) {
                        resolve([data.json()]);
                    }, function (error) {
                        console.log(error.toString());
                        reject(error.statusText);
                    });
                    break;
                }
                case 'put': {
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_2__globals__["a" /* Globals */].BASE_API_URL + req_path, req_body, { headers: headers }).subscribe(function (data) {
                        resolve([data.json()]);
                    }, function (error) {
                        console.log(error.toString());
                        reject(error.statusText);
                    });
                    break;
                }
            }
        });
    };
    RestService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], RestService);
    return RestService;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/rest.service.js.map

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 453;


/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(578);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/home/evan/projects/my-board/src/main.js.map

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_admin_component__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_guard__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_lists_admin_lists_component__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__admin_skills_admin_skills_component__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__authmanager__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__clock_clock_component__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__clear_storage_clear_storage_component__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__employee_employee_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__edit_sv_edit_sv_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__edit_user_edit_user_component__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__filter_pipe__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__log_in_log_in_component__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__log_out_log_out_component__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__role_pipe__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__log_out_service__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__navbar_navbar_component__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__inactive_list_inactive_list_component__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__routing_routing_module__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__rest_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__state_pipe__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__skills_global_skills_global_component__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__spec_pipe__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__string_pipe__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__sv_guard__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__supervisor_supervisor_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__status_table_status_table_component__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__sv_list_sv_list_component__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__sv_lists_sv_lists_component__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__sv_skills_sv_skills_component__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__token_parse_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__user_guard__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__user_form_user_form_component__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__user_list_user_list_component__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__name_team_pipe__ = __webpack_require__(580);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__admin_admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_6__admin_lists_admin_lists_component__["a" /* AdminListsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__admin_skills_admin_skills_component__["a" /* AdminSkillsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_10__clock_clock_component__["a" /* ClockComponent */],
                __WEBPACK_IMPORTED_MODULE_11__clear_storage_clear_storage_component__["a" /* ClearStorageComponent */],
                __WEBPACK_IMPORTED_MODULE_12__employee_employee_component__["a" /* EmployeeComponent */],
                __WEBPACK_IMPORTED_MODULE_13__edit_sv_edit_sv_component__["a" /* EditSvComponent */],
                __WEBPACK_IMPORTED_MODULE_14__edit_user_edit_user_component__["a" /* EditUserComponent */],
                __WEBPACK_IMPORTED_MODULE_15__filter_pipe__["a" /* FilterPipe */],
                __WEBPACK_IMPORTED_MODULE_16__log_in_log_in_component__["a" /* LogInComponent */],
                __WEBPACK_IMPORTED_MODULE_17__log_out_log_out_component__["a" /* LogOutComponent */],
                __WEBPACK_IMPORTED_MODULE_20__navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_21__inactive_list_inactive_list_component__["a" /* InactiveListComponent */],
                __WEBPACK_IMPORTED_MODULE_18__role_pipe__["a" /* RolePipe */],
                __WEBPACK_IMPORTED_MODULE_31__sv_list_sv_list_component__["a" /* SvListComponent */],
                __WEBPACK_IMPORTED_MODULE_24__state_pipe__["a" /* StatePipe */],
                __WEBPACK_IMPORTED_MODULE_25__skills_global_skills_global_component__["a" /* SkillsGlobalComponent */],
                __WEBPACK_IMPORTED_MODULE_26__spec_pipe__["a" /* SpecPipe */],
                __WEBPACK_IMPORTED_MODULE_27__string_pipe__["a" /* StringPipe */],
                __WEBPACK_IMPORTED_MODULE_29__supervisor_supervisor_component__["a" /* SupervisorComponent */],
                __WEBPACK_IMPORTED_MODULE_30__status_table_status_table_component__["a" /* StatusTableComponent */],
                __WEBPACK_IMPORTED_MODULE_32__sv_lists_sv_lists_component__["a" /* SvListsComponent */],
                __WEBPACK_IMPORTED_MODULE_33__sv_skills_sv_skills_component__["a" /* SvSkillsComponent */],
                __WEBPACK_IMPORTED_MODULE_37__user_list_user_list_component__["a" /* UserListComponent */],
                __WEBPACK_IMPORTED_MODULE_36__user_form_user_form_component__["a" /* UserFormComponent */],
                __WEBPACK_IMPORTED_MODULE_38__name_team_pipe__["a" /* NameTeamPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_22__routing_routing_module__["a" /* RoutingModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* ReactiveFormsModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__authmanager__["a" /* AuthManager */],
                __WEBPACK_IMPORTED_MODULE_19__log_out_service__["a" /* LogOutService */],
                __WEBPACK_IMPORTED_MODULE_35__user_guard__["a" /* UserGuard */],
                __WEBPACK_IMPORTED_MODULE_28__sv_guard__["a" /* SvGuard */],
                __WEBPACK_IMPORTED_MODULE_5__admin_guard__["a" /* AdminGuard */],
                __WEBPACK_IMPORTED_MODULE_34__token_parse_service__["a" /* TokenParseService */],
                __WEBPACK_IMPORTED_MODULE_23__rest_service__["a" /* RestService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/app.module.js.map

/***/ }),

/***/ 574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__authmanager__ = __webpack_require__(175);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClearStorageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClearStorageComponent = (function () {
    function ClearStorageComponent(authManager) {
        this.authManager = authManager;
        this.showButton = false;
    }
    ClearStorageComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            //console.log('this.authManager.errMsg =>', this.authManager.errMsg);
            //this.authManager.errMsg ? this.showButton = true : this.showButton = false;
            _this.showButton = !!_this.authManager.errMsg;
        }, 1000);
    };
    ClearStorageComponent.prototype.clearStorage = function () {
        window.localStorage.removeItem('auth_key');
        location.reload();
    };
    ClearStorageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-clear-storage',
            template: __webpack_require__(776),
            styles: [__webpack_require__(749)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__authmanager__["a" /* AuthManager */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__authmanager__["a" /* AuthManager */]) === 'function' && _a) || Object])
    ], ClearStorageComponent);
    return ClearStorageComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/clear-storage.component.js.map

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ClockComponent = (function () {
    function ClockComponent() {
    }
    ClockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.theTime = new Date();
        this.timer = setInterval(function () {
            _this.theTime = new Date();
        }, 1000);
    };
    ClockComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timer);
        console.log('Component has been destroyed');
    };
    ClockComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-clock',
            template: __webpack_require__(777),
            styles: [__webpack_require__(750)]
        }), 
        __metadata('design:paramtypes', [])
    ], ClockComponent);
    return ClockComponent;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/clock.component.js.map

/***/ }),

/***/ 576:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (array, args) {
        //console.log('array => ', array);
        //console.log('args => ', args);
        var last_name = args.last_name;
        var team = args.team;
        var o_status = args.o_status;
        var w_status = args.w_status;
        if (last_name == '' && team == '' && o_status == '' && w_status == '')
            return array;
        array = array.filter(function (user) {
            return user.last_name.toLowerCase().indexOf(last_name.toLowerCase()) >= 0;
        });
        array = array.filter(function (user) {
            return user.team.toLowerCase().indexOf(team.toLowerCase()) >= 0;
        });
        array = array.filter(function (user) {
            return user.o_status.toLowerCase().indexOf(o_status.toLowerCase()) >= 0;
        });
        array = array.filter(function (user) {
            if (!user.w_status)
                user.w_status = '';
            return user.w_status.toLowerCase().indexOf(w_status.toLowerCase()) >= 0;
        });
        return array;
    };
    FilterPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'filterPipe'
        }), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/filter.pipe.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InactiveListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InactiveListComponent = (function () {
    function InactiveListComponent(restService) {
        this.restService = restService;
    }
    InactiveListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restService.send('get', '/users')
            .then(function (res) {
            //console.log(res);
            var response = res[0];
            if (response.success) {
                _this.users = response.users;
            }
            else {
                _this.resMsg = response.msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.resMsg = ex;
        });
    };
    InactiveListComponent.prototype.activateUser = function (user) {
        var _this = this;
        var user_id = user.id;
        console.log('user_id => ', user_id);
        this.sure = confirm("Do you really want to change state of " + user.first_name + " " + user.last_name + " to active ?");
        if (this.sure) {
            this.restService.send('put', "/deleteuser/:" + user_id + ":1")
                .then(function (res) {
                //console.log(res);
                var response = res[0];
                _this.resMsg = response.msg;
                if (response.success) {
                    console.log(_this.resMsg);
                    _this.ngOnInit();
                    setTimeout(function () { return location.reload(); }, 500);
                }
            })
                .catch(function (ex) {
                console.log('error.statusText -> ', ex);
                _this.resMsg = ex;
            });
        }
    };
    InactiveListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-inactive-list',
            template: __webpack_require__(781),
            styles: [__webpack_require__(754)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */]) === 'function' && _a) || Object])
    ], InactiveListComponent);
    return InactiveListComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/inactive-list.component.js.map

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(372);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(573);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/home/evan/projects/my-board/src/index.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_out_service__ = __webpack_require__(248);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogOutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogOutComponent = (function () {
    function LogOutComponent(logOutService) {
        this.logOutService = logOutService;
    }
    LogOutComponent.prototype.ngOnInit = function () { };
    LogOutComponent.prototype.logout = function () {
        this.logOutService.logout();
    };
    LogOutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-log-out',
            template: __webpack_require__(783),
            styles: [__webpack_require__(756)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__log_out_service__["a" /* LogOutService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__log_out_service__["a" /* LogOutService */]) === 'function' && _a) || Object])
    ], LogOutComponent);
    return LogOutComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/log-out.component.js.map

/***/ }),

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NameTeamPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NameTeamPipe = (function () {
    function NameTeamPipe() {
    }
    NameTeamPipe.prototype.transform = function (array, args) {
        //console.log('array => ', array);
        //console.log('args => ', args);
        var last_name = args.last_name;
        var team = args.team;
        if (last_name == '' && team == '')
            return array;
        array = array.filter(function (user) {
            return user.last_name.toLowerCase().indexOf(last_name.toLowerCase()) >= 0;
        });
        array = array.filter(function (user) {
            return user.team_title.toLowerCase().indexOf(team.toLowerCase()) >= 0;
        });
        return array;
    };
    NameTeamPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'nameTeamPipe'
        }), 
        __metadata('design:paramtypes', [])
    ], NameTeamPipe);
    return NameTeamPipe;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/name-team.pipe.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RolePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RolePipe = (function () {
    function RolePipe() {
    }
    RolePipe.prototype.transform = function (value, args) {
        //console.log('value => ', value);
        //console.log('args => ', args);
        if (!value || !args) {
            return null;
        }
        var selectedRole = args;
        return value.filter(function (user) {
            return user.role == selectedRole;
        });
    };
    RolePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'rolePipe'
        }), 
        __metadata('design:paramtypes', [])
    ], RolePipe);
    return RolePipe;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/role.pipe.js.map

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_admin_component__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__authmanager__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__employee_employee_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__log_in_log_in_component__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__supervisor_supervisor_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__edit_user_edit_user_component__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__edit_sv_edit_sv_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_form_user_form_component__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sv_guard__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__user_guard__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__admin_guard__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__admin_lists_admin_lists_component__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__admin_skills_admin_skills_component__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__sv_lists_sv_lists_component__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__sv_skills_sv_skills_component__ = __webpack_require__(381);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__log_in_log_in_component__["a" /* LogInComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */]] },
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_2__admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_12__admin_guard__["a" /* AdminGuard */]] },
    { path: 'editskills', component: __WEBPACK_IMPORTED_MODULE_14__admin_skills_admin_skills_component__["a" /* AdminSkillsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_12__admin_guard__["a" /* AdminGuard */]] },
    { path: 'sveditskills', component: __WEBPACK_IMPORTED_MODULE_16__sv_skills_sv_skills_component__["a" /* SvSkillsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_10__sv_guard__["a" /* SvGuard */]] },
    { path: 'listall', component: __WEBPACK_IMPORTED_MODULE_13__admin_lists_admin_lists_component__["a" /* AdminListsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_12__admin_guard__["a" /* AdminGuard */]] },
    { path: 'svlistall', component: __WEBPACK_IMPORTED_MODULE_15__sv_lists_sv_lists_component__["a" /* SvListsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_10__sv_guard__["a" /* SvGuard */]] },
    { path: 'adduser', component: __WEBPACK_IMPORTED_MODULE_9__user_form_user_form_component__["a" /* UserFormComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_12__admin_guard__["a" /* AdminGuard */]] },
    { path: 'employee', component: __WEBPACK_IMPORTED_MODULE_4__employee_employee_component__["a" /* EmployeeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_11__user_guard__["a" /* UserGuard */]] },
    { path: 'supervisor', component: __WEBPACK_IMPORTED_MODULE_6__supervisor_supervisor_component__["a" /* SupervisorComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_10__sv_guard__["a" /* SvGuard */]] },
    { path: 'editsv/:id', component: __WEBPACK_IMPORTED_MODULE_8__edit_sv_edit_sv_component__["a" /* EditSvComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */], __WEBPACK_IMPORTED_MODULE_12__admin_guard__["a" /* AdminGuard */]] },
    { path: 'edituser/:id', component: __WEBPACK_IMPORTED_MODULE_7__edit_user_edit_user_component__["a" /* EditUserComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__authmanager__["a" /* AuthManager */]] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], RoutingModule);
    return RoutingModule;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/routing.module.js.map

/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SkillsGlobalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SkillsGlobalComponent = (function () {
    function SkillsGlobalComponent(restService) {
        this.restService = restService;
        this.users = [];
        this.tasks = [];
        this.checkedTasks = [];
        this.category = '';
        this.clicksCount = 0;
        this.simpleUser = {
            id: 0,
            skill_set: []
        };
    }
    SkillsGlobalComponent.prototype.ngOnInit = function () {
        var _this = this;
        //getting all users and their skills from DB
        this.restService.send('get', '/usersinfo')
            .then(function (res) {
            //console.log('res => ', res);
            var result = res[0].allData;
            if (res[0].success) {
                _this.users = result.users;
                //getting all tasks from DB
                _this.restService.send('get', '/getdata')
                    .then(function (res) {
                    //console.log('res => ', res);
                    var result = res[0].allData;
                    if (res[0].success) {
                        _this.tasks = result.tasks;
                    }
                    else {
                        _this.errMsg = res[0].msg;
                    }
                })
                    .catch(function (ex) {
                    console.log('error.statusText -> ', ex);
                    _this.errMsg = ex;
                });
            }
            else {
                _this.errMsg = res[0].msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    };
    SkillsGlobalComponent.prototype.updateCheckbox = function (user, task, event) {
        user.skillsMap[task.id] = event.target.checked;
        //console.log('user.skillsMap => ', user.skillsMap);
    };
    SkillsGlobalComponent.prototype.updateTasks = function (skillsMap) {
        for (var x in skillsMap) {
            if (skillsMap[x]) {
                this.checkedTasks.push(x);
            }
        }
    };
    SkillsGlobalComponent.prototype.setCategory = function (cat) {
        //console.log('cat => ', cat);
        this.category = cat;
        ++this.clicksCount;
        (this.clicksCount % 2 == 0) ? this.ascending = false : this.ascending = true;
    };
    SkillsGlobalComponent.prototype.updateUser = function (user) {
        var _this = this;
        this.sure = confirm("Do you really want to update skills of " + user.first_name + " " + user.last_name + " ?");
        if (this.sure) {
            this.simpleUser.id = user.id;
            this.updateTasks(user.skillsMap);
            this.simpleUser.skill_set = this.checkedTasks;
            this.checkedTasks = [];
            //console.log(this.simpleUser);
            var body = "user=" + JSON.stringify(this.simpleUser);
            this.restService.send('put', '/updateskills', body)
                .then(function (res) {
                //console.log(res);
                var response = res[0];
                if (response.success) {
                    _this.resMsg = response.msg;
                }
                else if (!response.success) {
                    _this.errMsg = response.msg;
                }
                setTimeout(function () {
                    _this.ngOnInit();
                }, 1000);
                setTimeout(function () {
                    _this.resMsg = '';
                }, 3000);
            })
                .catch(function (ex) {
                console.log('error.statusText -> ', ex);
                _this.errMsg = ex;
            });
        }
        else {
            this.ngOnInit();
        }
    };
    SkillsGlobalComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-skills-global',
            template: __webpack_require__(785),
            styles: [__webpack_require__(758)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */]) === 'function' && _a) || Object])
    ], SkillsGlobalComponent);
    return SkillsGlobalComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/skills-global.component.js.map

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpecPipe = (function () {
    function SpecPipe() {
    }
    SpecPipe.prototype.transform = function (value, args) {
        //console.log('value => ', value);
        //console.log('args => ', args);
        if (!value || !args) {
            return null;
        }
        var selectedSpec = args;
        return value.filter(function (task) {
            return task.spec_id == selectedSpec;
        });
    };
    SpecPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'specPipe'
        }), 
        __metadata('design:paramtypes', [])
    ], SpecPipe);
    return SpecPipe;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/spec.pipe.js.map

/***/ }),

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StatePipe = (function () {
    function StatePipe() {
    }
    StatePipe.prototype.transform = function (value, args) {
        //console.log('value => ', value);
        //console.log('args => ', args);
        if (!value || !args) {
            return null;
        }
        var selectedState = args;
        return value.filter(function (user) {
            return user.active == selectedState;
        });
    };
    StatePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'statePipe'
        }), 
        __metadata('design:paramtypes', [])
    ], StatePipe);
    return StatePipe;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/state.pipe.js.map

/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusTableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StatusTableComponent = (function () {
    function StatusTableComponent(restService) {
        this.restService = restService;
        this.category = '';
        this.clicksCount = 0;
        this.ascending = true;
        this.users = [];
        this.statistics = [];
    }
    StatusTableComponent.prototype.getStatuses = function () {
        var _this = this;
        this.lastUpdate = new Date();
        this.restService.send('get', '/status')
            .then(function (res) {
            //console.log(res);
            var response = res[0];
            if (response.success) {
                _this.users = response.allData.users;
                _this.statistics = response.allData.statistics;
                _this.errMsg = '';
            }
            else if (!response.success && !response.allData) {
                _this.users = [];
                _this.statistics = [];
                _this.errMsg = response.msg;
            }
            else if (!response.success) {
                _this.users = response.allData.users;
                _this.errMsg = response.msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.errMsg = ex;
        });
    };
    StatusTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getStatuses();
        this.timer = setInterval(function () {
            _this.getStatuses();
        }, 5000);
    };
    StatusTableComponent.prototype.setCategory = function (cat) {
        //console.log('cat => ', cat);
        this.category = cat;
        ++this.clicksCount;
        (this.clicksCount % 2 == 0) ? this.ascending = false : this.ascending = true;
    };
    StatusTableComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timer);
        //console.log('Component has been destroyed');
    };
    StatusTableComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-status-table',
            template: __webpack_require__(786),
            styles: [__webpack_require__(759)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__rest_service__["a" /* RestService */]) === 'function' && _a) || Object])
    ], StatusTableComponent);
    return StatusTableComponent;
    var _a;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/status-table.component.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StringPipe = (function () {
    function StringPipe() {
    }
    StringPipe.prototype.transform = function (array, args) {
        if (args[0] == '') {
            return array;
        }
        //console.log('array => ', array);
        //console.log('args => ', args);
        if (args[1]) {
            array.sort(function (a, b) {
                if (!a[args[0]])
                    a[args[0]] = '';
                if (!b[args[0]])
                    b[args[0]] = '';
                return a[args[0]].localeCompare(b[args[0]]);
            });
        }
        else {
            array.sort(function (a, b) {
                if (!a[args[0]])
                    a[args[0]] = '';
                if (!b[args[0]])
                    b[args[0]] = '';
                return -(a[args[0]].localeCompare(b[args[0]]));
            });
        }
        return array;
    };
    StringPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'stringPipe'
        }), 
        __metadata('design:paramtypes', [])
    ], StringPipe);
    return StringPipe;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/string.pipe.js.map

/***/ }),

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SvListComponent = (function () {
    function SvListComponent(restService, router) {
        this.restService = restService;
        this.router = router;
    }
    SvListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restService.send('get', '/users')
            .then(function (res) {
            //console.log(res);
            var response = res[0];
            if (response.success) {
                _this.users = response.users;
            }
            else {
                _this.resMsg = response.msg;
            }
        })
            .catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.resMsg = ex;
        });
    };
    SvListComponent.prototype.deleteUser = function (user) {
        var _this = this;
        var user_id = user.id;
        console.log('user_id => ', user_id);
        this.sure = confirm("Do you really want to change state of " + user.first_name + " " + user.last_name + " to inactive ?");
        if (this.sure) {
            this.restService.send('put', "/deleteuser/:" + user_id + ":0")
                .then(function (res) {
                //console.log(res);
                var response = res[0];
                _this.resMsg = response.msg;
                if (response.success) {
                    console.log(_this.resMsg);
                    _this.ngOnInit();
                    setTimeout(function () { return location.reload(); }, 500);
                }
            })
                .catch(function (ex) {
                console.log('error.statusText -> ', ex);
                _this.resMsg = ex;
            });
        }
    };
    SvListComponent.prototype.editUser = function (user_id) {
        console.log('user_id => ', user_id);
        this.router.navigate(['/editsv', user_id]);
    };
    SvListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sv-list',
            template: __webpack_require__(788),
            styles: [__webpack_require__(761)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__rest_service__["a" /* RestService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], SvListComponent);
    return SvListComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/sv-list.component.js.map

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_parse_service__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rest_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserListComponent = (function () {
    function UserListComponent(restService, router, tokenParse) {
        this.restService = restService;
        this.router = router;
        this.tokenParse = tokenParse;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.role = this.tokenParse.getRole();
        //console.log('role => ', this.role);
        this.restService.send('get', '/users').then(function (res) {
            //console.log(res);
            var response = res[0];
            if (response.success) {
                _this.users = response.users;
            }
            else {
                _this.resMsg = response.msg;
            }
        }).catch(function (ex) {
            console.log('error.statusText -> ', ex);
            _this.resMsg = ex;
        });
    };
    UserListComponent.prototype.deleteUser = function (user) {
        var _this = this;
        var user_id = user.id;
        console.log('user_id => ', user_id);
        this.sure = confirm("Do you really want to change state of " + user.first_name + " " + user.last_name + " to inactive ?");
        if (this.sure) {
            this.restService.send('put', "/deleteuser/:" + user_id + ":0").then(function (res) {
                //console.log(res);
                var response = res[0];
                _this.resMsg = response.msg;
                if (response.success) {
                    console.log(_this.resMsg);
                    _this.ngOnInit();
                    setTimeout(function () { return location.reload(); }, 500);
                }
            }).catch(function (ex) {
                console.log('error.statusText -> ', ex);
                _this.resMsg = ex;
            });
        }
    };
    UserListComponent.prototype.editUser = function (user_id) {
        console.log('user_id => ', user_id);
        this.router.navigate(['/edituser', user_id]);
    };
    UserListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-list',
            template: __webpack_require__(792),
            styles: [__webpack_require__(765)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__token_parse_service__["a" /* TokenParseService */]) === 'function' && _c) || Object])
    ], UserListComponent);
    return UserListComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/user-list.component.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/evan/projects/my-board/src/environment.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(1055);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/home/evan/projects/my-board/src/polyfills.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenParseService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TokenParseService = (function () {
    function TokenParseService() {
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_1_angular2_jwt__["JwtHelper"]();
    }
    TokenParseService.prototype.getId = function () {
        return this.jwtHelper.decodeToken(window.localStorage.getItem('auth_key')).split(';')[0];
    };
    //1 -> admin,
    // 2 -> supervisor,
    // 3 -> employee
    TokenParseService.prototype.getRole = function () {
        return this.jwtHelper.decodeToken(window.localStorage.getItem('auth_key')).split(';')[1];
    };
    //return [first_name, last_name]
    TokenParseService.prototype.getFullName = function () {
        return this.jwtHelper.decodeToken(window.localStorage.getItem('auth_key')).split(';').splice(2, 2);
    };
    TokenParseService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], TokenParseService);
    return TokenParseService;
}());
//# sourceMappingURL=/home/evan/projects/my-board/src/token-parse.service.js.map

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 747:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, ".clock {\n  position: relative;\n  /*left: 15px;*/\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, ".status-form {\n    max-width: 450px;\n    padding: 15px;\n    margin: 0 auto;\n}\n\n.status-form button[type=\"submit\"] {\n    margin-bottom: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 755:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, ".form-login {\n    max-width: 400px;\n    padding: 15px;\n    margin: 0 auto;\n}\n.form-login .form-login-heading,\n.form-login .checkbox {\n    margin-bottom: 10px;\n}\n.form-login .checkbox {\n    font-weight: normal;\n}\n.form-login .form-control {\n    position: relative;\n    height: auto;\n    box-sizing: border-box;\n    padding: 10px;\n    font-size: 16px;\n}\n.form-login .form-control:focus {\n    z-index: 2;\n}\n.form-login input[type=\"email\"] {\n    margin-bottom: -1px;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.form-login input[type=\"password\"] {\n    margin-bottom: 10px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n/*\nh5{\n    color: #F44336;\n}*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "/*button[type=\"submit\"] {*/\n    /*margin-bottom: 10px;*/\n    /*max-width: 400px;*/\n/*}*/\n\n/*.btn-back {*/\n  /*margin-left: 125px;*/\n/*}*/\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, ".navbar-nav > .nav-item {\n  margin-left: 4px;\n}\n.navbar-brand {\n  font-size: 1rem;\n  margin-right: 35px;\n}\n\n.navbar {\n  background-color: #eceff1;\n  margin-bottom: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "input[type=\"checkbox\"]{\n    width: 18px;\n    height: 18px;\n}\n\ntable, th {\n    text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "/*.container-fluid {*/\n  /*margin-top: -38px;*/\n/*}*/\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 772:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-xl-4 col-lg-4\">\n      <app-user-list class=\"mylist\"></app-user-list>\n    </div>\n\n    <div class=\"offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-xl-4 col-lg-4\">\n      <app-sv-list class=\"mylist\"></app-sv-list>\n    </div>\n\n    <div class=\"offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-xl-4 col-lg-4\">\n      <app-inactive-list class=\"mylist\"></app-inactive-list>\n    </div>\n  </div>\n\n</div>\n\n<!--todo RESPONSIVE-->"

/***/ }),

/***/ 773:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <app-skills-global></app-skills-global>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 774:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col\">\n      <app-status-table></app-status-table>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 775:
/***/ (function(module, exports) {

module.exports = "<div>\n  <app-navbar></app-navbar>\n</div>\n\n<div class=\"container-fluid content\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 776:
/***/ (function(module, exports) {

module.exports = "<button *ngIf=\"showButton\" type=\"button\"  class=\"btn btn-danger btn-sm btn-back\" autofocus (click)=\"clearStorage()\">\n  Clear storage\n  <i class=\"fa fa-trash\"></i>\n</button>\n"

/***/ }),

/***/ 777:
/***/ (function(module, exports) {

module.exports = "<div class=\"clock \">\n  <i class=\"fa fa-clock-o fa-lg\"></i>\n  {{theTime | date: 'HH:mm:ss'}}\n</div>\n"

/***/ }),

/***/ 778:
/***/ (function(module, exports) {

module.exports = "<h5 *ngIf=\"errMsg\" class=\"alert alert-danger\">{{errMsg}}</h5>\n\n<div class=\"container\">\n  <form #f=\"ngForm\" class=\"user-form\" novalidate>\n\n    <div class=\"row\">\n      <div class=\"col-sm-5\">\n        <legend>Supervisor info</legend>\n      </div>\n      <div class=\"col-sm-7\">\n        <h4 *ngIf=\"resMsg\" class=\"text-success\">{{resMsg}}</h4>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label for=\"inputName\" class=\"col-2 col-form-label\">First Name</label>\n      <div class=\"col-10 \" [ngClass]=\"{'has-success': name.valid, 'has-warning': !name.valid}\">\n        <input type=\"text\" class=\"form-control \" id=\"inputName\" placeholder=\"First Name\"\n               autofocus\n               name=\"f_name\" [(ngModel)]=\"user.f_name\"\n               #name=\"ngModel\"\n               required pattern=\"[a-zA-Z ]+$\"\n               [ngClass]=\"{'form-control-success': name.valid, 'form-control-warning': !name.valid}\">\n        <small [hidden]=\"name.valid\">\n          First name is required and must contain only latin characters.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"inputSurname\" class=\"col-2 col-form-label\">Last Name</label>\n      <div class=\"col-10\"\n           [ngClass]=\"{'has-success': surname.valid, 'has-warning': !surname.valid}\">\n        <input type=\"text\" class=\"form-control\" id=\"inputSurname\" placeholder=\"Last Name\"\n               name=\"l_name\" [(ngModel)]=\"user.l_name\"\n               #surname=\"ngModel\"\n               required pattern=\"[a-zA-Z ]+$\"\n               [ngClass]=\"{'form-control-success': surname.valid, 'form-control-warning': !surname.valid}\">\n        <small [hidden]=\"surname.valid\">\n          Last name is required and must contain only latin characters.\n        </small>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label for=\"inputEmail3\" class=\"col-2 col-form-label\">Email</label>\n      <div class=\"col-10\" [ngClass]=\"{'has-success': email.valid, 'has-warning': !email.valid}\">\n        <input type=\"email\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Email\"\n               name=\"email\" [(ngModel)]=\"user.email\"\n               #email=\"ngModel\"\n               required pattern='(.+)@(.+){2,}\\.(.+){2,}'\n               [ngClass]=\"{'form-control-success': email.valid, 'form-control-warning': !email.valid}\">\n        <small [hidden]=\"email.valid\">\n          Email is required and format should be <i>john@doe.com</i>.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"inputPassword3\" class=\"col-2 col-form-label\">Password</label>\n      <div class=\"col-10\"\n           [ngClass]=\"{'has-success': password.valid, 'has-warning': !password.valid}\">\n        <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Password\"\n               name=\"password\" [(ngModel)]=\"user.password\"\n               #password=\"ngModel\"\n               required minlength=\"5\"\n               [ngClass]=\"{'form-control-success': password.valid, 'form-control-warning': !password.valid}\">\n        <small [hidden]=\"password.valid\">\n          Password is required (minimum 5 characters).\n        </small>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <div class=\"offset-2 col-10\">\n        <button type=\"submit\" (click)=\"save(f.value, f.valid)\" [disabled]=\"!f.valid\" class=\"btn btn-primary btn-block\">\n          Update user\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>"

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

module.exports = "<h5 *ngIf=\"errMsg\" class=\"alert alert-danger\">{{errMsg}}</h5>\n\n<div class=\"container\">\n  <form #f=\"ngForm\" class=\"user-form\" novalidate>\n\n    <div class=\"row\">\n      <div class=\"col-sm-5\">\n        <legend>Employee info</legend>\n      </div>\n      <div class=\"col-sm-7\">\n        <h4 *ngIf=\"resMsg\" class=\"text-success\">{{resMsg}}</h4>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label for=\"inputName\" class=\"col-2 col-form-label\">First Name</label>\n      <div class=\"col-10 \" [ngClass]=\"{'has-success': name.valid, 'has-warning': !name.valid}\">\n        <input type=\"text\" class=\"form-control \" id=\"inputName\" placeholder=\"First Name\"\n               autofocus\n               name=\"f_name\" [(ngModel)]=\"user.f_name\"\n               #name=\"ngModel\"\n               required pattern=\"[a-zA-Z ]+$\"\n               [ngClass]=\"{'form-control-success': name.valid, 'form-control-warning': !name.valid}\"\n               [readonly]=\"!isAdmin\">\n        <small [hidden]=\"name.valid\">\n          First name is required and must contain only latin characters.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"inputSurname\" class=\"col-2 col-form-label\">Last Name</label>\n      <div class=\"col-10\"\n           [ngClass]=\"{'has-success': surname.valid, 'has-warning': !surname.valid}\">\n        <input type=\"text\" class=\"form-control\" id=\"inputSurname\" placeholder=\"Last Name\"\n               name=\"l_name\" [(ngModel)]=\"user.l_name\"\n               #surname=\"ngModel\"\n               required pattern=\"[a-zA-Z ]+$\"\n               [ngClass]=\"{'form-control-success': surname.valid, 'form-control-warning': !surname.valid}\"\n               [readonly]=\"!isAdmin\">\n        <small [hidden]=\"surname.valid\">\n          Last name is required and must contain only latin characters.\n        </small>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label for=\"inputEmail3\" class=\"col-2 col-form-label\">Email</label>\n      <div class=\"col-10\" [ngClass]=\"{'has-success': email.valid, 'has-warning': !email.valid}\">\n        <input type=\"email\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Email\"\n               name=\"email\" [(ngModel)]=\"user.email\"\n               #email=\"ngModel\"\n               required pattern='(.+)@(.+){2,}\\.(.+){2,}'\n               [ngClass]=\"{'form-control-success': email.valid, 'form-control-warning': !email.valid}\"\n               [readonly]=\"!isAdmin\">\n        <small [hidden]=\"email.valid\">\n          Email is required and format should be <i>john@doe.com</i>.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"inputPassword3\" class=\"col-2 col-form-label\">Password</label>\n      <div class=\"col-10\"\n           [ngClass]=\"{'has-success': password.valid, 'has-warning': !password.valid}\">\n        <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Password\"\n               name=\"password\" [(ngModel)]=\"user.password\"\n               #password=\"ngModel\"\n               required minlength=\"5\"\n               [ngClass]=\"{'form-control-success': password.valid, 'form-control-warning': !password.valid}\"\n               [readonly]=\"!isAdmin\">\n        <small [hidden]=\"password.valid\">\n          Password is required (minimum 5 characters).\n        </small>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label class=\"col-2\" for=\"exampleSelect1\">Select team</label>\n      <div class=\"col-10\">\n        <select name=\"team\" [(ngModel)]=\"user.team\" class=\"form-control\" id=\"exampleSelect1\" required\n                [disabled]=\"!isAdmin\">\n          <option *ngFor=\"let team of teams\" [value]=\"team.id\">\n            {{team.title}}\n          </option>\n        </select>\n      </div>\n    </div>\n\n    <legend>Skill set</legend>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label class=\"col-2\">Geo Ops: </label>\n      <div class=\"col-10\">\n        <div *ngFor=\"let task of tasks\" class=\"skill\">\n          <label *ngIf=\"task.spec_id == 2\" class=\"form-check-inline\">\n            <input class=\"form-check-input\" type=\"checkbox\"\n                   (change)=\"updateCheckbox(task, $event)\"\n                   [checked]=\"tasksMap[task.id]\">\n            {{task.title}}\n          </label>\n        </div>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label class=\"col-2\">Localization:</label>\n      <div class=\"col-10\">\n\n        <div *ngFor=\"let task of tasks\" class=\"skill\">\n          <label *ngIf=\"task.spec_id == 3\" class=\"form-check-inline\">\n            <input class=\"form-check-input\" type=\"checkbox\"\n                   (change)=\"updateCheckbox(task, $event)\"\n                   [checked]=\"tasksMap[task.id]\">\n            {{task.title}}\n          </label>\n        </div>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label class=\"col-2\">QA:</label>\n      <div class=\"col-10\">\n\n        <div *ngFor=\"let task of tasks\" class=\"skill\">\n          <label *ngIf=\"task.spec_id == 4\" class=\"form-check-inline\">\n            <input class=\"form-check-input\" type=\"checkbox\"\n                   (change)=\"updateCheckbox(task, $event)\"\n                   [checked]=\"tasksMap[task.id]\">\n            {{task.title}}\n          </label>\n        </div>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <div class=\"offset-2 col-10\">\n        <button class=\"btn btn-block btn-primary\"  type=\"submit\" (click)=\"save(f.value, f.valid)\" [disabled]=\"!f.valid\" >\n          Update user\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>"

/***/ }),

/***/ 780:
/***/ (function(module, exports) {

module.exports = "<form class=\"status-form\">\n  <div class=\"form-group\">\n    <label for=\"exampleSelect1\">Please select a status</label>\n\n    <select class=\"form-control\" id=\"exampleSelect1\" [ngModel]=\"currentStatus\" (ngModelChange)=\"onChange($event)\"\n            name=\"select\">\n      <option *ngFor=\"let skill of userSkills\" [ngValue]=\"skill\">{{skill.title}}</option>\n    </select>\n\n  </div>\n  <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\" (click)=\"confirm()\" [disabled]=\"dis\">Confirm</button>\n  <br>\n  <h5 class=\"alert alert-info\">{{statusMsg}}</h5>\n  <h5 *ngIf=\"errMsg\" class=\"alert alert-danger\">{{errMsg}}</h5>\n\n</form>\n\n<h3>Today`s history</h3>\n<ul class=\"list-group d-flex justify-content-center flex-column\">\n  <li *ngFor=\"let log of logsTime; let i=index\" class=\"list-group-item\">\n\n    <span>\n      {{log.title}} at {{log.created_at * 1000 | date:'HH:mm:ss'}}\n    </span>\n\n  </li>\n</ul>\n"

/***/ }),

/***/ 781:
/***/ (function(module, exports) {

module.exports = "<h3 class=\"text-center\">Inactive users</h3>\n<ul class=\"list-group user-list d-flex justify-content-center flex-column\">\n  <li *ngFor=\"let user of users | statePipe: '0' ; let i=index\" class=\"list-group-item\">\n    <span class=\"num\">{{i+1}}</span>\n\n    <span>\n      {{user.last_name}}, {{user.first_name}},\n      <span *ngIf=\"user.role==2\"> supervisor</span>\n      <span *ngIf=\"user.role==3\"> employee</span>\n    </span>\n\n    <button class=\"delete btn btn-success rounded-circle ml-auto\" title=\"Activate user\"\n            (click)=\"activateUser(user); $event.stopPropagation()\">\n      <i class=\"fa fa-thumbs-o-up fa-lg\" aria-hidden=\"true\"></i>\n    </button>\n  </li>\n</ul>\n<h5 *ngIf=\"resMsg\" class=\"text-info\">{{resMsg}}</h5>\n\n\n"

/***/ }),

/***/ 782:
/***/ (function(module, exports) {

module.exports = "<form name=\"myForm\" class=\"form-login\" (ngSubmit)=\"login()\" [formGroup]=\"userForm\">\n  <h2 class=\"form-login-heading\">Please log in</h2>\n\n  <label for=\"inputEmail\" class=\"sr-only\">Email address</label>\n  <input type=\"email\" id=\"inputEmail\" class=\"form-control\" placeholder=\"Email address\" required=\"\" autofocus=\"\"\n         formControlName=\"mail\">\n\n  <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n  <input type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required=\"\"\n         formControlName=\"password\">\n\n  <div class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\" value=\"remember-me\" formControlName=\"remember\"> Remember me\n    </label>\n  </div>\n  <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Log in</button>\n  <br>\n  <h5 *ngIf=\"errMsg\" class=\"text-danger\">{{errMsg}}</h5>\n</form>"

/***/ }),

/***/ 783:
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-back\">\n  <button type=\"submit\" class=\"btn btn-outline-warning btn-sm\" (click)=\"logout()\">\n    Logout\n    <i class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i>\n  </button>\n</div>"

/***/ }),

/***/ 784:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-md navbar-light\">\n  <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\"\n          data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\"\n          aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"navbar-brand\">\n    <app-clock></app-clock>\n  </div>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n    <ul class=\"navbar-nav mr-auto\" >\n      <li *ngIf=\"userRole == '1' || userRole == '2'\" class=\"nav-item\">\n        <a class=\"nav-link btn btn-outline-info btn-sm\" (click)=\"goHome()\">\n          Online dashboard\n          <i class=\"fa fa-tasks\" aria-hidden=\"true\"></i>\n          <!--<span class=\"sr-only\">(current)</span>-->\n        </a>\n      </li>\n\n      <li *ngIf=\"userRole == '1' || userRole == '2'\" class=\"nav-item\">\n        <a class=\"nav-link btn btn-outline-info btn-sm\" (click)=\"listAllUsers()\">\n          Users list\n          <i class=\"fa fa-users \" aria-hidden=\"true\"></i>\n          <!--<span class=\"sr-only\">(current)</span>-->\n        </a>\n      </li>\n\n      <li *ngIf=\"userRole == '1' || userRole =='2'\" class=\"nav-item\">\n        <a class=\"nav-link btn btn-outline-info btn-sm\" (click)=\"editSkills()\">\n          Edit skills\n          <i class=\"fa fa-id-card-o\" aria-hidden=\"true\"></i>\n        </a>\n      </li>\n\n      <li *ngIf=\"userRole == '1'\" class=\"nav-item\">\n        <a class=\"nav-link btn btn-outline-info btn-sm\" (click)=\"addUser()\">\n          Add user\n          <i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i>\n        </a>\n      </li>\n    </ul>\n\n    <form class=\"form-inline \">\n      <!--<app-clear-storage></app-clear-storage>-->\n\n      <span *ngIf=\"userRole\" class=\"navbar-text mr-2 ml-2\">\n        <i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i> {{userName[0]}} {{userName[1]}}\n      </span>\n      <!--<input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Search\">-->\n      <!--<button class=\"btn btn-outline-success my-2 my-sm-0\" type=\"submit\">Search</button>-->\n      <app-log-out *ngIf=\"userRole\"></app-log-out>\n    </form>\n  </div>\n</nav>\n"

/***/ }),

/***/ 785:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <table class=\"table table-sm table-striped table-bordered status-table\">\n        <thead class=\"thead-inverse\">\n        <tr>\n          <th></th>\n          <th (click)=\"setCategory('last_name')\" title=\"Click to sort\" class=\"pointer text-left\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i> Name\n          </th>\n          <th (click)=\"setCategory('team_title')\" title=\"Click to sort\" class=\"pointer text-left\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i> Team\n          </th>\n          <th colspan=\"3\">Geo Ops</th>\n          <th colspan=\"4\">Localization</th>\n          <th colspan=\"4\">QA</th>\n          <th></th>\n        </tr>\n\n        <tr>\n          <th><i class=\"fa fa-search\" aria-hidden=\"true\"></i></th>\n          <th class=\"text-left\">\n            <input #searchSurname type=\"text\" class=\"small\" placeholder=\"Name filter\">\n          </th>\n          <th class=\"text-left\">\n            <input #searchTeam type=\"text\" class=\"small\" placeholder=\"Team filter\">\n          </th>\n\n\n          <th *ngFor=\"let task of tasks | specPipe: 2\">\n            {{task.title}}\n          </th>\n\n          <th *ngFor=\"let task of tasks | specPipe: 3\">\n            {{task.title}}\n          </th>\n\n          <th *ngFor=\"let task of tasks | specPipe: 4\">\n            {{task.title}}\n          </th>\n\n          <th></th><!--<label><input type=\"checkbox\">Edit</label>-->\n        </tr>\n\n        </thead>\n\n        <tbody>\n        <tr *ngFor=\"let user of users\n        | nameTeamPipe: {last_name :searchSurname.value,\n                            team: searchTeam.value}\n        | stringPipe: [category, ascending]; let i=index\">\n          <td>{{i+1}}</td>\n          <td class=\"text-left\">{{user.last_name}}, {{user.first_name}}</td>\n          <td class=\"text-left\">{{user.team_title}}</td>\n\n          <td *ngFor=\"let task of tasks | specPipe: 2\">\n            <input type=\"checkbox\"\n                   (change)=\"updateCheckbox(user, task, $event)\"\n                   [checked]=\"user.skillsMap[task.id]\">\n          </td>\n\n          <td *ngFor=\"let task of tasks | specPipe: 3\">\n            <input type=\"checkbox\"\n                   (change)=\"updateCheckbox(user, task, $event)\"\n                   [checked]=\"user.skillsMap[task.id]\">\n          </td>\n\n          <td *ngFor=\"let task of tasks | specPipe: 4\">\n            <input type=\"checkbox\"\n                   (change)=\"updateCheckbox(user, task, $event)\"\n                   [checked]=\"user.skillsMap[task.id]\">\n          </td>\n\n          <td>\n            <button class=\"btn-warning btn-sm btn\" (click)=\"updateUser(user)\">Update</button>\n          </td>\n\n        </tr>\n\n        </tbody>\n\n        <tfoot class=\"thead-inverse\">\n        <tr>\n          <th><i class=\"fa fa-search\" aria-hidden=\"true\"></i></th>\n          <th (click)=\"setCategory('last_name')\" title=\"Click to sort\" class=\"pointer text-left\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i>\n            Name\n          </th>\n          <th (click)=\"setCategory('team_title')\" title=\"Click to sort\" class=\"pointer text-left\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i>\n            Team\n          </th>\n\n\n          <th *ngFor=\"let task of tasks | specPipe: 2\">\n            {{task.title}}\n          </th>\n\n          <th *ngFor=\"let task of tasks | specPipe: 3\">\n            {{task.title}}\n          </th>\n\n          <th *ngFor=\"let task of tasks | specPipe: 4\">\n            {{task.title}}\n          </th>\n\n          <th></th><!--<label><input type=\"checkbox\">Edit</label>-->\n        </tr>\n        </tfoot>\n\n      </table>\n      <h5 *ngIf=\"resMsg\" class=\"alert alert-success\">{{resMsg}}</h5>\n      <h5 *ngIf=\"errMsg\" class=\"alert alert-danger\">{{errMsg}}</h5>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 786:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row \">\n    <div class=\"col\">\n      <table class=\"table table-sm table-striped table-bordered status-table\">\n        <thead class=\"thead-inverse\">\n        <tr>\n          <th></th>\n          <th (click)=\"setCategory('last_name')\" title=\"Click to sort\" class=\"pointer\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i>\n            Name\n          </th>\n          <th (click)=\"setCategory('team')\" title=\"Click to sort\" class=\"pointer\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i>\n            Team\n          </th>\n          <th (click)=\"setCategory('o_status')\" title=\"Click to sort\" class=\"pointer\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i>\n            Online status\n          </th>\n          <th (click)=\"setCategory('w_status')\" title=\"Click to sort\" class=\"pointer\">\n            <i class=\"fa fa-sort\" aria-hidden=\"true\"></i>\n            Working status\n          </th>\n        </tr>\n\n        <tr>\n          <th><i class=\"fa fa-search\" aria-hidden=\"true\"></i></th>\n          <th><input #searchSurname type=\"text\" class=\"small\" placeholder=\"Name filter\"></th>\n          <th><input #searchTeam type=\"text\" class=\"small\" placeholder=\"Team filter\"></th>\n          <th><input #searchOnline type=\"text\" class=\"small\" placeholder=\"Online status filter\"></th>\n          <th><input #searchWork type=\"text\" class=\"small\" placeholder=\"Working status filter\"></th>\n        </tr>\n        </thead>\n\n        <tbody>\n        <tr *ngFor=\"let user of users\n            | filterPipe: {last_name :searchSurname.value,\n                            team: searchTeam.value,\n                            o_status: searchOnline.value,\n                            w_status: searchWork.value}\n            | stringPipe: [category, ascending] ; let i=index\">\n\n          <td>{{i+1}}</td>\n          <td>{{user.last_name}}, {{user.first_name}}</td>\n          <td>{{user.team}}</td>\n          <td>{{user.o_status}}</td>\n          <td>{{user.w_status}}</td>\n        </tr>\n        </tbody>\n      </table>\n      <h5 *ngIf=\"errMsg\" class=\"text-warning\">{{errMsg}}</h5>\n    </div>\n\n\n    <div class=\"col\">\n      <table class=\"table table-sm table-striped table-bordered status-table\">\n        <thead class=\"thead-inverse\">\n        <tr>\n          <th>Task</th>\n          <th>Num.</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let stata of statistics; let i=index\">\n          <td>{{stata.status}}</td>\n          <td>{{stata.counts}}</td>\n        </tr>\n        </tbody>\n      </table>\n      <h5 *ngIf=\"errMsg\" class=\"text-warning\">{{errMsg}}</h5>\n    </div>\n  </div>\n</div>\n<!--TODO responsive-->"

/***/ }),

/***/ 787:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <app-status-table></app-status-table>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 788:
/***/ (function(module, exports) {

module.exports = "<h3 class=\"text-center\">Supervisors</h3>\n<ul class=\"list-group user-list d-flex justify-content-center flex-column\">\n  <li *ngFor=\"let user of users | statePipe: 1 | rolePipe: 2; let i=index\" class=\"list-group-item\">\n    <span class=\"num\">{{i+1}}</span>\n\n    <span>\n      {{user.last_name}}, {{user.first_name}}\n    </span>\n\n    <span class=\"ml-auto\">\n      <button class=\"edit btn btn-warning rounded-circle\"  title=\"Edit user\"\n              (click)=\"editUser(user.id); $event.stopPropagation()\">\n        <i class=\"fa fa-pencil fa-lg\" aria-hidden=\"true\"></i>\n      </button>\n\n      <button class=\"delete btn btn-danger rounded-circle\" title=\"Deactivate user\"\n              (click)=\"deleteUser(user); $event.stopPropagation()\">\n        <i class=\"fa fa-times fa-lg\" aria-hidden=\"true\"></i>\n      </button>\n    </span>\n  </li>\n</ul>\n<h5 *ngIf=\"resMsg\" class=\"text-info\">{{resMsg}}</h5>\n"

/***/ }),

/***/ 789:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4\">\n      <app-user-list class=\"mylist\"></app-user-list>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 790:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <app-skills-global></app-skills-global>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 791:
/***/ (function(module, exports) {

module.exports = "<h5 *ngIf=\"errMsg\" class=\"alert alert-danger\">{{errMsg}}</h5>\n\n<div class=\"container\">\n  <form #f=\"ngForm\" class=\"user-form \" novalidate>\n\n    <div class=\"row\">\n      <div class=\"col-sm-5\">\n        <legend>User info</legend>\n      </div>\n      <div class=\"col-sm-7\">\n        <h5 *ngIf=\"resMsg\" class=\"text-success\">{{resMsg}}</h5>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label for=\"inputName\" class=\"col-2 col-form-label\">First Name</label>\n\n      <div class=\"col-10 \" [ngClass]=\"{'has-success': name.valid, 'has-warning': !name.valid && !name.pristine}\">\n        <input type=\"text\" class=\"form-control \" id=\"inputName\" placeholder=\"First Name\"\n               autofocus\n               name=\"f_name\" [(ngModel)]=\"user.f_name\"\n               #name=\"ngModel\"\n               required pattern=\"[a-zA-Z ]+$\"\n               [ngClass]=\"{'form-control-success': name.valid, 'form-control-warning': !name.valid && !name.pristine}\"\n        >\n        <small [hidden]=\"name.valid  || name.pristine\">\n          First name is required and must contain only latin characters.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"inputSurname\" class=\"col-2 col-form-label\">Last Name</label>\n\n      <div class=\"col-10\"\n           [ngClass]=\"{'has-success': surname.valid, 'has-warning': !surname.valid && !surname.pristine}\">\n        <input type=\"text\" class=\"form-control\" id=\"inputSurname\" placeholder=\"Last Name\"\n               name=\"l_name\" [(ngModel)]=\"user.l_name\"\n               #surname=\"ngModel\"\n               required pattern=\"[a-zA-Z ]+$\"\n               [ngClass]=\"{'form-control-success': surname.valid, 'form-control-warning': !surname.valid && !surname.pristine}\"\n        >\n        <small [hidden]=\"surname.valid || surname.pristine\">\n          Last name is required and must contain only latin characters.\n        </small>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label for=\"inputEmail3\" class=\"col-2 col-form-label\">Email</label>\n\n      <div class=\"col-10\" [ngClass]=\"{'has-success': email.valid, 'has-warning': !email.valid && !email.pristine}\">\n        <input type=\"email\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Email\"\n               name=\"email\" [(ngModel)]=\"user.email\"\n               #email=\"ngModel\"\n               required pattern='(.+)@(.+){2,}\\.(.+){2,}'\n               [ngClass]=\"{'form-control-success': email.valid, 'form-control-warning': !email.valid && !email.pristine}\"\n        >\n        <small [hidden]=\"email.valid || email.pristine\">\n          Email is required and format should be <i>john@doe.com</i>.\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"inputPassword3\" class=\"col-2 col-form-label\">Password</label>\n\n      <div class=\"col-10\"\n           [ngClass]=\"{'has-success': password.valid, 'has-warning': !password.valid && !password.pristine}\">\n        <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Password\"\n               name=\"password\" [(ngModel)]=\"user.password\"\n               #password=\"ngModel\"\n               required minlength=\"5\"\n               [ngClass]=\"{'form-control-success': password.valid, 'form-control-warning': !password.valid && !password.pristine}\"\n        >\n        <small [hidden]=\"password.valid || password.pristine\">\n          Password is required (minimum 5 characters).\n        </small>\n      </div>\n    </div>\n    <hr>\n\n    <div class=\"form-group row\">\n      <label class=\"form-check-label col-2\">Role</label>\n\n      <div class=\"col-10\">\n        <div class=\"form-check\">\n          <label *ngFor=\"let role of roles\" class=\"form-check-inline form-check-label\" (click)=\"onClick(role)\">\n\n            <input type=\"radio\" name=\"role\" [(ngModel)]=\"user.role\" [value]=\"role.id\" class=\"form-check-input\" required>\n            {{role.title}}\n          </label>\n        </div>\n      </div>\n    </div>\n    <hr>\n\n    <div *ngIf=\"isEmployee\">\n\n      <div class=\"form-group row\">\n        <label class=\"col-2\" for=\"exampleSelect1\">Select team</label>\n\n        <div class=\"col-10\">\n          <select name=\"team\" [(ngModel)]=\"user.team\" class=\"form-control\" id=\"exampleSelect1\" required>\n            <option *ngFor=\"let team of teams\" [value]=\"team.id\">\n              {{team.title}}\n            </option>\n          </select>\n        </div>\n      </div>\n\n      <legend>Skill set</legend>\n      <hr>\n\n      <div class=\"form-group row\">\n        <label class=\"col-2\">Geo Ops: </label>\n        <div class=\"col-10\">\n\n          <div *ngFor=\"let task of tasks\" class=\"skill\">\n            <label *ngIf=\"task.spec_id == 2\" class=\"form-check-inline\">\n              <input class=\"form-check-input\" type=\"checkbox\"\n                     value=\"task\"\n                     (change)=\"updateCheckbox(task, $event)\">\n              {{task.title}}\n            </label>\n          </div>\n\n        </div>\n      </div>\n      <hr>\n\n      <div class=\"form-group row\">\n        <label class=\"col-2\">Localization:</label>\n\n        <div class=\"col-10\">\n          <div *ngFor=\"let task of tasks\" class=\"skill\">\n            <label *ngIf=\"task.spec_id == 3\" class=\"form-check-inline\">\n              <input class=\"form-check-input\" type=\"checkbox\"\n                     value=\"task.id\"\n                     (change)=\"updateCheckbox(task, $event)\">\n              {{task.title}}\n            </label>\n          </div>\n\n        </div>\n      </div>\n      <hr>\n\n      <div class=\"form-group row\">\n        <label class=\"col-2\">QA:</label>\n\n        <div class=\"col-10\">\n          <div *ngFor=\"let task of tasks\" class=\"skill\">\n            <label *ngIf=\"task.spec_id == 4\" class=\"form-check-inline\">\n              <input class=\"form-check-input\" type=\"checkbox\"\n                     value=\"task.id\"\n                     (change)=\"updateCheckbox(task, $event)\">\n              {{task.title}}\n            </label>\n          </div>\n\n        </div>\n      </div>\n      <hr>\n\n    </div>\n\n    <div class=\"form-group row\">\n      <div class=\"offset-2 col-10\">\n        <button type=\"submit\" (click)=\"save(f.value, f.valid)\" [disabled]=\"!f.valid\" class=\"btn btn-primary btn-block\">\n          Add user\n        </button>\n      </div>\n    </div>\n\n  </form>\n</div>"

/***/ }),

/***/ 792:
/***/ (function(module, exports) {

module.exports = "<h3 class=\"text-center\">Employees</h3>\n<ul class=\"list-group user-list d-flex justify-content-center flex-column\">\n  <li *ngFor=\"let user of users | statePipe: 1 | rolePipe: 3; let i=index\"\n      class=\"list-group-item d-flex justify-content-start \">\n\n    <span class=\"num rounded-circle\">{{i+1}}</span>\n\n    <span class=\"\">\n      {{user.last_name}}, {{user.first_name}}\n    </span>\n\n    <span class=\"ml-auto\">\n      <button type=\"button\" title=\"Edit user\"\n              class=\"edit btn btn-warning rounded-circle\"\n              (click)=\"editUser(user.id); $event.stopPropagation()\">\n          <i class=\"fa fa-pencil fa-lg \" aria-hidden=\"true\"></i>\n      </button>\n      <button type=\"button\" *ngIf=\"role=='1'\"  title=\"Deactivate user\"\n              class=\"delete btn btn-danger rounded-circle\"\n              (click)=\"deleteUser(user); $event.stopPropagation()\">\n          <i class=\"fa fa-times fa-lg \" aria-hidden=\"true\"></i>\n      </button>\n    </span>\n\n  </li>\n</ul>\n<h5 *ngIf=\"resMsg\" class=\"text-info\">{{resMsg}}</h5>\n"

/***/ })

},[1057]);
//# sourceMappingURL=main.bundle.js.map