webpackJsonp([0],{"/TYz":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Obrk"),a=n("Pmg7"),r=!1;var s=function(t){r||n("1BcJ")},o=n("VU/8")(i.a,a.a,!1,s,"data-v-1b011d9c",null);o.options.__file="pages\\index.vue",e.default=o.exports},"/k1P":function(t,e,n){"use strict";n.d(e,"b",function(){return l}),n.d(e,"a",function(){return p});var i,a=n("Xxa5"),r=n.n(a),s=n("exGp"),o=n.n(s),u=n("mtWM"),c=n.n(u),l=(i=o()(r.a.mark(function t(e,n,i){var a,s,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d(e,n);case 3:return a=t.sent,s=a.data,o=[],s.items.map(function(t){var e={};e.id=t.id,e.title=t.snippet.title,e.img=(t.snippet.thumbnails.standard||t.snippet.thumbnails.medium||t.snippet.thumbnails.high||t.snippet.thumbnails.default||t.snippet.thumbnails.low).url,e.rating=i.getters.getVideoRating(e.id),o.push(e)}),t.abrupt("return",o);case 10:return t.prev=10,t.t0=t.catch(0),console.error(t.t0),t.abrupt("return",[]);case 14:case"end":return t.stop()}},t,this,[[0,10]])})),function(t,e,n){return i.apply(this,arguments)});function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"RU";return c.a.get("https://www.googleapis.com/youtube/v3/videos?part=id,snippet&chart=mostPopular&maxResults=30&key="+t+"&regionCode="+e)}function p(t,e){return c.a.get("https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,topicDetails&key="+t+"&id="+e)}},"1BcJ":function(t,e,n){var i=n("zdkm");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("afd70b36",i,!1,{sourceMap:!1})},BoPs:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{column:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-card",[n("v-container",{attrs:{fluid:"","grid-list-md":""}},[n("v-layout",{attrs:{row:"",wrap:""}},t._l(t.videos,function(e,i){return n("v-flex",{key:e.id,class:{xs12:0==i,"xs12 sm6 md4 xl3":i>0}},[n("VideoListItem",{attrs:{"video-n":i+1,"video-title":e.title,"video-image":e.img,"video-link":t.makeUrl(e.id),"video-rating":e.rating}})],1)}))],1)],1)],1)],1)};i._withStripped=!0;var a={render:i,staticRenderFns:[]};e.a=a},JC0p:function(t,e,n){"use strict";var i=n("rVk8"),a=n("BoPs"),r=n("VU/8")(i.a,a.a,!1,null,null,null);r.options.__file="components\\VideoList.vue",e.a=r.exports},Obrk:function(t,e,n){"use strict";var i=n("Xxa5"),a=n.n(i),r=n("exGp"),s=n.n(r),o=n("/k1P"),u=n("JC0p");e.a={components:{VideoList:u.a},data:function(){return{regions:[{text:"Россия",value:"RU"},{text:"Франция",value:"FR"},{text:"Германия",value:"DE"},{text:"США",value:"US"},{text:"Южная Корея",value:"KR"},{text:"Япония",value:"JP"}]}},asyncData:function(){var t=s()(a.a.mark(function t(e){var n,i;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store.getters.getRegion,t.next=3,Object(o.b)(e.env.youtubeApiKey,n,e.store);case 3:return i=t.sent,t.abrupt("return",{videos:i});case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),methods:{regionClick:function(){var t=s()(a.a.mark(function t(e){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$store.commit("setRegion",e),this.$nuxt.$loading.start(),t.next=4,Object(o.b)("AIzaSyByGQXF36RKNV2lO0R2lU5jcHFnqBwEHbk",e,this.$store);case 4:this.videos=t.sent,this.$nuxt.$loading.finish();case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},computed:{getRegion:function(){return this.$store.getters.getRegion}}}},PSx8:function(t,e,n){"use strict";e.a={props:{videoN:{type:Number,default:0},videoTitle:{type:String,default:"название не указано..."},videoImage:{type:String,default:"no-image.png"},videoLink:{type:String,default:"/"},videoRating:{type:Number,default:0}},filters:{toStars:function(t){return"★".repeat(t)+"☆".repeat(5-t)}}}},Pmg7:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{column:"","justify-center":"","align-center":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-toolbar",{attrs:{color:"info",dark:""}},[n("v-toolbar-title",[t._v("Самые популярные видео")]),n("v-spacer"),n("v-menu",{attrs:{bottom:"","offset-y":"",left:""}},[n("v-btn",{staticClass:"info",attrs:{slot:"activator",flat:""},slot:"activator"},[t._v("Регион")]),n("v-list",t._l(t.regions,function(e){return n("v-list-tile",{key:e.value},[n("v-btn",{class:{"region-selected-color":e.value==t.getRegion},attrs:{flat:"",block:"",small:""},on:{click:function(n){t.regionClick(e.value)}}},[t._v("\n              "+t._s(e.text)+"\n            ")])],1)}))],1)],1),n("VideoList",{attrs:{videos:t.videos}})],1)],1)};i._withStripped=!0;var a={render:i,staticRenderFns:[]};e.a=a},TEwk:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("nuxt-link",{staticClass:"link-block",attrs:{to:t.videoLink}},[n("v-card-media",{attrs:{src:t.videoImage,height:"200px"}},[n("v-flex",{staticClass:"video-title-container",attrs:{xs12:"","align-end":"",flexbox:""}},[n("span",{staticClass:"video-title title white--text",domProps:{textContent:t._s(t.videoTitle)}})])],1),n("v-card-actions",{staticClass:"rating"},[n("span",{staticClass:"blue-grey--text text--darken-1 video-number"},[t._v("#"+t._s(t.videoN))]),n("v-spacer"),n("span",{staticClass:"amber--text text--darken-2"},[t._v(t._s(t._f("toStars")(t.videoRating)))])],1)],1)],1)};i._withStripped=!0;var a={render:i,staticRenderFns:[]};e.a=a},V990:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,".video-title-container[data-v-f95252d8]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;padding:0!important}.video-title[data-v-f95252d8]{display:inline-block;width:100%;padding:10px;background:rgba(50,50,50,.35);background:rgba(55,55,55,.6);font-size:18px;font-weight:400;text-shadow:1px 1px 1px #000,2px 2px 1px #000}.link-block[data-v-f95252d8]{text-decoration:none}.video-number[data-v-f95252d8]{font-weight:700}.rating[data-v-f95252d8]{font-size:18px}",""])},nUvZ:function(t,e,n){var i=n("V990");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("3689333a",i,!1,{sourceMap:!1})},pwHq:function(t,e,n){"use strict";var i=n("PSx8"),a=n("TEwk"),r=!1;var s=function(t){r||n("nUvZ")},o=n("VU/8")(i.a,a.a,!1,s,"data-v-f95252d8",null);o.options.__file="components\\VideoListItem.vue",e.a=o.exports},rVk8:function(t,e,n){"use strict";var i=n("pwHq");e.a={components:{VideoListItem:i.a},props:{videos:{type:Array,required:!0}},methods:{makeUrl:function(t){return"/video/"+t}}}},zdkm:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,".region-selected-color[data-v-1b011d9c]{color:#009688}",""])}});