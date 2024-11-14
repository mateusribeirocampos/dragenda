async function Listar() {
  const doctors = [
    { id: 1, name: "Mateus", specialty: "Cardiologista", icon: "M" },
    { id: 2, name: "João", specialty: "Ortopedista", icon: "M" },
    { id: 3, name: "Maria", specialty: "Dermatologista", icon: "F" },
    { id: 4, name: "José", specialty: "Oftalmologista", icon: "M" },
    { id: 5, name: "Ana", specialty: "Pediatra", icon: "F" },
  ];

  return doctors;
}

export default { Listar };
