const ChartsConfig = [
  {
    title: "Distribuição de Idades",
    question: "Qual a sua idade?",
    categories: "geral",
    type:"donnut",
    typs:"Idade :"
  },
  { 
    title: "Distribuição de Semestres",
    question: "Qual é o seu semestre atual?  ",
    categories: "geral",
    type:"donnut",
    typs:"Semestre :"
  },
  {
    title: "Distribuição de Cursos",
    question: "Qual o seu curso?",
    categories: "geral",
    type:"pie",
    typs:""
  },
  {
    title: "Estudantes trabalham atualmente?",
    question: "Você trabalha/faz estágio?",
    categories: "geral",
    type:"pie",
    typs:""
  },
    {
    title: "Distribuição de Idade por Semestre",
    question: "Qual é o seu semestre atual?  ",
    questionB:"Qual a sua idade?",
    categories: "geral",
    type:"bar",
    typs:"Anos",
    eixoX:"Semestre"
  },
  {
    title: "Horas de estudo × desempenho acadêmico",
    question: "Quantas horas por dia você dedica aos estudos (fora das aulas)?  ",
    questionB:"Como você avalia seu desempenho acadêmico?",
    categories: "desempenho",
    type:"bar",
    typs:"",
    eixoX:"Horas de estudo"
  },
  {
    title: "Horas de estudo × Estresse",
    question: "Com que frequência você se sente estressado/ansioso?",
    questionB:"Quantas horas por dia você dedica aos estudos (fora das aulas)?  ",
    categories: "desempenho",
    type:"line",
    typs:"",
    eixoX:"Nivel de Estresse"
  }
];

export default ChartsConfig