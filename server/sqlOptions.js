
var sqlContrat = 'SELECT first 10  * FROM Contrats'    ;

var sqlContrat1 =
    "SELECT  first 10   nom || ' ' || dem.pren as demandeur, dem.sexe || '' As sexe, Emp.lib_Emp As Employeur,"+
    "Emp.Sect_Jur as SecteurJuridique, Ctr.Cat as Programme,"+
    "Ctr.Dat_Deb as DateDebut , Dat_Fin As DateFin, NI.Lib_Niv As Nivreau, NI.Typ_Niv As TypeNiveau,"+
    "Dat_Nais As DateNaiss,dem.Cod_Agence As Agence,Ctr.COD_DIP, Dip.LIB_FOR As Diplome, Dip.LIB_DIP As LibelleDiplome"+

    " FROM contrats Ctr  INNER JOIN demandeur Dem INNER JOIN employeur Emp INNER JOIN N_I NI INNER JOIN DIPLOME Dip"+
    " ON( ctr.cod_dem= dem.cod_dem)  ON( ctr.cod_emp= emp.cod_emp)  ON( Dem.cod_Niv= NI.cod_Niv)  ON( Ctr.COD_DIP= Dip.COD_DIP)"+

    " Order by Emp.lib_Emp  ASC";


exports.sqlContrat = sqlContrat1;
