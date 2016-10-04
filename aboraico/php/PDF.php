<?php
include_once('fpdf.php');
class PDF extends FPDF
{

	function Footer() // Pie de página
    {
        // Posición: a 1,5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial','I',8);
        /* Cell(ancho, alto, txt, border, ln, alineacion)
         * ancho=0, extiende el ancho de celda hasta el margen de la derecha
         * alto=10, altura de la celda a 10
         * txt= Texto a ser impreso dentro de la celda
         * border=T Pone margen en la posición Top (arriba) de la celda
         * ln=0 Indica dónde sigue el texto después de llamada a Cell(), en este caso con 0, enseguida de nuestro texto
         * alineación=C Texto alineado al centro
         */
        $this->Cell(0,10,'Este es el pie de página creado con el método Footer() de la clase creada PDF que hereda de FPDF','T',0,'C');
    }

    function Header(){
        //Define tipo de letra a usar, Arial, Negrita, 15
        $this->SetFont('Arial','B',9);
        /* Líneas paralelas
         * Line(x1,y1,x2,y2)
         * El origen es la esquina superior izquierda
         * Cambien los parámetros y chequen las posiciones
         * */
        $this->Line(10,10,206,10);
        $this->Line(10,35.5,206,35.5);
        /* Explicaré el primer Cell() (Los siguientes son similares)
         * 30 : de ancho
         * 25 : de alto
         * ' ' : sin texto
         * 0 : sin borde
         * 0 : Lo siguiente en el código va a la derecha (en este caso la segunda celda)
         * 'C' : Texto Centrado
         * $this->Image('images/logo.png', 152,12, 19) Método para insertar imagen
         *     'images/logo.png' : ruta de la imagen
         *         152 : posición X (recordar que el origen es la esquina superior izquierda)
         *         12 : posición Y
         *     19 : Ancho de la imagen <span class="wp-smiley emoji emoji-wordpress" title="(w)">(w)</span>
         *     Nota: Al no especificar el alto de la imagen (h), éste se calcula automáticamente
         * */
        $this->Cell(30,25,'',0,0,'C',$this->Image('../img/logo.png', 152,12, 19));
        $this->Cell(111,25,'SOLICITUD DE EMPLEO',0,0,'C', $this->Image('../img/logoIzquierda.png',20,12,20));
        $this->Cell(40,25,'',0,0,'C',$this->Image('../img/logoDerecha.png', 175, 12, 19));
        //Se da un salto de línea de 25
        $this->Ln(25);
    }

    function ImprimirTexto($file){
        //Se lee el archivo
        $txt = file_get_contents($file);
        $this->SetFont('Arial','',12);
        //Se imprime
        $this->MultiCell(0,5,$txt);
    }

    //Cabecera($array) : Crea la parte fija de la tabla, es decir, la que tiene los títulos de las columnas. 
    //Para ello se le envía como parámetro un array de cadenas (los títulos) 
    //y el método se encarga de poner cada elemento del array en una celda hasta terminar con todos sus elementos.
    function cabecera($cabecera){
        $this->SetXY(50,105);
        $this->SetFont('Arial','B',15);
        foreach($cabecera as $columna)
        {
            $this->Cell(40,7,$columna,1, 2 , 'L' ) ;
        }
    }
 
 	//Datos($array) : Crea la parte dinámica de la tabla. 
 	//En una variable se guardará el array asociativo que regresa el método seleccionar_persona() 
 	//y le asigna una celda a cada elemento del mismo.
    function datos($datos){
 
        $this->SetXY(90,105);
        $this->SetFont('Arial','',12);
        foreach ($datos as $columna)
        {
            $this->Cell(65,7,utf8_decode($columna['Nombre']),'TRB',2,'L' );
            $this->Cell(65,7,utf8_decode($columna['ApellidoPat']),'TRB',2,'L' );
            $this->Cell(65,7,utf8_decode($columna['ApellidoMat']),'TRB',2,'L' );
            $this->Cell(65,7,utf8_decode($columna['Solicitud']),'TRB',2,'L' );
            $this->Cell(65,7,utf8_decode($columna['Puesto']),'TRB',2,'L' );
        }
    }
 
    //El método tabla integra a los métodos cabecera y datos
    function tabla($cabecera,$datos){
        $this->cabecera ($cabecera) ;
        $this->datos($datos);
    }
    
}//fin clase PDF
?>  