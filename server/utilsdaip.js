function formatDate(strDate) {

  var date = strDate.replace(/\./g,'/')

  date = date.split('/');

  try {

      date = new Date(date[2], date[1]-1, date[0]);

  }

  catch (e) {

      return '';

  }

        month = '' + (date.getMonth()+1),

        day = '' + date.getDate(),

        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;

    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');

}



function extractDate(str){



  var re = [/(\d{1,2})\/(\d{1,2})\/(\d{4})/,/(\d{1,2})\/(\d{1,2})\/(\d{2})/,

            /(\d{1,2})\.(\d{1,2})\.(\d{4})/,/(\d{1,2})\.(\d{1,2})\.(\d{2})/,

            /(\d{4})\/(\d{1,2})\/(\d{1,2})/  ];

    var parts;

    for(var i=0; i< re.length; i++ ){

      parts = str.match(re[i]);

        if(parts){

          var result = parts[0];

          return result;

      }

    }

    return '';

  }

function getPersoneFromStr(strTerms){

  var persone = {

                CCP :'' ,

                nom :'',

                prenom:'',

                dateNaissance : ''

            };

  persone.dateNaissance = extractDate(strTerms);

  strTerms = strTerms.replace(persone.dateNaissance,'');

  if(persone.dateNaissance)

  {

    persone.dateNaissance = formatDate(persone.dateNaissance);

  }

  var terms = strTerms.split(" ");

  terms.forEach(function(el){

      if (!el.trim()) return;

      if (parseInt(el, 10))

      {

        if (persone.CCP) return;

        persone.CCP = el;

      }

      else

      {

        if(!persone.nom)

          persone.nom = el;

        else

        if(!persone.prenom)

          persone.prenom = el;

      }

    });

  return persone;

}

function getUrlTerms(strTerms)  {

  var persone = getPersoneFromStr(strTerms);

  var result = '?ccp=' + persone.CCP;

    result += '&nom=' + persone.nom;

    result += '&prenom=' + persone.prenom;

    result += '&dateNaissance=' + persone.dateNaissance;

  return result;

}



var months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// var str = getPersoneFromStr('01.01.2015 b a ' );

// console.log(str);

exports.getPersoneFromStr = getPersoneFromStr;
