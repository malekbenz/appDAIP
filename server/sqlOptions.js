
var sqlContrat = 'SELECT first 10  * FROM Contrats'    ;
var sqlContratHead =
      "SELECT  first 10   nom || ' ' || dem.pren as demandeur, dem.sexe || '' As sexe, Emp.lib_Emp As Employeur,"+
      "Emp.Sect_Jur as SecteurJuridique, Ctr.Cat as Programme,"+
      "Ctr.Dat_Deb as DateDebut , Dat_Fin As DateFin, NI.Lib_Niv As Nivreau, NI.Typ_Niv As TypeNiveau,"+
      "Dat_Nais As DateNaiss,dem.Cod_Agence As Agence,Ctr.COD_DIP, Dip.LIB_FOR As Diplome, Dip.LIB_DIP As LibelleDiplome"+
      ", Ctr.CPTE As CCP" +

      " FROM contrats Ctr  INNER JOIN demandeur Dem  ON( ctr.cod_dem= dem.cod_dem)  "+
      " INNER JOIN employeur Emp ON( ctr.cod_emp= emp.cod_emp) "+
      " INNER JOIN N_I NI ON( Dem.cod_Niv= NI.cod_Niv)  "+
      " INNER JOIN DIPLOME Dip  ON( Ctr.COD_DIP= Dip.COD_DIP)";



var sqlContrat1 = sqlContratHead + " Order by Emp.lib_Emp  ASC";

var sqlContratByCCP =
      sqlContratHead + " Where Ctr.CPTE like ?"
       " Order by Emp.lib_Emp  ASC";

var sqlContratByFname =
        sqlContratHead + " Where Ctr.CPTE like ? AND dem.nom like ? "
        " Order by Emp.lib_Emp  ASC";
var sqlContratByLname =
            sqlContratHead + " Where Ctr.CPTE like ? AND dem.pren like ? "
        " Order by Emp.lib_Emp  ASC";
var sqlContratByFLname =
        sqlContratHead + " Where Ctr.CPTE like ? AND dem.nom like ? AND dem.pren like ? AND Dat_Nais like ? "
        " Order by Emp.lib_Emp  ASC";


exports.sqlContrat = sqlContrat1;
exports.sqlContratByCCP = sqlContratByCCP;
exports.sqlContratByFname =sqlContratByFname;
exports.sqlContratByLname =sqlContratByFname;
exports.sqlContratByFLname =sqlContratByFLname;
