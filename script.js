const materias = [
  // PRIMER AÑO
  ["mat1","Matemáticas I",1,"I",[]],
  ["des","Desarrollo Personal",1,"I",[]],
  ["dib","Dibujo Técnico",1,"I",[]],
  ["fis1","Física I",1,"I",[]],
  ["intro","Introducción a Motores",1,"I",[]],
  ["sol","Soldadura",1,"I",[]],

  ["mat2","Matemáticas II",1,"II",["mat1"]],
  ["comp","Computación",1,"II",["des"]],
  ["mot1","Motores I",1,"II",["intro","sol"]],
  ["fis2","Física II",1,"II",["fis1"]],
  ["met","Metalurgia",1,"II",["dib","sol"]],
  ["metro","Metrología",1,"II",["fis1","intro"]],

  // SEGUNDO AÑO
  ["mot2","Motores II",2,"III",["mot1","metro"]],
  ["circ","Instru. e Interp. de Circuitos",2,"III",["comp","fis2"]],
  ["elec","Electricidad Automotriz",2,"III",["fis2"]],
  ["res","Resistencia de los Metales",2,"III",["mat2","fis2"]],
  ["ing1","Inglés Técnico I",2,"III",["comp","metro"]],
  ["eq","Equipo Pesado",2,"III",["mot1","met"]],

  ["mot3","Motores III",2,"IV",["mot2"]],
  ["trans1","Sistema de Transmisión I",2,"IV",["res","eq"]],
  ["elec2","Electrónica Automotriz",2,"IV",["circ","elec"]],
  ["lub","Lubricación",2,"IV",["res","eq"]],
  ["elem","Elementos de Máquinas I",2,"IV",["res","eq"]],
  ["ing2","Inglés Técnico II",2,"IV",["ing1"]],

  // TERCER AÑO
  ["hid","Hidráulica y Neumática",3,"V",["elec2","lub","elem"]],
  ["syso","SYSO",3,"V",["lub","ing2"]],
  ["trans2","Sistema de Transmisión II",3,"V",["trans1","lub"]],
  ["dir","Sistema de Dirección",3,"V",["mot3"]],
  ["fre","Sistema de Freno",3,"V",["lub","elem"]],
  ["cal","Control de Calidad",3,"V",["mot3","elem"]],

  ["prac","Práctica en la Industria",3,"VI",["hid","syso","trans2","dir","fre","cal"]],
  ["adm","Administración y Gestión Empr.",3,"VI",["syso","cal"]],
  ["prep","Preparación de Proyectos",3,"VI",["syso","cal"]],
  ["gas","Sistema Inyección a Gasolina",3,"VI",["hid","cal"]],
  ["die","Sistema Inyección a Diésel",3,"VI",["hid","cal"]],
  ["gng","Sistema Inyección a Gas",3,"VI",["hid","cal"]],
];

const estado = JSON.parse(localStorage.getItem("estadoMec")) || {};

function render(){
  const cont = document.getElementById("malla");
  cont.innerHTML="";

  for(let año=1;año<=3;año++){
    const bloque=document.createElement("div");
    bloque.className="anio";
    bloque.innerHTML=`<h2>${año}° Año</h2>`;

    const fila=document.createElement("div");
    fila.className="fila-semestres";

    ["I","II","III","IV","V","VI"].forEach(sem=>{
      const lista=materias.filter(m=>m[2]===año && m[3]===sem);
      if(!lista.length) return;

      const box=document.createElement("div");
      box.className="semestre";
      box.innerHTML=`<h3>${sem} Semestre</h3>`;

      lista.forEach(m=>{
        const div=document.createElement("div");
        div.className="materia";
        div.textContent=m[1];

        const faltan=m[4].filter(r=>!estado[r]);
        if(faltan.length){
          div.classList.add("bloqueada");
          div.dataset.tooltip="Falta aprobar: "+faltan.join(", ");
        }

        if(estado[m[0]]) div.classList.add("aprobada");

        div.onclick=()=>{
          if(faltan.length) return;
          estado[m[0]]=!estado[m[0]];
          localStorage.setItem("estadoMec",JSON.stringify(estado));
          render();
        };

        box.appendChild(div);
      });

      fila.appendChild(box);
    });

    bloque.appendChild(fila);
    cont.appendChild(bloque);
  }
}

render();
