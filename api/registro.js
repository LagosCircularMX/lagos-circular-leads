export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ruta GET para verificar que la API está viva
  if (req.method === 'GET') {
    return res.status(200).json({ 
      mensaje: 'API de LAGOS CIRCULAR funcionando correctamente',
      hora: new Date().toISOString()
    });
  }

  // Ruta POST para recibir registros
  if (req.method === 'POST') {
    const { nombre, email } = req.body;
    
    // Por ahora solo mostramos en consola y devolvemos éxito
    console.log('Nuevo registro:', { nombre, email, hora: new Date().toISOString() });
    
    return res.status(200).json({ 
      success: true, 
      mensaje: 'Registro exitoso',
      datos: { nombre, email }
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
