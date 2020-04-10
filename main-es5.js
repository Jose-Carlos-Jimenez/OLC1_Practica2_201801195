function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var routes = [];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _principal_principal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./principal/principal.component */
    "./src/app/principal/principal.component.ts");

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);

      this.title = 'app';
    };

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 1,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-principal");
        }
      },
      directives: [_principal_principal_component__WEBPACK_IMPORTED_MODULE_1__["PrincipalComponent"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrls: ['./app.component.css']
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var _principal_principal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./principal/principal.component */
    "./src/app/principal/principal.component.ts");
    /* harmony import */


    var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/tabs */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/material/menu */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");
    /* harmony import */


    var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/material/icon */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
    /* harmony import */


    var _editores_editores_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./editores/editores.component */
    "./src/app/editores/editores.component.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _services_upload_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ./services/upload.service */
    "./src/app/services/upload.service.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      providers: [_services_upload_service__WEBPACK_IMPORTED_MODULE_12__["UploadService"]],
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _principal_principal_component__WEBPACK_IMPORTED_MODULE_5__["PrincipalComponent"], _editores_editores_component__WEBPACK_IMPORTED_MODULE_10__["EditoresComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _principal_principal_component__WEBPACK_IMPORTED_MODULE_5__["PrincipalComponent"], _editores_editores_component__WEBPACK_IMPORTED_MODULE_10__["EditoresComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"]],
          providers: [_services_upload_service__WEBPACK_IMPORTED_MODULE_12__["UploadService"]],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/editores/editores.component.ts":
  /*!************************************************!*\
    !*** ./src/app/editores/editores.component.ts ***!
    \************************************************/

  /*! exports provided: EditoresComponent */

  /***/
  function srcAppEditoresEditoresComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditoresComponent", function () {
      return EditoresComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var ace_builds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ace-builds */
    "./node_modules/ace-builds/src-noconflict/ace.js");
    /* harmony import */


    var ace_builds__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ace_builds__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var ace_builds_src_noconflict_mode_csharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ace-builds/src-noconflict/mode-csharp */
    "./node_modules/ace-builds/src-noconflict/mode-csharp.js");
    /* harmony import */


    var ace_builds_src_noconflict_mode_csharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_mode_csharp__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var ace_builds_src_noconflict_mode_python__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ace-builds/src-noconflict/mode-python */
    "./node_modules/ace-builds/src-noconflict/mode-python.js");
    /* harmony import */


    var ace_builds_src_noconflict_mode_python__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_mode_python__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var ace_builds_src_noconflict_theme_xcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ace-builds/src-noconflict/theme-xcode */
    "./node_modules/ace-builds/src-noconflict/theme-xcode.js");
    /* harmony import */


    var ace_builds_src_noconflict_theme_xcode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_xcode__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */


    var ace_builds_src_noconflict_theme_terminal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ace-builds/src-noconflict/theme-terminal */
    "./node_modules/ace-builds/src-noconflict/theme-terminal.js");
    /* harmony import */


    var ace_builds_src_noconflict_theme_terminal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_theme_terminal__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */


    var ace_builds_src_noconflict_ext_language_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ace-builds/src-noconflict/ext-language_tools */
    "./node_modules/ace-builds/src-noconflict/ext-language_tools.js");
    /* harmony import */


    var ace_builds_src_noconflict_ext_language_tools__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_ext_language_tools__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */


    var ace_builds_src_noconflict_ext_beautify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ace-builds/src-noconflict/ext-beautify */
    "./node_modules/ace-builds/src-noconflict/ext-beautify.js");
    /* harmony import */


    var ace_builds_src_noconflict_ext_beautify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ace_builds_src_noconflict_ext_beautify__WEBPACK_IMPORTED_MODULE_7__);
    /* harmony import */


    var _objetos_token__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../objetos/token */
    "./src/app/objetos/token.ts");
    /* harmony import */


    var _objetos_error__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../objetos/error */
    "./src/app/objetos/error.ts");
    /* harmony import */


    var file_saver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! file-saver */
    "./node_modules/file-saver/dist/FileSaver.min.js");
    /* harmony import */


    var file_saver__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_10__);
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/material/tabs */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! @angular/material/icon */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");

    var _c0 = ["Receptor"];
    var _c1 = ["Emisor"];

    function EditoresComponent_div_4_Template(rf, ctx) {
      if (rf & 1) {
        var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 27);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditoresComponent_div_4_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);

          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r8.errorLexico = false;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\xD7");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "strong");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\xA1Cuidado!");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " El programa fuente contiene errores l\xE9xicos. ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function EditoresComponent_div_5_Template(rf, ctx) {
      if (rf & 1) {
        var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 27);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditoresComponent_div_5_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

          var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r10.errorSintactico = false;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\xD7");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "strong");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\xA1Cuidado!");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " El programa fuente contiene errores sint\xE1cticos. ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function EditoresComponent_div_6_Template(rf, ctx) {
      if (rf & 1) {
        var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 27);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditoresComponent_div_6_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);

          var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r12.exito = false;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\xD7");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "strong");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\xA1Felicidades!");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " El programa ha sido traducido con \xE9xito. ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    var THEME = 'ace/theme/xcode';
    var THEME2 = 'ace/theme/terminal';
    var LANG1 = 'ace/mode/csharp';
    var LANG2 = 'ace/mode/python';

    var EditoresComponent = /*#__PURE__*/function () {
      function EditoresComponent() {
        _classCallCheck(this, EditoresComponent);

        this.errorLexico = false;
        this.errorSintactico = false;
        this.exito = false;
      }
      /*AREA DE INICIALIZACIÓN DE INTERFAZ */


      _createClass(EditoresComponent, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          ace_builds__WEBPACK_IMPORTED_MODULE_1__["require"]('ace/ext/language_tools');
          this.editorBeautify = ace_builds__WEBPACK_IMPORTED_MODULE_1__["require"]('ace/ext/beautify');
          var emisorElement = this.ReceptorRef.nativeElement;
          var receptorElement = this.EmisorRef.nativeElement;
          var editorOptions = this.getEditorOptions();
          this.jsonErrorArray = new Array();
          this.Receptor = ace_builds__WEBPACK_IMPORTED_MODULE_1__["edit"](emisorElement, editorOptions);
          this.Receptor.setTheme(THEME);
          this.Receptor.getSession().setMode(LANG1);
          this.Receptor.setShowFoldWidgets(true);
          this.Emisor = ace_builds__WEBPACK_IMPORTED_MODULE_1__["edit"](receptorElement, editorOptions);
          this.Emisor.setTheme(THEME2);
          this.Emisor.getSession().setMode(LANG2);
          this.Receptor.setShowFoldWidgets(true);
          this.Receptor.insert(this.document.contenido);
        }
      }, {
        key: "getEditorOptions",
        value: function getEditorOptions() {
          var basicEditorOptions = {
            highlightActiveLine: true,
            minLines: 10,
            maxLines: Infinity
          };
          var extraEditorOptions = {
            enableLiveAutocompletion: true
          };
          var margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
          return margedOptions;
        }
      }, {
        key: "guardar",
        value: function guardar() {
          var blob = new Blob([this.Receptor.getValue()], {
            type: 'text/plain;charset=utf-8'
          });
          Object(file_saver__WEBPACK_IMPORTED_MODULE_10__["saveAs"])(blob, this.document.nombre + '.cs');
        }
        /*AREA DE ANALISIS LÉXICO */

      }, {
        key: "scan",
        value: function scan(entrada) {
          entrada += '\n#'; // Añadiendo el simbolo final.

          this.fila = 1;
          this.columna = 0;
          this.flujoDeTokens = new Array();
          this.estado = 0;
          this.auxLex = '';
          this.errorLexico = false;
          this.errorSintactico = false;
          this.jsonErrorArray = new Array(); // tslint:disable-next-line: prefer-for-of

          for (var i = 0; i < entrada.length; i++) {
            var c = entrada[i];

            switch (this.estado) {
              case 0:
                // Simbolos directos e inicial
                if (c === ',') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].COMA);
                } else if (c === ';') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].PUNTO_Y_COMA);
                } else if (c === '.') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].PUNTO);
                } else if (c === '+') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].SIGNO_MAS);
                } else if (c === '-' || c === '–') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].SIGNO_MENOS);
                } else if (c === '/') {
                  this.auxLex += c;
                  this.estado = 7;
                } else if (c === '*') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].SIGNO_MULTIPLICACION);
                } else if (c === '(') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].PARENTESIS_APERTURA);
                } else if (c === ')') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].PARENTESIS_CIERRE);
                } else if (c === '{') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].LLAVE_APERTURA);
                } else if (c === '}') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].LLAVE_CIERRE);
                } else if (c === '[') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].CORCHETE_APERTURA);
                } else if (c === ']') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].CORCHETE_CIERRE);
                } else if (c === '=') {
                  this.auxLex += c;
                  this.estado = 15;
                } else if (c === '>') {
                  this.auxLex += c;
                  this.estado = 13;
                } else if (c === '<') {
                  this.auxLex += c;
                  this.estado = 14;
                } else if (c === '!') {
                  this.auxLex += c;
                  this.estado = 16;
                } else if (c === ':') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].DOS_PUNTOS);
                } else if (c === '\n') {
                  this.fila++;
                  this.columna = -1;
                } else if (c === '\r') {} else if (c === '\t') {
                  this.columna--;
                } else if (c === ' ') {
                  this.columna--;
                } else if (c === '|') {
                  this.auxLex += c;
                  this.estado = 12;
                } else if (this.IsNumber(c)) // Me enviará al estado para reconocer enteros
                  {
                    this.estado = 1;
                    this.auxLex += c;
                  } else if (this.IsLetter(c) || c === '_') // Me enviará al estado para reconocer Identificadores y reservadas.
                  {
                    this.estado = 3;
                    this.auxLex += c;
                  } else if (c === '"') // Me enviará al estado para reconocer cadenas.
                  {
                    this.estado = 5;
                    this.auxLex += c;
                  } else if (c === '\'') {
                  this.estado = 11;
                  this.auxLex += c;
                } else {
                  if (c === '#' && i === entrada.length - 1) {
                    this.auxLex += c;
                    this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].ULTIMO);
                    console.log('Se ha concluido el análisis léxico');
                  } else {
                    this.auxLex += c;
                    this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].ERROR);
                    this.estado = 0;
                  }
                }

                break;

              case 1:
                // Enteros
                if (this.IsNumber(c)) {
                  this.auxLex += c;
                } else if (c === '.') {
                  this.auxLex += c;
                  this.estado = 2;
                } else // Si no corresponde se envía al estado 0.
                  {
                    this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].NUMERO_ENTERO);
                    i--;
                    this.estado = 0;
                  }

                break;

              case 2:
                // Floats
                if (this.IsNumber(c)) {
                  this.auxLex += c;
                } else {
                  i--;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].NUMERO_DECIMAL);
                }

                break;

              case 3:
                // Reservadas
                if (this.IsLetterOrDigit(c) || c === '.' || c === '_') {
                  this.auxLex += c;
                } else if (this.auxLex === 'int') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_INT);
                  i--;
                } else if (this.auxLex === 'double') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_DOUBLE);
                  i--;
                } else if (this.auxLex === 'char') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_CHAR);
                  i--;
                } else if (this.auxLex === 'string' || this.auxLex === 'String') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_STRING);
                  i--;
                } else if (this.auxLex === 'bool') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_BOOL);
                  i--;
                } else if (this.auxLex === 'true') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].TRUE);
                  i--;
                } else if (this.auxLex === 'false') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].FALSE);
                  i--;
                } else if (this.auxLex === 'class') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_CLASS);
                  i--;
                } else if (this.auxLex === 'static') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_STATIC);
                  i--;
                } else if (this.auxLex === 'void') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_VOID);
                  i--;
                } else if (this.auxLex === 'Main') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_MAIN);
                  i--;
                } else if (this.auxLex === 'do') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_DO);
                  i--;
                } else if (this.auxLex === 'Console.Write') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].FUNCION_WRITELINE);
                  i--;
                } else if (this.auxLex === 'if') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_IF);
                  i--;
                } else if (this.auxLex === 'else') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_ELSE);
                  i--;
                } else if (this.auxLex === 'switch') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_SWITCH);
                  i--;
                } else if (this.auxLex === 'case') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_CASE);
                  i--;
                } else if (this.auxLex === 'break') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_BREAK);
                  i--;
                } else if (this.auxLex === 'for') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_FOR);
                  i--;
                } else if (this.auxLex === 'while') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_WHILE);
                  i--;
                } else if (this.auxLex === 'default') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_DEFAULT);
                  i--;
                } else if (this.auxLex === 'new') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RESERVADA_NEW);
                  i--;
                } else if (this.auxLex === 'return') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].RETURN);
                  i--;
                } else if (this.auxLex === 'continue') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].CONTINUE);
                  i--;
                } else if (this.IsNumber(c)) // Lo envío al estado para reconocer los identificadores.
                  {
                    this.auxLex += c;
                    this.estado = 4;
                  } else if (this.esId(this.auxLex)) {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].IDENTIFICADOR);
                  i--;
                } else {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].ERROR);
                }

                break;

              case 4:
                // Identificadores
                if (this.IsLetterOrDigit(c)) {
                  this.auxLex += c;
                } else if (c === ' ') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].IDENTIFICADOR);
                } else // Si no es letra o digito es un error
                  {
                    i--;
                    this.estado = 0;
                  }

                break;

              case 5:
                if (c !== '\"') {
                  this.auxLex += c;
                } else {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].CADENA);
                }

                break;

              case 6:
                // Estado de error
                if (c !== ' ') {
                  this.auxLex += c;
                } else {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].ERROR);
                  this.estado = 0;
                }

                break;

              case 7:
                // COMENTARIOS
                if (c === '/') {
                  this.auxLex += c;
                  this.estado = 8;
                } else if (c === '*') {
                  this.auxLex += c;
                  this.estado = 9;
                } else {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].SIGNO_DIVISION);
                  i--;
                }

                break;

              case 8:
                // COMENTARIOS DE LINEA
                if (c !== '\n') {
                  this.auxLex += c;
                } else {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].COMENTARIO_LINEA);
                  this.columna = -1;
                  this.fila++;
                }

                break;

              case 9:
                // COMENTARIO DE BLOQUE
                if (c !== '\t' && c !== '\n') {
                  this.auxLex += c;
                } else {}

                if (c === '*') {
                  this.estado = 10;
                } else if (c === '\n') {
                  this.columna = -1;
                  this.fila++;
                } else if (c === '#' && i === entrada.length - 1) {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].ERROR);
                  console.log('Se ha concluido el análisis léxico');
                }

                break;

              case 10:
                if (c !== '\t' && c !== '\t') {
                  this.auxLex += c;
                }

                if (c === '/') {
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].COMENTARIO_BLOQUE);
                } else {
                  this.estado = 9;
                }

                break;

              case 11:
                if (c === '\'' && this.auxLex.length > 2) {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].HTML);
                } else if (c === '\'' && this.auxLex.length === 2) {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].VALOR_CHAR);
                } else {
                  this.auxLex += c;
                }

                break;

              case 12:
                if (c === '|') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].OR_LOGICO);
                } else {
                  i--;
                  this.estado = 0;
                }

                break;

              case 13:
                if (c === '=') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].MAYOR_IGUAL);
                } else {
                  i--;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].MAYOR_QUE);
                }

                break;

              case 14:
                if (c === '=') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].MENOR_IGUAL);
                } else {
                  i--;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].MENOR_QUE);
                }

                break;

              case 15:
                if (c === '=') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].IGUAL_QUE);
                } else {
                  i--;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].IGUAL);
                }

                break;

              case 16:
                if (c === '=') {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].DIFERENTE);
                } else {
                  this.auxLex += c;
                  this.agregarToken(_objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].ERROR);
                }

                break;

              default:
                break;
            }

            this.columna++;
          }
        }
      }, {
        key: "agregarToken",
        value: function agregarToken(tipo) {
          if (tipo === _objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].IDENTIFICADOR) {
            console.log('Variable: ' + this.auxLex + ' en la fila ' + this.fila);
          }

          if (tipo === _objetos_token__WEBPACK_IMPORTED_MODULE_8__["Tipo"].ERROR) {
            var nuevo = new _objetos_token__WEBPACK_IMPORTED_MODULE_8__["Token"](tipo, this.auxLex, this.fila, this.columna, 'Error léxico en la fila ' + this.fila, true);
            this.flujoDeTokens.push(nuevo);
            this.errorLexico = true;
            this.errorSintactico = true;
            this.jsonErrorArray.push(new _objetos_error__WEBPACK_IMPORTED_MODULE_9__["Error"]('Error ' + this.auxLex + ' en columna ' + this.columna, this.fila - 1, this.columna));
          } else {
            var _nuevo = new _objetos_token__WEBPACK_IMPORTED_MODULE_8__["Token"](tipo, this.auxLex, this.fila, this.columna, '', false);

            this.flujoDeTokens.push(_nuevo);
          }

          this.auxLex = '';
          this.estado = 0;
        }
      }, {
        key: "esId",
        value: function esId(cadena) {
          var es = true;

          for (var i = 0; i < cadena.Length; i++) {
            if (this.IsLetterOrDigit(cadena[i]) || cadena[i] === '_') {} else {
              es = false;
            }
          }

          return es;
        }
      }, {
        key: "IsLetter",
        value: function IsLetter(c) {
          return c.toLowerCase() !== c.toUpperCase();
        }
      }, {
        key: "IsLetterOrDigit",
        value: function IsLetterOrDigit(c) {
          return this.IsLetter(c) || this.IsNumber(c);
        }
      }, {
        key: "IsNumber",
        value: function IsNumber(c) {
          return c.match(/[0-9]/i);
        }
        /* ÁREA DE FLUJO GENERAL DEL ANÁLISIS */

      }, {
        key: "analisis",
        value: function analisis() {
          this.errorLexico = false;
          this.scan(this.Receptor.getValue());
          console.log(this.flujoDeTokens);
          this.exito = this.mensajeDefin();
          this.Receptor.getSession().setAnnotations(this.jsonErrorArray);
        }
      }, {
        key: "mensajeDefin",
        value: function mensajeDefin() {
          if (!this.errorSintactico && !this.errorLexico && this.flujoDeTokens != null) {
            return true;
          }

          return false;
        }
      }]);

      return EditoresComponent;
    }();

    EditoresComponent.ɵfac = function EditoresComponent_Factory(t) {
      return new (t || EditoresComponent)();
    };

    EditoresComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: EditoresComponent,
      selectors: [["app-editores"]],
      viewQuery: function EditoresComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c0, true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_c1, true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.ReceptorRef = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.EmisorRef = _t.first);
        }
      },
      inputs: {
        document: "document"
      },
      decls: 63,
      vars: 3,
      consts: [[1, "row"], [1, "col"], [1, "code-editor", 2, "max-width", "34.5rem", "min-width", "34.5rem"], ["Receptor", ""], ["class", "alert alert-warning alert-dismissable", "style", "max-width: 32.5rem; min-width: 32.5rem;", 4, "ngIf"], ["class", "alert alert-danger alert-dismissable", "style", "max-width: 32.5rem; min-width: 32.5rem;", 4, "ngIf"], ["class", "alert alert-success alert-dismissable", "style", "max-width: 32.5rem; min-width: 32.5rem;", 4, "ngIf"], ["Emisor", ""], [1, "row", "justify-content-xl-start"], [1, "col", "justify-content-center"], [1, "card", "border-primary", "mb-3", 2, "max-width", "36.5rem", "min-width", "36.5rem"], [1, "card-header"], [1, "card-body"], [1, "table", "table-active"], ["scope", "col"], [1, "table-active"], ["scope", "row"], ["label", "HTML"], ["for", "exampleTextarea"], ["id", "exampleTextarea", "rows", "5", "disabled", "", 1, "form-control"], ["label", "JSON"], [1, "row", "justify-content-center"], ["mat-fab", "", "color", "warn", 3, "click"], ["mat-fab", "", "color", "primary", 3, "click"], ["mat-fab", ""], ["mat-fab", "", "color", "success", "type", "button"], [1, "alert", "alert-warning", "alert-dismissable", 2, "max-width", "32.5rem", "min-width", "32.5rem"], ["type", "button", "data-dismiss", "alert", 1, "close", 3, "click"], [1, "alert", "alert-danger", "alert-dismissable", 2, "max-width", "32.5rem", "min-width", "32.5rem"], [1, "alert", "alert-success", "alert-dismissable", 2, "max-width", "32.5rem", "min-width", "32.5rem"]],
      template: function EditoresComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2, 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, EditoresComponent_div_4_Template, 6, 0, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, EditoresComponent_div_5_Template, 6, 0, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, EditoresComponent_div_6_Template, 6, 0, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "div", 2, 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Tabla de simbolos");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "table", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "thead");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Nombre");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Tipo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Linea");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "tbody");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "tr", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "th", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "int");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "12");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "mat-tab-group");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "mat-tab", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "textarea", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "mat-tab", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "textarea", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "button", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditoresComponent_Template_button_click_47_listener() {
            return ctx.analisis();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " code ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, " \xA0 \xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "button", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditoresComponent_Template_button_click_51_listener() {
            return ctx.guardar();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, " save ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, " \xA0 \xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "button", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " cloud_download ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, " \xA0 \xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "button", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " donut_small ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.errorLexico);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.errorSintactico);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.exito);
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__["MatTab"], _angular_material_button__WEBPACK_IMPORTED_MODULE_13__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__["MatIcon"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2VkaXRvcmVzL2VkaXRvcmVzLmNvbXBvbmVudC5jc3MifQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EditoresComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-editores',
          templateUrl: './editores.component.html',
          styleUrls: ['./editores.component.css']
        }]
      }], function () {
        return [];
      }, {
        ReceptorRef: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: ['Receptor', {
            "static": true
          }]
        }],
        EmisorRef: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: ['Emisor', {
            "static": true
          }]
        }],
        document: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/app/objetos/documento.ts":
  /*!**************************************!*\
    !*** ./src/app/objetos/documento.ts ***!
    \**************************************/

  /*! exports provided: Documento */

  /***/
  function srcAppObjetosDocumentoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Documento", function () {
      return Documento;
    });

    var Documento = function Documento() {
      _classCallCheck(this, Documento);
    };
    /***/

  },

  /***/
  "./src/app/objetos/error.ts":
  /*!**********************************!*\
    !*** ./src/app/objetos/error.ts ***!
    \**********************************/

  /*! exports provided: Error */

  /***/
  function srcAppObjetosErrorTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Error", function () {
      return Error;
    });

    var Error = function Error(mensaje, fila, columna) {
      _classCallCheck(this, Error);

      this.row = fila;
      this.column = columna;
      this.text = mensaje;
      this.type = 'error';
    };
    /***/

  },

  /***/
  "./src/app/objetos/token.ts":
  /*!**********************************!*\
    !*** ./src/app/objetos/token.ts ***!
    \**********************************/

  /*! exports provided: Token, Tipo */

  /***/
  function srcAppObjetosTokenTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Token", function () {
      return Token;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Tipo", function () {
      return Tipo;
    });

    var Token = function Token(tipo, lexema, fila, columna, desc, error) {
      _classCallCheck(this, Token);

      this.Tipo = tipo;
      this.lexema = lexema;
      this.fila = fila;
      this.columna = columna;
      this.descripcion = desc;
      this.error = error;
    };

    var Tipo;

    (function (Tipo) {
      Tipo[Tipo["RESERVADA_INT"] = 0] = "RESERVADA_INT";
      Tipo[Tipo["RESERVADA_DOUBLE"] = 1] = "RESERVADA_DOUBLE";
      Tipo[Tipo["RESERVADA_DO"] = 2] = "RESERVADA_DO";
      Tipo[Tipo["RESERVADA_CHAR"] = 3] = "RESERVADA_CHAR";
      Tipo[Tipo["RESERVADA_STRING"] = 4] = "RESERVADA_STRING";
      Tipo[Tipo["RESERVADA_BOOL"] = 5] = "RESERVADA_BOOL";
      Tipo[Tipo["CADENA"] = 6] = "CADENA";
      Tipo[Tipo["RETURN"] = 7] = "RETURN";
      Tipo[Tipo["NUMERO"] = 8] = "NUMERO";
      Tipo[Tipo["GUION_BAJO"] = 9] = "GUION_BAJO";
      Tipo[Tipo["COMA"] = 10] = "COMA";
      Tipo[Tipo["PUNTO_Y_COMA"] = 11] = "PUNTO_Y_COMA";
      Tipo[Tipo["TRUE"] = 12] = "TRUE";
      Tipo[Tipo["FALSE"] = 13] = "FALSE";
      Tipo[Tipo["PUNTO"] = 14] = "PUNTO";
      Tipo[Tipo["SIGNO_MAS"] = 15] = "SIGNO_MAS";
      Tipo[Tipo["SIGNO_MENOS"] = 16] = "SIGNO_MENOS";
      Tipo[Tipo["SIGNO_DIVISION"] = 17] = "SIGNO_DIVISION";
      Tipo[Tipo["SIGNO_MULTIPLICACION"] = 18] = "SIGNO_MULTIPLICACION";
      Tipo[Tipo["PARENTESIS_APERTURA"] = 19] = "PARENTESIS_APERTURA";
      Tipo[Tipo["PARENTESIS_CIERRE"] = 20] = "PARENTESIS_CIERRE";
      Tipo[Tipo["LLAVE_APERTURA"] = 21] = "LLAVE_APERTURA";
      Tipo[Tipo["LLAVE_CIERRE"] = 22] = "LLAVE_CIERRE";
      Tipo[Tipo["DIFERENTE"] = 23] = "DIFERENTE";
      Tipo[Tipo["CORCHETE_APERTURA"] = 24] = "CORCHETE_APERTURA";
      Tipo[Tipo["CORCHETE_CIERRE"] = 25] = "CORCHETE_CIERRE";
      Tipo[Tipo["IDENTIFICADOR"] = 26] = "IDENTIFICADOR";
      Tipo[Tipo["IGUAL"] = 27] = "IGUAL";
      Tipo[Tipo["IGUAL_QUE"] = 28] = "IGUAL_QUE";
      Tipo[Tipo["MAYOR_QUE"] = 29] = "MAYOR_QUE";
      Tipo[Tipo["MAYOR_IGUAL"] = 30] = "MAYOR_IGUAL";
      Tipo[Tipo["MENOR_QUE"] = 31] = "MENOR_QUE";
      Tipo[Tipo["MENOR_IGUAL"] = 32] = "MENOR_IGUAL";
      Tipo[Tipo["ADMIRACION"] = 33] = "ADMIRACION";
      Tipo[Tipo["RESERVADA_CLASS"] = 34] = "RESERVADA_CLASS";
      Tipo[Tipo["RESERVADA_STATIC"] = 35] = "RESERVADA_STATIC";
      Tipo[Tipo["RESERVADA_VOID"] = 36] = "RESERVADA_VOID";
      Tipo[Tipo["RESERVADA_MAIN"] = 37] = "RESERVADA_MAIN";
      Tipo[Tipo["RESERVADA_ARGS"] = 38] = "RESERVADA_ARGS";
      Tipo[Tipo["FUNCION_WRITELINE"] = 39] = "FUNCION_WRITELINE";
      Tipo[Tipo["RESERVADA_ELSE"] = 40] = "RESERVADA_ELSE";
      Tipo[Tipo["RESERVADA_SWITCH"] = 41] = "RESERVADA_SWITCH";
      Tipo[Tipo["RESERVADA_CASE"] = 42] = "RESERVADA_CASE";
      Tipo[Tipo["DOS_PUNTOS"] = 43] = "DOS_PUNTOS";
      Tipo[Tipo["RESERVADA_BREAK"] = 44] = "RESERVADA_BREAK";
      Tipo[Tipo["RESERVADA_FOR"] = 45] = "RESERVADA_FOR";
      Tipo[Tipo["RESERVADA_WHILE"] = 46] = "RESERVADA_WHILE";
      Tipo[Tipo["RESERVADA_DEFAULT"] = 47] = "RESERVADA_DEFAULT";
      Tipo[Tipo["FUNCION_GRAFICARVECTOR"] = 48] = "FUNCION_GRAFICARVECTOR";
      Tipo[Tipo["NUMERO_ENTERO"] = 49] = "NUMERO_ENTERO";
      Tipo[Tipo["NUMERO_DECIMAL"] = 50] = "NUMERO_DECIMAL";
      Tipo[Tipo["ERROR"] = 51] = "ERROR";
      Tipo[Tipo["RESERVADA_IF"] = 52] = "RESERVADA_IF";
      Tipo[Tipo["COMENTARIO_LINEA"] = 53] = "COMENTARIO_LINEA";
      Tipo[Tipo["COMENTARIO_BLOQUE"] = 54] = "COMENTARIO_BLOQUE";
      Tipo[Tipo["RESERVADA_NEW"] = 55] = "RESERVADA_NEW";
      Tipo[Tipo["ULTIMO"] = 56] = "ULTIMO";
      Tipo[Tipo["VALOR_CHAR"] = 57] = "VALOR_CHAR";
      Tipo[Tipo["OR_LOGICO"] = 58] = "OR_LOGICO";
      Tipo[Tipo["HTML"] = 59] = "HTML";
      Tipo[Tipo["CONTINUE"] = 60] = "CONTINUE";
    })(Tipo || (Tipo = {}));
    /***/

  },

  /***/
  "./src/app/principal/principal.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/principal/principal.component.ts ***!
    \**************************************************/

  /*! exports provided: PrincipalComponent */

  /***/
  function srcAppPrincipalPrincipalComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PrincipalComponent", function () {
      return PrincipalComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _objetos_documento__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../objetos/documento */
    "./src/app/objetos/documento.ts");
    /* harmony import */


    var _services_upload_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../services/upload.service */
    "./src/app/services/upload.service.ts");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material/menu */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");
    /* harmony import */


    var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material/icon */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
    /* harmony import */


    var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/tabs */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _editores_editores_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../editores/editores.component */
    "./src/app/editores/editores.component.ts");

    function PrincipalComponent_mat_tab_36_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-editores", 22);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var item_r2 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", item_r2.nombre);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("document", item_r2);
      }
    }

    var PrincipalComponent = /*#__PURE__*/function () {
      function PrincipalComponent(service) {
        _classCallCheck(this, PrincipalComponent);

        this.service = service;
      }

      _createClass(PrincipalComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.documentos = [];
          this.contador = 0;
        }
      }, {
        key: "pushItem",
        value: function pushItem() {
          this.contador++;
          var nuevo = new _objetos_documento__WEBPACK_IMPORTED_MODULE_1__["Documento"]();
          nuevo.contenido = '';
          nuevo.nombre = 'Documento ' + this.contador;
          this.documentos.push(nuevo);
        }
      }, {
        key: "onUpload",
        value: function onUpload(e) {
          var _this = this;

          this.uploadedFiles = e.target.files;
          var formData = new FormData(); // tslint:disable-next-line: prefer-for-of

          for (var index = 0; index < this.uploadedFiles.length; index++) {
            // tslint:disable-next-line: no-shadowed-variable
            var element = this.uploadedFiles[index];
            formData.append('uploads[]', element, element.name);
          } // Call service.
          // this.service.uploadFile(formData).subscribe((res) => {
          // console.log('Response: ', res);
          // });
          // Read text


          var reader = new FileReader();

          reader.onload = function (event) {
            if (event.target.result) {
              var nuevo = new _objetos_documento__WEBPACK_IMPORTED_MODULE_1__["Documento"]();
              nuevo.contenido = event.target.result;
              nuevo.nombre = _this.uploadedFiles[0].name;

              _this.documentos.push(nuevo);
            }
          };

          reader.readAsText(this.uploadedFiles[0]);
        }
      }]);

      return PrincipalComponent;
    }();

    PrincipalComponent.ɵfac = function PrincipalComponent_Factory(t) {
      return new (t || PrincipalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_upload_service__WEBPACK_IMPORTED_MODULE_2__["UploadService"]));
    };

    PrincipalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PrincipalComponent,
      selectors: [["app-principal"]],
      decls: 37,
      vars: 2,
      consts: [[1, "navbar", "navbar-expand-lg", "navbar-dark", "bg-dark"], [1, "col-sm-2"], ["href", "./", 1, "navbar-brand"], [1, "row", "justify-content-center"], [1, "material-icons"], [1, "row"], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarColor02", "aria-controls", "navbarColor02", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarColor02", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "mr-auto"], [1, "col"], [1, "nav-item", "active"], ["mat-button", "", 3, "matMenuTriggerFor"], ["archivo", "matMenu"], ["mat-menu-item", ""], ["type", "file", "id", "input-custom-file", 1, "custom-file-input", 3, "change"], [1, "jumbotron"], [1, "display-3", 2, "height", "10px"], [1, "row", "justify-content-end", 2, "height", "15px"], ["mat-fab", "", "color", "dark", 3, "click"], ["animationDuration", "2000ms", 3, "label", 4, "ngFor", "ngForOf"], ["animationDuration", "2000ms", 3, "label"], [3, "document"]],
      template: function PrincipalComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " g_translate ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " TRADUCTOR ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ul", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " file_copy ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Archivo ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-menu", null, 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "open_in_browser");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Abrir ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "input", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function PrincipalComponent_Template_input_change_24_listener($event) {
            return ctx.onUpload($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h1", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "\xA1YOU GOT THIS!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PrincipalComponent_Template_button_click_30_listener() {
            return ctx.pushItem();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "span", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "add");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-tab-group");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, PrincipalComponent_mat_tab_36_Template, 2, 2, "mat-tab", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.documentos);
        }
      },
      directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__["MatMenuTrigger"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__["_MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__["MatMenuItem"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabGroup"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTab"], _editores_editores_component__WEBPACK_IMPORTED_MODULE_8__["EditoresComponent"]],
      styles: [".mat-tab-list .mat-tab-labels .mat-tab-label-active {\r\ncolor:black;\r\n}\r\n\r\n.mat-ink-bar[_ngcontent-%COMP%] {\r\ncolor:black;\r\n}\r\n  .mat-ink-bar {\r\n  background-color:#ee2925 !important;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJpbmNpcGFsL3ByaW5jaXBhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7QUFDZjtBQUNBLFdBQVc7QUFDWDtBQUVBLFlBQVk7QUFDWjtBQUNBLFdBQVc7QUFDWDtBQUVBO0VBQ0UsbUNBQW1DLENBQUMiLCJmaWxlIjoic3JjL2FwcC9wcmluY2lwYWwvcHJpbmNpcGFsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBhY3RpdmUgdGFiICovXHJcbjo6bmctZGVlcCAubWF0LXRhYi1saXN0IC5tYXQtdGFiLWxhYmVscyAubWF0LXRhYi1sYWJlbC1hY3RpdmUge1xyXG5jb2xvcjpibGFjaztcclxufVxyXG5cclxuLyogaW5rIGJhciAqL1xyXG4ubWF0LWluay1iYXIge1xyXG5jb2xvcjpibGFjaztcclxufVxyXG5cclxuOjpuZy1kZWVwIC5tYXQtaW5rLWJhciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjojZWUyOTI1ICFpbXBvcnRhbnQ7fVxyXG4iXX0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrincipalComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-principal',
          templateUrl: './principal.component.html',
          styleUrls: ['./principal.component.css']
        }]
      }], function () {
        return [{
          type: _services_upload_service__WEBPACK_IMPORTED_MODULE_2__["UploadService"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/services/upload.service.ts":
  /*!********************************************!*\
    !*** ./src/app/services/upload.service.ts ***!
    \********************************************/

  /*! exports provided: UploadService */

  /***/
  function srcAppServicesUploadServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UploadService", function () {
      return UploadService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");

    var UploadService = /*#__PURE__*/function () {
      function UploadService(http) {
        _classCallCheck(this, UploadService);

        this.http = http;
      }

      _createClass(UploadService, [{
        key: "uploadFile",
        value: function uploadFile(formData) {
          var urlApi = 'http://localhost:3000/api/upload';
          return this.http.post(urlApi, formData);
        }
      }]);

      return UploadService;
    }();

    UploadService.ɵfac = function UploadService_Factory(t) {
      return new (t || UploadService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
    };

    UploadService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: UploadService,
      factory: UploadService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], function () {
        return [{
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      production: false
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/

  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! C:\Users\jose5\Documents\USAC\COMPILADORES 1\Practica 2\Front End\app\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map