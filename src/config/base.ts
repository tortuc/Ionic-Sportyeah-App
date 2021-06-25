export const SIDEBAR_ITEMS = [
  {
    title: "sidebar.profile",
    url: "/profile",
    icon: "person",
    fas: "",
    children: [],
  },

  {
    title: "sidebar.home",
    url: "/dashboard",
    icon: "home",
    fas: "",
    children: [],
  },
  {
    title: "sidebar.chat",
    url: "/chat",
    icon: "chatbox-ellipses",
    fas: "",
    children: [],
  },
  // {
  //   title: "sidebar.bet",
  //   url: "",
  //   icon: "diamond",
  //   fas: '',
  //   children: [
  //     {
  //       title: "sidebar.tournament",
  //       url: "/bet/tourney",
  //       icon: "",
  //       fas: '<i class="fas fa-sitemap"></i>'
  //     },
  //     {
  //       title: "sidebar.billy",
  //       url: "/bet/billy",
  //       icon: "",
  //       fas: '<i class="fas fa-hand-holding-usd"></i>'
  //     }
  //   ]
  // },
  {
    title: "challenges",
    url: "/challenges",
    icon: "medal",
    fas: "",
    children: [],
  },
  {
    title: "sidebar.news",
    url: "/news",
    icon: "newspaper",
    fas: "",
    children: [],
  },
  {
    title: "sidebar.ranking",
    url: "/ranking",
    icon: "ribbon",
    fas: "",
    children: [],
  },
  {
    title: "livescore",
    url: "/livescore",
    icon: "football",
    fas: "",
    children: [],
  },
  {
    title: "sidebar.event",
    url: "/event",
    icon: "megaphone",
    fas: "",
    children: [],
  },
];

/**
 * Tipos de perfiles disponibles
 */

export const profiles = [
  "club",
  "player",
  "staff",
  "amateur",
  "representative",
  "scout",
  "press",
  "association",
  "foundation",
  "federation",
  "sponsor",
  "executive",
  "administration",
  "referee",
];

/**
 * Sub perfiles de administrador
 */

export const sub_profiles_administration = [
  "president",
  "vice_president",
  "adviser",
  "shareholder",
  "secretary",
  "area_director",
  "area_finance",
  "area_marketing",
  "area_commercial",
  "area_purchasing",
  "hhrr",
  "area_scouting",
  "area_trainig",
  "area_admin",
];

/**
 * Sub perfiles de staff
 */

export const sub_profiles_staff = [
  "firstcoach",
  "secondcoach",
  "staffmember",
  "delegate",
  "medicine",
  "nutritionist",
  "sports_sychology",
];

export const languajes = [
  "es", // espaniol
  "en", // ingles
  "ca", // catalan
  "gl", // gallego
  "eu", // euskera
  "fr", // frances
  "de", // aleman
  "it", // italiano
  "pt", // portugues
  "ru", // ruso
  "zh", // chino
  "ja", // japones
  "ar", // arabe
  "hi", // hindu
];


export var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();