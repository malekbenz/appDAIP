function extractDate(str){

  var re = [/(\d{2})\/(\d{2})\/(\d{4})/,/(\d{2})\/(\d{2})\/(\d{2})/,

    /(\d{2})\.(\d{2})\.(\d{4})/,/(\d{2})\.(\d{2})\.(\d{2})/,

    /(\d{4})\/(\d{2})\/(\d{2})/  ];

    var parts;

    for(var i=0; i< re.length; i++ ){

      parts = str.match(re[i]);

      if(parts){

        return parts[0];

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



  persone.dateNaissance =extractDate(strTerms);

  strTerms = strTerms.replace(persone.dateNaissance,'');

  var terms = strTerms.split(" ");;



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

exports.getPersoneFromStr = getPersoneFromStr;
