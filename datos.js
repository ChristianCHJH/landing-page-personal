/*
  Datos de la portada. Salen del historial aprobado:
  Seis rubros a la vista (ver la recomendación en la entrega); el resto va en «También trabajo con…».
  - herramientas/rubros.json (nombre, dolor = soluciones[0][0], mensaje de WhatsApp)
  - herramientas/dispositivos.json (escena del celular = escenas[0])
  - caso real de la tienda en index.html y assets/casos/FUENTES.md (catálogo «Moda Andina»)
  La columna «Hoy» reescribe a mano los mismos nombres y montos de la escena.
  Todo es ficticio y se rotula así en la página.
*/
window.ABIEL = {
  telefono: "51913412590",
  mensajeGeneral: "Hola Christian, hago algo a mano en mi negocio y quiero automatizarlo.",
  tambien: "También trabajo con condominios, minimarkets, gimnasios, veterinarias, talleres, barberías y spas, y transporte de carga.",
  rubros: [
    {
      slug: "colegios",
      chip: "Colegio",
      nombre: "Colegios, nidos y academias",
      dolor: "Me deben 3 meses y yo igual pago planilla.",
      wa: "Hola Christian, tengo un colegio o academia y quiero ordenar el cobro de pensiones.",
      foco: "50% 50%",
      hoy: {
        titulo: "Pensiones setiembre",
        lineas: [
          { t: "Quispe, 350. ¿Pagó? ver Yape", marca: "?" },
          { t: "Rojas, ago + set, debe 700", marca: "!" },
          { t: "Huamán, 350, banco", tacha: true },
          { t: "Torres, vence el 30" }
        ],
        nota: "Escribirle a cada papá, uno por uno"
      },
      app: {
        saludo: "Hola, Miss Carmen", negocio: "Colegio San Martín", hora: "8:14",
        tipo: "chat", titulo: "Aviso privado al padre",
        contacto: "Sra. Quispe, mamá de Mateo",
        mensajes: [
          ["yo", "Hola Sra. Quispe, le recordamos la pensión de setiembre de Mateo: S/ 350. Puede pagar por Yape o en el banco.", "8:00 am"],
          ["ellos", "Gracias miss, ya pagué por Yape.", "8:14 am"],
          ["sistema", "Pago de S/ 350 registrado", ""]
        ],
        toast: "Pago de la Familia Quispe registrado"
      }
    },
    {
      slug: "tienda",
      chip: "Tienda en TikTok",
      nombre: "Tiendas que venden por TikTok e Instagram",
      dolor: "Mando foto por foto de cada producto por WhatsApp.",
      wa: "Hola Christian, vendo por TikTok e Instagram. ¿Cómo me puedes ayudar?",
      foco: "70% 50%",
      hoy: {
        titulo: "Pedidos de hoy",
        lineas: [
          { t: "Polera M, ¿precio? le mandé fotos", marca: "?" },
          { t: "Jean 30, ¿hay? preguntar" },
          { t: "Casaca, ya se vendió", tacha: true },
          { t: "Polo S, ¿cuánto? otra vez", marca: "!" }
        ],
        nota: "Contestar «¿precio?» uno por uno"
      },
      app: {
        saludo: "Tu catálogo", negocio: "Moda Andina", hora: "7:30",
        tipo: "catalogo", titulo: "Catálogo con un solo enlace",
        productos: [
          ["Polo básico de algodón", "S/ 35.00", "t-shirt", "#E9D6C4"],
          ["Polera con capucha", "S/ 89.90", "hoodie", "#D3DCE8"],
          ["Jean clásico", "S/ 119.00", "pants", "#D6E0EA"],
          ["Casaca cortavientos", "S/ 149.00", "coat-hanger", "#D3E2D6"]
        ],
        toast: "Catálogo compartido con un solo enlace"
      }
    },
    {
      slug: "movilidad",
      chip: "Movilidad escolar",
      nombre: "Movilidad escolar",
      dolor: "¿Dónde está la movilidad? ¿Mi hijo ya llegó?",
      wa: "Hola Christian, tengo una movilidad escolar. ¿Cómo me puedes ayudar?",
      foco: "72% 50%",
      hoy: {
        titulo: "Ruta de la mañana",
        lineas: [
          { t: "Recoger a Thiago" },
          { t: "Recoger a Sofía" },
          { t: "Valentina subió 7:31, ¿avisé al papá?", marca: "?" },
          { t: "30 llamadas: «¿ya llegó?»", marca: "!" }
        ],
        nota: "Contestar llamadas toda la mañana"
      },
      app: {
        saludo: "Hola, Beto", negocio: "Movilidad Tío Beto", hora: "7:52",
        tipo: "linea", titulo: "Lo que ve el papá",
        nombre: "Valentina", detalle: "Colegio San Martín, 3.° A",
        pasos: [["Subió a la movilidad", "7:31 am", true], ["Llegó al colegio", "7:42 am", true], ["Salió del colegio", "", false], ["Llegó a casa", "", false]],
        nota: "Aviso enviado al papá a las 7:42 am",
        toast: "Papá de Valentina avisado: llegó al colegio"
      }
    },
    {
      slug: "clinicas",
      chip: "Clínica dental",
      nombre: "Clínicas dentales y consultorios",
      dolor: "El paciente no viene y el sillón se queda vacío.",
      wa: "Hola Christian, tengo una clínica o consultorio. ¿Cómo me puedes ayudar?",
      foco: "45% 50%",
      hoy: {
        titulo: "Mañana, jueves 18",
        lineas: [
          { t: "9:00 Ana Torres, limpieza", tacha: true },
          { t: "10:30 Luis Medina, no contesta", marca: "!" },
          { t: "12:00 Rosa Cárdenas, volver a llamar" },
          { t: "3:00 Pedro Salas, ¿confirmó?", marca: "?" }
        ],
        nota: "Llamar a los 9, uno por uno"
      },
      app: {
        saludo: "Hola, Dra. Paredes", negocio: "Consultorio Dental Sonrisa", hora: "8:00",
        tipo: "calendario", titulo: "Citas de mañana",
        dias: ["L 15", "M 16", "M 17", "J 18", "V 19", "S 20"], activo: 3,
        citas: [
          ["9:00", "Ana Torres", "Limpieza", "ok", "Confirmó"],
          ["10:30", "Luis Medina", "Ortodoncia", "late", "Sin respuesta"],
          ["12:00", "Rosa Cárdenas", "Curación", "ok", "Confirmó"],
          ["3:00", "Pedro Salas", "Evaluación", "ok", "Confirmó"]
        ],
        toast: "7 de 9 pacientes ya confirmaron"
      }
    },
    {
      slug: "ferreterias",
      chip: "Ferretería",
      nombre: "Ferreterías y distribuidoras",
      dolor: "Se lleva al crédito y paga cuando termina la obra, o nunca.",
      wa: "Hola Christian, tengo una ferretería o distribuidora. ¿Cómo me puedes ayudar?",
      foco: "50% 50%",
      hoy: {
        titulo: "Cuaderno de crédito",
        lineas: [
          { t: "Maestro Wilber, obra Los Olivos", marca: "!" },
          { t: "Constructora Andina, F001-88" },
          { t: "Inv. Lara, F001-91, ¿pagó?", marca: "?" },
          { t: "Sr. Pérez, B001-412", tacha: true }
        ],
        nota: "¿Cuánto me deben en total?"
      },
      app: {
        saludo: "Hola, Don Julio", negocio: "Ferretería El Maestro", hora: "8:00",
        tipo: "lista", titulo: "Cuentas por cobrar",
        etiqueta: "Te deben", valor: "S/ 8,730", meta: "5 clientes con crédito vencido",
        filas: [
          ["Maestro Wilber", "Obra en Los Olivos, 20 días", "Vencido", "late"],
          ["Constructora Andina", "Factura F001-88", "Vence el 25", "soon"],
          ["Inversiones Lara", "Factura F001-91", "Aviso enviado", "soon"],
          ["Sr. Pérez", "Boleta B001-412", "Pagó", "ok"]
        ],
        toast: "Recordatorio enviado al Maestro Wilber"
      }
    },
    {
      slug: "inmobiliarias",
      chip: "Inmobiliaria",
      nombre: "Inmobiliarias y venta de lotes",
      dolor: "Dos vendedores separaron el mismo lote.",
      wa: "Hola Christian, tengo una inmobiliaria. ¿Cómo me puedes ayudar?",
      foco: "55% 50%",
      hoy: {
        titulo: "Etapa 2, lotes",
        lineas: [
                    { t: "B-14 separado (Jorge)" },
          { t: "B-14 separado (Carla)", marca: "!" },
          { t: "Pintar el plano a mano" },
          { t: "Mandar el PDF a los vendedores" }
        ],
        nota: "¿Quién lo separó primero?"
      },
      app: {
        saludo: "Hola, Sra. Vargas", negocio: "Horizonte", hora: "11:20",
        tipo: "plano", titulo: "Plano de la etapa 2",
        columnas: 6, estados: "vvlvsvlvvlllvllsvvlsvvlvvvllsvvlvvsl", cambia: 14, codigo: "B-14",
        toast: "Carla separó el lote B-14"
      }
    }
  ]
};
