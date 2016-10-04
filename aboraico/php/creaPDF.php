<?php
include_once('PDF.php');
include_once('myDBC.php');

	$mat = $_POST['matricula'];
	
	//Recibimos dentro de una cadena la fecha
	$fecha="Valdivia, Chile a ".$_POST['dia']." de ". $_POST['mes']. " de ".$_POST['anio'];
 
 	$pdf = new PDF();
    $pdf->AddPage('P', 'Letter'); //Vertical, Carta
    $pdf->SetFont('Arial','B',12); //Arial, negrita, 12 puntos
 
    //Imprime la fecha
    $pdf->Cell(0,10,$fecha,0,1,'R');
    //Imprime un texto
    $pdf->Cell(40,7,'P  R  E  S  E  N  T  E',0, 1 , ' L ');
    $pdf->Ln();

    $pdf->ImprimirTexto('textoFijo.txt'); //Texto fijo 

    //Creamos objeto de la clase myDBC
    //para hacer uso del método seleccionar_persona()
    $consultaPersona = new myDBC();
 
    //En una variable guardamos el array que regresa el método
    $datosPersona = $consultaPersona->seleccionar_persona($mat);
 
    //Array de cadenas para la cabecera
    $cabecera = array("Nombre","A Paterno","A Materno", "Solicitud", "Puesto");
    $pdf->tabla($cabecera,$datosPersona); //Método que integra a cabecera y datos
 
    $pdf->Output(); //Salida al navegador del pdf

?>