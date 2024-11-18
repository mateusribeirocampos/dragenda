

async function Listar() {

  // simula o acesso ao banco
  const doctors = [
    { id: 1, name: "Mateus", specialty: "Cardiologista", icon: "M" },
    { id: 2, name: "João", specialty: "Ortopedista", icon: "M" },
    { id: 3, name: "Maria", specialty: "Dermatologista", icon: "F" },
    { id: 4, name: "José", specialty: "Oftalmologista", icon: "M" },
    { id: 5, name: "Ana", specialty: "Pediatra", icon: "F" },
    { id: 6, name: "Carlos", specialty: "Ginecologista", icon: "M" },
    { id: 7, name: "Juliana", specialty: "Nutricionista", icon: "F" },
    { id: 8, name: "Mariana", specialty: "Fisioterapeuta", icon: "F" },
    { id: 9, name: "Rafael", specialty: "Psicólogo", icon: "M" },
    { id: 10, name: "Lucas", specialty: "Psiquiatra", icon: "M" },
  ];

  return doctors;
}

export default { Listar };
