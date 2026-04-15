const ChartsConfig = [
  {
    title: "Distribuição de Idades",
    question: "Qual a sua idade?",
    categories: ["geral"],
    type:"donnut"
  },
  { 
    title: "Distribuição de Semestres",
    question: "Qual é o seu semestre atual?  ",
    categories: ["geral"],
    type:"donnut"
  },
  {
    title: "Distribuição de Cursos",
    question: "Qual o seu curso?",
    categories: ["geral"],
    type:"pie"
  },
  {
    title: "Estudantes trabalham atualmente?",
    question: "Você trabalha/faz estágio?",
    categories: ["geral"],
    type:"pie"
  },
  {
    title: "Horas de estudo × desempenho acadêmico",
    question: "Quantas horas por dia você dedica aos estudos (fora das aulas)?  ",
    questionB:"Como você avalia seu desempenho acadêmico?",
    categories: ["desepenho"],
    type:"bar"
  }
]

export default ChartsConfig